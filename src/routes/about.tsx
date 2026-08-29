import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { GraduationCap, Accessibility, Eye, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - AirSlide" },
      {
        name: "description",
        content:
          "AirSlide is a Human-Computer Interaction project demonstrating gesture-based natural user interfaces.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { icon: Eye, title: "Visibility of status", body: "Every state - camera, tracking, confidence, confirmation - is always visible." },
  { icon: ShieldCheck, title: "Error prevention", body: "A short confirmation hold prevents accidental slide changes." },
  { icon: Zap, title: "Immediate feedback", body: "Every gesture animates a ring, then a success confirmation." },
  { icon: Accessibility, title: "Accessibility", body: "High contrast, keyboard cancel, tooltips, and readable typography." },
];

function AboutPage() {
  return (
    <AppShell title="About" subtitle="What AirSlide is, and the principles behind it.">
      <div className="mx-auto grid max-w-4xl gap-8">
        <div className="glass overflow-hidden rounded-3xl p-10">
          <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[image:var(--gradient-primary)] glow-primary">
          <img src="/icon.png" alt="AirSlide logo" className="h-10 w-10 object-cover" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Project
              </div>
              <h2 className="text-3xl font-bold tracking-tight">AirSlide</h2>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            AirSlide is a touch-free presentation control system. It lets presenters
            advance slides, pause, zoom, and highlight content using natural hand
            gestures detected through any standard webcam - no clicker, no keyboard,
            no returning to the laptop mid-sentence.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {["HCI", "Natural UI", "Gesture Recognition", "Usability", "Accessibility"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-muted-foreground"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Academic context</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Built as a Human-Computer Interaction (HCI) academic project
                demonstrating gesture-based interaction, usability principles, and
                natural user interfaces. This prototype simulates recognition so the
                interaction and feedback loop can be studied without depending on the
                underlying computer vision pipeline.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            HCI principles applied
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass rounded-2xl p-5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h4 className="mt-3 text-base font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          AirSlide · v1.0 prototype · Designed for HCI demonstration
        </div>
      </div>
    </AppShell>
  );
}
