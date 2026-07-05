"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoForumQuestions } from "@/data/dummy";
import { FORUM_CATEGORIES } from "@/lib/constants";
import { MessageSquare, ThumbsUp, CheckCircle, Plus, Search } from "lucide-react";
import { toast } from "sonner";

export default function ForumPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = demoForumQuestions.filter((q) => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || q.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <TopBar title="Academic Support Forum" subtitle="Ask questions, get answers, earn reputation" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button onClick={() => toast.success("Ask question form coming soon!")}>
            <Plus className="h-4 w-4" /> Ask Question
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              category === "all" ? "bg-primary text-white" : "bg-gray-100 text-muted"
            }`}
          >
            All
          </button>
          {FORUM_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                category === c ? "bg-primary text-white" : "bg-gray-100 text-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((q) => (
            <Card key={q.id} hover>
              <CardContent className="flex gap-4">
                <div className="flex flex-col items-center gap-1 text-center min-w-[60px]">
                  <span className="text-lg font-bold text-foreground">{q.upvotes}</span>
                  <ThumbsUp className="h-4 w-4 text-muted" />
                  <span className="text-xs text-muted">votes</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{q.title}</h3>
                    {q.hasAcceptedAnswer && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-muted line-clamp-2 mb-2">{q.content}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {q.tags.map((t) => (
                      <Badge key={t} variant="primary">{t}</Badge>
                    ))}
                    <span className="text-xs text-muted ml-auto flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> {q.answers} answers
                    </span>
                    <Badge variant={q.authorRole === "faculty" ? "secondary" : "default"}>
                      {q.authorName}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
