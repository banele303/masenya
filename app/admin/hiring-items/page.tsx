"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles, ShoppingBag, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminProductsTab from "@/components/admin/AdminProductsTab";

export default function HiringItemsPage() {
  const productStats = useQuery(api.cars.getStats);
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-purple-900">Leasing Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Manage your leasing inventory
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiring Items</CardTitle>
            <LayoutGrid className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productStats?.decorCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Available in catalog</p>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hire Requests</CardTitle>
            <Sparkles className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New</div>
            <p className="text-xs text-muted-foreground mt-1">Manage event bookings</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <ShoppingBag className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productStats?.lowStock || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Items needing attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-100 shadow-sm">
        <CardHeader>
          <CardTitle>Catalog Management</CardTitle>
          <CardDescription>
            Manage item availability, pricing, and event hire options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminProductsTab initialCategory="decor" />
        </CardContent>
      </Card>
    </div>
  );
}
