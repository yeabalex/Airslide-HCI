import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { CameraFeed } from "@/components/airslide/CameraFeed";
import { GesturePanel } from "@/components/airslide/GesturePanel";
import { PresentationPreview } from "@/components/airslide/PresentationPreview";
import { ControlBar } from "@/components/airslide/ControlBar";
import { useAirSlide, GESTURES } from "@/lib/airslide-store";
import { ArrowRight, Clock, Hand, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard - AirSlide" },
      {
        name: "description",
        content: "Live overview of your touch-free presentation session.",
      },
    ],
  }),
  component: Dashboard,
});

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Dashboard() {
  const s = useAirSlide();
  const executed = s.history.filter((h) => h.status === "executed").length;
  const cancelled = s.history.filter((h) => h.status === "cancelled").length;

  return (
    <AppShell
      title="Dashboard"
      subtitle="Live overview of your gesture-controlled presentation."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Hand}
            label="Recognition"
            value={`${s.confidence}%`}
            hint="Rolling average confidence"
          />
          <StatCard
            icon={Zap}
            label="Gestures executed"
            value={String(executed)}
            hint={`${cancelled} cancelled by user`}
          />
          <StatCard
            icon={Clock}
            label="Confirmation window"
            value={`${(s.confirmationMs / 1000).toFixed(2)}s`}
            hint="Adjustable in Settings"
          />
          <StatCard
            icon={ArrowRight}
            label="Current slide"
            value={`${s.slide} / ${s.totalSlides}`}
            hint={s.paused ? "Paused" : s.laserActive ? "Laser mode" : "Live"}
          />
        </div>

        <ControlBar />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-6">
            <CameraFeed />
            <PresentationPreview />
          </div>
          <GesturePanel />
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Recent activity
              </div>
              <div className="mt-0.5 text-base font-semibold">Gesture history</div>
            </div>
            <Link
              to="/gestures"
              className="text-xs font-medium text-primary hover:underline"
            >
              View gesture guide →
            </Link>
          </div>
          {s.history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
              No gestures yet. Try the simulator on the right panel.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {s.history.slice(0, 6).map((h) => {
                const g = GESTURES[h.gesture];
                return (
                  <li
                    key={h.id}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{g.emoji}</span>
                      <div>
                        <div className="font-medium">{g.label}</div>
                        <div className="text-xs text-muted-foreground">{g.action}</div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        h.status === "executed"
                          ? "bg-success/15 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {h.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}
