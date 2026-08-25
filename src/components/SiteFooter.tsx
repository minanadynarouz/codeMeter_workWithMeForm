export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} CodeMeter. All rights reserved.</p>
        <p>Websites · SaaS · Applications · 3D · Automations · AI Agents</p>
      </div>
    </footer>
  );
}
