import { useAirSlide, GESTURES } from "@/lib/airslide-store";
import { CameraOff, Hand } from "lucide-react";
import { cn } from "@/lib/utils";

export function CameraFeed() {
  const s = useAirSlide();

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/70 bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.04_265)_0%,oklch(0.12_0.02_265)_100%)]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Container where hook creates video + canvas */}
        <div
          ref={s.handTracking.containerRef}
          className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover"
        />

        {/* Grid overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            s.cameraOn ? "opacity-30" : "opacity-40"
          )}
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Corner brackets */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((c) => (
          <span
            key={c}
            className={cn(
              "pointer-events-none absolute h-6 w-6 border-primary/70",
              c === "top-left" && "left-4 top-4 border-l-2 border-t-2",
              c === "top-right" && "right-4 top-4 border-r-2 border-t-2",
              c === "bottom-left" && "bottom-4 left-4 border-b-2 border-l-2",
              c === "bottom-right" && "bottom-4 right-4 border-b-2 border-r-2"
            )}
          />
        ))}
      </div>

      {s.cameraOn ? (
        <>
          {/* Scan line */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="scanline h-24 w-full animate-scan" />
          </div>

          {/* Hand tracker indicator */}
          {s.handDetected && (
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/70" />
              <div className="absolute inset-0 rounded-full border border-primary/40 animate-pulse-ring" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="rounded-lg bg-background/80 px-2 py-1 text-[10px] font-medium tracking-wide text-primary backdrop-blur">
                  HAND · {s.confidence}%
                </div>
              </div>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <span
                  key={deg}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_6px_currentColor]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-64px)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Big gesture emoji when active */}
          {s.activeGesture && (
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="animate-float-in text-8xl drop-shadow-[0_10px_30px_oklch(0.63_0.19_258_/_0.6)]">
                {GESTURES[s.activeGesture].emoji}
              </div>
            </div>
          )}

          {/* Top-left LIVE */}
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-semibold backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-blink" />
            LIVE
          </div>

          {/* Top-right hand indicator */}
          <div
            className={cn(
              "absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur",
              s.handDetected
                ? "bg-success/20 text-success"
                : "bg-muted/70 text-muted-foreground"
            )}
          >
            <Hand className="h-3 w-3" />
            {s.handDetected ? (
              <>
                Hand Detected
                {s.handTracking.classifiedGesture && (
                  <span className="ml-1">
                    {GESTURES[s.handTracking.classifiedGesture]?.emoji}
                  </span>
                )}
              </>
            ) : (
              "No Hand"
            )}
          </div>

          {/* Loading indicator */}
          {!s.handTracking.landmarkerReady && (
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-warning/20 px-3 py-1 text-[11px] font-medium text-warning backdrop-blur">
              Loading hand tracking model...
            </div>
          )}

          {/* Bottom label */}
          {s.handTracking.landmarkerReady && (
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
              Camera Feed · 640×480 · 30fps
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-muted/60">
              <CameraOff className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="mt-4 text-base font-medium">Camera is off</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Start the camera to begin gesture tracking.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
