"use client";

import { signOut, useSession } from "next-auth/react";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            CM
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Admin dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <span className="text-sm text-slate-500">{session.user.email}</span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
