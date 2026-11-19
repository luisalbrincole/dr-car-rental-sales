export const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" }
] as const;

export type Locale = (typeof languages)[number]["code"];
export const localeCookie = "site_language";

export function preferredLocale(acceptLanguage: string | null): Locale {
  const preferences = (acceptLanguage ?? "").split(",").map((entry) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters.map((parameter) => parameter.trim()).find((parameter) => parameter.startsWith("q="));
    return { language: tag.split("-")[0], weight: quality ? Number(quality.slice(2)) : 1 };
  });
  const supported = preferences.filter(({ language, weight }) =>
    (language === "en" || language === "es") && weight > 0 && weight <= 1
  );
  supported.sort((first, second) => second.weight - first.weight);
  return supported[0]?.language === "es" ? "es" : "en";
}
