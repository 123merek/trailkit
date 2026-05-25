import type { Metadata } from "next";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      <DashboardNav />
      {/* Add Clerk, Supabase Auth, or NextAuth protection at this layout boundary when real workspaces are enabled. */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
