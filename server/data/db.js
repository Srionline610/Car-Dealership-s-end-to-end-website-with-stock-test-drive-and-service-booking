// server/data/db.js
// In-Memory operational database for Company A Dealership Platform (Brand X, Lucknow)
// Seeded with client context, showrooms, workshops, stock, pricing, and demo vehicles.

export const showrooms = [
  {
    id: "SR-01",
    name: "Hazratganj Flagship Showroom",
    address: "42/1, Mahatma Gandhi Marg, Hazratganj, Lucknow, UP - 226001",
    city: "Lucknow",
    phone: "+91 522 401 2200",
    email: "hazratganj.sales@companya-brandx.com",
    operatingHours: "10:00 AM - 08:00 PM (All 7 Days)",
    active: true
  },
  {
    id: "SR-02",
    name: "Gomti Nagar Showroom",
    address: "Plot 12, Vibhuti Khand, Gomti Nagar, Lucknow, UP - 226010",
    city: "Lucknow",
    phone: "+91 522 402 3311",
    email: "gomtinagar.sales@companya-brandx.com",
    operatingHours: "10:00 AM - 08:00 PM (All 7 Days)",
    active: true
  },
  {
    id: "SR-03",
    name: "Kanpur Road Showroom",
    address: "Sector B, Bargawan, Near Metro Station, Kanpur Road, Lucknow, UP - 226023",
    city: "Lucknow",
    phone: "+91 522 403 4422",
    email: "kanpurroad.sales@companya-brandx.com",
    operatingHours: "10:00 AM - 07:30 PM (All 7 Days)",
    active: true
  }
];

export const workshops = [
  {
    id: "WS-01",
    name: "Transport Nagar Central Workshop",
    address: "Phase 1, Commercial Complex, Transport Nagar, Lucknow, UP - 226012",
    city: "Lucknow",
    phone: "+91 522 409 8811",
    bays: 8,
    operatingHours: "08:30 AM - 06:30 PM (Mon - Sat)",
    services: ["Periodic Maintenance", "Running Repair", "Body & Paint", "Express Care 60m"],
    active: true
  },
  {
    id: "WS-02",
    name: "Chinhat East Workshop",
    address: "Deva Road Industrial Area, Chinhat, Lucknow, UP - 226028",
    city: "Lucknow",
    phone: "+91 522 409 9922",
    bays: 5,
    operatingHours: "08:30 AM - 06:30 PM (Mon - Sat)",
    services: ["Periodic Maintenance", "Running Repair", "Express Care 60m"],
    active: true
  }
];

export const customers = [
  {
    id: "CUST-1001",
    name: "Rahul Verma",
    email: "customer@gmail.com",
    phone: "9839012345",
    password: "Password@123",
    city: "Lucknow",
    createdAt: new Date().toISOString()
  }
];

export const users = [
  {
    id: "EMP-08",
    name: "Anand Agarwal",
    title: "Dealer Principal (Owner / Principal)",
    role: "dealer_principal",
    showroom_id: "SR-01",
    phone: "+91 98390 99999",
    email: "dealer.principal@companya.com",
    aliasEmails: ["anand.agarwal@companya-brandx.com", "principal@companya.com", "anand@companya.com"],
    password: "Lucknow@2026",
    targetView: "analytics",
    dashboardLabel: "Executive Recovery Dashboard (₹2.11 Cr Target)"
  },
  {
    id: "EMP-07",
    name: "Siddharth Malhotra",
    title: "Dealership Administrator",
    role: "admin",
    showroom_id: "SR-01",
    phone: "+91 98390 77889",
    email: "admin@companya.com",
    aliasEmails: ["admin@companya-brandx.com", "siddharth@companya.com"],
    password: "Admin@2026",
    targetView: "admin",
    dashboardLabel: "Dealership Management CMS, Price Tables & Brand Fleet"
  },
  {
    id: "EMP-04",
    name: "Sunita Rao",
    title: "Lead Desk Supervisor (All Showrooms)",
    role: "lead_supervisor",
    showroom_id: "SR-01",
    phone: "+91 98390 45678",
    email: "supervisor@companya.com",
    aliasEmails: ["sunita.rao@companya-brandx.com", "sunita@companya.com"],
    password: "Supervisor@2026",
    targetView: "inbox",
    dashboardLabel: "5-Min SLA Watchdog, All-Showroom Leads & CSV Ingestion"
  },
  {
    id: "EMP-01",
    name: "Rajesh Sharma",
    title: "Sales Consultant (Hazratganj Flagship)",
    role: "sales_consultant",
    showroom_id: "SR-01",
    phone: "+91 98390 12345",
    email: "sales.hazratganj@companya.com",
    aliasEmails: ["rajesh.sharma@companya-brandx.com", "rajesh@companya.com"],
    password: "Sales@2026",
    targetView: "inbox",
    dashboardLabel: "Hazratganj Sales Consultant Desk & Communications Desk",
    specialty: ["Model H", "Model C"]
  },
  {
    id: "EMP-02",
    name: "Priya Verma",
    title: "Sales Consultant (Gomti Nagar)",
    role: "sales_consultant",
    showroom_id: "SR-02",
    phone: "+91 98390 23456",
    email: "sales.gomti@companya.com",
    aliasEmails: ["priya.verma@companya-brandx.com", "priya@companya.com"],
    password: "Sales@2026",
    targetView: "inbox",
    dashboardLabel: "Gomti Nagar Sales Desk (Model S & EV Specialist)",
    specialty: ["Model S", "Model E"]
  },
  {
    id: "EMP-03",
    name: "Amit Tripathi",
    title: "Sales Consultant (Kanpur Road)",
    role: "sales_consultant",
    showroom_id: "SR-03",
    phone: "+91 98390 34567",
    email: "sales.kanpurroad@companya.com",
    aliasEmails: ["amit.tripathi@companya-brandx.com", "amit@companya.com"],
    password: "Sales@2026",
    targetView: "inbox",
    dashboardLabel: "Kanpur Road Showroom Sales Desk",
    specialty: ["Model H", "Model S"]
  },
  {
    id: "EMP-05",
    name: "Vikram Singh",
    title: "Used-Car Manager (Faizabad Road Yard)",
    role: "used_car_manager",
    showroom_id: "SR-01",
    phone: "+91 98390 56789",
    email: "usedcars@companya.com",
    aliasEmails: ["vikram.singh@companya-brandx.com", "vikram@companya.com"],
    password: "UsedCars@2026",
    targetView: "admin",
    dashboardLabel: "Certified Pre-Owned Yard & Market Valuation Tool"
  },
  {
    id: "EMP-06",
    name: "Manoj Pandey",
    title: "Service Advisor (Transport Nagar Central)",
    role: "service_advisor",
    workshop_id: "WS-01",
    phone: "+91 98390 67890",
    email: "service@companya.com",
    aliasEmails: ["manoj.pandey@companya-brandx.com", "manoj@companya.com"],
    password: "Service@2026",
    targetView: "service",
    dashboardLabel: "Transport Nagar Workshop & Bay Capacity (8 Bays)"
  },
  {
    id: "GUEST-01",
    name: "Prospective Car Buyer",
    title: "Buyer / Public Customer",
    role: "buyer",
    phone: "+91 98390 00000",
    email: "buyer@companya.com",
    aliasEmails: ["guest@companya.com", "customer@companya.com"],
    password: "Buyer@2026",
    targetView: "showroom",
    dashboardLabel: "Digital Showroom, Test Drives & On-Road Pricing"
  }
];

export const auditLogs = [];

export const models = [
  {
    id: "model-h",
    name: "Brand X Model H",
    tagline: "Urban Sophistication Meets Dynamic Performance",
    type: "Premium Hatchback / Cross",
    description: "Engineered for agile city commuting and effortless highway cruising. Features dual-tone floating roof, connected cockpit, and 5-star NCAP active safety suite.",
    startingPrice: 1025000,
    heroImage: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Opulent Blue", hex: "#1e3a8a" },
      { name: "Pearl Arctic White", hex: "#f8fafc" },
      { name: "Magma Grey", hex: "#475569" },
      { name: "Luxe Red", hex: "#991b1b" }
    ],
    variants: [
      {
        id: "H-ZX-AT",
        name: "Model H ZX Automatic (Top End)",
        fuel: "Petrol",
        transmission: "CVT with Paddle Shifters",
        engine: "1.2L Turbo DualJet Petrol (118 bhp / 170 Nm)",
        mileage: "18.5 kmpl",
        seating: 5,
        exShowroomPrice: 1245000,
        features: ["10.25-inch Touchscreen", "Wireless Apple CarPlay / Android Auto", "360-degree Camera", "Panoramic Sunroof", "Ventilated Front Seats", "6 Airbags Standard"]
      },
      {
        id: "H-VX-MT",
        name: "Model H VX Manual",
        fuel: "Petrol",
        transmission: "6-Speed Manual",
        engine: "1.2L Turbo DualJet Petrol (118 bhp / 170 Nm)",
        mileage: "19.8 kmpl",
        seating: 5,
        exShowroomPrice: 1025000,
        features: ["8-inch Touchscreen", "Cruise Control", "Push Button Start/Stop", "Rear Parking Camera", "Rear AC Vents", "Electronic Stability Program (ESP)"]
      }
    ]
  },
  {
    id: "model-c",
    name: "Brand X Model C",
    tagline: "Bold Presence. Uncompromising Adventure.",
    type: "Compact Luxury SUV",
    description: "Dominating stance with 205mm ground clearance, terrain response modes, and intelligent all-wheel grip. Built for both urban commutes and Himalayan escapes.",
    startingPrice: 1350000,
    heroImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Forest Metallic Green", hex: "#14532d" },
      { name: "Starlight White", hex: "#f8fafc" },
      { name: "Midnight Obsidian", hex: "#0f172a" },
      { name: "Copper Bronze", hex: "#78350f" }
    ],
    variants: [
      {
        id: "C-ZX-AT",
        name: "Model C ZX Automatic Petrol",
        fuel: "Petrol",
        transmission: "7-Speed Dual-Clutch (DCT)",
        engine: "1.5L Turbocharged Petrol (150 bhp / 250 Nm)",
        mileage: "16.2 kmpl",
        seating: 5,
        exShowroomPrice: 1420000,
        features: ["Dual-Pane Panoramic Skyroof", "Level 2 ADAS (12 Functions)", "Bose 8-Speaker Audio", "Powered Driver Seat with Memory", "Wireless Fast Charger"]
      },
      {
        id: "C-VX-DSL",
        name: "Model C VX Manual Diesel",
        fuel: "Diesel",
        transmission: "6-Speed Manual",
        engine: "1.5L CRDi Turbo Diesel (116 bhp / 260 Nm)",
        mileage: "21.0 kmpl",
        seating: 5,
        exShowroomPrice: 1350000,
        features: ["Electronic Parking Brake with Auto Hold", "Drive Modes (Eco, City, Sport)", "All 4 Disc Brakes", "Roof Rails & Skid Plates"]
      }
    ]
  },
  {
    id: "model-s",
    name: "Brand X Model S",
    tagline: "Executive Elegance. Supreme Aerodynamic Comfort.",
    type: "Premium Executive Sedan",
    description: "Class-leading 506-litre boot, serene cabin NVH insulation, and rear seat recline lounge package designed for corporate executives and families alike.",
    startingPrice: 1175000,
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Platinum Silver", hex: "#94a3b8" },
      { name: "Executive Pearl White", hex: "#ffffff" },
      { name: "Deep Royal Sapphire", hex: "#1e40af" }
    ],
    variants: [
      {
        id: "S-ZX-AT",
        name: "Model S ZX Automatic",
        fuel: "Petrol",
        transmission: "CVT with 7-Step Sports Mode",
        engine: "1.5L i-VTEC DOHC Petrol (121 bhp / 145 Nm)",
        mileage: "17.8 kmpl",
        seating: 5,
        exShowroomPrice: 1390000,
        features: ["LaneWatch Blind Spot Camera", "Leatherette Perforated Upholstery", "Remote Engine Start from Key Fob", "Ambient Multi-Color Mood Lighting"]
      },
      {
        id: "S-VX-MT",
        name: "Model S VX Manual",
        fuel: "Petrol",
        transmission: "6-Speed Manual",
        engine: "1.5L i-VTEC DOHC Petrol (121 bhp / 145 Nm)",
        mileage: "18.4 kmpl",
        seating: 5,
        exShowroomPrice: 1175000,
        features: ["One-Touch Electric Sunroof", "Tire Pressure Monitoring System (TPMS)", "Smart Keyless Entry", "Automatic Climate Control"]
      }
    ]
  },
  {
    id: "model-e",
    name: "Brand X Model E",
    tagline: "Pure Electric Luxury. 520 km Range.",
    type: "All-Electric Crossover",
    description: "Built on a dedicated 800V EV skateboard platform. Ultra-fast charging 10% to 80% in 18 minutes, silent cabin acoustic glass, and vehicle-to-load bidirectional power.",
    startingPrice: 2250000,
    heroImage: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    colors: [
      { name: "Electric Cyan", hex: "#06b6d4" },
      { name: "Cyber White", hex: "#f1f5f9" },
      { name: "Dark Titanium", hex: "#334155" }
    ],
    variants: [
      {
        id: "E-LR-AWD",
        name: "Model E Long Range AWD",
        fuel: "Electric",
        transmission: "Single-Speed Automatic Reduction Gear",
        engine: "Dual Motor AWD (308 bhp / 500 Nm, 0-100 in 5.2s)",
        mileage: "520 km (ARAI certified)",
        seating: 5,
        exShowroomPrice: 2250000,
        features: ["800V Ultra-Fast DC Architecture", "Augmented Reality HUD", "Vehicle-to-Load (V2L) Power Socket", "Meridian 14-Speaker Sound System"]
      }
    ]
  }
];

// Price configuration matrix for Lucknow (UP)
// Admin controlled, versioned, strictly deterministic
export const priceConfigurations = {
  "H-ZX-AT": {
    variantId: "H-ZX-AT",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1245000,
    components: {
      roadTaxRTO: 124500, // 10% UP Road Tax
      insuranceComprehensive: 45000, // 1 yr Own Damage + 3 yr Third Party + Zero Dep
      mandatoryCharges: 2500, // Fastag + Permanent UP RTO Smart Card
      extendedWarranty5Yr: 18500, // Optional
      accessoryPack: 15000 // Optional Dealership Chrome & Mat Kit
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh. Road tax calculated as per UP Motor Vehicle Taxation Act. Subject to statutory revision."
  },
  "H-VX-MT": {
    variantId: "H-VX-MT",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1025000,
    components: {
      roadTaxRTO: 102500,
      insuranceComprehensive: 38200,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 16500,
      accessoryPack: 13500
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh."
  },
  "C-ZX-AT": {
    variantId: "C-ZX-AT",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1420000,
    components: {
      roadTaxRTO: 142000,
      insuranceComprehensive: 51200,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 21000,
      accessoryPack: 18000
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh."
  },
  "C-VX-DSL": {
    variantId: "C-VX-DSL",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1350000,
    components: {
      roadTaxRTO: 135000,
      insuranceComprehensive: 49500,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 20000,
      accessoryPack: 17500
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh."
  },
  "S-ZX-AT": {
    variantId: "S-ZX-AT",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1390000,
    components: {
      roadTaxRTO: 139000,
      insuranceComprehensive: 49800,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 19500,
      accessoryPack: 16000
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh."
  },
  "S-VX-MT": {
    variantId: "S-VX-MT",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 1175000,
    components: {
      roadTaxRTO: 117500,
      insuranceComprehensive: 42500,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 17500,
      accessoryPack: 14500
    },
    disclaimer: "Prices effective in Lucknow, Uttar Pradesh."
  },
  "E-LR-AWD": {
    variantId: "E-LR-AWD",
    city: "Lucknow",
    effectiveFrom: "2026-01-01",
    validUntil: "2026-12-31",
    status: "active",
    exShowroom: 2250000,
    components: {
      roadTaxRTO: 0, // UP EV Policy 100% road tax waiver for early registered EVs
      insuranceComprehensive: 68500,
      mandatoryCharges: 2500,
      extendedWarranty5Yr: 32000,
      accessoryPack: 22000
    },
    disclaimer: "0% Road Tax applied under UP EV Promotion Policy 2022-2027. Ex-showroom includes fast charger hardware."
  }
};

// Vehicle stock records (New & Certified Used)
export const vehicleStock = [
  {
    stockId: "NEW-H-02",
    type: "new",
    modelId: "model-h",
    modelName: "Model H",
    variantId: "H-ZX-AT",
    variantName: "ZX Automatic",
    fuel: "Petrol",
    year: 2026,
    km: 0,
    color: "Opulent Blue",
    price: 1245000,
    status: "available",
    showroomId: "SR-01",
    isDemoVehicle: false,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
  },
  {
    stockId: "NEW-C-01",
    type: "new",
    modelId: "model-c",
    modelName: "Model C",
    variantId: "C-ZX-AT",
    variantName: "ZX Automatic",
    fuel: "Petrol",
    year: 2026,
    km: 0,
    color: "Forest Metallic Green",
    price: 1420000,
    status: "available",
    showroomId: "SR-02",
    isDemoVehicle: false,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    stockId: "NEW-S-03",
    type: "new",
    modelId: "model-s",
    modelName: "Model S",
    variantId: "S-VX-MT",
    variantName: "VX Manual",
    fuel: "Petrol",
    year: 2026,
    km: 0,
    color: "Deep Royal Sapphire",
    price: 1175000,
    status: "available",
    showroomId: "SR-03",
    isDemoVehicle: false,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    stockId: "NEW-E-01",
    type: "new",
    modelId: "model-e",
    modelName: "Model E",
    variantId: "E-LR-AWD",
    variantName: "Long Range AWD",
    fuel: "Electric",
    year: 2026,
    km: 0,
    color: "Electric Cyan",
    price: 2250000,
    status: "available",
    showroomId: "SR-01",
    isDemoVehicle: false,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  },
  // Used certified cars
  {
    stockId: "UC-1182",
    type: "used",
    modelId: "model-c",
    modelName: "Model C",
    variantId: "C-VX-DSL",
    variantName: "VX",
    fuel: "Diesel",
    transmission: "6-Speed Manual",
    year: 2022,
    km: 41200,
    owners: 1,
    maskedReg: "UP 32 ** 4821",
    price: 845000,
    status: "available",
    yardId: "UY-01",
    inspectionScore: 94,
    inspectionSummary: "Certified 140-point inspection cleared. Non-accidental, engine compression pristine, full service history at Company A Transport Nagar workshop. New Yokohama tyres installed at 38,000 km.",
    warranty: "1 Year Comprehensive + 24x7 Roadside Assistance",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
  },
  {
    stockId: "UC-1190",
    type: "used",
    modelId: "model-s",
    modelName: "Model S",
    variantId: "S-VX-MT",
    variantName: "LX",
    fuel: "Petrol",
    transmission: "Manual",
    year: 2021,
    km: 58600,
    owners: 2,
    maskedReg: "UP 32 ** 9012",
    price: 512000,
    status: "booked", // Booked demonstration
    yardId: "UY-01",
    inspectionScore: 89,
    inspectionSummary: "Minor front bumper touch-up in 2023. Brake pads replaced at 50,000 km. AC cooling coil serviced. Booking deposit received.",
    warranty: "6 Months Engine & Drivetrain Warranty",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
  },
  {
    stockId: "UC-1204",
    type: "used",
    modelId: "model-h",
    modelName: "Model H",
    variantId: "H-ZX-AT",
    variantName: "ZX",
    fuel: "Petrol",
    transmission: "Automatic",
    year: 2023,
    km: 24100,
    owners: 1,
    maskedReg: "UP 32 ** 1104",
    price: 780000,
    status: "available",
    yardId: "UY-01",
    inspectionScore: 97,
    inspectionSummary: "Mint single-owner vehicle. Zero scratch paintwork. Dealership maintained under Brand X warranty package.",
    warranty: "1 Year Comprehensive + Free 2 Scheduled Services",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
  }
];

// Dedicated Demo Vehicle Fleet for Atomic Test-Drive scheduling (Covering all 4 models across all 3 Lucknow showrooms)
export const demoVehicles = [
  // Hazratganj Flagship (SR-01) Fleet
  {
    demoId: "DEMO-H-01",
    stockId: "NEW-H-02",
    modelId: "model-h",
    modelName: "Brand X Model H (ZX AT - Opulent Blue)",
    showroomId: "SR-01",
    plateMasked: "UP 32 TR ** 01",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-C-01",
    stockId: "NEW-C-01",
    modelId: "model-c",
    modelName: "Brand X Model C (ZX AT - Forest Green)",
    showroomId: "SR-01",
    plateMasked: "UP 32 TR ** 02",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-S-01",
    stockId: "NEW-S-03",
    modelId: "model-s",
    modelName: "Brand X Model S (ZX AT - Magma Grey)",
    showroomId: "SR-01",
    plateMasked: "UP 32 TR ** 03",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-E-01",
    stockId: "NEW-E-01",
    modelId: "model-e",
    modelName: "Brand X Model E (Electric AWD - Arctic White)",
    showroomId: "SR-01",
    plateMasked: "UP 32 TR ** 04",
    fuel: "Electric",
    transmission: "Automatic",
    status: "active"
  },

  // Gomti Nagar Showroom (SR-02) Fleet
  {
    demoId: "DEMO-H-02",
    stockId: "NEW-H-03",
    modelId: "model-h",
    modelName: "Brand X Model H (ZX AT - Arctic White)",
    showroomId: "SR-02",
    plateMasked: "UP 32 TR ** 05",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-C-02",
    stockId: "NEW-C-02",
    modelId: "model-c",
    modelName: "Brand X Model C (ZX AT - Crimson Red)",
    showroomId: "SR-02",
    plateMasked: "UP 32 TR ** 06",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-S-02",
    stockId: "NEW-S-04",
    modelId: "model-s",
    modelName: "Brand X Model S (ZX AT - Midnight Black)",
    showroomId: "SR-02",
    plateMasked: "UP 32 TR ** 07",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-E-02",
    stockId: "NEW-E-02",
    modelId: "model-e",
    modelName: "Brand X Model E (Electric AWD - Cyber Silver)",
    showroomId: "SR-02",
    plateMasked: "UP 32 TR ** 08",
    fuel: "Electric",
    transmission: "Automatic",
    status: "active"
  },

  // Kanpur Road Showroom (SR-03) Fleet
  {
    demoId: "DEMO-H-03",
    stockId: "NEW-H-04",
    modelId: "model-h",
    modelName: "Brand X Model H (ZX AT - Magma Grey)",
    showroomId: "SR-03",
    plateMasked: "UP 32 TR ** 09",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-C-03",
    stockId: "NEW-C-03",
    modelId: "model-c",
    modelName: "Brand X Model C (ZX AT - Opulent Blue)",
    showroomId: "SR-03",
    plateMasked: "UP 32 TR ** 10",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-S-03",
    stockId: "NEW-S-05",
    modelId: "model-s",
    modelName: "Brand X Model S (ZX AT - Pearl White)",
    showroomId: "SR-03",
    plateMasked: "UP 32 TR ** 11",
    fuel: "Petrol",
    transmission: "Automatic",
    status: "active"
  },
  {
    demoId: "DEMO-E-03",
    stockId: "NEW-E-03",
    modelId: "model-e",
    modelName: "Brand X Model E (Electric AWD - Lunar Grey)",
    showroomId: "SR-03",
    plateMasked: "UP 32 TR ** 12",
    fuel: "Electric",
    transmission: "Automatic",
    status: "active"
  }
];

// Standard slots for test drives
export const standardTestDriveSlots = [
  "10:30 AM - 11:30 AM",
  "12:00 PM - 01:00 PM",
  "02:30 PM - 03:30 PM",
  "04:00 PM - 05:00 PM",
  "05:30 PM - 06:30 PM"
];

// Service slots
export const standardServiceSlots = [
  "09:00 AM - 11:00 AM",
  "11:30 AM - 01:30 PM",
  "02:30 PM - 04:30 PM",
  "04:30 PM - 06:30 PM"
];

// Existing bookings (for atomic concurrency checks)
export const testDriveBookings = [
  {
    bookingId: "TDB-9001",
    demoId: "DEMO-H-01",
    showroomId: "SR-01",
    date: "2026-11-06",
    slotTime: "10:30 AM - 11:30 AM",
    customerName: "Vipin Agrawal",
    customerPhone: "+91 99190 55441",
    customerEmail: "vipin.agrawal@gmail.com",
    licenseMasked: "UP-32-2019-****-09",
    status: "confirmed",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

export const serviceBookings = [
  {
    bookingId: "SRV-5001",
    workshopId: "WS-01",
    date: "2026-11-06",
    slotTime: "09:00 AM - 11:00 AM",
    bayNumber: 1,
    vehicleReg: "UP 32 DZ 8810",
    modelName: "Brand X Model C",
    serviceType: "Periodic Maintenance (30,000 km)",
    customerName: "Mohd. Rizwan",
    customerPhone: "+91 98391 11223",
    status: "confirmed",
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

// Leads collection with active 5-minute SLA tracking
export const leads = [
  {
    leadId: "LEAD-101",
    customerName: "Alok Kumar Srivastava",
    phone: "+91 94150 88219",
    email: "alok.srivastava@yahoo.co.in",
    preferredLanguage: "Hindi",
    source: "Website On-Road Quote",
    modelInterest: "Brand X Model H",
    variantInterest: "H-ZX-AT",
    showroomId: "SR-01",
    budget: "₹14 Lakh",
    createdAt: new Date(Date.now() - 180000).toISOString(), // 3 minutes ago (Active SLA timer!)
    assignedTo: "EMP-01", // Rajesh Sharma
    assignedAt: new Date(Date.now() - 170000).toISOString(),
    firstContactAt: null, // NOT called yet! Under 5 min window
    status: "Assigned",
    consentDPDP: {
      accepted: true,
      timestamp: new Date(Date.now() - 180000).toISOString(),
      noticeVersion: "v1.2-dpdp2023",
      marketingOptIn: false
    },
    buyerSummary: "Customer Alok Kumar is inquiring for on-road pricing of Model H ZX Automatic in Lucknow. Expressed preference for Hindi communication. Financing calculation requested.",
    notes: ["System assigned to Rajesh Sharma based on Hazratganj showroom Model H specialty."]
  },
  {
    leadId: "LEAD-102",
    customerName: "Dr. Neha Mehrotra",
    phone: "+91 98380 44921",
    email: "dr.neha.m@apollohospitals.com",
    preferredLanguage: "English",
    source: "CarWale CSV Import",
    modelInterest: "Brand X Model E (Electric)",
    variantInterest: "E-LR-AWD",
    showroomId: "SR-01",
    budget: "₹25 Lakh",
    createdAt: new Date(Date.now() - 420000).toISOString(), // 7 minutes ago (BREACHED 5-MIN SLA!)
    assignedTo: "EMP-02", // Priya Verma
    assignedAt: new Date(Date.now() - 400000).toISOString(),
    firstContactAt: null, // Still not contacted! SLA breached
    status: "Assigned",
    consentDPDP: {
      accepted: true,
      timestamp: new Date(Date.now() - 420000).toISOString(),
      noticeVersion: "v1.2-dpdp2023",
      marketingOptIn: true
    },
    buyerSummary: "Hospital consultant looking to switch from diesel SUV to Electric Model E AWD. Inquired about home fast-charger installation in Gomti Nagar and UP EV road tax waiver.",
    notes: ["Lead exceeded 5-minute SLA timer without contact. Flagged to Supervisor Sunita Rao."]
  },
  {
    leadId: "LEAD-103",
    customerName: "Gaurav Rastogi",
    phone: "+91 99355 12098",
    email: "gaurav.rastogi@bizmail.com",
    preferredLanguage: "English",
    source: "Website Test Drive",
    modelInterest: "Brand X Model C",
    variantInterest: "C-ZX-AT",
    showroomId: "SR-02",
    budget: "₹16 Lakh",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    assignedTo: "EMP-01",
    assignedAt: new Date(Date.now() - 3590000).toISOString(),
    firstContactAt: new Date(Date.now() - 3450000).toISOString(), // Contacted within 2.5 minutes! (SLA MET)
    status: "Contacted",
    consentDPDP: {
      accepted: true,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      noticeVersion: "v1.2-dpdp2023",
      marketingOptIn: true
    },
    buyerSummary: "Customer booked test drive for Saturday at Gomti Nagar. Looking to trade in 2018 Swift Dzire.",
    notes: ["Spoke to customer. Confirmed test-drive for Saturday 11:30 AM at Gomti Nagar. Trade-in valuation team alerted."]
  }
];

// Historical Used-Car Transactions (for robust comp-based valuation band)
export const historicalUsedSales = [
  { model: "Model C", variant: "VX", year: 2022, km: 42000, fuel: "Diesel", salePrice: 840000, saleDate: "2026-09-15" },
  { model: "Model C", variant: "VX", year: 2022, km: 38000, fuel: "Diesel", salePrice: 855000, saleDate: "2026-08-10" },
  { model: "Model C", variant: "VX", year: 2023, km: 28000, fuel: "Diesel", salePrice: 895000, saleDate: "2026-10-12" },
  { model: "Model C", variant: "VX", year: 2021, km: 52000, fuel: "Diesel", salePrice: 790000, saleDate: "2026-07-22" },
  { model: "Model H", variant: "ZX", year: 2023, km: 26000, fuel: "Petrol", salePrice: 775000, saleDate: "2026-10-04" },
  { model: "Model H", variant: "ZX", year: 2023, km: 21000, fuel: "Petrol", salePrice: 790000, saleDate: "2026-09-29" },
  { model: "Model H", variant: "VX", year: 2022, km: 35000, fuel: "Petrol", salePrice: 720000, saleDate: "2026-08-19" },
  { model: "Model S", variant: "LX", year: 2021, km: 60000, fuel: "Petrol", salePrice: 510000, saleDate: "2026-09-02" },
  { model: "Model S", variant: "VX", year: 2022, km: 41000, fuel: "Petrol", salePrice: 565000, saleDate: "2026-08-25" },
  { model: "Model S", variant: "ZX", year: 2023, km: 23000, fuel: "Petrol", salePrice: 620000, saleDate: "2026-10-01" },
  { model: "Model E", variant: "EV Long Range", year: 2023, km: 18000, fuel: "Electric", salePrice: 1350000, saleDate: "2026-09-20" },
  { model: "Model E", variant: "EV Standard", year: 2023, km: 24000, fuel: "Electric", salePrice: 1280000, saleDate: "2026-08-11" }
];
