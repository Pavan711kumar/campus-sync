"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { demoFaculty } from "@/data/dummy";
import { BookOpen, Award, FileText } from "lucide-react";

const publications = [
  { title: "Deep Learning for Medical Imaging", journal: "IEEE Transactions", year: 2025 },
  { title: "Federated Learning in Edge Computing", journal: "ACM Computing Surveys", year: 2024 },
  { title: "Ethical AI Framework for Education", journal: "Nature AI", year: 2024 },
];

const courses = [
  { name: "Machine Learning", semester: "Spring 2026", students: 120 },
  { name: "Data Structures", semester: "Spring 2026", students: 180 },
  { name: "AI Ethics", semester: "Fall 2025", students: 60 },
];

export default function PortfolioPage() {
  return (
    <div>
      <TopBar title="Faculty Portfolio" subtitle="Showcase your academic achievements" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-foreground">{demoFaculty.fullName}</h2>
            <p className="text-muted mt-1">{demoFaculty.department} · {demoFaculty.experience}</p>
            <p className="text-sm text-muted mt-3">{demoFaculty.bio}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {demoFaculty.badges.map((b) => (
                <Badge key={b} variant="primary"><Award className="h-3 w-3 mr-1" />{b}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Publications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {publications.map((pub) => (
              <div key={pub.title} className="p-3 rounded-2xl bg-gray-50">
                <p className="font-semibold text-sm">{pub.title}</p>
                <p className="text-xs text-muted">{pub.journal} · {pub.year}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {courses.map((course) => (
              <div key={course.name} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
                <div>
                  <p className="font-semibold text-sm">{course.name}</p>
                  <p className="text-xs text-muted">{course.semester}</p>
                </div>
                <Badge>{course.students} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
