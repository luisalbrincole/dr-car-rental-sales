import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { safeDestination, sessionClient, signInPath } from "@/lib/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = (await cookies()).get("rental-sign-in-next")?.value;
  let next = "/account";
  try {
    next = safeDestination(raw ? decodeURIComponent(raw) : null);
  } catch {
    // Use the account page if the destination cookie is malformed.
  }
  const origin = process.env.APP_ORIGIN ?? new URL(request.url).origin;
  const code = searchParams.get("code");
  const client = await sessionClient();

  const result = code && client ? await client.auth.exchangeCodeForSession(code) : null;
  const target = result && !result.error ? next : signInPath(next) + "&error=google";
  const response = NextResponse.redirect(new URL(target, origin));
  response.cookies.set("rental-sign-in-next", "", { path: "/auth/callback", maxAge: 0 });
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
