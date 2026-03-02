"use client";

// NOTE: This module must NEVER evaluate better-auth on the server.
// We use a lazy initialization pattern so that `createAuthClient` is only
// dynamically imported when first accessed in the browser. This prevents
// Next.js prerendering from triggering better-auth's internal fetch() calls
// which fail with "Provided address was not an absolute URL" on the server.

import type { createAuthClient as CreateAuthClientFn } from "better-auth/react";

type AuthClient = ReturnType<typeof CreateAuthClientFn>;

const getBaseURL = () => {
  let url =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");
  if (url.includes("localhost") && !url.startsWith("http://")) {
    url = `http://${url}`;
  } else if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url;
};

// Stub used during SSR / prerendering — no real auth calls should ever happen
const serverStub: AuthClient = {
  signIn: {
    email: async () => ({ data: null, error: null }),
  },
  signUp: {
    email: async () => ({ data: null, error: null }),
  },
  signOut: async () => {},
  useSession: () => ({ data: null, isPending: true, error: null }),
} as unknown as AuthClient;

let _clientInstance: AuthClient | null = null;

function getClient(): AuthClient {
  if (typeof window === "undefined") {
    return serverStub;
  }
  if (!_clientInstance) {
    // Use require() for synchronous lazy loading in the browser.
    // This ensures the better-auth/react module is NEVER parsed on the server.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createAuthClient } = require("better-auth/react") as {
      createAuthClient: typeof CreateAuthClientFn;
    };
    _clientInstance = createAuthClient({
      baseURL: getBaseURL(),
    });
  }
  return _clientInstance;
}

// Proxy so that every property access goes through getClient()
export const authClient: AuthClient = new Proxy({} as AuthClient, {
  get(_target, prop) {
    return (getClient() as Record<string | symbol, unknown>)[prop];
  },
});

// Named exports use proxies so they are lazily resolved at usage time, not at import time
export const signIn: AuthClient["signIn"] = new Proxy({} as AuthClient["signIn"], {
  get(_target, prop) {
    return (getClient().signIn as Record<string | symbol, unknown>)[prop];
  },
});

export const signUp: AuthClient["signUp"] = new Proxy({} as AuthClient["signUp"], {
  get(_target, prop) {
    return (getClient().signUp as Record<string | symbol, unknown>)[prop];
  },
});

// signOut and useSession are functions — wrap them in thunks
export const signOut: AuthClient["signOut"] = (async (...args: Parameters<AuthClient["signOut"]>) =>
  getClient().signOut(...args)) as AuthClient["signOut"];

export const useSession: AuthClient["useSession"] = ((...args: Parameters<AuthClient["useSession"]>) =>
  getClient().useSession(...args)) as AuthClient["useSession"];
