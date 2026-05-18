import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Fuel, Gauge, MapPin, Settings, Users } from "lucide-react";
import { vehicles, getVehicleById } from "@/data/vehicles";
import { formatMileage, formatUsd } from "@/lib/format";

type VehicleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  return {
    title: vehicle ? `${vehicle.title} | DR Car Rental & Sales` : "Vehicle | DR Car Rental & Sales"
  };
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { id } = await params;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const price =
    vehicle.type === "rental" && vehicle.pricePerDay
      ? `${formatUsd(vehicle.pricePerDay)} per day`
      : vehicle.salePrice
        ? formatUsd(vehicle.salePrice)
        : "Request price";

  const specs = [
    { icon: CalendarDays, label: "Year", value: vehicle.year },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Users, label: "Seats", value: vehicle.seats },
    { icon: Fuel, label: "Fuel", value: vehicle.fuelType },
    { icon: Gauge, label: "Mileage", value: `${formatMileage(vehicle.mileage)} km` },
    { icon: MapPin, label: "Location", value: vehicle.location }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link className="text-sm font-semibold text-palm hover:text-emerald-800" href={vehicle.type === "rental" ? "/rentals" : "/sales"}>
        Back to {vehicle.type === "rental" ? "rentals" : "cars for sale"}
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 shadow-soft">
          <Image src={vehicle.imageUrl} alt={vehicle.title} fill className="object-cover" priority sizes="(min-width: 1024px) 58vw, 100vw" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-palm">
              {vehicle.type === "rental" ? "Rental" : "For sale"}
            </span>
            <span className="rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              {vehicle.available ? "Available" : "Reserved"}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{vehicle.title}</h1>
          <p className="mt-3 text-lg text-slate-600">{vehicle.description}</p>
          <p className="mt-6 text-3xl font-bold text-palm">{price}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="rounded-lg border border-slate-200 bg-white p-4">
                <spec.icon className="text-coral" size={20} aria-hidden="true" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{spec.label}</p>
                <p className="mt-1 font-semibold text-ink">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/contact?vehicle=${vehicle.id}`}
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md bg-palm px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Request this vehicle
            </Link>
            <a
              href={`https://wa.me/18095551234?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(vehicle.title)}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-palm hover:text-palm"
            >
              WhatsApp inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
