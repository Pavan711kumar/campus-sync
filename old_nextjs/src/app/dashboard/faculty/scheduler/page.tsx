"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FACULTY_STATUSES } from "@/lib/constants";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { useFaculty } from "@/context/FacultyContext";

const schedule = [
  { day: "Monday", slots: ["9:00 AM - 10:00 AM", "2:00 PM - 4:00 PM"] },
  { day: "Tuesday", slots: ["10:00 AM - 12:00 PM"] },
  { day: "Wednesday", slots: ["9:00 AM - 11:00 AM", "3:00 PM - 5:00 PM"] },
  { day: "Thursday", slots: ["1:00 PM - 3:00 PM"] },
  { day: "Friday", slots: ["9:00 AM - 10:00 AM"] },
];

export default function FacultySchedulerPage() {
  const { status: activeStatus, setStatus } = useFaculty();
  return (
    <div>
      <TopBar title="Faculty Scheduler" subtitle="Manage your availability and class schedule" />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {FACULTY_STATUSES.map((status) => (
                <Button
                  key={status}
                  variant={status === activeStatus ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setStatus(status as any)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map((day) => (
            <Card key={day.day}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-primary" />
                  {day.day}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {day.slots.map((slot) => (
                  <div key={slot} className="flex items-center gap-2 text-sm text-muted p-2 rounded-xl bg-gray-50">
                    <Clock className="h-3.5 w-3.5" />
                    {slot}
                    <Badge variant="success" className="ml-auto">Open</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
