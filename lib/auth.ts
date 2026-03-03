import { betterAuth } from "better-auth";

const getBaseURL = () => {
  // If we're in the browser, we can use the window location
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

  // Extremely defensive URL parsing
  try {
    // If it's already a valid absolute URL, use it
    const url = new URL(envUrl);
    if (url.protocol.startsWith('http')) {
       return url.origin;
    }
    throw new Error('Not http');
  } catch (e) {
    // Handle specific cases like "localhost:3000" or "/api/auth"
    const trimmed = envUrl.trim();
    
    // If it's a relative path or empty, use the default
    if (trimmed.startsWith('/') || !trimmed) {
      return "http://localhost:3000";
    }

    // Try to guess the protocol
    try {
      const protocol = (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) ? "http" : "https";
      return new URL(`${protocol}://${trimmed}`).origin;
    } catch (e2) {
      return "http://localhost:3000";
    }
  }
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
  const isPrerendering = 
    process.env.NEXT_PHASE === "phase-production-build" || 
    process.env.NEXT_PHASE === "phase-export" ||
    process.env.CI === "true" ||
    (typeof process !== 'undefined' && process.env.NODE_ENV === "production" && !process.env.BETTER_AUTH_SECRET);

  if (isPrerendering) {
    // Return a safe mock object that satisfies the Proxy's needs
    return {
      handler: () => new Response("Auth disabled in build", { status: 503 }),
      api: {},
      options: { baseURL: getBaseURL() },
      session: { get: () => null }
    } as any;
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
      console.error("Critical: Better Auth failed to initialize at runtime:", e);
      // Fallback to prevent app crash
      return {
        handler: () => new Response("Auth error", { status: 500 }),
        api: {},
        options: { baseURL: getBaseURL() }
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
    
    try {
      const actualAuth = getAuth();
      if (prop in actualAuth) {
        const value = (actualAuth as any)[prop];
        if (typeof value === "function") {
          return value.bind(actualAuth);
        }
        return value;
      }
    } catch (e) {
      console.warn(`Auth Proxy access error for prop "${String(prop)}":`, e);
    }
    return undefined;
  },
});



