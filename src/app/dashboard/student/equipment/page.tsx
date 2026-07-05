"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { demoEquipment } from "@/data/dummy";
import { EQUIPMENT_CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Star, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useRequests } from "@/context/RequestsContext";

export default function EquipmentPage() {
  const { addRequest, hasRequested } = useRequests();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = demoEquipment.filter((e) => {
    const matchCat = category === "all" || e.category === category;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <TopBar title="Equipment Rental" subtitle="Rent engineering kits, IoT components, and lab equipment" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search equipment..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button onClick={() => toast.success("List equipment form coming soon!")}>
            <Plus className="h-4 w-4" /> List Equipment
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCategory("all")} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${category === "all" ? "bg-primary text-white" : "bg-gray-100 text-muted"}`}>
            All
          </button>
          {EQUIPMENT_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${category === c ? "bg-primary text-white" : "bg-gray-100 text-muted"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <Card key={item.id} hover>
              <CardContent>
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🔧</span>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <Badge variant={item.available ? "success" : "warning"}>
                    {item.available ? "Available" : "Rented"}
                  </Badge>
                </div>
                <p className="text-sm text-muted mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">{item.rating}</span>
                  <span className="text-xs text-muted">({item.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-primary">{formatCurrency(item.pricePerDay)}/day</p>
                    <p className="text-xs text-muted">Deposit: {formatCurrency(item.securityDeposit)}</p>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!item.available || hasRequested(item.id)} 
                    onClick={() => addRequest("equipment", item.id, item.title)}
                  >
                    {hasRequested(item.id) ? "Requested" : "Reserve"}
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
