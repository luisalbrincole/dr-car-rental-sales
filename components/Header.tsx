"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Languages } from "lucide-react";
import { commonCopy, languages } from "@/lib/i18n";

const navItems = [
  { href: "/", label: commonCopy.en.home },
  { href: "/rentals", label: commonCopy.en.rentals },
  { href: "/sales", label: commonCopy.en.sales },
  { href: "/import-services", label: commonCopy.en.importServices },
  { href: "/contact", label: commonCopy.en.contact },
  { href: "/admin", label: commonCopy.en.admin }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
          <span className="grid size-10 place-items-center rounded-md bg-palm text-white">
            <Car size={22} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-bold text-ink">DR Car Rental & Sales</span>
            <span className="block text-xs text-slate-500">Rentals and vehicle sales</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} pathname={pathname} />
          ))}
          <div className="ml-0 flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 sm:ml-2">
            <Languages size={14} aria-hidden="true" />
            {languages.map((language) => (
              <span key={language.code} className="rounded px-1.5 py-1">
                {language.code.toUpperCase()}
              </span>
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
