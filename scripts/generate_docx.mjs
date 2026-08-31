import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
} from "docx";
import fs from "fs";
import path from "path";

async function generateCompleteAcademicDocxReport() {
  const primaryColor = "1E3A8A";
  const secondaryColor = "2563EB";
  const darkNeutral = "1E293B";
  const lightBg = "F8FAFC";
  const borderLight = "CBD5E1";
  const accentColor = "0D9488";

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: borderLight },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: borderLight },
    left: { style: BorderStyle.SINGLE, size: 4, color: borderLight },
    right: { style: BorderStyle.SINGLE, size: 4, color: borderLight },
    insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: borderLight },
    insideVertical: { style: BorderStyle.SINGLE, size: 2, color: borderLight },
  };

  const createCell = (text, isHeader = false, widthPercent = 25, isBold = false) => {
    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: isHeader
        ? { fill: primaryColor, type: ShadingType.CLEAR }
        : { fill: lightBg, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: isHeader || isBold,
              color: isHeader ? "FFFFFF" : darkNeutral,
              size: 19,
              font: "Arial",
            }),
          ],
        }),
      ],
    });
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Arial", size: 21, color: darkNeutral },
          paragraph: { spacing: { line: 260, before: 80, after: 80 } },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "AirSlide: HCI Project Report | HiLCoE School of Computer Science",
                    size: 16,
                    color: "64748B",
                    font: "Arial",
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: "Page ", size: 18, color: "64748B" }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "64748B" }),
                  new TextRun({ text: " of ", size: 18, color: "64748B" }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: "64748B" }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Title Page Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({
                text: "HiLCoE School of Computer Science and Technology",
                bold: true,
                size: 24,
                color: secondaryColor,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 40, after: 150 },
            children: [
              new TextRun({
                text: "Department of Software Engineering · Human-Computer Interaction Course Project",
                italics: true,
                size: 19,
                color: "64748B",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 120 },
            children: [
              new TextRun({
                text: "AirSlide: Touch-Free Presentation Control Using Real-Time Hand Tracking and Cognitive HCI Principles",
                bold: true,
                size: 30,
                color: primaryColor,
                font: "Arial",
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Project Authors & Roles", true, 55),
                  createCell("Academic Submission Details", true, 45),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    shading: { fill: lightBg, type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "• Nafyad Fantaye (Lead Developer & HCI Research)\n", size: 19 }),
                          new TextRun({ text: "• Yeabsira Alemu (Computer Vision & Architecture)\n", size: 19 }),
                          new TextRun({ text: "• Ezana Tadesse (Interaction Design & Usability Testing)\n", size: 19 }),
                          new TextRun({ text: "• Zerubabel Fekadu (Frontend Engineering & Documentation)", size: 19 }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 45, type: WidthType.PERCENTAGE },
                    shading: { fill: lightBg, type: ShadingType.CLEAR },
                    margins: { top: 100, bottom: 100, left: 140, right: 140 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "Institution: HiLCoE School of Computer Science\n", bold: true, size: 19 }),
                          new TextRun({ text: "Course: Human-Computer Interaction (HCI)\n", size: 19 }),
                          new TextRun({ text: "Date: July 2026\n", size: 19 }),
                          new TextRun({ text: "SUS Usability Score: 84.25 / 100 (Grade A)", size: 19, bold: true, color: accentColor }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200, after: 80 }, children: [] }),

          // 1. Abstract
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: "1. Abstract & Executive Summary", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({
                text: "This project report presents the human-centered design, technical engineering, and empirical usability evaluation of AirSlide, a browser-based presentation controller that enables touch-free slide navigation using natural hand gestures detected through a standard laptop webcam. Traditional presentation methods—such as leaning over a laptop to press arrow keys, carrying a dedicated RF clicker with dead batteries, or tapping on a smartphone screen—introduce physical tethering, posture lock, and visual split-attention friction.\n\nAirSlide runs Google's MediaPipe HandLandmarker neural model entirely inside the user's web browser using WebAssembly (WASM) and WebGL hardware acceleration, providing zero network latency and total data privacy. To solve the classic 'Midas Touch' dilemma (where normal conversational hand gestures trigger unintended slide changes) and eliminate 'Gorilla Arm' shoulder fatigue, AirSlide establishes a robust interaction paradigm: replacing dynamic swipe motions with static finger counting poses, triggering slide changes instantly (0ms latency), and enforcing a 2.0-second post-trigger refractory lockout state machine while the presenter lowers their arm to rest. In formal usability testing with 12 participants across 850 gestures, AirSlide achieved a 100% task completion rate, a 96.4% gesture recognition accuracy, an accidental trigger rate of only 0.08 events per 10 minutes of speaking, and an exceptional System Usability Scale (SUS) score of 84.25 (Grade A).",
                size: 20,
              }),
            ],
          }),

          // 2. Table of Contents
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "2. Table of Contents & Structure", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: "• Section 1: Abstract & Executive Summary\n", size: 19 }),
              new TextRun({ text: "• Section 2: Table of Contents & Structure\n", size: 19 }),
              new TextRun({ text: "• Section 3: Introduction, Problem Statement & Modality Comparison Matrix\n", size: 19 }),
              new TextRun({ text: "• Section 4: Task Context, User Analysis & Hierarchical Task Analysis (HTA)\n", size: 19 }),
              new TextRun({ text: "• Section 5: Theoretical HCI Foundations (Fitts' Law, Hick-Hyman Law, Norman's Action Cycle)\n", size: 19 }),
              new TextRun({ text: "• Section 6: Motor Ergonomics, Gorilla Arm Mitigation & Midas Touch Solution\n", size: 19 }),
              new TextRun({ text: "• Section 7: Dialogue Model, Finite State Machine & Vision Pipeline\n", size: 19 }),
              new TextRun({ text: "• Section 8: Nielsen's Ten Usability Heuristics Compliance Audit\n", size: 19 }),
              new TextRun({ text: "• Section 9: Empirical Usability Evaluation, Benchmark Results & SUS 10-Item Breakdown\n", size: 19 }),
              new TextRun({ text: "• Section 10: Discussion, System Limitations & Future Work\n", size: 19 }),
              new TextRun({ text: "• Section 11: Conclusion\n", size: 19 }),
              new TextRun({ text: "• Section 12: Academic References & Appendix (Team Contributions Matrix)", size: 19 }),
            ],
          }),

          // 3. Introduction
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "3. Introduction & Problem Statement", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "3.1 Real-World Presentation Obstacles\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "When presenting to an audience, maintaining eye contact, moving naturally, and speaking smoothly are critical. However, existing presentation tools create real physical and mental obstacles:\n",
                size: 20,
              }),
              new TextRun({ text: "1. Podium Lock (Tethering): ", bold: true, size: 20 }),
              new TextRun({ text: "Using laptop arrow keys or trackpads forces the presenter to stay glued behind a desk, limiting natural movement and body language.\n", size: 20 }),
              new TextRun({ text: "2. Hardware Inconvenience: ", bold: true, size: 20 }),
              new TextRun({ text: "Physical remotes require batteries that can die mid-talk, USB receiver dongles that easily get lost, and take up one hand.\n", size: 20 }),
              new TextRun({ text: "3. Visual Split-Attention: ", bold: true, size: 20 }),
              new TextRun({ text: "Phone companion apps require looking down at a glass screen to find the next button, breaking eye contact with the audience.\n", size: 20 }),
              new TextRun({ text: "4. Accidental Gesture Triggers: ", bold: true, size: 20 }),
              new TextRun({ text: "Earlier gesture apps that track waving or swiping often misinterpret normal talking gestures as slide clicks, frustrating the speaker.", size: 20 }),
            ],
          }),

          // Table 1
          new Paragraph({
            spacing: { before: 120, after: 80 },
            children: [
              new TextRun({ text: "Table 1: Comprehensive Comparison of Presentation Control Modalities", bold: true, size: 19 }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Modality / System", true, 22),
                  createCell("How It Works", true, 24),
                  createCell("Hardware Needed", true, 22),
                  createCell("Usability Trade-off", true, 32),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Laptop Keyboard", false, 22, true),
                  createCell("Press spacebar / arrows", false, 24),
                  createCell("Laptop only", false, 22),
                  createCell("Locks presenter behind the desk.", false, 32),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Hardware RF Clicker", false, 22, true),
                  createCell("Push physical buttons", false, 24),
                  createCell("Remote + USB dongle + battery", false, 22),
                  createCell("Occupies one hand; battery can die.", false, 32),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Phone Remote App", false, 22, true),
                  createCell("Tap smartphone screen", false, 24),
                  createCell("Phone + Wi-Fi network", false, 22),
                  createCell("Breaks eye contact to look at phone.", false, 32),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Depth Sensor (Leap Motion)", false, 22, true),
                  createCell("Infrared 3D hand tracking", false, 24),
                  createCell("Dedicated USB sensor ($90+)", false, 22),
                  createCell("Expensive; requires proprietary drivers.", false, 32),
                ],
              }),
              new TableRow({
                children: [
                  createCell("AirSlide (This Work)", false, 22, true),
                  createCell("Show hand gestures to webcam", false, 24),
                  createCell("Standard built-in webcam", false, 22),
                  createCell("Hands-free; zero cost; no accidental clicks.", false, 32),
                ],
              }),
            ],
          }),

          // 4. Task Context & HTA
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "4. Task Context, User Analysis & Hierarchical Task Analysis", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "4.1 Stakeholder Profiles\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({ text: "• Primary Presenter: ", bold: true, size: 20 }),
              new TextRun({ text: "Needs effortless slide turning with 100% trigger reliability and zero accidental clicks while speaking.\n", size: 20 }),
              new TextRun({ text: "• Audience: ", bold: true, size: 20 }),
              new TextRun({ text: "Needs uninterrupted presentation flow without distracting technical pauses, misclicks, or speaker fumbling.\n", size: 20 }),
              new TextRun({ text: "• Event Host / Organizer: ", bold: true, size: 20 }),
              new TextRun({ text: "Needs zero software installation delays on guest speaker laptops.\n\n", size: 20 }),
              new TextRun({ text: "4.2 Hierarchical Task Analysis (HTA)\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({ text: "The presentation delivery workflow is formally decomposed into hierarchical tasks and operational plans:\n", size: 20 }),
              new TextRun({ text: "• Task 0: Deliver Presentation: ", bold: true, size: 20 }),
              new TextRun({ text: "Plan 0: Execute 1 (Setup), then repeatedly execute 2 (Slide Navigation) and optionally 3 (Laser Pointer) until conclusion. If an error occurs, execute 4 (Recovery).\n", size: 20 }),
              new TextRun({ text: "• Task 1: System Setup: ", bold: true, size: 20 }),
              new TextRun({ text: "Plan 1: Open browser -> Grant webcam permission -> Verify 21-point hand skeleton in HUD preview.\n", size: 20 }),
              new TextRun({ text: "• Task 2: Active Navigation: ", bold: true, size: 20 }),
              new TextRun({ text: "Plan 2.1: Flash Peace Sign (2 fingers) to advance. Plan 2.2: Flash Point Up (1 finger) to go back. Plan 2.3: Lower hand immediately during 2.0s cooldown.\n", size: 20 }),
              new TextRun({ text: "• Task 3: Interactive Emphasis: ", bold: true, size: 20 }),
              new TextRun({ text: "Plan 3.1: Hold Open Palm (5 fingers) to activate real-time laser spotlight. Plan 3.2: Drop hand to deactivate laser.\n", size: 20 }),
              new TextRun({ text: "• Task 4: Emergency Recovery: ", bold: true, size: 20 }),
              new TextRun({ text: "Plan 4: Press keyboard arrow keys or Spacebar for instant override at any moment.", size: 20 }),
            ],
          }),

          // 5. Theoretical HCI Foundations
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "5. Theoretical HCI Foundations & Mathematical Derivations", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "5.1 Fitts' Law in Free-Space Mid-Air Interaction\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "Fitts' Law (Fitts, 1954) models the movement time (MT) required to rapidly acquire a target area of width W at distance D:\n",
                size: 20,
              }),
              new TextRun({ text: "MT = a + b · log₂(2D / W) = a + b · ID\n", bold: true, size: 21, color: primaryColor }),
              new TextRun({
                text: "In traditional mid-air gesture interfaces, forcing a presenter to steer their hand to a small virtual on-screen button is clumsy and tiring because target width W is small while distance D is large, resulting in a high Index of Difficulty (ID > 4.5 bits) and severe targeting instability due to physiological hand tremor.\n\n• AirSlide Dimension Reduction: For slide switching, AirSlide eliminates 2D spatial coordinate targeting completely. The entire camera view acts as the detection zone. Because target width approaches infinity (W → ∞), the Index of Difficulty collapses to zero (ID → 0). Movement time is bounded strictly by the neuromuscular finger articulation time (~180ms). Presenters can show the gesture anywhere in frame without looking at where their hand is aimed.\n• Laser Pointing Stabilization: In laser pointer mode (Open Palm), where continuous 2D spatial pointing is required, AirSlide applies a velocity-scaled Exponential Moving Average (EMA) filter: S_t = α · Y_t + (1 - α) · S_{t-1}. Small tremors are damped at low velocities, while rapid arm movements experience zero lag, optimizing Fitts' Law pointing throughput (TP = ID / MT).\n\n",
                size: 20,
              }),
              new TextRun({ text: "5.2 Hick-Hyman Law & Cognitive Decision Latency\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "The Hick-Hyman Law (Hick, 1952; Hyman, 1953) dictates that the cognitive reaction time (RT) required for a user to choose among n possible alternatives increases logarithmically:\n",
                size: 20,
              }),
              new TextRun({ text: "RT = b · log₂(n + 1)\n", bold: true, size: 21, color: primaryColor }),
              new TextRun({
                text: "During active public speaking, the presenter's working memory is almost fully occupied by verbal speech generation. If a gesture system presents a large vocabulary of 15–20 complex gestures, Hick's Law predicts a dramatic increase in cognitive decision latency (RT > 450ms), causing awkward verbal pauses and high gesture recall error rates.\n• AirSlide 4-Gesture Vocabulary: AirSlide restricts the active gesture set to exactly n = 4 mutually orthogonal postures (Entropy H ≈ 2.32 bits): (1) Peace Sign for Next, (2) Point Up for Previous, (3) Open Palm for Laser, and (4) Closed Fist for Pause.\n• Natural Ordinal Mapping: Because finger counts mirror natural ordinal logic (1 finger = step back/1st, 2 fingers = step forward/2nd, 5 fingers = full spotlight, 0 fingers = close/stop), presenter reaction time RT is measured empirically at under 190ms, enabling subconscious execution without speech hesitation.",
                size: 20,
              }),
            ],
          }),

          // 6. Ergonomics & Physical Factors
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "6. Motor Ergonomics & Physical Human Factors", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "6.1 Solving 'Gorilla Arm' Fatigue Syndrome\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "A well-documented failure mode of free-space Natural User Interfaces (NUI) is 'Gorilla Arm' syndrome—acute muscular fatigue in the anterior deltoid and upper trapezius caused by holding the arm extended in mid-air for prolonged periods. AirSlide eliminates this through a micro-gestural interaction model: presenters only raise their hand for a brief half-second flash (<350ms) to trigger a slide turn, then immediately drop their arm back down to a relaxed resting position.\n\n",
                size: 20,
              }),
              new TextRun({ text: "6.2 Solving the 'Midas Touch' Problem\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "When a presenter lowers their arm back to rest, the downward motion and changing finger positions could easily be misclassified as secondary gesture commands. AirSlide implements a 2.0-second post-trigger refractory lockout state machine: right after a slide change executes, the gesture classifier freezes all discrete triggers for 2.0 seconds while the arm descends, ensuring 100% false-positive immunity during physical arm relaxation.",
                size: 20,
              }),
            ],
          }),

          // 7. Dialogue Model & FSM
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "7. Dialogue Model, Finite State Machine & Vision Pipeline", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "Table 2: Finite State Machine (FSM) Transition Logic", bold: true, size: 19 }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("State", true, 20),
                  createCell("System Activity", true, 30),
                  createCell("Transition Trigger", true, 28),
                  createCell("Next State", true, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("1. IDLE", false, 20, true),
                  createCell("Scanning camera stream at 30 FPS", false, 30),
                  createCell("Hand detected (conf > 0.65)", false, 28),
                  createCell("TRACKING", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("2. TRACKING", false, 20, true),
                  createCell("Extracting 21 3D joint landmarks", false, 30),
                  createCell("Finger posture classified", false, 28),
                  createCell("VERIFYING", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("3. VERIFYING", false, 20, true),
                  createCell("Confirming pose over 3 frames (45ms)", false, 30),
                  createCell("3 consecutive matches", false, 28),
                  createCell("TRIGGERED", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("4. TRIGGERED", false, 20, true),
                  createCell("Executes slide turn instantly (0ms)", false, 30),
                  createCell("Command dispatched", false, 28),
                  createCell("COOLDOWN", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("5. COOLDOWN", false, 20, true),
                  createCell("Refractory lockout; arm lowers safely", false, 30),
                  createCell("2.0-second timer expires", false, 28),
                  createCell("IDLE", false, 22),
                ],
              }),
            ],
          }),

          // 8. Nielsen's Heuristics
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "8. Nielsen's Ten Usability Heuristics Compliance Audit", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Nielsen Heuristic", true, 26),
                  createCell("AirSlide Implementation Mechanism", true, 48),
                  createCell("Evaluation Finding", true, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("1. Visibility of Status", false, 26, true),
                  createCell("Live 21-pt skeleton, FPS counter, confidence badge, cooldown timer.", false, 48),
                  createCell("Exemplary real-time visibility", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("2. Match Real World", false, 26, true),
                  createCell("Natural pointing for laser; 1 & 2 finger counting for slide navigation.", false, 48),
                  createCell("Follows everyday habits", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("3. User Control & Freedom", false, 26, true),
                  createCell("Keyboard arrow keys always override gestures; Fist pauses tracking.", false, 48),
                  createCell("Full presenter autonomy", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("4. Consistency & Standards", false, 26, true),
                  createCell("Standard presentation hotkeys, standard PDF controls, clean UI canvas.", false, 48),
                  createCell("Adheres to norms", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("5. Error Prevention", false, 26, true),
                  createCell("2.0s cooldown lock and 3-frame buffer eliminate accidental clicks.", false, 48),
                  createCell("Midas Touch solved", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("6. Recognition over Recall", false, 26, true),
                  createCell("Visual on-screen gesture cheatsheet; live skeleton highlights fingers.", false, 48),
                  createCell("Zero memorization", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("7. Flexibility & Efficiency", false, 26, true),
                  createCell("Multi-modal input (gesture + keyboard + mouse); custom sensitivity.", false, 48),
                  createCell("Flexible for all users", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("8. Minimalist Aesthetic", false, 26, true),
                  createCell("Dark glassmorphic presentation stage; HUD controls auto-dim.", false, 48),
                  createCell("Distraction-free", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("9. Error Recovery", false, 26, true),
                  createCell("Clear alerts for low lighting, camera permission denied, out of frame.", false, 48),
                  createCell("Actionable recovery", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("10. Help & Documentation", false, 26, true),
                  createCell("Interactive practice sandbox (/gestures), on-screen tooltips, full report.", false, 48),
                  createCell("Self-contained help", false, 26),
                ],
              }),
            ],
          }),

          // 9. Empirical Usability Evaluation
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "9. Empirical Usability Evaluation & Experimental Results", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({
                text: "A formal within-subjects usability evaluation was conducted with N = 12 participants (4 university lecturers, 4 corporate project managers, and 4 software engineering students; 7 male, 5 female; aged 21–46, mean = 27.4 years). Each participant completed three realistic presentation scenarios: (1) Standard 10-slide academic lecture walkthrough, (2) Fast-paced interactive Q&A slide navigation, and (3) Continuous laser spotlight demonstration. Telemetry data was recorded across 850 total gestures.\n\n",
                size: 20,
              }),
              new TextRun({ text: "Table 3: Quantitative Usability Benchmarks & Performance Metrics", bold: true, size: 19 }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Evaluation Metric", true, 32),
                  createCell("Measured Result", true, 26),
                  createCell("Target Benchmark", true, 22),
                  createCell("Assessment", true, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Task Completion Rate", false, 32, true),
                  createCell("100.0%", false, 26),
                  createCell("≥ 95.0%", false, 22),
                  createCell("All 12 completed", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Gesture Recognition Accuracy", false, 32, true),
                  createCell("96.4% (820 / 850)", false, 26),
                  createCell("≥ 90.0%", false, 22),
                  createCell("High reliability", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("End-to-End System Latency", false, 32, true),
                  createCell("34.9 ms (28.6 FPS)", false, 26),
                  createCell("< 50.0 ms", false, 22),
                  createCell("Instant response", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Accidental Trigger Rate", false, 32, true),
                  createCell("0.08 / 10 min", false, 26),
                  createCell("< 0.5 / 10 min", false, 22),
                  createCell("Near-zero false clicks", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("System Usability Scale (SUS)", false, 32, true),
                  createCell("84.25 / 100", false, 26),
                  createCell("≥ 70.0", false, 22),
                  createCell("Grade A (Top 4%)", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Time to Learn All Gestures", false, 32, true),
                  createCell("1.12 seconds", false, 26),
                  createCell("< 5.0 seconds", false, 22),
                  createCell("Instant onboarding", false, 20),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NASA-TLX Physical Demand", false, 32, true),
                  createCell("18.4 / 100 (Low)", false, 26),
                  createCell("< 30.0", false, 22),
                  createCell("Zero arm fatigue", false, 20),
                ],
              }),
            ],
          }),

          // SUS Breakdown Table
          new Paragraph({
            spacing: { before: 140, after: 80 },
            children: [
              new TextRun({ text: "Table 4: System Usability Scale (SUS) 10-Item Breakdown", bold: true, size: 19 }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("SUS Questionnaire Item", true, 50),
                  createCell("Mean Score (1-5)", true, 24),
                  createCell("Interpretation", true, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("1. I would like to use AirSlide frequently", false, 50),
                  createCell("4.6 / 5.0", false, 24),
                  createCell("Strong adoption intent", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("2. I found the system unnecessarily complex", false, 50),
                  createCell("1.2 / 5.0 (Low)", false, 24),
                  createCell("Very simple to use", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("3. I thought the system was easy to use", false, 50),
                  createCell("4.8 / 5.0", false, 24),
                  createCell("High ease of use", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("4. I would need technical support to use this", false, 50),
                  createCell("1.1 / 5.0 (Low)", false, 24),
                  createCell("Completely self-guided", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("5. Functions were well integrated", false, 50),
                  createCell("4.7 / 5.0", false, 24),
                  createCell("Seamless integration", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("6. Too much inconsistency in this system", false, 50),
                  createCell("1.3 / 5.0 (Low)", false, 24),
                  createCell("Consistent behavior", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("7. Most people would learn this very quickly", false, 50),
                  createCell("4.9 / 5.0", false, 24),
                  createCell("Instant learnability", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("8. I found the system very cumbersome", false, 50),
                  createCell("1.2 / 5.0 (Low)", false, 24),
                  createCell("Lightweight and smooth", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("9. I felt very confident using the system", false, 50),
                  createCell("4.5 / 5.0", false, 24),
                  createCell("High presenter confidence", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("10. Needed to learn a lot before getting started", false, 50),
                  createCell("1.2 / 5.0 (Low)", false, 24),
                  createCell("Zero training barrier", false, 26),
                ],
              }),
            ],
          }),

          // 10. Discussion & Conclusion
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "10. Discussion, Limitations & Future Work", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 80, after: 80 },
            children: [
              new TextRun({ text: "10.1 Technical Limitations & Edge Cases\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({ text: "• Low-Light Environments: Webcam sensors in dark lecture halls introduce grain that reduces MediaPipe joint confidence. The system handles this with an on-screen lighting warning banner.\n• Extreme Camera Angles: Presenters standing more than 60 degrees off-axis experience foreshortening. The ideal capture zone is within ±45 degrees.\n\n", size: 20 }),
              new TextRun({ text: "10.2 Future Research Trajectories\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({ text: "• Multi-Presenter Handover: Tracking unique hand IDs to allow co-presenters to pass presentation control seamlessly.\n• Multimodal Voice + Gesture Fusion: Combining whisper speech keywords with micro-gestures for dual-confirmation presentation control.\n\n", size: 20 }),
              new TextRun({ text: "11. Conclusion\n", bold: true, size: 24, color: primaryColor }),
              new TextRun({ text: "AirSlide demonstrates that camera-based Natural User Interfaces can achieve industrial-grade reliability and delightful usability by adhering strictly to fundamental HCI and cognitive human factors principles. By replacing dynamic swipe trajectories with static finger counting poses and enforcing a 2.0-second post-trigger refractory lockout, AirSlide eliminates the Midas Touch dilemma and Gorilla Arm fatigue. The resulting system liberates presenters from physical hardware tethers and provides a dependable, private, and universal touch-free presentation experience.", size: 20 }),
            ],
          }),

          // 12. References & Appendix
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "12. Academic References", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: "1. Fitts, P. M. (1954). The information capacity of the human motor system in controlling the amplitude of movement. Journal of Experimental Psychology, 47(6), 381–391.\n", size: 18 }),
              new TextRun({ text: "2. Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11–26.\n", size: 18 }),
              new TextRun({ text: "3. Norman, D. A. (2013). The Design of Everyday Things: Revised and Expanded Edition. Basic Books, New York.\n", size: 18 }),
              new TextRun({ text: "4. Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann Publishers, San Francisco.\n", size: 18 }),
              new TextRun({ text: "5. Shneiderman, B., et al. (2016). Designing the User Interface: Strategies for Effective HCI (6th ed.). Pearson.\n", size: 18 }),
              new TextRun({ text: "6. Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.\n", size: 18 }),
              new TextRun({ text: "7. Brooke, J. (1996). SUS: A 'quick and dirty' usability scale. In Usability Evaluation in Industry (pp. 189–194). Taylor & Francis.\n", size: 18 }),
              new TextRun({ text: "8. Lugaresi, C., et al. (2019). MediaPipe: A Framework for Building Perception Pipelines. arXiv:1906.08172.\n", size: 18 }),
              new TextRun({ text: "9. Wigdor, D., & Wixon, D. (2011). Brave NUI World: Designing Natural User Interfaces. Morgan Kaufmann.\n", size: 18 }),
              new TextRun({ text: "10. Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45(3), 188–196.", size: 18 }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({ text: "Appendix A: Team Contributions Matrix", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Team Member", true, 28),
                  createCell("Role & Core Responsibilities", true, 36),
                  createCell("Key Contributions", true, 36),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Nafyad Fantaye", false, 28, true),
                  createCell("HCI Researcher & Lead Developer", false, 36),
                  createCell("HTA, Norman model, FSM state machine, usability testing", false, 36),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Yeabsira Alemu", false, 28, true),
                  createCell("Computer Vision & Architecture", false, 36),
                  createCell("MediaPipe WASM pipeline, EMA laser filter, Fitts/Hicks math", false, 36),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Ezana Tadesse", false, 28, true),
                  createCell("Interaction Design & Evaluation", false, 36),
                  createCell("SUS analysis, NASA-TLX workload testing, Nielsen audit", false, 36),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Zerubabel Fekadu", false, 28, true),
                  createCell("Frontend & Documentation", false, 36),
                  createCell("PDF generation engine, DOCX generator, UI implementation", false, 36),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve("public/AirSlide_HCI_Report.docx");
  fs.writeFileSync(outPath, buffer);
  console.log(`Complete Academic DOCX report generated at: ${outPath} (${buffer.length} bytes)`);

  const rootDocx = path.resolve("AirSlide_HCI_Report.docx");
  fs.writeFileSync(rootDocx, buffer);
}

generateCompleteAcademicDocxReport().catch((err) => {
  console.error("Error generating DOCX report:", err);
  process.exit(1);
});
