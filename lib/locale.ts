import { cache } from "react";
import { cookies, headers } from "next/headers";
import { localeCookie, preferredLocale, type Locale } from "@/lib/i18n";

export const getLocale = cache(async (): Promise<Locale> => {
  const saved = (await cookies()).get(localeCookie)?.value;
  if (saved === "en" || saved === "es") return saved;
  return preferredLocale((await headers()).get("accept-language"));
});

export async function getTranslator() {
  const locale = await getLocale();
  return (english: string, spanish: string) => locale === "es" ? spanish : english;
}
