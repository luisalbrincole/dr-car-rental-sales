import Link from "next/link";
import { staffSession } from "@/lib/access";
import { formatUsd } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { signOut } from "@/app/sign-in/actions";
import { StaffAccess } from "./StaffAccess";
import { VehicleEditor } from "./VehicleEditor";
import { reviewRequest } from "./actions";

const messages: Record<string, string> = {
  fields: "Check the vehicle details and enter a valid price.",
  photos: "Add 1 to 8 photos and keep the new files under 3 MB total.",
  conflict: "This vehicle changed. Review the latest details and try again.",
  save: "The vehicle could not be saved. Please try again."
};

export default async function Admin({ searchParams }: {
  searchParams: Promise<{ edit?: string; new?: string; saved?: string; error?: string; review?: string; staff?: string }>;
}) {
  const session = await staffSession();
  if (!session) return <section className="mx-auto max-w-4xl px-5 py-16">
    <h1 className="text-3xl font-bold">Staff access required</h1>
    <p className="my-4 text-slate-600">Your account does not have permission to manage inventory.</p>
    <form action={signOut}><button className="font-semibold text-palm underline">Sign out</button></form>
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
        <h1 className="text-3xl font-bold text-ink">Manage inventory</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin?new=1" className="rounded-md bg-palm px-4 py-2 font-semibold text-white">Add vehicle</Link>
          <form action={signOut}><button className="font-semibold text-palm underline">Sign out</button></form>
        </div>
      </div>
      {saved && <p role="status" className="mt-4 text-palm">Vehicle saved.</p>}
      {error && Object.hasOwn(messages, error) && <p role="alert" className="mt-4 text-red-700">{messages[error]}</p>}
      {edit && !listing && <p role="status" className="mt-4">This vehicle is unavailable.</p>}
      {(add || listing) && (
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{listing ? "Edit vehicle" : "Add vehicle"}</h2>
            <Link href="/admin" className="font-semibold text-palm underline">Close editor</Link>
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
              <p className="text-sm capitalize text-slate-600">{vehicle.type} · {vehicle.location} · {vehicle.available ? "Available" : "Unavailable"}</p>
            </div>
            <div className="flex items-center gap-4">
              {price !== null && <span className="text-sm">{formatUsd(price)}{vehicle.type === "rental" && " / day"}</span>}
              <Link href={`/admin?edit=${id}`} className="font-semibold text-palm underline" aria-label={`Edit ${vehicle.title}`}>Edit</Link>
            </div>
          </li>;
        })}
      </ul>

      {people?.data && <StaffAccess people={people.data} status={staff} />}

      <section id="rental-requests" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Rental requests</h2>
        {review === "saved" && <p role="status" className="mt-2 text-palm">Request updated.</p>}
        {review === "overlap" && <p role="alert" className="mt-2 text-red-700">This vehicle already has an approved rental for overlapping dates.</p>}
        {review === "error" && <p role="alert" className="mt-2 text-red-700">The request could not be updated. Check its status and pickup date.</p>}
        {requests.data.length === 0 && <p className="mt-3 text-slate-600">No rental requests yet.</p>}
        {requests.data.length > 0 && <ul className="mt-3 divide-y rounded-lg border bg-white">
          {requests.data.map((request) => (
            <li key={request.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold">{titles.get(request.vehicle_id)}</p>
                <p className="text-sm text-slate-600">{request.pickup} to {request.return_date} · <span className="capitalize">{request.status}</span></p>
                <a href={`mailto:${request.contact_email}`} className="text-sm text-palm underline">{request.contact_email}</a>
              </div>
              {request.status === "pending" && <form action={reviewRequest} className="flex gap-3">
                <input type="hidden" name="id" value={request.id} />
                <button name="status" value="approved" className="rounded-md bg-palm px-3 py-2 font-semibold text-white">Approve</button>
                <button name="status" value="declined" className="rounded-md border px-3 py-2 font-semibold">Decline</button>
              </form>}
            </li>
          ))}
        </ul>}
      </section>
    </section>
  );
}
