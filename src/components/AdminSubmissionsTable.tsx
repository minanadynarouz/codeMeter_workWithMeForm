"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productTypeLabel, STATUS_OPTIONS } from "@/lib/submission-options";

interface Submission {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  productType: any;
  companyDescription: string;
  wantsAdminPanel: any;
  brandAssetsStatus: any;
  hasReference: any;
  referenceLink: string | null;
  hasDomain: any;
  domainName: string | null;
  budgetRange: string | null;
  timeline: string | null;
  status: any;
  adminComment: string | null;
}

interface AdminSubmissionsTableProps {
  submissions: Submission[];
  showBudget: boolean;
  showTimeline: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:ring-blue-900",
  CONTACTED: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900",
  IN_DISCUSSION: "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:ring-purple-900",
  PROPOSAL_SENT: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:ring-indigo-900",
  WON: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900",
  LOST: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-900",
  ARCHIVED: "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
};

export function AdminSubmissionsTable({
  submissions,
  showBudget,
  showTimeline,
}: AdminSubmissionsTableProps) {
  const [list, setList] = useState<Submission[]>(submissions);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync with localStorage order on load
  useEffect(() => {
    const storedOrder = localStorage.getItem("submissions-order");
    if (storedOrder) {
      const idOrder = JSON.parse(storedOrder) as string[];
      const sorted = [...submissions].sort((a, b) => {
        const indexA = idOrder.indexOf(a.id);
        const indexB = idOrder.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      setList(sorted);
    } else {
      setList(submissions);
    }
  }, [submissions]);

  // Status handler
  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic local state update
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status in the database. Please reload and try again.");
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission? This cannot be undone.")) {
      return;
    }

    // Optimistic local state update
    setList((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete submission");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete submission from the database. Please reload and try again.");
    }
  };

  // Drag and drop sorting handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newList = [...list];
    const [moved] = newList.splice(draggedIndex, 1);
    newList.splice(index, 0, moved);
    setList(newList);

    // Persist list order
    const order = newList.map((item) => item.id);
    localStorage.setItem("submissions-order", JSON.stringify(order));
    setDraggedIndex(null);
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 w-10"></th> {/* Drag handle column */}
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Product type</th>
            {showBudget && <th className="px-4 py-3">Budget</th>}
            {showTimeline && <th className="px-4 py-3">Timeline</th>}
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Received</th>
            <th className="px-4 py-3 w-16 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {list.map((s, index) => (
            <tr
              key={s.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-grab active:cursor-grabbing transition-colors duration-150 ${
                draggedIndex === index ? "opacity-40 bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              {/* Drag handle icon */}
              <td className="px-4 py-3 text-slate-400 cursor-grab hover:text-slate-650">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/${s.id}`}
                  className="font-medium text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                >
                  {s.fullName}
                </Link>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {s.companyName}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-650 dark:text-slate-400">
                <div>{s.email}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {s.phone}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-650 dark:text-slate-400">
                {productTypeLabel(s.productType)}
              </td>
              {showBudget && (
                <td className="px-4 py-3 text-slate-650 dark:text-slate-400">
                  {s.budgetRange || "—"}
                </td>
              )}
              {showTimeline && (
                <td className="px-4 py-3 text-slate-650 dark:text-slate-400">
                  {s.timeline || "—"}
                </td>
              )}
              <td className="px-4 py-3">
                <div className="relative inline-flex items-center">
                  <select
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    className={`inline-flex items-center rounded-full pl-2.5 pr-6 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                      STATUS_STYLES[s.status] || STATUS_STYLES.NEW
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {new Date(s.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              {/* Delete button */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleDelete(s.id)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800"
                  title="Delete request"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
