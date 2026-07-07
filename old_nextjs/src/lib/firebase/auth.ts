import { ALLOWED_EMAIL_DOMAINS } from "@/lib/constants";
import type { UserProfile, UserRole } from "@/types";

const DEMO_USER_KEY = "campussync_demo_user";
const DEMO_OTP_KEY = "campussync_demo_otp";
const DEMO_PENDING_KEY = "campussync_demo_pending";

export function isApprovedEmailDomain(email: string): boolean {
  const domains =
    process.env.NEXT_PUBLIC_ALLOWED_DOMAINS?.split(",") ||
    process.env.NEXT_PUBLIC_APPROVED_DOMAINS?.split(",") ||
    ALLOWED_EMAIL_DOMAINS;
  const domain = email.split("@")[1]?.toLowerCase();
  return domains.some((d) => d.trim().toLowerCase() === domain);
}

export function isGmailAddress(email: string): boolean {
  return isApprovedEmailDomain(email);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmailOTP(email: string): Promise<{ success: boolean; message: string }> {
  if (!isApprovedEmailDomain(email)) {
    return { success: false, message: "Only Gmail addresses are allowed (@gmail.com)." };
  }

  const otp = generateOTP();

  if (typeof window !== "undefined") {
    sessionStorage.setItem(DEMO_OTP_KEY, otp);
    sessionStorage.setItem(DEMO_PENDING_KEY, email);
  }

  // In production, send OTP via Firebase Cloud Function or email service
  console.info(`[CampusSync Demo] OTP for ${email}: ${otp}`);

  return {
    success: true,
    message: isDemoMode()
      ? `OTP sent! (Demo mode: check browser console — OTP: ${otp})`
      : "Verification code sent to your Gmail.",
  };
}

export async function verifyEmailOTP(
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> {
  if (typeof window === "undefined") {
    return { success: false, message: "Verification failed." };
  }

  const storedOTP = sessionStorage.getItem(DEMO_OTP_KEY);
  const pendingEmail = sessionStorage.getItem(DEMO_PENDING_KEY);

  if (pendingEmail !== email || storedOTP !== otp) {
    return { success: false, message: "Invalid or expired verification code." };
  }

  sessionStorage.removeItem(DEMO_OTP_KEY);
  return { success: true, message: "Email verified successfully!" };
}

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE?.trim() === "true";
}

export function getDemoUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(DEMO_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function saveDemoUser(profile: UserProfile): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(profile));
  }
}

export function clearDemoUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DEMO_USER_KEY);
    sessionStorage.removeItem(DEMO_PENDING_KEY);
    sessionStorage.removeItem(DEMO_OTP_KEY);
  }
}

export function createDemoProfile(
  email: string,
  role: UserRole,
  fullName: string,
  department: string
): UserProfile {
  const now = new Date().toISOString();
  return {
    uid: `demo_${Date.now()}`,
    email,
    fullName,
    role,
    department,
    skills: [],
    interests: [],
    experience: "",
    bio: "",
    badges: ["Verified Student"],
    domainExpertise: [],
    isVerified: true,
    createdAt: now,
    updatedAt: now,
  };
}
