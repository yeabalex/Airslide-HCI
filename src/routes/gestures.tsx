import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { GESTURES, useAirSlide, type GestureId } from "@/lib/airslide-store";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gestures")({
  head: () => ({
    meta: [
      { title: "Gesture Guide - AirSlide" },
      {
        name: "description",
        content: "Learn the five natural hand gestures AirSlide recognizes.",
      },
    ],
  }),
  component: GesturesPage,
});

const ILLUSTRATIONS: Record<GestureId, string> = {
  "swipe-right": "✌️ ✌️ ✌️",
  "swipe-left": "☝️ ☝️ ☝️",
  "open-palm": "🖐️ 🖐️ 🖐️",
  "closed-fist": "✊ ✊ ✊",
  pinch: "🤏 🤏 🤏",
};

function GesturesPage() {
  const s = useAirSlide();
  const gestures = Object.values(GESTURES);

  return (
    <AppShell
      title="Gesture Guide"
      subtitle="Five intuitive gestures. Each requires a short hold to confirm."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gestures.map((g) => {
          const active = s.activeGesture === g.id;
          return (
            <article
              key={g.id}
              className={cn(
                "glass group flex flex-col overflow-hidden rounded-2xl p-6 transition-all",
                "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_oklch(0.63_0.19_258_/_0.6)]",
                active && "border-primary/60"
              )}
            >
              <div className="relative flex h-32 items-center justify-center rounded-xl border border-border/60 bg-[radial-gradient(ellipse_at_center,oklch(0.24_0.05_265),oklch(0.16_0.02_265))]">
                <div className="text-6xl transition-transform duration-500 group-hover:scale-110">
                  {g.emoji}
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.4em] text-primary/70">
                  {ILLUSTRATIONS[g.id]}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{g.label}</h3>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {g.action}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{g.description}</p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => s.triggerGesture(g.id)}
                disabled={!s.cameraOn}
              >
                <Play className="h-3.5 w-3.5" />
                Try gesture
              </Button>
            </article>
          );
        })}
      </div>

      <div className="glass mt-8 rounded-2xl p-6">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          How confirmation works
        </div>
        <ol className="grid gap-4 md:grid-cols-5">
          {[
            "Detect gesture",
            "Show detected gesture",
            "Hold ~0.7s",
            "Execute command",
            "Success feedback",
          ].map((step, i) => (
            <li key={step} className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="text-sm font-medium">{step}</div>
              </div>
              {i < 4 && (
                <span className="absolute left-11 top-1/2 hidden h-px w-full -translate-y-1/2 bg-border md:block" />
              )}
            </li>
          ))}
        </ol>
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
          <strong>💡 Pro Tip (Clutch Gesture):</strong> Flash a <strong>Thumbs Up 👍</strong> to arm swipe mode. A green guidance line and arrows will appear on the video feed. Move your hand to the right for <em>Next Slide</em> or left for <em>Previous Slide</em>.
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          You can cancel a gesture any time before confirmation completes - press{" "}
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">Esc</kbd> or click{" "}
          <em>Cancel</em>. This prevents accidental triggers and gives you full control.
        </p>
      </div>
    </AppShell>
  );
}
