import { useAirSlide } from "@/lib/airslide-store";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Crosshair, HelpCircle, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export function ControlBar() {
  const s = useAirSlide();

  return (
    <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3">
      <div className="flex flex-wrap items-center gap-2">
        {s.cameraOn ? (
          <Button variant="destructive" onClick={s.stopCamera}>
            <CameraOff className="h-4 w-4" />
            Stop Camera
          </Button>
        ) : (
          <Button
            className="bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90"
            onClick={s.startCamera}
          >
            <Camera className="h-4 w-4" />
            Start Camera
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Calibration complete", {
              description: "Recognition confidence recalibrated to your lighting.",
            })
          }
        >
          <Crosshair className="h-4 w-4" />
          Calibration
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/settings">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/gestures">
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </Button>
      </div>
    </div>
  );
}
