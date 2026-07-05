"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { UserProfile, UserRole } from "@/types";
import {
  getDemoUser,
  saveDemoUser,
  clearDemoUser,
  createDemoProfile,
  isDemoMode,
} from "@/lib/firebase/auth";
import {
  firebaseRegister,
  firebaseLogin,
  firebaseLogout,
  subscribeToAuthState,
  getCurrentFirebaseUser,
  getPostAuthRedirect,
} from "@/lib/firebase/auth-service";
import {
  getUserProfile,
  createUserProfile,
  saveUserProfile,
  completeUserProfile,
} from "@/lib/firebase/firestore";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; redirect?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  setRole: (role: UserRole) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeProfileSetup: (data: {
    fullName: string;
    department: string;
    role: UserRole;
    bio?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapFirebaseError(code: string): string {
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered. Try signing in.",
    "auth/invalid-email": "Invalid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/operation-not-allowed": "Email/password sign-in is not enabled. Enable it in Firebase Console → Authentication.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
  };
  return messages[code] ?? "Authentication failed. Please try again.";
}

function buildPartialProfile(firebaseUser: { uid: string; email: string | null }): UserProfile {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    fullName: "",
    role: "student",
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
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);

  useEffect(() => {
    if (isDemoMode()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(getDemoUser());
      setLoading(false);
      return;
    }

    // Wait for browser before touching Firebase
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUid(firebaseUser.uid);
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUser(profile ?? buildPartialProfile(firebaseUser));
        } catch {
          setUser(buildPartialProfile(firebaseUser));
        }
      } else {
        setFirebaseUid(null);
        setUser(null);
      }
      setLoading(false);
    });
    } catch (error) {
      console.error("Firebase auth init failed:", error);
      setLoading(false);
    }

    return () => unsubscribe?.();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (isDemoMode()) {
      const existing = getDemoUser();
      if (existing && existing.email === email) {
        setUser(existing);
        const redirect =
          existing.role === "faculty" ? "/dashboard/faculty" : "/dashboard/student";
        return { success: true, message: "Welcome back!", redirect };
      }
      return { success: true, message: "Please complete verification.", redirect: "/verify-otp" };
    }

    try {
      const firebaseUser = await firebaseLogin(email, password);
      sessionStorage.setItem("campussync_demo_pending", email);

      const profile = await getUserProfile(firebaseUser.uid);
      if (profile) setUser(profile);

      const redirect = await getPostAuthRedirect(
        firebaseUser.uid,
        firebaseUser.emailVerified
      );

      return {
        success: true,
        message: firebaseUser.emailVerified ? "Welcome back!" : "Please verify your email.",
        redirect,
      };
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      return { success: false, message: mapFirebaseError(code) };
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    if (isDemoMode()) {
      return { success: true, message: "Account created. Please verify your email." };
    }

    try {
      await firebaseRegister(email, password);
      sessionStorage.setItem("campussync_demo_pending", email);
      return {
        success: true,
        message: "Account created! Check your Gmail inbox for a verification link.",
      };
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      return { success: false, message: mapFirebaseError(code) };
    }
  }, []);

  const logout = useCallback(async () => {
    if (!isDemoMode()) {
      try {
        await firebaseLogout();
      } catch {
        // ignore
      }
    }
    clearDemoUser();
    setUser(null);
    setFirebaseUid(null);
  }, []);

  const resolveUid = useCallback(() => {
    return firebaseUid ?? user?.uid ?? getCurrentFirebaseUser()?.uid ?? null;
  }, [firebaseUid, user]);

  const setRole = useCallback(
    async (role: UserRole) => {
      if (isDemoMode()) {
        if (user) {
          const updated = { ...user, role, updatedAt: new Date().toISOString() };
          setUser(updated);
          saveDemoUser(updated);
        } else {
          const pending = sessionStorage.getItem("campussync_demo_pending");
          if (pending) {
            const partial: UserProfile = {
              uid: `demo_${Date.now()}`,
              email: pending,
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
            setUser(partial);
            saveDemoUser(partial);
          }
        }
        return;
      }

      const uid = resolveUid();
      const email =
        user?.email ||
        getCurrentFirebaseUser()?.email ||
        sessionStorage.getItem("campussync_demo_pending") ||
        "";

      if (!uid) throw new Error("Not signed in. Please register or log in first.");

      const existing = await getUserProfile(uid);
      if (existing) {
        await saveUserProfile(uid, { role });
        setUser({ ...existing, role });
      } else {
        const profile = await createUserProfile(uid, email, role);
        setUser(profile);
      }
    },
    [user, resolveUid]
  );

  const updateProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (isDemoMode()) {
        if (user) {
          const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
          setUser(updated);
          saveDemoUser(updated);
        }
        return;
      }

      const uid = resolveUid();
      if (!uid || !user) throw new Error("Not signed in");

      await saveUserProfile(uid, data);
      setUser({ ...user, ...data, updatedAt: new Date().toISOString() });
    },
    [user, resolveUid]
  );

  const completeProfileSetup = useCallback(
    async (data: { fullName: string; department: string; role: UserRole; bio?: string }) => {
      if (isDemoMode()) {
        const email = user?.email || sessionStorage.getItem("campussync_demo_pending") || "";
        const profile = createDemoProfile(email, data.role, data.fullName, data.department);
        profile.badges = data.role === "faculty" ? ["Verified Faculty"] : ["Verified Student"];
        if (data.bio) profile.bio = data.bio;
        setUser(profile);
        saveDemoUser(profile);
        return;
      }

      const uid = resolveUid();
      const email =
        user?.email ||
        getCurrentFirebaseUser()?.email ||
        sessionStorage.getItem("campussync_demo_pending") ||
        "";

      if (!uid) throw new Error("Not signed in");

      const profile = await completeUserProfile(uid, email, data);
      setUser(profile);
    },
    [user, resolveUid]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user?.isVerified,
        login,
        register,
        logout,
        setRole,
        updateProfile,
        completeProfileSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
