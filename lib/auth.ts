import { betterAuth } from "better-auth";

function getBaseURL() {
  const url =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  if (!url || url === "undefined" || url === "null") {
    return "http://localhost:3000";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    return `http://${url}`;
  }

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
  }
  return _auth;
}

/**
 * Lazy initialization of Better Auth with a Proxy.
 * We use a function as the target to ensure 'auth' is callable,
 * which is expected by some parts of Better Auth and the Next.js handler.
 */
export const auth: ReturnType<typeof betterAuth> = new Proxy((() => {}) as any, {
  get(_target, prop) {
    const actualAuth = getAuth();
    const value = (actualAuth as any)[prop];
    if (typeof value === "function") {
      return value.bind(actualAuth);
    }
    return value;
  },
  apply(_target, thisArg, args) {
    return (getAuth() as any).apply(thisArg, args);
  },
});

