"use client";

import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { demoFaculty, demoAppointments } from "@/data/dummy";
import { Users, Calendar, BarChart3, Star } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const feedbackData = [
  { month: "Sep", rating: 4.2 },
  { month: "Oct", rating: 4.5 },
  { month: "Nov", rating: 4.3 },
  { month: "Dec", rating: 4.7 },
  { month: "Jan", rating: 4.6 },
  { month: "Feb", rating: 4.8 },
];

export default function FacultyOverviewPage() {
  return (
    <div>
      <TopBar
        title={`Welcome, ${demoFaculty.fullName.split(" ")[1] || "Faculty"}!`}
        subtitle="Faculty dashboard overview"
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Appointments Today" value="4" icon={<Calendar className="h-5 w-5" />} />
          <StatCard title="Active Students" value="32" icon={<Users className="h-5 w-5" />} />
          <StatCard title="Avg. Feedback" value="4.8" change="+0.2 this month" changeType="positive" icon={<Star className="h-5 w-5" />} accent />
          <StatCard title="Projects Mentored" value="12" icon={<BarChart3 className="h-5 w-5" />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Feedback Analytics</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis domain={[3.5, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Upcoming Appointments</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {demoAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
                  <div>
                    <p className="text-sm font-semibold">{apt.studentName}</p>
                    <p className="text-xs text-muted">{apt.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted">{apt.date} · {apt.time}</p>
                    <Badge variant={apt.status === "confirmed" ? "success" : "warning"}>{apt.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
