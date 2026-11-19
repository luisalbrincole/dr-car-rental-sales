import { redirect } from "next/navigation";
import { sessionClient, signInPath } from "@/lib/session";

export async function requireUser(next: string) {
  const client = await sessionClient();
  if (!client) redirect(signInPath(next));
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect(signInPath(next));
  return { client, user };
}

export async function staffSession() {
  const session = await requireUser("/admin");
  const { data, error } = await session.client.rpc("is_fleet_staff");
  if (error) throw new Error("Staff access could not be verified.");
  return data === true ? session : null;
}

export function rentalToday() {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Santo_Domingo", year: "numeric", month: "2-digit", day: "2-digit"
  }).format();
}
