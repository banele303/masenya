"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NextImage from "next/image";
import {
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  Target,
  ArrowRight,
  Truck,
  Package,
  Activity,
  CheckCircle,
  Quote
} from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Subliminal Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#F8F9FB]">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 rounded-bl-[100px] -z-0" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-8 shadow-sm"
            >
              <HeartHandshake className="h-3.5 w-3.5 text-primary" /> Established Heritage in Spares
            </motion.span>
            
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] text-slate-900 mb-8"
            >
              CRAFTING THE <br />
              <span className="gradient-text italic uppercase">FUTURE OF OEM.</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-slate-500 font-medium leading-relaxed max-w-3xl italic"
            >
              Masenya Auto Parts is South Africa&apos;s premier retail supplier, bridging the gap between <span className="text-slate-900 not-italic font-bold">industrial excellence</span> and consumer convenience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-32 relative group">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                 <span className="text-primary font-black uppercase tracking-[0.4em] text-[11px] block italic">Our Professional Journey</span>
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">BEYOND THE <br/><span className="gradient-text italic uppercase">PARTS COUNTER.</span></h2>
                 <p className="text-xl text-slate-500 font-medium leading-relaxed italic">
                   Founded on a vision of uncompromising quality and technical reliability, Masenya Auto Parts has evolved from a local Hercules store into a nationwide logistics powerhouse for automotive components.
                 </p>
                 <p className="text-lg text-slate-600 font-medium leading-relaxed">
                   We don&apos;t just sell boxes; we provide the lifeblood of transport. Every engine block, brake sensor, and radiator we ship is a commitment to South African mobility and workshop productivity.
                 </p>
                 <div className="grid grid-cols-2 gap-12 pt-8">
                    <div className="px-8 py-6 bg-slate-50 rounded-3xl border border-slate-100">
                       <p className="text-5xl font-black text-primary mb-2">20+</p>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Years Industry Elite</p>
                    </div>
                    <div className="px-8 py-6 bg-slate-50 rounded-3xl border border-slate-100">
                       <p className="text-5xl font-black text-slate-900 mb-2">10k+</p>
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Digitized SKUs</p>
                    </div>
                 </div>
              </motion.div>
              
              <div className="relative">
                 <div className="relative rounded-[60px] overflow-hidden shadow-2xl shadow-black/10 border-[12px] border-white rotate-[-3deg] z-10">
                    <NextImage 
                      src="/new-parts3.png" 
                      alt="Operations" 
                      width={600} 
                      height={800} 
                      className="object-cover h-[600px] w-full"
                    />
                 </div>
                 <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary rounded-[50px] z-20 flex items-center justify-center p-12 text-center"
                 >
                    <Quote className="absolute top-8 left-8 h-12 w-12 text-black/10" />
                    <p className="text-xl font-black text-slate-900 leading-tight uppercase italic">"Precision at Scale."</p>
                 </motion.div>
              </div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-[#F8F9FB] rounded-[60px] mx-6">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-8 italic">OUR <span className="gradient-text uppercase not-italic">PILLARS.</span></h2>
             <p className="text-xl text-slate-500 font-medium italic">Defined by three core tenets that govern every transaction in our Hercules warehouse.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: ShieldCheck, 
                title: "Integrity", 
                desc: "We prioritize authentic OEM quality over short-term margins. If it isn't certified, it isn't stocked.",
                color: "bg-blue-50"
              },
              { 
                icon: Truck, 
                title: "Velocity", 
                desc: "Time is money in the automotive trade. Our express logistics network is optimized for zero-bottleneck delivery.",
                color: "bg-orange-50"
              },
              { 
                icon: Activity, 
                title: "Precision", 
                desc: "Technical fitment expertise that ensures you get the right component correctly specified every time.",
                color: "bg-green-50"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[50px] shadow-xl shadow-black/5 hover:shadow-black/10 transition-shadow border border-white"
              >
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-10`}>
                   <item.icon className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6">
           <div className="relative bg-slate-900 p-16 lg:p-32 rounded-[60px] overflow-hidden text-center max-w-6xl mx-auto">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative z-10"
              >
                 <h2 className="text-5xl md:text-[80px] font-black tracking-tighter text-white mb-12 leading-none uppercase">
                   JOIN THE <span className="text-primary italic">MASENYA AUTO PARTS</span> ERA.
                 </h2>
                 <p className="text-2xl text-slate-400 font-medium mb-16 max-w-2xl mx-auto italic leading-relaxed">
                   Experience South Africa&apos;s most sophisticated automotive parts ecosystem. Retail, Wholesale, and Logistics redefined.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <Button asChild size="xl" className="h-20 px-16 rounded-[24px] btn-primary-new text-xl shadow-2xl">
                       <Link href="/dealership">Explore Catalog</Link>
                    </Button>
                    <Button asChild size="xl" variant="outline" className="h-20 px-16 rounded-[24px] border-4 border-white/10 text-white hover:bg-white hover:text-black transition-all font-black text-xl tracking-widest uppercase">
                       <Link href="/contact">Trade Contact</Link>
                    </Button>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  );
}
