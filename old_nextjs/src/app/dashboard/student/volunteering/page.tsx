"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoEvents } from "@/data/dummy";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

export default function VolunteeringPage() {
  const { addRequest, hasRequested } = useRequests();
  return (
    <div>
      <TopBar title="Volunteering & Events" subtitle="Join events, earn certificates, and serve the community" />
      <div className="p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Events Joined", value: "5" },
            { label: "Service Hours", value: "48" },
            { label: "Certificates", value: "3" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="text-center py-4">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4">
          {demoEvents.map((event) => (
            <Card key={event.id} hover>
              <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground">{event.title}</h3>
                    <Badge variant="secondary">{event.type}</Badge>
                    {event.certificateOffered && (
                      <Badge variant="cyan"><Award className="h-3 w-3 mr-1" />Certificate</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-2">{event.description}</p>
                  <div className="flex gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {event.location}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {event.volunteersRegistered}/{event.volunteersNeeded} volunteers
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={event.volunteersRegistered >= event.volunteersNeeded || hasRequested(event.id)}
                  onClick={() => addRequest("event", event.id, event.title)}
                >
                  {hasRequested(event.id) ? "Requested" : "Register"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
