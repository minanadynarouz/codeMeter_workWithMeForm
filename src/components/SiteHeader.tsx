import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            CM
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            CodeMeter
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
          <a href="#services" className="transition hover:text-slate-900">
            Services
          </a>
          <a href="#about" className="transition hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="transition hover:text-slate-900">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
