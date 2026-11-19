import { getTranslator } from "@/lib/locale";
import Link from "next/link";
import { findVehicle } from "@/lib/inventory";
import { requireUser, rentalToday } from "@/lib/access";
import { formatUsd } from "@/lib/format";
import { requestRental } from "./actions";

export default async function RentalRequest({ searchParams }: {
  searchParams: Promise<{ vehicle?: string; error?: string }>;
}) {
  const t = await getTranslator();
  const { vehicle: id = "", error } = await searchParams;
  const vehicle = await findVehicle(id);
  if (!vehicle || vehicle.type !== "rental" || !vehicle.available) return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-2xl font-bold">{t("Vehicle unavailable", "Vehículo no disponible")}</h1>
      <Link href="/rentals" className="mt-4 inline-block font-semibold text-palm underline">{t("Browse rentals", "Explorar alquileres")}</Link>
    </section>
  );
  const { user } = await requireUser("/rentals/request?" + new URLSearchParams({ vehicle: id }));
  const input = "focus-ring rounded-md border border-slate-300 px-3 py-2";

  return <section className="mx-auto max-w-xl px-5 py-14">
    <h1 className="text-3xl font-bold text-ink">{t("Request", "Solicitar")}{" "}{vehicle.title}</h1>
    <p className="mt-2 text-slate-600">{vehicle.location}{vehicle.pricePerDay && " · " + formatUsd(vehicle.pricePerDay) + t(" / day", " / día")}</p>
    <p className="my-4 text-slate-600">{t("The rental team will review your dates. You can check their decision in My rentals.", "El equipo de alquiler revisará tus fechas. Puedes consultar la respuesta en Mis alquileres.")}</p>
    {error && <p role="alert" className="my-4 text-red-700">{error === "dates" ? t("Choose a pickup date today or later and a return date after pickup.", "Elige una fecha de recogida a partir de hoy y una fecha de devolución posterior.") : t("The request could not be sent. Check that the vehicle is still available and try again.", "No se pudo enviar la solicitud. Comprueba que el vehículo siga disponible e inténtalo de nuevo.")}</p>}
    <form action={requestRental} className="grid gap-4 rounded-lg border bg-white p-5">
      <input type="hidden" name="vehicle" value={id} />
      <p className="text-sm text-slate-600">{t("Signed in as", "Sesión iniciada como")}{" "}{user.email}</p>
      <label className="grid gap-1">{t("Pickup date", "Fecha de recogida")}<input className={input} type="date" name="pickup" min={rentalToday()} required /></label>
      <label className="grid gap-1">{t("Return date", "Fecha de devolución")}<input className={input} type="date" name="returnDate" min={rentalToday()} required /></label>
      <button className="focus-ring rounded-md bg-palm px-4 py-3 font-semibold text-white">{t("Send rental request", "Enviar solicitud de alquiler")}</button>
    </form>
  </section>;
}
