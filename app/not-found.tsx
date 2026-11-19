import { getTranslator } from "@/lib/locale";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslator();
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-coral">{t("Not found", "No encontrado")}</p>
      <h1 className="mt-3 text-3xl font-bold text-ink">{t("This vehicle is not available here", "Este vehículo no está disponible")}</h1>
      <p className="mt-4 text-slate-600">
        {t("Browse the current rental and sales inventory or send a request for help finding a similar vehicle.", "Explora los vehículos en alquiler y en venta o solicita ayuda para encontrar uno similar.")}
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/rentals"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-palm px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          {t("View rentals", "Ver alquileres")}
        </Link>
        <Link
          href="/sales"
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-palm hover:text-palm"
        >
          {t("View cars for sale", "Ver vehículos en venta")}
        </Link>
      </div>
    </section>
  );
}
