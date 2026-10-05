// Development examples for the Project Builder. Component availability is resolved
// against the active local product catalog and should not be treated as guaranteed stock.
export const projects = [
  {
    id: 'obstacle-avoiding-robot',
    name: 'Obstacle Avoiding Robot',
    description:
      'Build a mobile robot that detects obstacles and changes direction automatically.',
    difficulty: 'Beginner',
    icon: 'robot',
    requiredComponents: [
      { name: 'Arduino UNO', productSlug: 'arduino-uno-r3-compatible-board' },
      { name: 'HC-SR04 Ultrasonic Sensor', productSlug: 'hc-sr04-ultrasonic-sensor' },
      { name: 'L298N Motor Driver', productSlug: 'l298n-dual-h-bridge-motor-driver' },
      { name: 'DC Motors' },
      { name: '2WD Chassis', productSlug: '2wd-robot-chassis-kit' },
      { name: 'Servo Motor', productSlug: 'sg90-micro-servo-motor' },
      { name: 'Jumper Wires', productSlug: 'jumper-wire-set' },
      { name: 'Battery Holder' },
    ],
    optionalComponents: [],
    learningOutcomes: [
      'Basic robot movement and motor control',
      'Distance sensing with ultrasonic signals',
      'Simple decision-making logic',
    ],
  },
  {
    id: 'smart-plant-watering',
    name: 'Smart Plant Watering System',
    description:
      'Monitor soil conditions and control watering for a small plant automatically.',
    difficulty: 'Beginner',
    icon: 'plant',
    requiredComponents: [
      { name: 'ESP32 or Arduino', productSlug: 'esp32-devkit-v1' },
      { name: 'Soil Moisture Sensor' },
      { name: 'Relay Module', productSlug: '2-channel-5v-relay-module' },
      { name: 'Water Pump' },
      { name: 'Tubing' },
      { name: 'Jumper Wires', productSlug: 'jumper-wire-set' },
      { name: 'Power Supply' },
    ],
    optionalComponents: [],
    learningOutcomes: [
      'Reading analog sensor values',
      'Controlling a pump through a relay',
      'Planning a simple automation workflow',
    ],
  },
  {
    id: 'iot-weather-station',
    name: 'IoT Weather Station',
    description:
      'Collect environmental readings and prepare them for a connected monitoring dashboard.',
    difficulty: 'Intermediate',
    icon: 'weather',
    requiredComponents: [
      { name: 'ESP32', productSlug: 'esp32-devkit-v1' },
      { name: 'DHT22', productSlug: 'dht22-temperature-humidity-sensor' },
      { name: 'BMP280 or Similar Sensor' },
      { name: 'Breadboard', productSlug: '830-point-solderless-breadboard' },
      { name: 'Jumper Wires', productSlug: 'jumper-wire-set' },
    ],
    optionalComponents: [{ name: 'Display Module' }],
    learningOutcomes: [
      'Environmental sensor integration',
      'Collecting and organizing IoT data',
      'Building connected monitoring prototypes',
    ],
  },
  {
    id: 'rfid-attendance-system',
    name: 'RFID Attendance System',
    description:
      'Prototype a card-based identification system for learning access and attendance concepts.',
    difficulty: 'Intermediate',
    icon: 'rfid',
    requiredComponents: [
      { name: 'ESP32 or Arduino', productSlug: 'esp32-devkit-v1' },
      { name: 'RFID Reader' },
      { name: 'RFID Cards' },
      { name: 'Display' },
      { name: 'Buzzer' },
      { name: 'Breadboard', productSlug: '830-point-solderless-breadboard' },
      { name: 'Jumper Wires', productSlug: 'jumper-wire-set' },
    ],
    optionalComponents: [],
    learningOutcomes: [
      'Reading RFID identifiers',
      'Organizing simple attendance records',
      'Combining input, display and alert components',
    ],
  },
]
