"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Settings, // Changed from Fuel
  Zap, // Changed from Gauge
  Clock, // Changed from Calendar
  Package, // Changed from Car
  ShieldCheck, // Changed from Palette
  Shield,
  CreditCard,
  FileCheck,
  Share2,
  Heart,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Truck,
  Star,
  Info
} from "lucide-react";
import { useState } from "react";

export default function CarDetailPage() {
  const params = useParams();
  const carId = params.id as Id<"cars">;
  const car = useQuery(api.cars.getById, { id: carId });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (car === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-none animate-spin" />
      </div>
    );
  }

  if (car === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">
            Unit Not Found
          </h1>
          <p className="text-slate-500 mb-8 font-medium italic">
            This component or unit may have been dispatched.
          </p>
          <Button asChild className="btn-primary rounded-none px-10 py-6">
            <Link href="/dealership">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Catalog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = car.images.length > 0 && !car.images[0].includes("unsplash") ? car.images : [
    [
      "/product/engine.png",
      "/product/gearbox.png",
      "/product/radiator.png",
      "/product/shock-absober.png",
      "/product/bmw-headlight.png"
    ][parseInt(carId.slice(-2), 16) % 5] || "/product/engine.png"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Masenya Auto Parts, I'm interested in the ${car.year} ${car.make} ${car.model} (${car.engineSize || "Part"}). Is this unit available in the Hercules warehouse?`
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32">
      {/* Hero Header Section */}
      <div className="bg-white border-b border-slate-200/60 pt-32 pb-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-6">
            <Link 
              href="/dealership"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                   <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-wide">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                     In Stock
                   </span>
                   <span className="text-xs text-slate-400 font-bold bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                     Ref: XP-{carId.slice(-6).toUpperCase()}
                   </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  {car.make} <span className="text-primary">{car.model}</span>
                </h1>
                <p className="text-slate-500 mt-2 text-lg font-medium">
                  Premium {car.year} specification unit • Certified Grade A
                </p>
              </div>
              <div className="flex gap-3">
                 <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm">
                    <Heart className="w-5 h-5" />
                 </button>
                 <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative items-start">
          
          {/* Left Column - Gallery & Description */}
          <div className="lg:col-span-7 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-4 lg:p-6 border border-slate-100 shadow-xl shadow-slate-200/20"
            >
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] bg-[#F8F9FB] rounded-2xl overflow-hidden group mb-4">
                <img
                  src={images[currentImageIndex]}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Trust Indicator */}
                <div className="absolute bottom-6 left-6 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg shadow-black/5 border border-white/20">
                   <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                   </div>
                   <span className="text-[10px] font-bold text-slate-700 uppercase">Verified OEM</span>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/50 flex items-center justify-center hover:bg-white text-slate-700 hover:text-primary hover:scale-110 transition-all z-20 shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/50 flex items-center justify-center hover:bg-white text-slate-700 hover:text-primary hover:scale-110 transition-all z-20 shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider z-20 shadow-lg border border-white/10">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-[#F8F9FB] border-2 transition-all relative ${
                        index === currentImageIndex
                          ? "border-primary ring-4 ring-primary/20"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                      />
                      {index === currentImageIndex && (
                         <div className="absolute inset-0 bg-primary/5" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Technical Description & Info */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/20"
            >
               <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <FileCheck className="w-5 h-5 text-primary" /> Overview & Description
               </h3>
               <p className="text-slate-600 font-medium leading-relaxed text-lg mb-8">
                 {car.description || `This high-quality ${car.make} ${car.model} unit is fully inspected and certified by our technical team at the Hercules warehouse. Authentic component with guaranteed fitment performance.`}
               </p>
               
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md hover:bg-white transition-all">
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                        <Settings className="w-4 h-4 text-primary" /> Fitment Guide
                     </h4>
                     <ul className="space-y-3 text-sm text-slate-600 font-medium">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Verify part number matches exactly.</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Professional installation required.</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Clear ECU errors before install.</li>
                     </ul>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md hover:bg-white transition-all">
                     <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
                        <Truck className="w-4 h-4 text-primary" /> Shipping Info
                     </h4>
                     <ul className="space-y-3 text-sm text-slate-600 font-medium">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Nationwide Delivery available.</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Same-day dispatch available.</li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> Secure freight packaging.</li>
                     </ul>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Right Column - Pricing & Specs Widget */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden"
            >
               {/* Decorative background glow */}
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

               <div className="relative z-10">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Stock Ref: XP-{carId.slice(-6).toUpperCase()}</span>
                    <div className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      CALL FOR PRICE
                      <Info className="w-5 h-5 text-slate-300" />
                    </div>
                  </div>

                  {/* Component Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-8 mb-8">
                    <div className="bg-[#F8F9FB] border border-slate-100 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-md hover:border-primary/20">
                      <Clock className="h-5 w-5 text-primary mb-2" />
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Model Year</div>
                      <div className="text-sm font-bold text-slate-900">{car.year}</div>
                    </div>
                    <div className="bg-[#F8F9FB] border border-slate-100 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-md hover:border-primary/20">
                      <Settings className="h-5 w-5 text-primary mb-2" />
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Engine Code</div>
                      <div className="text-sm font-bold text-slate-900">{car.engineSize || "Verified OEM"}</div>
                    </div>
                    <div className="bg-[#F8F9FB] border border-slate-100 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-md hover:border-primary/20">
                      <Zap className="h-5 w-5 text-primary mb-2" />
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Condition</div>
                      <div className="text-sm font-bold text-slate-900">Certified Grade A</div>
                    </div>
                    <div className="bg-[#F8F9FB] border border-slate-100 rounded-2xl p-4 transition-all hover:bg-white hover:shadow-md hover:border-primary/20">
                      <Package className="h-5 w-5 text-primary mb-2" />
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Availability</div>
                      <div className="text-sm font-bold text-slate-900">Immediate</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                     <Button size="lg" className="w-full h-16 rounded-2xl text-[15px] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" asChild>
                       <a href="tel:+27614403483">
                         <Phone className="mr-2 h-5 w-5" /> 
                         Call Warehouse to Reserve
                       </a>
                     </Button>
                     <Button size="lg" variant="outline" className="w-full h-16 rounded-2xl text-[15px] font-bold border-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all hover:scale-[1.02]" asChild>
                       <a href={`https://wa.me/27614403483?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                         <MessageCircle className="mr-2 h-5 w-5 text-[#25D366]" /> 
                         Inquire via WhatsApp
                       </a>
                     </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Shield className="w-5 h-5 text-primary" />
                       <span className="text-xs font-bold text-slate-600">6-Month Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <FileCheck className="w-5 h-5 text-primary" />
                       <span className="text-xs font-bold text-slate-600">OEM Certified</span>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
