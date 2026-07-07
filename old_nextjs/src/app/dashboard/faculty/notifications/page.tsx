"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { demoNotifications } from "@/data/dummy";
import { formatDate } from "@/lib/utils";

export default function FacultyNotificationsPage() {
  return (
    <div>
      <TopBar title="Notifications" subtitle="Stay updated on appointments and student requests" />
      <div className="p-6 space-y-3">
        {demoNotifications.map((notif) => (
          <Card key={notif.id} hover className={!notif.read ? "border-l-4 border-l-primary" : ""}>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{notif.title}</h3>
                <p className="text-sm text-muted">{notif.message}</p>
                <p className="text-xs text-muted mt-1">{formatDate(notif.createdAt)}</p>
              </div>
              <Badge variant="primary">{notif.type}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
