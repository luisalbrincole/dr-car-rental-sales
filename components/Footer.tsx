import { getTranslator } from "@/lib/locale";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export async function Footer() {
  const t = await getTranslator();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-bold text-ink">DR Car Rental & Sales</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {t("Modern rental and sales service for tourists, residents, and businesses across the Dominican Republic.", "Alquiler y venta de vehículos para turistas, residentes y empresas en República Dominicana.")}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t("Explore", "Explorar")}</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="text-slate-600 hover:text-palm" href="/rentals">
              {t("Rental cars", "Vehículos de alquiler")}
            </Link>
            <Link className="text-slate-600 hover:text-palm" href="/sales">
              {t("Cars for sale", "Vehículos en venta")}
            </Link>
            <Link className="text-slate-600 hover:text-palm" href="/import-services">
              {t("Import services", "Servicios de importación")}
            </Link>
            <Link className="text-slate-600 hover:text-palm" href="/contact">
              {t("Contact and booking", "Contacto y reservas")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">WhatsApp</p>
          <a
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-palm px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            href="https://wa.me/18492570102"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t("Contact on WhatsApp", "Contáctanos por WhatsApp")}
          </a>
        </div>
      </div>
    </footer>
  );
}
