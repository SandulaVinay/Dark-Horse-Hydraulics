import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { assemblyProgress } from "../../data/assemblyProgress";

interface Props { activePartId: string | null; }
const clamp = (v:number) => Math.max(0, Math.min(1, v));
const smooth = (v:number) => v*v*(3-2*v);
const lerp = (a:number,b:number,t:number) => a+(b-a)*t;

/** A recognizable road-car silhouette that sits over the engineering internals. */
export const SolarCarSilhouette: React.FC<Props> = ({ activePartId }) => {
  const root = useRef<Group>(null);
  const shell = useRef<Group>(null);
  const cabin = useRef<Group>(null);
  const aero = useRef<Group>(null);

  useFrame((state) => {
    const p = clamp(assemblyProgress.value);
    const t = smooth(clamp((p - 0.82) / 0.18));
    const exploded = 1 - t;
    if (shell.current) {
      shell.current.position.y = lerp(5.4, 1.16, t);
      shell.current.position.z = lerp(0.2, 0, t);
      shell.current.rotation.x = lerp(-0.08, 0, t);
      shell.current.scale.setScalar(lerp(0.88, 1, t));
    }
    if (cabin.current) {
      cabin.current.position.y = lerp(6.0, 1.58, t);
      cabin.current.position.z = lerp(0.3, 0.1, t);
      cabin.current.scale.setScalar(lerp(0.82, 1, t));
    }
    if (aero.current) aero.current.position.y = lerp(5.8, 1.08, t);
    if (root.current) {
      root.current.position.y = exploded * 0.18;
      root.current.rotation.y += ((p > .96 ? Math.sin(state.clock.getElapsedTime()*.25)*.035 : 0) - root.current.rotation.y) * .04;
    }
  });

  const active = activePartId === "final";
  const bodyMat = { color: active ? "#d9863a" : "#d7d1c6", metalness: .86, roughness: .2, emissive: active ? "#9d4d20" : "#000000", emissiveIntensity: active ? .65 : .02 };
  const glassMat = { color: "#34413f", metalness: .25, roughness: .08, transmission: .12, transparent: true, opacity: .78, clearcoat: 1, clearcoatRoughness: .08 };

  return (
    <group ref={root}>
      <group ref={shell}>
        <mesh scale={[1.48,.34,2.18]} position={[0,0,0]}><sphereGeometry args={[1, 40, 24]} /><meshStandardMaterial {...bodyMat} /></mesh>
        <mesh position={[0,-.01,1.96]} scale={[1.18,.27,.62]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial {...bodyMat} /></mesh>
        <mesh position={[0,.02,-1.72]} scale={[1.28,.31,.74]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial {...bodyMat} /></mesh>
        {[-1,1].map((s) => <mesh key={s} position={[s*1.34,.02,0]} scale={[.12,.18,1.78]}><capsuleGeometry args={[.16,1.95,6,12]} /><meshStandardMaterial {...bodyMat} /></mesh>)}
        <mesh position={[0,.16,2.48]} scale={[.72,.035,.035]}><boxGeometry args={[1,.08,.08]} /><meshStandardMaterial color="#fff3d6" emissive="#fff3d6" emissiveIntensity={1.8} /></mesh>
        <mesh position={[0,.15,-2.35]} scale={[.82,.035,.035]}><boxGeometry args={[1,.08,.08]} /><meshStandardMaterial color="#b64b34" emissive="#8b2e22" emissiveIntensity={1.4} /></mesh>
      </group>
      <group ref={cabin}>
        <mesh scale={[1.02,.56,1.05]} position={[0,0,.18]}><sphereGeometry args={[1, 40, 24, 0, Math.PI*2, 0, Math.PI*.72]} /><meshPhysicalMaterial {...glassMat} /></mesh>
        {[-1,1].map((s) => <mesh key={s} position={[s*.86,.08,.52]} rotation={[0,s*.18,-s*.12]}><capsuleGeometry args={[.035,.95,5,10]} /><meshStandardMaterial color="#aaa397" metalness={.88} roughness={.18} /></mesh>)}
        <mesh position={[0,.44,.15]} scale={[.82,.045,.78]}><boxGeometry args={[1.6,.09,1.5]} /><meshStandardMaterial color="#315a57" metalness={.4} roughness={.14} /></mesh>
        {Array.from({length:4}).map((_,i)=><mesh key={i} position={[-.58+i*.39,.49,.15]}><boxGeometry args={[.012,.012,1.28]} /><meshStandardMaterial color="#b8c9bc" metalness={.25} roughness={.3}/></mesh>)}
      </group>
      <group ref={aero}>
        <mesh position={[0,0,2.54]} scale={[1.18,.05,.22]}><boxGeometry args={[2.4,.1,.44]} /><meshStandardMaterial color="#34312b" metalness={.72} roughness={.25} /></mesh>
        <mesh position={[0,.48,-2.02]} scale={[1.05,.05,.12]}><boxGeometry args={[2.15,.1,.24]} /><meshStandardMaterial color="#3a3731" metalness={.72} roughness={.22} /></mesh>
        {[-.92,.92].map((x)=><mesh key={x} position={[x,.28,-2.02]} rotation={[0,0,x>0?.08:-.08]}><boxGeometry args={[.07,.55,.07]} /><meshStandardMaterial color="#6e685d" metalness={.9} roughness={.2}/></mesh>)}
      </group>
    </group>
  );
};
