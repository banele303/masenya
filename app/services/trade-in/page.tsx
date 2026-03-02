"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  BadgeDollarSign,
  Truck,
  TrendingUp,
  Award,
  Box,
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

const benefits = [
  {
    icon: BadgeDollarSign,
    title: "Wholesale Pricing",
    description: "Get competitive bulk rates for mechanics and retail shops",
  },
  {
    icon: Box,
    title: "Volume Discounts",
    description: "Multi-unit discounts on high-demand service components",
  },
  {
    icon: Truck,
    title: "Priority Delivery",
    description: "Expedited shipping for our bulk and wholesale partners",
  },
  {
    icon: Award,
    title: "Certified Spares",
    description: "All bulk orders backed by our quality guarantee",
  },
];

export default function TradeInPage() {
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
              <FileCheck className="h-4 w-4" />
              B2B Business Accounts
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900 mb-8"
            >
              Wholesale <br />
              <span className="gradient-text italic italic uppercase">Solutions.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-3xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium italic leading-snug"
            >
              Partner with ~Spares City for consistent, high-volume supply. We offer specialized wholesale accounts for workshops and parts retailers.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button asChild size="xl" className="btn-primary rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 h-auto">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-3 h-6 w-6 text-black" />
                  Become a Partner
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
                  Bulk Price List
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
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
              Wholesale <span className="text-primary italic">Advantage.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-2xl text-slate-500 font-medium italic max-w-3xl mx-auto"
            >
              Scale your business with Johannesburg's most reliable parts distribution network
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-50 p-10 rounded-none border border-slate-100 hover:border-primary/30 hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-white border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                  <benefit.icon className="h-8 w-8 text-slate-700 group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-primary/10 blur-[100px]" />
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-7xl font-black tracking-tighter mb-16 text-center"
            >
              ONBOARDING <span className="text-primary italic">PROCESS.</span>
            </motion.h2>
            <div className="grid gap-8">
              {[
                {
                  step: "01",
                  title: "Application",
                  description: "Submit your business details and trade license for verification",
                },
                {
                  step: "02",
                  title: "Account Review",
                  description: "Our procurement team reviews your volume requirements",
                },
                {
                  step: "03",
                  title: "Price Configuration",
                  description: "Get personalized discount tiers based on your order frequency",
                },
                {
                  step: "04",
                  title: "Live Ordering",
                  description: "Access our wholesale portal and priority dispatch bay",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-slate-800 border border-slate-700 p-8 flex gap-8 items-center group hover:border-primary transition-colors"
                >
                  <div className="text-5xl md:text-7xl font-black text-primary/20 group-hover:text-primary transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black mb-2 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 font-medium italic">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Need */}
      <section className="py-24 md:py-40 bg-white">
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
              className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-12 text-center uppercase"
            >
              Required <span className="text-primary italic">Documents.</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="bg-slate-50 p-12 md:p-20 rounded-none border border-slate-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  "Company Registration (CK)",
                  "VAT Certificate (if applicable)",
                  "Proof of Business Address",
                  "Trade References",
                  "Owner/Director ID Copy",
                  "Tax Clearance Certificate",
                  "Trade Account Application Form",
                  "Workshop Photos (for tier 1)",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-lg font-bold text-slate-600 group-hover:text-black transition-colors italic">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-12 md:p-32 rounded-none border border-slate-100 max-w-6xl mx-auto shadow-xl"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-10 text-slate-900 leading-tight">
              READY TO <span className="gradient-text italic italic uppercase">PARTNER?</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-500 font-medium mb-16 max-w-3xl mx-auto italic leading-relaxed">
              Join dozens of Johannesburg workshops and motor spares retailers who rely on ~Spares City for their primary stock.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Button asChild size="xl" className="btn-primary rounded-none px-20 py-10 h-auto text-2xl font-black uppercase tracking-[0.2em] w-full sm:w-auto shadow-xl shadow-primary/20">
                <a href="https://wa.me/27829624108" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-4 h-8 w-8 text-black" />
                  Apply Today
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
