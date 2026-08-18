import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { assemblyProgress } from "../../data/assemblyProgress";

interface SolarCarModelProps {
  activePartId: string | null;
}

type PositionPair = {
  exp: Vector3;
  asb: Vector3;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const stageProgress = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

export const SolarCarModel: React.FC<SolarCarModelProps> = ({
  activePartId,
}) => {
  const groupRef = useRef<Group>(null);

  const wheelFL = useRef<Group>(null);
  const wheelFR = useRef<Group>(null);
  const wheelRL = useRef<Group>(null);
  const wheelRR = useRef<Group>(null);
  const battery = useRef<Group>(null);
  const chassis = useRef<Group>(null);
  const motor = useRef<Group>(null);
  const electronics = useRef<Group>(null);
  const wiring = useRef<Group>(null);
  const solarPanelLeft = useRef<Group>(null);
  const solarPanelRight = useRef<Group>(null);
  const body = useRef<Group>(null);

  const positions = useMemo<Record<string, PositionPair>>(
    () => ({
      wheelFL: { exp: new Vector3(-4.2, 1.0, 3.2), asb: new Vector3(-1.65, 0.42, 1.35) },
      wheelFR: { exp: new Vector3(4.2, 1.0, 3.2), asb: new Vector3(1.65, 0.42, 1.35) },
      wheelRL: { exp: new Vector3(-4.2, 1.0, -3.2), asb: new Vector3(-1.65, 0.42, -1.35) },
      wheelRR: { exp: new Vector3(4.2, 1.0, -3.2), asb: new Vector3(1.65, 0.42, -1.35) },
      battery: { exp: new Vector3(0, 4.2, 0), asb: new Vector3(0, 0.58, 0) },
      chassis: { exp: new Vector3(0, -3.2, 0), asb: new Vector3(0, 0.72, 0) },
      motor: { exp: new Vector3(0, 0.7, -4.8), asb: new Vector3(0, 0.72, -1.05) },
      electronics: { exp: new Vector3(0, 3.5, 1), asb: new Vector3(0, 0.95, 0.75) },
      wiring: { exp: new Vector3(0, 3.8, -0.3), asb: new Vector3(0, 0.86, 0) },
      solarLeft: { exp: new Vector3(-4.5, 4.2, 0.2), asb: new Vector3(-0.78, 1.58, 0) },
      solarRight: { exp: new Vector3(4.5, 4.2, 0.2), asb: new Vector3(0.78, 1.58, 0) },
      body: { exp: new Vector3(0, 5.3, 0.2), asb: new Vector3(0, 1.25, 0) },
    }),
    []
  );

  const targets = useMemo(
    () => ({
      wheelFL: new Vector3(),
      wheelFR: new Vector3(),
      wheelRL: new Vector3(),
      wheelRR: new Vector3(),
      battery: new Vector3(),
      chassis: new Vector3(),
      motor: new Vector3(),
      electronics: new Vector3(),
      wiring: new Vector3(),
      solarLeft: new Vector3(),
      solarRight: new Vector3(),
      body: new Vector3(),
      cameraPos: new Vector3(),
      cameraLook: new Vector3(),
    }),
    []
  );

  const cameraViews = useMemo(
    () => [
      { progress: 0, pos: new Vector3(5.2, 2.8, 5.8), look: new Vector3(0, 0.7, 0) },
      { progress: 0.15, pos: new Vector3(4.2, 1.9, 4.8), look: new Vector3(0, 0.45, 0.7) },
      { progress: 0.3, pos: new Vector3(3.6, 2.8, 3.8), look: new Vector3(0, 0.6, 0) },
      { progress: 0.45, pos: new Vector3(4.5, 2.3, 4.5), look: new Vector3(0, 0.65, 0) },
      { progress: 0.6, pos: new Vector3(2.3, 1.7, -4.6), look: new Vector3(0, 0.7, -1) },
      { progress: 0.72, pos: new Vector3(3.2, 2.8, 3.6), look: new Vector3(0, 0.9, 0.6) },
      { progress: 0.88, pos: new Vector3(0.2, 5.2, 3.4), look: new Vector3(0, 1.0, 0) },
      { progress: 1, pos: new Vector3(5.2, 3.2, 6.2), look: new Vector3(0, 0.65, 0) },
    ],
    []
  );

  useFrame((state) => {
    const progress = clamp01(assemblyProgress.value);

    const pWheels = stageProgress(progress, 0, 0.15);
    const pBattery = stageProgress(progress, 0.15, 0.3);
    const pChassis = stageProgress(progress, 0.3, 0.45);
    const pMotor = stageProgress(progress, 0.45, 0.6);
    const pControl = stageProgress(progress, 0.6, 0.72);
    const pSolar = stageProgress(progress, 0.72, 0.88);
    const pBody = stageProgress(progress, 0.88, 1);

    targets.wheelFL.lerpVectors(positions.wheelFL.exp, positions.wheelFL.asb, pWheels);
    targets.wheelFR.lerpVectors(positions.wheelFR.exp, positions.wheelFR.asb, pWheels);
    targets.wheelRL.lerpVectors(positions.wheelRL.exp, positions.wheelRL.asb, pWheels);
    targets.wheelRR.lerpVectors(positions.wheelRR.exp, positions.wheelRR.asb, pWheels);
    targets.battery.lerpVectors(positions.battery.exp, positions.battery.asb, pBattery);
    targets.chassis.lerpVectors(positions.chassis.exp, positions.chassis.asb, pChassis);
    targets.motor.lerpVectors(positions.motor.exp, positions.motor.asb, pMotor);
    targets.electronics.lerpVectors(positions.electronics.exp, positions.electronics.asb, pControl);
    targets.wiring.lerpVectors(positions.wiring.exp, positions.wiring.asb, pControl);
    targets.solarLeft.lerpVectors(positions.solarLeft.exp, positions.solarLeft.asb, pSolar);
    targets.solarRight.lerpVectors(positions.solarRight.exp, positions.solarRight.asb, pSolar);
    targets.body.lerpVectors(positions.body.exp, positions.body.asb, pBody);

    let previous = cameraViews[0];
    let next = cameraViews[cameraViews.length - 1];

    for (let i = 0; i < cameraViews.length - 1; i += 1) {
      if (progress >= cameraViews[i].progress && progress <= cameraViews[i + 1].progress) {
        previous = cameraViews[i];
        next = cameraViews[i + 1];
        break;
      }
    }

    const cameraProgress = clamp01(
      (progress - previous.progress) / (next.progress - previous.progress || 1)
    );

    targets.cameraPos.lerpVectors(previous.pos, next.pos, cameraProgress);
    targets.cameraLook.lerpVectors(previous.look, next.look, cameraProgress);

    const damping = 0.085;

    wheelFL.current?.position.lerp(targets.wheelFL, damping);
    wheelFR.current?.position.lerp(targets.wheelFR, damping);
    wheelRL.current?.position.lerp(targets.wheelRL, damping);
    wheelRR.current?.position.lerp(targets.wheelRR, damping);
    battery.current?.position.lerp(targets.battery, damping);
    chassis.current?.position.lerp(targets.chassis, damping);
    motor.current?.position.lerp(targets.motor, damping);
    electronics.current?.position.lerp(targets.electronics, damping);
    wiring.current?.position.lerp(targets.wiring, damping);
    solarPanelLeft.current?.position.lerp(targets.solarLeft, damping);
    solarPanelRight.current?.position.lerp(targets.solarRight, damping);
    body.current?.position.lerp(targets.body, damping);

    state.camera.position.lerp(targets.cameraPos, 0.045);

    const controls = state.controls as {
      target?: Vector3;
      update?: () => void;
    } | null;

    if (controls?.target && controls.update) {
      controls.target.lerp(targets.cameraLook, 0.045);
      controls.update();
    } else {
      state.camera.lookAt(targets.cameraLook);
    }

    if (progress > 0.9) {
      const wheelSpin = state.clock.getElapsedTime() * 0.7;
      wheelFL.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
      wheelFR.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
      wheelRL.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
      wheelRR.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
    }

    if (groupRef.current) {
      const targetRotation = progress > 0.96 ? 0.22 : 0;
      groupRef.current.rotation.y +=
        (targetRotation - groupRef.current.rotation.y) * 0.04;
    }
  });

  const material = (
    stageId: string,
    color: string,
    metalness = 0.65,
    roughness = 0.28
  ) => {
    const highlighted = activePartId === stageId;

    return {
      color: highlighted ? "#38BDF8" : color,
      metalness,
      roughness,
      emissive: highlighted ? "#0EA5E9" : "#000000",
      emissiveIntensity: highlighted ? 0.8 : 0.04,
    };
  };

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* WHEELS */}
      {[wheelFL, wheelFR, wheelRL, wheelRR].map((ref, index) => (
        <group key={index} ref={ref}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.58, 0.58, 0.28, 32]} />
            <meshStandardMaterial {...material("mobility", "#111827", 0.35, 0.55)} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.34, 0.34, 0.31, 20]} />
            <meshStandardMaterial {...material("mobility", "#64748B", 0.9, 0.18)} />
          </mesh>
        </group>
      ))}

      {/* CHASSIS / FRAME */}
      <group ref={chassis}>
        <mesh>
          <boxGeometry args={[3.4, 0.18, 2.3]} />
          <meshStandardMaterial {...material("structure", "#334155", 0.85, 0.25)} />
        </mesh>
        <mesh position={[0, 0.35, 1.02]}>
          <boxGeometry args={[3.25, 0.18, 0.16]} />
          <meshStandardMaterial {...material("structure", "#64748B", 0.85, 0.22)} />
        </mesh>
        <mesh position={[0, 0.35, -1.02]}>
          <boxGeometry args={[3.25, 0.18, 0.16]} />
          <meshStandardMaterial {...material("structure", "#64748B", 0.85, 0.22)} />
        </mesh>
        <mesh position={[-1.52, 0.35, 0]}>
          <boxGeometry args={[0.16, 0.18, 2.1]} />
          <meshStandardMaterial {...material("structure", "#64748B", 0.85, 0.22)} />
        </mesh>
        <mesh position={[1.52, 0.35, 0]}>
          <boxGeometry args={[0.16, 0.18, 2.1]} />
          <meshStandardMaterial {...material("structure", "#64748B", 0.85, 0.22)} />
        </mesh>
        <mesh position={[0, 0.42, 0.35]}>
          <boxGeometry args={[1.15, 0.18, 0.9]} />
          <meshStandardMaterial {...material("structure", "#1E293B", 0.55, 0.45)} />
        </mesh>
        <mesh position={[0, 0.78, 0.78]} rotation={[Math.PI / 2.8, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.75, 12]} />
          <meshStandardMaterial {...material("structure", "#94A3B8", 0.9, 0.18)} />
        </mesh>
        <mesh position={[0, 1.02, 1.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.28, 0.045, 10, 24]} />
          <meshStandardMaterial {...material("structure", "#64748B", 0.9, 0.18)} />
        </mesh>
      </group>

      {/* BATTERY */}
      <group ref={battery}>
        <mesh>
          <boxGeometry args={[1.75, 0.42, 1.25]} />
          <meshStandardMaterial {...material("power", "#1E293B", 0.75, 0.3)} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.25, 0.025, 0.78]} />
          <meshStandardMaterial color="#0F172A" metalness={0.2} roughness={0.55} />
        </mesh>
        <mesh position={[-0.62, 0.24, 0.42]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* MOTOR */}
      <group ref={motor}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.75, 24]} />
          <meshStandardMaterial {...material("propulsion", "#475569", 0.9, 0.2)} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.19, 0.19, 0.12, 20]} />
          <meshStandardMaterial {...material("propulsion", "#CBD5E1", 0.95, 0.15)} />
        </mesh>
      </group>

      {/* ELECTRONICS */}
      <group ref={electronics}>
        <mesh>
          <boxGeometry args={[0.9, 0.16, 0.62]} />
          <meshStandardMaterial {...material("control", "#0F172A", 0.6, 0.3)} />
        </mesh>
        <mesh position={[-0.22, 0.1, 0]}>
          <boxGeometry args={[0.16, 0.05, 0.22]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.22, 0.1, 0]}>
          <boxGeometry args={[0.16, 0.05, 0.22]} />
          <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* WIRING */}
      <group ref={wiring}>
        <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 8]} />
          <meshStandardMaterial {...material("control", "#111827", 0.15, 0.75)} />
        </mesh>
        <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.4, 8]} />
          <meshStandardMaterial {...material("control", "#111827", 0.15, 0.75)} />
        </mesh>
      </group>

      {/* SOLAR PANELS */}
      {[solarPanelLeft, solarPanelRight].map((ref, index) => (
        <group
          key={index}
          ref={ref}
          rotation={[-0.12, 0, index === 0 ? -0.08 : 0.08]}
        >
          <mesh>
            <boxGeometry args={[1.25, 0.08, 2.2]} />
            <meshStandardMaterial {...material("solar", "#0F2A4A", 0.75, 0.2)} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[1.05, 0.012, 2]} />
            <meshStandardMaterial color="#123A63" metalness={0.55} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* BODY / FINAL SHELL */}
      <group ref={body}>
        <mesh>
          <boxGeometry args={[3.45, 0.16, 2.05]} />
          <meshStandardMaterial {...material("final", "#1E293B", 0.9, 0.2)} />
        </mesh>
        <mesh position={[0, 0.48, 0.1]} scale={[1, 0.65, 0.88]}>
          <sphereGeometry args={[1.35, 32, 16]} />
          <meshStandardMaterial
            {...material("final", "#0B1220", 0.75, 0.18)}
            transparent
            opacity={0.76}
          />
        </mesh>
        <mesh position={[0, 0.58, 0.95]}>
          <boxGeometry args={[2.8, 0.12, 0.08]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.7} />
        </mesh>
      </group>
    </group>
  );
};
