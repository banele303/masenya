"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowRight, 
  Settings, 
  Disc, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award,
  ChevronRight,
  Phone,
  Package,
  ShoppingBag,
  Star,
  Quote,
  LayoutGrid,
  Cog,
  Gauge,
  Flame,
  ShieldAlert,
  Play,
  Cpu,
  Layers,
  Box,
  Terminal,
  Sparkles,
  BadgeCheck,
  ShoppingCart,
  Calendar,
  User
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Elite Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const heroSlides = [
  {
    title: "V12",
    subtitle: "PERFORMANCE",
    desc: "South Africa's most aggressive spares catalog. Direct-to-workshop pricing.",
    image: "/hero-sp.png",
    tag: "Warehouse Exclusive",
    accent: "text-[#ef4444]"
  },
  {
    title: "CARBON",
    subtitle: "PRECISION",
    desc: "Verified OEM components for elite builds. Dispatching nationwide every 24H.",
    image: "/hero-sp2.png",
    tag: "Hercules HQ",
    accent: "text-[#dc2626]"
  },
  {
    title: "FORGED",
    subtitle: "VELOCITY",
    desc: "Full-stack engine kits and braking systems. Engineered for the extreme.",
    image: "/herosp3.png",
    tag: "Track Tested",
    accent: "text-[#ef4444]"
  }
];

const categories = [
  { 
    name: "Performance Engines", 
    icon: Settings, 
    count: "450+ Spares",
    image: "/engine.png",
    href: "/dealership?category=engines"
  },
  { 
    name: "Braking Systems", 
    icon: Disc, 
    count: "1.2k Items",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
    href: "/dealership?category=brakes"
  },
  { 
    name: "Body Panels", 
    icon: ShieldCheck, 
    count: "800+ Panels",
    image: "/car-body.png",
    href: "/dealership?category=body"
  },
  { 
    name: "Precision Lighting", 
    icon: Zap, 
    count: "2.5k Units",
    image: "/tires.png",
    href: "/dealership?category=lighting"
  },
  { 
    name: "Limited Wheels", 
    icon: Activity, 
    count: "300+ Alloys",
    image: "/tire2.png",
    href: "/dealership?category=wheels"
  }

];

const features = [
  {
    icon: Truck,
    title: "Nationwide Shipping",
    desc: "Express delivery to all major South African cities within 24-48 hours."
  },
  {
    icon: ShieldCheck,
    title: "OEM Guaranteed",
    desc: "Authentic parts with manufacturer warranty and quality certification."
  },
  {
    icon: Clock,
    title: "Quick Support",
    desc: "Expert technical advice from our Hercules-based specialist team."
  },
  {
    icon: Award,
    title: "Best Price",
    desc: "Direct-to-consumer warehouse prices with no hidden markup."
  }
];

const homeBlogPosts = [
  {
    title: "Choosing the Right Oil for Your Engine",
    excerpt: "Discover the differences between synthetic and mineral oils, and which grade is best for your vehicle.",
    date: "Feb 12, 2026",
    category: "Maintenance",
    image: "/spray-paint.png",
    slug: "engine-oil-guide"
  },
  {
    title: "When to Replace Your Brake Pads",
    excerpt: "Learn the warning signs of worn brake pads and when you should visit Masenya Auto Parts for a replacement.",
    date: "Feb 10, 2026",
    category: "Braking",
    image: "/workshop-services.png",
    slug: "brake-pad-replacement"
  },
  {
    title: "Maximizing Battery Life in Heat",
    excerpt: "Pretoria summers can be brutal on car batteries. Here's how to ensure your battery maintains its charge.",
    date: "Feb 08, 2026",
    category: "Batteries",
    image: "/repair-services.png",
    slug: "battery-life-tips"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col bg-white text-slate-900 selection:bg-primary selection:text-black overflow-hidden">
      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 1: HERO — MATCHING REFERENCE IMAGE           */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f2f5] pt-4 pb-6 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Main 3-Column Grid */}
          <div className="grid grid-cols-12 gap-3">

            {/* LEFT SIDEBAR — Stacked Part Images */}
            <div className="hidden lg:flex col-span-2 flex-col gap-2">
              {[
                "/tire.png",
                "/break.png",
              ].map((img, i) => (
                <div key={i} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-sm group cursor-pointer">
                  <Image
                    src={img}
                    alt={i === 0 ? "Tire replacement" : "Brake replacement"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

                {/* CENTER — Wide Dark Yellow Slider */}
            <div className="col-span-12 lg:col-span-7">
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden shadow-2xl bg-[#1a0505]">
                
                {/* Consistent Background Glow & Overlay (Always There) */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0202] via-[#1a0505]/60 to-transparent z-20" />
                  <div className="absolute inset-0 bg-[#ef4444]/15 z-10" />
                </div>

                <AnimatePresence>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 flex items-end"
                  >
                    {/* Background product images with "Barks with Yellow" theme */}
                    <div className="absolute inset-0">
                      <Image
                        src={heroSlides[currentSlide].image}
                        alt="Hero slide"
                        fill
                        className="object-cover opacity-50 transition-opacity duration-1000"
                      />
                    </div>



                    {/* Text content on left */}
                    <div className="relative z-10 p-6 sm:p-10 max-w-md">
                      <motion.span
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-block bg-[#ef4444] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-3"
                      >
                        Featured
                      </motion.span>

                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl font-black text-white italic leading-tight mb-3 uppercase drop-shadow-lg"
                      >
                        PREMIUM<br />AUTO PARTS
                      </motion.h2>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 text-sm mb-6 max-w-xs font-medium drop-shadow-md"
                      >
                        Upgrade your ride with high-quality parts and accessories
                      </motion.p>

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-3"
                      >
                        <Link href="/dealership">
                          <Button className="rounded-full bg-white text-black hover:bg-slate-100 font-bold px-6 h-10 text-sm shadow-md">
                            Shop Parts
                          </Button>
                        </Link>
                        <Link href="/api/auth/signin">
                          <Button className="rounded-full bg-[#dc2626] text-white hover:bg-[#b91c1c] font-bold px-6 h-10 text-sm border border-white/30">
                            Become A Seller
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all border-2",
                        currentSlide === i
                          ? "bg-white border-white scale-110"
                          : "bg-transparent border-white/50 hover:border-white"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Smooth Scrolling Products Strip */}
              <div className="mt-3 overflow-hidden rounded-md bg-white shadow-sm">
                <div className="flex animate-marquee-slow gap-5 py-4 px-3">
                  {[...Array(2)].map((_, setIdx) => (
                    <div key={setIdx} className="flex gap-5 shrink-0">
                      {[
                        { name: "Brake Pads", price: "R450", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=200" },
                        { name: "Oil Filter", price: "R120", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=200" },
                        { name: "Spark Plugs", price: "R85", img: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=200" },
                        { name: "Air Filter", price: "R250", img: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=200" },
                        { name: "Headlights", price: "R1,200", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=200" },
                        { name: "Turbo Kit", price: "R8,500", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=200" },
                        { name: "Exhaust", price: "R3,200", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=200" },
                        { name: "Rims Set", price: "R6,800", img: "https://images.unsplash.com/photo-1517524285303-d6fc683dddf8?q=80&w=200" },
                      ].map((product, idx) => (
                        <div key={`${setIdx}-${idx}`} className="flex items-center gap-4 bg-slate-50 rounded-md px-4 py-3 min-w-[220px] hover:bg-slate-100 transition-colors cursor-pointer group">
                          <div className="w-14 h-14 rounded-sm overflow-hidden relative shrink-0">
                            <Image src={product.img} alt={product.name} fill unoptimized className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-[#dc2626] transition-colors">{product.name}</p>
                            <p className="text-xs font-semibold text-[#dc2626]">{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR — User Profile + Hot Deals */}
            <div className="hidden lg:flex col-span-3 flex-col gap-3">

              {/* User Profile Card */}
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 rounded-full bg-[#7c3aed] flex items-center justify-center">
                    <span className="text-white text-2xl">👤</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-4">Alex Morgan</h3>

                <div className="grid grid-cols-3 gap-1 mb-4">
                  {[
                    { icon: "👤", label: "Account" },
                    { icon: "📋", label: "Orders" },
                    { icon: "💜", label: "Wishlist" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>

                <Link href="/admin">
                  <Button variant="outline" className="w-full rounded-lg border-slate-200 text-slate-700 font-semibold text-xs h-9 hover:bg-slate-50">
                    Switch to Seller Dashboard
                  </Button>
                </Link>
              </div>

              {/* Hot Deals Card */}
              <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-2xl p-5 shadow-sm text-white flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔥</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Hot Deals</span>
                </div>
                <h4 className="font-bold text-lg mb-1">Your Favorite Store</h4>
                <p className="text-slate-900/70 text-xs mb-4">Check out the latest new deals</p>

                <div className="bg-white rounded-xl p-3 flex items-center justify-center flex-1 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=400"
                    alt="Hot deal product"
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Deals Strip — Premium Midnight Amber Bar */}
          <div className="mt-4 bg-slate-900 border-l-4 border-red-500 rounded-md py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            {/* Subtle background flair */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="text-center sm:text-left relative z-10">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-red-500 animate-pulse font-black text-xs uppercase tracking-tighter">● Live</span>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Discover Amazing Deals!</h3>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                <span>Top Quality</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                <span>Best Prices</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                <span className="text-red-500">Save up to 40%</span>
              </p>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar relative z-10">
              {[
                "/engine.png", 
                "/tires.png", 
                "/break.png", 
                "/car-body.png", 
                "/tire2.png", 
              ].map((imgUrl, i) => (
                <div key={i} className="group w-16 h-16 rounded-sm bg-slate-800 border border-slate-700 p-1 shrink-0 cursor-pointer hover:border-red-500/50 transition-all shadow-lg active:scale-95">
                  <div className="w-full h-full bg-slate-900 rounded-xs overflow-hidden relative">
                    <Image
                      src={imgUrl}
                      alt="Deal"
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 2: BRAND TRUST MARQUEE                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="marquee-container">
          <div className="marquee-content gap-16 items-center" style={{ "--duration": "30s" } as React.CSSProperties}>
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-16 px-8 text-black">
                {["Toyota", "BMW", "Mercedes", "VW", "Ford", "Nissan", "Hyundai", "Kia", "Audi", "Honda"].map((brand) => (
                  <span key={`${setIdx}-${brand}`} className="text-slate-300 text-2xl font-black uppercase tracking-widest whitespace-nowrap hover:text-slate-900 transition-colors cursor-default">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 3: SHOP BY CATEGORY — Compact 5-Column Grid   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#f8fafc] text-slate-900 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[#ef4444] font-black text-[10px] uppercase tracking-widest mb-1 block">Inventory</span>
              <h2 className="text-2xl font-black text-slate-900 leading-none uppercase italic">Shop By <span className="text-[#ef4444]">Category</span></h2>
            </div>
            <Link href="/dealership" className="text-[10px] font-black uppercase tracking-widest text-[#ef4444] hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((category, idx) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative h-[180px] overflow-hidden rounded-md bg-white shadow-sm"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent group-hover:from-[#ef4444]/60 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="mb-2 p-1.5 w-fit bg-white/10 backdrop-blur-md rounded border border-white/20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  
                  <h3 className="text-sm font-black text-white uppercase italic tracking-tighter leading-tight">
                    {category.name}
                  </h3>
                  
                  <p className="text-[9px] font-bold text-white/60 uppercase group-hover:text-white transition-colors">
                    {category.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 4: WHY CHOOSE US                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 4: WHY CHOOSE US                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-slate-900 rounded-[48px] mx-4 sm:mx-6 overflow-hidden text-white">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/hero-deco.jpg" 
            alt="Background" 
            fill 
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[11px] block mb-4">Why Industry Trusts Us</span>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
            THE MASENYA AUTO PARTS <span className="text-primary italic uppercase">ADVANTAGE.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-10 hover:bg-white/10 hover:-translate-y-2 transition-all duration-500 group border border-white/10"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 5: FEATURED / BEST SELLERS — Clean & Simple   */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-white text-slate-900 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-black uppercase tracking-widest text-xs block mb-3">Hot Right Now</span>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none uppercase italic">
                Best-Selling <span className="text-primary">Parts.</span>
              </h2>
            </div>
            <Link href="/dealership">
              <Button variant="outline" className="h-12 px-8 rounded-full border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white font-bold transition-all">
                Browse All
              </Button>
            </Link>
          </div>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "BMW Adaptive LED Headlight", brand: "Bayerische", price: "R12,500", rating: 5, reviews: 24, tag: "Certified", image: "/product/bmw-headlight.png" },
              { name: "Precision V12 Engine Block", brand: "Elite Performance", price: "R185,000", rating: 5, reviews: 8, tag: "Warehouse Item", image: "/product/engine.png" },
              { name: "High-Pressure Cooling Radiator", brand: "Arctic", price: "R3,800", rating: 4, reviews: 42, tag: "In Stock", image: "/product/radiator.png" },
              { name: "Heavy-Duty Gas Shock Absorber", brand: "Bilstein", price: "R4,200", rating: 5, reviews: 18, tag: "Best Seller", image: "/product/shock-absober.png" },
              { name: "Full-Body Panel Assembly", brand: "Masenya Auto Parts", price: "R52,000", rating: 4, reviews: 12, tag: "Bulk Only", image: "/product/car-body.png" },
              { name: "Sport Performance Alloy Wheel", brand: "Vossen", price: "R6,500", rating: 5, reviews: 31, tag: "Popular", image: "/product/tire2.png" },
              { name: "All-Terrain Rugged Tire", brand: "Goodyear", price: "R2,900", rating: 4, reviews: 56, tag: "Trending", image: "/product/tires.png" },
              { name: "Sequential 6-Speed Gearbox", brand: "ZF Parts", price: "R42,000", rating: 5, reviews: 7, tag: "New Arrival", image: "/product/gearbox.png" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-square bg-slate-50 overflow-hidden border-b border-slate-100">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    unoptimized
                    className="object-cover p-2 rounded-2xl group-hover:scale-110 transition-transform duration-500 will-change-transform" 
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Wishlist Button (Hidden until hover on desktop) */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                  
                  {/* Brand & Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{item.brand}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill={i < item.rating ? "#ef4444" : "#e2e8f0"} stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="text-[10px] text-slate-400 font-medium ml-1">({item.reviews})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-slate-900 leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </h4>

                  {/* Price & Action */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      {/* Price removed as requested */}
                    </div>
                    <button className="h-9 w-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-black transition-all shadow-sm">
                       <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 6: SOCIAL PROOF                              */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-slate-900 text-white rounded-[48px] mx-4 sm:mx-6 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" alt="" fill className="object-cover grayscale" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[11px] block mb-6">Testimonials</span>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-16">
                TRUSTED BY <span className="text-primary italic">EXPERTS.</span>
              </h2>
              <div className="space-y-12">
                <div className="relative pl-10 border-l-4 border-primary">
                  <Quote className="absolute -left-7 top-0 h-14 w-14 text-primary opacity-20" />
                  <p className="text-2xl font-medium italic mb-8 leading-relaxed text-white/80">
                    &quot;Masenya Auto Parts has transformed our workshop supply chain. Delivery is bulletproof and parts quality is always elite.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center font-black text-xl text-black">JD</div>
                    <div>
                      <h5 className="font-black uppercase tracking-tight text-lg">John Dube</h5>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Master Mechanic, JD Tuning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Delivery Time", val: "24h" },
                { label: "Quality Check", val: "100%" },
                { label: "Support Avail.", val: "18h" },
                { label: "Return Rate", val: "<0.1%" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-10 border border-white/10 rounded-3xl text-center hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-5xl font-black text-primary mb-3">{stat.val}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 6.5: LATEST FROM THE HUB                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-[11px] block mb-6">Expert Insights</span>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-slate-900 mb-8 uppercase">
                LATEST FROM <br />
                <span className="gradient-text italic">THE HUB.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium italic">
                Technical guides, maintenance tips, and the latest automotive industry news.
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="rounded-full px-10 h-14 border-2 font-bold uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all">
                View All Articles
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {homeBlogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/blog`}>
                  <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-8 border border-slate-100 shadow-xl shadow-black/5">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 font-medium italic line-clamp-2 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] pt-2">
                      Read Blueprint <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/*  SECTION 7: IMMERSIVE PREMIUM CTA                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="relative py-32 bg-slate-950 overflow-hidden mt-12 mx-4 sm:mx-6 rounded-[3rem] mb-12">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]" />
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay border-red-500"></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-xl">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Experience Authentic Performance</span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-2xl">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-500 italic">Machine.</span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Unlock the true potential of your vehicle with our premium selection of verified auto parts. Engineered for those who demand excellence on every road.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              <Link href="/dealership" className="group">
                <div className="relative p-[2px] rounded-full bg-gradient-to-r from-red-500 via-red-600 to-orange-500 overflow-hidden w-full sm:w-auto mt-0">
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-out transform -skew-x-12 -ml-10 w-20"></div>
                  <Button className="h-16 px-10 rounded-full bg-slate-950 text-white group-hover:bg-transparent group-hover:text-white font-bold text-lg w-full transition-colors duration-300">
                    <Zap className="mr-2 w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                    Explore Catalog
                  </Button>
                </div>
              </Link>
              
              <Link href="/contact" className="group">
                <Button variant="outline" className="h-[68px] px-10 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-lg w-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Speak to an Expert
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-8 border-t border-white/10 w-full max-w-4xl">
              {[
                { label: "Guaranteed Compatibility", icon: <BadgeCheck className="w-5 h-5 text-emerald-400" /> },
                { label: "Lightning Delivery", icon: <Zap className="w-5 h-5 text-amber-400" /> },
                { label: "Premium Support", icon: <ShieldAlert className="w-5 h-5 text-blue-400" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
