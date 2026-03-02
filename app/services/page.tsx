"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Settings,
  Battery,
  Disc,
  Wind,
  ShieldCheck,
  Zap,
  Package,
  ShoppingBag,
  ChevronRight,
  Truck,
  Wrench,
  Activity
} from "lucide-react";

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

const serviceCategories = [
  {
    icon: Settings,
    title: "Motor Spares",
    subtitle: "Engines & Transmissions",
    image: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=600&auto=format&fit=crop",
    description: "Reliable engine components and drive-train solutions for all major vehicle makes.",
    tags: ["Engines", "Gearboxes", "Clutch Kits"]
  },
  {
    icon: ShieldCheck,
    title: "Body Panels",
    subtitle: "Restoration & Repair",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=600&auto=format&fit=crop",
    description: "High-quality body parts including bumpers, hoods, and door components with OEM fitment.",
    tags: ["Bumpers", "Hoods", "Fenders"]
  },
  {
    icon: Disc,
    title: "Braking Systems",
    subtitle: "High-Performance Safety",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600&auto=format&fit=crop",
    description: "Premium brake pads, discs, and sensors engineered for maximum control and longevity.",
    tags: ["Pads", "Discs", "ABS Units"]
  },
  {
    icon: Battery,
    title: "Electrical",
    subtitle: "Power & Power Management",
    image: "https://images.unsplash.com/photo-1506161911718-d5a2f50fbe76?q=80&w=600&auto=format&fit=crop",
    description: "Reliable batteries, alternators, and starters. Power solutions for heavy-duty demand.",
    tags: ["Batteries", "Starters", "Alternators"]
  },
  {
    icon: Wind,
    title: "Cooling & Radiators",
    subtitle: "Thermal Solutions",
    image: "https://images.unsplash.com/photo-1506161911718-d5a2f50fbe76?q=80&w=600&auto=format&fit=crop",
    description: "Maintain optimal engine temperatures with nuestra range of radiators and cooling fans.",
    tags: ["Radiators", "Water Pumps", "Thermostats"]
  },
  {
    icon: Zap,
    title: "Ignition",
    subtitle: "Spark & Ignition",
    image: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=600&auto=format&fit=crop",
    description: "Technologically advanced spark plugs and ignition coils for efficient fuel combustion.",
    tags: ["Spark Plugs", "Ignition Coils", "Wires"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Header */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#F8F9FB]">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/5 rounded-bl-[100px] -z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-8"
            >
              <Package className="h-3 w-3 text-primary" /> Comprehensive Parts Directory
            </motion.span>
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-[80px] font-black tracking-tighter leading-[0.9] text-slate-900 mb-8"
            >
              AUTOMOTIVE <br />
              <span className="gradient-text italic uppercase">SOLUTIONS.</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed italic"
            >
              Organized for efficiency. Explore our curated collections of <span className="text-slate-900 not-italic font-bold">certified motor spares</span> ready for immediate dispatch from our Bramley warehouse.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {serviceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="group"
              >
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden bg-slate-100 mb-10 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-black/5">
                  <Image 
                    src={category.image} 
                    alt={category.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary transition-colors">
                    <category.icon className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="px-4">
                  <div className="flex items-center gap-2 mb-4">
                     {category.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 rounded-full border border-slate-100">{tag}</span>
                     ))}
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">{category.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 italic">{category.description}</p>
                  
                  <Button asChild variant="ghost" className="p-0 h-auto text-slate-900 font-black uppercase tracking-widest text-[11px] group/btn hover:bg-transparent">
                    <Link href="/dealership" className="flex items-center gap-2">
                      Explore Catalog <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Logistics */}
      <section className="py-32 bg-slate-900 text-white rounded-[60px] mx-6 mb-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-20">
             <div className="space-y-8">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                   <Truck className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-4xl font-black tracking-tight leading-none">NATIONWIDE <br /><span className="text-primary italic">LOGISTICS.</span></h4>
                <p className="text-slate-400 font-medium leading-relaxed italic">Daily shipments from Bramley to all major hubs in SA with real-time tracking.</p>
             </div>
             <div className="space-y-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                   <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-4xl font-black tracking-tight leading-none">OEM <br /><span className="text-primary italic">STANDARDS.</span></h4>
                <p className="text-slate-400 font-medium leading-relaxed italic">Strict quality control protocols. We only stock certified and authentic parts.</p>
             </div>
             <div className="space-y-8">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                   <Activity className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-4xl font-black tracking-tight leading-none">TECHNICAL <br /><span className="text-primary italic">SUPPORT.</span></h4>
                <p className="text-slate-400 font-medium leading-relaxed italic">Consult with our parts specialists for correct fitment and technical advice.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-6xl lg:text-[100px] font-black tracking-tighter leading-none mb-12">
            STOCK <span className="gradient-text italic uppercase">INQUIRY.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
             <Button asChild size="xl" className="h-20 px-12 rounded-[24px] btn-primary-new text-xl shadow-2xl">
                <a href="tel:+27829624108" className="flex items-center gap-3">
                   <Phone className="h-6 w-6" /> Call Desk
                </a>
             </Button>
             <Button asChild size="xl" variant="outline" className="h-20 px-12 rounded-[24px] border-4 border-slate-100 text-xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                <a href="https://wa.me/27829624108" className="flex items-center gap-3">
                   <MessageCircle className="h-6 w-6" /> WhatsApp
                </a>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
