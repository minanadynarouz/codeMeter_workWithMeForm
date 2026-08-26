"use client";

import { signOut, useSession } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            MB
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Admin dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <span className="text-sm text-slate-500 dark:text-slate-400">{session.user.email}</span>
          )}
          <ThemeToggle />
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
