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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-10 pt-28">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/dealership" className="hover:text-primary transition-colors">
            Parts Catalog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900 border-b border-primary">
            {car.make} {car.model}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-slate-50 border border-slate-100 overflow-hidden shadow-sm group">
              <img
                src={images[currentImageIndex]}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-contain p-12 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-slate-200 flex items-center justify-center hover:bg-primary transition-colors z-20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-slate-200 flex items-center justify-center hover:bg-primary transition-colors z-20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-6 right-6 bg-slate-900 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest z-20">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto scrollbar-none pb-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-28 h-28 bg-slate-50 border-2 transition-all p-4 ${
                      index === currentImageIndex
                        ? "border-primary shadow-xl"
                        : "border-slate-100 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Unit Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-10"
          >
            {/* Title & Price */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  In Stock
                </span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Ref: XP-{carId.slice(-6).toUpperCase()}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 uppercase mb-4">
                {car.make} <br />
                <span className="gradient-text italic">{car.model}</span>
              </h1>
              
              <div className="mt-8 p-8 md:p-10 bg-slate-50 border-l-8 border-primary flex flex-col md:flex-row items-start md:flex-wrap lg:flex-nowrap md:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] block mb-2">Pricing Status</span>
                  <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase whitespace-nowrap">
                    Call For Price
                  </div>
                </div>
                <Button size="lg" className="btn-primary rounded-none shadow-xl font-black uppercase tracking-widest h-auto py-5 px-8 whitespace-nowrap" asChild>
                  <a href="tel:+27614403483"><Phone className="mr-3 h-5 w-5 text-black" /> Inquire Now</a>
                </Button>
              </div>
            </div>

            {/* Component Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 p-6 hover:border-primary/30 transition-colors">
                <Clock className="h-5 w-5 text-primary mb-3" />
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Model Year</div>
                <div className="text-lg font-black text-slate-900">{car.year}</div>
              </div>
              <div className="bg-white border border-slate-100 p-6 hover:border-primary/30 transition-colors">
                <Settings className="h-5 w-5 text-primary mb-3" />
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Engine Code</div>
                <div className="text-lg font-black text-slate-900">{car.engineSize || "Verified OEM"}</div>
              </div>
              <div className="bg-white border border-slate-100 p-6 hover:border-primary/30 transition-colors">
                <Zap className="h-5 w-5 text-primary mb-3" />
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Condition</div>
                <div className="text-lg font-black text-slate-900">Certified Grade A</div>
              </div>
              <div className="bg-white border border-slate-100 p-6 hover:border-primary/30 transition-colors">
                <Package className="h-5 w-5 text-primary mb-3" />
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Availability</div>
                <div className="text-lg font-black text-slate-900">Immediate Dispatch</div>
              </div>
            </div>

            {/* Detailed Info Tabs */}
            <div className="space-y-6">
               <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-2"><FileCheck className="h-4 w-4 text-primary" /> Technical Description</h3>
                 <div className="bg-slate-50 p-8 border border-slate-100">
                    <p className="text-slate-600 font-medium italic leading-relaxed">
                      {car.description || `This high-quality ${car.make} ${car.model} unit is fully inspected and certified by our technical team at the Hercules warehouse. Authentic component with guaranteed fitment performance.`}
                    </p>
                 </div>
               </div>
               
               <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-2"><Settings className="h-4 w-4 text-primary" /> Fitment Guide</h3>
                 <div className="bg-white p-8 border border-slate-100">
                    <ul className="space-y-4 text-sm text-slate-500 font-medium italic">
                       <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> <span className="pt-0.5">Verify part number matches your core component exactly before dispatch.</span></li>
                       <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> <span className="pt-0.5">Professional installation by a certified RMI workshop is required to validate our 6-month guarantee.</span></li>
                       <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> <span className="pt-0.5">Clear all ECU error codes before installing electrical, transponder, or sensor components.</span></li>
                    </ul>
                 </div>
               </div>

               <div className="space-y-3">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Shipping & Dispatch</h3>
                 <div className="bg-slate-900 p-8 border border-slate-800 text-slate-300">
                    <p className="text-sm font-medium leading-relaxed mb-6 italic">We ship premium automotive components nationwide across South Africa with trusted, secure freight couriers specialized for car parts.</p>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-widest text-white">
                       <div className="p-4 border border-white/10 flex items-center gap-3"><Clock className="h-4 w-4 text-primary shrink-0" /> Same-Day Dispatch</div>
                       <div className="p-4 border border-white/10 flex items-center gap-3"><Package className="h-4 w-4 text-primary shrink-0" /> Secure Packaging</div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-2.5 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <Shield className="h-4 w-4 text-primary" />
                6-Month Guarantee
              </span>
              <span className="px-5 py-2.5 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <Truck className="h-4 w-4 text-primary" />
                Nationwide Delivery
              </span>
              <span className="px-5 py-2.5 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <FileCheck className="h-4 w-4 text-primary" />
                OEM Certified
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="bg-slate-900 p-10 md:p-14 border-t-8 border-primary shadow-2xl space-y-8">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                CHECK STOCK <br />
                <span className="text-primary italic italic">AVAILABILITY.</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="xl" className="btn-primary rounded-none flex-1 py-10 text-xl font-black uppercase tracking-widest shadow-xl h-auto">
                  <a href="tel:+27614403483">
                    <Phone className="mr-3 h-6 w-6 text-black" />
                    Call Warehouse
                  </a>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="outline"
                  className="rounded-none border-2 border-white/20 text-white flex-1 py-10 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all h-auto"
                >
                  <a
                    href={`https://wa.me/27614403483?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-3 h-6 w-6 text-primary" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <Button
              asChild
              variant="ghost"
              className="w-full text-slate-400 hover:text-black font-black uppercase tracking-widest text-[10px] h-14"
            >
              <Link href="/dealership">
                <ArrowLeft className="mr-3 h-4 w-4" />
                Return to Parts Inventory
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
