export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

let handler: { GET: Function; POST: Function } | null = null;

function getHandler() {
  if (!handler) {
    handler = toNextJsHandler(auth);
  }
  return handler;
}

export async function GET(req: Request) {
  return getHandler()!.GET(req);
}

export async function POST(req: Request) {
  return getHandler()!.POST(req);
}
