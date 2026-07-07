"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { demoAcademicRecords, analyticsData } from "@/data/dummy";
import { getAcademicInsights } from "@/services/ai";
import { GraduationCap, AlertTriangle, FileText, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

export default function AcademicTrackerPage() {
  const insights = getAcademicInsights(demoAcademicRecords);

  const radarData = demoAcademicRecords.map((r) => ({
    subject: r.subject.split(" ")[0],
    attendance: r.attendance,
    marks: r.internalMarks * 2,
    assignments: r.assignmentScore,
  }));

  return (
    <div>
      <TopBar
        title="Academic Tracker"
        subtitle="Monitor attendance, marks, and academic performance"
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Overall Attendance"
            value={`${insights.overallAttendance}%`}
            changeType={insights.overallAttendance >= 75 ? "positive" : "negative"}
            icon={<GraduationCap className="h-5 w-5" />}
          />
          <StatCard
            title="Subjects"
            value={demoAcademicRecords.length}
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard
            title="Alerts"
            value={insights.lowAttendance.length}
            change="Low attendance"
            changeType="negative"
            accent={insights.lowAttendance.length > 0}
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <StatCard
            title="Upcoming Exams"
            value="3"
            change="Next: Mar 15"
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData.performance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <Radar dataKey="attendance" stroke="#1e3a8a" fill="#1e3a8a" fillOpacity={0.3} />
                  <Radar dataKey="assignments" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["Subject", "Attendance", "Internals", "Assignments", "Quiz", "Lab", "Result"].map(
                      (h) => (
                        <th key={h} className="text-left py-3 px-4 font-semibold text-muted">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {demoAcademicRecords.map((record) => (
                    <tr key={record.subject} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{record.subject}</td>
                      <td className="py-3 px-4">
                        <Badge variant={record.attendance >= 75 ? "success" : "warning"}>
                          {record.attendance}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{record.internalMarks}/50</td>
                      <td className="py-3 px-4">{record.assignmentScore}%</td>
                      <td className="py-3 px-4">{record.quizScore}/50</td>
                      <td className="py-3 px-4">{record.labScore}%</td>
                      <td className="py-3 px-4 font-semibold">
                        {record.semesterResult ? `${record.semesterResult}%` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {insights.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {insights.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted p-2 rounded-xl bg-primary/5">
                  <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                  {rec}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
