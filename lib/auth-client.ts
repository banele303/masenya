"use client";

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

// Only initialize the auth client in the browser.
// During Next.js build prerendering (server-side), this module is evaluated
// without a running server, so we must NOT call createAuthClient() there —
// better-auth internally makes fetch calls during construction which causes
// "Provided address was not an absolute URL" prerender errors.
const isBrowser = typeof window !== "undefined";

let _client: ReturnType<typeof createAuthClient> | null = null;
const getClient = (): ReturnType<typeof createAuthClient> => {
  if (!_client) {
    _client = createAuthClient({ baseURL: getBaseURL() });
  }
  return _client;
};

// During SSR/prerender: return a Proxy that no-ops all property accesses.
// During browser runtime: return the real initialized auth client.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ssrStub = new Proxy({} as ReturnType<typeof createAuthClient>, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: () => (() => {}) as any,
});

export const authClient: ReturnType<typeof createAuthClient> = isBrowser
  ? getClient()
  : ssrStub;

// Named convenience exports — cast via unknown to satisfy strict generics
type AuthClient = ReturnType<typeof createAuthClient>;

export const signIn = authClient.signIn as AuthClient["signIn"];
export const signUp = authClient.signUp as AuthClient["signUp"];
export const signOut = authClient.signOut as AuthClient["signOut"];
export const useSession = authClient.useSession as AuthClient["useSession"];


