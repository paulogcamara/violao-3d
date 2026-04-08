import { useProgress, Html } from "@react-three/drei";

export function LoadingScreen() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-6">
        <div className="text-warm-300 font-serif text-2xl tracking-widest">
          VIOLAO 3D
        </div>

        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-warm-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-white/40 text-xs tracking-wider font-light">
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}
