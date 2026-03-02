"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Search,
  Mail,
  MoreVertical,
  Inbox,
  User,
  CarFront,
  Phone,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function InquiriesPage() {
  const inquiries = useQuery(api.inquiries.list);
  const stats = useQuery(api.inquiries.getStats);
  const updateStatus = useMutation(api.inquiries.updateStatus);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (inquiry.partDetails || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? inquiry.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "contacted": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "closed": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      default: return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  const handleStatusChange = async (id: any, currentStatus: string) => {
    const nextStatus = currentStatus === "new" ? "contacted" : currentStatus === "contacted" ? "closed" : "new";
    await updateStatus({ id, status: nextStatus });
  };

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-[1600px] mx-auto w-full">
      {/* Premium Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-tight border border-primary/20 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Inquiries Dashboard</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Customer Requests
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Review and manage incoming part inquiries, customer messages, and orders. Keep track of status and respond promptly.
          </motion.p>
        </div>
        
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto"
        >
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, email or part..." 
              className="pl-11 h-12 w-full rounded-2xl bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
             {["new", "contacted", "closed"].map((status) => (
               <Button
                 key={status}
                 variant={filterStatus === status ? "default" : "outline"}
                 className={`h-12 rounded-2xl flex-1 sm:flex-none capitalize shadow-sm transition-all whitespace-nowrap ${filterStatus === status ? "ring-2 ring-primary/30 ring-offset-2 dark:ring-offset-slate-950" : "bg-white dark:bg-slate-900/50"}`}
                 onClick={() => setFilterStatus(filterStatus === status ? null : status)}
               >
                 {status}
               </Button>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Requests", value: stats?.totalRequests ?? 0, icon: Inbox, color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-200 dark:border-slate-800" },
          { label: "New (Pending)", value: stats?.pendingRequests ?? 0, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { label: "Contacted", value: stats?.quotedRequests ?? 0, icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
          { label: "Closed", value: stats?.confirmedRequests ?? 0, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 rounded-3xl border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl`}>
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-${stat.color.split('-')[1]}-500/5`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-semibold text-muted-foreground">{stat.label}</span>
                <div className={`p-2.5 rounded-2xl shadow-sm ${stat.bg} ${stat.border} border`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                    <div className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {stat.value}
                    </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Inquiries Feed */}
      <Card className="border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl rounded-[32px] overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-50"></div>
        <div className="p-6 sm:p-8 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <h3 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              Inbox
              <Badge variant="secondary" className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 font-semibold">
                  {filteredInquiries?.length ?? 0}
              </Badge>
           </h3>
           <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Live Sync Active
           </div>
        </div>
        
        <div className="p-4 sm:p-6 lg:p-8 border-t border-white/40 dark:border-slate-800/40">
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {filteredInquiries === undefined ? (
                    <div className="p-20 flex justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    </div>
                ) : filteredInquiries.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-16 text-center flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/30 rounded-[24px] border border-dashed border-slate-200 dark:border-slate-800"
                  >
                     <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 shadow-sm rounded-full flex items-center justify-center mb-6">
                        <Inbox className="h-10 w-10 text-slate-400 dark:text-slate-500" />
                     </div>
                     <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">No requests found</h3>
                     <p className="text-muted-foreground max-w-sm">
                        {searchTerm || filterStatus ? "Try clearing your filters or search terms to see more results." : "You're all caught up! There are no new inquiries at the moment."}
                     </p>
                     {(searchTerm || filterStatus) && (
                        <Button 
                            variant="outline" 
                            className="mt-6 rounded-xl"
                            onClick={() => { setSearchTerm(""); setFilterStatus(null); }}
                        >
                            Clear Filters
                        </Button>
                     )}
                  </motion.div>
                ) : (
                  filteredInquiries.map((inquiry, idx) => (
                    <motion.div 
                        key={inquiry._id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/30 p-6 sm:p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col xl:flex-row gap-8 relative overflow-hidden"
                    >
                       {/* Vertical Status Indicator line */}
                       <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${inquiry.status === 'new' ? 'bg-blue-500' : inquiry.status === 'contacted' ? 'bg-amber-500' : 'bg-emerald-500'} opacity-50 group-hover:opacity-100 transition-opacity`} />
                       
                       {/* Caller Info Header */}
                       <div className="flex-shrink-0 w-full xl:w-72 space-y-5">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-900 dark:text-white flex items-center justify-center font-bold text-xl shadow-inner border border-white/20 dark:border-white/5">
                                {inquiry.name.charAt(0).toUpperCase()}
                             </div>
                             <div>
                                <h4 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{inquiry.name}</h4>
                                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mt-1 bg-slate-100 dark:bg-slate-800/50 w-fit px-2 py-0.5 rounded-md">
                                    <Clock className="w-3 h-3" /> {format(inquiry._creationTime, "MMM dd, yyyy • HH:mm")}
                                </span>
                             </div>
                          </div>
                          <div className="space-y-3">
                              <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4" /></div>
                                  <span className="truncate break-all">{inquiry.email}</span>
                              </a>
                              {inquiry.phone && (
                                  <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 hover:text-primary transition-colors p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0"><Phone className="w-4 h-4" /></div>
                                      <span>{inquiry.phone}</span>
                                  </a>
                              )}
                          </div>
                       </div>
                       
                       {/* Part/Message Details */}
                       <div className="flex-1 min-w-0 flex flex-col">
                           <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                              <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                      <MessageSquare className="w-4 h-4 text-primary" />
                                      <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">Message / Request</span>
                                  </div>
                                  {inquiry.carModel && (
                                      <Badge variant="outline" className="rounded-full bg-white dark:bg-slate-900 shadow-sm border-slate-200 dark:border-slate-700 flex items-center gap-1.5 px-3 py-1">
                                          <CarFront className="w-3.5 h-3.5 text-primary" />
                                          <span className="font-semibold text-xs">{inquiry.carModel}</span>
                                      </Badge>
                                  )}
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed whitespace-pre-wrap">
                                {inquiry.partDetails || inquiry.message || "No specific details provided."}
                              </p>
                           </div>
                       </div>
                       
                       {/* Actions / Status */}
                       <div className="w-full xl:w-48 flex flex-row xl:flex-col justify-between xl:justify-start gap-4 flex-shrink-0 border-t xl:border-t-0 xl:border-l border-slate-100 dark:border-slate-800 pt-6 xl:pt-0 xl:pl-6">
                            <div className="space-y-1.5 flex-1 xl:flex-none relative">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Current Status</span>
                                <Badge 
                                    className={`w-full justify-center px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:opacity-80 transition-all border-2 ${getStatusColor(inquiry.status)}`}
                                    onClick={() => handleStatusChange(inquiry._id, inquiry.status)}
                                >
                                    {inquiry.status}
                                </Badge>
                                <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity absolute w-full left-0">
                                    Click to cycle status
                                </p>
                            </div>
                            
                            <a href={`mailto:${inquiry.email}`} className="w-14 xl:w-full h-14 xl:h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-lg group/btn transition-all self-end xl:mt-auto flex items-center justify-center">
                                <span className="hidden xl:inline font-semibold">Reply via Email</span>
                                <ArrowRight className="w-5 h-5 xl:ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                       </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
        </div>
      </Card>
    </div>
  );
}
