import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, MapPin, Users } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { formatMileage, formatUsd } from "@/lib/format";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const price =
    vehicle.type === "rental" && vehicle.pricePerDay
      ? `${formatUsd(vehicle.pricePerDay)} / day`
      : vehicle.salePrice
        ? formatUsd(vehicle.salePrice)
        : "Request price";

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image src={vehicle.imageUrl} alt={vehicle.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <div className="absolute left-3 top-3 rounded-md bg-white px-3 py-1 text-xs font-semibold text-ink shadow">
          {vehicle.available ? "Available" : "Unavailable"}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-ink">{vehicle.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {vehicle.year} {vehicle.brand} {vehicle.model}
            </p>
          </div>
          <p className="shrink-0 rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-palm">
            {price}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <Users size={16} aria-hidden="true" /> {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-2">
            <Fuel size={16} aria-hidden="true" /> {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-2">
            <Gauge size={16} aria-hidden="true" /> {formatMileage(vehicle.mileage)} km
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} aria-hidden="true" /> {vehicle.location}
          </span>
        </div>
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="focus-ring mt-5 inline-flex w-full items-center justify-center rounded-md border border-palm px-4 py-3 text-sm font-semibold text-palm transition hover:bg-palm hover:text-white"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
