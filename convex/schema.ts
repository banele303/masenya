import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cars: defineTable({
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
    isAvailable: v.boolean(),
    isDealOfWeek: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_make", ["make"])
    .index("by_available", ["isAvailable"])
    .index("by_featured", ["isFeatured"])
    .index("by_deal", ["isDealOfWeek"]),

  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    carId: v.optional(v.id("cars")),
    status: v.string(), // 'new', 'contacted', 'closed'
    createdAt: v.number(),
  }).index("by_status", ["status"]),

  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    role: v.string(), // 'admin', 'user'
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  likes: defineTable({
    userId: v.string(),
    carId: v.id("cars"),
    createdAt: v.number(),
  })
    .index("by_user_car", ["userId", "carId"])
    .index("by_user", ["userId"]),
});
