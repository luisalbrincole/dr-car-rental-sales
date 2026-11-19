import { getTranslator } from "@/lib/locale";
import { SectionHeader } from "@/components/SectionHeader";
import { VehicleGrid } from "@/components/VehicleGrid";
import { getVehicles } from "@/lib/inventory";

export async function generateMetadata() {
  const t = await getTranslator();
  return { title: t("Rental Cars", "Vehículos de alquiler") + " | DR Car Rental & Sales" };
}

export default async function RentalsPage() {
  const t = await getTranslator();
  const rentals = (await getVehicles()).filter((vehicle) => vehicle.type === "rental");

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow={t("Rental cars", "Vehículos de alquiler")}
        title={t("Book a rental car in Dominican Republic", "Reserva un vehículo de alquiler en República Dominicana")}
        description={t("Browse cars and SUVs available for daily, weekly, airport, hotel, and local pickup requests.", "Explora autos y SUV para alquiler por días o semanas, con recogida en aeropuertos, hoteles u otros puntos.")}
      />
      <VehicleGrid vehicles={rentals} />
    </section>
  );
}
