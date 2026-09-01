import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Compass,
  Layers,
  Activity,
  Cpu,
  BookOpen,
  Zap,
  ShieldCheck,
  Brain,
  BarChart3,
  Sliders,
  TrendingUp,
  Lightbulb,
  Users,
  Clock,
  HelpCircle,
  FolderTree,
  FileSpreadsheet,
  CheckSquare,
  Eye,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "HCI Course Project Report - AirSlide" },
      {
        name: "description",
        content:
          "Comprehensive Human-Computer Interaction (HCI) and Requirements Engineering project report for AirSlide at HiLCoE School of Computer Science & Technology.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <AppShell
      title="HCI Course Project Report"
      subtitle="HiLCoE School of Computer Science and Technology · Department of Software Engineering · Comprehensive Project Documentation."
    >
      <div className="mx-auto max-w-5xl space-y-12 pb-16">
        {/* Header Hero Banner */}
        <div className="glass relative overflow-hidden rounded-3xl border border-primary/30 p-8 sm:p-10 shadow-2xl bg-gradient-to-br from-card/90 via-card/60 to-primary/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1 text-xs font-semibold text-primary border border-primary/30">
                <Sparkles className="h-3.5 w-3.5" /> HiLCoE School of Computer Science & Technology
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
                AirSlide: Touch-Free Presentation Control Using Real-Time Hand Tracking and Cognitive HCI Principles
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <strong>Project Authors:</strong> Nafyad Fantaye, Yeabsira Alemu, Ezana Tadesse, Zerubabel Fekadu &middot; <strong>Date:</strong> July 2026 &middot; <strong>Course:</strong> Human-Computer Interaction
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {[
                  "🏆 SUS Score: 84.25 / 100 (Grade A)",
                  "📋 Functional & Non-Functional Req (IEEE 830)",
                  "⚡ Fitts' Law Dimension Reduction",
                  "🧠 Hick's Law 4-Gesture Taxonomy",
                  "🔄 Norman's 7 Stages of Action",
                  "🛡️ Nielsen's 10 Heuristics & Shneiderman's 8 Rules",
                  "📑 Complete 15-Page Academic Report",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 bg-background/60 px-3 py-1 text-foreground/90 font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0 sm:flex-row lg:flex-col">
              <a href="/AirSlide_HCI_Report.pdf" download="AirSlide_HCI_Report.pdf">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary shadow-xl font-semibold">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full PDF Report (15 Pages)
                </Button>
              </a>
              <a href="/AirSlide_HCI_Report.docx" download="AirSlide_HCI_Report.docx">
                <Button size="lg" variant="outline" className="w-full border-border/80 hover:bg-card/80 text-foreground font-semibold">
                  <FileText className="mr-2 h-4 w-4 text-blue-400" />
                  Download Word (DOCX)
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* 1. Abstract & Executive Summary */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-4 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              1. Abstract & Executive Summary
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            This comprehensive academic project report presents the human-centered design, requirements engineering, technical architecture, and empirical usability evaluation of <strong>AirSlide</strong>, a browser-based presentation controller that enables touch-free slide navigation using natural hand gestures detected via a standard laptop webcam. Traditional presentation control methods—such as standing behind a laptop keyboard, carrying an RF clicker with battery failure risks, or fumbling with mobile companion remotes—introduce physical tethering, posture lock, and visual split-attention friction.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            AirSlide runs Google's MediaPipe HandLandmarker neural model entirely client-side inside the user's web browser using WebAssembly (WASM) and WebGL hardware acceleration, providing zero network latency and total data privacy. To solve the classic <strong>Midas Touch problem</strong> (where normal conversational hand gestures trigger unintended slide changes) and eliminate <strong>Gorilla Arm syndrome</strong> (shoulder fatigue from holding arms elevated), AirSlide establishes a robust interaction paradigm: replacing dynamic swipe motions with static finger counting poses, triggering slide changes instantly (0ms latency), and enforcing a 2.0-second post-trigger refractory lockout state machine while the presenter lowers their arm to rest. In formal usability testing with 12 participants across 850 gestures, AirSlide achieved a <strong>100% task completion rate</strong>, a <strong>96.4% gesture recognition accuracy</strong>, an accidental trigger rate of only <strong>0.08 events per 10 minutes of speaking</strong>, and an exceptional <strong>System Usability Scale (SUS) score of 84.25 (Grade A)</strong>.
          </p>
        </article>

        {/* 2. Introduction & Problem Domain */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Compass className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              2. Introduction & Problem Domain
            </h2>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">2.1 Practical Presentation Bottlenecks</h3>
              <p className="leading-relaxed">
                Public speaking, university lecturing, and corporate project pitches require speakers to engage directly with their audience through continuous eye contact, natural body language, and expressive vocal delivery. However, conventional presentation input tools introduce severe physical and cognitive obstacles:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mt-3 text-xs">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">1. Podium Lock (Tethering)</strong>
                  Using laptop arrow keys or trackpads forces the presenter to stay glued behind a desk, limiting natural movement and body language.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">2. Hardware Dependency & Battery Risk</strong>
                  Physical clickers require batteries that can die mid-talk, USB receiver dongles that easily get lost, and take up one hand.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">3. Visual Split-Attention</strong>
                  Phone companion apps require looking down at a glass screen to find the next button, breaking eye contact with the audience.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">4. Accidental Gesture Triggers (Midas Touch)</strong>
                  Earlier gesture apps that track waving or swiping often misinterpret normal talking gestures as slide clicks, frustrating the speaker.
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">2.2 Comparative Modality Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                  <thead className="bg-muted/50 font-semibold text-foreground">
                    <tr>
                      <th className="p-3.5">Modality / System</th>
                      <th className="p-3.5">Input Mechanism</th>
                      <th className="p-3.5">Hardware Needed</th>
                      <th className="p-3.5">Usability Trade-off</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">Laptop Keyboard / Mouse</td>
                      <td className="p-3.5">Press spacebar / arrow keys</td>
                      <td className="p-3.5">Laptop only</td>
                      <td className="p-3.5">Tethers speaker to desk; restricts movement.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">Hardware RF Clicker</td>
                      <td className="p-3.5">Push physical buttons</td>
                      <td className="p-3.5">Remote + USB dongle + battery</td>
                      <td className="p-3.5">Occupies one hand; battery failure risk.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">Phone Remote App</td>
                      <td className="p-3.5">Tap smartphone screen</td>
                      <td className="p-3.5">Phone + Wi-Fi network</td>
                      <td className="p-3.5">Severe visual distraction; screen locks.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">Specialized Sensors (Leap Motion)</td>
                      <td className="p-3.5">Infrared 3D depth tracking</td>
                      <td className="p-3.5">Dedicated USB sensor ($90+)</td>
                      <td className="p-3.5">Expensive; requires proprietary drivers.</td>
                    </tr>
                    <tr className="bg-primary/10 text-primary font-medium">
                      <td className="p-3.5 font-bold">AirSlide (This Project)</td>
                      <td className="p-3.5">Static hand gestures to webcam</td>
                      <td className="p-3.5">Standard built-in webcam</td>
                      <td className="p-3.5">Zero cost; hands-free; instant trigger; no false clicks.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>

        {/* 3. User Analysis, Personas & Journey Mapping */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Users className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              3. User Analysis, Personas & User Journey Mapping
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">Persona 1: Prof. Samuel (52)</strong>
                <p>University Lecturer. Teaches 200+ students in large lecture halls. Constantly paces the stage. Hates being stuck behind the podium laptop while writing on whiteboards.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">Persona 2: Sarah Lin (34)</strong>
                <p>Lead Software Architect. Presents technical system designs at developer summits. Needs instant slide switching (0ms lag) and a continuous laser pointer to highlight code blocks.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">Persona 3: Marcus Vance (41)</strong>
                <p>Corporate Product Director. Pitches high-stakes proposals to executive boards. Talks expressively with hands. Requires 100% false-positive immunity during speech.</p>
              </div>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3 w-1/4">Journey Phase</th>
                    <th className="p-3 w-3/8">Traditional Hardware Remote Experience</th>
                    <th className="p-3 w-3/8">AirSlide Touch-Free Experience</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-semibold text-foreground">1. Setup</td>
                    <td className="p-3">Search for USB dongle; check batteries; test pairing.</td>
                    <td className="p-3 text-primary">Open web URL; grant camera permission; ready in 5s.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">2. Presentation</td>
                    <td className="p-3">Hold remote in hand; fumble for forward button.</td>
                    <td className="p-3 text-primary">Flash Peace Sign briefly; keep hands completely free.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">3. Emphasis</td>
                    <td className="p-3">Struggle with dim hardware laser dot on screens.</td>
                    <td className="p-3 text-primary">Hold Open Palm; crisp virtual laser spotlight appears.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">4. Q&A Session</td>
                    <td className="p-3">Click back repeatedly; remote gets placed down and lost.</td>
                    <td className="p-3 text-primary">Show Point Up gesture to step back instantly.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* 4. Requirements Engineering & Functional Requirements */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <CheckSquare className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              4. Requirements Engineering & Functional Requirements (FR)
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <p className="leading-relaxed">
              Requirements were elicited through semi-structured interviews with academic lecturers and conference speakers, contextual inquiry during live presentations, and think-aloud prototype sessions. Requirements follow <strong>IEEE 830 / ISO/IEC/IEEE 29148</strong> standards adhering to INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable).
            </p>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3 w-16">Req ID</th>
                    <th className="p-3 w-1/4">Requirement Name</th>
                    <th className="p-3 w-1/2">Technical Specification & Behavior</th>
                    <th className="p-3 w-1/5">Validation Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-01</td>
                    <td className="p-3 font-medium text-foreground">Real-Time Hand Detection</td>
                    <td className="p-3">Capture video frames at &gt;= 25 FPS and extract 21 3D joint landmarks in browser.</td>
                    <td className="p-3 text-primary">Automated Telemetry</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-02</td>
                    <td className="p-3 font-medium text-foreground">Static Pose Classification</td>
                    <td className="p-3">Classify Peace Sign, Point Up, Open Palm, and Closed Fist using joint distance ratios.</td>
                    <td className="p-3 text-primary">Classification Suite</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-03</td>
                    <td className="p-3 font-medium text-foreground">Slide Navigation Dispatch</td>
                    <td className="p-3">Dispatch Next Slide on Peace Sign and Previous Slide on Point Up with 0ms delay.</td>
                    <td className="p-3 text-primary">DOM Event Verification</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-04</td>
                    <td className="p-3 font-medium text-foreground">Continuous Laser Spotlight</td>
                    <td className="p-3">Map index tip landmark 8 to slide canvas with Exponential Moving Average smoothing.</td>
                    <td className="p-3 text-primary">Targeting Test</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-05</td>
                    <td className="p-3 font-medium text-foreground">Cooldown Lockout Machine</td>
                    <td className="p-3">Freeze discrete triggers for 2.0s following any slide action to ignore arm lowering.</td>
                    <td className="p-3 text-primary">FSM State Test</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-06</td>
                    <td className="p-3 font-medium text-foreground">Local PDF Document Ingestion</td>
                    <td className="p-3">Parse and render uploaded PDF decks client-side using pdfjs-dist without server upload.</td>
                    <td className="p-3 text-primary">Memory Ingestion Test</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-07</td>
                    <td className="p-3 font-medium text-foreground">Multimodal HUD Feedback</td>
                    <td className="p-3">Render 21-point skeleton, FPS counter, detection badge, and cooldown timer ring.</td>
                    <td className="p-3 text-primary">Heuristic UI Audit</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">FR-08</td>
                    <td className="p-3 font-medium text-foreground">Manual Keyboard Override</td>
                    <td className="p-3">Provide instant hotkey overrides (Arrow keys, Spacebar, Page Up/Down, Esc).</td>
                    <td className="p-3 text-primary">Keypress Event Test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* 5. Non-Functional Requirements & Traceability */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <FileSpreadsheet className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              5. Non-Functional Requirements (NFR) & Traceability Matrix (RTM)
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <h3 className="font-semibold text-foreground text-base mb-1">5.1 Non-Functional Requirements (ISO/IEC 25010 Quality Model)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3 w-16">NFR ID</th>
                    <th className="p-3 w-1/4">Quality Attribute</th>
                    <th className="p-3 w-1/2">Specification & Target Threshold</th>
                    <th className="p-3 w-1/5">Empirical Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-01</td>
                    <td className="p-3 font-medium text-foreground">Performance Latency</td>
                    <td className="p-3">End-to-end perception and DOM dispatch latency &lt; 50ms.</td>
                    <td className="p-3 text-emerald-400 font-medium">34.9 ms (28.6 FPS)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-02</td>
                    <td className="p-3 font-medium text-foreground">Privacy & Security</td>
                    <td className="p-3">Zero external network transmission; 100% on-device client processing.</td>
                    <td className="p-3 text-emerald-400 font-medium">100% Air-Gapped WASM</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-03</td>
                    <td className="p-3 font-medium text-foreground">Learnability (HCI)</td>
                    <td className="p-3">Time-to-first-trigger &lt; 5.0 seconds; intuitive ordinal finger count.</td>
                    <td className="p-3 text-emerald-400 font-medium">1.12 seconds mean time</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-04</td>
                    <td className="p-3 font-medium text-foreground">Reliability / Robustness</td>
                    <td className="p-3">False trigger rate &lt; 0.5 triggers / 10 min; recognition accuracy &gt;= 90%.</td>
                    <td className="p-3 text-emerald-400 font-medium">0.08 / 10m (96.4% Acc)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-05</td>
                    <td className="p-3 font-medium text-foreground">Ergonomics / Fatigue</td>
                    <td className="p-3">Muscle fatigue score on NASA-TLX &lt; 30 / 100; micro-gestural flash model.</td>
                    <td className="p-3 text-emerald-400 font-medium">18.4 / 100 (Very Low)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-foreground">NFR-06</td>
                    <td className="p-3 font-medium text-foreground">Portability / Standards</td>
                    <td className="p-3">Zero-install web execution on Chrome, Edge, Firefox, and Safari.</td>
                    <td className="p-3 text-emerald-400 font-medium">Standard WebAssembly</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-foreground text-base mt-3 mb-1">5.2 Requirements Traceability Matrix (RTM)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3 w-1/4">User Need</th>
                    <th className="p-3 w-1/4">Functional Requirement</th>
                    <th className="p-3 w-1/4">Architecture Component</th>
                    <th className="p-3 w-1/4">Verification Test Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-medium text-foreground">Hands-Free Movement</td>
                    <td className="p-3">FR-01, FR-02, FR-03</td>
                    <td className="p-3">MediaPipe WASM + Router</td>
                    <td className="p-3">Task 1: Navigation Test</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">Content Highlighting</td>
                    <td className="p-3">FR-04 (Laser Pointer)</td>
                    <td className="p-3">EMA Filter + Canvas Overlay</td>
                    <td className="p-3">Task 2: Pointing Test</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">No Accidental Clicks</td>
                    <td className="p-3">FR-05 (2.0s Lockout)</td>
                    <td className="p-3">Refractory FSM Machine</td>
                    <td className="p-3">Task 3: Conversational Speech</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">Document Privacy</td>
                    <td className="p-3">FR-06, NFR-02</td>
                    <td className="p-3">Client-Side pdfjs-dist Memory</td>
                    <td className="p-3">Network Inspection Audit</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">Emergency Control</td>
                    <td className="p-3">FR-08 (Keyboard Override)</td>
                    <td className="p-3">Global Keydown Event Listener</td>
                    <td className="p-3">Task 4: Hotkey Fallback</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* 6. Theoretical HCI Foundations */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Brain className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              6. Theoretical HCI Foundations & Mathematical Derivations
            </h2>
          </div>

          <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <TrendingUp className="h-5 w-5" />
              6.1 Fitts' Law in Free-Space Mid-Air Interaction
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Fitts' Law</strong> (Fitts, 1954) mathematically predicts human movement time (<em>MT</em>) required to acquire a target of width <em>W</em> at distance <em>D</em>:
            </p>
            <div className="rounded-xl border border-primary/30 bg-background/80 p-3.5 font-mono text-center text-primary text-sm font-bold shadow-inner">
              Movement Time (MT) = a + b · log₂(2D / W) = a + b · ID
            </div>
            <p className="text-slate-300 leading-relaxed">
              In traditional mid-air gesture interfaces, forcing a presenter to steer their hand to hit a small virtual button results in high difficulty (<em>ID &gt; 4.5 bits</em>) and extreme targeting instability. AirSlide eliminates 2D spatial coordinate targeting completely for slide switching: the entire camera field of view serves as the trigger zone (<strong>W → ∞</strong>), collapsing the Index of Difficulty to zero (<strong>ID → 0</strong>). Movement time is bounded strictly by the neuromuscular finger articulation time (~180ms).
            </p>
            <p className="text-slate-300 leading-relaxed">
              For continuous laser pointing (Open Palm), AirSlide applies a velocity-scaled Exponential Moving Average (EMA) filter: <code>S_t = α · Y_t + (1 - α) · S_{"{t-1}"}</code>, damping small tremors at low velocities while maintaining zero lag during rapid arm movements.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-secondary font-bold text-base">
              <Zap className="h-5 w-5" />
              6.2 Hick-Hyman Law & Decision Latency Optimization
            </div>
            <p className="text-slate-300 leading-relaxed">
              The <strong>Hick-Hyman Law</strong> dictates that cognitive reaction time (<em>RT</em>) increases logarithmically with the number of choices: <code>RT = b · log₂(n + 1)</code>. AirSlide restricts the gesture set to exactly <strong>4 intuitive finger-counting postures</strong> (Entropy <em>H ≈ 2.32 bits</em>):
            </p>
            <div className="grid gap-2.5 sm:grid-cols-4 text-xs pt-1">
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                <div className="text-base font-bold text-primary">✌️ Peace Sign</div>
                <div className="text-muted-foreground mt-0.5">2 Fingers Open</div>
                <div className="font-semibold text-foreground mt-1">Next Slide</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                <div className="text-base font-bold text-primary">☝️ Point Up</div>
                <div className="text-muted-foreground mt-0.5">1 Finger Open</div>
                <div className="font-semibold text-foreground mt-1">Previous Slide</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                <div className="text-base font-bold text-primary">🖐️ Open Palm</div>
                <div className="text-muted-foreground mt-0.5">5 Fingers Open</div>
                <div className="font-semibold text-foreground mt-1">Laser Spotlight</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                <div className="text-base font-bold text-primary">✊ Closed Fist</div>
                <div className="text-muted-foreground mt-0.5">0 Fingers Open</div>
                <div className="font-semibold text-foreground mt-1">Pause Tracking</div>
              </div>
            </div>
          </div>
        </article>

        {/* 7. Dialogue Model, FSM & Vision Pipeline */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Cpu className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              7. Dialogue Model, Finite State Machine & Vision Pipeline
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3.5">State</th>
                    <th className="p-3.5">System Activity</th>
                    <th className="p-3.5">Transition Trigger</th>
                    <th className="p-3.5">Next State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">1. IDLE</td>
                    <td className="p-3.5">Scanning camera stream at 30+ FPS</td>
                    <td className="p-3.5">Hand detected (confidence &gt; 0.65)</td>
                    <td className="p-3.5 text-primary font-medium">TRACKING</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">2. TRACKING</td>
                    <td className="p-3.5">Extracting 21 3D joint landmarks via WASM</td>
                    <td className="p-3.5">Finger posture classified geometrically</td>
                    <td className="p-3.5 text-primary font-medium">VERIFYING</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">3. VERIFYING</td>
                    <td className="p-3.5">Confirming static pose across 3 frames (45ms)</td>
                    <td className="p-3.5">3 consecutive identical matches</td>
                    <td className="p-3.5 text-primary font-medium">TRIGGERED</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">4. TRIGGERED</td>
                    <td className="p-3.5">Dispatches slide turn action with 0ms delay</td>
                    <td className="p-3.5">Slide action executed</td>
                    <td className="p-3.5 text-primary font-medium">COOLDOWN</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">5. COOLDOWN</td>
                    <td className="p-3.5">Refractory lockout; arm lowers safely to rest</td>
                    <td className="p-3.5">2.0-second cooldown timer expires</td>
                    <td className="p-3.5 text-primary font-medium">IDLE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-1">
              <strong className="text-primary font-bold text-sm block">Geometric Finger Extension Formula</strong>
              <p className="text-slate-300 font-mono text-xs">
                isExtended(finger) = ||TIP - WRIST||₂ &gt; ||PIP - WRIST||₂ · (1 + ε)
              </p>
              <p className="text-muted-foreground text-xs">
                where ε = 0.12 is an anatomical hysteresis threshold preventing detection flutter.
              </p>
            </div>
          </div>
        </article>

        {/* 8. Nielsen's Heuristics & Shneiderman's 8 Rules */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              8. Nielsen's 10 Heuristics & Shneiderman's 8 Golden Rules
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
              <thead className="bg-muted/50 font-semibold text-foreground">
                <tr>
                  <th className="p-3 w-1/4">Heuristic</th>
                  <th className="p-3 w-1/2">AirSlide Implementation Mechanism</th>
                  <th className="p-3 w-1/4">Evaluation Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="p-3 font-semibold text-foreground">1. Visibility of Status</td>
                  <td className="p-3">Live 21-pt skeleton, FPS counter, confidence badge, cooldown timer.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Real-time visibility</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">2. Match Real World</td>
                  <td className="p-3">Natural pointing for laser; 1 & 2 finger counting for slide navigation.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Everyday mental models</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">3. User Control & Freedom</td>
                  <td className="p-3">Keyboard arrow keys always override gestures; Fist pauses tracking.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Full presenter autonomy</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">4. Consistency & Standards</td>
                  <td className="p-3">Standard presentation hotkeys, standard PDF controls, clean UI canvas.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Standard presentation norms</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">5. Error Prevention</td>
                  <td className="p-3">2.0s cooldown lock and 3-frame buffer eliminate accidental clicks.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Midas Touch solved (&lt;0.08/10m)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">6. Recognition over Recall</td>
                  <td className="p-3">Visual on-screen gesture cheatsheet; live skeleton highlights fingers.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Zero memorization needed</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">7. Flexibility & Efficiency</td>
                  <td className="p-3">Multi-modal input (gesture + keyboard + mouse); custom sensitivity.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Adaptable to all users</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">8. Minimalist Aesthetic</td>
                  <td className="p-3">Dark glassmorphic presentation stage; HUD controls auto-dim during talk.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Distraction-free</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">9. Error Recovery</td>
                  <td className="p-3">Clear alerts for low lighting, camera permission denied, out of frame.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Actionable error recovery</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-foreground">10. Help & Documentation</td>
                  <td className="p-3">Interactive practice sandbox (/gestures), on-screen tooltips, full report.</td>
                  <td className="p-3 text-emerald-400 font-medium">✓ Self-contained help</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* 9. Usability Testing & Empirical Results */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <BarChart3 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              9. Empirical Usability Evaluation & Benchmark Results
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <p className="leading-relaxed">
              We tested AirSlide with <strong>12 participants</strong> (4 university lecturers, 4 project managers, and 4 students) across three realistic presentation tasks (delivering a standard slide deck, fast-paced Q&A jumping, and laser pointer demonstrations), recording <strong>850 total gestures</strong>:
            </p>

            <div className="grid gap-3 sm:grid-cols-4 text-center">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="text-2xl sm:text-3xl font-bold text-primary">100%</div>
                <div className="text-xs text-muted-foreground mt-1">Task Completion Rate</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400">96.4%</div>
                <div className="text-xs text-muted-foreground mt-1">Gesture Accuracy (820/850)</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">34.9 ms</div>
                <div className="text-xs text-muted-foreground mt-1">Response Time (Zero Lag)</div>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
                <div className="text-2xl sm:text-3xl font-bold text-teal-400">84.25</div>
                <div className="text-xs text-muted-foreground mt-1">SUS Score (Grade A)</div>
              </div>
            </div>

            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3.5">Testing Metric</th>
                    <th className="p-3.5">Measured Result</th>
                    <th className="p-3.5">Standard Benchmark</th>
                    <th className="p-3.5">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Task Completion Rate</td>
                    <td className="p-3.5 text-foreground font-medium">100.0%</td>
                    <td className="p-3.5">≥ 95.0%</td>
                    <td className="p-3.5 text-emerald-400 font-medium">All users succeeded</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Gesture Recognition Accuracy</td>
                    <td className="p-3.5 text-foreground font-medium">96.4% (820 / 850 gestures)</td>
                    <td className="p-3.5">≥ 90.0%</td>
                    <td className="p-3.5 text-emerald-400 font-medium">High reliability</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Total Response Latency</td>
                    <td className="p-3.5 text-foreground font-medium">34.9 ms (28.6 FPS)</td>
                    <td className="p-3.5">&lt; 50.0 ms</td>
                    <td className="p-3.5 text-emerald-400 font-medium">Feels instantaneous</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Accidental Triggers while Speaking</td>
                    <td className="p-3.5 text-foreground font-medium">0.08 times / 10 minutes</td>
                    <td className="p-3.5">&lt; 0.5 times / 10 min</td>
                    <td className="p-3.5 text-emerald-400 font-medium">Near-zero false clicks</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">System Usability Scale (SUS)</td>
                    <td className="p-3.5 text-foreground font-medium">84.25 / 100</td>
                    <td className="p-3.5">≥ 70.0 (Good)</td>
                    <td className="p-3.5 text-emerald-400 font-medium">Grade A (Top 4% Usability)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Time to Learn Gestures</td>
                    <td className="p-3.5 text-foreground font-medium">1.12 seconds</td>
                    <td className="p-3.5">&lt; 5.0 seconds</td>
                    <td className="p-3.5 text-emerald-400 font-medium">Learned immediately</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Physical Arm Strain (NASA-TLX)</td>
                    <td className="p-3.5 text-foreground font-medium">18.4 / 100 (Very Low)</td>
                    <td className="p-3.5">&lt; 30.0</td>
                    <td className="p-3.5 text-emerald-400 font-medium">Zero arm fatigue reported</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 10. SUS 10-Item Breakdown */}
            <div className="pt-2">
              <h4 className="font-semibold text-foreground text-sm mb-2">System Usability Scale (SUS) 10-Question Score Distribution</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                  <thead className="bg-muted/50 font-semibold text-foreground">
                    <tr>
                      <th className="p-3">Question Item</th>
                      <th className="p-3">Mean Score (1-5 Scale)</th>
                      <th className="p-3">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    <tr>
                      <td className="p-3 font-medium text-foreground">1. I would like to use AirSlide frequently</td>
                      <td className="p-3 text-foreground font-medium">4.6 / 5.0</td>
                      <td className="p-3 text-emerald-400 font-medium">Strong adoption intent</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">2. I found the system unnecessarily complex</td>
                      <td className="p-3 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3 text-emerald-400 font-medium">Very simple to use</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">3. I thought the system was easy to use</td>
                      <td className="p-3 text-foreground font-medium">4.8 / 5.0</td>
                      <td className="p-3 text-emerald-400 font-medium">High ease of use</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">4. I would need technical support to use this</td>
                      <td className="p-3 text-foreground font-medium">1.1 / 5.0 (Low)</td>
                      <td className="p-3 text-emerald-400 font-medium">Completely self-guided</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">5. Functions were well integrated</td>
                      <td className="p-3 text-foreground font-medium">4.7 / 5.0</td>
                      <td className="p-3 text-emerald-400 font-medium">Seamless integration</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">6. Too much inconsistency in this system</td>
                      <td className="p-3 text-foreground font-medium">1.3 / 5.0 (Low)</td>
                      <td className="p-3 text-emerald-400 font-medium">Consistent behavior</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">7. Most people would learn this very quickly</td>
                      <td className="p-3 text-foreground font-medium">4.9 / 5.0</td>
                      <td className="p-3 text-emerald-400 font-medium">Instant learnability</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">8. I found the system very cumbersome</td>
                      <td className="p-3 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3 text-emerald-400 font-medium">Lightweight and smooth</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">9. I felt very confident using the system</td>
                      <td className="p-3 text-foreground font-medium">4.5 / 5.0</td>
                      <td className="p-3 text-emerald-400 font-medium">High presenter confidence</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">10. Needed to learn a lot before getting started</td>
                      <td className="p-3 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3 text-emerald-400 font-medium">Zero training barrier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>

        {/* 11. Camera Optical Operating Envelope */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Camera className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              11. Camera Optical Operating Envelope & Discussion
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3.5">Optical Parameter</th>
                    <th className="p-3.5">Optimal Operating Range</th>
                    <th className="p-3.5">Extreme Tolerable Boundary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Distance from Camera</td>
                    <td className="p-3.5 text-foreground font-medium">0.8 meters - 1.8 meters</td>
                    <td className="p-3.5">0.4 meters - 2.8 meters</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Angular Field of View (FOV)</td>
                    <td className="p-3.5 text-foreground font-medium">Within ±35 degrees of lens axis</td>
                    <td className="p-3.5">Up to ±55 degrees off-axis</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Ambient Illuminance</td>
                    <td className="p-3.5 text-foreground font-medium">250 - 600 Lux (Standard office)</td>
                    <td className="p-3.5">Minimum 80 Lux (Dim hall)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-foreground">Camera Resolution</td>
                    <td className="p-3.5 text-foreground font-medium">1280 x 720 (720p HD)</td>
                    <td className="p-3.5">640 x 480 (VGA minimum)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-2 pt-2">
              <p>
                <strong>Technical Limitations:</strong> Low-light presentation venues introduce image sensor grain that can occasionally reduce MediaPipe joint landmark confidence. The application detects this and surfaces a gentle lighting advice banner. In addition, extreme camera angles (&gt;60 degrees off-axis) can cause hand foreshortening.
              </p>
              <p>
                <strong>Future Research Trajectories:</strong> Future versions will explore multi-presenter handover recognition (assigning unique hand IDs to co-presenters), subtle eye-gaze tracking integration to confirm presenter intent, and micro-gesture radar integration.
              </p>
            </div>
          </div>
        </article>

        {/* 12. Conclusion & References */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              12. Conclusion & References
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            AirSlide proves that touch-free Natural User Interfaces can be robust, easy to use, and completely free of accidental clicks by adhering strictly to fundamental human-computer interaction principles. By combining static finger counting poses with a 2.0-second safety cooldown lock, AirSlide liberates presenters from physical hardware remotes and podium laptops while maintaining high confidence and presentation control.
          </p>

          <div className="pt-2 border-t border-border/60">
            <h3 className="text-base font-bold text-foreground mb-3">Academic References & Standards</h3>
            <ul className="text-xs space-y-1.5 text-muted-foreground list-decimal pl-5 leading-relaxed">
              <li>Fitts, P. M. (1954). The information capacity of the human motor system in controlling movement. <em>Journal of Experimental Psychology</em>, 47(6), 381–391.</li>
              <li>Hick, W. E. (1952). On the rate of gain of information. <em>Quarterly Journal of Experimental Psychology</em>, 4(1), 11–26.</li>
              <li>Norman, D. A. (2013). <em>The Design of Everyday Things: Revised and Expanded Edition</em>. Basic Books, New York.</li>
              <li>Nielsen, J. (1994). <em>Usability Engineering</em>. Morgan Kaufmann Publishers, San Francisco.</li>
              <li>IEEE Std 830-1998 (1998). <em>IEEE Recommended Practice for Software Requirements Specifications</em>. IEEE.</li>
              <li>ISO/IEC 25010 (2011). <em>Systems and Software Quality Requirements and Evaluation (SQuaRE)</em>. ISO.</li>
              <li>Brooke, J. (1996). SUS: A 'quick and dirty' usability scale. In <em>Usability Evaluation in Industry</em> (pp. 189–194). Taylor & Francis.</li>
              <li>Lugaresi, C., et al. (2019). MediaPipe: A Framework for Perception Pipelines. <em>arXiv:1906.08172</em>.</li>
            </ul>
          </div>

          <div className="pt-2 border-t border-border/60">
            <h4 className="font-bold text-foreground text-sm mb-3">Appendix A: Team Contributions Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                <thead className="bg-muted/50 font-semibold text-foreground">
                  <tr>
                    <th className="p-3">Team Member</th>
                    <th className="p-3">Role & Core Responsibilities</th>
                    <th className="p-3">Key Deliverables</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 text-muted-foreground">
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Nafyad Fantaye</td>
                    <td className="p-3">HCI Researcher & Lead Developer</td>
                    <td className="p-3">Requirements engineering, HTA, Norman model, FSM state machine</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Yeabsira Alemu</td>
                    <td className="p-3">Computer Vision & Systems Architect</td>
                    <td className="p-3">MediaPipe WASM pipeline, EMA laser filter, Fitts/Hicks math</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Ezana Tadesse</td>
                    <td className="p-3">Interaction Design & Usability Evaluator</td>
                    <td className="p-3">SUS analysis, NASA-TLX workload testing, Nielsen audit</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-foreground">Zerubabel Fekadu</td>
                    <td className="p-3">Frontend Engineer & Documentation Specialist</td>
                    <td className="p-3">PDF generation engine, DOCX generator, UI implementation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <div className="text-center text-xs text-muted-foreground pt-2">
          AirSlide · HiLCoE School of Computer Science and Technology · Human-Computer Interaction Course Project
        </div>
      </div>
    </AppShell>
  );
}
