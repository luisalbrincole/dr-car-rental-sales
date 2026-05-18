import type { Vehicle } from "@/lib/types";

export const vehicles: Vehicle[] = [
  {
    id: "hyundai-tucson-2023",
    title: "Hyundai Tucson 2023",
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    type: "rental",
    pricePerDay: 68,
    salePrice: null,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    mileage: 18500,
    location: "Santo Domingo",
    description:
      "Comfortable SUV with strong air conditioning, roomy luggage space, and airport delivery available.",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "kia-picanto-2022",
    title: "Kia Picanto 2022",
    brand: "Kia",
    model: "Picanto",
    year: 2022,
    type: "rental",
    pricePerDay: 38,
    salePrice: null,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    mileage: 24100,
    location: "Punta Cana",
    description:
      "Easy city car for visitors who want simple parking, great fuel economy, and quick pickup near hotels.",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "toyota-rav4-2021",
    title: "Toyota RAV4 2021",
    brand: "Toyota",
    model: "RAV4",
    year: 2021,
    type: "rental",
    pricePerDay: 74,
    salePrice: null,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Hybrid",
    mileage: 32600,
    location: "Las Americas Airport",
    description:
      "Reliable hybrid SUV for long drives across the island, from Santo Domingo to Samana or Puerto Plata.",
    available: false,
    imageUrl:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "honda-civic-2020",
    title: "Honda Civic 2020",
    brand: "Honda",
    model: "Civic",
    year: 2020,
    type: "sale",
    pricePerDay: null,
    salePrice: 18900,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    mileage: 51200,
    location: "Santiago",
    description:
      "Clean sedan with service history, smooth drive, and paperwork ready for serious buyers.",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "ford-ranger-2019",
    title: "Ford Ranger 2019",
    brand: "Ford",
    model: "Ranger",
    year: 2019,
    type: "sale",
    pricePerDay: null,
    salePrice: 27500,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Diesel",
    mileage: 68400,
    location: "La Romana",
    description:
      "Durable pickup for business, family, or countryside travel with excellent ground clearance.",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "nissan-frontier-2021",
    title: "Nissan Frontier 2021",
    brand: "Nissan",
    model: "Frontier",
    year: 2021,
    type: "sale",
    pricePerDay: null,
    salePrice: 31900,
    transmission: "Automatic",
    seats: 5,
    fuelType: "Diesel",
    mileage: 44350,
    location: "Santo Domingo Este",
    description:
      "Strong pickup in excellent condition, ideal for construction teams, farms, and weekend trips.",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
  }
];

export function getFeaturedVehicles(type: Vehicle["type"], limit = 3) {
  return vehicles.filter((vehicle) => vehicle.type === type).slice(0, limit);
}

export function getVehicleById(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id);
}
