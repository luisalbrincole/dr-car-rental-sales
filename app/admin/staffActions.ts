"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/access";

export async function grantStaff(form: FormData) {
  const { client } = await requireUser("/admin");
  const email = String(form.get("email") ?? "").trim();
  if (!email || email.length > 254) redirect("/admin?staff=error#staff-access");
  const { data, error } = await client.rpc("grant_fleet_staff", { staff_email: email });
  const status = error ? "error" : data ? "saved" : "missing";
  redirect("/admin?staff=" + status + "#staff-access");
}

export async function revokeStaff(form: FormData) {
  const { client } = await requireUser("/admin");
  const { data, error } = await client.rpc("revoke_fleet_staff", { staff_id: String(form.get("id") ?? "") });
  redirect("/admin?staff=" + (!error && data ? "saved" : "error") + "#staff-access");
}
