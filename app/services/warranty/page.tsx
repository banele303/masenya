"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  Package,
  Settings,
  AlertCircle,
  Award,
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

const coverage = [
  {
    icon: Settings,
    title: "Engine Parts",
    description: "6-month guarantee on all internal engine components",
  },
  {
    icon: Package,
    title: "Transmission",
    description: "Protection for gearboxes and driveline systems",
  },
  {
    icon: ShieldCheck,
    title: "Electrical Units",
    description: "Quality assurance for alternators, starters and sensors",
  },
  {
    icon: AlertCircle,
    title: "Cooling Systems",
    description: "Certified radiators, water pumps, and cooling parts",
  },
];

export default function WarrantyPage() {
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
              <ShieldCheck className="h-4 w-4" />
              Verified Authenticity
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8"
            >
              Certified <br />
              <span className="gradient-text italic italic uppercase">Guarantee.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-3xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium italic leading-snug"
            >
              Every part sold by ~Spares City comes with our industry-leading 6-month quality guarantee. Buy with absolute confidence.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button asChild size="xl" className="btn-primary rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 h-auto">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-3 h-6 w-6 text-black" />
                  Warranty Policy
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
                  Request Details
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Grid */}
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
              What's <span className="text-primary italic">Covered.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-slate-500 font-medium italic max-w-3xl mx-auto"
            >
              Our comprehensive guarantee covers all major mechanical and electrical components against manufacturing defects.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {coverage.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-50 p-10 rounded-none border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-white border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <item.icon className="h-8 w-8 text-slate-700 group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Guarantee Benefits */}
      <section className="py-24 md:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 blur-[100px]" />
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.9]">
                CORE <br />
                <span className="text-primary italic uppercase">BENEFITS.</span>
              </h2>
              <div className="grid gap-6">
                {[
                  "6-month standard guarantee",
                  "Direct replacement service",
                  "Expert technical inspection",
                  "No hidden administration fees",
                  "Full parts traceability",
                  "Nationwide support network",
                  "OEM certified components",
                  "Fast claims resolution",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-none border border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
                      <CheckCircle className="h-4 w-4 text-primary group-hover:text-black" />
                    </div>
                    <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
               <div className="aspect-square bg-slate-800 border-8 border-slate-700 p-8 flex flex-col justify-center items-center text-center">
                  <Award className="h-32 w-32 text-primary mb-8" />
                  <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">GOLD STANDARD</h4>
                  <p className="text-slate-400 italic font-medium leading-relaxed">
                    We stand by every nut, bolt, and engine assembly that leaves our warehouse. Our reputation is built on the reliability of our spares.
                  </p>
               </div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary p-8 flex items-center justify-center">
                  <span className="text-5xl font-black text-black leading-none">100%</span>
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
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 text-slate-900 leading-tight">
              NEED A <span className="gradient-text italic italic uppercase">QUOTE?</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 font-medium mb-16 max-w-3xl mx-auto italic leading-relaxed">
              Have questions about our parts guarantee or need to verify compatibility for a specific component? Our tech team is ready.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Button asChild size="xl" className="btn-primary rounded-none px-20 py-10 h-auto text-2xl font-black uppercase tracking-[0.2em] w-full sm:w-auto shadow-xl shadow-primary/20">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-4 h-8 w-8 text-black" />
                  Chat Now
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-4 border-slate-200 text-slate-900 rounded-none px-20 py-10 h-auto text-2xl font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all w-full sm:w-auto">
                <Link href="/contact">
                  Visit Store
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
