import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/AdminHeader";
import { EditSubmissionForm } from "@/components/EditSubmissionForm";
import { updateSubmission } from "./actions";
import {
  productTypeLabel,
  brandAssetsLabel,
  yesNoLabel,
} from "@/lib/submission-options";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">{value}</dd>
    </div>
  );
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await prisma.submission.findUnique({ where: { id } });

  if (!submission) {
    notFound();
  }

  const updateWithId = updateSubmission.bind(null, submission.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/admin" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
          ← Back to all requests
        </Link>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{submission.fullName}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{submission.companyName}</p>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Received{" "}
            {submission.createdAt.toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Contact information</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" value={submission.fullName} />
                <Field label="Company" value={submission.companyName} />
                <Field label="Email" value={submission.email} />
                <Field label="Phone" value={submission.phone} />
              </dl>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Project details</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Product type" value={productTypeLabel(submission.productType)} />
                <Field
                  label="Wants admin panel"
                  value={yesNoLabel(submission.wantsAdminPanel)}
                />
                <Field
                  label="Brand assets"
                  value={brandAssetsLabel(submission.brandAssetsStatus)}
                />
                <Field
                  label="Reference"
                  value={
                    submission.hasReference === "YES"
                      ? submission.referenceLink ?? "—"
                      : "No reference provided"
                  }
                />
                <Field
                  label="Domain"
                  value={
                    submission.hasDomain === "YES"
                      ? submission.domainName ?? "—"
                      : "Does not own a domain yet"
                  }
                />
                <Field label="Budget" value={submission.budgetRange || "Not specified"} />
                <Field label="Timeline" value={submission.timeline || "Not specified"} />
              </dl>
              <div className="mt-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Company description
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-sm text-slate-900 dark:text-slate-100">
                  {submission.companyDescription}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Manage request</h2>
            <div className="mt-4">
              <EditSubmissionForm
                key={submission.updatedAt.toISOString()}
                action={updateWithId}
                defaultStatus={submission.status}
                defaultComment={submission.adminComment}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
