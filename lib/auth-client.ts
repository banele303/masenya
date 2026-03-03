"use client";

import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  console.log("DEBUG: NEXT_PUBLIC_BASE_URL env:", process.env.NEXT_PUBLIC_BASE_URL);
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
let _client: any = null;

function getClient() {
  console.log("DEBUG: lib/auth-client getClient() called. isBrowser:", isBrowser);
  
  if (!isBrowser) {
    console.log("DEBUG: Returning mock client for server/build.");
    const mockClient = {
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
    };
    return new Proxy(mockClient as any, {
      get: (target, prop) => {
        if (prop in target) return target[prop];
        return () => Promise.resolve({ data: null, error: null });
      }
    });
  }

  if (!_client) {
    try {
      console.log("DEBUG: Initializing authClient with baseURL:", getBaseURL());
      _client = createAuthClient({
        baseURL: getBaseURL(),
      });
      console.log("DEBUG: authClient initialized successfully.");
    } catch (e) {
      console.error("DEBUG: Client Auth runtime initialization error:", e);
      return {
        signIn: { email: async () => ({ data: null, error: null }) },
        signUp: { email: async () => ({ data: null, error: null }) },
        signOut: async () => {},
        useSession: () => ({ data: null, isPending: true, error: null }),
      } as any;
    }
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
