"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  sendEmailOTP,
  verifyEmailOTP,
  isDemoMode,
} from "@/lib/firebase/auth";
import {
  resendVerificationEmail,
  reloadFirebaseUser,
  getCurrentFirebaseUser,
  getPostAuthRedirect,
} from "@/lib/firebase/auth-service";
import { ShieldCheck, Mail } from "lucide-react";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const demo = isDemoMode();

  useEffect(() => {
    const pending = sessionStorage.getItem("campussync_demo_pending");
    const currentEmail = getCurrentFirebaseUser()?.email;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pending) setEmail(pending);
    else if (currentEmail) setEmail(currentEmail);

    // Auto-send Firebase verification email on first visit after register
    if (!demo && getCurrentFirebaseUser() && !getCurrentFirebaseUser()?.emailVerified) {
      setSent(true);
    }
  }, [demo]);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please register first.");
      router.push("/register");
      return;
    }
    setLoading(true);

    if (demo) {
      const result = await sendEmailOTP(email);
      setLoading(false);
      if (result.success) {
        setSent(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      return;
    }

    try {
      if (!getCurrentFirebaseUser()) {
        toast.error("Session expired. Please sign in again.");
        router.push("/login");
        return;
      }
      await resendVerificationEmail();
      setSent(true);
      toast.success("Verification email sent! Check your Gmail inbox and spam folder.");
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? "Failed to send verification email.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);

    if (demo) {
      const result = await verifyEmailOTP(email, otp);
      setLoading(false);
      if (result.success) {
        toast.success(result.message);
        router.push("/select-role");
      } else {
        toast.error(result.message);
      }
      return;
    }

    try {
      const firebaseUser = await reloadFirebaseUser();
      if (!firebaseUser) {
        toast.error("Session expired. Please sign in again.");
        router.push("/login");
        return;
      }

      if (!firebaseUser.emailVerified) {
        toast.error("Email not verified yet. Click the link in your Gmail, then try again.");
        setLoading(false);
        return;
      }

      toast.success("Email verified successfully!");
      const redirect = await getPostAuthRedirect(firebaseUser.uid, true);
      router.push(redirect);
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? "Verification failed.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-6">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h1>
        <p className="text-muted text-sm mb-6">
          {demo
            ? "We'll send a verification code to your Gmail"
            : "We sent a verification link to your Gmail. Click the link, then press the button below."}
        </p>

        {!demo && sent && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-cyan/5 border border-cyan/20 text-left mb-6">
            <Mail className="h-5 w-5 text-cyan-dark shrink-0 mt-0.5" />
            <div className="text-sm text-muted">
              <p className="font-semibold text-foreground mb-1">Check your inbox</p>
              <p>Open the email from Firebase and click <strong>Verify email</strong>. Then come back here and click &quot;I&apos;ve verified my email&quot;.</p>
            </div>
          </div>
        )}

        <div className="space-y-4 text-left">
          <Input
            label="Gmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            disabled={!demo}
          />

          {demo ? (
            !sent ? (
              <Button onClick={handleSendOTP} loading={loading} className="w-full">
                Send Verification Code
              </Button>
            ) : (
              <>
                <Input
                  label="Verification Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                />
                <Button onClick={handleVerify} loading={loading} className="w-full">
                  Verify Email
                </Button>
                <button
                  onClick={handleSendOTP}
                  className="w-full text-sm text-primary font-medium hover:underline"
                >
                  Resend code
                </button>
              </>
            )
          ) : (
            <>
              {!sent && (
                <Button onClick={handleSendOTP} loading={loading} className="w-full">
                  Send Verification Email
                </Button>
              )}
              <Button onClick={handleVerify} loading={loading} className="w-full">
                I&apos;ve verified my email
              </Button>
              {sent && (
                <button
                  onClick={handleSendOTP}
                  className="w-full text-sm text-primary font-medium hover:underline"
                >
                  Resend verification email
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
