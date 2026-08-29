import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { useAirSlide, GESTURES, type SlideData } from "@/lib/airslide-store";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileUp,
  Maximize,
  Minimize,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ZoomIn,
  ZoomOut,
  Camera,
  CameraOff,
  Eye,
  EyeOff,
  Radio,
  FileText,
  Presentation,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/present")({
  head: () => ({
    meta: [
      { title: "Present Deck - AirSlide" },
      {
        name: "description",
        content: "Upload custom presentations, PDFs, or PowerPoint slides and present touch-free with gesture control.",
      },
    ],
  }),
  component: PresentPage,
});

const SAMPLE_DECKS: { name: string; description: string; slides: SlideData[] }[] = [
  {
    name: "🚀 AI & HCI Technology Deck",
    description: "Sample presentation on Natural User Interfaces and Vision Models.",
    slides: [
      { id: "s1", type: "default", title: "Next-Gen Human Computer Interaction", subtitle: "Zero Touch, Pure Intent" },
      { id: "s2", type: "default", title: "The End of Physical Clickers", subtitle: "Why hardware remotes are obsolete" },
      { id: "s3", type: "default", title: "On-Device Edge Vision", subtitle: "WebAssembly + GPU local inference" },
      { id: "s4", type: "default", title: "Continuous Trajectory Tracking", subtitle: "Understanding gestures in real-time" },
      { id: "s5", type: "default", title: "Accessibility & Inclusivity", subtitle: "Designed for all presenter styles" },
      { id: "s6", type: "default", title: "Thank You & Q/A", subtitle: "Live interactive demo" },
    ],
  },
  {
    name: "📊 Quarterly Business Review",
    description: "Sample corporate executive report slide deck.",
    slides: [
      { id: "b1", type: "default", title: "Q3 Performance Overview", subtitle: "Global Revenue & User Growth" },
      { id: "b2", type: "default", title: "Key Milestones Achieved", subtitle: "Product launches and strategic partnerships" },
      { id: "b3", type: "default", title: "Financial Breakdown", subtitle: "+42% YoY growth in active users" },
      { id: "b4", type: "default", title: "Strategic Priorities for Q4", subtitle: "Expansion into enterprise workflows" },
    ],
  },
];

function PresentPage() {
  const s = useAirSlide();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPiP, setShowPiP] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const pipContainerRef = useRef<HTMLDivElement>(null);
  const previewCameraRef = useRef<HTMLDivElement>(null);
  const [laserPoint, setLaserPoint] = useState({ x: 50, y: 50 });

  const currentSlide = s.slides[s.slide - 1] ?? s.slides[0];

  // Attach canvas to PiP container when in fullscreen, or preview camera container when in stage view
  useEffect(() => {
    if (s.isFullscreen && showPiP && pipContainerRef.current) {
      s.handTracking.attachCanvasToContainer(pipContainerRef.current);
    } else if (previewCameraRef.current) {
      s.handTracking.attachCanvasToContainer(previewCameraRef.current);
    }
  }, [s.isFullscreen, showPiP, s.cameraOn]);

  // Laser pointer position synced with live hand tracking
  useEffect(() => {
    if (s.laserActive && s.handTracking.pointerPos) {
      setLaserPoint(s.handTracking.pointerPos);
    }
  }, [s.laserActive, s.handTracking.pointerPos]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      s.setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [s]);

  const enterFullscreen = useCallback(async () => {
    if (fullscreenContainerRef.current) {
      try {
        if (!document.fullscreenElement) {
          await fullscreenContainerRef.current.requestFullscreen();
          s.setIsFullscreen(true);
          // Ensure camera is turned on for gesture detection
          if (!s.cameraOn) {
            await s.startCamera();
          }
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }
  }, [s]);

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      s.setIsFullscreen(false);
    }
  }, [s]);

  // Render PDF file to image slides using pdfjs-dist
  const processPdfFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const loadedSlides: SlideData[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: ctx, canvas, viewport }).promise;
          const imageUrl = canvas.toDataURL("image/jpeg", 0.9);

          loadedSlides.push({
            id: `pdf-${i}-${Date.now()}`,
            type: "image",
            title: `${file.name.replace(/\.[^/.]+$/, "")} (Page ${i})`,
            imageUrl,
          });
        }
      }

      if (loadedSlides.length > 0) {
        s.setCustomDeck(loadedSlides);
      }
    } catch (err) {
      console.error("PDF parse failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle uploaded files (PDF, PPT converted, or multiple images)
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      await processPdfFile(file);
      return;
    }

    // If multiple image slides
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      setIsProcessing(true);
      const loadedSlides: SlideData[] = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const imgFile = imageFiles[i];
        const imageUrl = URL.createObjectURL(imgFile);
        loadedSlides.push({
          id: `img-${i}-${Date.now()}`,
          type: "image",
          title: imgFile.name.replace(/\.[^/.]+$/, ""),
          imageUrl,
        });
      }

      s.setCustomDeck(loadedSlides);
      setIsProcessing(false);
    }
  };

  const activeGestureMeta = s.activeGesture ? GESTURES[s.activeGesture] : null;

  return (
    <AppShell
      title="Present Deck"
      subtitle="Upload PowerPoint slides or PDFs, present in full screen, and control everything hands-free."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Presentation Stage & Fullscreen Container */}
        <div className="space-y-6 lg:col-span-8">
          <div
            ref={fullscreenContainerRef}
            className={cn(
              "glass relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all",
              s.isFullscreen
                ? "fixed inset-0 z-50 h-screen w-screen rounded-none border-none bg-black p-0"
                : "p-5"
            )}
          >
            {/* Stage Header / Info Bar */}
            <div
              className={cn(
                "flex items-center justify-between transition-opacity",
                s.isFullscreen
                  ? "absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6 opacity-0 hover:opacity-100"
                  : "mb-4"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Presentation className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-white">
                    {currentSlide?.title || "Presentation"}
                  </h2>
                  <div className="text-xs text-muted-foreground">
                    Slide <span className="font-bold text-foreground">{s.slide}</span> of{" "}
                    {s.totalSlides}
                  </div>
                </div>
              </div>

              {/* Status & Action Buttons */}
              <div className="flex items-center gap-2">
                {s.paused && (
                  <span className="rounded-full bg-warning/20 px-2.5 py-1 text-xs font-semibold text-warning">
                    PAUSED
                  </span>
                )}
                {s.laserActive && (
                  <span className="rounded-full bg-destructive/20 px-2.5 py-1 text-xs font-semibold text-destructive">
                    LASER ACTIVE
                  </span>
                )}
                {s.zoomed && (
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent">
                    ZOOM 1.25x
                  </span>
                )}

                <Button
                  variant={s.cameraOn ? "outline" : "default"}
                  size="sm"
                  className={cn("h-8", !s.cameraOn && "bg-emerald-600 hover:bg-emerald-500 text-white")}
                  onClick={s.toggleCamera}
                >
                  {s.cameraOn ? <CameraOff className="mr-1.5 h-3.5 w-3.5" /> : <Camera className="mr-1.5 h-3.5 w-3.5" />}
                  {s.cameraOn ? "Stop Camera" : "Start Camera"}
                </Button>

                {s.isFullscreen ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 bg-black/60 text-white hover:bg-black"
                    onClick={exitFullscreen}
                  >
                    <Minimize className="mr-1.5 h-3.5 w-3.5" />
                    Exit Fullscreen
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="h-8 bg-primary hover:bg-primary/90 glow-primary"
                    onClick={enterFullscreen}
                  >
                    <Maximize className="mr-1.5 h-3.5 w-3.5" />
                    Start Fullscreen
                  </Button>
                )}
              </div>
            </div>

            {/* Slide Stage */}
            <div
              className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
                s.isFullscreen ? "h-full w-full rounded-none border-none" : "aspect-video w-full"
              )}
            >
              {currentSlide?.imageUrl ? (
                <div
                  key={s.slide + (s.zoomed ? "z" : "")}
                  className={cn(
                    "flex h-full w-full items-center justify-center transition-transform duration-500",
                    s.zoomed && "scale-125"
                  )}
                >
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div
                  key={s.slide + (s.zoomed ? "z" : "")}
                  className={cn(
                    "flex h-full w-full flex-col items-center justify-center p-12 text-center transition-transform duration-500",
                    s.zoomed && "scale-125"
                  )}
                >
                  <div className="mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Slide {s.slide} of {s.totalSlides}
                  </div>
                  <h1 className="gradient-text max-w-2xl text-4xl font-extrabold tracking-tight lg:text-5xl">
                    {currentSlide?.title}
                  </h1>
                  {currentSlide?.subtitle && (
                    <p className="mt-4 max-w-xl text-lg text-slate-300">
                      {currentSlide.subtitle}
                    </p>
                  )}
                  <div className="mt-8 h-1 w-24 rounded-full bg-primary/60" />
                </div>
              )}

              {/* Laser Pointer Dot */}
              {s.laserActive && (
                <div
                  className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/30 transition-all duration-300"
                  style={{ left: `${laserPoint.x}%`, top: `${laserPoint.y}%` }}
                >
                  <div className="absolute inset-1.5 rounded-full bg-red-500 shadow-[0_0_15px_#ff0000] animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-red-400" />
                </div>
              )}

              {/* Pause Screen Overlay */}
              {s.paused && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/20 text-warning">
                    <Pause className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white">Presentation Paused</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Hold ✊ Closed Fist to resume presentation
                  </p>
                </div>
              )}

              {/* Fullscreen Floating PiP Camera HUD */}
              {s.isFullscreen && showPiP && (
                <div className="glass pointer-events-auto absolute bottom-6 right-6 z-30 flex flex-col overflow-hidden rounded-2xl border border-primary/40 p-2 shadow-2xl backdrop-blur-xl">
                  <div className="mb-1.5 flex items-center justify-between px-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary">
                      <Radio className="h-3 w-3 animate-pulse" />
                      Gesture Tracker
                    </div>
                    <button
                      onClick={() => setShowPiP(false)}
                      className="text-xs text-muted-foreground hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div
                    ref={pipContainerRef}
                    className="h-28 w-44 overflow-hidden rounded-xl bg-slate-950 [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover"
                  />
                  {s.activeGesture && activeGestureMeta && (
                    <div className="mt-1.5 rounded-lg bg-primary/20 p-1 text-center text-[10px] font-bold text-primary animate-pulse">
                      {activeGestureMeta.emoji} {activeGestureMeta.action}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Presentation Controls Bar */}
            <div
              className={cn(
                "flex items-center justify-between",
                s.isFullscreen
                  ? "absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 hover:opacity-100 transition-opacity"
                  : "mt-4"
              )}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={s.prevSlide}
                  disabled={s.slide <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  onClick={s.nextSlide}
                  disabled={s.slide >= s.totalSlides}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="ml-2 text-xs font-semibold tabular-nums text-muted-foreground">
                  {s.slide} / {s.totalSlides}
                </span>
              </div>

              {/* Interactive Tools */}
              <div className="flex items-center gap-2">
                <Button
                  variant={s.laserActive ? "default" : "outline"}
                  size="sm"
                  onClick={s.toggleLaser}
                  className={cn("h-8", s.laserActive && "bg-destructive text-destructive-foreground")}
                >
                  🖐️ Laser
                </Button>
                <Button
                  variant={s.paused ? "default" : "outline"}
                  size="sm"
                  onClick={s.togglePause}
                  className={cn("h-8", s.paused && "bg-warning text-warning-foreground")}
                >
                  {s.paused ? <Play className="mr-1 h-3.5 w-3.5" /> : <Pause className="mr-1 h-3.5 w-3.5" />}
                  {s.paused ? "Resume" : "Pause"}
                </Button>
                <Button
                  variant={s.zoomed ? "default" : "outline"}
                  size="sm"
                  onClick={s.toggleZoom}
                  className={cn("h-8", s.zoomed && "bg-accent text-accent-foreground")}
                >
                  {s.zoomed ? <ZoomOut className="mr-1 h-3.5 w-3.5" /> : <ZoomIn className="mr-1 h-3.5 w-3.5" />}
                  Zoom
                </Button>
                {s.isFullscreen && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => setShowPiP(!showPiP)}
                  >
                    {showPiP ? <EyeOff className="mr-1 h-3.5 w-3.5" /> : <Eye className="mr-1 h-3.5 w-3.5" />}
                    PiP Camera
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Camera Preview, Upload Deck & Sample Decks */}
        <div className="space-y-6 lg:col-span-4">
          {/* Live Gesture Camera Feed Preview */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Radio className={cn("h-3 w-3", s.cameraOn ? "text-emerald-400 animate-pulse" : "text-muted-foreground")} />
                Live Camera Tracker
              </div>
              <span className="text-[10px] font-semibold text-primary">
                {s.cameraOn ? (s.handDetected ? `Hand Detected (${s.confidence}%)` : "Waiting for hand") : "Camera Off"}
              </span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/70 bg-slate-950">
              <div
                ref={previewCameraRef}
                className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:object-cover"
              />
              {!s.cameraOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <CameraOff className="h-8 w-8 text-muted-foreground/60" />
                  <p className="mt-2 text-xs text-muted-foreground">Camera is turned off</p>
                  <Button size="sm" className="mt-3 h-8 bg-emerald-600 hover:bg-emerald-500 text-white" onClick={s.startCamera}>
                    Start Camera
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-tight">Upload Slides</h3>
              <span className="text-[10px] text-muted-foreground">PDF / PPT / Images</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all",
                dragActive
                  ? "border-primary bg-primary/10 scale-[1.02]"
                  : "border-border/80 hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <div className="text-xs font-semibold text-primary">Converting slides...</div>
                </div>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <FileUp className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-xs font-semibold text-foreground">
                    Drop PDF / PowerPoint here
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    or click to browse from your computer
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Sample Decks */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Preloaded Presentation Decks
            </div>

            <div className="space-y-2.5">
              <button
                onClick={s.loadDefaultDeck}
                className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    ✨ AirSlide System Overview (12 slides)
                  </div>
                  <div className="text-[10px] text-muted-foreground">Default project deck</div>
                </div>
              </button>

              {SAMPLE_DECKS.map((d) => (
                <button
                  key={d.name}
                  onClick={() => s.setCustomDeck(d.slides)}
                  className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div>
                    <div className="text-xs font-semibold text-foreground">{d.name}</div>
                    <div className="text-[10px] text-muted-foreground">{d.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gestures Quick Reference */}
          <div className="glass rounded-2xl p-5">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Gesture Controls Cheat Sheet
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                <div className="text-base">✌️</div>
                <div className="font-semibold">Next Slide</div>
                <div className="text-[10px] text-muted-foreground">Peace sign</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                <div className="text-base">☝️</div>
                <div className="font-semibold">Prev Slide</div>
                <div className="text-[10px] text-muted-foreground">Point up</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                <div className="text-base">🖐️</div>
                <div className="font-semibold">Laser Pointer</div>
                <div className="text-[10px] text-muted-foreground">Open palm</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5">
                <div className="text-base">✊</div>
                <div className="font-semibold">Pause Screen</div>
                <div className="text-[10px] text-muted-foreground">Closed fist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
