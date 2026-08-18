export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  problem: string;
  solution: string;
  specifications: Record<string, string>;
  components: { name: string; description: string }[];
  applications: string[];
  indiaImpact: string;
  uniqueness: string;
  gallery: string[]; // images
  documents: {
    title: string;
    overview: string;
    problemStatement: string;
    objective: string;
    howItWorks: string;
    componentsList: string;
    innovation: string;
  };
  whatsappMessage: string;
}

export const projects: Project[] = [
  {
    title: "Solar Car Prototype",
    slug: "solar-car",
    category: "Automobile & Renewable Energy",
    description: "A functional, lightweight student solar car prototype using smart energy management and high-efficiency photovoltaic cells.",
    technologies: ["Solar Power", "BLDC Motor", "Chassis Design", "Battery Management", "IoT Monitoring"],
    problem: "Conventional transport relies heavily on fossil fuels, contributing to carbon emissions and high running costs. Student automotive teams often struggle to develop actual solar-electric drivetrains and lightweight structural frames that work in real-world Indian road conditions.",
    solution: "We designed and manufactured a working solar-powered vehicle prototype. The chassis is optimized for weight-to-strength ratio, featuring custom suspension, a high-torque BLDC hub motor, custom Li-ion battery pack, and roof-integrated solar arrays with MPPT charge controllers for continuous charging.",
    specifications: {
      "Battery Capacity": "Data to be configured (e.g., 48V 30Ah Lithium-Ion)",
      "Motor Power": "Data to be configured (e.g., 1000W BLDC Hub)",
      "Solar Panel Input": "Data to be configured (e.g., 300W Monocrystalline)",
      "Payload Capacity": "Data to be configured (e.g., 150 kg)",
      "Vehicle Curb Weight": "Data to be configured (e.g., 85 kg)",
      "Range per Charge": "Data to be configured (e.g., 60-80 km)"
    },
    components: [
      { name: "Monocrystalline Solar Panel", description: "High-efficiency panels mounted on the top shell to capture solar energy." },
      { name: "Lithium-Ion Battery Pack", description: "High-density custom configured power storage system with integrated BMS." },
      { name: "Chassis Frame", description: "Welded mild steel/aluminium spaceframe designed to handle torsional loads." },
      { name: "BLDC Hub Motor", description: "High-torque brushless DC motor integrated into the rear wheel hub for maximum efficiency." },
      { name: "MPPT Charge Controller", description: "Maximum Power Point Tracking controller to optimize solar energy capture and charging." }
    ],
    applications: [
      "Eco-friendly campus transportation",
      "Short-distance urban last-mile delivery",
      "Agricultural utility utility vehicles",
      "Foundation for student vehicle research projects"
    ],
    indiaImpact: "India has over 300 sunny days per year. Developing micro-mobility solar vehicles reduces dependence on imported petroleum, offers low-cost operation for rural areas, and trains future Indian engineers in green technology.",
    uniqueness: "Features an independent front suspension system combined with an active solar tracking panel layout, achieving up to 15% higher solar efficiency compared to static panels.",
    gallery: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "Solar Car Prototype Design & Analysis Document",
      overview: "This document details the engineering blueprint, mechanical stress analysis, and electrical schematic of the solar vehicle.",
      problemStatement: "Design a lightweight commuter vehicle capable of running primarily on solar energy while enduring Indian thermal and road conditions.",
      objective: "To design, simulate, build, and test a fully functional solar car prototype that accommodates a single driver and implements MPPT solar charging.",
      howItWorks: "Solar panels collect sunlight and feed it to the MPPT controller, which regulates charging of the custom Lithium-Ion battery pack. The driver controls speed via an electronic throttle connected to the BLDC motor controller.",
      componentsList: "1. Solar Panels, 2. MPPT, 3. Li-Ion Pack, 4. Motor Controller, 5. BLDC Hub Motor, 6. Steel Spaceframe.",
      innovation: "Integration of smart cellular IoT modules to broadcast battery health, solar generation, and vehicle speed to a remote dashboard in real-time."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Solar Car project. I would like to know more about the project, documentation, customization and development process."
  },
  {
    title: "Automatic Dry & Wet Waste Picker",
    slug: "automatic-waste-picker",
    category: "Robotics & Automation",
    description: "An autonomous robotic prototype that detects, segregates, and picks dry and wet waste from floors using smart sensors and robotic arms.",
    technologies: ["Arduino/Raspberry Pi", "Robotic Arm", "Moisture Sensor", "Image Classification", "Chassis Fabrication"],
    problem: "Manual waste sorting poses severe health risks to sanitation workers. Mixed waste in landfills leads to environmental pollution. Automatic segregation at the source is critical but complex to implement on a small, affordable scale.",
    solution: "We engineered a mobile robotic platform equipped with a multi-DOF robotic arm, sensor conveyor, and segregated waste bins. The robot sweeps area, detects objects, picks them up, passes them through moisture and inductive proximity sensors, and deposits dry vs. wet waste in separate onboard compartments.",
    specifications: {
      "Control Unit": "Data to be configured (e.g., Arduino Mega + ESP32)",
      "Sensor Setup": "Data to be configured (e.g., Inductive, Moisture, Ultrasonic)",
      "Actuators": "Data to be configured (e.g., High-Torque Metal Gear Servos)",
      "Power Source": "Data to be configured (e.g., 12V Lead Acid / Li-Ion)",
      "Bin Capacity": "Data to be configured (e.g., 5 Litres per compartment)"
    },
    components: [
      { name: "Robotic Gripper", description: "Spring-loaded gripper to pick various shapes of trash." },
      { name: "Moisture Sensor Grid", description: "Custom contact grid to immediately evaluate wet content." },
      { name: "Inductive Sensor", description: "Detects metal cans and metallic waste components." },
      { name: "Geared DC Motors", description: "High-torque motors driving heavy-duty wheels to navigate rough floors." }
    ],
    applications: [
      "Automated indoor cleaning for railway stations and airports",
      "Smart municipality source-level sorting",
      "Educational robotics and automation training platforms"
    ],
    indiaImpact: "Supports the Swachh Bharat Mission by mechanizing waste sorting and reducing human contact with toxic or hazardous waste materials.",
    uniqueness: "A smart dual-sensor sweep gate that ensures even flat paper and cardboard waste can be collected without heavy computer vision overhead.",
    gallery: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "Automatic Waste Picker & Segregator Robot",
      overview: "Technical blueprint, schematic, and Arduino control algorithms for autonomous navigation and sensor-based waste segregation.",
      problemStatement: "Human handling of municipal waste is unhygienic and sorting is highly inefficient. Autonomous source segregation is required.",
      objective: "Build an autonomous rover that traverses an area, detects garbage, picks it up, analyzes it, and sorts it into dry and wet bins.",
      howItWorks: "The rover uses ultrasonic sensors to navigate. When an object is detected, the robotic arm picks it up and places it on a sensor pad. The pad detects moisture and metallic properties, then rotates the disposal chute to the correct bin.",
      componentsList: "1. Robotic Arm, 2. Moisture Sensor, 3. Metal Sensor, 4. Motor Drivers, 5. Chassis, 6. Microcontroller.",
      innovation: "Proprietary contact-plate design that ensures robust moisture reading even for semi-dry items."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Automatic Dry & Wet Waste Picker project. I would like to know more about the project, documentation, customization and development process."
  },
  {
    title: "Automatic Staircase / Wheelchair Mobility System",
    slug: "automatic-staircase-mobility",
    category: "Mechanical & Hydraulics",
    description: "An accessibility solution engineered to help wheelchair users and senior citizens ascend and descend staircases safely using linear actuators or mechanical linkages.",
    technologies: ["Linear Actuators", "Hydraulic/Pneumatic Systems", "Safety Braking Linkage", "Chassis Fabrication", "Limit Switches"],
    problem: "Staircases present a major physical barrier to wheelchair users and elderly citizens in buildings lacking lifts. Existing solutions like commercial stairlifts are prohibitively expensive and require massive structure changes.",
    solution: "We designed a robust mechanical staircase mobility system that uses a self-leveling platform driven by motorized linkages or compact hydraulics. Safety switches, auto-braking gear systems, and easy-to-use joysticks make it highly secure and reliable.",
    specifications: {
      "Drive Mechanism": "Data to be configured (e.g., Hydraulic lift / Ball screw actuators)",
      "Max Payload": "Data to be configured (e.g., 120 kg)",
      "Safety Sensors": "Data to be configured (e.g., Gyroscopic self-leveler, limit switches)",
      "Control System": "Data to be configured (e.g., Joystick remote + Relay safety cutoff)"
    },
    components: [
      { name: "Self-Leveling Platform", description: "Keeps the wheelchair perfectly horizontal during ascent/descent." },
      { name: "Linear Actuators", description: "Heavy-duty electric pistons that provide precise push/pull forces." },
      { name: "Emergency Mechanical Brake", description: "A fail-safe locking system that triggers instantly if power drops." },
      { name: "Limit Switches", description: "Ensures the carriage stops automatically at the exact top and bottom floor levels." }
    ],
    applications: [
      "Home accessibility retrofitting for multi-story houses",
      "Low-cost solution for public schools and clinics without elevators",
      "Prototyping mechanical safety systems in student curricula"
    ],
    indiaImpact: "Empowers physically challenged and senior populations in India, aligning with the Accessible India Campaign (Sugamya Bharat Abhiyan) using affordable, locally manufactured engineering.",
    uniqueness: "Features a unique mechanical gravity-guided linkage that keeps the platform horizontal even if the electrical control circuit experiences failure.",
    gallery: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "Automatic Staircase Mobility System Engineering Document",
      overview: "Structural analysis, linkage motion simulator charts, and electrical control designs for staircase accessibility systems.",
      problemStatement: "Lack of elevator access in typical low-rise residential and public buildings restricts movement for elderly and wheelchair users.",
      objective: "To prototype a cost-effective, easily attachable staircase platform that can safely transport a person over steps while keeping them horizontal.",
      howItWorks: "The wheelchair is rolled onto the platform and secured. The user toggle switch activates the motor/actuators. Mechanical linkages guide the platform along a rail, maintaining level via gyroscopic feedback or mechanical leveling bar.",
      componentsList: "1. Guide Rail, 2. Leveling Linkage, 3. Linear Actuators, 4. Control Joystick, 5. Safety Braking System, 6. Frame.",
      innovation: "Dual-rail configuration that spreads weight loads evenly, preventing wall structural damage."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Automatic Staircase Mobility project. I would like to know more about the project, documentation, customization and development process."
  },
  {
    title: "Hydraulic Engineering Systems",
    slug: "hydraulics",
    category: "Fluid Dynamics & Automation",
    description: "Multi-purpose hydraulic prototyping rigs demonstrating Pascal's law, flow control, and heavy load operations using custom manifolds and pistons.",
    technologies: ["Hydraulic Pumps", "Directional Valves", "Pascal's Law", "Pressure Gauges", "Cylinder Assembly"],
    problem: "Fluid power education is often limited to textbook equations. Students struggle to design actual hydraulic circuits, manage oil seal leakages, and configure directional control valves for functional applications.",
    solution: "We develop customized hydraulic trainer kits and working prototypes (like mini hydraulic excavators, scissor lifts, and industrial press systems). We support design calculation of cylinder diameter, flow rate, pressure values, and select correct oil grades.",
    specifications: {
      "Operating Pressure": "Data to be configured (e.g., 10-30 Bar)",
      "Pump Type": "Data to be configured (e.g., Gear Pump / Hand Pump)",
      "Fluid Medium": "Data to be configured (e.g., ISO VG 32 Hydraulic Oil)",
      "Control Mechanism": "Data to be configured (e.g., Manual spool valves / Solenoid valves)"
    },
    components: [
      { name: "Double-Acting Cylinder", description: "Provides power stroke in both push and pull directions." },
      { name: "Directional Spool Valve", description: "Controls the path of hydraulic oil to actuate cylinders." },
      { name: "Pressure Relief Valve", description: "Safety valve that limits maximum circuit pressure to prevent rupture." },
      { name: "Oil Reservoir", description: "Baffled storage tank designed to cool fluid and settle contaminants." }
    ],
    applications: [
      "Industrial automation training labs",
      "Hydraulic excavator prototypes for final-year projects",
      "Custom pneumatic and hydraulic machinery prototyping"
    ],
    indiaImpact: "Supplies practical engineering skills for agricultural machinery, infrastructure equipment, and heavy industries, building hands-on competence in fluid power systems.",
    uniqueness: "Transparent cylinder sections configured for classrooms so students can visually trace oil movement and seal action during operation.",
    gallery: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "Hydraulic System Training Manual & Design Calculations",
      overview: "A comprehensive design handbook containing calculations for cylinder sizing, pump selection, fluid velocity, and pressure drops.",
      problemStatement: "Lack of practical, leak-proof prototype setups for students to test advanced hydraulic circuit designs.",
      objective: "To construct a highly modular fluid power training rig that supports multi-circuit combinations (lifts, clamping, sequential actuation).",
      howItWorks: "An electric motor drives a gear pump, sending pressurized oil from the reservoir through a pressure relief valve. Directing spool valves guide the fluid to cylinders, driving mechanical linkages.",
      componentsList: "1. Reservoir, 2. Pump, 3. Pressure Valves, 4. Spool Valve, 5. Hydraulic Cylinders, 6. High-Pressure Hoses.",
      innovation: "Zero-leak quick-connect couplers that allow rapid configuration changes without fluid loss."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Hydraulic Engineering Systems project. I would like to know more about the project, documentation, customization and development process."
  },
  {
    title: "Robotics & Automation",
    slug: "robotics",
    category: "Robotics & IoT",
    description: "Advanced robotic arms, autonomous rovers, and manufacturing conveyor simulators with IoT integration for industrial automation prototyping.",
    technologies: ["Stepper/Servo Control", "ESP32/Raspberry Pi", "Sensor Integration", "Inverse Kinematics", "IoT Cloud Platforms"],
    problem: "Industry 4.0 demands hands-on experience in robotic arm path planning, sensor fusion, and cloud-connected IoT dashboards, but commercial setups are far too costly for colleges and final-year groups.",
    solution: "We build functional 3 to 6-axis robotic arms, pick-and-place conveyors, and AMR (Autonomous Mobile Robot) platforms. The control interface supports mobile apps, Bluetooth terminal, or custom web dashboards for remote control.",
    specifications: {
      "DOF": "Data to be configured (e.g., 4 Axis / 6 Axis)",
      "Processor": "Data to be configured (e.g., ESP32 / Raspberry Pi 4)",
      "Communication": "Data to be configured (e.g., Wi-Fi, BLE, MQTT)",
      "Payload Capacity": "Data to be configured (e.g., 500 grams)"
    },
    components: [
      { name: "Robotic Joint Motors", description: "High-precision stepper motors with microstepping drivers." },
      { name: "ESP32 Controller Board", description: "Dual-core processor managing hardware controls and Wi-Fi data streaming." },
      { name: "End-Effector Gripper", description: "Pneumatic or motorized gripper suited to picking complex components." }
    ],
    applications: [
      "Factory sorting simulation",
      "Warehouse AGV prototyping",
      "STEM robotics workshops and diploma final-year projects"
    ],
    indiaImpact: "Equips the next generation of engineers with automation capabilities, vital for the 'Make in India' drive across automotive and electronics manufacturing.",
    uniqueness: "Features a web-based GUI that lets users program the robot using visual block coding or direct coordinate input.",
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "6-Axis Robotic Arm Control and Kinematics Analysis",
      overview: "Details the forward and inverse kinematic equations, microcontroller code, and IoT communication protocols for pick-and-place robots.",
      problemStatement: "Bridging the gap between software robotic models and actual physical robotic execution in academic settings.",
      objective: "To create an affordable robotic arm capable of executing precise coordinate picking based on sensor triggers.",
      howItWorks: "The microcontroller receives coordinate targets over MQTT. It solves inverse kinematics to determine joint angles, sending pulse/direction signals to stepper drivers to actuate the arm.",
      componentsList: "1. Stepper Motors, 2. Microsteppers, 3. Microcontroller, 4. Power Supply, 5. Custom 3D Printed/Acrylic Frame.",
      innovation: "Self-calibration routine using optical endstops for automated startup positioning."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Robotics & Automation project. I would like to know more about the project, documentation, customization and development process."
  },
  {
    title: "Renewable Energy Projects",
    slug: "renewable-energy",
    category: "Renewable Energy",
    description: "Hybrid solar-wind power generators, dual-axis solar trackers, and biomass/hydro power generation prototypes for clean energy research.",
    technologies: ["Solar Tracking", "Wind Turbine Design", "Charge Regulation", "Inverter Circuits", "Energy Analytics"],
    problem: "Static solar panels lose substantial efficiency during morning and evening hours. Hybrid systems are complex to optimize without intelligent load sharing and battery charge monitoring.",
    solution: "We construct working micro-grid prototypes, including dual-axis solar trackers that use LDR sensor arrays to follow the sun, and small wind turbine assemblies that charge batteries cooperatively with solar panels.",
    specifications: {
      "Energy Sources": "Data to be configured (e.g., Solar + Wind Hybrid)",
      "Tracking Type": "Data to be configured (e.g., Active Dual-Axis LDR)",
      "Output Voltage": "Data to be configured (e.g., 12V DC / 230V AC inverter)",
      "Controller System": "Data to be configured (e.g., Custom charge controller with LCD)"
    },
    components: [
      { name: "LDR Sensor Array", description: "Four light-dependent resistors arranged to calculate the brightest angle." },
      { name: "Geared Servo Motors", description: "Weather-proof pan-and-tilt servo drives that position the panel array." },
      { name: "Savonius Wind Turbine", description: "Vertical-axis wind turbine that generates power regardless of wind direction." }
    ],
    applications: [
      "Rural off-grid charging station prototypes",
      "Clean energy laboratory trainers for engineering colleges",
      "Smart agriculture irrigation power systems"
    ],
    indiaImpact: "Promotes clean, decentralized energy systems for remote Indian villages, reducing load on traditional thermal grids and demonstrating microgrid stability.",
    uniqueness: "A custom load-sharing circuit that dynamically diverts surplus energy to a secondary utility cell (like a water pump) when the battery is full.",
    gallery: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80"
    ],
    documents: {
      title: "Dual-Axis Hybrid Power Generation System Project Report",
      overview: "Engineering schematics, power analysis, and LDR sensor tracking algorithms for hybrid energy systems.",
      problemStatement: "Low efficiency of fixed solar panels and unreliability of single-source renewable installations.",
      objective: "To design a smart hybrid solar-wind generator that tracks solar position in two dimensions to maximize overall power yield.",
      howItWorks: "LDR sensors send analog light values to the microcontroller. The controller calculates panel misalignment and triggers motors to realign. Simultaneously, a vertical wind turbine contributes charge to the battery via a hybrid regulator.",
      componentsList: "1. Solar Panels, 2. Wind Turbine, 3. LDR Sensors, 4. Pan/Tilt Servos, 5. Custom Controller, 6. Battery Pack.",
      innovation: "Astronomical calculations combined with active sensors to track the sun even on completely cloudy days."
    },
    whatsappMessage: "Hello Dark Horse Hydraulics, I am interested in the Renewable Energy project. I would like to know more about the project, documentation, customization and development process."
  }
];
