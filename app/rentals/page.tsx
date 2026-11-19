import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getVehicles } from "@/lib/inventory";

export const metadata = {
  title: "Rental Cars | DR Car Rental & Sales"
};

export default async function RentalsPage() {
  const rentals = (await getVehicles()).filter((vehicle) => vehicle.type === "rental");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Rental cars"
        title="Book a rental car in Dominican Republic"
        description="Browse cars and SUVs available for daily, weekly, airport, hotel, and local pickup requests."
      />
      <VehicleGrid vehicles={rentals} />
    </section>
  );
}
