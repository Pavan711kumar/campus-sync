"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered Campus Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Connect. Collaborate.{" "}
              <span className="text-primary">Excel.</span>
            </h1>
            <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">
              CampusSync AI eliminates communication barriers, streamlines academic
              collaboration, and creates a centralized digital campus ecosystem for
              students and faculty.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">Explore Features</Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8">
              {[
                { value: "10K+", label: "Students" },
                { value: "500+", label: "Faculty" },
                { value: "2K+", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-2xl shadow-2xl border border-gray-100 overflow-hidden bg-white">
      <div className="bg-primary px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-white/80 text-xs ml-2">CampusSync Dashboard</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="col-span-1 bg-gray-50 rounded-xl p-3 space-y-2">
          {["Overview", "Academic", "Collaborate", "Forum", "Equipment"].map((item, i) => (
            <div
              key={item}
              className={`text-xs px-2 py-1.5 rounded-lg ${i === 0 ? "bg-primary text-white" : "text-muted"}`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="col-span-2 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-accent/10 rounded-xl p-3">
              <p className="text-xs text-muted">Attendance</p>
              <p className="text-lg font-bold text-accent">91%</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-3">
              <p className="text-xs text-muted">Projects</p>
              <p className="text-lg font-bold text-primary">12</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-foreground mb-2">AI Recommendations</p>
            {["Smart Campus IoT", "AI Study Assistant"].map((p) => (
              <div key={p} className="flex items-center justify-between py-1.5">
                <span className="text-xs text-muted">{p}</span>
                <span className="text-xs font-bold text-cyan">92%</span>
              </div>
            ))}
          </div>
          <div className="h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl flex items-end px-3 pb-2 gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
