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
        whileHover={{ y: -6 }}
        className="relative bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col"
      >
        {/* Product Image Area */}
        <div className="relative h-56 w-full bg-[#F8F9FB] overflow-hidden group">
          {/* Badge */}
          {car.isFeatured && (
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-primary text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shadow-primary/20">
                Premium
              </span>
            </div>
          )}

          {/* Like Button */}
          <button 
             onClick={handleLike}
             className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-90"
          >
             <Heart className={cn("h-4 w-4 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-slate-400")} />
          </button>

          {/* Image */}
          <div className="relative w-full h-full">
            <img
              src={car.images && car.images.length > 0 && !car.images[0].includes("unsplash") ? car.images[0] : [
                "/product/engine.png",
                "/product/gearbox.png",
                "/product/radiator.png",
                "/product/shock-absober.png",
                "/product/bmw-headlight.png"
              ][parseInt(car._id.slice(-2), 16) % 5]}
              alt={`${car.make} ${car.model} Part`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
          
          {/* Visual Trust Indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
             <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-2.5 w-2.5 fill-primary text-primary" />)}
             </div>
             <span className="text-[9px] font-bold text-slate-700 uppercase">Verified</span>
          </div>
        </div>

        {/* Product Content Area */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-primary uppercase mb-1">{car.make}</p>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                {car.model}
              </h3>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Pricing</span>
               <div className="text-base font-black text-primary">
                 CALL US
               </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-6 font-medium">
             Premium {car.year} specification {car.make} unit with guaranteed fitment performance and technical certification.
          </p>

          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
               <div className="flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-bold uppercase text-slate-600">In Stock</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-bold uppercase text-slate-600">Guaranteed</span>
               </div>
            </div>
            
            <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-black transition-all">
               <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
