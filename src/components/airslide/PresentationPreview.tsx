import { useAirSlide } from "@/lib/airslide-store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const SLIDES = [
  { title: "Welcome to AirSlide", subtitle: "Touch-Free Presentation Control" },
  { title: "The Problem", subtitle: "Presenters interrupt their flow to change slides." },
  { title: "The Solution", subtitle: "Natural hand gestures via any webcam." },
  { title: "How It Works", subtitle: "Detect · Confirm · Execute" },
  { title: "Supported Gestures", subtitle: "Five intuitive movements." },
  { title: "Gesture Confirmation", subtitle: "0.7s hold prevents accidents." },
  { title: "Feedback Loop", subtitle: "Visibility of system status." },
  { title: "Accessibility", subtitle: "Keyboard, contrast & tooltips." },
  { title: "Live Demo", subtitle: "See it in action." },
  { title: "User Study", subtitle: "94% task success rate." },
  { title: "Roadmap", subtitle: "What's next." },
  { title: "Thank You", subtitle: "Questions?" },
];

export function PresentationPreview() {
  const s = useAirSlide();
  const slide = s.slides[s.slide - 1] ?? s.slides[0] ?? { title: "AirSlide", subtitle: "Touch-Free Presentation Control" };
  const [laserPos, setLaserPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (s.laserActive && s.handTracking.pointerPos) {
      setLaserPos(s.handTracking.pointerPos);
    }
  }, [s.laserActive, s.handTracking.pointerPos]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Presentation Preview
          </div>
          <div className="mt-0.5 text-sm">
            Slide{" "}
            <span className="font-semibold tabular-nums text-foreground">{s.slide}</span>{" "}
            <span className="text-muted-foreground">/ {s.totalSlides}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {s.paused && (
            <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-medium text-warning">
              PAUSED
            </span>
          )}
          {s.laserActive && (
            <span className="rounded-full bg-destructive/20 px-2 py-0.5 text-[10px] font-medium text-destructive">
              LASER
            </span>
          )}
          {s.zoomed && (
            <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent">
              ZOOM
            </span>
          )}
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-slate-900 to-slate-950">
        {slide.imageUrl ? (
          <div
            key={s.slide + (s.zoomed ? "z" : "")}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-transform duration-500",
              s.zoomed && "scale-125"
            )}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title || `Slide ${s.slide}`}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div
            key={s.slide + (s.zoomed ? "z" : "")}
            className={cn(
              "absolute inset-0 grid place-items-center px-10 text-center transition-transform duration-500 animate-float-in",
              s.zoomed && "scale-125"
            )}
          >
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                AirSlide · Slide {s.slide}
              </div>
              <h3 className="gradient-text text-3xl font-bold tracking-tight">
                {slide.title}
              </h3>
              {slide.subtitle && <p className="mt-3 text-sm text-slate-300">{slide.subtitle}</p>}
              <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary/60" />
            </div>
          </div>
        )}

        {/* Slide counter dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {Array.from({ length: s.totalSlides }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all",
                i + 1 === s.slide ? "w-6 bg-primary" : "w-1.5 bg-muted"
              )}
            />
          ))}
        </div>

        {/* Pause overlay */}
        {s.paused && (
          <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm animate-float-in">
            <div className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-warning/20">
                <Pause className="h-8 w-8 text-warning" />
              </div>
              <div className="mt-3 text-base font-semibold">Presentation Paused</div>
              <div className="text-xs text-muted-foreground">
                Make a closed fist to resume
              </div>
            </div>
          </div>
        )}

        {/* Laser pointer */}
        {s.laserActive && (
          <div
            className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive shadow-[0_0_20px_6px_oklch(0.65_0.24_25_/_0.7)] transition-all duration-700 ease-out"
            style={{ left: `${laserPos.x}%`, top: `${laserPos.y}%` }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={s.prevSlide}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={s.paused ? "Resume" : "Pause"}
            onClick={() => s.triggerGesture("closed-fist")}
          >
            {s.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={s.zoomed ? "Zoom out" : "Zoom in"}
            onClick={() => s.triggerGesture("pinch")}
          >
            {s.zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          </Button>
        </div>
        <Button variant="default" size="sm" onClick={s.nextSlide}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
