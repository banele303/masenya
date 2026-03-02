"use client";

// NOTE: This module is only ever loaded in the browser.
// The Navbar component (which imports this) is loaded via:
//   dynamic(() => import("@/components/Navbar"), { ssr: false })
// in app/layout.tsx — which prevents this entire module subtree from being
// evaluated during Next.js prerendering. Do NOT remove that dynamic import.

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

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
