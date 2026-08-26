import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminSubmissionsTable } from "@/components/AdminSubmissionsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const showBudget = submissions.some((s) => s.budgetRange && s.budgetRange.trim() !== "");
  const showTimeline = submissions.some((s) => s.timeline && s.timeline.trim() !== "");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Project requests</h1>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {submissions.length} submission{submissions.length === 1 ? "" : "s"}
          </span>
        </div>

        {submissions.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No submissions yet. New requests from the contact form will show up here.
          </div>
        ) : (
          <AdminSubmissionsTable
            submissions={submissions}
            showBudget={showBudget}
            showTimeline={showTimeline}
          />
        )}
      </main>
    </div>
  );
}
