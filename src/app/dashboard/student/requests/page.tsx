"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useRequests } from "@/context/RequestsContext";
import { formatDate } from "@/lib/utils";
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import type { RequestStatus } from "@/types";

export default function MyRequestsPage() {
  const { requests, cancelRequest } = useRequests();
  const [filter, setFilter] = useState<RequestStatus | "all">("all");

  const filteredRequests = requests.filter((r) => filter === "all" || r.status === filter);

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadgeVariant = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "accent";
      case "approved":
        return "primary";
      case "rejected":
        return "secondary";
    }
  };

  return (
    <div>
      <TopBar title="My Requests" subtitle="Track all your sent requests and applications" />
      <div className="p-6 space-y-6">
        <div className="flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === f ? "bg-primary text-white" : "bg-gray-100 text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-foreground">No requests found</h3>
            <p className="text-muted mt-1">You haven't made any requests in this category yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRequests.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground capitalize">{req.type} Request</h3>
                      <Badge variant={getStatusBadgeVariant(req.status)} className="capitalize flex items-center gap-1">
                        {getStatusIcon(req.status)}
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted mb-2">Target: <span className="font-medium text-foreground">{req.targetName}</span></p>
                    <p className="text-xs text-gray-400">Requested on: {formatDate(req.createdAt)}</p>
                  </div>
                  {req.status === "pending" && (
                    <Button variant="outline" size="sm" onClick={() => cancelRequest(req.id)}>
                      Cancel Request
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
