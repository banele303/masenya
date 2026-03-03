"use client";

import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
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

  return "http://localhost:3000";
};

const isBrowser = typeof window !== "undefined";
let _client: ReturnType<typeof createAuthClient> | null = null;

function getClient(): ReturnType<typeof createAuthClient> {
  if (!isBrowser) {
    // Server/build mock — satisfies all property accesses without crashing
    return {
      signIn: { 
        email: async () => ({ data: null, error: null }),
        social: async () => ({ data: null, error: null }),
      },
      signUp: { 
        email: async () => ({ data: null, error: null }),
      },
      signOut: async () => {},
      useSession: () => ({ data: null, isPending: true, error: null }),
      getSession: async () => ({ data: null, error: null }),
    } as any;
  }

  if (!_client) {
    _client = createAuthClient({
      baseURL: getBaseURL(),
    });
  }
  return _client;
}

// Export the full client for advanced use cases  
export const authClient = new Proxy({} as any, {
  get(_target, prop) {
    if (prop === '$$typeof' || prop === 'prototype' || prop === 'constructor' || prop === 'then') {
      return undefined;
    }
    const client = getClient() as any;
    const value = client[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
}) as ReturnType<typeof createAuthClient>;

// ─── Named Exports ─────────────────────────────────────────────────────────
// These are wrapper functions/proxies that DEFER property access until called.
// This is critical because `createAuthClient` may use internal Proxies, and
// snapshotting properties at module evaluation time can return undefined.

// signIn is an object with methods like .email(), .social()
export const signIn = new Proxy({} as any, {
  get(_target, prop) {
    const client = getClient() as any;
    const signInObj = client.signIn;
    if (!signInObj) return undefined;
    const val = signInObj[prop];
    if (typeof val === "function") return val.bind(signInObj);
    return val;
  }
});

// signUp is an object with methods like .email()
export const signUp = new Proxy({} as any, {
  get(_target, prop) {
    const client = getClient() as any;
    const signUpObj = client.signUp;
    if (!signUpObj) return undefined;
    const val = signUpObj[prop];
    if (typeof val === "function") return val.bind(signUpObj);
    return val;
  }
});

// signOut is a direct function
export function signOut(...args: any[]) {
  const client = getClient() as any;
  return client.signOut(...args);
}

// useSession is a React hook — must be a proper function export
export function useSession() {
  const client = getClient() as any;
  return client.useSession();
}
