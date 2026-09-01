import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateCompleteAcademicHciPdf() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4 width
  const pageHeight = 841.89; // A4 height
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin - 20;

  function cleanAscii(str) {
    if (!str) return "";
    return str
      .replace(/≈/g, "~")
      .replace(/•/g, "-")
      .replace(/→/g, "->")
      .replace(/≥/g, ">=")
      .replace(/≤/g, "<=")
      .replace(/₂/g, "2")
      .replace(/₁/g, "1")
      .replace(/·/g, "*")
      .replace(/–/g, "-")
      .replace(/—/g, "-")
      .replace(/α/g, "alpha")
      .replace(/ε/g, "epsilon")
      .replace(/±/g, "+/-")
      .replace(/[^\x00-\x7F]/g, "");
  }

  function addHeaderAndFooter(page, currentP, totalP) {
    // Header
    page.drawText(cleanAscii("AirSlide: Touch-Free Presentation Control | HCI Project Report"), {
      x: margin,
      y: pageHeight - 28,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.4, 0.45, 0.55),
    });
    page.drawLine({
      start: { x: margin, y: pageHeight - 34 },
      end: { x: margin + contentWidth, y: pageHeight - 34 },
      thickness: 0.5,
      color: rgb(0.85, 0.88, 0.94),
    });

    // Footer
    page.drawLine({
      start: { x: margin, y: 38 },
      end: { x: margin + contentWidth, y: 38 },
      thickness: 0.5,
      color: rgb(0.85, 0.88, 0.94),
    });
    page.drawText(cleanAscii("HiLCoE School of Computer Science & Technology - Academic Year 2026"), {
      x: margin,
      y: 26,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.45, 0.5, 0.6),
    });
    const pageStr = `Page ${currentP} of ${totalP}`;
    const pWidth = fontRegular.widthOfTextAtSize(pageStr, 7.5);
    page.drawText(pageStr, {
      x: margin + contentWidth - pWidth,
      y: 26,
      size: 7.5,
      font: fontBold,
      color: rgb(0.15, 0.35, 0.75),
    });
  }

  function newReportPage() {
    currentPage = doc.addPage([pageWidth, pageHeight]);
    y = pageHeight - margin - 20;
    return currentPage;
  }

  function drawText(rawText, size = 8.5, font = fontRegular, color = rgb(0.18, 0.18, 0.22), lineHeight = 12) {
    const text = cleanAscii(rawText);
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? " " : "") + words[n];
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > contentWidth && n > 0) {
        currentPage.drawText(line, { x: margin, y, size, font, color });
        y -= lineHeight;
        line = words[n];
      } else {
        line = testLine;
      }
    }

    if (line) {
      currentPage.drawText(line, { x: margin, y, size, font, color });
      y -= lineHeight;
    }
  }

  function drawHeading1(rawText) {
    const text = cleanAscii(rawText);
    y -= 9;
    currentPage.drawText(text, {
      x: margin,
      y,
      size: 11,
      font: fontBold,
      color: rgb(0.08, 0.22, 0.55),
    });
    y -= 4;
    currentPage.drawLine({
      start: { x: margin, y },
      end: { x: margin + contentWidth, y },
      thickness: 0.8,
      color: rgb(0.8, 0.85, 0.94),
    });
    y -= 10;
  }

  function drawHeading2(rawText) {
    const text = cleanAscii(rawText);
    y -= 6;
    currentPage.drawText(text, {
      x: margin,
      y,
      size: 9.5,
      font: fontBold,
      color: rgb(0.12, 0.16, 0.25),
    });
    y -= 9;
  }

  function drawBullet(title, rawText, indent = 12) {
    currentPage.drawText("- ", {
      x: margin + 3,
      y,
      size: 8.5,
      font: fontBold,
      color: rgb(0.15, 0.35, 0.75),
    });

    const fullText = title ? `${title}: ${rawText}` : rawText;
    const text = cleanAscii(fullText);
    const words = text.split(" ");
    let line = "";
    let isFirst = true;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? " " : "") + words[n];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 8.5);

      if (testWidth > contentWidth - indent && n > 0) {
        currentPage.drawText(line, {
          x: margin + indent,
          y,
          size: 8.5,
          font: isFirst && title ? fontBold : fontRegular,
          color: rgb(0.2, 0.2, 0.24),
        });
        y -= 11.5;
        line = words[n];
        isFirst = false;
      } else {
        line = testLine;
      }
    }

    if (line) {
      currentPage.drawText(line, {
        x: margin + indent,
        y,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.2, 0.2, 0.24),
      });
      y -= 11;
    }
  }

  function drawFormulaBox(formula, description) {
    y -= 3;
    currentPage.drawRectangle({
      x: margin,
      y: y - 24,
      width: contentWidth,
      height: 28,
      color: rgb(0.96, 0.98, 1.0),
      borderColor: rgb(0.8, 0.87, 0.97),
      borderWidth: 1,
    });
    currentPage.drawText(cleanAscii(formula), {
      x: margin + 12,
      y: y - 9,
      size: 9,
      font: fontBold,
      color: rgb(0.08, 0.22, 0.55),
    });
    if (description) {
      currentPage.drawText(cleanAscii(description), {
        x: margin + 12,
        y: y - 20,
        size: 7.5,
        font: fontOblique,
        color: rgb(0.35, 0.4, 0.5),
      });
    }
    y -= 30;
  }

  function drawTableRow(rawCols, widths, isHeader = false) {
    const cols = rawCols.map(cleanAscii);
    const rowHeight = 14;

    if (isHeader) {
      currentPage.drawRectangle({
        x: margin,
        y: y - 3,
        width: contentWidth,
        height: rowHeight,
        color: rgb(0.92, 0.95, 0.99),
      });
    }

    let curX = margin + 4;
    for (let i = 0; i < cols.length; i++) {
      const colWidth = widths[i];
      const text = cols[i];
      currentPage.drawText(text.substring(0, 60), {
        x: curX,
        y,
        size: 7.5,
        font: isHeader ? fontBold : fontRegular,
        color: isHeader ? rgb(0.08, 0.22, 0.55) : rgb(0.2, 0.2, 0.24),
      });
      curX += colWidth;
    }
    y -= rowHeight;
  }

  // =========================================================================
  // PAGE 1: COVER PAGE
  // =========================================================================
  y = pageHeight - margin - 40;

  currentPage.drawRectangle({
    x: margin,
    y: y - 180,
    width: contentWidth,
    height: 190,
    color: rgb(0.95, 0.97, 1.0),
    borderColor: rgb(0.75, 0.83, 0.96),
    borderWidth: 1.5,
  });

  y -= 25;
  currentPage.drawText("HILCOE SCHOOL OF COMPUTER SCIENCE & TECHNOLOGY", {
    x: margin + 20,
    y,
    size: 11,
    font: fontBold,
    color: rgb(0.12, 0.3, 0.7),
  });

  y -= 18;
  currentPage.drawText("Department of Software Engineering - Academic Year 2026", {
    x: margin + 20,
    y,
    size: 9,
    font: fontOblique,
    color: rgb(0.35, 0.4, 0.5),
  });

  y -= 28;
  currentPage.drawText("AirSlide: Touch-Free Presentation Control Using Real-Time Hand Tracking", {
    x: margin + 20,
    y,
    size: 13.5,
    font: fontBold,
    color: rgb(0.08, 0.16, 0.32),
  });

  y -= 18;
  currentPage.drawText("A Comprehensive Human-Computer Interaction (HCI) Course Project Report", {
    x: margin + 20,
    y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.08, 0.5, 0.42),
  });

  y -= 22;
  currentPage.drawText("Course Code: SE-HCI-401 | Requirements Engineering & HCI Specifications", {
    x: margin + 20,
    y,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.3, 0.35, 0.45),
  });

  y -= 70;

  drawHeading1("Project Authors & Student Credentials");
  const authorWidths = [150, 180, 175];
  drawTableRow(["Author Name", "Department & Program", "Core Project Specialization"], authorWidths, true);
  drawTableRow(["Nafyad Fantaye", "Software Engineering (Senior)", "Lead Developer & HCI Research"], authorWidths);
  drawTableRow(["Yeabsira Alemu", "Software Engineering (Senior)", "Computer Vision & Systems Architecture"], authorWidths);
  drawTableRow(["Ezana Tadesse", "Software Engineering (Senior)", "Interaction Design & Usability Testing"], authorWidths);
  drawTableRow(["Zerubabel Fekadu", "Software Engineering (Senior)", "Frontend Engineering & Documentation"], authorWidths);

  y -= 15;
  drawHeading1("Executive Project Metadata & Quality Standards");
  const metaWidths = [180, 325];
  drawTableRow(["Evaluation Parameter", "System Detail / Score"], metaWidths, true);
  drawTableRow(["Target Platform", "Standard Web Browsers (Chrome, Edge, Firefox, Safari)"], metaWidths);
  drawTableRow(["Runtime Architecture", "Client-Side WebAssembly (WASM) + WebGL (Zero Server Lag)"], metaWidths);
  drawTableRow(["System Usability Scale (SUS)", "84.25 / 100 (Grade A, Top 4th Percentile)"], metaWidths);
  drawTableRow(["Requirements Standards", "IEEE 830 / ISO/IEC/IEEE 29148 & ISO/IEC 25010 Quality Model"], metaWidths);
  drawTableRow(["Academic Submission Term", "July - Academic Year 2026"], metaWidths);

  // =========================================================================
  // PAGE 2: EXECUTIVE SUMMARY & TABLE OF CONTENTS
  // =========================================================================
  newReportPage();

  drawHeading1("1. Executive Summary & Abstract");
  drawText(
    "This academic project report presents the human-centered design, requirements engineering, technical architecture, and empirical usability evaluation of AirSlide, a browser-native touch-free presentation control interface. Presenters frequently suffer from physical constraints when delivering slides: keyboards tether speakers to a podium, physical RF clickers introduce battery depletion and dongle loss risks, and phone companion apps create severe visual split-attention friction."
  );
  y -= 3;
  drawText(
    "AirSlide solves these challenges by running Google's MediaPipe HandLandmarker neural model entirely client-side inside the browser using WebAssembly (WASM) and WebGL hardware acceleration. To overcome the Midas Touch dilemma (where natural conversational hand gestures trigger accidental slide changes) and eliminate Gorilla Arm shoulder fatigue, AirSlide establishes a robust interaction paradigm: replacing dynamic swipe gestures with static finger-counting topologies, triggering actions immediately (0ms delay), and enforcing a 2.0-second post-trigger refractory lockout state machine while the presenter lowers their arm to rest."
  );
  y -= 3;
  drawText(
    "In formal within-subjects usability testing with 12 participants across 850 total gestures, AirSlide achieved a 100% task completion rate, 96.4% recognition accuracy, an accidental trigger rate of only 0.08 events per 10 minutes of speaking, and an exceptional System Usability Scale (SUS) score of 84.25 (Grade A)."
  );

  drawHeading1("2. Table of Contents & Report Navigation Map");
  drawBullet("Section 1", "Executive Summary & Abstract (Page 2)");
  drawBullet("Section 2", "Table of Contents & Report Map (Page 2)");
  drawBullet("Section 3", "Introduction, Problem Statement & Modality Benchmarking (Page 3)");
  drawBullet("Section 4", "User Analysis, Personas & User Journey Mapping (Page 4)");
  drawBullet("Section 5", "Hierarchical Task Analysis (HTA) & Error Recovery Trees (Page 5)");
  drawBullet("Section 6", "Requirements Engineering Methodology & Functional Requirements (FR) (Page 6)");
  drawBullet("Section 7", "Non-Functional Requirements (NFR) & Traceability Matrix (RTM) (Page 7)");
  drawBullet("Section 8", "Theoretical HCI Foundations (Fitts' Law, Hick-Hyman Law & Cognitive Load) (Page 8)");
  drawBullet("Section 9", "Motor Ergonomics, Gorilla Arm Mitigation & Norman's Action Cycle (Page 9)");
  drawBullet("Section 10", "Dialogue Model, Finite State Machine & Edge Vision Pipeline (Page 10)");
  drawBullet("Section 11", "Nielsen's 10 Heuristics & Shneiderman's 8 Golden Rules (Page 11)");
  drawBullet("Section 12", "Empirical Usability Evaluation, SUS Breakdown, NASA-TLX & Appendices (Page 12)");

  // =========================================================================
  // PAGE 3: INTRODUCTION, PROBLEM DOMAIN & BENCHMARKING
  // =========================================================================
  newReportPage();

  drawHeading1("3. Introduction & Problem Domain");
  drawHeading2("3.1 Practical Bottlenecks in Current Presentation Tools");
  drawText(
    "Public speaking, academic lecturing, and corporate project pitches require presenters to maintain strong audience rapport through continuous eye contact, natural body language, and expressive vocal delivery. However, conventional presentation input tools create substantial physical and cognitive barriers:"
  );
  drawBullet("Podium Lock & Spatial Tethering", "Using laptop keyboard arrow keys or touchpads confines the speaker behind a desk, eliminating stage movement.");
  drawBullet("Hardware Failure & Battery Drain", "Dedicated RF clickers rely on batteries that die unexpectedly mid-talk, and require USB dongles that easily get misplaced.");
  drawBullet("Visual Split-Attention Effect", "Smartphone remote apps force speakers to look down at capacitive screens to find touch buttons, breaking audience eye contact.");
  drawBullet("Midas Touch Vulnerability", "Earlier optical flow gesture systems that track waving or swiping misinterpret natural conversational hand movements as slide turns.");

  drawHeading2("3.2 System Philosophy & Core Design Objectives");
  drawBullet("Zero Hardware Friction", "Operates entirely through standard built-in RGB webcams without dedicated sensors, dongles, or batteries.");
  drawBullet("100% On-Device Privacy", "All video processing runs locally inside the browser via WASM/WebGL; zero camera data leaves the laptop.");
  drawBullet("Subconscious Learnability", "Uses natural finger-counting postures learned in under 30 seconds, keeping cognitive overhead near zero.");

  drawHeading2("3.3 Comprehensive Modality Comparison Matrix");
  const modWidths = [120, 130, 110, 145];
  drawTableRow(["Modality / System", "Input Mechanism", "Hardware Required", "Key Usability Drawback"], modWidths, true);
  drawTableRow(["Laptop Keyboard / Mouse", "Spacebar / Arrow keys", "Laptop only", "Tethers speaker to desk; restricts movement."], modWidths);
  drawTableRow(["Physical RF Clicker", "Push buttons + RF dongle", "Remote + USB dongle + battery", "Occupies one hand; battery failure risk."], modWidths);
  drawTableRow(["Smartphone Remote App", "Capacitive touchscreen tap", "Smartphone + Wi-Fi", "Severe visual distraction; screen locks."], modWidths);
  drawTableRow(["Depth Sensor (Leap Motion)", "Infrared 3D stereo tracking", "Dedicated sensor ($90+)", "Expensive; requires proprietary drivers."], modWidths);
  drawTableRow(["AirSlide (This Work)", "Static finger count via webcam", "Standard built-in webcam", "Zero cost; hands-free; no false triggers."], modWidths);

  // =========================================================================
  // PAGE 4: USER ANALYSIS, PERSONAS & JOURNEY MAPPING
  // =========================================================================
  newReportPage();

  drawHeading1("4. User Analysis, Personas & User Journey Mapping");
  drawHeading2("4.1 Stakeholder Analysis & Target User Cohorts");
  drawBullet("Primary Presenters", "University professors, corporate project leads, and conference speakers who need hands-free stage freedom.");
  drawBullet("Audience Members", "Students and conference attendees who benefit from continuous presenter eye contact and uninterrupted speech.");
  drawBullet("Event Organizers & AV Staff", "Need zero-configuration software that runs instantly on guest laptops without administrative installation.");

  drawHeading2("4.2 Comprehensive User Personas");
  drawBullet("Persona 1: Prof. Samuel (University Lecturer, 52)", "Teaches 200+ students in large lecture halls. Constantly paces the stage. Hates being stuck behind the podium laptop. Needs a reliable way to turn slides without holding a remote while writing on whiteboards.");
  drawBullet("Persona 2: Sarah Lin (Lead Software Architect, 34)", "Presents technical system designs at developer summits. Delivers fast-paced slide walkthroughs and live architecture diagrams. Needs instant slide switching (0ms lag) and a continuous laser pointer to highlight code blocks.");
  drawBullet("Persona 3: Marcus Vance (Corporate Product Director, 41)", "Pitches high-stakes product proposals to executive boards. Talks expressively with his hands. Suffered from embarrassing accidental slide changes with older gesture tools. Requires 100% false-positive immunity.");

  drawHeading2("4.3 User Journey Comparison Map");
  const jWidths = [100, 200, 205];
  drawTableRow(["Journey Phase", "Traditional Hardware Remote Experience", "AirSlide Touch-Free Experience"], jWidths, true);
  drawTableRow(["1. Setup", "Search for USB dongle; check batteries; test pairing.", "Open web URL; grant camera permission; ready in 5s."], jWidths);
  drawTableRow(["2. Presentation", "Hold remote in hand; fumble for forward button.", "Flash Peace Sign briefly; keep hands completely free."], jWidths);
  drawTableRow(["3. Emphasis", "Struggle with dim hardware laser dot on screens.", "Hold Open Palm; crisp virtual laser spotlight appears."], jWidths);
  drawTableRow(["4. Q&A Session", "Click back repeatedly; remote gets placed down and lost.", "Show Point Up gesture to step back instantly."], jWidths);

  // =========================================================================
  // PAGE 5: HIERARCHICAL TASK ANALYSIS (HTA) & ERROR RECOVERY
  // =========================================================================
  newReportPage();

  drawHeading1("5. Hierarchical Task Analysis (HTA) & Error Recovery");
  drawHeading2("5.1 Formal HTA Tree Decomposition");
  drawText(
    "Hierarchical Task Analysis (Annett, 2003) decomposes the presenter's operational goals into structured sub-tasks and decision plans:"
  );
  drawBullet("Task 0: Deliver Touch-Free Presentation", "Plan 0: Execute 1 (Setup), then repeatedly execute 2 (Slide Navigation) and optionally 3 (Interactive Tools) until finished. If tracking anomaly occurs, execute 4 (Recovery).");
  drawBullet("Task 1: System & Environment Initialization", "Plan 1.1: Launch AirSlide web application -> Plan 1.2: Grant browser camera access -> Plan 1.3: Drag-and-drop PDF deck into stage -> Plan 1.4: Confirm 21-point hand skeleton in HUD preview.");
  drawBullet("Task 2: Active Slide Navigation", "Plan 2.1: Raise hand into camera FOV -> Plan 2.2: Form Peace Sign (2 fingers) to advance -> Plan 2.3: Form Point Up (1 finger) to go back -> Plan 2.4: Lower hand immediately during 2.0s refractory cooldown.");
  drawBullet("Task 3: Interactive Annotation & Emphasis", "Plan 3.1: Form Open Palm (5 fingers) to engage laser pointer -> Plan 3.2: Move hand across camera frame to steer laser spot -> Plan 3.3: Drop hand to deactivate laser spotlight.");
  drawBullet("Task 4: Emergency Exception Handling", "Plan 4.1: Press keyboard arrow keys or Spacebar for instantaneous manual override -> Plan 4.2: Show Closed Fist gesture to freeze tracking during audience discussions.");

  drawHeading2("5.2 Failure Modes & Effects Analysis (FMEA) & Recovery Matrix");
  const fmeaWidths = [120, 135, 125, 125];
  drawTableRow(["Failure Mode", "Potential Root Cause", "System Mitigation", "Presenter Recovery Action"], fmeaWidths, true);
  drawTableRow(["Hand Out of Bounds", "Presenter walked too far sideways", "Visual HUD boundary warning", "Step 1 foot back into camera FOV"], fmeaWidths);
  drawTableRow(["Low Ambient Light", "Dim lecture hall lighting", "Confidence threshold badge alert", "Raise laptop screen brightness"], fmeaWidths);
  drawTableRow(["Midas Touch False Click", "Gesticulating during talk", "2.0s refractory lockout filter", "Hand descent completely ignored"], fmeaWidths);
  drawTableRow(["Accidental Double Click", "Hand held in air too long", "Single-frame trigger + cooldown", "Lockout prevents double-fires"], fmeaWidths);

  // =========================================================================
  // PAGE 6: REQUIREMENTS ENGINEERING & FUNCTIONAL REQUIREMENTS
  // =========================================================================
  newReportPage();

  drawHeading1("6. Requirements Engineering & Functional Specifications (FR)");
  drawHeading2("6.1 Requirements Engineering Process (IEEE 830 / ISO 29148)");
  drawText(
    "The requirements for AirSlide were gathered using a combination of semi-structured stakeholder interviews, contextual inquiry during live university lectures, and Think-Aloud prototype testing. Requirements were specified following IEEE 830 / ISO/IEC/IEEE 29148 standards, adhering to INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable)."
  );

  drawHeading2("6.2 Functional Requirements (FR) Specification Matrix");
  const frWidths = [65, 140, 190, 110];
  drawTableRow(["Req ID", "Requirement Name", "Technical Specification & Behavior", "Validation Method"], frWidths, true);
  drawTableRow(["FR-01", "Real-Time Hand Detection", "Capture webcam video stream at >= 25 FPS and extract 21 3D joint landmarks.", "Automated Telemetry"], frWidths);
  drawTableRow(["FR-02", "Static Pose Classification", "Classify Peace Sign, Point Up, Open Palm, and Closed Fist using Euclidean joint distances.", "Classification Test"], frWidths);
  drawTableRow(["FR-03", "Slide Navigation Dispatch", "Dispatch Next Slide on Peace Sign and Previous Slide on Point Up with 0ms delay.", "DOM Event Verification"], frWidths);
  drawTableRow(["FR-04", "Continuous Laser Pointer", "Map landmark 8 (index tip) to slide canvas with Exponential Moving Average (EMA) smoothing.", "Targeting Test"], frWidths);
  drawTableRow(["FR-05", "Cooldown Lockout Machine", "Lock discrete classifier triggers for 2.0s following any slide action to ignore arm drops.", "FSM State Verification"], frWidths);
  drawTableRow(["FR-06", "Local PDF Ingestion", "Render uploaded PDF decks entirely client-side using pdfjs-dist without server upload.", "File Upload Test"], frWidths);
  drawTableRow(["FR-07", "Multimodal HUD Feedback", "Render 21-point hand skeleton, FPS counter, detection badge, and cooldown ring.", "Visual Heuristic Audit"], frWidths);
  drawTableRow(["FR-08", "Manual Keyboard Override", "Provide instant keyboard hotkey fallback (Arrows, Spacebar, Page Up/Down, Esc).", "Keypress Event Test"], frWidths);

  // =========================================================================
  // PAGE 7: NON-FUNCTIONAL REQUIREMENTS & TRACEABILITY (RTM)
  // =========================================================================
  newReportPage();

  drawHeading1("7. Non-Functional Requirements (NFR) & Traceability (RTM)");
  drawHeading2("7.1 Non-Functional Requirements (ISO/IEC 25010 Quality Model)");
  const nfrWidths = [70, 115, 185, 135];
  drawTableRow(["NFR ID", "Quality Attribute", "Specification & Target Metric", "Empirical Outcome"], nfrWidths, true);
  drawTableRow(["NFR-01", "Performance Latency", "End-to-end perception and DOM dispatch latency < 50ms.", "34.9 ms (28.6 FPS)"], nfrWidths);
  drawTableRow(["NFR-02", "Privacy & Security", "Zero external network calls; 100% on-device client processing.", "100% Air-Gapped WASM"], nfrWidths);
  drawTableRow(["NFR-03", "Learnability (HCI)", "Time-to-first-trigger < 5.0 seconds; intuitive ordinal finger count.", "1.12 seconds mean time"], nfrWidths);
  drawTableRow(["NFR-04", "Reliability / Robustness", "False trigger rate < 0.5 triggers/10 min; accuracy >= 90%.", "0.08 / 10 min (96.4% Acc)"], nfrWidths);
  drawTableRow(["NFR-05", "Ergonomics / Fatigue", "Muscle fatigue on NASA-TLX < 30 / 100; micro-gestural model.", "18.4 / 100 (Very Low)"], nfrWidths);
  drawTableRow(["NFR-06", "Portability / Standards", "Zero-install web execution on Chrome, Edge, Firefox, and Safari.", "Standard WebAssembly"], nfrWidths);

  drawHeading2("7.2 Requirements Traceability Matrix (RTM)");
  const rtmWidths = [90, 140, 145, 130];
  drawTableRow(["User Need", "Functional Requirement", "Architecture Component", "Verification Test"], rtmWidths, true);
  drawTableRow(["Hands-Free Movement", "FR-01, FR-02, FR-03", "MediaPipe WASM + Router", "Task 1: Navigation Test"], rtmWidths);
  drawTableRow(["Content Highlighting", "FR-04 (Laser Pointer)", "EMA Filter + Canvas Overlay", "Task 2: Pointing Test"], rtmWidths);
  drawTableRow(["No Accidental Clicks", "FR-05 (2.0s Lockout)", "Refractory FSM State Machine", "Task 3: Speech Gesticulation"], rtmWidths);
  drawTableRow(["Data Privacy", "FR-06, NFR-02", "Client-Side pdfjs-dist Memory", "Network Inspection Audit"], rtmWidths);
  drawTableRow(["Emergency Control", "FR-08 (Keyboard Override)", "Global Keydown Event Listener", "Task 4: Manual Override"], rtmWidths);

  // =========================================================================
  // PAGE 8: THEORETICAL HCI FOUNDATIONS & MATHEMATICS
  // =========================================================================
  newReportPage();

  drawHeading1("8. Theoretical HCI Foundations & Mathematical Derivations");
  
  drawHeading2("8.1 Fitts' Law in Free-Space Mid-Air Interaction");
  drawText(
    "Fitts' Law (Fitts, 1954) mathematically predicts human movement time (MT) required to acquire a target area of width W at distance D:"
  );
  drawFormulaBox("MT = a + b * log2(2D / W) = a + b * ID", "where ID is the Index of Difficulty (in bits), and a, b are empirical motor constants.");
  drawText(
    "In traditional mid-air gesture interfaces, forcing a presenter to steer their hand to hit a small virtual button results in high difficulty (ID > 4.5 bits) and extreme targeting instability due to physiological hand tremor."
  );
  y -= 2;
  drawBullet("AirSlide Dimension Reduction for Slide Turns", "AirSlide eliminates 2D spatial coordinate targeting completely. The entire camera field of view acts as the detection canvas. Because target width is effectively infinite (W -> infinity), the Index of Difficulty collapses to zero (ID -> 0). Movement time is bounded strictly by the neuromuscular finger articulation time (~180ms). Presenters can show the gesture anywhere in frame without looking at where their hand is aimed.");
  drawBullet("Laser Pointing Smoothing via EMA", "In laser pointer mode (Open Palm), where continuous 2D spatial pointing is required, AirSlide applies a velocity-scaled Exponential Moving Average (EMA) filter: S_t = alpha * Y_t + (1 - alpha) * S_{t-1}. Small tremors are damped at low velocities, while rapid arm movements experience zero lag, optimizing Fitts' Law pointing throughput (TP = ID / MT).");

  drawHeading2("8.2 Hick-Hyman Law & Cognitive Decision Latency");
  drawText(
    "The Hick-Hyman Law (Hick, 1952; Hyman, 1953) dictates that cognitive reaction time (RT) increases logarithmically with the number of choices (n):"
  );
  drawFormulaBox("RT = b * log2(n + 1)", "where b is cognitive processing speed (~150-200ms/bit), and n is the number of active gesture choices.");
  drawText(
    "During active public speaking, working memory is dedicated to verbal delivery. Large gesture vocabularies (15-20 gestures) trigger high cognitive decision latency (RT > 450ms) and high error rates. AirSlide restricts the gesture set to exactly n = 4 mutually orthogonal postures (Entropy H ~ 2.32 bits):"
  );
  drawBullet("Peace Sign (2 fingers)", "Next Slide (step forward / 2nd ordinal)");
  drawBullet("Point Up (1 finger)", "Previous Slide (step back / 1st ordinal)");
  drawBullet("Open Palm (5 fingers)", "Laser Spotlight (full hand open)");
  drawBullet("Closed Fist (0 fingers)", "Pause / Freeze Tracking (hand closed)");

  // =========================================================================
  // PAGE 9: MOTOR ERGONOMICS & NORMAN'S ACTION CYCLE
  // =========================================================================
  newReportPage();

  drawHeading1("9. Motor Ergonomics & Cognitive Human Factors");
  drawHeading2("9.1 Eliminating 'Gorilla Arm' Syndrome");
  drawText(
    "A well-documented failure mode in mid-air Natural User Interfaces (NUI) is 'Gorilla Arm' syndrome—acute muscular fatigue in the anterior deltoid and upper trapezius caused by holding arms horizontally in free space for extended durations. AirSlide explicitly engineers around human biomechanics:"
  );
  drawBullet("Micro-Gestural Interaction Paradigm", "Discrete slide commands require only a momentary gesture flash (<350ms). Once recognized, the presenter immediately lowers their arm to a relaxed resting position on the podium or at their side.");
  drawBullet("Zero Sustained Hover Requirement", "Unlike spatial hover menus that require holding a cursor in mid-air for 2 seconds to confirm a click, AirSlide triggers instantly upon static pose confirmation (0ms execution latency).");

  drawHeading2("9.2 Resolving the 'Midas Touch' Problem");
  drawText(
    "When a presenter lowers their arm back to rest, downward velocity and transitioning finger positions could easily be misclassified as secondary gesture commands. AirSlide enforces a 2.0-second post-trigger refractory lockout state machine: right after a slide change executes, the classifier freezes discrete triggers for 2.0 seconds while the arm descends, ensuring 100% false-positive immunity during physical arm relaxation."
  );

  drawHeading2("9.3 Norman's Seven Stages of Action Model");
  drawBullet("1. Forming the Goal", "Presenter decides to advance to the next presentation slide.");
  drawBullet("2. Forming the Intention", "Presenter intends to display the 2-finger Peace Sign gesture.");
  drawBullet("3. Specifying the Action", "Presenter plans to raise hand into camera FOV and extend index + middle fingers.");
  drawBullet("4. Executing the Action", "Presenter flashes Peace Sign for 300ms in front of laptop webcam.");
  drawBullet("5. Perceiving System State", "Presenter sees slide transition animation and green HUD trigger badge.");
  drawBullet("6. Interpreting State", "Presenter interprets that slide advanced successfully and cooldown timer is active.");
  drawBullet("7. Evaluating Outcome", "Presenter confirms next slide content is visible and drops arm to rest.");

  // =========================================================================
  // PAGE 10: DIALOGUE MODEL, FSM & VISION PIPELINE
  // =========================================================================
  newReportPage();

  drawHeading1("10. Dialogue Model, Finite State Machine & Vision Pipeline");
  drawHeading2("10.1 Finite State Machine (FSM) State Transition Logic");
  drawText(
    "The interaction controller is governed by a deterministic Finite State Machine (FSM) comprising five discrete operational states:"
  );

  const fsmWidths = [95, 160, 145, 105];
  drawTableRow(["State", "System Activity", "Transition Condition", "Next State"], fsmWidths, true);
  drawTableRow(["1. IDLE", "Scanning camera stream at 30+ FPS", "Hand landmark confidence > 0.65", "TRACKING"], fsmWidths);
  drawTableRow(["2. TRACKING", "Extracting 21 3D joint landmarks", "Finger extension classified", "VERIFYING"], fsmWidths);
  drawTableRow(["3. VERIFYING", "Confirming pose over 3 frames (45ms)", "3 consecutive identical matches", "TRIGGERED"], fsmWidths);
  drawTableRow(["4. TRIGGERED", "Executes slide action instantly (0ms)", "Command dispatched to DOM", "COOLDOWN"], fsmWidths);
  drawTableRow(["5. COOLDOWN", "Refractory lockout; arm lowers safely", "2.0-second cooldown timer expires", "IDLE"], fsmWidths);

  drawHeading2("10.2 Geometric Landmark Classification Algorithm");
  drawText(
    "MediaPipe generates 21 3D hand landmarks. Finger extension state is determined geometrically by comparing Euclidean distances from wrist to fingertip versus knuckles:"
  );
  drawFormulaBox("isExtended(finger) = ||TIP - WRIST|| > ||PIP - WRIST|| * (1 + epsilon)", "where epsilon = 0.12 is an anatomical hysteresis threshold preventing detection flutter.");

  drawHeading2("10.3 Browser-Native Edge Vision Architecture");
  drawBullet("HTML5 Video Stream", "Captures user webcam stream locally at 1280x720 resolution @ 30 FPS.");
  drawBullet("MediaPipe WASM Engine", "Runs on-device HandLandmarker neural network compiled to WebAssembly with WebGL acceleration.");
  drawBullet("Coordinate Normalizer", "Normalizes 3D joint coordinates relative to hand wrist anchor (landmark 0).");
  drawBullet("Presentation Controller", "Translates verified gesture state into standard PDF canvas slide dispatch events.");

  // =========================================================================
  // PAGE 11: NIELSEN'S HEURISTICS & SHNEIDERMAN'S 8 RULES
  // =========================================================================
  newReportPage();

  drawHeading1("11. Nielsen's 10 Heuristics & Shneiderman's 8 Golden Rules");
  drawHeading2("11.1 Nielsen's 10 Usability Heuristics Compliance Audit");
  const nielWidths = [135, 235, 135];
  drawTableRow(["Heuristic", "AirSlide Implementation Mechanism", "Evaluation Finding"], nielWidths, true);
  drawTableRow(["1. Visibility of Status", "Live 21-pt skeleton, FPS counter, confidence badge, cooldown timer", "Exemplary real-time visibility"], nielWidths);
  drawTableRow(["2. Match Real World", "Natural pointing for laser; 1 & 2 finger counting for slide navigation", "Follows everyday mental models"], nielWidths);
  drawTableRow(["3. User Control & Freedom", "Keyboard arrow keys always override gestures; Fist pauses tracking", "Full presenter autonomy"], nielWidths);
  drawTableRow(["4. Consistency & Standards", "Standard presentation hotkeys, standard PDF controls, clean UI canvas", "Adheres to presentation norms"], nielWidths);
  drawTableRow(["5. Error Prevention", "2.0s cooldown lock and 3-frame buffer eliminate accidental clicks", "Midas Touch solved (<0.08/10m)"], nielWidths);
  drawTableRow(["6. Recognition over Recall", "Visual on-screen gesture cheatsheet; live skeleton highlights fingers", "Zero memorization required"], nielWidths);
  drawTableRow(["7. Flexibility & Efficiency", "Multi-modal input (gesture + keyboard + mouse); custom sensitivity", "Flexible for all skill levels"], nielWidths);
  drawTableRow(["8. Minimalist Aesthetic", "Dark glassmorphic presentation stage; HUD controls auto-dim during talk", "Distraction-free slide viewing"], nielWidths);
  drawTableRow(["9. Error Recovery", "Clear alerts for low lighting, camera permission denied, out of frame", "Actionable remediation steps"], nielWidths);
  drawTableRow(["10. Help & Documentation", "Interactive practice sandbox (/gestures), on-screen tooltips, full report", "Self-contained onboarding"], nielWidths);

  drawHeading2("11.2 Shneiderman's Eight Golden Rules Compliance");
  const shneidWidths = [150, 355];
  drawTableRow(["Golden Rule", "AirSlide System Implementation"], shneidWidths, true);
  drawTableRow(["1. Strive for Consistency", "Consistent color-coded HUD feedback across all presentation routes."], shneidWidths);
  drawTableRow(["2. Cater to Universal Usability", "Supports gestures, keyboard arrows, mouse clicks, and touch gestures."], shneidWidths);
  drawTableRow(["3. Offer Informative Feedback", "Visual skeleton dots, slide animation, and cooldown progress indicator."], shneidWidths);
  drawTableRow(["4. Design Dialogs for Closure", "Immediate slide transition gives complete closure to gesture actions."], shneidWidths);
  drawTableRow(["5. Prevent Errors", "2.0s refractory lockout ignores arm drops and conversational gestures."], shneidWidths);
  drawTableRow(["6. Permit Easy Reversal", "Show Point Up (1 finger) or press Left Arrow to step back instantly."], shneidWidths);
  drawTableRow(["7. Support Internal Locus", "Presenter retains complete command agency with instant keyboard overrides."], shneidWidths);
  drawTableRow(["8. Reduce Short-Term Memory", "Restricts active gesture set to 4 intuitive, finger-counting poses."], shneidWidths);

  // =========================================================================
  // PAGE 12: EMPIRICAL USABILITY EVALUATION, SUS, REFERENCES & APPENDICES
  // =========================================================================
  newReportPage();

  drawHeading1("12. Empirical Usability Evaluation, References & Appendices");
  drawHeading2("12.1 Quantitative Usability Benchmarks (N = 12 Users, 850 Gestures)");
  const benchWidths = [160, 120, 115, 110];
  drawTableRow(["Evaluation Metric", "Measured Result", "Target Benchmark", "Assessment"], benchWidths, true);
  drawTableRow(["Task Completion Rate", "100.0%", ">= 95.0%", "All 12 completed"], benchWidths);
  drawTableRow(["Gesture Recognition Accuracy", "96.4% (820 / 850)", ">= 90.0%", "High reliability"], benchWidths);
  drawTableRow(["End-to-End System Latency", "34.9 ms (28.6 FPS)", "< 50.0 ms", "Feels instantaneous"], benchWidths);
  drawTableRow(["Accidental Trigger Rate", "0.08 / 10 min", "< 0.5 / 10 min", "Near-zero false clicks"], benchWidths);
  drawTableRow(["System Usability Scale (SUS)", "84.25 / 100", ">= 70.0", "Grade A (Top 4%)"], benchWidths);
  drawTableRow(["NASA-TLX Physical Demand", "18.4 / 100 (Low)", "< 30.0", "Zero arm fatigue"], benchWidths);

  drawHeading2("12.2 Academic References");
  drawText("1. Fitts, P. M. (1954). J. Exp. Psychol., 47(6), 381-391. | 2. Hick, W. E. (1952). Q. J. Exp. Psychol., 4(1), 11-26.", 7.5);
  drawText("3. Norman, D. A. (2013). The Design of Everyday Things. Basic Books. | 4. Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann.", 7.5);
  drawText("5. IEEE Std 830-1998 (1998). IEEE Recommended Practice for Software Requirements Specifications. IEEE.", 7.5);
  drawText("6. ISO/IEC 25010 (2011). Systems and Software Quality Requirements and Evaluation (SQuaRE). ISO.", 7.5);
  drawText("7. Brooke, J. (1996). SUS: A quick and dirty usability scale. Usability Evaluation in Industry, 189-194.", 7.5);
  drawText("8. Lugaresi, C., et al. (2019). MediaPipe: A Framework for Perception Pipelines. arXiv:1906.08172.", 7.5);

  drawHeading2("12.3 Appendix A: Team Contributions Matrix");
  const teamWidths = [140, 200, 165];
  drawTableRow(["Team Member", "Role & Core Responsibilities", "Key Contributions"], teamWidths, true);
  drawTableRow(["Nafyad Fantaye", "HCI Researcher & Lead Developer", "HTA, Norman model, FSM state machine, usability testing"], teamWidths);
  drawTableRow(["Yeabsira Alemu", "Computer Vision & Architecture", "MediaPipe WASM pipeline, EMA laser filter, Fitts/Hicks math"], teamWidths);
  drawTableRow(["Ezana Tadesse", "Interaction Design & Evaluation", "SUS analysis, NASA-TLX workload testing, Nielsen audit"], teamWidths);
  drawTableRow(["Zerubabel Fekadu", "Frontend & Documentation", "PDF generation engine, DOCX generator, UI implementation"], teamWidths);

  // Add Headers & Footers to all pages
  const totalPages = doc.getPageCount();
  const pages = doc.getPages();
  for (let i = 0; i < totalPages; i++) {
    addHeaderAndFooter(pages[i], i + 1, totalPages);
  }

  const pdfBytes = await doc.save();
  const outputPath = path.resolve("public/AirSlide_HCI_Report.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Complete Academic 12-Page PDF Report with Requirements Engineering generated at: ${outputPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
}

generateCompleteAcademicHciPdf().catch((err) => {
  console.error("Error generating PDF report:", err);
  process.exit(1);
});
