import { Environment } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";
import { GuitarModel } from "./GuitarModel";
import { ParticleSystem } from "./ParticleSystem";
import { PostProcessing } from "./PostProcessing";

export function GuitarScene() {
  return (
    <>
      <CameraRig />
      <SceneLighting />
      <Environment preset="night" />
      <GuitarModel />
      <ParticleSystem />
      <PostProcessing />
    </>
  );
}
