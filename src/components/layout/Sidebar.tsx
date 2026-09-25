"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/authActions";
import { LayoutDashboard, Map, Compass, Settings, LogOut, MountainSnow, Tag, BookOpen, MessageSquare } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navGroups = [
    {
      label: "Overview",
      items: [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
      ],
    },
    {
      label: "Catalog",
      items: [
        { name: "Tours", href: "/tours", icon: Map },
        { name: "Activities", href: "/activities", icon: Compass },
        { name: "Offers", href: "/offers", icon: Tag },
      ],
    },
    {
      label: "Content",
      items: [
        { name: "Hero Slides", href: "/hero-slides", icon: MountainSnow },
        { name: "News & Blog", href: "/posts", icon: BookOpen },
        { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
      ],
    },
    {
      label: "System",
      items: [
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="flex items-center gap-3 px-2 mb-8 mt-1">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[hsl(217,91%,56%)] to-[hsl(217,91%,42%)] grid place-items-center text-white shadow-[0_8px_24px_-6px_hsla(217,91%,56%,0.6),inset_0_1px_0_hsla(0,0%,100%,0.2)]">
          <MountainSnow size={22} strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-[17px] font-bold text-white tracking-tight leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Serene</h2>
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold mt-0.5">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 flex flex-col overflow-y-auto -mx-1 px-1">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="nav-section-label">{group.label}</p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.name} href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                  <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="pt-4 mt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[hsl(217,91%,56%)] to-[hsl(280,80%,60%)] grid place-items-center text-white text-sm font-bold shadow-md">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight truncate">Admin User</p>
            <p className="text-[11px] text-white/50 truncate">admin@serene.lk</p>
          </div>
          <form action={logout}>
            <button type="submit" className="text-white/40 hover:text-[var(--danger)] transition-colors p-1.5 rounded-lg hover:bg-white/5" title="Sign out" aria-label="Sign out">
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
