"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { smartSearch } from "@/services/ai";
import {
  demoProjects,
  demoEquipment,
  demoForumQuestions,
} from "@/data/dummy";
import type { SearchResult } from "@/types";
import Link from "next/link";

const searchData = {
  students: [
    { id: "s1", name: "Alex Johnson", department: "Computer Science" },
    { id: "s2", name: "Sarah Chen", department: "Computer Science" },
    { id: "s3", name: "Mike Patel", department: "Information Technology" },
  ],
  faculty: [
    { id: "f1", name: "Dr. Priya Sharma", department: "Computer Science" },
    { id: "f2", name: "Prof. Raj Kumar", department: "Electronics" },
  ],
  projects: demoProjects,
  equipment: demoEquipment.map((e) => ({ id: e.id, title: e.title, category: e.category })),
  rides: [{ id: "r1", from: "Main Gate", to: "City Mall" }],
  rentals: [{ id: "rent1", title: "Single Room", type: "room" }],
  events: [{ id: "e1", title: "AI Workshop", type: "workshop" }],
  questions: demoForumQuestions.map((q) => ({ id: q.id, title: q.title, category: q.category })),
};

const typeLabels: Record<SearchResult["type"], string> = {
  student: "Student",
  faculty: "Faculty",
  project: "Project",
  equipment: "Equipment",
  ride: "Ride",
  rental: "Rental",
  event: "Event",
  question: "Question",
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults(smartSearch(query, searchData));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="AI-powered search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 max-h-80 overflow-y-auto">
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.id}`}
              href={r.link}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {typeLabels[r.type]}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="text-xs text-muted">{r.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
