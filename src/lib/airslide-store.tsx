import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useHandTracking, type ClassifiedGesture } from "@/hooks/useHandTracking";

export type GestureId =
  | "swipe-right"
  | "swipe-left"
  | "open-palm"
  | "closed-fist"
  | "pinch";

export type SystemMode = "listening" | "laser" | "paused" | "zoom";

export interface GestureMeta {
  id: GestureId;
  label: string;
  action: string;
  emoji: string;
  description: string;
}

export interface SlideData {
  id: string;
  type: "default" | "image" | "custom";
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
}

export const DEFAULT_SLIDES: SlideData[] = [
  { id: "1", type: "default", title: "Welcome to AirSlide", subtitle: "Touch-Free Presentation Control" },
  { id: "2", type: "default", title: "The Problem", subtitle: "Presenters interrupt their flow to change slides." },
  { id: "3", type: "default", title: "The Solution", subtitle: "Natural hand gestures via any webcam." },
  { id: "4", type: "default", title: "How It Works", subtitle: "Detect · Confirm · Execute" },
  { id: "5", type: "default", title: "Supported Gestures", subtitle: "Five intuitive movements." },
  { id: "6", type: "default", title: "Gesture Confirmation", subtitle: "0.7s hold prevents accidents." },
  { id: "7", type: "default", title: "Feedback Loop", subtitle: "Visibility of system status." },
  { id: "8", type: "default", title: "Accessibility", subtitle: "Keyboard, contrast & tooltips." },
  { id: "9", type: "default", title: "Live Demo", subtitle: "See it in action." },
  { id: "10", type: "default", title: "User Study", subtitle: "94% task success rate." },
  { id: "11", type: "default", title: "Roadmap", subtitle: "What's next." },
  { id: "12", type: "default", title: "Thank You", subtitle: "Questions?" },
];

export const GESTURES: Record<GestureId, GestureMeta> = {
  "swipe-right": {
    id: "swipe-right",
    label: "Peace Sign",
    action: "Next Slide",
    emoji: "✌️",
    description: "Hold up 2 fingers (Peace Sign) to advance to the next slide.",
  },
  "swipe-left": {
    id: "swipe-left",
    label: "Point Up",
    action: "Previous Slide",
    emoji: "☝️",
    description: "Hold up 1 index finger to go back to the previous slide.",
  },
  "open-palm": {
    id: "open-palm",
    label: "Open Palm",
    action: "Laser Pointer",
    emoji: "🖐️",
    description: "Hold all 5 fingers open to activate the on-screen laser pointer.",
  },
  "closed-fist": {
    id: "closed-fist",
    label: "Closed Fist",
    action: "Pause / Resume",
    emoji: "✊",
    description: "Hold a closed fist to pause or resume the presentation.",
  },
  pinch: {
    id: "pinch",
    label: "Pinch",
    action: "Zoom In / Out",
    emoji: "🤏",
    description: "Pinch thumb and index together to zoom in or out.",
  },
};

export interface HistoryItem {
  id: string;
  gesture: GestureId;
  time: number;
  status: "executed" | "cancelled";
}

interface AirSlideState {
  cameraOn: boolean;
  handDetected: boolean;
  systemMode: SystemMode;
  confidence: number;

  activeGesture: GestureId | null;
  progress: number;
  lastExecuted: GestureId | null;
  showSuccess: boolean;

  slides: SlideData[];
  slide: number;
  totalSlides: number;
  zoomed: boolean;
  paused: boolean;
  laserActive: boolean;
  isFullscreen: boolean;

  confirmationMs: number;
  sensitivity: number;
  animationSpeed: number;
  soundEffects: boolean;
  language: string;

  history: HistoryItem[];
}

interface AirSlideContextValue extends AirSlideState {
  toggleCamera: () => void;
  startCamera: () => void;
  stopCamera: () => void;
  triggerGesture: (g: GestureId) => void;
  cancelGesture: () => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (n: number) => void;
  setCustomDeck: (slides: SlideData[]) => void;
  loadDefaultDeck: () => void;
  togglePause: () => void;
  toggleLaser: () => void;
  toggleZoom: () => void;
  setIsFullscreen: (v: boolean) => void;
  setSetting: <K extends keyof AirSlideState>(k: K, v: AirSlideState[K]) => void;
  restoreDefaults: () => void;
  handTracking: ReturnType<typeof useHandTracking>;
}

const AirSlideContext = createContext<AirSlideContextValue | null>(null);

const DEFAULTS = {
  confirmationMs: 650,
  sensitivity: 75,
  animationSpeed: 60,
  soundEffects: true,
  language: "English",
};

export function AirSlideProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AirSlideState>({
    cameraOn: false,
    handDetected: false,
    systemMode: "listening",
    confidence: 0,
    activeGesture: null,
    progress: 0,
    lastExecuted: null,
    showSuccess: false,
    slides: DEFAULT_SLIDES,
    slide: 1,
    totalSlides: DEFAULT_SLIDES.length,
    zoomed: false,
    paused: false,
    laserActive: false,
    isFullscreen: false,
    history: [],
    ...DEFAULTS,
  });

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const cancelledRef = useRef(false);
  const triggerGestureRef = useRef<((g: GestureId) => void) | null>(null);

  const executeGesture = useCallback((g: GestureId) => {
    setState((s) => {
      const next: Partial<AirSlideState> = {
        activeGesture: null,
        progress: 0,
        lastExecuted: g,
        showSuccess: true,
      };
      switch (g) {
        case "swipe-right":
          next.slide = Math.min(s.totalSlides, s.slide + 1);
          next.systemMode = "listening";
          next.laserActive = false;
          break;
        case "swipe-left":
          next.slide = Math.max(1, s.slide - 1);
          next.systemMode = "listening";
          next.laserActive = false;
          break;
        case "open-palm":
          next.systemMode = "laser";
          next.laserActive = true;
          next.paused = false;
          break;
        case "closed-fist":
          next.paused = !s.paused;
          next.systemMode = !s.paused ? "paused" : "listening";
          next.laserActive = false;
          break;
        case "pinch":
          next.zoomed = !s.zoomed;
          next.systemMode = !s.zoomed ? "zoom" : "listening";
          break;
      }
      return {
        ...s,
        ...next,
        history: [
          { id: crypto.randomUUID(), gesture: g, time: Date.now(), status: "executed" as const },
          ...s.history,
        ].slice(0, 20),
      } as AirSlideState;
    });
    setTimeout(() => {
      setState((s) => ({ ...s, showSuccess: false }));
    }, 1800);
  }, []);

  const handleClassifiedGesture = useCallback(
    (g: ClassifiedGesture) => {
      if (g === "open-palm") {
        setState((s) => ({
          ...s,
          laserActive: true,
          systemMode: "laser",
          paused: false,
        }));
        return;
      }
      if (g === null) {
        setState((s) => (s.laserActive ? { ...s, laserActive: false, systemMode: "listening" } : s));
        return;
      }
      if (!g || state.activeGesture || state.showSuccess) return;
      triggerGestureRef.current?.(g);
    },
    [state.activeGesture, state.showSuccess]
  );

  const handTracking = useHandTracking(handleClassifiedGesture);

  // Sync hand tracking data into state
  useEffect(() => {
    setState((s) => ({
      ...s,
      handDetected: handTracking.handDetected,
      confidence: handTracking.confidence || (handTracking.isCameraOn ? 90 : 0),
    }));
  }, [handTracking.handDetected, handTracking.confidence, handTracking.isCameraOn]);

  const cancelGesture = useCallback(() => {
    cancelledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState((s) =>
      s.activeGesture
        ? {
            ...s,
            history: [
              {
                id: crypto.randomUUID(),
                gesture: s.activeGesture,
                time: Date.now(),
                status: "cancelled" as const,
              },
              ...s.history,
            ].slice(0, 20),
            activeGesture: null,
            progress: 0,
          }
        : s
    );
  }, []);

  const triggerGesture = useCallback(
    (g: GestureId) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      cancelledRef.current = false;
      executeGesture(g);
    },
    [executeGesture]
  );
  triggerGestureRef.current = triggerGesture;

  const startCamera = useCallback(async () => {
    await handTracking.startCamera();
    setState((s) => ({ ...s, cameraOn: true, handDetected: true }));
  }, [handTracking]);

  const stopCamera = useCallback(() => {
    handTracking.stopCamera();
    setState((s) => ({
      ...s,
      cameraOn: false,
      handDetected: false,
      activeGesture: null,
      progress: 0,
      laserActive: false,
    }));
  }, [handTracking]);

  const toggleCamera = useCallback(() => {
    if (state.cameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [state.cameraOn, startCamera, stopCamera]);

  const nextSlide = useCallback(
    () => setState((s) => ({ ...s, slide: Math.min(s.totalSlides, s.slide + 1) })),
    []
  );
  const prevSlide = useCallback(
    () => setState((s) => ({ ...s, slide: Math.max(1, s.slide - 1) })),
    []
  );
  const setSlide = useCallback(
    (n: number) =>
      setState((s) => ({
        ...s,
        slide: Math.max(1, Math.min(s.totalSlides, n)),
      })),
    []
  );

  const setCustomDeck = useCallback((newSlides: SlideData[]) => {
    setState((s) => ({
      ...s,
      slides: newSlides,
      totalSlides: newSlides.length,
      slide: 1,
    }));
  }, []);

  const loadDefaultDeck = useCallback(() => {
    setState((s) => ({
      ...s,
      slides: DEFAULT_SLIDES,
      totalSlides: DEFAULT_SLIDES.length,
      slide: 1,
    }));
  }, []);

  const togglePause = useCallback(
    () => setState((s) => ({ ...s, paused: !s.paused, systemMode: !s.paused ? "paused" : "listening" })),
    []
  );
  const toggleLaser = useCallback(
    () => setState((s) => ({ ...s, laserActive: !s.laserActive, systemMode: !s.laserActive ? "laser" : "listening" })),
    []
  );
  const toggleZoom = useCallback(
    () => setState((s) => ({ ...s, zoomed: !s.zoomed, systemMode: !s.zoomed ? "zoom" : "listening" })),
    []
  );
  const setIsFullscreen = useCallback(
    (v: boolean) => setState((s) => ({ ...s, isFullscreen: v })),
    []
  );

  const setSetting = useCallback(
    <K extends keyof AirSlideState>(k: K, v: AirSlideState[K]) => {
      setState((s) => ({ ...s, [k]: v }));
    },
    []
  );

  const restoreDefaults = useCallback(() => {
    setState((s) => ({ ...s, ...DEFAULTS }));
  }, []);

  // Keyboard: Esc cancels confirmation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancelGesture();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cancelGesture]);

  const value = useMemo<AirSlideContextValue>(
    () => ({
      ...state,
      toggleCamera,
      startCamera,
      stopCamera,
      triggerGesture,
      cancelGesture,
      nextSlide,
      prevSlide,
      setSlide,
      setCustomDeck,
      loadDefaultDeck,
      togglePause,
      toggleLaser,
      toggleZoom,
      setIsFullscreen,
      setSetting,
      restoreDefaults,
      handTracking,
    }),
    [
      state,
      toggleCamera,
      startCamera,
      stopCamera,
      triggerGesture,
      cancelGesture,
      nextSlide,
      prevSlide,
      setSlide,
      setCustomDeck,
      loadDefaultDeck,
      togglePause,
      toggleLaser,
      toggleZoom,
      setIsFullscreen,
      setSetting,
      restoreDefaults,
      handTracking,
    ]
  );

  return <AirSlideContext.Provider value={value}>{children}</AirSlideContext.Provider>;
}

export function useAirSlide() {
  const ctx = useContext(AirSlideContext);
  if (!ctx) throw new Error("useAirSlide must be used within AirSlideProvider");
  return ctx;
}
