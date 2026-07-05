"use client";

import { Bell, Moon, Sun, Menu } from "lucide-react";
import { GlobalSearch } from "./GlobalSearch";
import { useTheme } from "@/context/ThemeContext";
import { useUI } from "@/context/UIContext";
import { demoNotifications } from "@/data/dummy";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { toggleMobileMenu } = useUI();
  const { user } = useAuth();
  const unreadCount = demoNotifications.filter(
    (n) => n.userId === (user?.uid || "demo_student_001") && !n.read
  ).length;

  const notifPath =
    user?.role === "faculty"
      ? "/dashboard/faculty/notifications"
      : "/dashboard/student/notifications";

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <GlobalSearch />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link
            href={notifPath}
            className="relative p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 text-muted transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
