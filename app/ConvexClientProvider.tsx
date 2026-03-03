"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

let convexClient: ConvexReactClient | null = null;

function getConvexClient() {
  console.log("DEBUG: getConvexClient() called. CONVEX_URL:", CONVEX_URL);
  if (!convexClient && CONVEX_URL) {
    try {
      convexClient = new ConvexReactClient(CONVEX_URL);
      console.log("DEBUG: ConvexReactClient initialized successfully.");
    } catch (e) {
      console.error("DEBUG: ConvexReactClient initialization FAILED:", e);
    }
  }
  return convexClient;
}


export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = useMemo(() => getConvexClient(), []);

  if (!client) {
    // During build or if env var is missing, render children without Convex
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
