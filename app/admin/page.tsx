import { getTranslator } from "@/lib/locale";
import { requestStatusLabel } from "@/lib/labels";
import Link from "next/link";
import { staffSession } from "@/lib/access";
import { formatUsd } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { signOut } from "@/app/sign-in/actions";
import { StaffAccess } from "./StaffAccess";
import { VehicleEditor } from "./VehicleEditor";
import { reviewRequest } from "./actions";
import { CancelRentalForm } from "./CancelRentalForm";

export default async function Admin({ searchParams }: {
  searchParams: Promise<{ edit?: string; new?: string; saved?: string; error?: string; review?: string; staff?: string }>;
}) {
  const t = await getTranslator();
  const messages: Record<string, string> = {
    fields: t("Check the vehicle details and enter a valid price.", "Revisa los datos del vehículo e introduce un precio válido."),
    photos: t("Add 1 to 8 photos and keep the new files under 3 MB total.", "Añade entre 1 y 8 fotos. Los archivos nuevos deben sumar menos de 3 MB."),
    conflict: t("This vehicle changed. Review the latest details and try again.", "Este vehículo se modificó. Revisa los datos más recientes e inténtalo de nuevo."),
    save: t("The vehicle could not be saved. Please try again.", "No se pudo guardar el vehículo. Inténtalo de nuevo.")
  };
  const session = await staffSession();
  if (!session) return <section className="mx-auto max-w-4xl px-5 py-16">
    <h1 className="text-3xl font-bold">{t("Staff access required", "Acceso reservado al personal")}</h1>
    <p className="my-4 text-slate-600">{t("Your account does not have permission to manage inventory.", "Tu cuenta no tiene permiso para administrar el inventario.")}</p>
    <form action={signOut}><button className="font-semibold text-palm underline">{t("Sign out", "Cerrar sesión")}</button></form>
  </section>;

  const { edit, new: add, saved, error, review, staff } = await searchParams;
  const [fleet, requests, access] = await Promise.all([
    session.client.from("fleet").select("id, details, version").order("created_at").order("id"),
    session.client.from("rental_requests").select("id, pickup, return_date, status, vehicle_id, contact_email").order("created_at", { ascending: false }),
    session.client.from("staff_accounts").select("role").eq("user_id", session.user.id).single()
  ]);
  if (fleet.error || requests.error || access.error) throw new Error("The staff dashboard could not be loaded.");

  const people = access.data.role === "owner" ? await session.client.rpc("list_fleet_staff") : null;
  if (people?.error) throw new Error("Staff accounts could not be loaded.");

  const listing = fleet.data.find(({ id }) => id === edit);
  const titles = new Map(fleet.data.map(({ id, details }) => [id, (details as Vehicle).title]));

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-ink">{t("Manage inventory", "Administrar inventario")}</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin?new=1" className="rounded-md bg-palm px-4 py-2 font-semibold text-white">{t("Add vehicle", "Añadir vehículo")}</Link>
          <form action={signOut}><button className="font-semibold text-palm underline">{t("Sign out", "Cerrar sesión")}</button></form>
        </div>
      </div>
      {saved && <p role="status" className="mt-4 text-palm">{t("Vehicle saved.", "Vehículo guardado.")}</p>}
      {error && Object.hasOwn(messages, error) && <p role="alert" className="mt-4 text-red-700">{messages[error]}</p>}
      {edit && !listing && <p role="status" className="mt-4">{t("This vehicle is unavailable.", "Este vehículo no está disponible.")}</p>}
      {(add || listing) && (
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{listing ? t("Edit vehicle", "Editar vehículo") : t("Add vehicle", "Añadir vehículo")}</h2>
            <Link href="/admin" className="font-semibold text-palm underline">{t("Close editor", "Cerrar editor")}</Link>
          </div>
          <VehicleEditor key={listing?.id ?? "new"} vehicle={listing ? { ...listing.details, id: listing.id } : undefined} version={listing?.version} />
        </section>
      )}
      <ul className="mt-6 divide-y rounded-lg border bg-white">
        {fleet.data.map(({ id, details }) => {
          const vehicle = details as Vehicle;
          const price = vehicle.pricePerDay ?? vehicle.salePrice;
          return <li key={id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <Link href={`/vehicles/${id}`} className="font-semibold text-ink hover:underline">{vehicle.title}</Link>
              <p className="text-sm text-slate-600">{vehicle.type === "rental" ? t("Rental", "Alquiler") : t("Sale", "Venta")} · {vehicle.location} · {vehicle.available ? t("Available", "Disponible") : t("Unavailable", "No disponible")}</p>
            </div>
            <div className="flex items-center gap-4">
              {price !== null && <span className="text-sm">{formatUsd(price)}{vehicle.type === "rental" && t(" / day", " / día")}</span>}
              <Link href={`/admin?edit=${id}`} className="font-semibold text-palm underline" aria-label={t("Edit", "Editar") + " " + vehicle.title}>{t("Edit", "Editar")}</Link>
            </div>
          </li>;
        })}
      </ul>

      {people?.data && <StaffAccess people={people.data} status={staff} />}

      <section id="rental-requests" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">{t("Rental requests", "Solicitudes de alquiler")}</h2>
        {review === "saved" && <p role="status" className="mt-2 text-palm">{t("Request updated.", "Solicitud actualizada.")}</p>}
        {review === "canceled" && <p role="status" className="mt-2 text-palm">{t("Rental canceled. Its dates are no longer reserved.", "Alquiler cancelado. Las fechas ya no están reservadas.")}</p>}
        {review === "cancel-error" && <p role="alert" className="mt-2 text-red-700">{t("The rental could not be canceled. Refresh and check its current status.", "No se pudo cancelar el alquiler. Actualiza la página y revisa su estado.")}</p>}
        {review === "overlap" && <p role="alert" className="mt-2 text-red-700">{t("This vehicle already has an approved rental for overlapping dates.", "Este vehículo ya tiene un alquiler aprobado que coincide con esas fechas.")}</p>}
        {review === "error" && <p role="alert" className="mt-2 text-red-700">{t("The request could not be updated. Check its status and pickup date.", "No se pudo actualizar la solicitud. Revisa su estado y la fecha de recogida.")}</p>}
        {requests.data.length === 0 && <p className="mt-3 text-slate-600">{t("No rental requests yet.", "Todavía no hay solicitudes de alquiler.")}</p>}
        {requests.data.length > 0 && <ul className="mt-3 divide-y rounded-lg border bg-white">
          {requests.data.map((request) => (
            <li key={request.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold">{titles.get(request.vehicle_id)}</p>
                <p className="text-sm text-slate-600">{request.pickup}{" "}{t("to", "al")}{" "}{request.return_date} · {requestStatusLabel(request.status, t)}</p>
                <a href={`mailto:${request.contact_email}`} className="text-sm text-palm underline">{request.contact_email}</a>
              </div>
              {request.status === "pending" && <div className="flex gap-3">
                <form action={reviewRequest.bind(null, "approved")}>
                  <input type="hidden" name="id" value={request.id} />
                  <button type="submit" className="rounded-md bg-palm px-3 py-2 font-semibold text-white">{t("Approve", "Aprobar")}</button>
                </form>
                <form action={reviewRequest.bind(null, "declined")}>
                  <input type="hidden" name="id" value={request.id} />
                  <button type="submit" className="rounded-md border px-3 py-2 font-semibold">{t("Decline", "Rechazar")}</button>
                </form>
              </div>}
              {request.status === "approved" && <CancelRentalForm
                id={request.id}
                label={t("Cancel rental", "Cancelar alquiler")}
                confirmation={t(
                  `Cancel ${titles.get(request.vehicle_id) ?? "this rental"} for ${request.pickup} to ${request.return_date}?`,
                  `¿Cancelar el alquiler de ${titles.get(request.vehicle_id) ?? "este vehículo"} del ${request.pickup} al ${request.return_date}?`
                )}
              />}
            </li>
          ))}
        </ul>}
      </section>
    </section>
  );
}
