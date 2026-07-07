import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/config";
import { getUserProfile } from "@/lib/firebase/firestore";

export function getCurrentFirebaseUser(): User | null {
  try {
    return getFirebaseAuth().currentUser;
  } catch {
    return null;
  }
}

export async function firebaseRegister(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password);
  await sendEmailVerification(result.user);
  return result.user;
}

export async function firebaseLogin(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  return result.user;
}

export async function firebaseLogout(): Promise<void> {
  await signOut(getFirebaseAuth());
}

export async function resendVerificationEmail(): Promise<void> {
  const user = getCurrentFirebaseUser();
  if (!user) throw new Error("Not signed in");
  await sendEmailVerification(user);
}

export async function reloadFirebaseUser(): Promise<User | null> {
  const user = getCurrentFirebaseUser();
  if (!user) return null;
  await user.reload();
  return getFirebaseAuth().currentUser;
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function getPostAuthRedirect(uid: string, emailVerified: boolean): Promise<string> {
  if (!emailVerified) return "/verify-otp";

  const profile = await getUserProfile(uid);
  if (!profile) return "/select-role";
  if (!profile.fullName || !profile.isVerified) return "/profile-setup";

  return profile.role === "faculty" ? "/dashboard/faculty" : "/dashboard/student";
}
