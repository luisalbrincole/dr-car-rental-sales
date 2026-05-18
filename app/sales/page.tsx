import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { vehicles } from "@/data/vehicles";

export const metadata = {
  title: "Cars for Sale | DR Car Rental & Sales"
};

export default function SalesPage() {
  const sales = vehicles.filter((vehicle) => vehicle.type === "sale");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Vehicle sales"
        title="Cars for sale in Dominican Republic"
        description="Explore available cars and pickups with mileage, location, price, and direct inquiry options."
      />
      <VehicleGrid vehicles={sales} />
    </section>
  );
}
