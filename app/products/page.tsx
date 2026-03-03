"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Search,
  Loader2,
  Phone,
  MessageCircle,
  Package,
  Grid,
  List,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Truck
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ProductsPage() {
  const [selectedMake, setSelectedMake] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const products = useQuery(api.cars.getAll, {
    make: selectedMake === "all" ? undefined : selectedMake,
  });
  const makes = useQuery(api.cars.getMakes);

  const isLoading = products === undefined;

  const filteredProducts = products?.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.make.toLowerCase().includes(query) ||
      p.model.toLowerCase().includes(query) ||
      (p.description || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      {/* Cinematic Catalog Header */}
      <section className="relative pt-40 pb-48 overflow-hidden bg-slate-900 mx-4 sm:mx-6 rounded-[40px] mt-4">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop" 
             alt="Parts Warehouse" 
             fill 
             className="object-cover opacity-60 mix-blend-screen scale-105" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60" />
        </div>
        <div className="container mx-auto px-8 relative z-10 text-center lg:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto lg:mx-0"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[11px] font-black uppercase tracking-widest text-white mb-10 shadow-2xl"
            >
              <Package className="h-4 w-4 text-primary animate-bounce-slow" /> Official Masenya Parts Inventory
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-black tracking-tighter leading-[0.85] text-white mb-10 drop-shadow-2xl"
            >
              PREMIUM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 italic uppercase">SPARE PARTS.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-slate-300 font-medium max-w-3xl leading-relaxed italic drop-shadow-lg"
            >
              Professional automotive procurement. Shop our certified inventory of new and used components for all major makes and models.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter Toolbar */}
      <div className="container mx-auto px-6 relative z-40 -mt-20">
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[32px] p-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 flex-grow w-full md:w-auto">
             <div className="relative flex-grow w-full md:max-w-xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search engines, gearboxes, body parts..." 
                  className="w-full h-16 pl-14 pr-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base font-bold text-slate-900 focus:outline-none focus:border-primary transition-colors shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <div className="w-full md:w-auto">
               <Select value={selectedMake} onValueChange={setSelectedMake}>
                 <SelectTrigger className="w-full md:w-56 h-16 rounded-2xl bg-slate-900 border-slate-900 font-black text-sm uppercase tracking-widest text-white hover:bg-black transition-colors">
                   <SelectValue placeholder="All Brands" />
                 </SelectTrigger>
                 <SelectContent className="rounded-2xl border-slate-200 shadow-2xl p-2">
                   <SelectItem value="all" className="font-bold text-sm rounded-xl mb-1 cursor-pointer uppercase">All Brands</SelectItem>
                   {makes?.map((make) => (
                     <SelectItem key={make} value={make} className="font-bold text-sm rounded-xl mb-1 cursor-pointer uppercase">{make}</SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode("grid")}
               className={cn("h-16 w-16 rounded-2xl transition-all border-2", viewMode === "grid" ? "bg-primary border-primary text-black shadow-lg shadow-primary/30" : "bg-transparent border-slate-100 text-slate-400 hover:border-slate-300")}
             >
               <Grid className="h-6 w-6" />
             </Button>
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setViewMode("list")}
               className={cn("h-16 w-16 rounded-2xl transition-all border-2", viewMode === "list" ? "bg-primary border-primary text-black shadow-lg shadow-primary/30" : "bg-transparent border-slate-100 text-slate-400 hover:border-slate-300")}
             >
               <List className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <section className="py-20 min-h-[400px]">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-40"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Scanning Warehouse...</p>
                </div>
              </motion.div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <motion.div 
                key="grid"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className={cn(
                  "grid gap-10",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                )}
              >
                {filteredProducts.map((item) => (
                  <CarCard key={item._id} car={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40"
              >
                <div className="w-24 h-24 bg-slate-50 flex items-center justify-center rounded-3xl mx-auto mb-8">
                   <Package className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Stock Not Found</h3>
                <p className="text-slate-500 font-medium mb-12 italic text-lg max-w-md mx-auto">We haven&apos;t digitized this specific part yet. Contact our desk for a manual stock check across our Hercules facility.</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => { setSelectedMake("all"); setSearchQuery(""); }} className="rounded-full px-10 h-14 border-2 font-bold uppercase tracking-widest text-xs">
                    Reset Catalog
                  </Button>
                  <Button asChild className="rounded-full px-10 h-14 font-bold uppercase tracking-widest text-xs bg-slate-900 text-white">
                    <a href="tel:+27614403483">Call Desk</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-slate-50 rounded-[60px] mx-6">
        <div className="container mx-auto px-6 text-center">
           <div className="max-w-5xl mx-auto mb-24">
             <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] block mb-6 italic underline underline-offset-8 decoration-primary/30">Quality Assurance</span>
             <h2 className="text-5xl lg:text-[70px] font-black tracking-tighter leading-none text-slate-900 mb-8 italic">
               THE <span className="gradient-text uppercase not-italic">MASENYA GUARANTEE.</span>
             </h2>
             <p className="text-2xl text-slate-500 font-medium leading-relaxed italic max-w-3xl mx-auto">Every component in our Hercules facility undergoes technical inspection before dispatch to ensure workshop-ready performance.</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Certified OEM", desc: "Authentic factory spares sourced from reliable supply chains." },
                { icon: Truck, title: "Rapid Dispatch", desc: "Daily courier departures to all major SA hubs." },
                { icon: MapPin, title: "Hercules Hub", desc: "Visit our Pretoria West facility for direct collections." },
                { icon: Phone, title: "Expert Desk", desc: "Talk to senior technicians about part compatibility." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl shadow-black/5 text-left border border-white hover:border-primary/20 transition-all">
                   <item.icon className="h-10 w-10 text-primary mb-8" />
                   <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">{item.title}</h4>
                   <p className="text-slate-400 font-medium italic text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Quick Inquiries Call-to-Action */}
      <section className="py-40">
        <div className="container mx-auto px-6">
           <div className="relative rounded-[60px] bg-slate-900 overflow-hidden p-12 lg:p-32 group">
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                 <Image src="/engine.png" alt="bg" fill className="object-cover" />
              </div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="text-5xl lg:text-[80px] font-black tracking-tighter leading-[0.85] text-white mb-10">
                       BULK WHOLESALE <br /><span className="text-primary italic uppercase underline decoration-white/20">PARTNERSHIPS.</span>
                    </h2>
                    <p className="text-xl lg:text-3xl text-slate-400 font-medium mb-12 leading-relaxed italic">Commercial accounts for workshops, fleet managers and automotive retailers nationwide.</p>
                    <Button size="xl" className="h-20 px-16 rounded-[24px] btn-primary-new text-xl shadow-2xl group/btn">
                       Become a Trade Partner <ChevronRight className="ml-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                 </div>
                 <div className="hidden lg:flex justify-end">
                    <div className="w-full max-w-sm aspect-square bg-white/5 backdrop-blur-3xl rounded-[50px] p-12 flex flex-col justify-center gap-10 border border-white/10">
                       <div className="flex justify-between items-center text-white border-b border-white/10 pb-6">
                          <span className="font-black text-xl uppercase tracking-widest">Pricing</span>
                          <span className="text-primary font-black text-3xl">TRADE</span>
                       </div>
                       <div className="flex justify-between items-center text-white border-b border-white/10 pb-6">
                          <span className="font-black text-xl uppercase tracking-widest">Priority</span>
                          <span className="text-primary font-black text-3xl">ELITE</span>
                       </div>
                       <div className="flex justify-between items-center text-white flex-col gap-4">
                          <span className="font-black text-xl uppercase tracking-widest w-full">Dispatch Speed</span>
                          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                             <div className="w-full h-full bg-primary" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
