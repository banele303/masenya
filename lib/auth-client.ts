"use client";

// NOTE: This module is only ever loaded in the browser.
// The Navbar component and Login/Admin components that import this 
// MUST be dynamically imported with { ssr: false } to prevent Next.js 
// prerendering from triggering better-auth's internal fetch() calls.

import { createAuthClient } from "better-auth/react";

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

const isBrowser = typeof window !== "undefined";

export const authClient = isBrowser
  ? createAuthClient({
      baseURL: getBaseURL(),
    })
  : ({
      signIn: {
        email: async () => ({ data: null, error: null }),
      },
      signUp: {
        email: async () => ({ data: null, error: null }),
      },
      signOut: async () => {},
      useSession: () => ({ data: null, isPending: true, error: null }),
    } as unknown as ReturnType<typeof createAuthClient>);

export const { signIn, signUp, signOut, useSession } = authClient;

