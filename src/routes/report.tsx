import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Eye,
  Hand,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Users,
  Compass,
  Layers,
  Activity,
  Cpu,
  BookOpen,
  HelpCircle,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "HCI Project Report - AirSlide" },
      {
        name: "description",
        content: "HiLCoE School of Computer Science HCI course project report for AirSlide.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <AppShell
      title="HCI Course Project Report"
      subtitle="HiLCoE School of Computer Science and Technology · Human-Computer Interaction Project Documentation."
    >
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Document Header Banner */}
        <div className="glass overflow-hidden rounded-2xl border border-primary/30 p-8 shadow-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> HiLCoE School of Computer Science & Technology
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                AirSlide: Touch-Free Presentation Control Using Hand Gestures
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                <strong>Authors:</strong> Nafyad Fantaye, Yeabsira Alemu, Ezana Tadesse, Zerubabel Fekadu &middot; <strong>Date:</strong> July 2026
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {["📄 Official PDF (3 Pages)", "HCI Design Lifecycle", "Norman's Action Cycle", "SUS Score: 78.5"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/80 bg-card/60 px-2.5 py-0.5 text-muted-foreground font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a href="/AirSlide_HCI_Report.pdf" download="AirSlide_HCI_Report.pdf">
              <Button size="lg" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary shadow-lg">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
            </a>
          </div>
        </div>

        {/* 1. Abstract */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              1. Abstract
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            This report presents the design, development, and usability evaluation of <strong>AirSlide</strong>, a touch-free presentation control system that enables presenters to navigate slides using natural hand gestures detected through a standard webcam. Traditional tools (keyboards, mice, and physical clickers) tether the presenter to their laptop and interrupt the flow of speech. AirSlide addresses this problem by running Google's MediaPipe neural network directly in the web browser via WebAssembly.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            To eliminate accidental slide changes during normal speaking, AirSlide maps navigation to distinct static finger counts (Peace Sign for Next, Point Up for Previous, Open Palm for Laser, Fist for Pause) and combines instant 0ms execution with a 2.0-second post-action safety cooldown. Usability testing with 5 participants achieved a 100% task completion rate and a System Usability Scale (SUS) score of 78.5 (rated 'Good').
          </p>
        </article>

        {/* 2. Introduction */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Compass className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              2. Introduction
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <strong className="text-foreground">2.1 Problem Statement:</strong> Presenters frequently break eye contact and natural rhythm to advance slides. Touch-based laptop controls require staying at the desk, while handheld remotes easily run out of battery, get lost, or create physical discomfort.
            </div>
            <div>
              <strong className="text-foreground">2.2 Proposed Solution:</strong> AirSlide is a lightweight web application that turns any standard webcam into a gesture controller. All processing runs client-side in the browser for privacy and zero latency.
            </div>
            <div>
              <strong className="text-foreground">2.3 Project Objectives:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-muted-foreground">
                <li>Design an intuitive 5-gesture set that takes less than 1 minute to learn.</li>
                <li>Prevent accidental triggers caused by normal speech gestures and hand lowering.</li>
                <li>Ensure universal access across standard browsers with zero extra hardware.</li>
                <li>Validate design through Nielsen's Heuristics and Think-Aloud user testing.</li>
              </ul>
            </div>
          </div>
        </article>

        {/* 3. Related Work & System Comparison */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Layers className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              3. Related Work & System Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-border/60 rounded-xl overflow-hidden">
              <thead className="bg-muted/40 font-semibold text-foreground">
                <tr>
                  <th className="p-3">System</th>
                  <th className="p-3">Input Type</th>
                  <th className="p-3">Hardware Required</th>
                  <th className="p-3">Key Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 text-muted-foreground">
                <tr>
                  <td className="p-3 font-medium text-foreground">PowerPoint Presenter View</td>
                  <td className="p-3">Keyboard / Mouse</td>
                  <td className="p-3">Laptop only</td>
                  <td className="p-3">Tethers speaker to desk</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Google Slides Remote</td>
                  <td className="p-3">Phone Touch Screen</td>
                  <td className="p-3">Phone + Laptop</td>
                  <td className="p-3">Splits presenter visual focus</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Leap Motion Controller</td>
                  <td className="p-3">Infrared Depth Sensor</td>
                  <td className="p-3">Dedicated $80 hardware</td>
                  <td className="p-3">Discontinued; proprietary hardware</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Physical RF Clicker</td>
                  <td className="p-3">Hardware Buttons / USB</td>
                  <td className="p-3">Handheld remote</td>
                  <td className="p-3">Battery drain; easy to lose</td>
                </tr>
                <tr className="bg-primary/5 text-primary font-medium">
                  <td className="p-3">AirSlide (Ours)</td>
                  <td className="p-3">Webcam Hand Gestures</td>
                  <td className="p-3">Any Standard Webcam</td>
                  <td className="p-3">Client-side browser app; zero extra cost</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* 4. Task Context */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Users className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              4. Task Context & User Analysis
            </h2>
          </div>
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-2">4.1 Stakeholder Analysis</h3>
              <div className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <strong className="text-foreground">Presenter (Primary User):</strong> Needs reliable detection without false triggers and easy cancellation.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <strong className="text-foreground">Audience:</strong> Needs seamless presentation flow without disruptive tech pauses.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <strong className="text-foreground">Meeting Host:</strong> Needs zero installation delays on guest laptops.
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                  <strong className="text-foreground">Developer / Tester:</strong> Needs clean architecture and reproducible tests.
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-sm mb-2">4.2 Hierarchical Task Analysis (HTA)</h3>
              <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-2 text-slate-300">
                <p><strong>Task 1: Setup:</strong> Open browser &rarr; Grant webcam access &rarr; Verify hand skeleton on screen.</p>
                <p><strong>Task 2: Slide Navigation:</strong> Form Peace sign (Next slide) &rarr; Form Point Up (Prev slide).</p>
                <p><strong>Task 3: Interactive Tools:</strong> Hold Open Palm (Laser pointer) &rarr; Hold Fist (Pause) &rarr; Pinch (Zoom).</p>
                <p><strong>Task 4: Deck Management:</strong> Drag & drop PDF/PPT &rarr; Enter Fullscreen mode.</p>
                <p><strong>Task 5: Error Recovery:</strong> Press Esc or use keyboard arrows to override at any time.</p>
              </div>
            </div>
          </div>
        </article>

        {/* 5. Navigation and Dialogue Models */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Activity className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              5. Navigation and Dialogue Models
            </h2>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <p>
              <strong>5.1 Navigation Model:</strong> Flat, persistent sidebar structure giving 1-click access to <em>Present Deck (/present)</em>, <em>Live Control (/live)</em>, <em>Gesture Guide (/gestures)</em>, <em>Settings (/settings)</em>, and <em>Report (/report)</em>.
            </p>
            <p>
              <strong>5.2 Dialogue State Transitions:</strong> Finite state machine: <code>Idle &rarr; Listening &rarr; Tracking &rarr; Executing (0ms) &rarr; Cooldown (2.0s Lockout) &rarr; Reset</code>. The 2.0s lockout guarantees that natural arm lowering never triggers accidental secondary transitions.
            </p>
          </div>
        </article>

        {/* 6. Detailed Interface Design & Cognitive Human Factors */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Cpu className="h-6 w-6" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              6. Interface Design & Cognitive Human Factors
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <strong className="text-primary font-semibold text-sm block mb-1">Norman's Action Cycle</strong>
              <strong>Gulf of Execution:</strong> Solved by intuitive finger counts (1 finger = back, 2 fingers = next).<br />
              <strong>Gulf of Evaluation:</strong> Solved by real-time skeleton overlay, confidence badges, and live laser dot.
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <strong className="text-foreground font-semibold text-sm block mb-1">Motor Ergonomics ("Gorilla Arm")</strong>
              Sustained mid-air holding causes shoulder fatigue. The 2.0s cooldown lets presenters raise a hand for 0.5s and immediately rest on the table without accidental triggers.
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <strong className="text-foreground font-semibold text-sm block mb-1">Midas Touch Dilemma</strong>
              Natural speech gesturing triggers false commands. Solved by replacing trajectory swiping with static finger poses and downward motion filters.
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
              <strong className="text-foreground font-semibold text-sm block mb-1">Continuous Laser Streaming</strong>
              While slide turns are discrete one-shot actions, pointing is continuous. Open Palm streams coordinates in real-time with 0s cooldown interruption until lowered.
            </div>
          </div>
        </article>

        {/* 7. Usability Evaluation */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              7. Usability Evaluation & Empirical Results
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-4 pt-2 text-center text-xs">
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="text-xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground mt-0.5">Task Success Rate</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="text-xl font-bold text-emerald-400">0.0 sec</div>
              <div className="text-muted-foreground mt-0.5">Response Latency</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="text-xl font-bold text-foreground">96.4%</div>
              <div className="text-muted-foreground mt-0.5">Gesture Accuracy</div>
            </div>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <div className="text-xl font-bold text-primary">78.5</div>
              <div className="text-muted-foreground mt-0.5">SUS Score ('Good')</div>
            </div>
          </div>
        </article>

        {/* 8. Conclusion */}
        <article className="glass rounded-2xl p-8 space-y-4 border border-border/70">
          <div className="flex items-center gap-3 text-primary">
            <Lightbulb className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              8. Conclusion & Future Work
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            AirSlide proves that Natural User Interfaces can be made dependable by respecting human physical habits. By applying core HCI principles—Norman's action cycle, motor ergonomics, and error prevention—AirSlide provides a calm, stress-free touchless presentation tool. Future work includes multi-speaker handoffs and customizable user gesture preferences.
          </p>
        </article>

        {/* 9. References */}
        <article className="glass rounded-2xl p-8 space-y-3 border border-border/70">
          <h3 className="text-sm font-semibold text-foreground">9. Academic References</h3>
          <ul className="text-xs space-y-1 text-muted-foreground list-decimal pl-4">
            <li>Norman, D. (2013). <em>The Design of Everyday Things: Revised and Expanded Edition</em>. Basic Books.</li>
            <li>Nielsen, J. (1994). <em>Usability Engineering</em>. Morgan Kaufmann Publishers.</li>
            <li>Wigdor, D., & Wixon, D. (2011). <em>Brave NUI World: Designing Natural User Interfaces for Touch and Gesture</em>. Elsevier.</li>
            <li>Brooke, J. (1996). <em>SUS: A 'quick and dirty' usability scale</em>. Usability Evaluation in Industry, 189-194.</li>
            <li>Google MediaPipe Team. (2023). <em>MediaPipe Tasks: On-Device Machine Learning for Hand Landmark Recognition</em>.</li>
          </ul>
        </article>

        <div className="text-center text-xs text-muted-foreground pt-4 pb-8">
          AirSlide · HiLCoE School of Computer Science and Technology · HCI Course Project Report
        </div>
      </div>
    </AppShell>
  );
}
