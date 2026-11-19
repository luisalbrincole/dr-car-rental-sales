import type { Vehicle } from "@/lib/types";

type Translator = (english: string, spanish: string) => string;

export function fuelLabel(fuel: Vehicle["fuelType"], t: Translator) {
  switch (fuel) {
    case "Gasoline": return t("Gasoline", "Gasolina");
    case "Diesel": return t("Diesel", "Diésel");
    case "Hybrid": return t("Hybrid", "Híbrido");
    case "Electric": return t("Electric", "Eléctrico");
  }
}

export function requestStatusLabel(status: string, t: Translator) {
  switch (status) {
    case "pending": return t("Pending", "Pendiente");
    case "approved": return t("Approved", "Aprobada");
    case "declined": return t("Declined", "Rechazada");
    default: return status;
  }
}
