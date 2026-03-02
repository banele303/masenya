"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Package,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Activity,
  Box,
  CreditCard,
  Users,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Area,
  AreaChart,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const sparklineData = [
  { value: 400 }, { value: 300 }, { value: 500 }, { value: 450 }, { value: 600 }, { value: 550 }, { value: 700 }
];

export default function AdminPage() {
  const productStats = useQuery(api.cars.getStats);
  const orderStats = useQuery(api.inquiries.getStats);
  const hireStats = useQuery(api.inquiries.getStats);
  const setAdmin = useMutation(api.users.setAdmin);

  const handleSetAdmin = async () => {
    try {
      await setAdmin();
      toast.success("Admin privileges activated.");
    } catch (error) {
      toast.error("Authorization failed.");
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Flagship Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
            <Activity className="h-3.5 w-3.5" />
            System Operational
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
            Control <span className="text-primary italic">Center.</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg">
            Propelling <span className="text-slate-900 dark:text-slate-200 font-bold">Masenya Auto Parts</span> into the next frontier of logistics.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={handleSetAdmin} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              Reset Permissions
           </Button>
           <Link href="/admin/products">
              <Button className="bg-slate-900 border-none text-white h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-black/20 hover:scale-105 transition-transform active:scale-95">
                <Plus className="mr-2 h-4 w-4 text-primary" />
                Initialize Stock
              </Button>
           </Link>
        </div>
      </div>

      {/* KPI HUD */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: `R${(orderStats?.totalRevenue || 0).toLocaleString()}`, icon: CreditCard, color: "text-emerald-500", trend: "+12%" },
          { label: "Fleet Inventory", value: productStats?.totalProducts || 0, icon: Box, color: "text-blue-500", trend: "+3%" },
          { label: "Active Orders", value: orderStats?.pendingOrders || 0, icon: ShoppingCart, color: "text-primary", trend: "+8%" },
          { label: "Total Reach", value: "2.4k", icon: Users, color: "text-purple-500", trend: "+15%" },
        ].map((kpi, i) => (
          <Card key={i} className="bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 shadow-sm rounded-3xl overflow-hidden group hover:ring-2 hover:ring-primary/20 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter mb-4">{kpi.value}</div>
              <div className="h-10 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                       <Area type="monotone" dataKey="value" stroke={i === 2 ? "#dc2626" : "#cbd5e1"} fill={i === 2 ? "#fee2e2" : "#f1f5f9"} strokeWidth={2} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Active Dispatch Radar */}
        <Card className="lg:col-span-8 border-slate-100 dark:border-slate-800 shadow-xl rounded-[40px] overflow-hidden">
          <CardHeader className="p-10 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">Growth Trajectory</CardTitle>
                <CardDescription>Visualizing market penetration and revenue yield</CardDescription>
              </div>
              <Badge variant="outline" className="rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-widest border-primary text-primary bg-primary/5">Real-time Pulse</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-6">
            <ChartContainer config={{ 
              val: { label: "Revenue", color: "hsl(var(--primary))" } 
            }} className="h-[300px] w-full">
              <AreaChart data={[
                { m: 'Jan', v: 400 }, { m: 'Feb', v: 300 }, { m: 'Mar', v: 550 }, 
                { m: 'Apr', v: 480 }, { m: 'May', v: 700 }, { m: 'Jun', v: 620 }
              ]}>
                <defs>
                   <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.01} />
                   </linearGradient>
                </defs>
                <XAxis dataKey="m" hide />
                <Tooltip content={<ChartTooltipContent hideLabel />} />
                <Area type="monotone" dataKey="v" stroke="#dc2626" strokeWidth={4} fill="url(#dashboardGrad)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-10 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
             <div className="flex gap-12">
                <div>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Efficiency</p>
                   <p className="text-2xl font-black italic">98.4%</p>
                </div>
                <div>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Retention</p>
                   <p className="text-2xl font-black italic">92.0%</p>
                </div>
             </div>
             <Link href="/admin/analytics">
                <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 h-12 px-6 font-bold uppercase tracking-widest text-[10px] hover:bg-white dark:hover:bg-slate-800 transition-all">
                   Full Analysis <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
          </div>
        </Card>

        {/* Quick Insights */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-primary text-black border-none shadow-2xl shadow-primary/20 rounded-[40px] p-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12">
                 <TrendingUp className="h-64 w-64" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-tight mb-4">Stock Velocity Alert.</h3>
              <p className="font-bold text-sm leading-relaxed mb-8 opacity-80">BMW Mechanical components are moving 3x faster than average. Consider increasing purchase orders for Q3.</p>
              <Button className="w-full bg-black text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-transform">
                 Adjust Logistics
              </Button>
           </Card>

           <Card className="border-slate-100 dark:border-slate-800 shadow-xl rounded-[40px] p-10">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6">Recent Inquiries</h3>
              <div className="space-y-6">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black group-hover:bg-primary transition-colors">
                            {String.fromCharCode(64 + i)}
                         </div>
                         <div>
                            <p className="text-sm font-black uppercase tracking-tight">John Doe</p>
                            <p className="text-[10px] text-muted-foreground font-bold italic">Toyota Engine Block</p>
                         </div>
                      </div>
                      <Badge variant="secondary" className="bg-slate-50 dark:bg-slate-800 font-bold text-[8px] uppercase tracking-tighter">Pending</Badge>
                   </div>
                 ))}
              </div>
              <Button variant="link" className="w-full mt-8 font-black uppercase tracking-widest text-[9px] text-muted-foreground hover:text-primary">View All Activities</Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
