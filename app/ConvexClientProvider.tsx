"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

let convexClient: ConvexReactClient | null = null;

function getConvexClient() {
  if (convexClient) return convexClient;
  
  // Basic validation to avoid "not an absolute URL" crash
  const isValidUrl = CONVEX_URL && (CONVEX_URL.startsWith("http://") || CONVEX_URL.startsWith("https://"));
  
  if (isValidUrl) {
    try {
      convexClient = new ConvexReactClient(CONVEX_URL!);
    } catch (e) {
      console.error("Convex initialization failed:", e);
    }
  }
  return convexClient;
}


export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = getConvexClient();

  if (!client) {
    // Critical: If Convex is missing during build, we MUST still render children
    // to allow static generation to complete for non-Convex parts.
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
