"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoErrands } from "@/data/dummy";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ShoppingBag, Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

export default function ErrandsPage() {
  const { addRequest, hasRequested } = useRequests();
  return (
    <div>
      <TopBar title="Errands Marketplace" subtitle="Post and accept campus errands for rewards" />
      <div className="p-6 space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => toast.info("Post errand form")}>
            <Plus className="h-4 w-4" /> Post Errand
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {demoErrands.map((errand) => (
            <Card key={errand.id} hover>
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                    <h3 className="font-bold text-foreground">{errand.title}</h3>
                  </div>
                  <Badge variant="accent">{formatCurrency(errand.reward)}</Badge>
                </div>
                <p className="text-sm text-muted mb-3">{errand.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <Badge>{errand.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Due {formatDate(errand.deadline)}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={hasRequested(errand.id)}
                    onClick={() => addRequest("errand", errand.id, errand.title)}
                  >
                    {hasRequested(errand.id) ? "Requested" : "Accept"}
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
