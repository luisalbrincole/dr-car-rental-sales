import { grantStaff, revokeStaff } from "./staffActions";

type StaffAccount = { user_id: string; email: string; role: "owner" | "staff" };

export function StaffAccess({ people, status }: { people: StaffAccount[]; status?: string }) {
  return <section id="staff-access" className="mt-10 scroll-mt-24">
    <h2 className="text-xl font-semibold">Staff access</h2>
    <p className="mt-2 text-sm text-slate-600">Ask your staff member to sign in with Google once, then add their Google email here.</p>
    {status === "saved" && <p role="status" className="mt-2 text-palm">Staff access updated.</p>}
    {status === "missing" && <p role="alert" className="mt-2 text-red-700">No verified Google account was found for that email. Ask them to sign in first.</p>}
    {status === "error" && <p role="alert" className="mt-2 text-red-700">Staff access could not be updated.</p>}
    <form action={grantStaff} className="my-4 flex flex-wrap items-end gap-3">
      <label className="grid grow gap-1 text-sm font-semibold">Google email
        <input type="email" name="email" autoComplete="off" maxLength={254} required className="focus-ring rounded-md border px-3 py-2 font-normal" />
      </label>
      <button className="rounded-md bg-palm px-4 py-2 font-semibold text-white">Grant staff access</button>
    </form>
    <ul className="divide-y rounded-lg border bg-white">
      {people.map((person) => <li key={person.user_id} className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="font-medium">{person.email}</p>
          <p className="text-sm text-slate-600">{person.role === "owner" ? "Main administrator" : "Staff"}</p>
        </div>
        {person.role === "staff" && <form action={revokeStaff}>
          <input type="hidden" name="id" value={person.user_id} />
          <button className="font-semibold text-red-700 underline" aria-label={`Revoke staff access for ${person.email}`}>Revoke access</button>
        </form>}
      </li>)}
    </ul>
  </section>;
}
