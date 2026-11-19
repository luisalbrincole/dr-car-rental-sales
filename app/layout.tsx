import type { Metadata } from "next";
import "./globals.css";
import { getLocale, getTranslator } from "@/lib/locale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    title: "DR Car Rental & Sales",
    description: t(
      "Rent or buy a car in the Dominican Republic with vehicle delivery, WhatsApp booking, and flexible rental options.",
      "Alquila o compra un vehículo en República Dominicana con entrega, reservas por WhatsApp y opciones flexibles de alquiler."
    )
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
