"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  ChevronDown,
  User,
  LogOut,
  Wrench,
  CarFront,
  Banknote,
  ShieldCheck,
  Repeat
} from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SERVICES = [
  { name: "Workshop", href: "/services/workshop", icon: Wrench, description: "Expert repairs & maintenance" },
  { name: "Sales", href: "/services/sales", icon: CarFront, description: "Premium parts & accessories" },
  { name: "Finance", href: "/services/finance", icon: Banknote, description: "Flexible payment options" },
  { name: "Warranty", href: "/services/warranty", icon: ShieldCheck, description: "Guaranteed quality covering" },
  { name: "Trade-In", href: "/services/trade-in", icon: Repeat, description: "Upgrade your old parts" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link 
        href={href} 
        className={`relative font-semibold text-[15px] transition-colors hover:text-primary ${
          isActive ? "text-primary" : "text-slate-700"
        }`}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-[22px] left-0 right-0 h-[3px] bg-primary rounded-t-full"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm py-2" 
          : "bg-white border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className={`relative transition-all duration-300 ${scrolled ? "w-40 h-10" : "w-48 h-12"}`}>
               <Image 
                src="/masenya-logo.png" 
                alt="Masenya Auto Parts" 
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex flex-1 items-center justify-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="group flex items-center gap-1 font-semibold text-[15px] text-slate-700 hover:text-primary transition-colors focus:outline-none data-[state=open]:text-primary">
                Services
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[340px] p-4 bg-white/95 backdrop-blur-xl border-slate-200/60 rounded-2xl shadow-xl mt-4">
                <div className="grid gap-2">
                  <div className="mb-2 px-2 pb-2 border-b border-slate-100">
                     <p className="text-sm font-bold text-slate-900">Our Services</p>
                     <p className="text-xs text-muted-foreground mt-0.5">Comprehensive solutions for your vehicle.</p>
                  </div>
                  {SERVICES.map((service) => (
                    <DropdownMenuItem key={service.name} asChild className="rounded-xl p-3 cursor-pointer focus:bg-slate-50">
                      <Link href={service.href} className="flex flex-row items-center gap-4 w-full">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{service.name}</span>
                          <span className="text-xs text-muted-foreground">{service.description}</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer focus:bg-slate-50">
                      <Link href="/services" className="flex items-center justify-center w-full text-sm font-bold text-primary">
                        View All Services
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0 ml-auto xl:ml-0">
            {/* Search Icon */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="flex items-center justify-center w-10 h-10 rounded-full text-slate-600 hover:bg-slate-100 transition-colors relative group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-primary text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                0
              </span>
            </Link>

            {/* User Auth */}
            <div className="hidden md:flex items-center ml-2 border-l border-slate-200 pl-5">
              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 rounded-full px-3 pl-2 border border-slate-200 shadow-sm hover:shadow transition-all bg-white data-[state=open]:bg-slate-50">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {session.user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold max-w-[100px] truncate">{session.user.name || session.user.email}</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground mr-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2">
                    <div className="px-2 py-2 border-b border-slate-100 mb-2">
                      <p className="text-sm font-bold truncate">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                    </div>
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/admin"><User className="mr-2 h-4 w-4" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="rounded-lg text-red-600 focus:text-red-600 cursor-pointer mt-1" 
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="rounded-full shadow-sm shadow-primary/20 bg-primary hover:bg-primary/90 text-white font-bold px-6">
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-full text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors" 
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden fixed inset-x-0 top-[65px] bg-white z-[90] overflow-y-auto border-t border-slate-100 flex flex-col"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {/* Mobile Search */}
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search parts, services..."
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl text-[16px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col gap-2 mt-4">
                {[
                  { name: "Home", href: "/" },
                  { name: "Products", href: "/products" },
                  { name: "Services", href: "/services" },
                  // Adding indent for sub-services on mobile
                  ...SERVICES.map(s => ({ ...s, name: `↳ ${s.name}`, isSub: true })),
                  { name: "Blog", href: "/blog" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <Link 
                        href={item.href} 
                        className={`flex items-center py-4 text-xl font-bold border-b border-slate-100 ${"isSub" in item && item.isSub ? 'pl-6 text-lg text-slate-600 border-none py-3' : 'text-slate-900'} ${isActive ? "text-primary" : ""}`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Footer / Auth */}
              <div className="mt-auto pt-8">
                {session?.user ? (
                  <div className="bg-slate-50 rounded-3xl p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-xl text-primary">
                        {session.user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{session.user.name || "User"}</p>
                        <p className="text-sm text-slate-500 truncate max-w-[200px]">{session.user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                       <Button asChild className="w-full rounded-xl bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm">
                          <Link href="/admin">Dashboard</Link>
                       </Button>
                       <Button 
                          variant="outline" 
                          className="w-full rounded-xl text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 font-bold"
                          onClick={() => signOut()}
                       >
                          Sign Out
                       </Button>
                    </div>
                  </div>
                ) : (
                  <Button asChild className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20">
                    <Link href="/login">Sign In / Register</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
