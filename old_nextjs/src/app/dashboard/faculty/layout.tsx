"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { FACULTY_NAV_ITEMS } from "@/lib/constants";

export default function FacultyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["faculty"]}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar items={FACULTY_NAV_ITEMS} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
