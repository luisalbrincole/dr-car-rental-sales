import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { connection } from "next/server";
import { vehicles as samples } from "@/data/vehicles";
import type { Vehicle } from "@/lib/types";

export const getVehicles = cache(async (): Promise<Vehicle[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return samples;
  await connection();
  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) }
  });
  const { data, error, status } = await client.from("fleet").select("id, details").order("created_at").order("id");
  if (error) {
    console.error("Inventory query failed", { status, code: error.code });
    throw new Error("Inventory is temporarily unavailable.");
  }
  return data.map(({ id, details }) => ({ ...details, id }));
});

export async function findVehicle(id: string) {
  return (await getVehicles()).find((vehicle) => vehicle.id === id);
}
