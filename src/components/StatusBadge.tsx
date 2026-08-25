import { statusLabel } from "@/lib/submission-options";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 ring-amber-200",
  IN_DISCUSSION: "bg-purple-50 text-purple-700 ring-purple-200",
  PROPOSAL_SENT: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  WON: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  LOST: "bg-red-50 text-red-700 ring-red-200",
  ARCHIVED: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.NEW;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {statusLabel(status)}
    </span>
  );
}
