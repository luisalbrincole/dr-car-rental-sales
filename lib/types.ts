export type VehicleType = "rental" | "sale";

export type Vehicle = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  pricePerDay: number | null;
  salePrice: number | null;
  transmission: "Automatic" | "Manual";
  seats: number;
  fuelType: "Gasoline" | "Diesel" | "Hybrid" | "Electric";
  mileage: number;
  location: string;
  description: string;
  available: boolean;
  imageUrl: string;
};
