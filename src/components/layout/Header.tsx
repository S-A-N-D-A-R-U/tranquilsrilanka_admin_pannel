import { Bell, Search, ExternalLink, HelpCircle, Command } from "lucide-react";

export default function Header() {
  return (
    <header className="admin-header">
      <div className="flex items-center gap-4 w-full max-w-lg">
        <div className="relative w-full group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] h-[18px] w-[18px] group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            type="text"
            placeholder="Search tours, activities, posts..."
            className="w-full bg-white border border-[var(--panel-border-strong)] rounded-xl py-2.5 pl-11 pr-20 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-glow)] transition-all shadow-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--panel-border)] rounded-md px-1.5 py-0.5">
            <Command size={10} /> K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] px-3 py-2 rounded-lg hover:bg-[var(--accent-soft)] transition-colors"
          title="View live site"
        >
          <ExternalLink size={15} />
          <span>View site</span>
        </a>

        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors w-10 h-10 grid place-items-center rounded-lg" title="Help">
          <HelpCircle size={18} />
        </button>

        <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors w-10 h-10 grid place-items-center rounded-lg relative" title="Notifications">
          <Bell size={18} />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[var(--danger)] ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 ml-1 border-l border-[var(--panel-border)] cursor-pointer">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[hsl(217,91%,56%)] to-[hsl(280,80%,60%)] grid place-items-center text-white text-sm font-bold shadow-sm">
            A
          </div>
          <div className="hidden md:block text-sm leading-tight">
            <p className="font-semibold text-[var(--text-primary)] text-[13px]">Admin User</p>
            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
