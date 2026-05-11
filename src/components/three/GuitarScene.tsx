import { Environment } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";
import { GuitarModel } from "./GuitarModel";
import { ParticleSystem } from "./ParticleSystem";
import { PostProcessing } from "./PostProcessing";
import { shouldEnablePostFX } from "@/lib/device-tier";

export function GuitarScene() {
  const postFX = shouldEnablePostFX();
  return (
    <>
      <CameraRig />
      <SceneLighting />
      <Environment preset="night" />
      <GuitarModel />
      <ParticleSystem />
      {postFX && <PostProcessing />}
    </>
  );
}
