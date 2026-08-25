import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            MB
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Mina Bekheet
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex dark:text-slate-400">
          <a href="#services" className="transition hover:text-slate-900 dark:hover:text-white">
            Services
          </a>
          <a href="#about" className="transition hover:text-slate-900 dark:hover:text-white">
            About
          </a>
          <a href="#contact" className="transition hover:text-slate-900 dark:hover:text-white">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
