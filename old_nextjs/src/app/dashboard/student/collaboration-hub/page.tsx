"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useRequests } from "@/context/RequestsContext";
import { demoProjects } from "@/data/dummy";
import { getCollaborationRecommendations } from "@/services/ai";
import { DOMAINS } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Plus, Users, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function CollaborationHubPage() {
  const { user } = useAuth();
  const { addRequest, hasRequested } = useRequests();
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [paidFilter, setPaidFilter] = useState<"all" | "paid" | "unpaid">("all");

  const profile = user || {
    skills: ["React", "Python"],
    interests: ["AI/ML"],
    department: "Computer Science",
    uid: "demo",
    fullName: "Student",
    email: "",
    role: "student" as const,
    experience: "",
    bio: "",
    badges: [],
    domainExpertise: [],
    isVerified: true,
    createdAt: "",
    updatedAt: "",
  };

  const recommendations = getCollaborationRecommendations(profile, demoProjects);

  const filtered = recommendations.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchDomain = domainFilter === "all" || p.domain === domainFilter;
    const matchPaid =
      paidFilter === "all" ||
      (paidFilter === "paid" && p.isPaid) ||
      (paidFilter === "unpaid" && !p.isPaid);
    return matchSearch && matchDomain && matchPaid;
  });

  return (
    <div>
      <TopBar
        title="Collaboration Hub"
        subtitle="Find projects, form teams, and collaborate across departments"
      />
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button onClick={() => toast.success("Create project form coming soon!")}>
            <Plus className="h-4 w-4" /> Post Project
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDomainFilter("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              domainFilter === "all" ? "bg-primary text-white" : "bg-gray-100 text-muted"
            }`}
          >
            All Domains
          </button>
          {DOMAINS.map((d) => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                domainFilter === d ? "bg-primary text-white" : "bg-gray-100 text-muted"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {(["all", "paid", "unpaid"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setPaidFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                paidFilter === f ? "bg-secondary text-white" : "bg-gray-100 text-muted"
              }`}
            >
              {f === "all" ? "All Types" : f}
            </button>
          ))}
        </div>

        {recommendations.length > 0 && (
          <Card className="border-2 border-cyan/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                AI Recommendations
                <Badge variant="cyan">Personalized</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                {recommendations.slice(0, 3).map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-cyan/5 border border-cyan/10">
                    <p className="text-sm font-semibold">{p.title}</p>
                    <p className="text-xs text-muted mt-1">{p.matchScore}% skill match</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {filtered.map((project) => (
            <Card key={project.id} hover>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                      <Badge variant={project.isPaid ? "accent" : "primary"}>
                        {project.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                      <Badge variant="secondary">{project.type}</Badge>
                      {"matchScore" in project && (
                        <Badge variant="cyan">{(project as { matchScore: number }).matchScore}% match</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.requiredSkills.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {project.currentMembers}/{project.teamSize} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Due {formatDate(project.deadline)}
                      </span>
                      {project.isPaid && project.budget && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5" />
                          {formatCurrency(project.budget)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info("Project details view")}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      disabled={hasRequested(project.id)}
                      onClick={() => addRequest("project", project.id, project.title)}
                    >
                      {hasRequested(project.id) ? "Requested" : "Join Project"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
