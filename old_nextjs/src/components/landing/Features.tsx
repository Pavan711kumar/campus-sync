"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Calendar,
  MessageSquare,
  Wrench,
  Car,
  Brain,
  Search,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Collaboration Hub",
    description: "LinkedIn-style project recruitment with AI-powered skill matching and team formation.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: GraduationCap,
    title: "Academic Tracker",
    description: "Centralized attendance, marks, assignments, and performance analytics dashboard.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Calendar,
    title: "Smart Faculty Connect",
    description: "Intelligent appointment booking with smart routing and real-time faculty status.",
    color: "bg-cyan/10 text-cyan-dark",
  },
  {
    icon: MessageSquare,
    title: "Academic Forum",
    description: "Stack Overflow-style Q&A with faculty answers, upvotes, and reputation points.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Wrench,
    title: "Equipment Rental",
    description: "Peer-to-peer marketplace for engineering kits, IoT components, and lab equipment.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Car,
    title: "Ride Sharing",
    description: "Campus ride-sharing with route matching, cost sharing, and scheduling.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Personalized project, faculty, and equipment suggestions powered by AI.",
    color: "bg-cyan/10 text-cyan-dark",
  },
  {
    icon: Search,
    title: "Global Smart Search",
    description: "AI-powered search across students, projects, equipment, rides, and events.",
    color: "bg-accent/10 text-accent",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything Your Campus Needs
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            A comprehensive suite of tools designed to enhance academic collaboration,
            streamline campus life, and foster innovation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`inline-flex p-3 rounded-2xl ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
