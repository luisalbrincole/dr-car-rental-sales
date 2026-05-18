import { BarChart3, CalendarCheck, Car, CircleDollarSign, Plus } from "lucide-react";
import { PlaceholderButton } from "@/components/PlaceholderButton";
import { vehicles } from "@/data/vehicles";
import { formatUsd } from "@/lib/format";

export const metadata = {
  title: "Admin Dashboard | DR Car Rental & Sales"
};

export default function AdminPage() {
  const rentalCount = vehicles.filter((vehicle) => vehicle.type === "rental").length;
  const saleCount = vehicles.filter((vehicle) => vehicle.type === "sale").length;
  const availableCount = vehicles.filter((vehicle) => vehicle.available).length;
  const saleValue = vehicles.reduce((total, vehicle) => total + (vehicle.salePrice ?? 0), 0);

  const stats = [
    { label: "Rental vehicles", value: rentalCount, icon: CalendarCheck },
    { label: "Cars for sale", value: saleCount, icon: Car },
    { label: "Available now", value: availableCount, icon: BarChart3 },
    { label: "Sales inventory", value: formatUsd(saleValue), icon: CircleDollarSign }
  ];

  return (
    <section className="min-h-[calc(100vh-160px)] bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-coral">Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Dashboard</h1>
            <p className="mt-2 text-slate-600">A starter layout for inventory, requests, and future Supabase data.</p>
          </div>
          <PlaceholderButton
            message="Add vehicle is a dashboard placeholder. Next step: connect this action to an admin vehicle form and Supabase."
            className="gap-2 bg-palm text-white hover:bg-emerald-800"
          >
            <Plus size={18} aria-hidden="true" />
            Add vehicle
          </PlaceholderButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5">
              <stat.icon className="text-palm" size={24} aria-hidden="true" />
              <p className="mt-4 text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-lg font-bold text-ink">Inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Vehicle</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-5 py-4 font-semibold text-ink">{vehicle.title}</td>
                    <td className="px-5 py-4 capitalize text-slate-600">{vehicle.type}</td>
                    <td className="px-5 py-4 text-slate-600">{vehicle.location}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {vehicle.type === "rental" && vehicle.pricePerDay
                        ? `${formatUsd(vehicle.pricePerDay)} / day`
                        : vehicle.salePrice
                          ? formatUsd(vehicle.salePrice)
                          : "Request price"}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-md px-3 py-1 text-xs font-semibold ${vehicle.available ? "bg-emerald-50 text-palm" : "bg-slate-100 text-slate-500"}`}>
                        {vehicle.available ? "Available" : "Reserved"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
