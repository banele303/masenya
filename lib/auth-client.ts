"use client";

// NOTE: This module is only ever loaded in the browser.
// The Navbar component and Login/Admin components that import this 
// MUST be dynamically imported with { ssr: false } to prevent Next.js 
// prerendering from triggering better-auth's internal fetch() calls.

import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  const envUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000");

  const defaultUrl = "http://localhost:3000";

  if (!envUrl || typeof envUrl !== "string" || envUrl.trim() === "" || envUrl === "undefined" || envUrl === "null") {
    return defaultUrl;
  }

  const url = envUrl.trim();

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("localhost") || url.startsWith("127.0.0.1")) {
    return `http://${url}`;
  }

  if (url.startsWith("/")) {
    return defaultUrl;
  }

  return `https://${url}`;
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

