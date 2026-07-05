"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { demoNotifications } from "@/data/dummy";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const typeColors: Record<string, "primary" | "secondary" | "accent" | "cyan" | "success" | "warning"> = {
  collaboration: "primary",
  appointment: "secondary",
  forum: "cyan",
  ride: "accent",
  rental: "warning",
  academic: "success",
  event: "secondary",
  general: "primary",
};

export default function NotificationsPage() {
  return (
    <div>
      <TopBar title="Notifications" subtitle="Stay updated on campus activities" />
      <div className="p-6 space-y-3">
        {demoNotifications.map((notif) => (
          <Link key={notif.id} href={notif.link || "#"}>
            <Card hover className={!notif.read ? "border-l-4 border-l-primary" : ""}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-foreground">{notif.title}</h3>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted">{notif.message}</p>
                  <p className="text-xs text-muted mt-1">{formatDate(notif.createdAt)}</p>
                </div>
                <Badge variant={typeColors[notif.type] || "default"}>{notif.type}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
