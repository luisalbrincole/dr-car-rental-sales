import type { Vehicle } from "@/lib/types";
import { VehicleCard } from "@/components/VehicleCard";

type VehicleGridProps = {
  vehicles: Vehicle[];
};

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
