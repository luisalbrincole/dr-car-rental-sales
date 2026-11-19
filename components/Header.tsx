"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Car, Languages } from "lucide-react";
import { languages, localeCookie, type Locale } from "@/lib/i18n";

const navItems = [
  { href: "/", en: "Home", es: "Inicio" },
  { href: "/rentals", en: "Rentals", es: "Alquileres" },
  { href: "/sales", en: "Cars for Sale", es: "Vehículos en venta" },
  { href: "/import-services", en: "Import Services", es: "Importación" },
  { href: "/contact", en: "Contact", es: "Contacto" },
  { href: "/account", en: "My rentals", es: "Mis alquileres" },
  { href: "/admin", en: "Staff", es: "Personal" }
];

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function changeLanguage(next: Locale) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = localeCookie + "=" + next + "; Path=/; Max-Age=31536000; SameSite=Lax" + secure;
    startTransition(() => router.refresh());
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid size-10 place-items-center rounded-md bg-palm text-white">
            <Car size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold text-ink">DR Car Rental & Sales</span>
            <span className="block text-xs text-slate-500">{locale === "es" ? "Alquiler y venta de vehículos" : "Rentals and vehicle sales"}</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item[locale]} pathname={pathname} />
          ))}
          <div className="ml-0 flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 sm:ml-2">
            <Languages size={14} aria-hidden="true" />
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                lang={language.code}
                aria-label={language.label}
                aria-pressed={language.code === locale}
                disabled={pending}
                onClick={() => changeLanguage(language.code)}
                className={`focus-ring rounded px-1.5 py-1 font-semibold ${language.code === locale ? "bg-palm text-white" : "hover:bg-slate-200"}`}
              >
                {language.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  pathname: string;
};

function NavLink({ href, label, pathname }: NavLinkProps) {
  const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`focus-ring rounded-md px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-palm text-white shadow-sm hover:bg-emerald-800"
          : "text-slate-700 hover:bg-slate-100 hover:text-palm"
      }`}
    >
      {label}
    </Link>
  );
}
