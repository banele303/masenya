import type { betterAuth as BetterAuthFn } from "better-auth";

type AuthInstance = ReturnType<typeof BetterAuthFn>;

const getBaseURL = () => {
  let url =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  if (url.includes("localhost") && !url.startsWith("http://")) {
    url = `http://${url}`;
  } else if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url;
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

let _auth: AuthInstance | null = null;

function getAuth(): AuthInstance {
  if (!_auth) {
    // Lazy-load better-auth to avoid module-level side effects during build
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { betterAuth } = require("better-auth") as {
      betterAuth: typeof BetterAuthFn;
    };
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

export const auth = new Proxy({} as AuthInstance, {
  get(_target, prop) {
    return (getAuth() as Record<string | symbol, unknown>)[prop];
  },
});
