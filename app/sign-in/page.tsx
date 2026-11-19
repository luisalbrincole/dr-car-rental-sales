import { getTranslator } from "@/lib/locale";
import { googleSignIn } from "./actions";
import { safeDestination } from "@/lib/session";

export default async function SignIn({ searchParams }: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const t = await getTranslator();
  const { next, error } = await searchParams;
  const destination = safeDestination(next ?? null);
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && process.env.APP_ORIGIN);

  return (
    <section className="mx-auto max-w-md px-5 py-16">
      <h1 className="text-3xl font-bold text-ink">{destination === "/admin" ? t("Staff sign-in", "Acceso del personal") : t("Sign in to your account", "Inicia sesión en tu cuenta")}</h1>
      <p className="my-4 text-slate-600">
        {destination === "/admin" ? t("Use your authorized Google account to manage inventory.", "Usa tu cuenta autorizada de Google para administrar el inventario.") : t("Use Google to request a rental and see your requests.", "Usa Google para solicitar un alquiler y consultar tus solicitudes.")}
      </p>
      {error && configured && <p role="alert" className="mb-4 text-red-700">{t("Sign-in could not be completed. Please try again.", "No se pudo iniciar sesión. Inténtalo de nuevo.")}</p>}
      {configured ? (
        <form action={googleSignIn}>
          <input type="hidden" name="next" value={destination} />
          <button className="focus-ring rounded-md bg-palm px-5 py-3 font-semibold text-white">{t("Continue with Google", "Continuar con Google")}</button>
        </form>
      ) : <p role="status" className="text-slate-600">{t("Google sign-in is currently unavailable.", "El inicio de sesión con Google no está disponible en este momento.")}</p>}
    </section>
  );
}
