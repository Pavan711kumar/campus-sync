"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { DEPARTMENTS } from "@/lib/constants";
import { BadgeCheck } from "lucide-react";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  department: z.string().min(1, "Select a department"),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, completeProfileSetup } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!user?.role) {
      router.push("/select-role");
      return;
    }
    setLoading(true);
    try {
      await completeProfileSetup({
        fullName: data.fullName,
        department: data.department,
        role: user.role,
        bio: data.bio,
      });
      toast.success("Profile created! Welcome to CampusSync.");
      router.push(
        user.role === "faculty" ? "/dashboard/faculty" : "/dashboard/student"
      );
    } catch (err: unknown) {
      const message = (err as { message?: string })?.message ?? "Failed to save profile.";
      toast.error(message);
      if (message.includes("Not signed in")) router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-green-100 text-green-600 mb-4">
            <BadgeCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
          <p className="text-muted text-sm mt-2">
            You&apos;ll receive a verified badge upon completion
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Alex Johnson"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Department
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              {...register("department")}
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-500">{errors.department.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px] resize-none"
              placeholder="Tell us about yourself..."
              {...register("bio")}
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Complete Setup & Enter Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
