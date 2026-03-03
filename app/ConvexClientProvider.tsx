"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

let convexClient: ConvexReactClient | null = null;

function getConvexClient() {
  if (convexClient) return convexClient;
  
  // Basic validation to avoid "not an absolute URL" crash
  const isValidUrl = CONVEX_URL && (CONVEX_URL.startsWith("http://") || CONVEX_URL.startsWith("https://"));
  
  try {
    // During build, if URL is invalid, use a dummy but valid absolute URL to prevent crashes
    const urlToUse = isValidUrl ? CONVEX_URL! : "https://build-time-dummy.convex.cloud";
    convexClient = new ConvexReactClient(urlToUse);
  } catch (e) {
    console.error("Convex initialization failed:", e);
  }
  
  return convexClient;
}

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const client = getConvexClient();

  // We ALWAYS render the provider. If the client couldn't be created (rare), 
  // we fallback to Fragment, but getConvexClient now guarantees a client.
  if (!client) return <>{children}</>;

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}

