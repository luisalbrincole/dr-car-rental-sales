import { getTranslator } from "@/lib/locale";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getVehicles } from "@/lib/inventory";

export async function generateMetadata() {
  const t = await getTranslator();
  return { title: t("Cars for Sale", "Vehículos en venta") + " | DR Car Rental & Sales" };
}

export default async function SalesPage() {
  const t = await getTranslator();
  const sales = (await getVehicles()).filter((vehicle) => vehicle.type === "sale");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={t("Vehicle sales", "Venta de vehículos")}
        title={t("Cars for sale in Dominican Republic", "Vehículos en venta en República Dominicana")}
        description={t("Explore available cars and pickups with mileage, location, price, and direct inquiry options.", "Explora autos y camionetas disponibles con kilometraje, ubicación, precio y opciones de contacto directo.")}
      />
      <VehicleGrid vehicles={sales} />
    </section>
  );
}
