"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoAppointments } from "@/data/dummy";
import { getFacultyRecommendations } from "@/services/ai";
import { Calendar, Clock, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

const facultyList = [
  { id: "f1", name: "Dr. Priya Sharma", department: "Computer Science", expertise: ["Machine Learning", "AI"], status: "Available" as const },
  { id: "f2", name: "Prof. Raj Kumar", department: "Electronics", expertise: ["IoT", "Embedded"], status: "In Class" as const },
  { id: "f3", name: "Dr. Anita Desai", department: "Mathematics", expertise: ["Algorithms", "Statistics"], status: "Available" as const },
  { id: "f4", name: "Prof. James Wilson", department: "Mechanical", expertise: ["Robotics", "Design"], status: "Busy" as const },
];

const statusColors: Record<string, "success" | "warning" | "accent" | "default"> = {
  Available: "success",
  "In Class": "warning",
  "In Meeting": "accent",
  Busy: "accent",
  "Out of Campus": "default",
};

export default function FacultyConnectPage() {
  const { addRequest, hasRequested } = useRequests();
  const [purpose, setPurpose] = useState("");
  const recommendations = purpose
    ? getFacultyRecommendations(purpose, facultyList)
    : facultyList;

  return (
    <div>
      <TopBar
        title="Smart Faculty Connect"
        subtitle="Book appointments and manage permission requests"
      />
      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Directory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{f.name}</p>
                        <p className="text-xs text-muted">{f.department}</p>
                        <div className="flex gap-1 mt-1">
                          {f.expertise.map((e) => (
                            <Badge key={e} className="text-[10px]">{e}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColors[f.status] || "default"}>{f.status}</Badge>
                      {"score" in f && (
                        <Badge variant="cyan">{(f as { score: number }).score}% match</Badge>
                      )}
                      <Button
                        size="sm"
                        disabled={f.status !== "Available" || hasRequested(f.id)}
                        onClick={() => addRequest("appointment", f.id, f.name)}
                      >
                        {hasRequested(f.id) ? "Requested" : "Book"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Faculty Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Describe your purpose (e.g., ML project mentorship)..."
                  className="w-full px-3 py-2 rounded-2xl border border-gray-200 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  Permission Routing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted space-y-2">
                <p>Requests auto-route through hierarchy:</p>
                <div className="space-y-1 text-xs">
                  {["Caretaker", "Warden", "HOD", "Dean"].map((role, i) => (
                    <div key={role} className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                        {i + 1}
                      </span>
                      {role}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">{apt.facultyName}</p>
                    <p className="text-xs text-muted">{apt.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted">
                    <Calendar className="h-3.5 w-3.5" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1 text-muted">
                    <Clock className="h-3.5 w-3.5" /> {apt.time}
                  </span>
                  <Badge variant={apt.status === "confirmed" ? "success" : "warning"}>
                    {apt.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
