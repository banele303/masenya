"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NextImage from "next/image";
import {
  Wrench,
  CheckCircle,
  Phone,
  MessageCircle,
  Settings,
  Hammer,
  SprayCan,
  CarFront,
  Shield,
  ClipboardCheck,
  Mail,
  MapPin,
  Package,
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

const services = [
  {
    icon: Package,
    title: "INVENTORY MGMT",
    image: "/workshop-services.png",
    description: "Our world-class inventory management system ensures that ~Spares City maintains a consistent stock of over 10,000 unique SKU's. From rare engine components to high-demand service kits, we track every part to ensure immediate availability for our retail and wholesale clients across South Africa.",
    features: [
      "Real-time stock tracking",
      "OEM & Aftermarket parts",
      "Bulk inventory storage",
      "Quality control checks",
    ],
  },
  {
    icon: Settings,
    title: "ORDER FULFILLMENT",
    image: "/work-shop.png",
    description: "Efficiency is at the core of our Bramley warehouse operations. Our dedicated fulfillment team processes hundreds of orders daily, ensuring that every part is picked, packed, and dispatched with precision. Whether you're ordering a single spark plug or a full engine rebuild kit, we handle it with expert care.",
    features: [
      "Same-day processing",
      "Precision picking",
      "Secure industrial packing",
      "Order status tracking",
    ],
  },
  {
    icon: Shield,
    title: "PARTS PROCUREMENT",
    image: "/vehicle-maintenance.png",
    description: "Can't find a specific component? Our procurement specialists have a global network of suppliers to source any automotive part. We specialize in finding hard-to-reach components for vintage models and early-release imports, maintaining the highest standards of certification and reliability.",
    features: [
      "Special order sourcing",
      "Global supplier network",
      "Certified authenticity",
      "Express import options",
    ],
  },
];

export default function WorkshopServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <NextImage
            src="/workshop-services.png"
            alt="Warehouse Background"
            fill
            className="object-cover grayscale opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white" />
        </div>

        <div className="container mx-auto px-6 relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-none text-sm font-black mb-8 shadow-xl"
            >
              <Package className="h-4 w-4" />
              <span className="tracking-widest uppercase">Center of Excellence</span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-tight tracking-tighter text-slate-900"
            >
              DISTRIBUTION <br />
              <span className="gradient-text italic">HUB.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-3xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed font-medium italic"
            >
              Our Bramley warehouse is the heart of our retail operation, managing the flow of quality motor spares across South Africa.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button asChild size="xl" className="btn-primary rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/25">
                <a href="tel:+27829624108">
                  <Phone className="mr-3 h-6 w-6" />
                  Request Parts
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-none px-12 py-8 text-xl font-black uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-50 transition-all duration-300"
              >
                <a href="https://wa.me/27829624108">
                  <MessageCircle className="mr-3 h-6 w-6" />
                  WhatsApp Stock Check
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-slate-50 rounded-none p-10 border border-slate-100 hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden group"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden rounded-none mb-10 border border-slate-200">
                  <NextImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white flex items-center justify-center border border-slate-100 group-hover:bg-primary transition-colors">
                    <service.icon className="h-6 w-6 text-slate-700 group-hover:text-black" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-slate-500 mb-10 leading-relaxed font-medium text-sm italic">
                  {service.description}
                </p>
                <div className="space-y-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-none bg-primary flex items-center justify-center">
                         <CheckCircle className="h-3 w-3 text-black" />
                      </div>
                      <span className="text-slate-900 font-bold text-xs uppercase tracking-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-40 bg-slate-900 border-y-8 border-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-7xl font-black tracking-tighter mb-16 text-center text-white"
            >
              THE ~SPARES CITY <span className="text-primary italic">ADVANTAGE.</span>
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Shield,
                  title: "Certified Spares",
                  description: "Every part in our warehouse is certified for performance and reliability.",
                },
                {
                  icon: Package,
                  title: "Massive Inventory",
                  description: "Over 10,000 components in stock for immediate retail dispatch.",
                },
                {
                  icon: Settings,
                  title: "Fast Logistics",
                  description: "Streamlined picking and packing for nationwide delivery within 48 hours.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Expert Advice",
                  description: "Our counter staff are certified automotive parts specialists.",
                },
              ].map((item, index) => (
                <div key={index} className="p-8 border border-white/10 hover:border-primary/50 transition-colors group">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary transition-all">
                    <item.icon className="h-8 w-8 text-white group-hover:text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-white uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team section updated for Parts Sales */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black mb-20 text-center tracking-tighter text-slate-900"
            >
              PARTS SALES & <span className="gradient-text italic">SUPPORT.</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  role: "Managing Director",
                  name: "Francois Marais",
                  email: "sales@sparescity.co.za",
                  phone: "082 962 4108",
                },
                {
                  role: "Warehouse Manager",
                  name: "Albertus Marais",
                  email: "info@sparescity.co.za",
                  phone: "082 962 4108",
                },
                {
                  role: "Parts Specialist",
                  name: "Logan Richardson",
                  email: "sales@sparescity.co.za",
                  phone: "082 962 4108",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-slate-50 p-12 text-center group border border-slate-100 hover:border-primary/30 transition-all"
                >
                  <div className="w-20 h-20 bg-white border border-slate-200 mx-auto mb-8 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <span className="text-3xl font-black text-slate-900">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-slate-900 uppercase">
                    {member.name}
                  </h3>
                  <p className="text-xs font-black text-primary mb-8 uppercase tracking-widest italic">
                    {member.role}
                  </p>
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-3 text-sm text-slate-500 font-bold hover:text-black transition-colors">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </a>
                    <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-3 text-sm text-slate-900 font-black hover:text-primary transition-colors">
                      <Phone className="h-4 w-4" />
                      {member.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={fadeInUp}
              className="mt-24 text-center"
            >
              <div className="inline-flex items-center gap-6 bg-slate-900 px-12 py-6 text-white border-b-8 border-primary">
                <MapPin className="h-10 w-10 text-primary" />
                <div className="text-left">
                  <span className="block text-2xl font-black uppercase tracking-tighter">Bramley Store</span>
                  <span className="text-slate-400 font-medium">593 Louis Botha Ave, Bramley, JHB</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-12 md:p-24 text-center border-t-8 border-primary max-w-5xl mx-auto shadow-2xl"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 italic text-white leading-tight">
              Order Your Parts <br/><span className="text-primary not-italic uppercase">Today.</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed italic">
              Experience the efficiency of South Africa's premier automotive parts distributor. Delivering quality components nationwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="xl" className="w-full sm:w-auto btn-primary rounded-none px-12 py-10 text-2xl font-black uppercase tracking-[0.2em] shadow-2xl">
                <a href="tel:+27829624108" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-4 h-10 w-10" />
                  Call Sales
                </a>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white rounded-none px-12 py-10 text-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                <Link href="/contact">
                  View Map
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
