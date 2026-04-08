import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import {
  positionCurve,
  lookAtCurve,
  getProgressOnCurve,
} from "@/config/camera-path";
import { useScrollStore } from "@/stores/scroll-store";

const _targetPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const progress = useScrollStore.getState().progress;
    const curveT = getProgressOnCurve(progress);

    positionCurve.getPointAt(curveT, _targetPos);
    lookAtCurve.getPointAt(curveT, _targetLookAt);

    // Suavizacao extra
    camera.position.lerp(_targetPos, 0.08);
    currentLookAtRef.current.lerp(_targetLookAt, 0.08);

    camera.lookAt(currentLookAtRef.current);
  });

  return null;
}
