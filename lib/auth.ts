import { betterAuth } from "better-auth";

const getBaseURL = () => {
  let url = process.env.BETTER_AUTH_URL || 
            process.env.NEXT_PUBLIC_BASE_URL || 
            (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  if (url.includes("localhost") && !url.startsWith("http://")) {
    url = `http://${url}`;
  } else if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url;
};

const socialProviders = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }
  : {};

export const auth = betterAuth({
  baseURL: getBaseURL(),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders,
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
