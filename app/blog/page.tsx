"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const categories = ["All", "Spares Guides", "Maintenance", "Batteries", "Braking", "New Arrivals"];

const posts = [
  {
    title: "Choosing the Right Oil for Your Engine",
    excerpt: "Discover the differences between synthetic and mineral oils, and which grade is best for your vehicle's specific engine type.",
    date: "Feb 12, 2026",
    author: "~Spares City Team",
    category: "Maintenance",
    image: "/spray-paint.png",
    slug: "engine-oil-guide"
  },
  {
    title: "When to Replace Your Brake Pads",
    excerpt: "Safety first. Learn the warning signs of worn brake pads and when you should visit ~Spares City for a high-performance replacement.",
    date: "Feb 10, 2026",
    author: "~Spares City Team",
    category: "Braking",
    image: "/workshop-services.png",
    slug: "brake-pad-replacement"
  },
  {
    title: "Maximizing Battery Life in Heat",
    excerpt: "Johannesburg summers can be brutal on car batteries. Here's how to ensure your battery maintains its charge during the hottest months.",
    date: "Feb 08, 2026",
    author: "~Spares City Team",
    category: "Batteries",
    image: "/repair-services.png",
    slug: "battery-life-tips"
  },
  {
    title: "OEM vs. Aftermarket Parts: What You Need to Know",
    excerpt: "Understanding the difference between original equipment and certified aftermarket spares. A guide to cost vs. longevity.",
    date: "Feb 05, 2026",
    author: "~Spares City Team",
    category: "Spares Guides",
    image: "/panel-pitting.png",
    slug: "oem-vs-aftermarket"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-primary text-black text-[10px] font-black tracking-[0.3em] uppercase mb-6"
          >
            Insights & Guides
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900 leading-[0.9]"
          >
            The Parts <span className="gradient-text italic italic">Journal.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed italic"
          >
            Your go-to resource for automotive part maintenance, inventory updates, and technical guides from Johannesburg's premier motor spares supplier.
          </motion.p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat, i) => (
            <Button
              key={i}
              variant={i === 0 ? "default" : "outline"}
              className={`rounded-none px-6 py-6 text-[10px] font-black uppercase tracking-widest ${
                i === 0 ? "bg-primary text-black hover:bg-black hover:text-white" : "border-slate-200 text-slate-400 hover:border-primary hover:text-primary transition-all"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {posts.map((post, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group flex flex-col h-full bg-white border border-slate-100 hover:border-primary shadow-sm hover:shadow-2xl transition-all p-4"
            >
              <div className="relative aspect-square overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-primary text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {post.category}
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    {post.author}
                  </span>
                </div>

                <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight text-slate-900 uppercase tracking-tighter">
                  {post.title}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow text-sm">
                  {post.excerpt}
                </p>

                <Button asChild variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent justify-start w-fit">
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                    <span className="border-b-2 border-primary pb-1">Read Full Guide</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform text-primary" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
