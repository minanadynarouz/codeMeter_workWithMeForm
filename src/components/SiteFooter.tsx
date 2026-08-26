export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p>© {new Date().getFullYear()} Mina Bekheet. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-400">
          <span>Websites</span><span className="text-indigo-500/30">•</span>
          <span>SaaS</span><span className="text-indigo-500/30">•</span>
          <span>Applications</span><span className="text-indigo-500/30">•</span>
          <span>3D Experiences</span><span className="text-indigo-500/30">•</span>
          <span>Automations</span><span className="text-indigo-500/30">•</span>
          <span>AI Agents</span>
        </div>
      </div>
    </footer>
  );
}
