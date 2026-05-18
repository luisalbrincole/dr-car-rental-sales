"use client";

import type { ReactNode } from "react";

type PlaceholderButtonProps = {
  children: ReactNode;
  message: string;
  className?: string;
};

export function PlaceholderButton({ children, message, className = "" }: PlaceholderButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.alert(message)}
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}
