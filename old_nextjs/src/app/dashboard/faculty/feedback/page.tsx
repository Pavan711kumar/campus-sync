"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Star, TrendingUp, MessageSquare, ThumbsUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { month: "Sep", rating: 4.2, responses: 28 },
  { month: "Oct", rating: 4.5, responses: 35 },
  { month: "Nov", rating: 4.3, responses: 30 },
  { month: "Dec", rating: 4.7, responses: 42 },
  { month: "Jan", rating: 4.6, responses: 38 },
  { month: "Feb", rating: 4.8, responses: 45 },
];

const categoryData = [
  { name: "Teaching", value: 45, color: "#1e3a8a" },
  { name: "Mentoring", value: 30, color: "#7c3aed" },
  { name: "Availability", value: 15, color: "#06b6d4" },
  { name: "Communication", value: 10, color: "#f97316" },
];

const recentFeedback = [
  { student: "Alex Johnson", rating: 5, comment: "Excellent mentorship on ML project!", date: "Mar 5" },
  { student: "Sarah Chen", rating: 5, comment: "Very approachable and helpful.", date: "Mar 3" },
  { student: "Mike Patel", rating: 4, comment: "Great lectures, could improve lab sessions.", date: "Feb 28" },
];

export default function FeedbackPage() {
  return (
    <div>
      <TopBar title="Feedback Analytics" subtitle="Track student feedback and improve teaching" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Overall Rating" value="4.8" change="+0.2" changeType="positive" icon={<Star className="h-5 w-5" />} accent />
          <StatCard title="Total Responses" value="218" icon={<MessageSquare className="h-5 w-5" />} />
          <StatCard title="Positive Rate" value="92%" changeType="positive" icon={<ThumbsUp className="h-5 w-5" />} />
          <StatCard title="Trend" value="↑" change="Improving" changeType="positive" icon={<TrendingUp className="h-5 w-5" />} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Monthly Ratings</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis domain={[3.5, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Feedback Categories</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Recent Feedback</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recentFeedback.map((fb) => (
              <div key={fb.student} className="flex items-start justify-between p-4 rounded-2xl bg-gray-50">
                <div>
                  <p className="font-semibold text-sm">{fb.student}</p>
                  <p className="text-sm text-muted mt-1">{fb.comment}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xs text-muted mt-1">{fb.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
