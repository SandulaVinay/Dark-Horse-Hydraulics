import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { assemblyProgress } from "../../data/assemblyProgress";

interface SolarCarModelProps { activePartId: string | null; }
type PositionPair = { exp: Vector3; asb: Vector3 };
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const stageProgress = (progress: number, start: number, end: number) => clamp01((progress - start) / (end - start));

const C = {
  highlight: "#D9773F", highlightGlow: "#F09A5B", body: "#E4E0D7", bodyLight: "#F4F1E9",
  graphite: "#2B2D2A", graphiteSoft: "#4A4D48", metal: "#9B9C95", glass: "#284B4A",
  solar: "#1F4745", solarCell: "#163735", tyre: "#171916", brake: "#B8B8B0",
  headlight: "#FFF2D0", tailLight: "#D94B3D",
};

export const SolarCarModel: React.FC<SolarCarModelProps> = ({ activePartId }) => {
  const groupRef = useRef<Group>(null);
  const wheelFL = useRef<Group>(null), wheelFR = useRef<Group>(null), wheelRL = useRef<Group>(null), wheelRR = useRef<Group>(null);
  const battery = useRef<Group>(null), chassis = useRef<Group>(null), motor = useRef<Group>(null), electronics = useRef<Group>(null);
  const wiring = useRef<Group>(null), solarPanelLeft = useRef<Group>(null), solarPanelRight = useRef<Group>(null), body = useRef<Group>(null);

  const positions = useMemo<Record<string, PositionPair>>(() => ({
    wheelFL: { exp: new Vector3(-4.4, 1.0, 3.35), asb: new Vector3(-1.72, 0.43, 1.38) },
    wheelFR: { exp: new Vector3(4.4, 1.0, 3.35), asb: new Vector3(1.72, 0.43, 1.38) },
    wheelRL: { exp: new Vector3(-4.4, 1.0, -3.35), asb: new Vector3(-1.72, 0.43, -1.38) },
    wheelRR: { exp: new Vector3(4.4, 1.0, -3.35), asb: new Vector3(1.72, 0.43, -1.38) },
    battery: { exp: new Vector3(0, 4.2, 0), asb: new Vector3(0, 0.62, 0) },
    chassis: { exp: new Vector3(0, -3.2, 0), asb: new Vector3(0, 0.72, 0) },
    motor: { exp: new Vector3(0, 0.7, -4.8), asb: new Vector3(0, 0.72, -1.05) },
    electronics: { exp: new Vector3(0, 3.5, 1), asb: new Vector3(0, 0.98, 0.55) },
    wiring: { exp: new Vector3(0, 3.8, -0.3), asb: new Vector3(0, 0.92, 0) },
    solarLeft: { exp: new Vector3(-4.5, 4.2, 0.2), asb: new Vector3(-0.72, 2.42, -0.18) },
    solarRight: { exp: new Vector3(4.5, 4.2, 0.2), asb: new Vector3(0.72, 2.42, -0.18) },
    body: { exp: new Vector3(0, 5.3, 0.2), asb: new Vector3(0, 1.18, 0) },
  }), []);

  const targets = useMemo(() => ({
    wheelFL: new Vector3(), wheelFR: new Vector3(), wheelRL: new Vector3(), wheelRR: new Vector3(),
    battery: new Vector3(), chassis: new Vector3(), motor: new Vector3(), electronics: new Vector3(), wiring: new Vector3(),
    solarLeft: new Vector3(), solarRight: new Vector3(), body: new Vector3(), cameraPos: new Vector3(), cameraLook: new Vector3(),
  }), []);

  const cameraViews = useMemo(() => [
    { progress: 0, pos: new Vector3(6.0, 3.3, 6.6), look: new Vector3(0, 0.8, 0) },
    { progress: 0.15, pos: new Vector3(5.0, 2.4, 5.5), look: new Vector3(0, 0.55, 0.8) },
    { progress: 0.3, pos: new Vector3(4.4, 3.0, 5.0), look: new Vector3(0, 0.7, 0) },
    { progress: 0.45, pos: new Vector3(5.4, 2.7, 5.6), look: new Vector3(0, 0.65, 0) },
    { progress: 0.6, pos: new Vector3(3.0, 2.0, -5.6), look: new Vector3(0, 0.7, -1) },
    { progress: 0.72, pos: new Vector3(4.4, 3.4, 5.0), look: new Vector3(0, 1.0, 0.4) },
    { progress: 0.88, pos: new Vector3(5.4, 2.8, 5.8), look: new Vector3(0, 1.0, 0) },
    { progress: 1, pos: new Vector3(6.2, 3.2, 7.0), look: new Vector3(0, 0.75, 0) },
  ], []);

  useFrame((state) => {
    const progress = clamp01(assemblyProgress.value);
    const pWheels = stageProgress(progress, 0, 0.15), pBattery = stageProgress(progress, 0.15, 0.3),
      pChassis = stageProgress(progress, 0.3, 0.45), pMotor = stageProgress(progress, 0.45, 0.6),
      pControl = stageProgress(progress, 0.6, 0.72), pSolar = stageProgress(progress, 0.72, 0.88), pBody = stageProgress(progress, 0.88, 1);

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

    let previous = cameraViews[0], next = cameraViews[cameraViews.length - 1];
    for (let i = 0; i < cameraViews.length - 1; i += 1) {
      if (progress >= cameraViews[i].progress && progress <= cameraViews[i + 1].progress) { previous = cameraViews[i]; next = cameraViews[i + 1]; break; }
    }
    const cameraProgress = clamp01((progress - previous.progress) / (next.progress - previous.progress || 1));
    targets.cameraPos.lerpVectors(previous.pos, next.pos, cameraProgress);
    targets.cameraLook.lerpVectors(previous.look, next.look, cameraProgress);

    const damping = 0.095;
    wheelFL.current?.position.lerp(targets.wheelFL, damping); wheelFR.current?.position.lerp(targets.wheelFR, damping);
    wheelRL.current?.position.lerp(targets.wheelRL, damping); wheelRR.current?.position.lerp(targets.wheelRR, damping);
    battery.current?.position.lerp(targets.battery, damping); chassis.current?.position.lerp(targets.chassis, damping);
    motor.current?.position.lerp(targets.motor, damping); electronics.current?.position.lerp(targets.electronics, damping);
    wiring.current?.position.lerp(targets.wiring, damping); solarPanelLeft.current?.position.lerp(targets.solarLeft, damping);
    solarPanelRight.current?.position.lerp(targets.solarRight, damping); body.current?.position.lerp(targets.body, damping);

    state.camera.position.lerp(targets.cameraPos, 0.045);
    const controls = state.controls as { target?: Vector3; update?: () => void } | null;
    if (controls?.target && controls.update) { controls.target.lerp(targets.cameraLook, 0.045); controls.update(); }
    else state.camera.lookAt(targets.cameraLook);

    if (progress > 0.9) {
      const wheelSpin = state.clock.getElapsedTime() * 0.7;
      wheelFL.current?.rotation.set(wheelSpin, 0, Math.PI / 2); wheelFR.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
      wheelRL.current?.rotation.set(wheelSpin, 0, Math.PI / 2); wheelRR.current?.rotation.set(wheelSpin, 0, Math.PI / 2);
    }
    if (groupRef.current) groupRef.current.rotation.y += ((progress > 0.96 ? 0.12 : 0) - groupRef.current.rotation.y) * 0.04;
  });

  const material = (stageId: string, color: string, metalness = 0.65, roughness = 0.28) => {
    const highlighted = activePartId === stageId;
    return { color: highlighted ? C.highlight : color, metalness, roughness, emissive: highlighted ? C.highlightGlow : "#000000", emissiveIntensity: highlighted ? 1.15 : 0.02 };
  };
  const solarMaterial = (stageId: string) => {
    const highlighted = activePartId === stageId;
    return { color: highlighted ? C.highlight : C.solar, metalness: 0.72, roughness: 0.2, emissive: highlighted ? C.highlightGlow : "#0B2524", emissiveIntensity: highlighted ? 0.8 : 0.12 };
  };

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* Four proper road wheels */}
      {[wheelFL, wheelFR, wheelRL, wheelRR].map((ref, index) => (
        <group key={index} ref={ref}>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.66, 0.66, 0.34, 40]} /><meshStandardMaterial {...material("mobility", C.tyre, 0.25, 0.7)} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.42, 0.42, 0.37, 32]} /><meshStandardMaterial {...material("mobility", C.metal, 0.95, 0.14)} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.195]}><cylinderGeometry args={[0.25, 0.25, 0.035, 28]} /><meshStandardMaterial color={C.brake} metalness={0.9} roughness={0.2} /></mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.22]}><cylinderGeometry args={[0.075, 0.075, 0.05, 20]} /><meshStandardMaterial color={C.graphite} metalness={0.8} roughness={0.22} /></mesh>
        </group>
      ))}

      {/* Structural chassis */}
      <group ref={chassis}>
        <RoundedBox args={[3.55, 0.2, 2.5]} radius={0.06} smoothness={3}><meshStandardMaterial {...material("structure", C.metal, 0.9, 0.2)} /></RoundedBox>
        <RoundedBox args={[3.42, 0.16, 0.18]} position={[0, 0.28, 1.08]} radius={0.04}><meshStandardMaterial {...material("structure", C.graphiteSoft, 0.85, 0.24)} /></RoundedBox>
        <RoundedBox args={[3.42, 0.16, 0.18]} position={[0, 0.28, -1.08]} radius={0.04}><meshStandardMaterial {...material("structure", C.graphiteSoft, 0.85, 0.24)} /></RoundedBox>
        <RoundedBox args={[0.18, 0.16, 2.18]} position={[-1.55, 0.28, 0]} radius={0.04}><meshStandardMaterial {...material("structure", C.graphiteSoft, 0.85, 0.24)} /></RoundedBox>
        <RoundedBox args={[0.18, 0.16, 2.18]} position={[1.55, 0.28, 0]} radius={0.04}><meshStandardMaterial {...material("structure", C.graphiteSoft, 0.85, 0.24)} /></RoundedBox>
        <RoundedBox args={[2.5, 0.14, 0.16]} position={[0, 0.35, 0]} radius={0.035}><meshStandardMaterial {...material("structure", C.metal, 0.9, 0.18)} /></RoundedBox>
      </group>

      {/* Battery */}
      <group ref={battery}>
        <RoundedBox args={[1.9, 0.46, 1.38]} radius={0.09} smoothness={3}><meshStandardMaterial {...material("power", "#343832", 0.72, 0.28)} /></RoundedBox>
        <RoundedBox args={[1.45, 0.035, 0.92]} position={[0, 0.25, 0]} radius={0.015}><meshStandardMaterial color="#20231F" metalness={0.55} roughness={0.3} /></RoundedBox>
        {[-0.58, -0.19, 0.19, 0.58].map((x) => <mesh key={x} position={[x, 0.27, 0]}><boxGeometry args={[0.035, 0.025, 0.72]} /><meshStandardMaterial color="#7B7D73" metalness={0.6} roughness={0.25} /></mesh>)}
        <mesh position={[-0.7, 0.28, 0.45]}><sphereGeometry args={[0.055, 14, 14]} /><meshStandardMaterial color={C.highlight} emissive={C.highlightGlow} emissiveIntensity={1.4} /></mesh>
        <mesh position={[0.7, 0.28, -0.45]}><sphereGeometry args={[0.055, 14, 14]} /><meshStandardMaterial color="#F3EEE3" emissive="#F3EEE3" emissiveIntensity={0.45} /></mesh>
      </group>

      {/* Motor / powertrain */}
      <group ref={motor}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.46, 0.46, 0.82, 32]} /><meshStandardMaterial {...material("propulsion", "#6D7069", 0.95, 0.16)} /></mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.46]}><cylinderGeometry args={[0.22, 0.22, 0.14, 24]} /><meshStandardMaterial {...material("propulsion", C.metal, 0.96, 0.11)} /></mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.46]}><cylinderGeometry args={[0.14, 0.14, 0.1, 20]} /><meshStandardMaterial color="#C9C9C0" metalness={0.96} roughness={0.12} /></mesh>
        <mesh position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.05, 0.05, 0.85, 12]} /><meshStandardMaterial color="#555850" metalness={0.82} roughness={0.25} /></mesh>
      </group>

      {/* Electronics and controller */}
      <group ref={electronics}>
        <RoundedBox args={[1.05, 0.2, 0.72]} radius={0.06}><meshStandardMaterial {...material("control", C.graphite, 0.72, 0.25)} /></RoundedBox>
        <mesh position={[-0.27, 0.13, 0]}><boxGeometry args={[0.18, 0.045, 0.24]} /><meshStandardMaterial color={C.highlight} emissive={C.highlightGlow} emissiveIntensity={0.8} /></mesh>
        <mesh position={[0.27, 0.13, 0]}><boxGeometry args={[0.18, 0.045, 0.24]} /><meshStandardMaterial color="#D7D3C9" metalness={0.72} roughness={0.2} /></mesh>
      </group>

      {/* Wiring */}
      <group ref={wiring}>
        <mesh position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.03, 1.5, 10]} /><meshStandardMaterial {...material("control", "#3B3E39", 0.18, 0.75)} /></mesh>
        <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.03, 0.03, 1.5, 10]} /><meshStandardMaterial {...material("control", "#3B3E39", 0.18, 0.75)} /></mesh>
        <mesh position={[0, 0.04, -0.62]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.028, 0.028, 1.25, 10]} /><meshStandardMaterial color="#8B4D35" metalness={0.25} roughness={0.7} /></mesh>
      </group>

      {/* Solar roof array */}
      {[solarPanelLeft, solarPanelRight].map((ref, index) => (
        <group key={index} ref={ref} rotation={[-0.06, 0, index === 0 ? -0.025 : 0.025]}>
          <RoundedBox args={[1.35, 0.07, 1.92]} radius={0.035} smoothness={2}><meshStandardMaterial {...solarMaterial("solar")} /></RoundedBox>
          <mesh position={[0, 0.047, 0]}><boxGeometry args={[1.18, 0.012, 1.72]} /><meshStandardMaterial color={C.solarCell} metalness={0.52} roughness={0.22} /></mesh>
          {[-0.72, -0.36, 0, 0.36, 0.72].map((z) => <mesh key={`h-${z}`} position={[0, 0.058, z]}><boxGeometry args={[1.12, 0.006, 0.018]} /><meshStandardMaterial color="#78908A" metalness={0.35} roughness={0.25} /></mesh>)}
          {[-0.38, 0, 0.38].map((x) => <mesh key={`v-${x}`} position={[x, 0.06, 0]}><boxGeometry args={[0.018, 0.006, 1.68]} /><meshStandardMaterial color="#78908A" metalness={0.35} roughness={0.25} /></mesh>)}
        </group>
      ))}

      {/* Recognizable aerodynamic car body */}
      <group ref={body}>
        <RoundedBox args={[3.72, 0.5, 4.0]} radius={0.18} smoothness={5} position={[0, 0.05, 0]}><meshPhysicalMaterial {...material("final", C.body, 0.78, 0.2)} clearcoat={0.75} clearcoatRoughness={0.12} /></RoundedBox>
        <RoundedBox args={[3.05, 0.34, 1.25]} radius={0.13} smoothness={5} position={[0, 0.34, 1.34]}><meshPhysicalMaterial {...material("final", C.bodyLight, 0.78, 0.18)} clearcoat={0.8} clearcoatRoughness={0.1} /></RoundedBox>
        <RoundedBox args={[2.72, 0.25, 0.78]} radius={0.12} smoothness={5} position={[0, 0.53, 1.62]}><meshPhysicalMaterial {...material("final", C.body, 0.76, 0.2)} clearcoat={0.8} clearcoatRoughness={0.1} /></RoundedBox>
        <RoundedBox args={[3.0, 0.38, 1.02]} radius={0.13} smoothness={5} position={[0, 0.33, -1.38]}><meshPhysicalMaterial {...material("final", C.body, 0.78, 0.2)} clearcoat={0.78} clearcoatRoughness={0.11} /></RoundedBox>
        <RoundedBox args={[0.34, 0.48, 2.7]} radius={0.12} smoothness={5} position={[-1.68, 0.2, 0]}><meshPhysicalMaterial {...material("final", C.body, 0.8, 0.18)} clearcoat={0.8} clearcoatRoughness={0.1} /></RoundedBox>
        <RoundedBox args={[0.34, 0.48, 2.7]} radius={0.12} smoothness={5} position={[1.68, 0.2, 0]}><meshPhysicalMaterial {...material("final", C.body, 0.8, 0.18)} clearcoat={0.8} clearcoatRoughness={0.1} /></RoundedBox>

        <RoundedBox args={[2.2, 0.92, 1.68]} radius={0.2} smoothness={6} position={[0, 0.72, -0.18]}><meshPhysicalMaterial color={C.glass} metalness={0.2} roughness={0.12} transparent opacity={0.58} clearcoat={1} clearcoatRoughness={0.06} transmission={0.12} /></RoundedBox>
        {[-0.93, 0.93].map((x) => <group key={x}>
          <RoundedBox args={[0.09, 0.82, 0.1]} radius={0.025} position={[x, 0.72, 0.58]}><meshStandardMaterial color={C.graphite} metalness={0.78} roughness={0.24} /></RoundedBox>
          <RoundedBox args={[0.09, 0.78, 0.1]} radius={0.025} position={[x, 0.7, -0.9]}><meshStandardMaterial color={C.graphite} metalness={0.78} roughness={0.24} /></RoundedBox>
        </group>)}
        <RoundedBox args={[1.95, 0.48, 0.06]} radius={0.025} smoothness={3} position={[0, 0.83, 0.66]} rotation={[-0.28, 0, 0]}><meshPhysicalMaterial color="#183635" transparent opacity={0.7} roughness={0.08} metalness={0.18} clearcoat={1} /></RoundedBox>
        <RoundedBox args={[2.75, 0.08, 1.92]} radius={0.035} smoothness={2} position={[0, 1.18, -0.18]}><meshStandardMaterial color={C.graphite} metalness={0.86} roughness={0.2} /></RoundedBox>

        <RoundedBox args={[2.65, 0.16, 0.16]} radius={0.06} smoothness={3} position={[0, 0.02, 1.98]}><meshStandardMaterial color={C.graphite} metalness={0.82} roughness={0.24} /></RoundedBox>
        <RoundedBox args={[2.7, 0.16, 0.16]} radius={0.06} smoothness={3} position={[0, 0.02, -1.98]}><meshStandardMaterial color={C.graphite} metalness={0.82} roughness={0.24} /></RoundedBox>

        {[-0.92, 0.92].map((x) => <RoundedBox key={`h-${x}`} args={[0.48, 0.11, 0.08]} radius={0.035} smoothness={3} position={[x, 0.42, 1.91]}><meshStandardMaterial color={C.headlight} emissive={C.headlight} emissiveIntensity={1.15} metalness={0.2} roughness={0.18} /></RoundedBox>)}
        {[-0.95, 0.95].map((x) => <RoundedBox key={`t-${x}`} args={[0.52, 0.1, 0.07]} radius={0.03} smoothness={3} position={[x, 0.38, -1.93]}><meshStandardMaterial color={C.tailLight} emissive={C.tailLight} emissiveIntensity={0.8} metalness={0.25} roughness={0.18} /></RoundedBox>)}

        {[-1.22, 1.22].map((x) => <group key={x} position={[x, 0.76, 0.65]}>
          <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 0.28, 16]} /><meshStandardMaterial color={C.graphite} metalness={0.8} roughness={0.2} /></mesh>
          <RoundedBox args={[0.16, 0.12, 0.24]} radius={0.04} smoothness={3} position={[x < 0 ? -0.13 : 0.13, 0.02, 0]}><meshStandardMaterial color={C.bodyLight} metalness={0.72} roughness={0.2} /></RoundedBox>
        </group>)}

        <RoundedBox args={[0.72, 0.52, 0.65]} radius={0.1} smoothness={4} position={[0, 0.38, -0.38]}><meshStandardMaterial color="#4B4D48" metalness={0.22} roughness={0.62} /></RoundedBox>
        <mesh position={[0, 0.67, 0.47]} rotation={[Math.PI / 2.2, 0, 0]}><torusGeometry args={[0.2, 0.035, 10, 24]} /><meshStandardMaterial color={C.graphite} metalness={0.72} roughness={0.25} /></mesh>
      </group>
    </group>
  );
};
