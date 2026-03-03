"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  ArrowLeft, 
  Package, 
  Zap, 
  Settings, 
  Truck,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = useQuery(api.cars.getById, { id: id as Id<"cars"> });
  const [activeImage, setActiveImage] = useState(0);

  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Retrieving Specs...</p>
        </div>
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
           <div className="w-24 h-24 bg-slate-50 flex items-center justify-center rounded-[32px] mx-auto mb-8">
              <Package className="h-10 w-10 text-slate-300" />
           </div>
           <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase italic">Part Not Found</h1>
           <p className="text-slate-500 font-medium italic mb-10">This component may have been sold or decommissioned from our active inventory.</p>
           <Button asChild className="rounded-full px-12 h-14 bg-slate-900 border-none font-bold uppercase tracking-widest text-xs">
              <Link href="/products">Return to Catalog</Link>
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="pt-32 container mx-auto px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-4 mb-12">
           <Link href="/products" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
           </Link>
           <div className="h-1 w-1 bg-slate-200 rounded-full" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">SKU: {product._id.slice(0, 8).toUpperCase()}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
           {/* Visual Showcase Pane */}
           <div className="lg:col-span-7 space-y-8">
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl group">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeImage}
                       initial={{ opacity: 0, scale: 1.05 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5 }}
                       className="relative w-full h-full"
                    >
                       <img 
                         src={product.images?.[activeImage] || "/engine.png"} 
                         alt={product.model} 
                         className="w-full h-full object-cover"
                       />
                    </motion.div>
                 </AnimatePresence>
                 
                 {/* Premium Overlay */}
                 <div className="absolute top-8 left-8 flex flex-col gap-3">
                    <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                       Certified OEM
                    </span>
                    {product.isFeatured && (
                       <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                          Elite Stock
                       </span>
                    )}
                 </div>

                 <button className="absolute bottom-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/40 transition-all">
                    <Share2 className="h-6 w-6 text-white" />
                 </button>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                 <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {product.images.map((img: string, idx: number) => (
                       <button 
                         key={idx}
                         onClick={() => setActiveImage(idx)}
                         className={cn(
                           "relative h-24 w-32 rounded-2xl overflow-hidden flex-shrink-0 border-4 transition-all",
                           activeImage === idx ? "border-primary scale-95" : "border-transparent opacity-60 hover:opacity-100"
                         )}
                       >
                          <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                       </button>
                    ))}
                 </div>
              )}

              {/* Technical Description */}
              <div className="pt-8 border-t border-slate-100">
                 <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                    <Settings className="h-5 w-5 text-primary" /> Technical Profile
                 </h3>
                 <p className="text-lg text-slate-500 font-medium italic leading-relaxed mb-8">
                    {product.description || `This high-performance ${product.make} component is engineered for precision fitment and long-term durability. Sourced from verified supply chains and technically inspected at our Hercules hub.`}
                 </p>
                 
                 {product.features && product.features.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                       {product.features.map((feature: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                             <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                             <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{feature}</span>
                          </div>
                       ))}
                    </div>
                 )}
              </div>
           </div>

           {/* Procurement Pane */}
           <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-10">
                 <div>
                    <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] block mb-4 italic">Automotive Spare</span>
                    <h1 className="text-5xl xl:text-7xl font-black tracking-tighter text-slate-900 leading-[0.85] mb-6">
                       {product.make} <br />
                       <span className="gradient-text uppercase italic">{product.model}</span>
                    </h1>
                    
                    <div className="flex items-center gap-3 py-4">
                       <span className="text-4xl font-black text-slate-900">INQUIRY ONLY</span>
                       <div className="h-8 w-[1px] bg-slate-200 mx-2" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#ef4444] animate-pulse">Live Stock Check</span>
                    </div>
                 </div>

                 {/* Core Specs Grid */}
                 <div className="grid grid-cols-2 gap-px bg-slate-100 border border-slate-100 rounded-[32px] overflow-hidden">
                    <div className="bg-white p-6 md:p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Series Year</span>
                       <p className="text-2xl font-black text-slate-900 italic">{product.year}</p>
                    </div>
                    <div className="bg-white p-6 md:p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Condition</span>
                       <p className="text-2xl font-black text-slate-900 italic uppercase">{product.fuelType || "New"}</p>
                    </div>
                    <div className="bg-white p-6 md:p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Compatibility</span>
                       <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{product.transmission || "N/A"}</p>
                    </div>
                    <div className="bg-white p-6 md:p-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Inventory</span>
                       <p className="text-sm font-black text-green-600 uppercase tracking-tight flex items-center gap-2">
                          <Package className="h-4 w-4" /> {product.isAvailable ? "IN HERCULES" : "OUT OF STOCK"}
                       </p>
                    </div>
                 </div>

                 {/* Action Stack */}
                 <div className="space-y-4 pt-6">
                    <Button asChild size="xl" className="w-full h-20 rounded-[28px] btn-primary-new text-xl shadow-2xl transition-all">
                       <a href={`https://wa.me/27614403483?text=I'm interested in the ${product.make} ${product.model} (${product.year}). Is it still available?`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-4 h-7 w-7" /> WHATSAPP QUOTE
                       </a>
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                       <Button asChild variant="outline" className="h-16 rounded-[24px] border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50">
                          <a href={`tel:+27614403483`}><Phone className="mr-3 h-4 w-4" /> CALL DESK</a>
                       </Button>
                       <Button asChild variant="outline" className="h-16 rounded-[24px] border-2 border-slate-100 font-black uppercase tracking-widest text-xs hover:bg-slate-50">
                          <a href={`mailto:masenyaautoparts@gmail.com?subject=Inquiry: ${product.make} ${product.model}`}><Mail className="mr-3 h-4 w-4" /> EMAIL US</a>
                       </Button>
                    </div>
                 </div>

                 {/* Trust Badge Bar */}
                 <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <ShieldCheck className="h-6 w-6 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-tight text-slate-900">Guaranteed Fitment</p>
                          <p className="text-xs text-slate-500 font-medium italic">Full refund if compatibility mismatch occurs.</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Truck className="h-6 w-6 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-black uppercase tracking-tight text-slate-900">Nationwide Dispatch</p>
                          <p className="text-xs text-slate-500 font-medium italic">24-48h turnaround for major SA metro areas.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Recommended Section (Simple) */}
      <section className="container mx-auto px-6 mt-40">
         <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">SIMILAR <span className="gradient-text not-italic">COMPONENTS.</span></h2>
            <Link href="/products" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-8">Explore Catalog</Link>
         </div>
         <div className="grid md:grid-cols-3 gap-10 opacity-50 pointer-events-none grayscale">
            {[1,2,3].map(i => (
               <div key={i} className="bg-slate-50 rounded-3xl h-80 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                  <Package className="h-12 w-12 text-slate-300 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Related...</p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
