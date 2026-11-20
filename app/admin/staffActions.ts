"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/access";
import { scheduleTestEmail, testEmailEnabled } from "@/lib/email";

export async function grantStaff(form: FormData) {
  const { client } = await requireUser("/admin");
  const email = String(form.get("email") ?? "").trim();
  if (!email || email.length > 254) redirect("/admin?staff=error#staff-access");
  const previous = testEmailEnabled() ? await client.rpc("list_fleet_staff") : null;
  const { data, error } = await client.rpc("grant_fleet_staff", { staff_email: email });
  if (!error && data && Array.isArray(previous?.data) &&
      !previous.data.some((person: { email: string }) => person.email.toLowerCase() === email.toLowerCase())) {
    scheduleTestEmail("staff:" + email.toLowerCase(), (origin) => ({
      subject: "Staff access granted",
      text: `Your Google account now has staff access. Sign in to manage vehicles and rental requests.\n\nOpen the staff dashboard: ${new URL("/admin", origin)}`
    }));
  }
  const status = error ? "error" : data ? "saved" : "missing";
  redirect("/admin?staff=" + status + "#staff-access");
}

export async function revokeStaff(form: FormData) {
  const { client } = await requireUser("/admin");
  const { data, error } = await client.rpc("revoke_fleet_staff", { staff_id: String(form.get("id") ?? "") });
  redirect("/admin?staff=" + (!error && data ? "saved" : "error") + "#staff-access");
}
