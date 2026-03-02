"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Fuel,
  Gauge,
  Calendar,
  ArrowRight,
  Clock,
  Phone,
  MessageCircle,
  Car,
} from "lucide-react";

interface CarType {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  fuelType: string;
  transmission: string;
  images: string[];
  description: string;
}

export default function DealOfWeek({ car }: { car: CarType }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat("en-ZA").format(km) + " km";
  };

  return (
    <section className="py-12 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 relative mb-12 lg:mb-0"
          >
            {/* Countdown Badge */}
            <div className="absolute -top-6 left-4 md:left-12 z-20">
              <div className="glass-premium px-6 py-3 md:px-8 md:py-4 rounded-2xl flex items-center gap-3 shadow-2xl border-white/10">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                   <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                   <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Limited Time</p>
                   <p className="font-display font-black text-sm md:text-lg">DEAL OF THE WEEK</p>
                </div>
              </div>
            </div>

            {/* Main Image Layer */}
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[16/10] group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5">
              <img
                src={car.images[0] || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop"}
                alt={`${car.year} ${car.make} ${car.model}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>

            {/* Price Float */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-10 glass-premium p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-accent/20 z-20"
            >
               <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-accent mb-1 block">Pricing Status</span>
               <div className="text-3xl md:text-5xl font-display font-black tracking-tighter gradient-text-gold uppercase">
                 CALL US
               </div>
            </motion.div>

          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 space-y-8 md:space-y-10"
          >
            <div className="space-y-4">
              <span className="text-primary font-bold text-xs md:text-sm tracking-[0.3em] uppercase">Featured Profile</span>
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-display font-medium tracking-tighter leading-[0.9]">
                {car.year} {car.make}
                <br />
                <span className="gradient-text italic opacity-90">{car.model}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
            </div>

            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              {car.description}
            </p>

            {/* Upgraded Specs */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: Calendar, label: "Year", value: car.year },
                { icon: Gauge, label: "Mileage", value: car.mileage ? formatMileage(car.mileage) : "N/A" },
                { icon: Fuel, label: "Fuel", value: car.fuelType },
                { icon: Car, label: "Trans", value: car.transmission },
              ].map((spec, i) => (
                <div key={i} className="glass border border-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 hover:bg-white/5 transition-colors">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center">
                    <spec.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-none mb-1">{spec.label}</p>
                    <p className="font-bold text-xs md:text-sm">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
               <Button asChild size="xl" className="w-full sm:w-auto btn-primary rounded-full px-10 flex-1">
                 <a href={`https://wa.me/27614403483?text=Hi, I'm interested in the ${car.year} ${car.make} ${car.model} Deal of the Week!`}>
                   <MessageCircle className="mr-2 h-5 w-5" />
                   Secure This Deal
                 </a>
               </Button>
               <Button asChild size="xl" variant="outline" className="w-full sm:w-auto glass border-white/10 rounded-full px-10 flex-1">
                 <Link href={`/car/${car._id}`}>Full Details</Link>
               </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
