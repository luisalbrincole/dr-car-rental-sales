import { getTranslator } from "@/lib/locale";
import { grantStaff, revokeStaff } from "./staffActions";

type StaffAccount = { user_id: string; email: string; role: "owner" | "staff" };

export async function StaffAccess({ people, status }: { people: StaffAccount[]; status?: string }) {
  const t = await getTranslator();
  return <section id="staff-access" className="mt-10 scroll-mt-24">
    <h2 className="text-xl font-semibold">{t("Staff access", "Acceso del personal")}</h2>
    <p className="mt-2 text-sm text-slate-600">{t("Ask your staff member to sign in with Google once, then add their Google email here.", "Pide a la persona que inicie sesión con Google una vez y luego añade aquí su correo de Google.")}</p>
    {status === "saved" && <p role="status" className="mt-2 text-palm">{t("Staff access updated.", "Acceso del personal actualizado.")}</p>}
    {status === "missing" && <p role="alert" className="mt-2 text-red-700">{t("No verified Google account was found for that email. Ask them to sign in first.", "No se encontró una cuenta de Google verificada para ese correo. Pide a la persona que inicie sesión primero.")}</p>}
    {status === "error" && <p role="alert" className="mt-2 text-red-700">{t("Staff access could not be updated.", "No se pudo actualizar el acceso del personal.")}</p>}
    <form action={grantStaff} className="my-4 flex flex-wrap items-end gap-3">
      <label className="grid grow gap-1 text-sm font-semibold">{t("Google email", "Correo de Google")}
        <input type="email" name="email" autoComplete="off" maxLength={254} required className="focus-ring rounded-md border px-3 py-2 font-normal" />
      </label>
      <button className="rounded-md bg-palm px-4 py-2 font-semibold text-white">{t("Grant staff access", "Dar acceso al personal")}</button>
    </form>
    <ul className="divide-y rounded-lg border bg-white">
      {people.map((person) => <li key={person.user_id} className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="font-medium">{person.email}</p>
          <p className="text-sm text-slate-600">{person.role === "owner" ? t("Main administrator", "Administrador principal") : t("Staff", "Personal")}</p>
        </div>
        {person.role === "staff" && <form action={revokeStaff}>
          <input type="hidden" name="id" value={person.user_id} />
          <button className="font-semibold text-red-700 underline" aria-label={t("Revoke staff access for", "Revocar el acceso de") + " " + person.email}>{t("Revoke access", "Revocar acceso")}</button>
        </form>}
      </li>)}
    </ul>
  </section>;
}
