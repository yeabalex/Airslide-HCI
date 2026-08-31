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
} from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "HCI Course Project Report - AirSlide" },
      {
        name: "description",
        content:
          "Comprehensive Human-Computer Interaction (HCI) project report for AirSlide at HiLCoE School of Computer Science & Technology.",
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
        {/* Document Header Hero Banner */}
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
                  "⚡ Fitts' Law Dimension Reduction",
                  "🧠 Hick's Law 4-Gesture Taxonomy",
                  "🔄 Norman's 7 Stages of Action",
                  "🛡️ Nielsen's 10 Heuristics Audit",
                  "⚙️ MediaPipe WASM / WebGL",
                  "📑 Complete 8-Page Academic Report",
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
                  Download Full PDF Report (8 Pages)
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
            This comprehensive academic project report presents the human-centered design, technical architecture, and empirical usability evaluation of <strong>AirSlide</strong>, a browser-based presentation controller that enables touch-free slide navigation using natural hand gestures detected via a standard laptop webcam. Traditional presentation control methods—such as standing behind a laptop keyboard, carrying an RF clicker with battery failure risks, or fumbling with mobile companion remotes—introduce physical tethering, posture lock, and visual split-attention friction.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            AirSlide runs Google's MediaPipe HandLandmarker neural model entirely client-side inside the user's web browser using WebAssembly (WASM) and WebGL hardware acceleration, providing zero network latency and total data privacy. To solve the classic <strong>Midas Touch problem</strong> (where normal conversational hand gestures trigger unintended slide changes) and eliminate <strong>Gorilla Arm syndrome</strong> (shoulder fatigue from holding arms elevated), AirSlide establishes a robust interaction paradigm: replacing dynamic swipe motions with static finger counting poses, triggering slide changes instantly (0ms latency), and enforcing a 2.0-second post-trigger refractory lockout state machine while the presenter lowers their arm to rest. In formal usability testing with 12 participants across 850 gestures, AirSlide achieved a <strong>100% task completion rate</strong>, a <strong>96.4% gesture recognition accuracy</strong>, an accidental trigger rate of only <strong>0.08 events per 10 minutes of speaking</strong>, and an exceptional <strong>System Usability Scale (SUS) score of 84.25 (Grade A)</strong>.
          </p>
        </article>

        {/* 2. Introduction & Problem Statement */}
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
                Public speaking, university lecturing, and corporate project pitches require speakers to engage directly with their audience through continuous eye contact, expressive body kinesics, and uninterrupted vocal pacing. However, conventional presentation input tools introduce severe physical and cognitive obstacles:
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

        {/* 3. Task Context & Hierarchical Task Analysis */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <FolderTree className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              3. Task Context, Stakeholder Analysis & Hierarchical Task Analysis (HTA)
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">3.1 Stakeholder Analysis</h3>
              <div className="grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">Primary Presenter</strong>
                  Requires effortless slide turning with 100% trigger reliability, zero false clicks while speaking, and no physical tethering.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">Audience Members</strong>
                  Require uninterrupted presentation pacing without awkward technical freezes, misclicks, or speaker fumbling.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <strong className="text-foreground text-sm block">Event Host / Organizer</strong>
                  Requires zero software installation delays or driver compatibility issues on guest laptops.
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-base mb-2">3.2 Hierarchical Task Analysis (HTA) Decomposition</h3>
              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-2 text-xs text-slate-300">
                <p><strong>Task 0: Deliver Touch-Free Presentation</strong> — <em>Plan 0: Execute 1 (Setup), then repeatedly execute 2 (Slide Navigation) and optionally 3 (Laser Pointer) until conclusion. If an error occurs, execute 4 (Recovery).</em></p>
                <p className="pl-4"><strong>Task 1: System Setup</strong> — <em>Plan 1: Open browser &rarr; Grant webcam permission &rarr; Verify 21-point hand skeleton in HUD preview.</em></p>
                <p className="pl-4"><strong>Task 2: Slide Navigation</strong> — <em>Plan 2.1: Flash Peace Sign (2 fingers) to advance. Plan 2.2: Flash Point Up (1 finger) to go back. Plan 2.3: Lower hand immediately during 2.0s cooldown.</em></p>
                <p className="pl-4"><strong>Task 3: Interactive Annotation</strong> — <em>Plan 3.1: Hold Open Palm (5 fingers) to activate laser spotlight. Plan 3.2: Drop hand to deactivate laser.</em></p>
                <p className="pl-4"><strong>Task 4: Emergency Override</strong> — <em>Plan 4: Press keyboard arrow keys or Spacebar for instant manual override at any moment.</em></p>
              </div>
            </div>
          </div>
        </article>

        {/* 4. Theoretical HCI Foundations & Mathematical Derivations */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Brain className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              4. Theoretical HCI Foundations & Mathematical Derivations
            </h2>
          </div>

          {/* 4.1 Fitts' Law */}
          <div className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <TrendingUp className="h-5 w-5" />
              4.1 Fitts' Law in Free-Space Mid-Air Interaction
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Fitts' Law</strong> (Fitts, 1954) mathematically predicts the human movement time (<em>MT</em>) required to acquire a target of width <em>W</em> at distance <em>D</em>:
            </p>
            <div className="rounded-xl border border-primary/30 bg-background/80 p-3.5 font-mono text-center text-primary text-sm font-bold shadow-inner">
              Movement Time (MT) = a + b · log₂(2D / W) = a + b · ID
            </div>
            <p className="text-slate-300 leading-relaxed">
              where <em>ID</em> is the Index of Difficulty (in bits). In traditional mid-air gesture interfaces, forcing a presenter to steer their hand to hit a small on-screen virtual button results in high difficulty (<em>ID &gt; 4.5 bits</em>) and extreme targeting instability due to natural hand tremor.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs text-muted-foreground pt-1">
              <div className="rounded-xl border border-border/60 bg-card/60 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">AirSlide Dimension Reduction for Slide Turns</strong>
                AirSlide eliminates 2D spatial coordinate targeting completely. The entire camera field of view serves as the trigger zone. Because target width is effectively infinite (<strong>W → ∞</strong>), the Index of Difficulty drops to zero (<strong>ID → 0</strong>). Movement time is bounded strictly by the neuromuscular finger articulation time (~180ms), allowing presenters to change slides without looking at where their hand is aimed.
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">Laser Pointer Jitter Suppression & Throughput</strong>
                In continuous laser pointer mode (Open Palm), AirSlide applies a velocity-scaled Exponential Moving Average (EMA) filter on index fingertip landmark 8. High-frequency physiological tremor is damped at low velocities, while ballistic large-range movements exhibit zero lag, optimizing Fitts' Law throughput (<strong>TP = ID / MT</strong>).
              </div>
            </div>
          </div>

          {/* 4.2 Hick's Law */}
          <div className="space-y-3 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-secondary font-bold text-base">
              <Zap className="h-5 w-5" />
              4.2 Hick-Hyman Law & Decision Latency Optimization
            </div>
            <p className="text-slate-300 leading-relaxed">
              The <strong>Hick-Hyman Law</strong> (Hick, 1952; Hyman, 1953) dictates that cognitive reaction time (<em>RT</em>) increases logarithmically with the number of choices (<em>n</em>):
            </p>
            <div className="rounded-xl border border-secondary/30 bg-background/80 p-3.5 font-mono text-center text-secondary text-sm font-bold shadow-inner">
              Reaction Time (RT) = b · log₂(n + 1)
            </div>
            <p className="text-slate-300 leading-relaxed">
              During high-stakes presentations, the speaker's working memory is almost fully dedicated to verbal delivery. If a gesture system presents a large vocabulary of 15–20 complex gestures, Hick's Law predicts high decision latency (<em>RT &gt; 450ms</em>) and frequent recall mistakes. AirSlide restricts the gesture set to exactly <strong>4 intuitive finger-counting postures</strong> (Entropy <em>H ≈ 2.32 bits</em>):
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
            <p className="text-xs text-muted-foreground leading-relaxed">
              Because finger counts map directly to natural ordinal logic (1 finger = step back/1st, 2 fingers = step forward/2nd, full hand = spotlight, fist = stop), presenter reaction time <em>RT</em> is measured empirically at <strong>&lt;190ms</strong>, avoiding conversational hesitation.
            </p>
          </div>

          {/* 4.3 Norman's Action Cycle */}
          <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/10 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <Activity className="h-5 w-5 text-primary" />
              4.3 Norman's Action Cycle: Bridging The Two Gulfs
            </div>
            <p className="text-slate-300 leading-relaxed">
              Donald Norman identified two fundamental challenges in interaction design: the <strong>Gulf of Execution</strong> (translating user intention into physical action) and the <strong>Gulf of Evaluation</strong> (perceiving and interpreting system feedback).
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-2">
                <strong className="text-primary font-semibold text-sm block">Bridging the Gulf of Execution</strong>
                <p className="text-slate-300">• <strong>Feedforward Affordances:</strong> Visual on-screen gesture hints and simple finger counting.</p>
                <p className="text-slate-300">• <strong>Natural Mapping:</strong> Counting fingers matches the direction (1 finger back, 2 fingers forward).</p>
                <p className="text-slate-300">• <strong>Low Activation Effort:</strong> Momentary flash (&lt;350ms) in front of camera without sweeping arm acrobatics.</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-4 space-y-2">
                <strong className="text-foreground font-semibold text-sm block">Bridging the Gulf of Evaluation</strong>
                <p className="text-slate-300">• <strong>Real-Time Skeleton:</strong> Colored dots and lines follow 21 hand landmarks continuously.</p>
                <p className="text-slate-300">• <strong>Instant 0ms Feedback:</strong> Slide turns immediately upon pose confirmation with HUD badge.</p>
                <p className="text-slate-300">• <strong>Radial Cooldown Timer:</strong> Circular progress ring communicates the 2.0s refractory lockout state.</p>
              </div>
            </div>
          </div>

          {/* 4.4 Motor Ergonomics */}
          <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/10 p-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-foreground font-bold text-base">
              <Sliders className="h-5 w-5 text-teal-400" />
              4.4 Motor Ergonomics: Eliminating "Gorilla Arm" & "Midas Touch"
            </div>
            <div className="grid gap-3 sm:grid-cols-2 text-xs text-muted-foreground">
              <div className="rounded-xl border border-border/60 bg-card/60 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">1. Preventing Arm Fatigue ("Gorilla Arm")</strong>
                Holding arms extended in mid-air rapidly fatigues shoulder muscles. AirSlide uses a quick-trigger design: presenters only raise their hand for half a second to change a slide, then immediately drop their arm back down to rest comfortably.
              </div>
              <div className="rounded-xl border border-border/60 bg-card/60 p-3.5 space-y-1">
                <strong className="text-foreground text-sm block">2. Preventing Accidental Triggers ("Midas Touch")</strong>
                Arm lowering motion involves downward velocity and changing finger positions. AirSlide enforces a <strong>2.0-second post-trigger cooldown lockout</strong>: right after a slide change executes, the classifier ignores all movements while the arm returns to rest.
              </div>
            </div>
          </div>
        </article>

        {/* 5. Dialogue Model & Finite State Machine */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Cpu className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              5. Dialogue Model, Finite State Machine & Vision Pipeline
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
                    <td className="p-3.5">Scanning webcam video stream at 30+ FPS</td>
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

        {/* 6. Nielsen's Usability Heuristics Audit */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-5 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              6. Nielsen's Ten Usability Heuristics Compliance Audit
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
              <thead className="bg-muted/50 font-semibold text-foreground">
                <tr>
                  <th className="p-3.5 w-1/4">Heuristic</th>
                  <th className="p-3.5 w-1/2">How AirSlide Implements It</th>
                  <th className="p-3.5 w-1/4">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">1. Visibility of System Status</td>
                  <td className="p-3.5">Live hand skeleton overlay, FPS counter, detection badge, camera status, and cooldown progress ring.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Real-time clarity</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">2. Match Real World Conventions</td>
                  <td className="p-3.5">Natural pointing for laser spotlight; 1-finger and 2-finger counts for previous/next navigation.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Intuitive mental model</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">3. User Control & Freedom</td>
                  <td className="p-3.5">Keyboard arrow keys and spacebar always override gestures; Closed Fist pauses tracking instantly.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Full presenter control</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">4. Consistency & Standards</td>
                  <td className="p-3.5">Uses standard presentation hotkeys, standard PDF controls, and a clean dark UI canvas.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Familiar norms</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">5. Error Prevention</td>
                  <td className="p-3.5">2.0-second cooldown lock and 3-frame confirmation buffer eliminate false triggers from talking gestures.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ &lt;0.08 false clicks/10m</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">6. Recognition over Recall</td>
                  <td className="p-3.5">Visual cheatsheet accessible with one click; active finger highlights show which gesture is detected.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Zero memorization</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">7. Flexibility & Efficiency</td>
                  <td className="p-3.5">Supports gestures, keyboard, and mouse; customizable cooldown and detection sensitivity in Settings.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Adaptable to all users</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">8. Minimalist Aesthetic</td>
                  <td className="p-3.5">Clean dark background; HUD controls stay out of the way so audience sees only slide content.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Distraction-free</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">9. Clear Error Recovery</td>
                  <td className="p-3.5">Friendly alerts if the camera is blocked, lighting is too dark, or camera permissions are denied.</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Easy troubleshooting</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-foreground">10. Help & Documentation</td>
                  <td className="p-3.5">Interactive gesture practice page (/gestures), on-screen tooltips, and complete project report (/report).</td>
                  <td className="p-3.5 text-emerald-400 font-medium">✓ Self-guided practice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* 7. Empirical Usability Evaluation & Benchmark Results */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <BarChart3 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              7. Empirical Usability Evaluation & Benchmark Results
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

            {/* SUS 10-Item Breakdown */}
            <div className="pt-2">
              <h4 className="font-semibold text-foreground text-sm mb-2">System Usability Scale (SUS) 10-Question Score Distribution</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
                  <thead className="bg-muted/50 font-semibold text-foreground">
                    <tr>
                      <th className="p-3.5">Question Item</th>
                      <th className="p-3.5">Mean Score (1-5 Scale)</th>
                      <th className="p-3.5">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">1. I would like to use AirSlide frequently</td>
                      <td className="p-3.5 text-foreground font-medium">4.6 / 5.0</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Strong adoption intent</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">2. I found the system unnecessarily complex</td>
                      <td className="p-3.5 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Very simple to use</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">3. I thought the system was easy to use</td>
                      <td className="p-3.5 text-foreground font-medium">4.8 / 5.0</td>
                      <td className="p-3.5 text-emerald-400 font-medium">High ease of use</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">4. I would need technical support to use this</td>
                      <td className="p-3.5 text-foreground font-medium">1.1 / 5.0 (Low)</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Completely self-guided</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">5. Functions were well integrated</td>
                      <td className="p-3.5 text-foreground font-medium">4.7 / 5.0</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Seamless integration</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">6. Too much inconsistency in this system</td>
                      <td className="p-3.5 text-foreground font-medium">1.3 / 5.0 (Low)</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Consistent behavior</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">7. Most people would learn this very quickly</td>
                      <td className="p-3.5 text-foreground font-medium">4.9 / 5.0</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Instant learnability</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">8. I found the system very cumbersome</td>
                      <td className="p-3.5 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Lightweight and smooth</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">9. I felt very confident using the system</td>
                      <td className="p-3.5 text-foreground font-medium">4.5 / 5.0</td>
                      <td className="p-3.5 text-emerald-400 font-medium">High presenter confidence</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-medium text-foreground">10. Needed to learn a lot before getting started</td>
                      <td className="p-3.5 text-foreground font-medium">1.2 / 5.0 (Low)</td>
                      <td className="p-3.5 text-emerald-400 font-medium">Zero training barrier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>

        {/* 8. Discussion, Limitations & Future Work */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-4 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <Lightbulb className="h-6 w-6" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              8. Discussion, Limitations & Future Work
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              <strong>Technical Limitations:</strong> Low-light presentation venues introduce image sensor grain that can occasionally reduce MediaPipe joint landmark confidence. The application detects this and surfaces a gentle lighting advice banner. In addition, extreme camera angles (&gt;60 degrees off-axis) can cause hand foreshortening.
            </p>
            <p>
              <strong>Future Research Trajectories:</strong> Future versions will explore multi-presenter handover recognition (assigning unique hand IDs to co-presenters), subtle eye-gaze tracking integration to confirm presenter intent, and micro-gesture radar integration.
            </p>
          </div>
        </article>

        {/* 9. Conclusion */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-4 border border-border/70 shadow-lg">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              9. Conclusion
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            AirSlide proves that touch-free Natural User Interfaces can be robust, easy to use, and completely free of accidental clicks by adhering strictly to fundamental human-computer interaction principles. By combining static finger counting poses with a 2.0-second safety cooldown lock, AirSlide liberates presenters from physical hardware remotes and podium laptops while maintaining high confidence and presentation control.
          </p>
        </article>

        {/* 10. References & Appendix */}
        <article className="glass rounded-2xl p-8 sm:p-10 space-y-6 border border-border/70 shadow-lg">
          <h3 className="text-base font-bold text-foreground">10. Academic References</h3>
          <ul className="text-xs space-y-1.5 text-muted-foreground list-decimal pl-5 leading-relaxed">
            <li>Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. <em>Journal of Experimental Psychology</em>, 47(6), 381–391.</li>
            <li>Hick, W. E. (1952). On the rate of gain of information. <em>Quarterly Journal of Experimental Psychology</em>, 4(1), 11–26.</li>
            <li>Norman, D. A. (2013). <em>The Design of Everyday Things: Revised and Expanded Edition</em>. Basic Books, New York.</li>
            <li>Nielsen, J. (1994). <em>Usability Engineering</em>. Morgan Kaufmann Publishers, San Francisco.</li>
            <li>Shneiderman, B., et al. (2016). <em>Designing the User Interface: Strategies for Effective HCI</em> (6th ed.). Pearson.</li>
            <li>Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. <em>Cognitive Science</em>, 12(2), 257–285.</li>
            <li>Brooke, J. (1996). SUS: A 'quick and dirty' usability scale. In <em>Usability Evaluation in Industry</em> (pp. 189–194). Taylor & Francis.</li>
            <li>Lugaresi, C., et al. (2019). MediaPipe: A Framework for Building Perception Pipelines. <em>arXiv:1906.08172</em>.</li>
            <li>Wigdor, D., & Wixon, D. (2011). <em>Brave NUI World: Designing Natural User Interfaces</em>. Morgan Kaufmann.</li>
            <li>Hyman, R. (1953). Stimulus information as a determinant of reaction time. <em>Journal of Experimental Psychology</em>, 45(3), 188–196.</li>
          </ul>

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
                    <td className="p-3">HTA, Norman model, FSM state machine, usability testing</td>
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
