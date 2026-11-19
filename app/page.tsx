import { getTranslator } from "@/lib/locale";
import { CheckCircle2, ClipboardCheck, MapPin, MessageCircle, Search, ShieldCheck, Ship, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getVehicles } from "@/lib/inventory";

export default async function HomePage() {
  const t = await getTranslator();
  const fleet = await getVehicles();
  const rentals = fleet.filter((vehicle) => vehicle.type === "rental").slice(0, 3);
  const sales = fleet.filter((vehicle) => vehicle.type === "sale").slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-palm">
              {t("Dominican Republic rentals and vehicle sales", "Alquiler y venta de vehículos en República Dominicana")}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t("Rent or Buy a Car in Dominican Republic", "Alquila o compra un vehículo en República Dominicana")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t("Choose reliable rental cars for airport pickups, hotel stays, and local trips, or browse inspected vehicles for sale across Santo Domingo, Punta Cana, Santiago, and nearby cities.", "Alquila un vehículo para recogerlo en el aeropuerto, ir a tu hotel o recorrer la isla. También puedes explorar vehículos inspeccionados en venta en Santo Domingo, Punta Cana, Santiago y ciudades cercanas.")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/rentals">{t("View Rentals", "Ver vehículos de alquiler")}</ButtonLink>
              <ButtonLink href="/sales" variant="secondary">
                {t("View Cars for Sale", "Ver vehículos en venta")}
              </ButtonLink>
              <ButtonLink href="https://wa.me/18492570102" variant="ghost">
                {t("Contact on WhatsApp", "Contáctanos por WhatsApp")}
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="grid gap-3 sm:grid-cols-3">
                {[t("Airport delivery", "Entrega en el aeropuerto"), t("Bilingual service", "Atención bilingüe"), t("Rental + sales", "Alquiler y venta")].map((item) => (
                  <div key={item} className="rounded-md bg-white/15 p-3 backdrop-blur">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("Rentals", "Alquileres")}
          title={t("Featured rental cars", "Vehículos de alquiler destacados")}
          description={t("Short-term and weekly rentals for tourists, business travelers, and residents.", "Alquileres por días o semanas para turistas, viajeros de negocios y residentes.")}
        />
        <VehicleGrid vehicles={rentals} />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("Sales", "Venta")}
            title={t("Featured cars for sale", "Vehículos en venta destacados")}
            description={t("Ready-to-view vehicles with clear pricing and local support for paperwork.", "Vehículos disponibles para ver, con precios claros y apoyo local con los trámites.")}
          />
          <VehicleGrid vehicles={sales} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow={t("Import services", "Servicios de importación")}
              title={t("Import Your Car to Dominican Republic", "Importa tu vehículo a República Dominicana")}
              description={t("Get guidance for importing a vehicle from the United States to the Dominican Republic, from search and purchase support to shipping, aduanas, and registration steps.", "Recibe orientación para importar un vehículo desde Estados Unidos a República Dominicana, desde la búsqueda y la compra hasta el envío, la aduana y el registro.")}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/import-services">{t("View import services", "Ver servicios de importación")}</ButtonLink>
              <ButtonLink
                href={"https://wa.me/18492570102?text=" + encodeURIComponent(t("Hello, I want a car import consultation", "Hola, quisiera consultar sobre la importación de un vehículo"))}
                variant="ghost"
              >
                {t("WhatsApp consultation", "Consulta por WhatsApp")}
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: t("Vehicle search", "Búsqueda de vehículos"),
                description: t("Find options in the United States that match your budget and needs.", "Encuentra opciones en Estados Unidos que se ajusten a tu presupuesto y necesidades.")
              },
              {
                icon: Ship,
                title: t("Shipping support", "Apoyo con el envío"),
                description: t("Coordinate transport from purchase point to Dominican Republic arrival.", "Coordina el transporte desde el lugar de compra hasta la llegada a República Dominicana.")
              },
              {
                icon: ClipboardCheck,
                title: t("Aduanas guidance", "Orientación aduanera"),
                description: t("Understand customs, registration, and plate process requirements.", "Conoce los requisitos de aduana, registro y placa.")
              }
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <item.icon className="text-coral" size={26} aria-hidden="true" />
                <h3 className="mt-4 font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader title={t("Why choose us", "Por qué elegirnos")} description={t("Built around trust, speed, and local Dominican Republic expertise.", "Servicio ágil y confiable con experiencia local en República Dominicana.")} />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: t("Inspected vehicles", "Vehículos inspeccionados"),
              description: t("Clean, maintained inventory with details that are easy to verify.", "Vehículos limpios y bien mantenidos con información fácil de verificar.")
            },
            {
              icon: MapPin,
              title: t("Local delivery", "Entrega local"),
              description: t("Coordinate pickup in Santo Domingo, Punta Cana, airports, and hotels.", "Coordina la recogida en Santo Domingo, Punta Cana, aeropuertos y hoteles.")
            },
            {
              icon: Sparkles,
              title: t("Bilingual service", "Atención bilingüe"),
              description: t("We offer support in English and Spanish.", "Ofrecemos atención en español e inglés.")
            }
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <item.icon className="text-coral" size={28} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-palm">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-12 text-white sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">{t("Ready to reserve or ask about a vehicle?", "¿Quieres reservar o consultar por un vehículo?")}</h2>
            <p className="mt-2 text-emerald-50">{t("Send a booking request or message us directly on WhatsApp.", "Envía una solicitud de alquiler o escríbenos directamente por WhatsApp.")}</p>
          </div>
          <a
            href="https://wa.me/18492570102"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-palm transition hover:bg-emerald-50"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {t("Contact on WhatsApp", "Contáctanos por WhatsApp")}
          </a>
        </div>
      </section>
    </>
  );
}
