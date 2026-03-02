export const dynamic = "force-dynamic";

import type { NextRequest } from "next/server";

let _handler: { GET: Function; POST: Function } | null = null;

function getHandler(): { GET: Function; POST: Function } {
  if (!_handler) {
    // Lazy-load to prevent better-auth side effects during build/prerendering
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { auth } = require("@/lib/auth");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { toNextJsHandler } = require("better-auth/next-js");
    _handler = toNextJsHandler(auth);
  }
  return _handler!;
}

export async function GET(request: NextRequest) {
  return getHandler().GET(request);
}

export async function POST(request: NextRequest) {
  return getHandler().POST(request);
}
