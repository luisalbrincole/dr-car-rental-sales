import { CheckCircle2, ClipboardCheck, MapPin, MessageCircle, Search, ShieldCheck, Ship, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getVehicles } from "@/lib/inventory";

export default async function HomePage() {
  const fleet = await getVehicles();
  const rentals = fleet.filter((vehicle) => vehicle.type === "rental").slice(0, 3);
  const sales = fleet.filter((vehicle) => vehicle.type === "sale").slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-palm">
              Dominican Republic rentals and vehicle sales
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Rent or Buy a Car in Dominican Republic
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Choose reliable rental cars for airport pickups, hotel stays, and local trips, or
              browse inspected vehicles for sale across Santo Domingo, Punta Cana, Santiago, and
              nearby cities.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/rentals">View Rentals</ButtonLink>
              <ButtonLink href="/sales" variant="secondary">
                View Cars for Sale
              </ButtonLink>
              <ButtonLink href="https://wa.me/18095551234" variant="ghost">
                Contact on WhatsApp
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center shadow-soft">
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Airport delivery", "Bilingual service", "Rental + sales"].map((item) => (
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
          eyebrow="Rentals"
          title="Featured rental cars"
          description="Short-term and weekly rentals for tourists, business travelers, and residents."
        />
        <VehicleGrid vehicles={rentals} />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sales"
            title="Featured cars for sale"
            description="Ready-to-view vehicles with clear pricing and local support for paperwork."
          />
          <VehicleGrid vehicles={sales} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Import services"
              title="Import Your Car to Dominican Republic"
              description="Get guidance for importing a vehicle from the United States to the Dominican Republic, from search and purchase support to shipping, aduanas, and registration steps."
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/import-services">View import services</ButtonLink>
              <ButtonLink
                href="https://wa.me/18095551234?text=Hello%2C%20I%20want%20a%20car%20import%20consultation"
                variant="ghost"
              >
                WhatsApp consultation
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Vehicle search",
                description: "Find options in the United States that match your budget and needs."
              },
              {
                icon: Ship,
                title: "Shipping support",
                description: "Coordinate transport from purchase point to Dominican Republic arrival."
              },
              {
                icon: ClipboardCheck,
                title: "Aduanas guidance",
                description: "Understand customs, registration, and plate process requirements."
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
        <SectionHeader title="Why choose us" description="Built around trust, speed, and local Dominican Republic expertise." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Inspected vehicles",
              description: "Clean, maintained inventory with details that are easy to verify."
            },
            {
              icon: MapPin,
              title: "Local delivery",
              description: "Coordinate pickup in Santo Domingo, Punta Cana, airports, and hotels."
            },
            {
              icon: Sparkles,
              title: "Bilingual-ready",
              description: "Structured for English and Spanish content as the business grows."
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
            <h2 className="text-2xl font-bold">Ready to reserve or ask about a vehicle?</h2>
            <p className="mt-2 text-emerald-50">Send a booking request or message us directly on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/18095551234"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-palm transition hover:bg-emerald-50"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
