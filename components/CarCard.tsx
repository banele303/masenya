"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  ShieldCheck,
  Zap,
  Package,
  Star,
  ChevronRight
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuelType: string;
  transmission: string;
  images: string[];
  isFeatured?: boolean;
}

export default function CarCard({ car }: { car: Car }) {
  const isLiked = useQuery(api.likes.isLiked, { carId: car._id as Id<"cars"> });
  const toggleLike = useMutation(api.likes.toggle);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await toggleLike({ carId: car._id as Id<"cars"> });
    } catch (err) {
      toast.error("Please sign in to save parts");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/car/${car._id}`} className="block group">
      <motion.div
        whileHover={{ y: -8 }}
        className="relative bg-white border border-slate-100 rounded-[32px] overflow-hidden transition-all duration-300 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] h-full flex flex-col"
      >
        {/* Product Image Area */}
        <div className="relative aspect-square bg-[#F8F9FB] p-8 overflow-hidden">
          {/* Badge */}
          {car.isFeatured && (
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                Premium
              </span>
            </div>
          )}

          {/* Like Button */}
          <button 
             onClick={handleLike}
             className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-90"
          >
             <Heart className={cn("h-5 w-5 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>

          {/* Image */}
          <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out">
            <img
              src={car.images && car.images.length > 0 && !car.images[0].includes("unsplash") ? car.images[0] : [
                "/product/engine.png",
                "/product/gearbox.png",
                "/product/radiator.png",
                "/product/shock-absober.png",
                "/product/bmw-headlight.png"
              ][parseInt(car._id.slice(-2), 16) % 5]}
              alt={`${car.make} ${car.model} Part`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Visual Trust Indicator */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
             <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
             </div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified OEM</span>
          </div>
        </div>

        {/* Product Content Area */}
        <div className="p-8 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] text-primary uppercase mb-2">{car.make}</p>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors uppercase leading-none">
                {car.model}
              </h3>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pricing</span>
               <div className="text-lg font-black tracking-tighter text-primary">
                 CALL US
               </div>
            </div>
          </div>

          <p className="text-sm font-medium text-slate-400 italic mb-8 line-clamp-2">
             Premium {car.year} specification {car.make} unit with guaranteed fitment performance and technical certification.
          </p>

          <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex gap-4">
               <div className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">In Stock</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Guaranteed</span>
               </div>
            </div>
            
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-black transition-all">
               <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
