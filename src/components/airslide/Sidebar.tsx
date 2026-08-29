import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Radio,
  Presentation,
  Hand,
  Settings as SettingsIcon,
  Info,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/present", label: "Present Deck", icon: Presentation },
  { to: "/live", label: "Live Control", icon: Radio },
  { to: "/gestures", label: "Gesture Guide", icon: Hand },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
  { to: "/about", label: "About", icon: Info },
  { to: "/report", label: "Report", icon: FileText },
  { to: "/members", label: "Members", icon: Users },
] as const;

export function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onCloseMobile,
  onToggleCollapse,
}: {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onToggleCollapse?: () => void;
}) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const widthClass = collapsed ? "w-20" : "w-64";
  const mobileTransform = mobileOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <aside
      className={cn(
        "glass flex h-dvh shrink-0 flex-col rounded-none border-y-0 border-l-0 p-4 transition-transform duration-200",
        widthClass,
        // mobile drawer behaviour: fixed on small, sticky on large
        "fixed left-0 top-0 z-40 lg:sticky lg:top-0 lg:translate-x-0",
        mobileTransform
      )}
      style={{ willChange: "transform" }}
    >
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[image:var(--gradient-primary)] glow-primary">
          <img src="/icon.png" alt="AirSlide logo" className="h-10 w-10 object-cover" />
        </div>
        <div className="min-w-0">
          <div className={cn("text-base font-semibold tracking-tight", collapsed && "sr-only")}>AirSlide</div>
          <div className={cn("text-xs text-muted-foreground", collapsed && "sr-only")}>
            Touch-Free Control
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Mobile close button */}
          <button
            className="-mr-2 inline-flex items-center rounded p-1 text-muted-foreground lg:hidden"
            onClick={() => onCloseMobile && onCloseMobile()}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop collapse toggle */}
          <button
            className="hidden items-center rounded p-1 text-muted-foreground lg:inline-flex"
            onClick={() => onToggleCollapse && onToggleCollapse()}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                active && "bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <Icon className={cn("h-4.5 w-4.5 shrink-0", active && "text-primary")} />
              <span className={cn("truncate", collapsed && "sr-only")}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-border/60 bg-card/40 p-3 text-xs text-muted-foreground">
        <div className={cn("mb-1 font-medium text-foreground", collapsed && "sr-only")}>Tip</div>
        <div className={cn(collapsed && "sr-only")}>
          For the best experience, use AirSlide on a laptop or tablet with a webcam.
        </div>
      </div>
    </aside>
  );
}
