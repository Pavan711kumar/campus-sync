"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { archivedProjects } from "@/data/dummy";
import { DEPARTMENTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Archive, Search, Download, Users } from "lucide-react";

export default function RepositoryPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");

  const filtered = archivedProjects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "all" || p.department === dept;
    return matchSearch && matchDept;
  });

  return (
    <div>
      <TopBar title="Colab Repository" subtitle="Browse completed projects, reuse ideas, and contact contributors" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search completed projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setDept("all")} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${dept === "all" ? "bg-primary text-white" : "bg-gray-100 text-muted"}`}>
            All Departments
          </button>
          {DEPARTMENTS.slice(0, 6).map((d) => (
            <button key={d} onClick={() => setDept(d)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${dept === d ? "bg-primary text-white" : "bg-gray-100 text-muted"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filtered.map((project) => (
            <Card key={project.id}>
              <CardContent>
                <div className="flex items-start gap-3 mb-3">
                  <Archive className="h-5 w-5 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{project.title}</h3>
                    <p className="text-sm text-muted mt-1">{project.description}</p>
                  </div>
                  <Badge variant="success">Completed {formatDate(project.completedAt)}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="cyan">{t}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {project.contributors.join(", ")}
                  </span>
                  {project.mentorName && (
                    <span>Mentor: {project.mentorName}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  {project.documents.map((doc) => (
                    <Button key={doc} variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5" /> {doc}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
