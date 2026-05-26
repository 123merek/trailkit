"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, CalendarDays, Link2, ListTree, Settings, Users } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/links", label: "Links", icon: Link2 },
  { href: "/dashboard/partners", label: "Partners", icon: Users },
  { href: "/dashboard/events", label: "Events", icon: ListTree },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 flex border-b border-[#dfd4f4] bg-[#fffaf2]/88 px-4 py-3 backdrop-blur md:min-h-screen md:w-72 md:flex-col md:border-b-0 md:border-r md:px-5 md:py-5">
      <div className="flex w-full items-center justify-between gap-3 md:block">
        <Logo variant="dark" />
        <div className="hidden rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/78 p-3 md:mt-6 md:block">
          <p className="text-xs text-[#72668a]">Workspace</p>
          <p className="mt-1 text-sm font-medium text-[#372a54]">FocusForge Growth</p>
        </div>
      </div>
      <nav className="ml-4 flex gap-1 overflow-x-auto md:ml-0 md:mt-6 md:flex-col md:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-[#72668a] transition hover:bg-[#eee6ff] hover:text-[#372a54]",
                active && "bg-[#765dff] text-[#fffdf8] hover:bg-[#765dff] hover:text-[#fffdf8]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto hidden rounded-[8px] border border-[#dfd4f4] bg-[#fffdf8]/78 p-4 md:block">
        <div className="flex items-center gap-2 text-sm font-medium text-[#372a54]">
          <Bell className="h-4 w-4 text-[#765dff]" />
          Beta workspace
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-[#72668a]">
          <CalendarDays className="h-4 w-4" />
          May 2026 demo data
        </div>
      </div>
    </aside>
  );
}
