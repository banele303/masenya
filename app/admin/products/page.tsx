"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Box, ShieldCheck, Zap, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminProductsTab from "@/components/admin/AdminProductsTab";
import Link from "next/link";

export default function ProductsPage() {
  const productStats = useQuery(api.cars.getStats);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Header section with cinematic title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            <Box className="h-3.5 w-3.5" />
            Asset Management
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
            Inventory <span className="text-primary italic">Matrix.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-2xl">
            Surgical precision in stock management. Oversee every component, panel, and engine block in our 
            <span className="text-slate-900 dark:text-slate-200 font-bold ml-1">Hercules ecosystem.</span>
          </p>
        </div>
        <div>
          <Link href="/admin/products/new">
             <Button className="bg-slate-900 border-none text-white h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 transition-transform active:scale-95">
               <Plus className="mr-2 h-4 w-4 text-primary" />
               New SKU Entry
             </Button>
          </Link>
        </div>
      </div>

      {/* Modern Stats HUD */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Total Components", value: productStats?.jewelryCount || 0, desc: "Global SKUs on catalog", icon: Box, color: "text-primary", bg: "bg-primary/5" },
          { title: "Active Listings", value: productStats?.activeProducts || 0, desc: "Live on showroom floor", icon: Zap, color: "text-blue-500", bg: "bg-blue-500/5" },
          { title: "Critical Stock", value: productStats?.lowStock || 0, desc: "Immediate restock required", icon: Activity, color: "text-red-500", bg: "bg-red-500/5" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-100 dark:border-slate-800 shadow-sm rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black tracking-tighter mb-1 uppercase italic leading-none">{stat.value}</div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Inventory Controller */}
      <Card className="border-slate-100 dark:border-slate-800 shadow-2xl rounded-[40px] overflow-hidden">
        <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Inventory Database</CardTitle>
            <CardDescription className="text-sm font-medium">Full visibility of OEM certified components and fleet units.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 border-slate-200">
               <ShieldCheck className="h-3 w-3 text-emerald-500" />
               OEM Encrypted
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-10">
          <AdminProductsTab initialCategory="spares" />
        </CardContent>
      </Card>
    </div>
  );
}
