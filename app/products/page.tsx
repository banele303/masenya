"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Grid,
  List,
  Package,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  X
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProductsPage() {
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // You can expand Convex queries down the road to include price, categories, etc.
  const products = useQuery(api.cars.getAll, {
    make: selectedMake === "all" ? undefined : selectedMake,
  });
  const makes = useQuery(api.cars.getMakes);

  const isLoading = products === undefined;

  // Local filtering based on search query (since backend only supports make currently)
  const filteredProducts = products?.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.make.toLowerCase().includes(query) ||
      p.model.toLowerCase().includes(query) ||
      p.year.toString().includes(query)
    );
  });

  const activeResultsCount = filteredProducts?.length || 0;

  const SidebarFilter = () => (
    <div className="w-full flex-shrink-0 lg:w-[280px] xl:w-[320px]">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
           <h2 className="text-xl font-bold flex items-center gap-2">
             <SlidersHorizontal className="w-5 h-5" /> 
             Filters
           </h2>
           {(selectedMake !== "all" || searchQuery !== "") && (
             <button 
               onClick={() => { setSelectedMake("all"); setSearchQuery(""); }}
               className="text-xs font-semibold text-primary hover:underline"
             >
               Clear All
             </button>
           )}
        </div>

        {/* Brands Filter */}
        <div className="mb-8">
           <h3 className="font-semibold text-slate-900 mb-4 px-1">Brands</h3>
           <div className="space-y-3">
             <div className="flex items-center gap-3">
                <Checkbox 
                  id="make-all" 
                  checked={selectedMake === "all"} 
                  onCheckedChange={() => setSelectedMake("all")} 
                />
                <label htmlFor="make-all" className="text-sm font-medium text-slate-700 cursor-pointer flex-1">
                  All Brands
                </label>
             </div>
             {makes?.map((make) => (
               <div key={make} className="flex items-center gap-3">
                  <Checkbox 
                    id={`make-${make}`} 
                    checked={selectedMake === make} 
                    onCheckedChange={(checked) => setSelectedMake(checked ? make : "all")} 
                  />
                  <label htmlFor={`make-${make}`} className="text-sm font-medium text-slate-700 cursor-pointer flex-1 capitalize">
                    {make}
                  </label>
               </div>
             ))}
           </div>
        </div>

        {/* Price Range Filter (Placeholder style for eCommerce feel) */}
        <div className="mb-8 relative opacity-50 pointer-events-none">
           <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-xl"><span className="bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Coming Soon</span></div>
           <h3 className="font-semibold text-slate-900 mb-4 px-1">Price Range</h3>
           <Slider defaultValue={[0, 100]} max={100} step={1} className="mb-6" />
           <div className="flex items-center justify-between gap-4">
               <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-center text-sm font-medium">$0</div>
               <span className="text-slate-400">-</span>
               <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-center text-sm font-medium">$1000+</div>
           </div>
        </div>

        {/* Categories Filter (Placeholder style for eCommerce feel) */}
        <div className="mb-4 relative opacity-50 pointer-events-none">
           <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-xl"><span className="bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Coming Soon</span></div>
           <h3 className="font-semibold text-slate-900 mb-4 px-1">Categories</h3>
           <div className="space-y-3">
              {['Engines', 'Gearboxes', 'Suspension', 'Body Parts'].map((cat) => (
                <div key={cat} className="flex items-center gap-3">
                    <Checkbox id={`cat-${cat}`} />
                    <label htmlFor={`cat-${cat}`} className="text-sm font-medium text-slate-700">{cat}</label>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb & Header Title Background (Simple without massive hero) */}
      <div className="bg-white border-b border-slate-200 pt-32 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4 tracking-tight">
              <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900">Products</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              All Products
           </h1>
           <p className="text-slate-500 mt-2 text-lg">
             Browse our extensive inventory of high-quality automotive parts.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative items-start">
           
           {/* Desktop Sidebar Filters */}
           <div className="hidden lg:block w-full lg:w-auto">
             <SidebarFilter />
           </div>

           {/* Mobile Filter Slide Over */}
           <AnimatePresence>
             {isMobileFilterOpen && (
               <>
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="fixed inset-0 bg-slate-900/60 z-[110] lg:hidden backdrop-blur-sm"
                   onClick={() => setIsMobileFilterOpen(false)}
                 />
                 <motion.div 
                   initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
                   className="fixed inset-y-0 left-0 w-[300px] bg-white z-[120] lg:hidden overflow-y-auto shadow-2xl p-4"
                 >
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                       <h2 className="text-xl font-bold flex items-center gap-2">Filters</h2>
                       <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-700">
                         <X className="w-5 h-5" />
                       </button>
                    </div>
                    <SidebarFilter />
                    <div className="mt-8">
                       <Button className="w-full h-12 text-md font-bold rounded-xl" onClick={() => setIsMobileFilterOpen(false)}>Apply Filters</Button>
                    </div>
                 </motion.div>
               </>
             )}
           </AnimatePresence>

           {/* Main Content Area */}
           <div className="flex-1 w-full min-w-0">
              {/* Product Listing Top Bar (Search & Sorted controls) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4 justify-between mb-8">
                 
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Mobile filter toggle */}
                    <Button 
                      variant="outline" 
                      className="lg:hidden h-12 border-slate-200 rounded-xl font-bold gap-2 text-slate-700 shadow-sm"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                       <Filter className="w-4 h-4" /> Filters
                    </Button>

                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search products..."
                        className="w-full h-12 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                 </div>

                 <div className="flex items-center justify-between w-full md:w-auto gap-6 sm:gap-4 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                    <span className="text-sm font-bold text-slate-500 whitespace-nowrap">
                       <span className="text-slate-900">{activeResultsCount}</span> Products Found
                    </span>

                    <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <button 
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                        title="Grid View"
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
                        title="List View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
              </div>

              {/* Product Grid / Loading / Empty states */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200"
                  >
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-sm font-bold text-slate-500">Loading products...</p>
                  </motion.div>
                ) : activeResultsCount > 0 ? (
                  <motion.div 
                    key="results"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
                  >
                    {filteredProducts?.map((item) => (
                      <CarCard key={item._id} car={item} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-slate-200 border-dashed text-center px-4"
                  >
                    <div className="w-20 h-20 bg-slate-50 flex items-center justify-center rounded-full mb-6 text-slate-300">
                       <Package className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No Products Found</h3>
                    <p className="text-slate-500 font-medium max-w-sm mb-8">
                       We couldn&apos;t find any products matching your current filters or search query.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => { setSelectedMake("all"); setSearchQuery(""); }} 
                      className="rounded-xl h-12 px-8 font-bold"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
