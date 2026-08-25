"use client";

import { useFormStatus } from "react-dom";
import { STATUS_OPTIONS } from "@/lib/submission-options";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

export function EditSubmissionForm({
  action,
  defaultStatus,
  defaultComment,
}: {
  action: (formData: FormData) => void;
  defaultStatus: string;
  defaultComment: string | null;
}) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-800">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultStatus}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="adminComment" className="block text-sm font-medium text-slate-800">
          Internal notes
        </label>
        <textarea
          id="adminComment"
          name="adminComment"
          rows={5}
          defaultValue={defaultComment ?? ""}
          placeholder="Notes for your own future reference..."
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
      <SaveButton />
    </form>
  );
}
