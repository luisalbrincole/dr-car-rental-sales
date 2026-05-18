import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const variants = {
    primary: "bg-palm text-white hover:bg-emerald-800",
    secondary: "bg-coral text-white hover:bg-orange-700",
    ghost: "border border-slate-300 bg-white text-ink hover:border-palm hover:text-palm"
  };
  const className = `focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${variants[variant]}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
