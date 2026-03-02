"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PackageSearch,
  CheckCircle,
  Phone,
  MessageCircle,
  Globe,
  Zap,
  ShieldCheck,
  Search,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const features = [
  {
    icon: Search,
    title: "Rare Part Sourcing",
    description: "Finding hard-to-reach components for vintage and import models",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connections with international OEM and aftermarket suppliers",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Quality",
    description: "Every special order part undergoes a rigorous inspection",
  },
  {
    icon: Zap,
    title: "Express Import",
    description: "Air-freight options for urgent repair requirements",
  },
];

export default function ProcurementPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 md:py-40 overflow-hidden bg-slate-50 pt-20 md:pt-40">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/10 skew-x-12 translate-x-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-black text-[10px] font-black uppercase tracking-widest mb-8 shadow-xl shadow-primary/10"
            >
              <PackageSearch className="h-4 w-4" />
              Specialized Procurement
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8"
            >
              Found & <br />
              <span className="gradient-text italic italic uppercase">Delivered.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-3xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium italic leading-snug"
            >
              Can't find it in stock? Our procurement team specialized in sourcing rare automotive components from across the globe.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button asChild size="xl" className="btn-primary rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 h-auto">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-3 h-6 w-6 text-black" />
                  Request Rare Part
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-50 transition-all h-auto"
              >
                <a href="tel:+27829624108">
                  <Phone className="mr-3 h-6 w-6" />
                  Call Sourcing Team
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 uppercase"
            >
              Why Special <span className="text-primary italic">Orders?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-slate-500 font-medium italic max-w-3xl mx-auto"
            >
              We solve the parts puzzles that others can't, keeping your vehicle on the road regardless of its age or origin.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-50 p-10 rounded-none border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-white border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <feature.icon className="h-8 w-8 text-slate-700 group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary/10 blur-[100px]" />
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-7xl font-black tracking-tighter mb-12 text-center uppercase"
            >
              The ~Spares City <span className="text-primary italic">Promise.</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="bg-slate-800 border border-slate-700 p-12 md:p-20 rounded-none"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {[
                   "Global parts identification",
                   "Verified OEM authenticity",
                   "Real-time import tracking",
                   "Customs and duties handling",
                   "Technical compatibility check",
                   "Secure payment escrow",
                   "Expedited international shipping",
                   "Expert fitment advice",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors italic">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 md:p-32 rounded-none border border-slate-100 max-w-6xl mx-auto shadow-sm"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 text-slate-900 leading-tight uppercase">
               Still <span className="gradient-text italic italic">Searching?</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 font-medium mb-16 max-w-3xl mx-auto italic leading-relaxed">
               Stop hunting across salvage yards and marketplaces. Let our global procurement experts find the exact component you need.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Button asChild size="xl" className="btn-primary rounded-none px-20 py-10 h-auto text-2xl font-black uppercase tracking-[0.2em] w-full sm:w-auto shadow-xl shadow-primary/20">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-4 h-8 w-8 text-black" />
                  Query Part
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-4 border-slate-200 text-slate-900 rounded-none px-20 py-10 h-auto text-2xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all w-full sm:w-auto">
                <Link href="/contact">
                  Visit Bramley
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
