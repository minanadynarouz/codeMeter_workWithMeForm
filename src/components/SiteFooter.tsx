export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
        <p>© {new Date().getFullYear()} Mina Bekheet. All rights reserved.</p>
        <p>Websites · SaaS · Applications · 3D · Automations · AI Agents</p>
      </div>
    </footer>
  );
}
