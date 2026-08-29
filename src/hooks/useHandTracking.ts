import { useRef, useState, useEffect, useCallback } from "react";
import {
  GestureRecognizer,
  type GestureRecognizerResult,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export type ClassifiedGesture =
  | "swipe-right"
  | "swipe-left"
  | "open-palm"
  | "closed-fist"
  | "pinch"
  | null;

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

// Direct AI Gesture Mapping (Powered directly by Google's neural network)
function classifyGestureDirect(
  lm: { x: number; y: number; z: number }[],
  aiGestures?: { categoryName: string; score: number }[]
): { gesture: ClassifiedGesture; aiLabel: string; aiScore: number } {
  if (lm.length < 21) {
    return { gesture: null, aiLabel: "No Hand", aiScore: 0 };
  }

  const top = aiGestures?.[0];
  const aiLabel = top?.categoryName ?? "None";
  const aiScore = Math.round((top?.score ?? 0) * 100);

  // 1. Pinch Detection (Tip of thumb 4 to tip of index 8 distance vs palm scale)
  const palmScale = distance(lm[0], lm[9]) || 0.1;
  const pinchDist = distance(lm[4], lm[8]);
  const pinchRatio = pinchDist / palmScale;

  if (pinchRatio < 0.26) {
    return { gesture: "pinch", aiLabel: "Pinch (🤏)", aiScore: 95 };
  }

  // 2. Direct Google Neural Network Classification (Threshold: 60%+)
  if (top && top.score >= 0.60) {
    switch (top.categoryName) {
      case "Victory":
      case "Thumb_Up":
        return { gesture: "swipe-right", aiLabel: `${top.categoryName} (Next Slide)`, aiScore };

      case "Pointing_Up":
      case "Thumb_Down":
        return { gesture: "swipe-left", aiLabel: `${top.categoryName} (Prev Slide)`, aiScore };

      case "Open_Palm":
        return { gesture: "open-palm", aiLabel: "Open Palm (Laser)", aiScore };

      case "Closed_Fist":
        return { gesture: "closed-fist", aiLabel: "Closed Fist (Pause)", aiScore };
    }
  }

  return { gesture: null, aiLabel, aiScore };
}

const HAND_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [0, 9], [9, 10], [10, 11], [11, 12],
  [0, 13], [13, 14], [14, 15], [15, 16],
  [0, 17], [17, 18], [18, 19], [19, 20],
  [5, 9], [9, 13], [13, 17],
];

export function useHandTracking(
  onGestureDetected?: (g: ClassifiedGesture, pos?: { x: number; y: number }) => void
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognizerRef = useRef<GestureRecognizer | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Smart Cooldown: 2.0s for discrete actions, but ZERO cooldown for continuous Open Palm Laser!
  const cooldownUntilRef = useRef<number>(0);
  const wasPalmOpenRef = useRef<boolean>(false);
  const prevPalmYRef = useRef<number | null>(null);

  const onGestureRef = useRef(onGestureDetected);
  onGestureRef.current = onGestureDetected;

  const [handDetected, setHandDetected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [classifiedGesture, setClassifiedGesture] = useState<ClassifiedGesture>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [landmarkerReady, setLandmarkerReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const fileset = await FilesetResolver.forVisionTasks("/wasm");
        const recognizer = await GestureRecognizer.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: "/models/gesture_recognizer.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });
        if (!cancelled) {
          recognizerRef.current = recognizer;
          setLandmarkerReady(true);
        }
      } catch (err) {
        console.error("GestureRecognizer init failed:", err);
      }
    })();
    return () => {
      cancelled = true;
      recognizerRef.current?.close();
    };
  }, []);

  const buildElements = useCallback(() => {
    // Ensure video element exists in memory & DOM for video decoding
    let video = videoRef.current;
    if (!video) {
      video = document.createElement("video");
      video.setAttribute("playsinline", "");
      video.setAttribute("autoplay", "");
      video.muted = true;
      video.style.position = "fixed";
      video.style.top = "-9999px";
      video.style.left = "-9999px";
      video.style.width = "1px";
      video.style.height = "1px";
      video.style.opacity = "0";
      document.body.appendChild(video);
      videoRef.current = video;
    }

    // Ensure canvas exists for rendering & visualization
    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.style.display = "block";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvasRef.current = canvas;
    }

    if (containerRef.current && !containerRef.current.contains(canvas)) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(canvas);
    }
  }, []);

  const attachCanvasToContainer = useCallback((container: HTMLDivElement | null) => {
    containerRef.current = container;
    if (container && canvasRef.current && !container.contains(canvasRef.current)) {
      container.innerHTML = "";
      container.appendChild(canvasRef.current);
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      buildElements();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play();
      }
      setIsCameraOn(true);
      setHandDetected(false);
      setConfidence(0);
      cooldownUntilRef.current = 0;
      wasPalmOpenRef.current = false;
      prevPalmYRef.current = null;
    } catch (err) {
      console.error("Camera error:", err);
      setIsCameraOn(false);
    }
  }, [buildElements]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    cancelAnimationFrame(rafRef.current);
    setIsCameraOn(false);
    setHandDetected(false);
    setConfidence(0);
    setClassifiedGesture(null);
    cooldownUntilRef.current = 0;
    wasPalmOpenRef.current = false;
    prevPalmYRef.current = null;
    if (containerRef.current) containerRef.current.innerHTML = "";
  }, []);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const recognizer = recognizerRef.current;
    if (!video || !canvas || !recognizer) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }
    if (video.readyState < 2) {
      rafRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, -canvas.width, canvas.height);
    ctx.restore();

    try {
      const now = performance.now();
      const result: GestureRecognizerResult = recognizer.recognizeForVideo(video, now);

      if (result.landmarks && result.landmarks.length > 0 && result.landmarks[0].length >= 21) {
        const lm = result.landmarks[0];
        setHandDetected(true);
        const handScore = result.handedness?.[0]?.[0]?.score ?? 0.9;
        setConfidence(Math.round(handScore * 100));

        // Mirrored coordinates for display
        const mirrored = lm.map((p) => ({ x: 1 - p.x, y: p.y, z: p.z }));
        const palmY = (lm[0].y + lm[9].y) / 2;

        // Position of palm center for laser pointer
        const handPosX = Math.max(5, Math.min(95, mirrored[9].x * 100));
        const handPosY = Math.max(5, Math.min(95, mirrored[9].y * 100));
        setPointerPos({ x: handPosX, y: handPosY });

        // Check if hand is moving downwards rapidly (lowering hand)
        let isLoweringHand = false;
        if (prevPalmYRef.current !== null) {
          const dy = palmY - prevPalmYRef.current;
          if (dy > 0.04) {
            isLoweringHand = true;
          }
        }
        prevPalmYRef.current = palmY;

        const inCooldown = now < cooldownUntilRef.current;

        // Draw glowing neon skeleton on canvas
        ctx.strokeStyle = inCooldown ? "oklch(0.75 0.18 55 / 0.85)" : "oklch(0.72 0.16 250 / 0.85)";
        ctx.fillStyle = inCooldown ? "oklch(0.75 0.18 55)" : "oklch(0.72 0.16 250)";
        ctx.lineWidth = 2.5;

        for (const [i, j] of HAND_CONNECTIONS) {
          ctx.beginPath();
          ctx.moveTo(mirrored[i].x * canvas.width, mirrored[i].y * canvas.height);
          ctx.lineTo(mirrored[j].x * canvas.width, mirrored[j].y * canvas.height);
          ctx.stroke();
        }

        for (const point of mirrored) {
          ctx.beginPath();
          ctx.arc(point.x * canvas.width, point.y * canvas.height, 4, 0, 2 * Math.PI);
          ctx.fill();
        }

        // Direct AI Classification
        const aiGestures = result.gestures?.[0];
        const { gesture, aiLabel, aiScore } = classifyGestureDirect(lm, aiGestures);

        // Real-Time HUD Overlay directly on the camera preview
        ctx.fillStyle = "oklch(0.15 0.03 260 / 0.8)";
        ctx.fillRect(10, 10, 280, 32);
        ctx.fillStyle = inCooldown
          ? "oklch(0.75 0.18 55)"
          : gesture
            ? "oklch(0.75 0.22 145)"
            : "oklch(0.85 0.05 260)";
        ctx.font = "bold 12px sans-serif";

        if (gesture === "open-palm") {
          // 🖐️ OPEN PALM (LASER POINTER): Stream continuously with 0s cooldown!
          wasPalmOpenRef.current = true;
          setClassifiedGesture("open-palm");
          ctx.fillText("🖐️ Laser Pointer (Live Stream)", 20, 30);
          onGestureRef.current?.("open-palm", { x: handPosX, y: handPosY });
        } else {
          // If presenter just dropped / closed their open palm, enter safety cooldown
          if (wasPalmOpenRef.current) {
            wasPalmOpenRef.current = false;
            cooldownUntilRef.current = now + 1500;
            onGestureRef.current?.(null);
          }

          if (inCooldown) {
            ctx.fillText("⏳ Cooldown: Lower hand to rest", 20, 30);
            setClassifiedGesture(null);
          } else {
            ctx.fillText(`AI: ${aiLabel} (${aiScore}%)`, 20, 30);

            if (isLoweringHand) {
              setClassifiedGesture(null);
            } else if (gesture) {
              // Discrete Actions (Peace ✌️, Point ☝️, Fist ✊, Pinch 🤏): Instant trigger + 2.0s cooldown!
              cooldownUntilRef.current = now + 2000;
              setClassifiedGesture(gesture);
              onGestureRef.current?.(gesture, { x: handPosX, y: handPosY });
            } else {
              setClassifiedGesture(null);
            }
          }
        }
      } else {
        if (wasPalmOpenRef.current) {
          wasPalmOpenRef.current = false;
          onGestureRef.current?.(null);
        }
        setHandDetected(false);
        setConfidence(0);
        setClassifiedGesture(null);
        prevPalmYRef.current = null;
      }
    } catch {
      // frame skipped
    }

    rafRef.current = requestAnimationFrame(processFrame);
  }, []);

  useEffect(() => {
    if (isCameraOn && landmarkerReady) {
      rafRef.current = requestAnimationFrame(processFrame);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isCameraOn, landmarkerReady, processFrame]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return {
    containerRef,
    videoRef,
    canvasRef,
    handDetected,
    confidence,
    classifiedGesture,
    pointerPos,
    isCameraOn,
    landmarkerReady,
    startCamera,
    stopCamera,
    attachCanvasToContainer,
  };
}
