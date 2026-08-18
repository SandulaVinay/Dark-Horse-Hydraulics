import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Group } from "three";

interface SolarCarModelProps {
  activePartId: string | null;
}

export const SolarCarModel: React.FC<SolarCarModelProps> = ({ activePartId }) => {
  // Inner refs for components
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

  // Setup Vector3 endpoints for interpolation (lerp)
  // [Exploded, Assembled]
  const positions = useMemo(() => {
    return {
      wheelFL: { exp: new Vector3(-4, 0.35, 4), asb: new Vector3(-1.2, 0.35, 1.2) },
      wheelFR: { exp: new Vector3(4, 0.35, 4), asb: new Vector3(1.2, 0.35, 1.2) },
      wheelRL: { exp: new Vector3(-4, 0.35, -4), asb: new Vector3(-1.2, 0.35, -1.2) },
      wheelRR: { exp: new Vector3(4, 0.35, -4), asb: new Vector3(1.2, 0.35, -1.2) },
      battery: { exp: new Vector3(0, 4, 0), asb: new Vector3(0, 0.45, 0) },
      chassis: { exp: new Vector3(0, -3, 0), asb: new Vector3(0, 0.45, 0) },
      motor: { exp: new Vector3(0, 0.35, -5), asb: new Vector3(0, 0.35, -1.2) },
      electronics: { exp: new Vector3(0, 3, 0.8), asb: new Vector3(0, 0.65, 0.8) },
      wiring: { exp: new Vector3(0, 3, 0.2), asb: new Vector3(0, 0.4, 0.2) },
      solarLeft: { exp: new Vector3(-4, 4, 0.2), asb: new Vector3(-0.8, 1.2, 0.2) },
      solarRight: { exp: new Vector3(4, 4, 0.2), asb: new Vector3(0.8, 1.2, 0.2) },
      body: { exp: new Vector3(0, 5, 0.2), asb: new Vector3(0, 1.05, 0.2) },
    };
  }, []);

  // Temporary vectors to hold the target positions per frame without garbage collection overhead
  const targets = useMemo(() => {
    return {
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
    };
  }, [positions]);

  // Define cinematic camera viewpoints per stage
  const cameraViews = useMemo(() => {
    return [
      { progress: 0.0, pos: new Vector3(4, 2, 4), look: new Vector3(0, 0, 0) },       // Start: Wheels exploded
      { progress: 0.15, pos: new Vector3(3, 1, 3.5), look: new Vector3(0, 0.3, 1) },  // Stage 1: Wheels assembled, look front low
      { progress: 0.30, pos: new Vector3(2.5, 2.5, 2.5), look: new Vector3(0, 0.4, 0) },// Stage 2: Battery core focus
      { progress: 0.45, pos: new Vector3(3.5, 1.8, 3.5), look: new Vector3(0, 0.4, 0) },// Stage 3: Chassis spaceframe
      { progress: 0.60, pos: new Vector3(1.5, 1.5, -3.8), look: new Vector3(0, 0.3, -1.2) },// Stage 4: Rear Motor propulsion focus
      { progress: 0.72, pos: new Vector3(2.2, 2.2, 2.5), look: new Vector3(0, 0.6, 0.8) },  // Stage 5: Electronics control
      { progress: 0.88, pos: new Vector3(0.1, 5.0, 1.8), look: new Vector3(0, 1.0, 0) },    // Stage 6: Solar Panels top look down
      { progress: 1.0, pos: new Vector3(4, 3, 5), look: new Vector3(0, 0.5, 0) }       // Final: Assembled full showcase
    ];
  }, []);

  useFrame((state) => {
    // 1. Calculate scroll progress reactively from the HTML container
    const container = document.getElementById("timeline-container");
    let progress = 0;
    if (container) {
      const rect = container.getBoundingClientRect();
      const totalScrollHeight = rect.height - window.innerHeight;
      if (totalScrollHeight > 0) {
        progress = Math.max(0, Math.min(1, -rect.top / totalScrollHeight));
      }
    }

    // 2. Compute targets for all components
    // Stage 1: Wheels (0.0 to 0.15)
    const pWheels = Math.max(0, Math.min(1, progress / 0.15));
    targets.wheelFL.lerpVectors(positions.wheelFL.exp, positions.wheelFL.asb, pWheels);
    targets.wheelFR.lerpVectors(positions.wheelFR.exp, positions.wheelFR.asb, pWheels);
    targets.wheelRL.lerpVectors(positions.wheelRL.exp, positions.wheelRL.asb, pWheels);
    targets.wheelRR.lerpVectors(positions.wheelRR.exp, positions.wheelRR.asb, pWheels);

    // Stage 2: Battery (0.15 to 0.30)
    const pBattery = Math.max(0, Math.min(1, (progress - 0.15) / 0.15));
    targets.battery.lerpVectors(positions.battery.exp, positions.battery.asb, pBattery);

    // Stage 3: Chassis (0.30 to 0.45)
    const pChassis = Math.max(0, Math.min(1, (progress - 0.30) / 0.15));
    targets.chassis.lerpVectors(positions.chassis.exp, positions.chassis.asb, pChassis);

    // Stage 4: Motor (0.45 to 0.60)
    const pMotor = Math.max(0, Math.min(1, (progress - 0.45) / 0.15));
    targets.motor.lerpVectors(positions.motor.exp, positions.motor.asb, pMotor);

    // Stage 5: Electronics & Wiring (0.60 to 0.72)
    const pControl = Math.max(0, Math.min(1, (progress - 0.60) / 0.12));
    targets.electronics.lerpVectors(positions.electronics.exp, positions.electronics.asb, pControl);
    targets.wiring.lerpVectors(positions.wiring.exp, positions.wiring.asb, pControl);

    // Stage 6: Solar Panels (0.72 to 0.88)
    const pSolar = Math.max(0, Math.min(1, (progress - 0.72) / 0.16));
    targets.solarLeft.lerpVectors(positions.solarLeft.exp, positions.solarLeft.asb, pSolar);
    targets.solarRight.lerpVectors(positions.solarRight.exp, positions.solarRight.asb, pSolar);

    // Stage 7: Body Canopy (0.88 to 1.0)
    const pBody = Math.max(0, Math.min(1, (progress - 0.88) / 0.12));
    targets.body.lerpVectors(positions.body.exp, positions.body.asb, pBody);

    // 3. Calculate interpolated camera position and target view based on scroll progress
    // Find the current viewport bounds
    let prevView = cameraViews[0];
    let nextView = cameraViews[cameraViews.length - 1];
    for (let i = 0; i < cameraViews.length - 1; i++) {
      if (progress >= cameraViews[i].progress && progress <= cameraViews[i + 1].progress) {
        prevView = cameraViews[i];
        nextView = cameraViews[i + 1];
        break;
      }
    }
    const viewProgress = (progress - prevView.progress) / (nextView.progress - prevView.progress || 1);
    targets.cameraPos.lerpVectors(prevView.pos, nextView.pos, viewProgress);
    targets.cameraLook.lerpVectors(prevView.look, nextView.look, viewProgress);

    // 4. Smoothly slide (lerp) components toward their computed targets with inertia/damping
    const damping = 0.08; // Damping constant (lower is smoother/slower)
    if (wheelFL.current) wheelFL.current.position.lerp(targets.wheelFL, damping);
    if (wheelFR.current) wheelFR.current.position.lerp(targets.wheelFR, damping);
    if (wheelRL.current) wheelRL.current.position.lerp(targets.wheelRL, damping);
    if (wheelRR.current) wheelRR.current.position.lerp(targets.wheelRR, damping);
    if (battery.current) battery.current.position.lerp(targets.battery, damping);
    if (chassis.current) chassis.current.position.lerp(targets.chassis, damping);
    if (motor.current) motor.current.position.lerp(targets.motor, damping);
    if (electronics.current) electronics.current.position.lerp(targets.electronics, damping);
    if (wiring.current) wiring.current.position.lerp(targets.wiring, damping);
    if (solarPanelLeft.current) solarPanelLeft.current.position.lerp(targets.solarLeft, damping);
    if (solarPanelRight.current) solarPanelRight.current.position.lerp(targets.solarRight, damping);
    if (body.current) body.current.position.lerp(targets.body, damping);

    // 5. Smoothly glide camera and controls targets to focus on the active component
    state.camera.position.lerp(targets.cameraPos, 0.04); // Slightly slower camera glide for premium cinematic feel
    const controls = state.controls as any;
    if (controls) {
      controls.target.lerp(targets.cameraLook, 0.04);
      controls.update();
    } else {
      state.camera.lookAt(targets.cameraLook);
    }

    // Spin wheels and rotate chassis subtly once fully assembled (progress > 0.9)
    if (progress > 0.9) {
      if (wheelFL.current) wheelFL.current.rotation.x += 0.05;
      if (wheelFR.current) wheelFR.current.rotation.x += 0.05;
      if (wheelRL.current) wheelRL.current.rotation.x += 0.05;
      if (wheelRR.current) wheelRR.current.rotation.x += 0.05;
    }

    // Auto rotate scene slowly ONLY when final assembly is complete (progress > 0.95)
    if (progress > 0.95 && groupRef.current) {
      groupRef.current.rotation.y = (state.clock.getElapsedTime() - (10)) * 0.15;
    } else if (groupRef.current) {
      groupRef.current.rotation.y = 0; // Lock rotation during assembly stages for clear visibility
    }
  });

  const getMaterialProps = (partId: string, defaultColor: string, glowColor: string = "#1683FF") => {
    const isHighlighted = activePartId === partId;
    return {
      color: isHighlighted ? glowColor : defaultColor,
      emissive: isHighlighted ? glowColor : "#000000",
      emissiveIntensity: isHighlighted ? 1.5 : 0.1,
      roughness: 0.1,
      metalness: 0.9,
    };
  };

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      
      {/* 1. WHEELS (Mobility Stage) */}
      <group ref={wheelFL}>
        {/* Outer Tire */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.25, 32]} />
          <meshStandardMaterial {...getMaterialProps("mobility", "#1e293b", "#38BDF8")} />
        </mesh>
        {/* Inner metal rim */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.27, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Tech glowing core dot */}
        <mesh position={[0, 0, 0.14]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={wheelFR}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.25, 32]} />
          <meshStandardMaterial {...getMaterialProps("mobility", "#1e293b", "#38BDF8")} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.27, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.14]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={wheelRL}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.25, 32]} />
          <meshStandardMaterial {...getMaterialProps("mobility", "#1e293b", "#38BDF8")} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.27, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
        </mesh>
      </group>

      <group ref={wheelRR}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.25, 32]} />
          <meshStandardMaterial {...getMaterialProps("mobility", "#1e293b", "#38BDF8")} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.27, 16]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.14]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* 2. BATTERY (Power Stage) */}
      <group ref={battery}>
        {/* Glowing battery cells block */}
        <mesh>
          <boxGeometry args={[0.9, 0.3, 0.8]} />
          <meshStandardMaterial {...getMaterialProps("power", "#0f172a", "#0066FF")} />
        </mesh>
        {/* Cyber energy rods on top of battery */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.6]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* 3. CHASSIS / STRUCTURE (Structure Stage) */}
      <group ref={chassis}>
        {/* Main carbon-steel frame plate */}
        <mesh>
          <boxGeometry args={[1.6, 0.08, 2.8]} />
          <meshStandardMaterial {...getMaterialProps("structure", "#334155")} />
        </mesh>
        
        {/* Tubular spaceframe roll-cage rods */}
        {/* Left rail */}
        <mesh position={[-0.78, 0.3, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.7, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Right rail */}
        <mesh position={[0.78, 0.3, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.7, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Cross support 1 */}
        <mesh position={[0, 0.3, 1.0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        {/* Cross support 2 */}
        <mesh position={[0, 0.3, -1.0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>

        {/* Seat */}
        <mesh position={[0, 0.35, -0.3]}>
          <boxGeometry args={[0.7, 0.6, 0.6]} />
          <meshStandardMaterial color="#020617" roughness={0.8} />
        </mesh>
        {/* Steering Column & wheel */}
        <mesh position={[0, 0.6, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0.85, 0.65]} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.03, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* 4. MOTOR / PROPULSION (Propulsion Stage) */}
      <group ref={motor}>
        {/* High performance hub motor capsule */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 0.65, 16]} />
          <meshStandardMaterial {...getMaterialProps("propulsion", "#0f172a", "#1683FF")} />
        </mesh>
        {/* Reducer gearbox cylinder */}
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
      </group>

      {/* 5. CONTROL & ELECTRONICS (Control Stage) */}
      <group ref={electronics}>
        {/* Motherboard controller plate */}
        <mesh>
          <boxGeometry args={[0.5, 0.1, 0.4]} />
          <meshStandardMaterial {...getMaterialProps("control", "#1e1b4b", "#1683FF")} />
        </mesh>
        {/* Processor block */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.18, 0.04, 0.18]} />
          <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={1} />
        </mesh>
        {/* Small capacitors details */}
        <mesh position={[-0.15, 0.08, -0.1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color="#38BDF8" />
        </mesh>
        <mesh position={[-0.15, 0.08, 0.1]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
          <meshStandardMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* Control Wiring segments */}
      <group ref={wiring}>
        {/* Main active power lines */}
        <mesh position={[-0.1, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.8]} />
          <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.1, -0.05, 0]}>
          <boxGeometry args={[0.02, 0.02, 1.8]} />
          <meshStandardMaterial color="#0066FF" emissive="#0066FF" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* 6. SOLAR WINGS (Renewable Energy Stage) */}
      <group ref={solarPanelLeft}>
        {/* Solar Wing */}
        <mesh rotation={[-0.05, 0, -0.1]}>
          <boxGeometry args={[0.8, 0.02, 2.0]} />
          <meshStandardMaterial {...getMaterialProps("solar", "#082f49", "#38BDF8")} />
        </mesh>
        {/* Silicon grid patterns details */}
        <mesh position={[0, 0.015, 0]} rotation={[-0.05, 0, -0.1]}>
          <boxGeometry args={[0.76, 0.002, 1.96]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} />
        </mesh>
      </group>

      <group ref={solarPanelRight}>
        <mesh rotation={[-0.05, 0, 0.1]}>
          <boxGeometry args={[0.8, 0.02, 2.0]} />
          <meshStandardMaterial {...getMaterialProps("solar", "#082f49", "#38BDF8")} />
        </mesh>
        <mesh position={[0, 0.015, 0]} rotation={[-0.05, 0, 0.1]}>
          <boxGeometry args={[0.76, 0.002, 1.96]} />
          <meshStandardMaterial color="#0284c7" roughness={0.1} />
        </mesh>
      </group>

      {/* 7. BODY CANOPY (Final Assembly Stage) */}
      <group ref={body}>
        {/* Outer aerodynamic casing shell */}
        <mesh>
          <boxGeometry args={[1.7, 0.08, 3.0]} />
          <meshStandardMaterial {...getMaterialProps("final", "#1e293b", "#38BDF8")} opacity={0.3} transparent={true} />
        </mesh>
        {/* Windshield frame panel */}
        <mesh position={[0, 0.4, 0.8]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.4, 0.04, 0.8]} />
          <meshStandardMaterial color="#0f172a" opacity={0.6} transparent={true} />
        </mesh>
      </group>

    </group>
  );
};
