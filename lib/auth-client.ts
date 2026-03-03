"use client";

// NOTE: This module is only ever loaded in the browser.
// The Navbar component and Login/Admin components that import this 
// MUST be dynamically imported with { ssr: false } to prevent Next.js 
// prerendering from triggering better-auth's internal fetch() calls.

import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  // Browser-only fallback
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const envUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  const trimmed = envUrl.trim();
  if (trimmed.includes("localhost") || trimmed.includes("127.0.0.1") || trimmed.includes(".")) {
    const protocol = (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) ? "http" : "https";
    return `${protocol}://${trimmed}`;
  }

  return "http://localhost:3000";
};

const isBrowser = typeof window !== "undefined";

/**
 * Lazy-loaded Auth Client.
 * Prevents better-auth from initializing on the server during the build phase.
 */
let _client: any = null;

function getClient() {
  if (!isBrowser) {
    // Return a mock if accessed on the server during build
    return {
      signIn: { 
        email: async () => ({ data: null, error: null }),
        google: async () => ({ data: null, error: null }),
      },
      signUp: { 
        email: async () => ({ data: null, error: null }),
      },
      signOut: async () => {},
      useSession: () => ({ data: null, isPending: true, error: null }),
      session: { get: () => Promise.resolve(null) },
    } as any;
  }

  if (!_client) {
    _client = createAuthClient({
      baseURL: getBaseURL(),
    });
  }
  return _client;
}

export const authClient = new Proxy({} as any, {
  get(_target, prop) {
    if (prop === '$$typeof' || prop === 'prototype' || prop === 'constructor' || prop === 'then') {
      return undefined;
    }
    const client = getClient();
    if (prop in client) {
      const value = (client as any)[prop];
      if (typeof value === "function") {
        return value.bind(client);
      }
      return value;
    }
    return undefined;
  },
}) as ReturnType<typeof createAuthClient>;

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
export const useSession = authClient.useSession;



