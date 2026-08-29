import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/airslide/AppShell";
import { useAirSlide } from "@/lib/airslide-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings - AirSlide" },
      { name: "description", content: "Customize camera, gestures, and appearance." },
    ],
  }),
  component: SettingsPage,
});

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_260px] items-center gap-6 border-b border-border/60 py-4 last:border-b-0">
      <div className="min-w-0">
        <Label className="text-sm font-medium">{label}</Label>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="justify-self-end">{children}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SettingsPage() {
  const s = useAirSlide();

  return (
    <AppShell title="Settings" subtitle="Tune AirSlide to match your presenting style.">
      <div className="mx-auto grid max-w-3xl gap-6">
        <Section title="Camera">
          <Row label="Camera device" hint="Select the webcam to use for tracking.">
            <Select defaultValue="facetime">
              <SelectTrigger className="w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facetime">FaceTime HD Camera</SelectItem>
                <SelectItem value="logi">Logitech C920 Pro</SelectItem>
                <SelectItem value="obs">OBS Virtual Camera</SelectItem>
              </SelectContent>
            </Select>
          </Row>
          <Row label="Camera state" hint="Manually toggle the feed on or off.">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {s.cameraOn ? "On" : "Off"}
              </span>
              <Switch checked={s.cameraOn} onCheckedChange={s.toggleCamera} />
            </div>
          </Row>
        </Section>

        <Section title="Recognition">
          <Row
            label="Gesture sensitivity"
            hint="Higher values detect subtler movements but risk false triggers."
          >
            <div className="w-[260px]">
              <Slider
                value={[s.sensitivity]}
                min={0}
                max={100}
                step={1}
                onValueChange={(v) => s.setSetting("sensitivity", v[0])}
              />
              <div className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                {s.sensitivity}%
              </div>
            </div>
          </Row>
          <Row
            label="Confirmation time"
            hint="How long to hold a gesture before it executes."
          >
            <div className="w-[260px]">
              <Slider
                value={[s.confirmationMs]}
                min={300}
                max={1500}
                step={50}
                onValueChange={(v) => s.setSetting("confirmationMs", v[0])}
              />
              <div className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                {(s.confirmationMs / 1000).toFixed(2)}s
              </div>
            </div>
          </Row>
          <Row label="Animation speed" hint="Speed of on-screen feedback animations.">
            <div className="w-[260px]">
              <Slider
                value={[s.animationSpeed]}
                min={0}
                max={100}
                step={1}
                onValueChange={(v) => s.setSetting("animationSpeed", v[0])}
              />
              <div className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                {s.animationSpeed}%
              </div>
            </div>
          </Row>
        </Section>

        <Section title="Appearance & feedback">
          <Row label="Dark mode" hint="AirSlide is optimized for dark environments.">
            <Switch checked disabled />
          </Row>
          <Row label="Sound effects" hint="Play a subtle chime on successful gestures.">
            <Switch
              checked={s.soundEffects}
              onCheckedChange={(v) => s.setSetting("soundEffects", v)}
            />
          </Row>
          <Row label="Language">
            <Select
              value={s.language}
              onValueChange={(v) => s.setSetting("language", v)}
            >
              <SelectTrigger className="w-[260px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Español">Español</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
                <SelectItem value="Deutsch">Deutsch</SelectItem>
                <SelectItem value="日本語">日本語</SelectItem>
              </SelectContent>
            </Select>
          </Row>
        </Section>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Changes are applied immediately.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              s.restoreDefaults();
              toast.success("Defaults restored");
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Restore defaults
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
