"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { demoUser } from "@/data/dummy";
import { BadgeCheck, Mail, Building } from "lucide-react";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const profile = user || demoUser;

  return (
    <div>
      <TopBar title="Student Profile" subtitle="Your campus identity" />
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="flex flex-col md:flex-row items-start gap-6 pt-6">
            <Avatar name={profile.fullName} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-foreground">{profile.fullName}</h2>
                {profile.isVerified && (
                  <Badge variant="success"><BadgeCheck className="h-3 w-3 mr-1" />Verified</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {profile.email}</span>
                <span className="flex items-center gap-1"><Building className="h-4 w-4" /> {profile.department}</span>
              </div>
              <p className="text-muted mb-4">{profile.bio || "No bio added yet."}</p>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((b) => (
                  <Badge key={b} variant="primary">{b}</Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {(profile.skills.length ? profile.skills : ["Add your skills"]).map((s) => (
                <Badge key={s} variant="cyan">{s}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Interests</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {(profile.interests.length ? profile.interests : ["Add your interests"]).map((i) => (
                <Badge key={i} variant="secondary">{i}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Domain Expertise</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {(profile.domainExpertise.length ? profile.domainExpertise : ["Not specified"]).map((d) => (
                <Badge key={d}>{d}</Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{profile.experience || "No experience added."}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
