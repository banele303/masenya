import { betterAuth } from "better-auth";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  const envUrl =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined) ||
    "http://localhost:3000";

  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }

  return "http://localhost:3000";
};

const getSocialProviders = () =>
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

let _auth: any = null;

function getAuth() {
  const isServer = typeof window === "undefined";
  const isBuild = isServer && (
    process.env.NEXT_PHASE === "phase-production-build" || 
    process.env.NEXT_PHASE === "phase-export" ||
    process.env.CI === "true" ||
    !process.env.BETTER_AUTH_SECRET
  );

  if (isBuild) {
    const mockAuth = {
      handler: () => new Response("Auth disabled in build", { status: 503 }),
      api: new Proxy({}, { get: () => () => Promise.resolve({ data: null, error: null }) }),
      options: { baseURL: "http://localhost:3000" },
      session: { get: () => Promise.resolve(null) },
    };
    return new Proxy(mockAuth as any, {
       get: (target, prop) => {
         if (prop in target) return (target as any)[prop];
         return () => Promise.resolve(null);
       }
    });
  }

  if (!_auth) {
    try {
      _auth = betterAuth({
        baseURL: getBaseURL(),
        emailAndPassword: { enabled: true },
        socialProviders: getSocialProviders(),
        session: {
          expiresIn: 60 * 60 * 24 * 7,
          updateAge: 60 * 60 * 24,
        },
      });
    } catch (e) {
      console.error("Better Auth init error:", e);
      return {
        handler: () => new Response("Auth configuration error", { status: 500 }),
        api: {},
        options: { baseURL: "http://localhost:3000" }
      } as any;
    }
  }
  return _auth;
}

export const auth: ReturnType<typeof betterAuth> = new Proxy({} as any, {
  get(_target, prop) {
    if (prop === '$$typeof' || prop === 'prototype' || prop === 'constructor' || prop === 'then') {
      return undefined;
    }
    const actualAuth = getAuth();
    const value = (actualAuth as any)[prop];
    if (typeof value === "function") {
      return value.bind(actualAuth);
    }
    return value;
  },
});
