"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { STUDENT_NAV_ITEMS } from "@/lib/constants";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar items={STUDENT_NAV_ITEMS} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
