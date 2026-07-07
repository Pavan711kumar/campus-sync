import {
  doc,
  getDocFromServer,
  setDoc,
  updateDoc,
  serverTimestamp,
  enableNetwork,
} from "firebase/firestore";
import { getFirebaseDb, isDemoMode } from "@/lib/firebase/config";
import { ensureFirestoreOnline } from "@/lib/firebase/connection";
import type { UserProfile, UserRole } from "@/types";

const USERS_COLLECTION = "users";
const PROFILE_CACHE_PREFIX = "campussync_profile_";

function isOfflineError(error: unknown): boolean {
  const code = (error as { code?: string })?.code;
  const message = (error as { message?: string })?.message ?? "";
  return (
    code === "unavailable" ||
    code === "failed-precondition" ||
    message.toLowerCase().includes("offline")
  );
}

function cacheProfileLocally(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${PROFILE_CACHE_PREFIX}${profile.uid}`, JSON.stringify(profile));
}

function getLocalProfile(uid: string): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${PROFILE_CACHE_PREFIX}${uid}`);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function parseProfileDoc(uid: string, data: Record<string, unknown>): UserProfile {
  return {
    uid,
    email: (data.email as string) ?? "",
    fullName: (data.fullName as string) ?? "",
    role: (data.role as UserProfile["role"]) ?? "student",
    department: (data.department as string) ?? "",
    skills: (data.skills as string[]) ?? [],
    interests: (data.interests as string[]) ?? [],
    experience: (data.experience as string) ?? "",
    profilePicture: data.profilePicture as string | undefined,
    bio: (data.bio as string) ?? "",
    badges: (data.badges as string[]) ?? [],
    domainExpertise: (data.domainExpertise as string[]) ?? [],
    isVerified: (data.isVerified as boolean) ?? false,
    createdAt:
      (data.createdAt as { toDate?: () => Date })?.toDate?.()?.toISOString() ??
      (data.createdAt as string) ??
      new Date().toISOString(),
    updatedAt:
      (data.updatedAt as { toDate?: () => Date })?.toDate?.()?.toISOString() ??
      (data.updatedAt as string) ??
      new Date().toISOString(),
  };
}

async function withFirestoreRetry<T>(operation: () => Promise<T>): Promise<T> {
  if (isDemoMode) throw new Error("Firestore not available in demo mode");

  await ensureFirestoreOnline();

  const db = getFirebaseDb();
  const delays = [0, 500, 1500];

  let lastError: unknown;

  for (const delay of delays) {
    if (delay > 0) await new Promise((r) => setTimeout(r, delay));

    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isOfflineError(error)) throw error;
      try {
        await enableNetwork(db);
      } catch {
        // already online
      }
    }
  }

  throw lastError;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (isDemoMode) return null;

  try {
    const profile = await withFirestoreRetry(async () => {
      const db = getFirebaseDb();
      const snap = await getDocFromServer(doc(db, USERS_COLLECTION, uid));
      if (!snap.exists()) return null;
      return parseProfileDoc(uid, snap.data());
    });

    if (profile) cacheProfileLocally(profile);
    return profile;
  } catch (error) {
    console.warn("Firestore read failed, using local cache:", error);
    return getLocalProfile(uid);
  }
}

export async function createUserProfile(
  uid: string,
  email: string,
  role: UserRole
): Promise<UserProfile> {
  const profile: UserProfile = {
    uid,
    email,
    fullName: "",
    role,
    department: "",
    skills: [],
    interests: [],
    experience: "",
    bio: "",
    badges: [],
    domainExpertise: [],
    isVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await withFirestoreRetry(async () => {
      const db = getFirebaseDb();
      await setDoc(doc(db, USERS_COLLECTION, uid), {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (error) {
    console.warn("Firestore write failed, saving profile locally:", error);
  }

  cacheProfileLocally(profile);
  return profile;
}

export async function saveUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uid: _, createdAt, ...rest } = data;
  const cached = getLocalProfile(uid);
  const merged = { ...(cached ?? { uid }), ...rest, uid } as UserProfile;

  try {
    await withFirestoreRetry(async () => {
      const db = getFirebaseDb();
      const ref = doc(db, USERS_COLLECTION, uid);
      const snap = await getDocFromServer(ref);

      if (snap.exists()) {
        await updateDoc(ref, { ...rest, updatedAt: serverTimestamp() });
      } else {
        await setDoc(ref, { uid, ...rest, updatedAt: serverTimestamp() }, { merge: true });
      }
    });
  } catch (error) {
    console.warn("Firestore update failed, saving profile locally:", error);
  }

  cacheProfileLocally({
    ...merged,
    updatedAt: new Date().toISOString(),
  } as UserProfile);
}

export async function completeUserProfile(
  uid: string,
  email: string,
  data: {
    fullName: string;
    department: string;
    role: UserRole;
    bio?: string;
  }
): Promise<UserProfile> {
  const badges = data.role === "faculty" ? ["Verified Faculty"] : ["Verified Student"];
  const profile: UserProfile = {
    uid,
    email,
    fullName: data.fullName,
    department: data.department,
    role: data.role,
    bio: data.bio ?? "",
    skills: getLocalProfile(uid)?.skills ?? [],
    interests: getLocalProfile(uid)?.interests ?? [],
    experience: getLocalProfile(uid)?.experience ?? "",
    badges,
    domainExpertise: getLocalProfile(uid)?.domainExpertise ?? [],
    isVerified: true,
    createdAt: getLocalProfile(uid)?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await withFirestoreRetry(async () => {
      const db = getFirebaseDb();
      await setDoc(
        doc(db, USERS_COLLECTION, uid),
        {
          uid,
          email,
          fullName: data.fullName,
          department: data.department,
          role: data.role,
          bio: data.bio ?? "",
          badges,
          isVerified: true,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    });

    const saved = await getUserProfile(uid);
    if (saved) return saved;
  } catch (error) {
    console.warn("Firestore complete profile failed, using local cache:", error);
  }

  cacheProfileLocally(profile);
  return profile;
}
