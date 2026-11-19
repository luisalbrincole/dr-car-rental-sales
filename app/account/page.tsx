import Link from "next/link";
import { requireUser } from "@/lib/access";
import { getVehicles } from "@/lib/inventory";
import { signOut } from "@/app/sign-in/actions";

export default async function Account({ searchParams }: { searchParams: Promise<{ requested?: string }> }) {
  const { client, user } = await requireUser("/account");
  const [{ requested }, { data, error }, fleet] = await Promise.all([
    searchParams,
    client.from("rental_requests").select("id, vehicle_id, pickup, return_date, status")
      .eq("customer_id", user.id).order("created_at", { ascending: false }),
    getVehicles()
  ]);
  if (error) throw new Error("Rental requests could not be loaded.");
  const titles = new Map(fleet.map((vehicle) => [vehicle.id, vehicle.title]));

  return <section className="mx-auto max-w-3xl px-5 py-14">
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-ink">My rentals</h1>
      <form action={signOut}><button className="font-semibold text-palm underline">Sign out</button></form>
    </div>
    <p className="mt-2 text-slate-600">{user.email}</p>
    {requested && <p role="status" className="mt-4 rounded-md bg-emerald-50 p-4 text-palm">Request sent. Your rental is pending review.</p>}
    {data.length ? <ul className="my-5 divide-y rounded-lg border bg-white">
      {data.map((request) => <li key={request.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div>
          <Link href={`/vehicles/${request.vehicle_id}`} className="font-semibold text-palm hover:underline">{titles.get(request.vehicle_id) ?? "Vehicle"}</Link>
          <p className="text-sm text-slate-600">{request.pickup} to {request.return_date}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 text-sm capitalize">{request.status}</span>
      </li>)}
    </ul> : <p className="my-5 text-slate-600">You haven’t requested a rental yet.</p>}
    <Link href="/rentals" className="font-semibold text-palm underline">Browse rentals</Link>
  </section>;
}
