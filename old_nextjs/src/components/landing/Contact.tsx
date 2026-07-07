"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";

export function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted mb-8">
              Have questions about CampusSync AI? We&apos;d love to hear from you.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: "contact@campussync.ai" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: MapPin, text: "Innovation Center, University Campus" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-muted">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
            <Input label="Name" placeholder="Your name" required />
            <Input label="Email" type="email" placeholder="your@college.edu" required />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-none"
                placeholder="How can we help?"
                required
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="font-bold text-sm">CS</span>
              </div>
              <span className="font-bold">{APP_NAME}</span>
            </div>
            <p className="text-white/70 text-sm">
              AI-powered college collaboration platform for the modern campus.
            </p>
          </div>
          {[
            { title: "Platform", links: ["Features", "Collaboration", "Academic Tracker", "Forum"] },
            { title: "Resources", links: ["Documentation", "API", "Blog", "Support"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
