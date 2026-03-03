import { betterAuth } from "better-auth";

function getBaseURL() {
  const envUrl =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : undefined);

  // Default fallback for build time
  const defaultUrl = "http://localhost:3000";

  if (!envUrl || typeof envUrl !== "string" || envUrl.trim() === "" || envUrl === "undefined" || envUrl === "null") {
    return defaultUrl;
  }

  const url = envUrl.trim();

  // If it's already absolute and valid, return it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Handle localhost cases
  if (url.startsWith("localhost") || url.startsWith("127.0.0.1")) {
    return `http://${url}`;
  }

  // If it looks like a relative path, it's invalid for baseURL
  if (url.startsWith("/")) {
    return defaultUrl;
  }

  // Otherwise assume https
  return `https://${url}`;
}

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
  if (!_auth) {
    // During build, better-auth might fail if baseURL is not perfect.
    // We try to catch any initialization errors to prevent build failure.
    try {
      _auth = betterAuth({
        baseURL: getBaseURL(),
        emailAndPassword: {
          enabled: true,
        },
        socialProviders: getSocialProviders(),
        session: {
          expiresIn: 60 * 60 * 24 * 7, // 7 days
          updateAge: 60 * 60 * 24, // 1 day
        },
      });
    } catch (e) {
      console.error("Better Auth initialization failed during build:", e);
      // Return a dummy object if initialization fails
      return {
        handler: () => new Response("Auth unavailable", { status: 503 }),
        api: {},
      } as any;
    }
  }
  return _auth;
}

/**
 * Lazy initialization of Better Auth with a Proxy.
 */
export const auth: ReturnType<typeof betterAuth> = new Proxy({} as any, {
  get(_target, prop) {
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
  // Ensure it's not callable as a function if it was a Proxy(fn) before
});

