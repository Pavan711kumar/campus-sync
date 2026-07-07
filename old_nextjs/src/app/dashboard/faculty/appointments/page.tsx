"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoAppointments } from "@/data/dummy";
import { Calendar, Clock, User, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useFaculty } from "@/context/FacultyContext";

export default function AppointmentsPage() {
  const { appointments, acceptAppointment, declineAppointment } = useFaculty();

  return (
    <div>
      <TopBar title="Student Appointments" subtitle="Manage student meeting requests" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Pending", count: appointments.filter((a) => a.status === "pending").length, color: "warning" as const },
            { label: "Confirmed", count: appointments.filter((a) => a.status === "confirmed").length, color: "success" as const },
            { label: "Completed", count: appointments.filter((a) => a.status === "completed").length, color: "primary" as const },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="text-center py-4">
                <p className="text-3xl font-bold text-primary">{stat.count}</p>
                <Badge variant={stat.color} className="mt-2">{stat.label}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Appointment Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {appointments.map((apt) => (
              <div key={apt.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{apt.studentName}</p>
                    <p className="text-xs text-muted">{apt.purpose}</p>
                    <div className="flex gap-3 mt-1 text-xs text-muted">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {apt.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={apt.priority === "urgent" ? "accent" : "default"}>{apt.priority}</Badge>
                  <Badge variant={apt.status === "confirmed" ? "success" : "warning"}>{apt.status}</Badge>
                  {apt.status === "pending" && (
                    <>
                      <Button size="sm" onClick={() => acceptAppointment(apt.id)}>
                        <Check className="h-3.5 w-3.5" /> Accept
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => declineAppointment(apt.id)}>
                        <X className="h-3.5 w-3.5" /> Decline
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
