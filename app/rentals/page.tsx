import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { vehicles } from "@/data/vehicles";

export const metadata = {
  title: "Rental Cars | DR Car Rental & Sales"
};

export default function RentalsPage() {
  const rentals = vehicles.filter((vehicle) => vehicle.type === "rental");

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
