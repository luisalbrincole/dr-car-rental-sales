"use client";

import { cancelRental } from "./actions";

export function CancelRentalForm({ id, label, confirmation }: {
  id: string;
  label: string;
  confirmation: string;
}) {
  return (
    <form action={cancelRental} onSubmit={(event) => {
      if (!window.confirm(confirmation)) event.preventDefault();
    }}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-md border border-red-300 px-3 py-2 font-semibold text-red-700 hover:bg-red-50">
        {label}
      </button>
    </form>
  );
}
