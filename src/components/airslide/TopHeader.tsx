import { useAirSlide } from "@/lib/airslide-store";
import { Camera, Wifi, Activity, CircleDot, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function StatusPill({
  active,
  icon: Icon,
  label,
  value,
}: {
  active: boolean;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/40 px-3 py-2">
      <div className="relative">
        <span
          className={cn(
            "block h-2 w-2 rounded-full",
            active ? "bg-success" : "bg-destructive"
          )}
        />
        {active && (
          <span className="absolute inset-0 h-2 w-2 rounded-full bg-success animate-pulse-ring" />
        )}
      </div>
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="text-xs">
        <div className="text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}

export function TopHeader({
  title,
  subtitle,
  onOpenMobile,
  collapsed,
  onToggleCollapse,
}: {
  title: string;
  subtitle?: string;
  onOpenMobile?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const s = useAirSlide();
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border/60 bg-background/40 px-4 lg:px-8 py-4 backdrop-blur-xl">
      <div className="min-w-0 flex items-center gap-3">
        <button
          className="inline-flex items-center rounded p-1 text-muted-foreground lg:hidden"
          onClick={() => onOpenMobile && onOpenMobile()}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="mt-0.5 truncate text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <button
          className="mr-2 inline-flex items-center rounded p-1 text-muted-foreground"
          onClick={() => onToggleCollapse && onToggleCollapse()}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
        
        
        
        <StatusPill
          active={s.cameraOn}
          icon={Camera}
          label="Camera"
          value={s.cameraOn ? "Connected" : "Disconnected"}
        />
        <StatusPill
          active={s.handDetected && s.cameraOn}
          icon={Activity}
          label="Hand Detection"
          value={s.handDetected && s.cameraOn ? "Tracking" : "Idle"}
        />
        <StatusPill
          active={s.cameraOn}
          icon={CircleDot}
          label="Confidence"
          value={`${s.confidence}%`}
        />
        <StatusPill
          active={s.cameraOn}
          icon={Wifi}
          label="System"
          value={s.cameraOn ? "Listening…" : "Standby"}
        />
      </div>
    </header>
  );
}
