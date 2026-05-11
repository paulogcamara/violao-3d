import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { LoadingScreen } from "@/components/three/LoadingScreen";
import { getDeviceTier, getMaxDpr } from "@/lib/device-tier";

const GuitarScene = lazy(() =>
  import("@/components/three/GuitarScene").then((m) => ({ default: m.GuitarScene }))
);

export function CanvasWrapper() {
  const tier = getDeviceTier();
  const maxDpr = getMaxDpr();
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, maxDpr]}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 1, 8] }}
        gl={{
          antialias: tier !== "low",
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <GuitarScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
