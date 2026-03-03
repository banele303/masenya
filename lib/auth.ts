import { betterAuth } from "better-auth";

const getBaseURL = () => {
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

  try {
    // If it's already a valid absolute URL, the constructor will work
    const url = new URL(envUrl);
    return url.origin;
  } catch (e) {
    // If it failed, try adding a protocol
    try {
      if (envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
        return new URL(`http://${envUrl}`).origin;
      }
      return new URL(`https://${envUrl}`).origin;
    } catch (e2) {
      // Final fallback
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
  // CRITICAL: Prevent better-auth from initializing during static generation
  // Next.js sets NEXT_PHASE during the build process
  const isBuild = 
    process.env.NEXT_PHASE === "phase-production-build" || 
    process.env.CI === "true" ||
    process.env.NODE_ENV === "production" && !process.env.BETTER_AUTH_SECRET;

  if (isBuild) {
    return {
      handler: () => new Response("Auth disabled during build", { status: 503 }),
      api: {},
      options: { baseURL: getBaseURL() }
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
      console.error("Better Auth failed to initialize:", e);
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
 * Lazy initialization of Better Auth with a Proxy.
 * This prevents the constructor from running until auth is actually used.
 */
export const auth: ReturnType<typeof betterAuth> = new Proxy({} as any, {
  get(_target, prop) {
    // Some internal tools or React might check for these props
    if (prop === '$$typeof' || prop === 'prototype' || prop === 'constructor') {
      return undefined;
    }
    
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


