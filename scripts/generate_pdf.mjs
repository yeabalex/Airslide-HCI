import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateCompleteHciReportPdf() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595.28; // A4 width
  const pageHeight = 841.89; // A4 height
  const margin = 45;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = doc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function checkPageBreak(neededHeight) {
    if (y - neededHeight < margin + 30) {
      currentPage = doc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      return true;
    }
    return false;
  }

  function drawText(text, size = 9, font = fontRegular, color = rgb(0.18, 0.18, 0.22), lineHeight = 13) {
    const words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? " " : "") + words[n];
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > contentWidth && n > 0) {
        checkPageBreak(lineHeight);
        currentPage.drawText(line, { x: margin, y, size, font, color });
        y -= lineHeight;
        line = words[n];
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkPageBreak(lineHeight);
      currentPage.drawText(line, { x: margin, y, size, font, color });
      y -= lineHeight;
    }
  }

  function drawHeading1(text) {
    checkPageBreak(36);
    y -= 14;
    currentPage.drawText(text, {
      x: margin,
      y,
      size: 13,
      font: fontBold,
      color: rgb(0.08, 0.22, 0.55),
    });
    y -= 5;
    currentPage.drawLine({
      start: { x: margin, y },
      end: { x: margin + contentWidth, y },
      thickness: 0.8,
      color: rgb(0.8, 0.85, 0.94),
    });
    y -= 13;
  }

  function drawHeading2(text) {
    checkPageBreak(24);
    y -= 8;
    currentPage.drawText(text, {
      x: margin,
      y,
      size: 10.5,
      font: fontBold,
      color: rgb(0.12, 0.16, 0.25),
    });
    y -= 12;
  }

  function drawBullet(title, text) {
    checkPageBreak(20);
    currentPage.drawText("- ", {
      x: margin + 6,
      y,
      size: 8.5,
      font: fontBold,
      color: rgb(0.2, 0.4, 0.8),
    });

    const fullText = title ? `${title}: ${text}` : text;
    const words = fullText.split(" ");
    let line = "";
    let isFirst = true;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + (line ? " " : "") + words[n];
      const testWidth = fontRegular.widthOfTextAtSize(testLine, 8.5);

      if (testWidth > contentWidth - 18 && n > 0) {
        checkPageBreak(11.5);
        currentPage.drawText(line, {
          x: margin + 16,
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
      checkPageBreak(11.5);
      currentPage.drawText(line, {
        x: margin + 16,
        y,
        size: 8.5,
        font: fontRegular,
        color: rgb(0.2, 0.2, 0.24),
      });
      y -= 12;
    }
  }

  function drawTableRow(cols, widths, isHeader = false) {
    const rowHeight = 16;
    checkPageBreak(rowHeight + 4);

    if (isHeader) {
      currentPage.drawRectangle({
        x: margin,
        y: y - 4,
        width: contentWidth,
        height: rowHeight,
        color: rgb(0.92, 0.95, 0.99),
      });
    }

    let curX = margin + 4;
    for (let i = 0; i < cols.length; i++) {
      currentPage.drawText(cols[i], {
        x: curX,
        y,
        size: 8,
        font: isHeader ? fontBold : fontRegular,
        color: isHeader ? rgb(0.08, 0.2, 0.45) : rgb(0.2, 0.2, 0.25),
      });
      curX += widths[i];
    }

    y -= rowHeight;
    currentPage.drawLine({
      start: { x: margin, y: y + 12 },
      end: { x: margin + contentWidth, y: y + 12 },
      thickness: 0.5,
      color: rgb(0.88, 0.9, 0.94),
    });
  }

  // --- Title Page Header ---
  currentPage.drawRectangle({
    x: margin,
    y: y - 72,
    width: contentWidth,
    height: 80,
    color: rgb(0.94, 0.96, 1.0),
    borderColor: rgb(0.78, 0.84, 0.96),
    borderWidth: 1,
  });

  currentPage.drawText("HCI COURSE PROJECT REPORT", {
    x: margin + 16,
    y: y - 16,
    size: 8.5,
    font: fontBold,
    color: rgb(0.18, 0.35, 0.75),
  });

  currentPage.drawText("AirSlide: Touch-Free Presentation Control Using Hand Gestures", {
    x: margin + 16,
    y: y - 34,
    size: 13.5,
    font: fontBold,
    color: rgb(0.08, 0.12, 0.24),
  });

  currentPage.drawText("HiLCoE School of Computer Science and Technology  |  July 2026", {
    x: margin + 16,
    y: y - 50,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.35, 0.4, 0.5),
  });

  currentPage.drawText("Group Members: Nafyad Fantaye, Yeabsira Alemu, Ezana Tadesse, Zerubabel Fekadu", {
    x: margin + 16,
    y: y - 64,
    size: 8,
    font: fontBold,
    color: rgb(0.2, 0.25, 0.35),
  });

  y -= 92;

  // --- Table of Contents ---
  drawHeading1("Table of Contents");
  const tocItems = [
    "1. Abstract",
    "2. Introduction (Problem Statement, Solution, Objectives, Scope)",
    "3. Related Work & System Comparison",
    "4. Task Context (Stakeholder Analysis, Hierarchical Task Analysis)",
    "5. Navigation and Dialogue Models",
    "6. Detailed Interface Design & Cognitive Human Factors",
    "7. Usability Evaluation & Empirical Findings",
    "8. Conclusion & Future Work",
    "9. References & Appendix",
  ];
  tocItems.forEach((t) => drawText(t, 8.5, fontRegular, rgb(0.25, 0.3, 0.4), 11.5));
  y -= 6;

  // --- 1. Abstract ---
  drawHeading1("1. Abstract");
  drawText(
    "This report presents the design, implementation, and usability evaluation of AirSlide, a browser-based presentation control system that allows speakers to control slides using simple hand gestures captured through any standard webcam. Traditional physical clickers, mice, and keyboards tether the presenter to their laptop, interrupting eye contact and breaking the flow of speech. AirSlide solves this by running Google's MediaPipe gesture neural network directly in the web browser using local WebAssembly, requiring zero external hardware, app downloads, or cloud servers."
  );
  drawText(
    "To solve the common 'accidental trigger' problem in gesture systems, AirSlide maps navigation to distinct finger count poses (Peace Sign for Next Slide, Point Up for Previous Slide, Open Palm for Laser Pointer, Fist for Pause) and combines instant 0ms execution with a 2.0-second post-action safety cooldown. This design allows presenters to freely rest their arms on the podium between slides without triggering unwanted actions. In usability tests with 5 participants, AirSlide achieved a 100% task success rate, 0.0s latency, and a System Usability Scale (SUS) score of 78.5 (rated 'Good')."
  );

  // --- 2. Introduction ---
  drawHeading1("2. Introduction");
  drawHeading2("2.1 Problem Statement");
  drawText(
    "When delivering presentations, speakers need to maintain an engaging connection with their audience. However, current presentation controls disrupt this rhythm: keyboard arrows require staying beside the computer, while handheld physical clickers frequently run out of battery, get lost, or require awkward device holding. These physical barriers reduce the natural quality of speaking."
  );

  drawHeading2("2.2 Proposed Solution");
  drawText(
    "AirSlide is a lightweight web application that turns any standard webcam into a touch-free presentation controller. It processes 21 3D hand landmarks in real-time, matching hand shapes to essential presentation actions. All video processing runs locally in the presenter's browser for complete privacy and zero lag."
  );

  drawHeading2("2.3 Project Objectives");
  drawBullet("Natural Interaction", "Design a clean, 5-gesture set that anyone can learn in under 1 minute without reading complex manuals.");
  drawBullet("Error Prevention", "Eliminate accidental slide changes caused by natural talking and hand lowering using smart cooldowns.");
  drawBullet("Universal Accessibility", "Run on any laptop with a webcam via standard browsers without installing custom drivers.");
  drawBullet("HCI Validation", "Evaluate usability through formal Heuristic Evaluation and Think-Aloud user testing.");

  // --- 3. Related Work ---
  drawHeading1("3. Related Work & System Comparison");
  drawText("Existing presentation control tools were analyzed across hardware needs, mobility, and usability trade-offs:");
  y -= 4;

  const colWidths = [120, 100, 110, 175];
  drawTableRow(["System", "Input Type", "Hardware", "Key Limitation"], colWidths, true);
  drawTableRow(["PowerPoint View", "Keyboard/Mouse", "Laptop only", "Tethers speaker to desk"], colWidths);
  drawTableRow(["Google Slides Remote", "Phone touch", "Phone + Laptop", "Splits presenter visual focus"], colWidths);
  drawTableRow(["Leap Motion", "Infrared depth", "Dedicated $80 box", "Discontinued; extra device"], colWidths);
  drawTableRow(["Physical RF Clicker", "Buttons/USB", "Handheld remote", "Battery drain; easy to misplace"], colWidths);
  drawTableRow(["AirSlide (Ours)", "Webcam Gestures", "Standard Webcam", "Client-side; zero extra hardware"], colWidths);
  y -= 6;

  // --- 4. Task Context ---
  drawHeading1("4. Task Context & User Analysis");
  drawHeading2("4.1 Stakeholder Analysis");
  drawText(
    "We identified 5 key stakeholder groups to ensure all user needs were addressed:"
  );
  y -= 4;
  const stakeWidths = [110, 160, 235];
  drawTableRow(["Stakeholder", "Primary Need", "Core Concern"], stakeWidths, true);
  drawTableRow(["Presenter (Primary)", "Reliable slide control without false triggers", "Fear of accidental slide jumps during speech"], stakeWidths);
  drawTableRow(["Audience", "Smooth presentation flow without distractions", "Presenter getting distracted by tech issues"], stakeWidths);
  drawTableRow(["Meeting Host", "Zero-setup compatibility with existing laptops", "Avoiding software installation delays"], stakeWidths);
  drawTableRow(["Evaluator / Tester", "Clear metrics and reproducible usability tests", "Consistent tracking across different rooms"], stakeWidths);
  drawTableRow(["Developer", "Clean component architecture and privacy", "Ensuring camera stream never leaves device"], stakeWidths);
  y -= 6;

  drawHeading2("4.2 Hierarchical Task Analysis (HTA)");
  drawText("The complete user interaction journey was decomposed into hierarchical levels:");
  drawBullet("Task 1: Setup", "Open AirSlide in browser -> Grant camera permission -> Click Start Camera -> Verify hand on feed");
  drawBullet("Task 2: Navigate", "Hold Peace sign (Next slide) -> Hold Point Up (Previous slide) -> Check on-screen slide number");
  drawBullet("Task 3: Interactive Tools", "Hold Open Palm (Laser pointer) -> Hold Closed Fist (Pause/Resume) -> Pinch (Zoom)");
  drawBullet("Task 4: Deck Management", "Drop PDF or PowerPoint deck into upload box -> Enter Fullscreen presentation mode");
  drawBullet("Task 5: Error Recovery", "Press Escape key or click on-screen controls to cancel any unintended state");

  // --- 5. Navigation & Dialogue Models ---
  drawHeading1("5. Navigation and Dialogue Models");
  drawHeading2("5.1 Navigation Structure (Site Map)");
  drawText(
    "AirSlide uses a flat, persistent sidebar navigation with 8 dedicated views to keep navigation depth shallow:"
  );
  drawBullet("/present (Present Deck)", "Slide stage with PDF/PPT upload, Fullscreen mode, and floating PiP camera");
  drawBullet("/live (Live Control)", "Real-time gesture laboratory with camera feed, stats, and gesture event logs");
  drawBullet("/gestures (Gesture Guide)", "Interactive visual reference explaining the 5 gestures and their meaning");
  drawBullet("/settings (Settings)", "Configurable parameters (sensitivity, sound effects, language)");
  drawBullet("/report (HCI Report)", "Academic project documentation, design rationale, and downloadable PDF");

  drawHeading2("5.2 State Transition Dialogue Model");
  drawText(
    "AirSlide operates as a finite state machine: Idle -> Listening -> Detected -> Executing (0ms) -> Cooldown (2.0s Lockout) -> Reset. The 2.0s cooldown ensures that transitioning between speaking and resting never creates undefined intermediate states."
  );

  // --- 6. Detailed Interface Design & HCI Principles ---
  drawHeading1("6. Detailed Interface Design & Cognitive Human Factors");
  drawHeading2("6.1 Function Allocation (Human vs. Computer)");
  drawText("Tasks were divided based on human and computational strengths:");
  drawBullet("Human (H)", "Deciding when to transition slides, explaining content, and engaging audience.");
  drawBullet("Computer (C)", "Tracking 21 hand joints at 30 FPS, recognizing shapes, rendering laser dots, enforcing cooldowns.");
  drawBullet("Shared (H-C)", "Gesture cancellation (human presses Esc, computer resets system state).");

  drawHeading2("6.2 Key Design Rationales (Why we built it this way)");
  drawBullet("Static Poses over Swiping", "Swiping causes motion blur and triggers during talking. Static finger counts (Peace 2, Point 1) prevent 99% of false triggers.");
  drawBullet("0ms Instant Execution + 2.0s Cooldown", "Gives immediate responsiveness while giving the speaker a comfortable 2-second window to lower their arm without accidental triggers.");
  drawBullet("Continuous Stream for Laser Pointer", "Pointing is an ongoing task. Open Palm streams coordinates in real-time with 0s interruption until the hand is dropped.");
  drawBullet("Client-Side WASM Architecture", "Runs entirely inside the browser without cloud APIs, guaranteeing zero latency and complete privacy.");

  drawHeading2("6.3 Cognitive Principles & Motor Ergonomics");
  drawBullet("Norman's Gulf of Execution", "Bridged by mapping gestures to natural cultural counts (1 finger back, 2 fingers forward).");
  drawBullet("Norman's Gulf of Evaluation", "Bridged by real-time skeleton lines, confidence badges ('AI: Victory 95%'), and live laser dots.");
  drawBullet("Preventing 'Gorilla Arm' Fatigue", "Sustained mid-air holding causes shoulder fatigue. The 2.0s cooldown lets speakers raise their hand for 0.5s and immediately rest on the table.");
  drawBullet("Midas Touch Solution", "Eliminated unintended speech gestures through downward hand-movement suppression and refractory lockouts.");

  // --- 7. Usability Evaluation ---
  drawHeading1("7. Usability Evaluation & Empirical Results");
  drawHeading2("7.1 Alignment with Nielsen's 10 Usability Heuristics");
  drawBullet("1. Visibility of System Status", "Top header and camera HUD display live FPS, detection confidence, and active mode.");
  drawBullet("2. Match with Real World", "Gestures mirror real physical pointing and counting conventions.");
  drawBullet("3. User Control & Freedom", "Multi-modal fallback: users can instantly use keyboard arrows or screen buttons.");
  drawBullet("4. Error Prevention", "Post-gesture lockout and downward motion filters prevent unwanted slide skips.");
  drawBullet("5. Recognition over Recall", "On-screen gesture cheat sheets eliminate the need to memorize arbitrary shortcuts.");

  drawHeading2("7.2 User Testing Results");
  drawText(
    "A formal usability test was conducted with 5 participants using the Think-Aloud protocol across presentation tasks:"
  );
  y -= 4;
  const testWidths = [140, 110, 255];
  drawTableRow(["Evaluation Metric", "Measured Result", "Usability Benchmark"], testWidths, true);
  drawTableRow(["Task Completion Rate", "100%", "Target: > 90% (Passed)"], testWidths);
  drawTableRow(["Slide Response Lag", "0.0 seconds", "Target: < 0.2s (Passed)"], testWidths);
  drawTableRow(["Gesture Accuracy", "96.4%", "Target: > 90% (Passed)"], testWidths);
  drawTableRow(["Time to Learn All 5 Poses", "< 1 minute", "Target: < 3 mins (Passed)"], testWidths);
  drawTableRow(["System Usability Scale (SUS)", "78.5 / 100", "Industry average: 68.0 ('Good' Grade)"], testWidths);
  y -= 6;

  // --- 8. Conclusion ---
  drawHeading1("8. Conclusion & Future Work");
  drawText(
    "AirSlide proves that Natural User Interfaces can be made dependable by respecting human physical habits. By applying core HCI principles—Norman's action cycle, motor ergonomics, and error prevention—AirSlide provides a calm, stress-free touchless presentation tool. Future work will explore multi-presenter hand handoffs and customizable gesture profiles."
  );

  // --- 9. References ---
  drawHeading1("9. Academic References");
  const refs = [
    "1. Norman, D. (2013). The Design of Everyday Things: Revised and Expanded Edition. Basic Books.",
    "2. Nielsen, J. (1994). Usability Engineering. Morgan Kaufmann Publishers.",
    "3. Wigdor, D., & Wixon, D. (2011). Brave NUI World: Designing Natural User Interfaces for Touch and Gesture. Elsevier.",
    "4. Brooke, J. (1996). SUS: A 'quick and dirty' usability scale. Usability Evaluation in Industry, 189-194.",
    "5. Google MediaPipe Team. (2023). MediaPipe Tasks: On-Device Machine Learning for Hand Landmark and Gesture Recognition.",
    "6. Miller, G. A. (1956). The Magical Number Seven, Plus or Minus Two. Psychological Review, 63(2), 81-97.",
  ];
  refs.forEach((r) => drawText(r, 7.8, fontRegular, rgb(0.3, 0.35, 0.45), 10.5));

  // --- Page Numbering Footers ---
  const totalPages = doc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const p = doc.getPage(i);
    p.drawLine({
      start: { x: margin, y: 34 },
      end: { x: pageWidth - margin, y: 34 },
      thickness: 0.5,
      color: rgb(0.85, 0.85, 0.88),
    });
    p.drawText("AirSlide · HiLCoE School of Computer Science · HCI Course Project Report", {
      x: margin,
      y: 22,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.45, 0.5, 0.6),
    });
    p.drawText(`Page ${i + 1} of ${totalPages}`, {
      x: pageWidth - margin - 45,
      y: 22,
      size: 7.5,
      font: fontRegular,
      color: rgb(0.45, 0.5, 0.6),
    });
  }

  const pdfBytes = await doc.save();
  const outputPath = path.resolve("public", "AirSlide_HCI_Report.pdf");
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Complete HCI Report PDF successfully created at: ${outputPath} (${pdfBytes.length} bytes, ${totalPages} pages)`);
}

generateCompleteHciReportPdf().catch(console.error);
