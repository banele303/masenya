import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all available cars
export const getAll = query({
  args: {
    make: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let carsQuery = ctx.db
      .query("cars")
      .withIndex("by_available", (q) => q.eq("isAvailable", true));

    const cars = await carsQuery.collect();

    let filteredCars = cars;
    if (args.make && args.make !== "all") {
      filteredCars = cars.filter(
        (car) => car.make.toLowerCase() === args.make!.toLowerCase()
      );
    }

    if (args.limit) {
      return filteredCars.slice(0, args.limit);
    }

    return filteredCars;
  },
});

// Get featured cars
export const getFeatured = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();

    const availableCars = cars.filter((car) => car.isAvailable);

    if (args.limit) {
      return availableCars.slice(0, args.limit);
    }

    return availableCars;
  },
});

// Get deal of the week
export const getDealOfWeek = query({
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_deal", (q) => q.eq("isDealOfWeek", true))
      .collect();

    const availableCars = cars.filter((car) => car.isAvailable);
    return availableCars[0] || null;
  },
});

// Get single car by ID
export const getById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get unique makes for filter
export const getMakes = query({
  handler: async (ctx) => {
    const cars = await ctx.db
      .query("cars")
      .withIndex("by_available", (q) => q.eq("isAvailable", true))
      .collect();

    const makes = [...new Set(cars.map((car) => car.make))];
    return makes.sort();
  },
});

// Create a new car listing (admin only)
export const create = mutation({
  args: {
    make: v.string(),
    model: v.string(),
    year: v.number(),
    price: v.number(),
    mileage: v.optional(v.number()),
    fuelType: v.string(),
    transmission: v.string(),
    engineSize: v.optional(v.string()),
    color: v.optional(v.string()),
    bodyType: v.optional(v.string()),
    description: v.string(),
    features: v.optional(v.array(v.string())),
    images: v.array(v.string()),
    isDealOfWeek: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("cars", {
      ...args,
      isAvailable: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update car availability
export const updateAvailability = mutation({
  args: {
    id: v.id("cars"),
    isAvailable: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isAvailable: args.isAvailable,
      updatedAt: Date.now(),
    });
  },
});

// Get car statistics for admin dashboard
export const getStats = query({
  handler: async (ctx) => {
    const cars = await ctx.db.query("cars").collect();
    
    return {
      totalProducts: cars.length,
      activeProducts: cars.filter((c) => c.isAvailable).length,
      featuredCount: cars.filter((c) => c.isFeatured).length,
      lowStock: 0,
      jewelryCount: 0,
      decorCount: 0,
    };
  },
});

export const splitImage = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    // This is a placeholder if needed, otherwise ignore.
  }
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const remove = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("cars"),
    make: v.optional(v.string()),
    model: v.optional(v.string()),
    year: v.optional(v.number()),
    price: v.optional(v.number()),
    mileage: v.optional(v.number()),
    fuelType: v.optional(v.string()),
    transmission: v.optional(v.string()),
    engineSize: v.optional(v.string()),
    color: v.optional(v.string()),
    bodyType: v.optional(v.string()),
    description: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    images: v.optional(v.array(v.string())),
    isDealOfWeek: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isAvailable: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });
  },
});
