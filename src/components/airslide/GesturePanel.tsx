import { useAirSlide, GESTURES, type GestureId } from "@/lib/airslide-store";
import { Button } from "@/components/ui/button";
import { Check, X, Radio, RotateCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function ConfirmationRing({ progress }: { progress: number }) {
  const size = 140;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        className="fill-none stroke-muted/60"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="fill-none stroke-[url(#g)] transition-[stroke-dashoffset] duration-75"
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.63 0.19 258)" />
          <stop offset="100%" stopColor="oklch(0.72 0.16 250)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GesturePanel() {
  const s = useAirSlide();
  const active = s.activeGesture ? GESTURES[s.activeGesture] : null;
  const detected = s.handTracking.classifiedGesture
    ? GESTURES[s.handTracking.classifiedGesture]
    : null;
  const last = s.lastExecuted ? GESTURES[s.lastExecuted] : null;

  const statusText = !s.cameraOn
    ? "Camera off"
    : active
      ? "Confirming…"
      : s.showSuccess && last
        ? `✓ ${last.action} executed`
        : !s.handTracking.landmarkerReady
          ? "Loading model..."
          : "Listening…";

  return (
    <div className="glass flex flex-col gap-5 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Gesture
          </div>
          <div className="mt-1 text-lg font-semibold">
            {active
              ? active.label
              : last && s.showSuccess
                ? last.label
                : detected
                  ? detected.label
                  : "Awaiting gesture"}
          </div>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-medium",
            active
              ? "border-primary/40 bg-primary/10 text-primary"
              : s.showSuccess
                ? "border-success/40 bg-success/10 text-success"
                : "border-border bg-muted/40 text-muted-foreground"
          )}
        >
          {!s.handTracking.landmarkerReady && s.cameraOn ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Radio className="h-3 w-3" />
          )}
          {statusText}
        </div>
      </div>

      {/* Ring */}
      <div className="relative mx-auto grid h-[140px] w-[140px] place-items-center">
        <ConfirmationRing progress={active ? s.progress : s.showSuccess ? 1 : 0} />
        <div className="absolute inset-0 grid place-items-center">
          {s.showSuccess && !active ? (
            <div className="grid h-16 w-16 place-items-center rounded-full bg-success/20 text-success animate-float-in">
              <Check className="h-8 w-8" />
            </div>
          ) : (
            <div className="text-5xl leading-none">
              {active?.emoji ?? detected?.emoji ?? (s.cameraOn ? "🖐️" : "💤")}
            </div>
          )}
        </div>
      </div>

      {/* Confidence */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Recognition Confidence</span>
          <span className="font-semibold tabular-nums">{s.confidence}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-500"
            style={{ width: `${s.confidence}%` }}
          />
        </div>
      </div>

      {/* Confirmation progress bar */}
      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Confirmation Progress</span>
          <span className="font-semibold tabular-nums">
            {Math.round((active ? s.progress : 0) * 100)}%
          </span>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => {
            const filled = (active ? s.progress : 0) * 10 > i;
            return (
              <div
                key={i}
                className={cn(
                  "h-2 flex-1 rounded-sm transition-colors",
                  filled ? "bg-primary" : "bg-muted"
                )}
              />
            );
          })}
        </div>
      </div>

      {/* Detected gesture display */}
      {detected && !active && !s.showSuccess && (
        <div className="animate-float-in rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
          <div className="text-xs font-medium uppercase tracking-wider text-primary">
            Gesture Detected
          </div>
          <div className="mt-1 text-lg font-semibold">
            {detected.emoji} {detected.label}
          </div>
          <div className="text-xs text-muted-foreground">{detected.action}</div>
        </div>
      )}

      <Button
        variant="outline"
        disabled={!active}
        onClick={s.cancelGesture}
        className="w-full"
      >
        <X className="mr-1 h-4 w-4" />
        Cancel gesture
      </Button>
    </div>
  );
}
