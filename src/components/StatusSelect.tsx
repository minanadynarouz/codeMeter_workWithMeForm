"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { STATUS_OPTIONS, STATUS_STYLES } from "@/lib/submission-options";
import { updateSubmissionStatus } from "@/app/admin/actions";

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const style = STATUS_STYLES[value] ?? STATUS_STYLES.NEW;

  return (
    <select
      value={value}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value;
        const previous = value;
        setValue(next);
        startTransition(async () => {
          try {
            await updateSubmissionStatus(id, next);
            router.refresh();
          } catch {
            setValue(previous);
          }
        });
      }}
      className={`rounded-full border-0 py-1 pl-2.5 pr-7 text-xs font-medium ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 ${style}`}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
