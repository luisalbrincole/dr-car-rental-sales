import { googleSignIn } from "./actions";
import { safeDestination } from "@/lib/session";

export default async function SignIn({ searchParams }: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const destination = safeDestination(next ?? null);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && process.env.APP_ORIGIN);

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-3xl font-bold text-ink">{destination === "/admin" ? "Staff sign-in" : "Sign in to your account"}</h1>
      <p className="my-4 text-slate-600">
        {destination === "/admin" ? "Use your authorized Google account to manage inventory." : "Use Google to request a rental and see your requests."}
      </p>
      {error && configured && <p role="alert" className="mb-4 text-red-700">Sign-in could not be completed. Please try again.</p>}
      {configured ? (
        <form action={googleSignIn}>
          <input type="hidden" name="next" value={destination} />
          <button className="focus-ring rounded-md bg-palm px-5 py-3 font-semibold text-white">Continue with Google</button>
        </form>
      ) : <p role="status" className="text-slate-600">Google sign-in is currently unavailable.</p>}
    </section>
  );
}
