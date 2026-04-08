import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { GuitarScene } from "@/components/three/GuitarScene";
import { LoadingScreen } from "@/components/three/LoadingScreen";

export function CanvasWrapper() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 1, 8] }}
        gl={{
          antialias: true,
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
