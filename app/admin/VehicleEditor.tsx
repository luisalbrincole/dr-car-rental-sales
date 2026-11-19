import type { Vehicle } from "@/lib/types";
import { saveVehicle } from "./actions";

const input = "focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2";

export function VehicleEditor({ vehicle, version }: { vehicle?: Vehicle; version?: string }) {
  return (
    <form action={saveVehicle} className="mt-4 grid gap-4 rounded-lg border bg-white p-5 sm:grid-cols-2">
      <input type="hidden" name="id" value={vehicle?.id ?? ""} />
      <input type="hidden" name="version" value={version ?? ""} />
      <label className="grid gap-1">Make<input className={input} name="brand" defaultValue={vehicle?.brand} maxLength={60} required /></label>
      <label className="grid gap-1">Model<input className={input} name="model" defaultValue={vehicle?.model} maxLength={60} required /></label>
      <label className="grid gap-1">Year<input className={input} name="year" type="number" defaultValue={vehicle?.year} min={1900} required /></label>
      <label className="grid gap-1">Location<input className={input} name="location" defaultValue={vehicle?.location} maxLength={120} required /></label>
      <label className="grid gap-1">Listing type
        <select className={input} name="type" defaultValue={vehicle?.type ?? "rental"}>
          <option value="rental">Rental</option><option value="sale">Sale</option>
        </select>
      </label>
      <label className="grid gap-1">Price in USD (per day for rentals)
        <input className={input} name="price" type="number" step="0.01" min="0.01" defaultValue={vehicle?.pricePerDay ?? vehicle?.salePrice ?? undefined} required />
      </label>
      <label className="grid gap-1">Transmission
        <select className={input} name="transmission" defaultValue={vehicle?.transmission}>
          <option>Automatic</option><option>Manual</option>
        </select>
      </label>
      <label className="grid gap-1">Fuel type
        <select className={input} name="fuelType" defaultValue={vehicle?.fuelType}>
          <option>Gasoline</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
        </select>
      </label>
      <label className="grid gap-1">Seats<input className={input} name="seats" type="number" min={1} max={100} defaultValue={vehicle?.seats ?? 5} required /></label>
      <label className="grid gap-1">Mileage<input className={input} name="mileage" type="number" min={0} defaultValue={vehicle?.mileage ?? 0} required /></label>
      <label className="grid gap-1 sm:col-span-2">Description
        <textarea className={input} name="description" rows={4} maxLength={3000} defaultValue={vehicle?.description} required />
      </label>
      <label className="grid gap-1 sm:col-span-2">Vehicle photos
        <input className={input} type="file" name="photos" multiple accept="image/jpeg,image/png,image/webp" required={!vehicle} />
        <span className="text-sm text-slate-600">JPEG, PNG, or WebP. Up to 8 photos per vehicle and 3 MB per upload. The first photo is the cover.</span>
      </label>
      {vehicle && <label className="flex items-center gap-2"><input name="replacePhotos" type="checkbox" /> Replace existing photos</label>}
      <label className="flex items-center gap-2"><input name="available" type="checkbox" defaultChecked={vehicle?.available ?? true} /> Available</label>
      <div className="sm:col-span-2"><button className="focus-ring rounded-md bg-palm px-5 py-2 font-semibold text-white">Save vehicle</button></div>
    </form>
  );
}
