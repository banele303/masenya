import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const toggle = mutation({
  args: { carId: v.id("cars") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_car", (q) =>
        q.eq("userId", userId).eq("carId", args.carId)
      )
      .unique();

    if (existingLike) {
      await ctx.db.delete(existingLike._id);
      return false; // unliked
    } else {
      await ctx.db.insert("likes", {
        userId,
        carId: args.carId,
        createdAt: Date.now(),
      });
      return true; // liked
    }
  },
});

export const getLikedCars = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    const userId = identity.subject;

    const likes = await ctx.db
      .query("likes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const cars = await Promise.all(
      likes.map(async (like) => {
        return await ctx.db.get(like.carId);
      })
    );

    return cars.filter((c) => c !== null);
  },
});

export const isLiked = query({
  args: { carId: v.id("cars") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return false;
    }
    const userId = identity.subject;
    const like = await ctx.db
      .query("likes")
      .withIndex("by_user_car", (q) =>
        q.eq("userId", userId).eq("carId", args.carId)
      )
      .unique();
    return !!like;
  },
});
