"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { safeDestination, sessionClient, signInPath } from "@/lib/session";

export async function googleSignIn(form: FormData) {
  const next = safeDestination(String(form.get("next") ?? ""));
  const client = await sessionClient();
  const origin = process.env.APP_ORIGIN;
  if (!client || !origin) redirect(signInPath(next) + "&error=setup");

  const callback = new URL("/auth/callback", origin);
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback.href }
  });
  if (error || !data.url) redirect(signInPath(next) + "&error=google");
  (await cookies()).set("rental-sign-in-next", encodeURIComponent(next), {
    httpOnly: true, sameSite: "lax", secure: callback.protocol === "https:",
    path: "/auth/callback", maxAge: 600
  });
  redirect(data.url);
}

export async function signOut() {
  const client = await sessionClient();
  if (client) await client.auth.signOut({ scope: "local" });
  redirect("/");
}
