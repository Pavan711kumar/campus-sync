"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoRentals } from "@/data/dummy";
import { formatCurrency } from "@/lib/utils";
import { Home, Star, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

const types = ["all", "room", "pg", "hostel", "bike", "calculator", "laptop", "camera", "projector"];

export default function RentalsPage() {
  const { addRequest, hasRequested } = useRequests();
  const [typeFilter, setTypeFilter] = useState("all");
  const filtered = typeFilter === "all" ? demoRentals : demoRentals.filter((r) => r.type === typeFilter);

  return (
    <div>
      <TopBar title="Rental Marketplace" subtitle="Find rooms, bikes, laptops, and more" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
                  typeFilter === t ? "bg-primary text-white" : "bg-gray-100 text-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <Button onClick={() => toast.info("List rental form")}>
            <Plus className="h-4 w-4" /> List Item
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((rental) => (
            <Card key={rental.id} hover>
              <CardContent>
                <div className="h-36 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl mb-4 flex items-center justify-center">
                  <Home className="h-10 w-10 text-primary" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{rental.title}</h3>
                  <Badge variant="primary">{rental.type}</Badge>
                </div>
                <p className="text-sm text-muted mb-2">{rental.description}</p>
                <p className="text-xs text-muted mb-3">{rental.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-primary">
                      {formatCurrency(rental.price)}/{rental.priceUnit}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs">{rental.rating}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    disabled={hasRequested(rental.id)}
                    onClick={() => addRequest("rental", rental.id, rental.title)}
                  >
                    {hasRequested(rental.id) ? "Requested" : "Book Now"}
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
