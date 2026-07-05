"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { UserRole } from "@/types";

const roles: { role: UserRole; label: string; description: string; icon: typeof GraduationCap }[] = [
  {
    role: "student",
    label: "Student",
    description: "Access academic tools, collaboration hub, and campus services",
    icon: GraduationCap,
  },
  {
    role: "faculty",
    label: "Faculty",
    description: "Manage appointments, upload academic records, and mentor students",
    icon: BookOpen,
  },
];

export default function SelectRolePage() {
  const router = useRouter();
  const { setRole } = useAuth();
  const [loading, setLoading] = useState<UserRole | null>(null);

  const handleSelect = async (role: UserRole) => {
    setLoading(role);
    try {
      await setRole(role);
      router.push("/profile-setup");
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? "Failed to save role.";
      toast.error(message);
      if (message.includes("Not signed in")) router.push("/login");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Select Your Role</h1>
          <p className="text-muted mt-2">Choose how you&apos;ll use CampusSync</p>
        </div>
        <div className="grid gap-4">
          {roles.map((item) => (
            <button
              key={item.role}
              onClick={() => handleSelect(item.role)}
              disabled={loading !== null}
              className={cn(
                "flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-gray-100",
                "hover:border-primary hover:shadow-lg transition-all duration-200 text-left",
                loading === item.role && "opacity-70 pointer-events-none"
              )}
            >
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{item.label}</h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
