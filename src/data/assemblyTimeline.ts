export interface AssemblyStage {
  id: string;
  name: string;
  startProgress: number;
  endProgress: number;
  title: string;
  description: string;
  componentIds: string[];
}

/**
 * Narrative stages for the hero assembly sequence.
 *
 * Engineering specifications should be replaced with verified project data
 * before publishing. The copy below intentionally avoids inventing battery,
 * motor, payload, material, or compliance specifications.
 */
export const assemblyStages: AssemblyStage[] = [
  {
    id: "mobility",
    name: "01 — MOBILITY",
    startProgress: 0.0,
    endProgress: 0.15,
    title: "START WITH MOBILITY",
    description:
      "The wheel system comes together first. This stage introduces how students think about movement, stability, steering, and real-world road conditions.",
    componentIds: [
      "wheel_front_left",
      "wheel_front_right",
      "wheel_rear_left",
      "wheel_rear_right",
    ],
  },
  {
    id: "power",
    name: "02 — POWER",
    startProgress: 0.15,
    endProgress: 0.3,
    title: "ADD THE POWER SYSTEM",
    description:
      "The energy-storage module moves into the vehicle. Verified project data can explain battery type, capacity, charging approach, runtime, and safety considerations.",
    componentIds: ["battery"],
  },
  {
    id: "structure",
    name: "03 — STRUCTURE",
    startProgress: 0.3,
    endProgress: 0.45,
    title: "BUILD THE STRUCTURE",
    description:
      "The chassis, seating, and steering structure align around the core system. This is where the project becomes a complete engineered platform.",
    componentIds: ["chassis", "seat", "steering"],
  },
  {
    id: "propulsion",
    name: "04 — PROPULSION",
    startProgress: 0.45,
    endProgress: 0.6,
    title: "CONNECT PROPULSION",
    description:
      "The propulsion module joins the chassis. Students can explore the selected drive system, transmission approach, performance targets, and mechanical design.",
    componentIds: ["motor"],
  },
  {
    id: "control",
    name: "05 — CONTROL",
    startProgress: 0.6,
    endProgress: 0.72,
    title: "BRING IT UNDER CONTROL",
    description:
      "Electronics, sensors, controls, and wiring are connected. The story shifts from individual parts to how the complete system works together.",
    componentIds: ["electronics", "wiring"],
  },
  {
    id: "solar",
    name: "06 — RENEWABLE ENERGY",
    startProgress: 0.72,
    endProgress: 0.88,
    title: "HARVEST RENEWABLE ENERGY",
    description:
      "The solar array moves into place. Verified project data can show panel capacity, energy contribution, charging strategy, and environmental impact.",
    componentIds: ["solar_panel_left", "solar_panel_right"],
  },
  {
    id: "final",
    name: "07 — FINAL ASSEMBLY",
    startProgress: 0.88,
    endProgress: 1.0,
    title: "THE IDEA IS BUILT",
    description:
      "The major systems lock together into one prototype. From a student idea to a physical engineering solution—this is where the concept becomes tangible.",
    componentIds: ["body"],
  },
];
