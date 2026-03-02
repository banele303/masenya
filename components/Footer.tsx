"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/services" },
  { name: "Catalog", href: "/dealership" },
  { name: "Warehouse", href: "/services/workshop" },
  { name: "Blog", href: "/blog" },
  { name: "About Us", href: "/about" },
];

const products = [
  "Engine Components",
  "Braking Systems",
  "Batteries & Tyres",
  "Suspension Parts",
  "Radiators & Cooling",
  "Body Panels",
];

const customerService = [
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping Policy", href: "/services/finance" },
  { name: "Parts Guarantee", href: "/services/warranty" },
  { name: "Wholesale Accounts", href: "/services/trade-in" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-12">
      <div className="container mx-auto px-6">
        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-12 mb-32 border-b border-slate-100 pb-24">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Nationwide shipping across South Africa" },
            { icon: ShieldCheck, title: "OEM Parts", desc: "100% Genuine and certified inventory" },
            { icon: CreditCard, title: "Secure Payment", desc: "EFT, Card & Mobile payments accepted" },
            { icon: Settings, title: "Expert Support", desc: "Direct technical advice from MASENYA AUTO PARTS team" },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start">
               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <item.icon className="h-7 w-7 text-primary" />
               </div>
               <div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm font-medium text-slate-400 italic">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-10">
               <div className="relative w-60 h-24">
                  <Image 
                    src="/masenya-logo.png" 
                    alt="Masenya Auto Parts" 
                    fill
                    className="object-contain" 
                  />
               </div>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed italic mb-10 text-lg max-w-sm">
              South Africa&apos;s leading warehouse for professional motor spares, high-performance accessories, and distribution logistics.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <button key={i} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-black transition-all">
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Inventory</h4>
            <ul className="space-y-4">
              {products.map((item) => (
                <li key={item}>
                  <Link href="/dealership" className="text-slate-500 hover:text-primary transition-all font-bold text-sm uppercase tracking-widest flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Company</h4>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-500 hover:text-primary transition-all font-bold text-sm uppercase tracking-widest flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Hercules HQ</h4>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold leading-tight italic">
                    3172 Imetjhuri Crescent, Kirkney Estate<br />
                    Hercules, Pretoria West, 0030
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <Link href="tel:+27614403483" className="text-slate-900 font-bold block mb-1">061 440 3483</Link>
                  <Link href="mailto:masenyaautoparts@gmail.com" className="text-slate-400 font-bold italic text-sm">masenyaautoparts@gmail.com</Link>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Mon - Sat: 08:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
             © {new Date().getFullYear()} MASENYA AUTO PARTS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
             {["PAYGATE", "VISA", "MASTERCARD", "OZOW"].map(tag => (
                <span key={tag} className="text-[10px] font-black text-slate-200 tracking-[0.4em]">{tag}</span>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
