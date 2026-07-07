"use client";

import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import {
  GraduationCap,
  Users,
  Bell,
  TrendingUp,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  demoProjects,
  demoNotifications,
  demoAcademicRecords,
  analyticsData,
} from "@/data/dummy";
import { getCollaborationRecommendations } from "@/services/ai";
import { getAcademicInsights } from "@/services/ai";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Link from "next/link";

export default function StudentOverviewPage() {
  const { user } = useAuth();
  const profile = user || {
    fullName: "Alex Johnson",
    skills: ["React", "Python", "Machine Learning"],
    interests: ["AI/ML", "Web Development"],
    department: "Computer Science",
    uid: "demo_student_001",
  };

  const recommendations = getCollaborationRecommendations(
    profile as Parameters<typeof getCollaborationRecommendations>[0],
    demoProjects
  ).slice(0, 3);

  const insights = getAcademicInsights(demoAcademicRecords);
  const unreadNotifs = demoNotifications.filter((n) => !n.read).length;

  return (
    <div>
      <TopBar
        title={`Welcome back, ${profile.fullName?.split(" ")[0] || "Student"}!`}
        subtitle="Here's your campus overview"
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attendance"
            value={`${insights.overallAttendance}%`}
            change="+3% this month"
            changeType="positive"
            icon={<GraduationCap className="h-5 w-5" />}
          />
          <StatCard
            title="Active Projects"
            value="3"
            change="2 collaborations"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Notifications"
            value={unreadNotifs}
            change="Unread messages"
            accent
            icon={<Bell className="h-5 w-5" />}
          />
          <StatCard
            title="Performance"
            value="87%"
            change="+5% vs last sem"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Project Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendations.map((proj) => (
                <Link
                  key={proj.id}
                  href="/dashboard/student/collaboration-hub"
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{proj.title}</p>
                    <p className="text-xs text-muted">{proj.domain} · {proj.department}</p>
                  </div>
                  <Badge variant="cyan">{proj.matchScore}% match</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={analyticsData.performance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={analyticsData.attendance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[70, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted">
                  <BookOpen className="h-4 w-4 text-cyan mt-0.5 shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
              <Link
                href="/dashboard/student/academic-tracker"
                className="block text-sm text-primary font-semibold hover:underline mt-2"
              >
                View full academic report →
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Book Appointment", href: "/dashboard/student/faculty-connect", icon: Calendar },
            { label: "Find Collaborators", href: "/dashboard/student/collaboration-hub", icon: Users },
            { label: "Ask a Question", href: "/dashboard/student/forum", icon: BookOpen },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
