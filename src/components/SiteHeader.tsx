import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

interface SiteHeaderProps {
  onNavigate?: (section: "hero" | "services" | "about" | "contact") => void;
}

export function SiteHeader({ onNavigate }: SiteHeaderProps) {
  return (
    <header className="sticky top-4 z-40 w-full max-w-6xl px-6 mx-auto">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-white/75 px-6 py-3.5 shadow-sm backdrop-blur-md transition-all dark:border-slate-800/60 dark:bg-slate-950/75">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate("hero");
            }
          }}
        >
          <Logo size={32} className="transition-transform group-hover:scale-105" />
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Mina Bekheet
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex dark:text-slate-400">
          <a 
            href="#services" 
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("services");
              }
            }}
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Services
          </a>
          <a 
            href="#about" 
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("about");
              }
            }}
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            About
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("contact");
              }
            }}
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("contact");
              }
            }}
            className="rounded-full bg-linear-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all duration-300 hover:from-indigo-600 hover:to-violet-750 hover:shadow-md hover:shadow-indigo-500/20 hover:scale-[1.02]"
          >
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
