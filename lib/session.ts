import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function sessionClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const jar = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll(values) {
        try {
          for (const { name, value, options } of values) jar.set(name, value, options);
        } catch {
          // Middleware refreshes sessions for read-only server components.
        }
      }
    }
  });
}

export function signInPath(next: string) {
  return "/sign-in?" + new URLSearchParams({ next });
}

export function safeDestination(value: string | null) {
  if (!value) return "/account";
  const path = value.split("?")[0];
  return ["/admin", "/account", "/rentals/request"].includes(path) ? value : "/account";
}
