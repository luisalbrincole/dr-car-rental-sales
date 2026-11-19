import { getTranslator } from "@/lib/locale";
import type { Vehicle } from "@/lib/types";
import { saveVehicle } from "./actions";

const input = "focus-ring w-full rounded-md border border-slate-300 bg-white px-3 py-2";

export async function VehicleEditor({ vehicle, version }: { vehicle?: Vehicle; version?: string }) {
  const t = await getTranslator();
  return (
    <form action={saveVehicle} className="mt-4 grid gap-4 rounded-lg border bg-white p-5 sm:grid-cols-2">
      <input type="hidden" name="id" value={vehicle?.id ?? ""} />
      <input type="hidden" name="version" value={version ?? ""} />
      <label className="grid gap-1">{t("Make", "Marca")}<input className={input} name="brand" defaultValue={vehicle?.brand} maxLength={60} required /></label>
      <label className="grid gap-1">{t("Model", "Modelo")}<input className={input} name="model" defaultValue={vehicle?.model} maxLength={60} required /></label>
      <label className="grid gap-1">{t("Year", "Año")}<input className={input} name="year" type="number" defaultValue={vehicle?.year} min={1900} required /></label>
      <label className="grid gap-1">{t("Location", "Ubicación")}<input className={input} name="location" defaultValue={vehicle?.location} maxLength={120} required /></label>
      <label className="grid gap-1">{t("Listing type", "Tipo de anuncio")}
        <select className={input} name="type" defaultValue={vehicle?.type ?? "rental"}>
          <option value="rental">{t("Rental", "Alquiler")}</option><option value="sale">{t("Sale", "Venta")}</option>
        </select>
      </label>
      <label className="grid gap-1">{t("Price in USD (per day for rentals)", "Precio en USD (por día para alquileres)")}
        <input className={input} name="price" type="number" step="0.01" min="0.01" defaultValue={vehicle?.pricePerDay ?? vehicle?.salePrice ?? undefined} required />
      </label>
      <label className="grid gap-1">{t("Transmission", "Transmisión")}
        <select className={input} name="transmission" defaultValue={vehicle?.transmission}>
          <option value="Automatic">{t("Automatic", "Automática")}</option><option value="Manual">{t("Manual", "Manual")}</option>
        </select>
      </label>
      <label className="grid gap-1">{t("Fuel type", "Tipo de combustible")}
        <select className={input} name="fuelType" defaultValue={vehicle?.fuelType}>
          <option value="Gasoline">{t("Gasoline", "Gasolina")}</option><option value="Diesel">{t("Diesel", "Diésel")}</option><option value="Hybrid">{t("Hybrid", "Híbrido")}</option><option value="Electric">{t("Electric", "Eléctrico")}</option>
        </select>
      </label>
      <label className="grid gap-1">{t("Seats", "Asientos")}<input className={input} name="seats" type="number" min={1} max={100} defaultValue={vehicle?.seats ?? 5} required /></label>
      <label className="grid gap-1">{t("Mileage", "Kilometraje")}<input className={input} name="mileage" type="number" min={0} defaultValue={vehicle?.mileage ?? 0} required /></label>
      <label className="grid gap-1 sm:col-span-2">{t("Description", "Descripción")}
        <textarea className={input} name="description" rows={4} maxLength={3000} defaultValue={vehicle?.description} required />
      </label>
      <label className="grid gap-1 sm:col-span-2">{t("Vehicle photos", "Fotos del vehículo")}
        <input className={input} type="file" name="photos" multiple accept="image/jpeg,image/png,image/webp" required={!vehicle} />
        <span className="text-sm text-slate-600">{t("JPEG, PNG, or WebP. Up to 8 photos per vehicle and 3 MB per upload. The first photo is the cover.", "JPEG, PNG o WebP. Hasta 8 fotos por vehículo y 3 MB por carga. La primera foto es la portada.")}</span>
      </label>
      {vehicle && <label className="flex items-center gap-2"><input name="replacePhotos" type="checkbox" />{" "}{t("Replace existing photos", "Reemplazar las fotos actuales")}</label>}
      <label className="flex items-center gap-2"><input name="available" type="checkbox" defaultChecked={vehicle?.available ?? true} />{" "}{t("Available", "Disponible")}</label>
      <div className="sm:col-span-2"><button className="focus-ring rounded-md bg-palm px-5 py-2 font-semibold text-white">{t("Save vehicle", "Guardar vehículo")}</button></div>
    </form>
  );
}
