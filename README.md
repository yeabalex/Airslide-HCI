# AirSlide

**Touch-Free Presentation Control using Hand Gestures**

AirSlide is a Human-Computer Interaction project that lets presenters control their slides using natural hand gestures detected through a standard webcam. No clicker, no keyboard, no returning to the laptop mid-sentence.

---

## Problem Statement

Presenters frequently break their flow to advance slides, pause, or switch tools. Traditional presentation remotes add hardware overhead, and touch-based controls require stepping away from the audience. AirSlide solves this by enabling hands-free control through intuitive hand gestures that map directly to presentation actions.

## Gestures

| Gesture | Emoji | Action | Description |
|---------|-------|--------|-------------|
| Swipe Right | 👉 | Next Slide | Wave hand to the right |
| Swipe Left | 👈 | Previous Slide | Wave hand to the left |
| Open Palm | 🖐️ | Laser Pointer | Hold open palm to activate |
| Closed Fist | ✊ | Pause / Resume | Make a fist to pause or resume |
| Pinch | 🤏 | Zoom In / Out | Pinch fingers to toggle zoom |

All gestures require a **0.7-second hold** to confirm, preventing accidental triggers during natural hand movements.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **TanStack Start** (React 19, SSR) |
| Routing | **TanStack Router** (file-based) |
| Hand Tracking | **MediaPipe HandLandmarker** via `@mediapipe/tasks-vision` |
| Styling | **Tailwind CSS 4** + shadcn/ui primitives |
| Build | **Vite** with Rolldown |
| Language | **TypeScript 5.8** |
| Icons | **Lucide React** |

---

## How It Works

### Gesture Recognition Pipeline

1. **Camera Access** - The app requests webcam access via `navigator.mediaDevices.getUserMedia()`.
2. **MediaPipe HandLandmarker** - Google's pre-trained hand tracking model runs in the browser (GPU-accelerated). It detects 21 landmarks per hand (finger tips, joints, palm base) on every video frame.
3. **Classification** - Based on the relative positions of the 21 landmarks, the app classifies the hand shape into one of the five gestures:
   - **Open Palm**: All five fingers extended upward
   - **Closed Fist**: All fingers curled inward
   - **Pinch**: Index finger tip close to thumb tip
   - **Swipe**: Detected through horizontal movement of the wrist landmark across frames
4. **Hold-to-Confirm** - Once a gesture is stable for 5 consecutive frames (~160ms), the confirmation ring starts filling over 700ms. This prevents accidental triggers and gives the presenter full control.
5. **Execution** - When the ring completes, the corresponding action executes (slide change, mode toggle, etc.) and a success checkmark appears for 1.4 seconds.
6. **Cooldown** - A 3-second cooldown prevents re-triggering, ensuring only deliberate gestures take effect.

### Architecture

```
Camera → MediaPipe HandLandmarker → Landmark Classification
                                          ↓
                                    Stable for 5 frames?
                                          ↓
                                   Hold-to-Confirm (700ms)
                                          ↓
                                    Execute Gesture
                                          ↓
                              Update State (slide, paused, zoom, laser)
                                          ↓
                             UI Re-renders (Presentation Preview, etc.)
```

**Key files:**

| File | Purpose |
|------|---------|
| `src/hooks/useHandTracking.ts` | Webcam lifecycle, MediaPipe integration, landmark drawing, gesture classification |
| `src/lib/airslide-store.tsx` | React Context provider - all app state, gesture execution, camera control |
| `src/components/airslide/CameraFeed.tsx` | Camera UI with canvas overlay showing landmarks |
| `src/components/airslide/GesturePanel.tsx` | Real-time gesture display with confirmation ring and confidence |
| `src/components/airslide/PresentationPreview.tsx` | Live slide preview that reacts to gesture commands |
| `src/components/airslide/ControlBar.tsx` | Start/Stop camera and calibration controls |
| `src/routes/gestures.tsx` | Gesture guide page with "Try gesture" demo buttons |

---

## Setup & Running

### Prerequisites

- Node.js 18+
- npm 9+
- A webcam (built-in or external)
- Modern browser (Chrome, Edge, or Firefox)

### Steps

```bash
# Clone the repository
git clone <repo-url>
cd airslide

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Building for Production

```bash
npm run build
npm run preview
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | **Dashboard** - Live overview with camera feed, gesture panel, presentation preview, and gesture history |
| `/live` | **Live Control** - Full-screen camera feed, gesture panel, and presentation preview |
| `/gestures` | **Gesture Guide** - Interactive guide showing all five gestures with demo buttons |
| `/settings` | **Settings** - Adjust confirmation time, sensitivity, animation speed, and sound effects |
| `/about` | **About** - Project background and HCI principles |

---

## Development Notes

### Making the Gestures Work (Real Camera Integration)

The original prototype used simulated gesture detection with mock confidence values and ambient flicker effects. To make gestures work with a real webcam:

#### Step 1: Install MediaPipe

```bash
npm install @mediapipe/tasks-vision
```

This package provides the `HandLandmarker` class which runs Google's pre-trained hand tracking model entirely in the browser using WebGL/WASM. No server-side processing needed.

#### Step 2: Create the Hand Tracking Hook

`src/hooks/useHandTracking.ts` manages:
- Creating/destroying `<video>` and `<canvas>` elements in a container ref
- Requesting camera access (`getUserMedia`) with start/stop lifecycle
- Initializing the MediaPipe HandLandmarker (model downloads from Google CDN on first load)
- Running a `requestAnimationFrame` loop that:
  - Draws the mirrored video frame onto a canvas
  - Calls `HandLandmarker.detectForVideo()` on each frame
  - Draws the 21 landmarks and skeleton connections on the canvas
  - Classifies the hand shape based on landmark positions
  - Tracks gesture stability (5 consecutive same-gesture frames)
  - Fires a callback when a stable gesture is detected

#### Step 3: Wire Detection to Execution

The `useHandTracking` hook accepts an `onGestureDetected` callback. The store (`airslide-store.tsx`) passes a handler that:
1. Checks the app isn't already confirming a gesture or showing success feedback
2. Calls `triggerGesture()` - starts the hold-to-confirm animation
3. When the animation completes, calls `executeGesture()` - updates app state

#### Step 4: Update CameraFeed

The camera component mounts `containerRef` from the hook, which owns both the hidden `<video>` and visible `<canvas>`. Grid overlays, corner brackets, and HUD elements remain as before for visual polish.

#### Step 5: Remove Mock Data

Removed the simulated confidence flicker interval, hardcoded `handDetected: true`, and the "Simulate gesture" buttons from GesturePanel.

### Why No External MediaPipe Parser Files

The `@mediapipe/tasks-vision` package includes the WASM runtime. The model itself (~10-15MB) is hosted on Google's CDN and downloaded once when the browser first loads the app. No additional file downloads or server setup needed.

---

## HCI Principles Applied

| Principle | Implementation |
|-----------|---------------|
| **Visibility of system status** | Live confidence bar, HAND indicator, confirmation ring, success checkmark |
| **Error prevention** | 700ms hold-to-confirm prevents accidental triggers |
| **Immediate feedback** | Every gesture shows real-time ring filling, then success confirmation |
| **Accessibility** | Keyboard cancel (Esc), high contrast, large emoji indicators |
| **User control** | Cancel gesture at any time, adjustable confirmation sensitivity |

---

## Limitations

- **MediaPipe model download** requires internet on first load (~10-15MB cached after that)
- **GPU requirement** - HandLandmarker uses WebGL; may fall back to CPU on older devices
- **Lighting sensitivity** - Hand detection works best in well-lit environments
- **Single hand** - Currently tracks one hand; no two-hand gestures

---

## License

Academic project - built for HCI coursework demonstration.
