export interface AssemblyStage {
  id: string;
  name: string;
  startProgress: number;
  endProgress: number;
  title: string;
  description: string;
  componentIds: string[]; // 3D parts affected in this stage
}

export const assemblyStages: AssemblyStage[] = [
  {
    id: "mobility",
    name: "01 — MOBILITY",
    startProgress: 0.0,
    endProgress: 0.15,
    title: "MOBILITY & SUSPENSION",
    description: "Wheels move from exploded positions into position. Explains mobility, stability, wheel selection, and Indian road considerations.",
    componentIds: ["wheel_front_left", "wheel_front_right", "wheel_rear_left", "wheel_rear_right"]
  },
  {
    id: "power",
    name: "02 — POWER",
    startProgress: 0.15,
    endProgress: 0.30,
    title: "ENERGY STORAGE",
    description: "The custom battery pack slides into the main chassis core. Detail charging, capacity, custom thermal management, and power requirements.",
    componentIds: ["battery"]
  },
  {
    id: "structure",
    name: "03 — STRUCTURE",
    startProgress: 0.30,
    endProgress: 0.45,
    title: "CHASSIS & SPACEFRAME",
    description: "The structural chassis frame moves into alignment. Discuss frame engineering, materials (mild steel/aluminum spaceframe), stress points, and payload capacity.",
    componentIds: ["chassis", "seat", "steering"]
  },
  {
    id: "propulsion",
    name: "04 — PROPULSION",
    startProgress: 0.45,
    endProgress: 0.60,
    title: "ELECTRIC PROPULSION",
    description: "The high-torque BLDC motor, direct drive gear hubs, and mechanical transmission align. Emphasize propulsion system performance and mechanical efficiency.",
    componentIds: ["motor"]
  },
  {
    id: "control",
    name: "05 — CONTROL",
    startProgress: 0.60,
    endProgress: 0.72,
    title: "CONTROL & ELECTRONICS",
    description: "Microcontrollers, motor drivers, active wiring loom, sensors, and throttle controls align. Showcases system control and electrical safety standards.",
    componentIds: ["electronics", "wiring"]
  },
  {
    id: "solar",
    name: "06 — RENEWABLE ENERGY",
    startProgress: 0.72,
    endProgress: 0.88,
    title: "SOLAR HARVESTING",
    description: "Photovoltaic panel arrays descend onto the upper shell. Explains solar energy harvesting, panel design, and carbon footprint reduction.",
    componentIds: ["solar_panel_left", "solar_panel_right"]
  },
  {
    id: "final",
    name: "07 — FINAL ASSEMBLY",
    startProgress: 0.88,
    endProgress: 1.0,
    title: "THE IDEA IS BUILT",
    description: "All mechanical, hydraulic, and electrical modules lock together. The wheels start rotating and the lights activate. Ready for road testing.",
    componentIds: ["body"]
  }
];
