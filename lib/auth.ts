import { betterAuth } from "better-auth";

const getBaseURL = () => {
  // If we're in the browser, we always use the window location
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

  // Extremely simple absolute URL enforcement
  if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
    return envUrl;
  }
  
  const trimmed = envUrl.trim();
  if (!trimmed || trimmed === "undefined" || trimmed === "null") {
    return "http://localhost:3000";
  }

  // Handle localhost or domains without protocols
  if (trimmed.includes("localhost") || trimmed.includes("127.0.0.1") || trimmed.includes(".")) {
    const protocol = (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) ? "http" : "https";
    return `${protocol}://${trimmed}`;
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
  // Broad detection for any non-runtime environment
  const isServer = typeof window === "undefined";
  const isBuild = isServer && (
    process.env.NEXT_PHASE === "phase-production-build" || 
    process.env.NEXT_PHASE === "phase-export" ||
    process.env.CI === "true" ||
    !process.env.BETTER_AUTH_SECRET
  );

  if (isBuild) {
    // Return a solid mock object that satisfies anyone probing it
    const mockAuth = {
      handler: () => new Response("Auth disabled in build", { status: 503 }),
      api: new Proxy({}, { get: () => () => Promise.resolve({ data: null, error: null }) }),
      options: { baseURL: "http://localhost:3000" },
      session: { get: () => Promise.resolve(null) },
      // Better auth might probe nested props
      $internal: {
        allRoutes: [],
        baseURL: "http://localhost:3000"
      }
    };
    return new Proxy(mockAuth as any, {
       get: (target, prop) => {
         if (prop in target) return (target as any)[prop];
         // Fallback for any other method
         return () => Promise.resolve(null);
       }
    });
  }

  if (!_auth) {
    try {
      _auth = betterAuth({
        baseURL: getBaseURL(),
        emailAndPassword: {
          enabled: true,
        },
        socialProviders: getSocialProviders(),
        session: {
          expiresIn: 60 * 60 * 24 * 7,
          updateAge: 60 * 60 * 24,
        },
      });
    } catch (e) {
      console.error("Better Auth runtime initialization error:", e);
      return {
        handler: () => new Response("Auth configuration error", { status: 500 }),
        api: {},
        options: { baseURL: "http://localhost:3000" }
      } as any;
    }
  }
  return _auth;
}


/**
 * Lazy-load Better Auth to prevent initialization during the static analysis 
 * phase of the build process.
 */
export const auth: ReturnType<typeof betterAuth> = new Proxy({} as any, {
  get(_target, prop) {
    if (prop === '$$typeof' || prop === 'prototype' || prop === 'constructor' || prop === 'then') {
      return undefined;
    }
    
    // Defer to actual initialization
    const actualAuth = getAuth();
    if (prop in actualAuth) {
      const value = (actualAuth as any)[prop];
      if (typeof value === "function") {
        return value.bind(actualAuth);
      }
      return value;
    }
    return undefined;
  },
});




