import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Create a new inquiry
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    carId: v.optional(v.id("cars")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

// List inquiries with enriched details for admin dashboard
export const list = query({
  handler: async (ctx) => {
    const inquiries = await ctx.db.query("inquiries").order("desc").collect();

    return await Promise.all(
      inquiries.map(async (inquiry) => {
        let carModel: string | undefined;
        if (inquiry.carId) {
          const car = await ctx.db.get(inquiry.carId);
          if (car) {
            carModel = `${car.year} ${car.make} ${car.model}`;
          }
        }

        return {
          ...inquiry,
          partDetails: inquiry.message,
          carModel,
        };
      })
    );
  },
});

// Get all inquiries (admin only)
export const getAll = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("inquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }

    return await ctx.db.query("inquiries").order("desc").collect();
  },
});

// Update inquiry status
export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

// Get inquiry statistics for admin dashboard
export const getStats = query({
  handler: async (ctx) => {
    const inquiries = await ctx.db.query("inquiries").collect();
    
    const pending = inquiries.filter(i => i.status === 'new').length;
    const contacted = inquiries.filter(i => i.status === 'contacted').length;
    const closed = inquiries.filter(i => i.status === 'closed').length;
    
    return {
      // Order stats mapping
      totalOrders: inquiries.length,
      pendingOrders: pending,
      processingOrders: contacted,
      completedOrders: closed,
      totalRevenue: 0,
      
      // Hire stats mapping
      totalRequests: inquiries.length,
      pendingRequests: pending,
      quotedRequests: contacted,
      confirmedRequests: closed,
    };
  },
});
