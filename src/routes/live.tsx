import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { CameraFeed } from "@/components/airslide/CameraFeed";
import { GesturePanel } from "@/components/airslide/GesturePanel";
import { PresentationPreview } from "@/components/airslide/PresentationPreview";
import { ControlBar } from "@/components/airslide/ControlBar";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live Control - AirSlide" },
      {
        name: "description",
        content: "Real-time gesture control with confirmation feedback.",
      },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  return (
    <AppShell
      title="Live Control"
      subtitle="Camera feed, gesture recognition, and presentation in one view."
    >
      <div className="grid gap-6">
        <ControlBar />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-6">
            <CameraFeed />
            <PresentationPreview />
          </div>
          <GesturePanel />
        </div>
      </div>
    </AppShell>
  );
}
