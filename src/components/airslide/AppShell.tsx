import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-dvh w-full">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((s) => !s)}
      />

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          role="presentation"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader
          title={title}
          subtitle={subtitle}
          onOpenMobile={() => setMobileOpen(true)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((s) => !s)}
        />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
