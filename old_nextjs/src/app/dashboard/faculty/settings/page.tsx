"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Moon, Sun, Bell, Shield, LogOut } from "lucide-react";

export default function FacultySettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <div>
      <TopBar title="Settings" subtitle="Manage your faculty account" />
      <div className="p-6 space-y-6 max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun className="h-5 w-5 text-muted" /> : <Moon className="h-5 w-5 text-muted" />}
              <span className="text-sm font-medium">Dark Mode</span>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === "light" ? "Enable Dark" : "Enable Light"}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Appointment requests", "Student messages", "Academic updates"].map((item) => (
              <label key={item} className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Bell className="h-4 w-4 text-muted" /> {item}</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Account</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Shield className="h-4 w-4" /> Change Password
            </Button>
            <Button variant="danger" size="sm" className="w-full justify-start" onClick={logout}>
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
