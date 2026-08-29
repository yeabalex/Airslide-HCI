# AirSlide 🖐️✨

**Touch-Free Presentation Control Using Hand Gestures**

AirSlide is a Human-Computer Interaction (HCI) project that lets presenters control their slide decks using natural hand gestures captured through any standard webcam. No hardware clickers, no standing next to the laptop, and no awkward interruptions during your talk.

---

## 🎯 Key Features

- **✌️ Touch-Free Gesture Navigation:** Advance or reverse slides, activate laser pointers, pause, and zoom using natural hand shapes.
- **📁 Present Your Own Decks (PDF / PowerPoint / Images):** Drag and drop your `.pdf`, `.pptx` (exported to PDF), or slide images to present immediately.
- **🖥️ Native Fullscreen Presentation Mode:** Edge-to-edge presentation canvas with background gesture recognition and an optional floating Picture-in-Picture (PiP) camera HUD.
- **⚡ Instant Trigger + 2.0s Safety Cooldown:** Actions execute immediately on the first detected frame (0ms delay), followed by a 2-second refractory lockout so you can naturally rest your arms on the podium with **zero accidental triggers**.
- **🖐️ Continuous Laser Pointer:** Open your palm to beam an animated laser pointer that follows your hand coordinates across the screen in real-time.
- **🔒 100% Client-Side & Private:** Powered by Google's MediaPipe via local WebAssembly—no video or data ever leaves your device.

---

## 🕹️ Supported Gestures

| Gesture | Pose | Action | Execution Model |
|:---|:---:|:---|:---|
| **Peace Sign** | ✌️ (2 fingers) | **Next Slide** | Instant 0ms trigger + 2.0s safe resting cooldown |
| **Point Up** | ☝️ (1 finger) | **Previous Slide** | Instant 0ms trigger + 2.0s safe resting cooldown |
| **Open Palm** | 🖐️ (5 fingers) | **Laser Pointer** | Continuous live coordinate stream (0s interruption) |
| **Closed Fist** | ✊ (0 fingers) | **Pause / Blackout** | Instant 0ms trigger + 2.0s safe resting cooldown |
| **Pinch** | 🤏 (Thumb + Index) | **Zoom In / Out** | Instant 0ms trigger + 2.0s safe resting cooldown |

> **Why Static Poses?** Waving or swiping arms across the webcam often triggers accidental slide turns while talking normally. By mapping navigation to distinct finger count shapes (Peace Sign, Point Up), AirSlide eliminates conversational false triggers.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| **Routing** | [TanStack Router](https://tanstack.com/router) (type-safe file routing) |
| **Vision AI** | Google [MediaPipe Tasks-Vision](https://developers.google.com/mediapipe) (`GestureRecognizer`) |
| **PDF Rendering** | [pdfjs-dist](https://mozilla.github.io/pdf.js/) (100% client-side PDF rasterization) |
| **PDF Generation** | [pdf-lib](https://pdf-lib.js.org/) (Course report generator) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + shadcn/ui components |
| **Language** | TypeScript 5.8 |
| **Build Tool** | Vite |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- A built-in or USB webcam
- A modern browser (Chrome, Edge, Safari, or Firefox)

### Installation & Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/yeabalex/Airslide-HCI.git
cd Airslide-HCI

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 📖 Application Views

- **`/present` (Present Deck):** Upload your PDF/PowerPoint slides, launch edge-to-edge Fullscreen mode, and control slides hands-free with the floating PiP camera tracker.
- **`/live` (Live Control):** Real-time gesture testing lab showing hand skeleton overlays, confidence meters, and event logs.
- **`/gestures` (Gesture Guide):** Interactive visual guide explaining the 5 gesture shapes and their design rationale.
- **`/report` (HCI Project Report):** Full academic course project report with an in-app downloadable PDF (`AirSlide_HCI_Report.pdf`).
- **`/settings` (Settings):** Configure sensitivity, audio feedback, and system preferences.
- **`/members` (Team):** Group members and project contributions.

---

## 🧠 Human-Computer Interaction (HCI) Design

AirSlide was built following established HCI principles:

1. **Don Norman's Action Cycle:**
   - *Gulf of Execution:* Solved by self-explanatory finger counts (1 finger = back, 2 fingers = next).
   - *Gulf of Evaluation:* Solved by real-time skeleton overlays, on-screen confidence scores (e.g. `AI: Victory 95%`), and active laser dots.
2. **Motor Ergonomics (Preventing "Gorilla Arm" Fatigue):** Sustained mid-air gesturing causes shoulder strain. AirSlide's 2.0-second cooldown lets presenters raise a hand for just a fraction of a second and immediately rest on the table.
3. **Solving the "Midas Touch" Dilemma:** Eliminates false triggers caused by speaking with hands through downward motion suppression and refractory lockouts.
4. **Nielsen's Usability Heuristics:**
   - *Visibility of system status* (Real-time HUD)
   - *Match with real world* (Universal pointing and counting metaphors)
   - *User control and freedom* (Multi-modal interaction with keyboard fallbacks)
   - *Error prevention* (Refractory lockouts and motion filters)

---

## 👥 Authors & Academic Context

Developed as an HCI Course Project for **HiLCoE School of Computer Science and Technology** (July 2026):

- **Nafyad Fantaye**
- **Yeabsira Alemu**
- **Ezana Tadesse**
- **Zerubabel Fekadu**

---

## 📄 License

Academic Coursework Project &middot; Open Source under the MIT License.
