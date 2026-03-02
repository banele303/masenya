"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  LayoutDashboard,
  Settings2,
  Download,
  Filter,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "#3b82f6",
  },
  sales: {
    label: "Sales",
    color: "#10b981",
  },
} satisfies ChartConfig;

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function AnalyticsPage() {
  const productStats = useQuery(api.cars.getStats);
  const orderStats = useQuery(api.inquiries.getStats);
  
  const categoryData = [
    { name: 'Mechanical', value: 45, color: '#ef4444' },
    { name: 'Body Parts', value: 25, color: '#3b82f6' },
    { name: 'Electrical', value: 15, color: '#10b981' },
    { name: 'Interior', value: 10, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 45000, orders: 120, growth: 12 },
    { month: 'Feb', revenue: 52000, orders: 150, growth: 15 },
    { month: 'Mar', revenue: 48000, orders: 130, growth: -5 },
    { month: 'Apr', revenue: 61000, orders: 180, growth: 22 },
    { month: 'May', revenue: 72000, orders: 220, growth: 30 },
    { month: 'Jun', revenue: 68000, orders: 200, growth: 18 },
    { month: 'Jul', revenue: 85000, orders: 250, growth: 25 },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <Activity className="h-4 w-4" />
            Live Intelligence
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
            Business <span className="text-primary">Analytics.</span>
          </h1>
          <p className="text-muted-foreground font-medium">
             Real-time performance metrics and warehouse logistics insights.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold uppercase tracking-wider text-[10px] h-11">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button className="rounded-xl font-black uppercase tracking-widest text-[10px] h-11 bg-slate-900 hover:bg-black text-white shadow-xl shadow-black/10">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* High-Level Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Gross Revenue", value: "R1.2M", trend: "+12.5%", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/5" },
          { title: "Active Inventory", value: productStats?.activeProducts || "842", trend: "+5.2%", icon: Package, color: "text-blue-500", bg: "bg-blue-500/5" },
          { title: "Parts Requests", value: orderStats?.totalOrders || "154", trend: "+18.3%", icon: ShoppingCart, color: "text-primary", bg: "bg-primary/5" },
          { title: "Conversion Rate", value: "24.8%", trend: "+2.4%", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/5" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-bold text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" /> {stat.trend}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">vs last month</span>
              </div>
            </CardContent>
            <div className="h-1 w-full bg-slate-50 relative bottom-0">
               <div className={`h-full ${stat.bg.replace('/5', '')} w-[65%]`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Detailed Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-100 p-1 rounded-xl h-12">
            <TabsTrigger value="overview" className="rounded-lg font-bold text-[10px] uppercase tracking-widest h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="revenue" className="rounded-lg font-bold text-[10px] uppercase tracking-widest h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Revenue</TabsTrigger>
            <TabsTrigger value="inventory" className="rounded-lg font-bold text-[10px] uppercase tracking-widest h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">Inventory</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-12">
            {/* Primary Revenue Chart */}
            <Card className="md:col-span-8 border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-black uppercase italic tracking-tighter">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Growth Velocity
                </CardTitle>
                <CardDescription>Performance tracking for the last 7 months</CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
                  <AreaChart data={monthlyData} margin={{ left: 12, right: 12 }}>
                    <defs>
                      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--sm-revenue)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--sm-revenue)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      className="text-[10px] font-bold uppercase tracking-widest fill-muted-foreground"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      className="text-[10px] font-bold uppercase tracking-widest fill-muted-foreground"
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      fill="url(#fillRevenue)"
                      stroke="var(--sm-revenue)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "var(--sm-revenue)", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="bg-slate-50/50 border-t border-slate-100 py-6 px-10">
                <div className="flex w-full items-start gap-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Peak Month</span>
                    <span className="text-xl font-black text-slate-900 italic">JULY 2026</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Net Flow</span>
                    <span className="text-xl font-black text-emerald-500 italic">+R124.5k</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Distribution Pie Chart */}
            <Card className="md:col-span-4 border-slate-100 shadow-sm rounded-3xl flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase italic tracking-tighter">Inventory Mix</CardTitle>
                <CardDescription>Category distribution by stock volume</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer config={{}} className="mx-auto aspect-square max-h-[300px]">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent hideLabel />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-3 p-6 pt-0">
                <div className="grid grid-cols-2 gap-4 w-full">
                   {categoryData.slice(0, 4).map((item, idx) => (
                     <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-600 truncate">{item.name}</span>
                        <span className="text-[10px] font-black ml-auto">{item.value}%</span>
                     </div>
                   ))}
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Sales Bar Chart */}
            <Card className="border-slate-100 shadow-sm rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase italic tracking-tighter">Order Volume</CardTitle>
                <CardDescription>Daily dispatch activity per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <BarChart data={monthlyData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/30" />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      className="text-[10px] font-bold uppercase tracking-widest fill-muted-foreground"
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="var(--sm-orders)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Performance Card */}
            <Card className="bg-slate-900 text-white border-none shadow-xl rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <Settings2 className="h-6 w-6 text-primary/40 animate-spin-slow" />
               </div>
               <CardHeader>
                  <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">Warehouse Efficiency</CardTitle>
                  <CardDescription className="text-slate-400">Operational performance metrics</CardDescription>
               </CardHeader>
               <CardContent className="space-y-8">
                  {[
                    { label: "Order Fulfillment", value: 98, color: "bg-emerald-500" },
                    { label: "Inventory Accuracy", value: 94, color: "bg-blue-500" },
                    { label: "Parts Quality Rating", value: 99, color: "bg-primary" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                        <span className="text-xl font-black italic">{stat.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} rounded-full`} style={{ width: `${stat.value}%` }} />
                      </div>
                    </div>
                  ))}
               </CardContent>
               <CardFooter className="pt-4">
                  <Button className="w-full h-12 rounded-xl bg-primary text-black font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] transition-transform">
                    View Technical Logs
                  </Button>
               </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Bottom Insights Marquee or Row */}
      <div className="grid gap-6 md:grid-cols-3">
         <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Inventory Insight</h4>
            <p className="text-slate-600 font-bold leading-tight">Mechanical Spares demand increased by 40% in the last 14 days. Recommend re-stocking BMW Brake Pads.</p>
         </div>
         <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-blue-500/50 transition-colors cursor-pointer group">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Revenue Predictor</h4>
            <p className="text-slate-600 font-bold leading-tight">Current growth trajectory suggests reaching R1.5M monthly revenue by September 2026.</p>
         </div>
         <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-amber-500/50 transition-colors cursor-pointer group">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">System Alert</h4>
            <p className="text-slate-600 font-bold leading-tight">Warehouse processing time improved by 12 minutes per order due to new labeling system.</p>
         </div>
      </div>
    </div>
  );
}
