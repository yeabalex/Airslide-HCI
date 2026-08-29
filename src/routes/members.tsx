import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import {
  Users,
  Mail,
  GraduationCap,
  BookOpen,
  Code,
  ClipboardCheck,
} from "lucide-react";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Members - AirSlide" },
      {
        name: "description",
        content: "Group members and their contributions to the AirSlide HCI project.",
      },
    ],
  }),
  component: MembersPage,
});

const MEMBERS = [
  {
    name: "Nafyad Fantaye",
    initials: "NF",
    contributions: [
      "Introduction and Related Work",
      "Stakeholder Identification & Analysis",
      "Literature Review & Research",
      "Reference Compilation",
    ],
    phases: "Phase 1 (Stakeholders), Related Work, Introduction, References",
    icon: BookOpen,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Yeabsira Alemu",
    initials: "YA",
    contributions: [
      "Hierarchical Task Analysis",
      "Function Allocation (H/C/H-C)",
      "Design Rationale Documentation",
      "Task Decomposition & Workflow",
    ],
    phases: "Phase 2 (Task Analysis), Phase 3 (Function Allocation), Phase 4 (Design Rationale)",
    icon: Code,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    name: "Ezana Tadesse",
    initials: "ET",
    contributions: [
      "Navigation & Dialogue Model",
      "Detailed Interface Design",
      "Cognitive Issues Analysis",
      "Nielsen's Heuristics Mapping",
    ],
    phases: "Phase 5 (Navigation/Dialogue), Phase 6 (Interface Design), Cognitive Issues",
    icon: GraduationCap,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "Zerubabel Fekadu",
    initials: "ZF",
    contributions: [
      "Usability Evaluation Planning",
      "User Testing & SUS Analysis",
      "Evaluation Evidence Compilation",
      "Conclusion & Report Compilation",
    ],
    phases: "Phase 7 (Evaluation), Conclusion, Report Compilation",
    icon: ClipboardCheck,
    color: "from-amber-500/20 to-orange-500/20",
  },
];

function MembersPage() {
  return (
    <AppShell
      title="Group Members"
      subtitle="The team behind AirSlide - HiLCoE HCI Course Project."
    >
      <div className="mx-auto grid max-w-4xl gap-6">
        {/* Header */}
        <div className="glass overflow-hidden rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Our Team</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                4 members · HiLCoE School of Computer Science and Technology · Human-Computer
                Interaction Course · July 2026
              </p>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {MEMBERS.map(({ name, initials, contributions, phases, icon: Icon, color }) => (
            <article
              key={name}
              className="glass group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-0.5 hover:border-primary/50"
            >
              {/* Color header */}
              <div className={`bg-gradient-to-br ${color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-background/80 text-lg font-bold text-foreground backdrop-blur">
                    {initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {name.toLowerCase().replace(" ", ".")}@hilcoe.net
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key Contributions
                  </span>
                </div>
                <ul className="flex-1 space-y-2">
                  {contributions.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Design Phases
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{phases}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Team Info */}
        <div className="glass rounded-2xl p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Note
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            All four group members contributed equally to this project. Each member participated in
            all phases of the design lifecycle, from initial research through final evaluation. While
            each member had primary responsibility for specific sections, the technical implementation
            (code) was a collaborative effort with all members contributing to the codebase. Group
            meetings, code reviews, and prototype testing were conducted jointly.
          </p>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          AirSlide v1.0 · HiLCoE HCI Course Project · Group 2026
        </div>
      </div>
    </AppShell>
  );
}
