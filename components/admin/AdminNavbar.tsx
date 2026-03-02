"use client";

import { Bell, Search, Menu, LogOut, User, Activity, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const [notifications] = useState(3);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-20 items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-8 flex-1">
          <div className="relative w-full max-w-lg group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search logistics matrix, fleet units, or signals..."
              className="pl-12 h-12 bg-slate-100/50 dark:bg-slate-900/50 border-none rounded-2xl focus-visible:ring-primary/20 transition-all font-medium text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Operational System v2.0</span>
          </div>

          <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-800 cursor-pointer">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary text-white rounded-full text-[10px] font-bold border-2 border-white dark:border-slate-950">
                {notifications}
              </span>
            )}
          </Button>

          <div className="flex items-center gap-4 pl-6 border-l border-slate-100 dark:border-slate-800">
            <div className="hidden md:block text-right">
              <p className="text-sm font-black uppercase tracking-tight leading-none group flex items-center justify-end gap-1.5">
                {session?.user?.name || "Admin User"}
                <Shield className="h-3 w-3 text-primary" />
              </p>
              <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">
                Fleet Overseer
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-2xl p-0 overflow-hidden ring-2 ring-slate-100 dark:ring-slate-800 ring-offset-2 hover:ring-primary/40 transition-all cursor-pointer">
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback className="bg-slate-900 text-white font-black">{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 rounded-2xl p-2 mt-2 shadow-2xl border-slate-100 dark:border-slate-800" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-black uppercase tracking-tight">{session?.user?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-800" />
                <DropdownMenuItem onClick={handleSignOut} className="rounded-xl h-11 cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-900/20 font-bold uppercase tracking-widest text-[10px]">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Terminate Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
