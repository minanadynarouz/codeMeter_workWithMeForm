import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/AdminHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { productTypeLabel } from "@/lib/submission-options";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Project requests</h1>
          <span className="text-sm text-slate-500">
            {submissions.length} submission{submissions.length === 1 ? "" : "s"}
          </span>
        </div>

        {submissions.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
            No submissions yet. New requests from the contact form will show up here.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Product type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <Link href={`/admin/${s.id}`} className="font-medium text-slate-900 hover:text-indigo-600">
                        {s.fullName}
                      </Link>
                      <div className="text-xs text-slate-500">{s.companyName}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{s.email}</div>
                      <div className="text-xs text-slate-500">{s.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{productTypeLabel(s.productType)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {s.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
