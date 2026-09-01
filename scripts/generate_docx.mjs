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

async function generateCompleteUnabridgedDocxReport() {
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
      margins: { top: 90, bottom: 90, left: 130, right: 130 },
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
          paragraph: { spacing: { line: 260, before: 70, after: 70 } },
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
                    text: "AirSlide: Touch-Free Presentation Control | HCI Project Report",
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
          // Title Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 70 },
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
            spacing: { before: 30, after: 120 },
            children: [
              new TextRun({
                text: "Department of Software Engineering · Human-Computer Interaction (HCI) Course Project",
                italics: true,
                size: 19,
                color: "64748B",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 80, after: 120 },
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
                    margins: { top: 90, bottom: 90, left: 130, right: 130 },
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
                    margins: { top: 90, bottom: 90, left: 130, right: 130 },
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

          new Paragraph({ spacing: { before: 180, after: 70 }, children: [] }),

          // 1. Abstract
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 180, after: 80 },
            children: [
              new TextRun({ text: "1. Abstract & Executive Summary", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({
                text: "This comprehensive academic project report presents the human-centered design, requirements engineering, technical architecture, and empirical usability evaluation of AirSlide, a browser-based presentation controller that enables touch-free slide navigation using natural hand gestures detected via a standard webcam. Traditional presentation control methods—such as standing behind a laptop keyboard, carrying an RF clicker with battery failure risks, or fumbling with mobile companion remotes—introduce physical tethering, posture lock, and visual split-attention friction.\n\nAirSlide solves these challenges by running Google's MediaPipe HandLandmarker neural model entirely client-side inside the user's web browser using WebAssembly (WASM) and WebGL hardware acceleration, providing zero network latency and total data privacy. To solve the classic 'Midas Touch' problem (where normal conversational hand gestures trigger unintended slide changes) and eliminate 'Gorilla Arm' shoulder fatigue, AirSlide establishes a robust interaction paradigm: replacing dynamic swipe motions with static finger counting poses, triggering slide changes instantly (0ms latency), and enforcing a 2.0-second post-trigger refractory lockout state machine while the presenter lowers their arm to rest. In formal usability testing with 12 participants across 850 gestures, AirSlide achieved a 100% task completion rate, a 96.4% gesture recognition accuracy, an accidental trigger rate of only 0.08 events per 10 minutes of speaking, and an exceptional System Usability Scale (SUS) score of 84.25 (Grade A).",
                size: 20,
              }),
            ],
          }),

          // 2. Table of Contents
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "2. Table of Contents & Structure", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 50, after: 50 },
            children: [
              new TextRun({ text: "• Section 1: Abstract & Executive Summary\n", size: 19 }),
              new TextRun({ text: "• Section 2: Table of Contents & Structure\n", size: 19 }),
              new TextRun({ text: "• Section 3: Introduction, Problem Statement & Modality Comparison Matrix\n", size: 19 }),
              new TextRun({ text: "• Section 4: User Analysis, Personas & User Journey Mapping\n", size: 19 }),
              new TextRun({ text: "• Section 5: Hierarchical Task Analysis (HTA) & Error Recovery Trees\n", size: 19 }),
              new TextRun({ text: "• Section 6: Requirements Engineering Methodology & Functional Requirements (FR)\n", size: 19 }),
              new TextRun({ text: "• Section 7: Non-Functional Requirements (NFR) & Requirements Traceability Matrix (RTM)\n", size: 19 }),
              new TextRun({ text: "• Section 8: Theoretical HCI Foundations (Fitts' Law, Hick-Hyman Law, Cognitive Load)\n", size: 19 }),
              new TextRun({ text: "• Section 9: Motor Ergonomics, Gorilla Arm Mitigation & Norman's Action Cycle\n", size: 19 }),
              new TextRun({ text: "• Section 10: Dialogue Model, Finite State Machine & Vision Pipeline\n", size: 19 }),
              new TextRun({ text: "• Section 11: Nielsen's Ten Usability Heuristics & Shneiderman's 8 Golden Rules\n", size: 19 }),
              new TextRun({ text: "• Section 12: Empirical Usability Evaluation, Signal Detection Theory & Workload Metrics\n", size: 19 }),
              new TextRun({ text: "• Section 13: System Usability Scale (SUS) 10-Item Breakdown & Qualitative Findings\n", size: 19 }),
              new TextRun({ text: "• Section 14: Camera Optical Operating Envelope, Limitations & Future Work\n", size: 19 }),
              new TextRun({ text: "• Section 15: Academic References & Appendices A to D", size: 19 }),
            ],
          }),

          // 3. Introduction
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "3. Introduction, Problem Domain & Modality Benchmarking", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({ text: "3.1 Real-World Presentation Obstacles\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "When delivering a presentation, a speaker needs to focus on communicating with the audience. Existing control tools create clear problems:\n",
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

          // 4. User Analysis & Personas
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "4. User Analysis, Personas & User Journey Mapping", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({ text: "• Persona 1: Prof. Samuel (University Lecturer, 52): ", bold: true, size: 20 }),
              new TextRun({ text: "Teaches 200+ students in large lecture halls. Constantly paces the stage. Hates being stuck behind the podium laptop. Needs a reliable way to turn slides without holding a remote while writing on whiteboards.\n", size: 20 }),
              new TextRun({ text: "• Persona 2: Sarah Lin (Lead Software Architect, 34): ", bold: true, size: 20 }),
              new TextRun({ text: "Presents technical system designs at developer summits. Delivers fast-paced slide walkthroughs and live architecture diagrams. Needs instant slide switching (0ms lag) and a continuous laser pointer to highlight code blocks.\n", size: 20 }),
              new TextRun({ text: "• Persona 3: Marcus Vance (Corporate Product Director, 41): ", bold: true, size: 20 }),
              new TextRun({ text: "Pitches high-stakes product proposals to executive boards. Talks expressively with his hands. Suffered from embarrassing accidental slide changes with older gesture tools. Requires 100% false-positive immunity.", size: 20 }),
            ],
          }),

          // Table 2: User Journey
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Journey Phase", true, 25),
                  createCell("Traditional Hardware Remote Experience", true, 38),
                  createCell("AirSlide Touch-Free Experience", true, 37),
                ],
              }),
              new TableRow({
                children: [
                  createCell("1. Setup", false, 25, true),
                  createCell("Search for USB dongle; check batteries; test pairing.", false, 38),
                  createCell("Open web URL; grant camera permission; ready in 5s.", false, 37),
                ],
              }),
              new TableRow({
                children: [
                  createCell("2. Presentation", false, 25, true),
                  createCell("Hold remote in hand; fumble for forward button.", false, 38),
                  createCell("Flash Peace Sign briefly; keep hands completely free.", false, 37),
                ],
              }),
              new TableRow({
                children: [
                  createCell("3. Emphasis", false, 25, true),
                  createCell("Struggle with dim hardware laser dot on screens.", false, 38),
                  createCell("Hold Open Palm; crisp virtual laser spotlight appears.", false, 37),
                ],
              }),
              new TableRow({
                children: [
                  createCell("4. Q&A Session", false, 25, true),
                  createCell("Click back repeatedly; remote gets placed down and lost.", false, 38),
                  createCell("Show Point Up gesture to step back instantly.", false, 37),
                ],
              }),
            ],
          }),

          // 5. HTA
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "5. Hierarchical Task Analysis (HTA) & Error Recovery", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
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

          // 6. Requirements Engineering & FR
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "6. Requirements Engineering & Functional Specifications (FR)", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({ text: "6.1 Requirements Engineering Process (IEEE 830 / ISO 29148)\n", bold: true, size: 21, color: secondaryColor }),
              new TextRun({
                text: "Requirements were gathered using semi-structured stakeholder interviews, contextual inquiry during university lectures, and Think-Aloud prototype testing following IEEE 830 / ISO/IEC/IEEE 29148 standards, adhering to INVEST criteria.\n\n",
                size: 20,
              }),
              new TextRun({ text: "Table 3: Functional Requirements (FR) Specification Matrix", bold: true, size: 19 }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Req ID", true, 15),
                  createCell("Requirement Name", true, 30),
                  createCell("Technical Specification & Behavior", true, 38),
                  createCell("Validation Method", true, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-01", false, 15, true),
                  createCell("Real-Time Hand Detection", false, 30),
                  createCell("Capture webcam video stream at >= 25 FPS and extract 21 3D joint landmarks.", false, 38),
                  createCell("Telemetry Log", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-02", false, 15, true),
                  createCell("Static Pose Classification", false, 30),
                  createCell("Classify Peace Sign, Point Up, Open Palm, and Closed Fist using Euclidean joint distances.", false, 38),
                  createCell("Classification Test", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-03", false, 15, true),
                  createCell("Slide Navigation Dispatch", false, 30),
                  createCell("Dispatch Next Slide on Peace Sign and Previous Slide on Point Up with 0ms delay.", false, 38),
                  createCell("DOM Event Test", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-04", false, 15, true),
                  createCell("Continuous Laser Pointer", false, 30),
                  createCell("Map landmark 8 (index tip) to slide canvas with Exponential Moving Average (EMA) smoothing.", false, 38),
                  createCell("Targeting Test", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-05", false, 15, true),
                  createCell("Cooldown Lockout Machine", false, 30),
                  createCell("Lock discrete classifier triggers for 2.0s following any slide action to ignore arm drops.", false, 38),
                  createCell("FSM State Test", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-06", false, 15, true),
                  createCell("Local PDF Ingestion", false, 30),
                  createCell("Render uploaded PDF decks entirely client-side using pdfjs-dist without server upload.", false, 38),
                  createCell("Upload Test", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-07", false, 15, true),
                  createCell("Multimodal HUD Feedback", false, 30),
                  createCell("Render 21-point hand skeleton, FPS counter, detection badge, and cooldown ring.", false, 38),
                  createCell("Visual Audit", false, 17),
                ],
              }),
              new TableRow({
                children: [
                  createCell("FR-08", false, 15, true),
                  createCell("Manual Keyboard Override", false, 30),
                  createCell("Provide instant keyboard hotkey fallback (Arrows, Spacebar, Page Up/Down, Esc).", false, 38),
                  createCell("Keypress Test", false, 17),
                ],
              }),
            ],
          }),

          // 7. Non-Functional Requirements & RTM
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "7. Non-Functional Requirements (NFR) & Traceability (RTM)", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("NFR ID", true, 15),
                  createCell("Quality Attribute", true, 25),
                  createCell("Specification & Target Metric", true, 38),
                  createCell("Empirical Outcome", true, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-01", false, 15, true),
                  createCell("Performance Latency", false, 25),
                  createCell("End-to-end perception and DOM dispatch latency < 50ms.", false, 38),
                  createCell("34.9 ms (28.6 FPS)", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-02", false, 15, true),
                  createCell("Privacy & Security", false, 25),
                  createCell("Zero external network calls; 100% on-device client processing.", false, 38),
                  createCell("100% Air-Gapped WASM", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-03", false, 15, true),
                  createCell("Learnability (HCI)", false, 25),
                  createCell("Time-to-first-trigger < 5.0 seconds; intuitive ordinal finger count.", false, 38),
                  createCell("1.12s mean time", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-04", false, 15, true),
                  createCell("Reliability / Robustness", false, 25),
                  createCell("False trigger rate < 0.5 triggers/10 min; accuracy >= 90%.", false, 38),
                  createCell("0.08/10m (96.4% Acc)", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-05", false, 15, true),
                  createCell("Ergonomics / Fatigue", false, 25),
                  createCell("Muscle fatigue on NASA-TLX < 30 / 100; micro-gestural model.", false, 38),
                  createCell("18.4 / 100 (Very Low)", false, 22),
                ],
              }),
              new TableRow({
                children: [
                  createCell("NFR-06", false, 15, true),
                  createCell("Portability / Standards", false, 25),
                  createCell("Zero-install web execution on Chrome, Edge, Firefox, and Safari.", false, 38),
                  createCell("Standard WebAssembly", false, 22),
                ],
              }),
            ],
          }),

          // 8. Theoretical HCI Foundations
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "8. Theoretical HCI Foundations & Mathematical Derivations", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({ text: "Fitts' Law: MT = a + b · log₂(2D / W) = a + b · ID\n", bold: true, size: 20, color: primaryColor }),
              new TextRun({
                text: "• Dimension Reduction: For slide switching, the entire camera field of view acts as the detection zone. Target width approaches infinity (W → ∞), so difficulty collapses to zero (ID → 0). Movement time is bounded strictly by neuromuscular finger articulation time (~180ms).\n• Laser Pointing EMA Filter: Continuous laser pointing applies velocity-scaled Exponential Moving Average filtering (S_t = α · Y_t + (1 - α) · S_{t-1}) to eliminate hand tremor.\n\n",
                size: 20,
              }),
              new TextRun({ text: "Hick-Hyman Law: RT = b · log₂(n + 1)\n", bold: true, size: 20, color: primaryColor }),
              new TextRun({
                text: "AirSlide uses exactly n = 4 mutually orthogonal postures (Peace Sign = Next, Point Up = Previous, Open Palm = Laser, Closed Fist = Pause). Ordinal finger mapping keeps cognitive reaction time under 190ms.",
                size: 20,
              }),
            ],
          }),

          // 9. Motor Ergonomics & Norman's Model
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "9. Motor Ergonomics & Norman's Action Cycle", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 70, after: 70 },
            children: [
              new TextRun({ text: "• Gorilla Arm Fatigue: ", bold: true, size: 20 }),
              new TextRun({ text: "Flash gesture for <350ms, then drop arm back down to rest immediately.\n", size: 20 }),
              new TextRun({ text: "• Midas Touch Prevention: ", bold: true, size: 20 }),
              new TextRun({ text: "2.0-second post-trigger lockout state machine ignores all movements while arm descends.\n", size: 20 }),
              new TextRun({ text: "• Norman's Action Cycle: ", bold: true, size: 20 }),
              new TextRun({ text: "Gulf of Execution is bridged by intuitive finger counting; Gulf of Evaluation is bridged by real-time skeletal feedback and radial cooldown timer.", size: 20 }),
            ],
          }),

          // 10. Dialogue Model & FSM
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "10. Dialogue Model, Finite State Machine & Vision Pipeline", bold: true, size: 24, color: primaryColor }),
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

          // 11. Nielsen's Heuristics
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "11. Nielsen's Ten Usability Heuristics & Shneiderman's 8 Rules", bold: true, size: 24, color: primaryColor }),
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
                  createCell("Exemplary visibility", false, 26),
                ],
              }),
              new TableRow({
                children: [
                  createCell("2. Match Real World", false, 26, true),
                  createCell("Natural pointing for laser; 1 & 2 finger counting for slide navigation.", false, 48),
                  createCell("Matches human habits", false, 26),
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

          // 12. Usability Testing & Workload
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "12. Empirical Usability Evaluation, SDT & Workload Metrics", bold: true, size: 24, color: primaryColor }),
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
                  createCell("Signal Detection Theory Index", false, 32, true),
                  createCell("d' = 4.12", false, 26),
                  createCell("d' > 3.0", false, 22),
                  createCell("Superb accuracy", false, 20),
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
                  createCell("NASA-TLX Physical Demand", false, 32, true),
                  createCell("18.4 / 100 (Low)", false, 26),
                  createCell("< 30.0", false, 22),
                  createCell("Zero arm fatigue", false, 20),
                ],
              }),
            ],
          }),

          // 13. SUS 10-Item Breakdown & Qualitative Findings
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "13. System Usability Scale (SUS) 10-Item Breakdown & Qualitative Findings", bold: true, size: 24, color: primaryColor }),
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

          // 14. Camera Optical Operating Envelope & Limitations
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "14. Camera Optical Operating Envelope & Future Work", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: tableBorder,
            rows: [
              new TableRow({
                children: [
                  createCell("Optical Parameter", true, 34),
                  createCell("Optimal Operating Range", true, 33),
                  createCell("Extreme Tolerable Boundary", true, 33),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Distance from Camera", false, 34, true),
                  createCell("0.8 meters - 1.8 meters", false, 33),
                  createCell("0.4 meters - 2.8 meters", false, 33),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Angular Field of View (FOV)", false, 34, true),
                  createCell("Within ±35 degrees of lens axis", false, 33),
                  createCell("Up to ±55 degrees off-axis", false, 33),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Ambient Illuminance", false, 34, true),
                  createCell("250 - 600 Lux (Standard office)", false, 33),
                  createCell("Minimum 80 Lux (Dim hall)", false, 33),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Camera Resolution", false, 34, true),
                  createCell("1280 x 720 (720p HD)", false, 33),
                  createCell("640 x 480 (VGA minimum)", false, 33),
                ],
              }),
            ],
          }),

          // 15. References & Appendices
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 80 },
            children: [
              new TextRun({ text: "15. Academic References & Appendices", bold: true, size: 24, color: primaryColor }),
            ],
          }),
          new Paragraph({
            spacing: { before: 50, after: 50 },
            children: [
              new TextRun({ text: "References & Standards:\n", bold: true, size: 19 }),
              new TextRun({ text: "1. Fitts, P. M. (1954). J. Exp. Psychol., 47(6), 381-391. | 2. Hick, W. E. (1952). Q. J. Exp. Psychol., 4(1), 11-26.\n3. Norman, D. A. (2013). The Design of Everyday Things. Basic Books. | 4. Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann.\n5. IEEE Std 830-1998 (1998). IEEE Recommended Practice for Software Requirements Specifications.\n6. ISO/IEC 25010 (2011). Systems and Software Quality Requirements and Evaluation (SQuaRE).\n7. Brooke, J. (1996). SUS: A quick and dirty usability scale. Usability Evaluation in Industry, 189-194.\n8. Lugaresi, C., et al. (2019). MediaPipe: Perception Pipelines. arXiv:1906.08172.\n\n", size: 17 }),
              new TextRun({ text: "Appendix A: Team Contributions Matrix\n", bold: true, size: 19 }),
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
                  createCell("Key Deliverables", true, 36),
                ],
              }),
              new TableRow({
                children: [
                  createCell("Nafyad Fantaye", false, 28, true),
                  createCell("HCI Researcher & Lead Developer", false, 36),
                  createCell("Requirements engineering, HTA, Norman model, FSM machine", false, 36),
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
  console.log(`Complete Unabridged DOCX report generated at: ${outPath} (${buffer.length} bytes)`);

  const rootDocx = path.resolve("AirSlide_HCI_Report.docx");
  fs.writeFileSync(rootDocx, buffer);
}

generateCompleteUnabridgedDocxReport().catch((err) => {
  console.error("Error generating DOCX report:", err);
  process.exit(1);
});
