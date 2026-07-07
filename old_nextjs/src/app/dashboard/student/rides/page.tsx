"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoRides } from "@/data/dummy";
import { formatCurrency } from "@/lib/utils";
import { Car, MapPin, Clock, Users, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

export default function RidesPage() {
  const { addRequest, hasRequested } = useRequests();
  return (
    <div>
      <TopBar title="Ride Sharing" subtitle="Share rides across campus and reduce travel costs" />
      <div className="p-6 space-y-6">
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => toast.info("Request ride form")}>
            Request Ride
          </Button>
          <Button onClick={() => toast.info("Offer ride form")}>
            <Plus className="h-4 w-4" /> Offer Ride
          </Button>
        </div>

        <div className="grid gap-4">
          {demoRides.map((ride) => (
            <Card key={ride.id} hover>
              <CardContent className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <Car className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-muted" />
                      <span className="font-semibold">{ride.from}</span>
                      <span className="text-muted">→</span>
                      <span className="font-semibold">{ride.to}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {ride.date} at {ride.time}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {ride.seats} seats</span>
                    </div>
                    <p className="text-xs text-muted mt-1">Driver: {ride.driverName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-primary">{formatCurrency(ride.costPerSeat)}/seat</p>
                    <Badge variant="success">{ride.status}</Badge>
                  </div>
                  <Button 
                    size="sm"
                    disabled={hasRequested(ride.id)}
                    onClick={() => addRequest("ride", ride.id, `Ride to ${ride.to}`)}
                  >
                    {hasRequested(ride.id) ? "Requested" : "Join Ride"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
