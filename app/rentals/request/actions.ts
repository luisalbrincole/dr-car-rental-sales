"use server";

import { redirect } from "next/navigation";
import { requireUser, rentalToday } from "@/lib/access";
import { scheduleTestEmail } from "@/lib/email";

export async function requestRental(form: FormData) {
  const id = String(form.get("vehicle") ?? "");
  const path = "/rentals/request?" + new URLSearchParams({ vehicle: id });
  const { client } = await requireUser(path);
  const pickup = String(form.get("pickup") ?? "");
  const returnDate = String(form.get("returnDate") ?? "");
  const date = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.test(pickup) || !date.test(returnDate) || pickup < rentalToday() || returnDate <= pickup) {
    redirect(path + "&error=dates");
  }
  const { data, error } = await client.from("rental_requests")
    .insert({ vehicle_id: id, pickup, return_date: returnDate }).select("id").single();
  if (error?.code === "23505") redirect("/account");
  if (error || !data) redirect(path + "&error=save");
  scheduleTestEmail("pending:" + data.id, async (origin) => {
    const { data: listing } = await client.from("fleet").select("details").eq("id", id).maybeSingle();
    const title = listing?.details?.title ?? "your selected vehicle";
    return {
      subject: "Rental request received — pending review",
      text: `We received your request for ${title} from ${pickup} to ${returnDate}. Your request is pending staff review.\n\nCheck your request: ${new URL("/account", origin)}`
    };
  });
  redirect("/account?requested=1");
}
