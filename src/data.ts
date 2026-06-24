import { PipeStandard, HollowSectionStandard } from "./types";

// Official IS:1239 (Part-1) Mild Steel Tubes & Galvanized Pipes specifications
export const IS1239_STANDARDS: PipeStandard[] = [
  {
    nominalSize: "DN 15",
    inchSize: '1/2"',
    outerDiameterMax: 21.8,
    outerDiameterMin: 21.0,
    thickness: { light: 2.0, medium: 2.6, heavy: 3.2 },
    weight: { light: 1.21, medium: 1.44, heavy: 1.61 }
  },
  {
    nominalSize: "DN 20",
    inchSize: '3/4"',
    outerDiameterMax: 27.3,
    outerDiameterMin: 26.4,
    thickness: { light: 2.3, medium: 2.6, heavy: 3.2 },
    weight: { light: 1.56, medium: 1.87, heavy: 2.13 }
  },
  {
    nominalSize: "DN 25",
    inchSize: '1"',
    outerDiameterMax: 34.2,
    outerDiameterMin: 33.2,
    thickness: { light: 2.6, medium: 3.2, heavy: 4.0 },
    weight: { light: 2.00, medium: 2.42, heavy: 2.93 }
  },
  {
    nominalSize: "DN 32",
    inchSize: '1-1/4"',
    outerDiameterMax: 42.9,
    outerDiameterMin: 41.9,
    thickness: { light: 2.6, medium: 3.2, heavy: 4.0 },
    weight: { light: 2.58, medium: 3.10, heavy: 3.79 }
  },
  {
    nominalSize: "DN 40",
    inchSize: '1-1/2"',
    outerDiameterMax: 48.8,
    outerDiameterMin: 47.8,
    thickness: { light: 2.9, medium: 3.2, heavy: 4.0 },
    weight: { light: 3.21, medium: 3.57, heavy: 4.37 }
  },
  {
    nominalSize: "DN 50",
    inchSize: '2"',
    outerDiameterMax: 60.8,
    outerDiameterMin: 59.6,
    thickness: { light: 2.9, medium: 3.6, heavy: 4.5 },
    weight: { light: 4.08, medium: 5.03, heavy: 6.19 }
  },
  {
    nominalSize: "DN 65",
    inchSize: '2-1/2"',
    outerDiameterMax: 76.6,
    outerDiameterMin: 75.2,
    thickness: { light: 3.2, medium: 3.65, heavy: 4.5 },
    weight: { light: 5.71, medium: 6.43, heavy: 7.80 }
  },
  {
    nominalSize: "DN 80",
    inchSize: '3"',
    outerDiameterMax: 89.5,
    outerDiameterMin: 87.9,
    thickness: { light: 3.2, medium: 4.0, heavy: 4.85 },
    weight: { light: 6.72, medium: 8.35, heavy: 10.10 }
  },
  {
    nominalSize: "DN 100",
    inchSize: '4"',
    outerDiameterMax: 115.0,
    outerDiameterMin: 113.1,
    thickness: { light: 3.6, medium: 4.5, heavy: 5.4 },
    weight: { light: 9.75, medium: 12.20, heavy: 14.50 }
  },
  {
    nominalSize: "DN 125",
    inchSize: '5"',
    outerDiameterMax: 140.8,
    outerDiameterMin: 138.5,
    thickness: { light: 4.5, medium: 4.85, heavy: 5.4 },
    weight: { light: 15.0, medium: 16.20, heavy: 17.90 }
  },
  {
    nominalSize: "DN 150",
    inchSize: '6"',
    outerDiameterMax: 166.5,
    outerDiameterMin: 164.1,
    thickness: { light: 4.5, medium: 4.85, heavy: 5.4 },
    weight: { light: 17.8, medium: 19.20, heavy: 21.30 }
  }
];

// Square Hollow Sections (SHS) standard weights according to IS:4923
export const SHS_STANDARDS: HollowSectionStandard[] = [
  { size: "25 x 25", thickness: 2.0, weight: 1.36, area: 1.73 },
  { size: "32 x 32", thickness: 2.6, weight: 2.19, area: 2.79 },
  { size: "40 x 40", thickness: 3.2, weight: 3.44, area: 4.38 },
  { size: "50 x 50", thickness: 3.2, weight: 4.44, area: 5.66 },
  { size: "60 x 60", thickness: 4.0, weight: 6.71, area: 8.55 },
  { size: "80 x 80", thickness: 4.0, weight: 9.22, area: 11.70 },
  { size: "100 x 100", thickness: 4.0, weight: 11.70, area: 14.90 },
  { size: "120 x 120", thickness: 5.0, weight: 17.40, area: 22.20 },
  { size: "150 x 150", thickness: 5.0, weight: 22.10, area: 28.20 }
];

// Rectangular Hollow Sections (RHS) standard weights according to IS:4923
export const RHS_STANDARDS: HollowSectionStandard[] = [
  { size: "40 x 20", thickness: 2.0, weight: 1.68, area: 2.13 },
  { size: "50 x 25", thickness: 2.6, weight: 2.72, area: 3.46 },
  { size: "60 x 40", thickness: 3.2, weight: 4.44, area: 5.66 },
  { size: "80 x 40", thickness: 4.0, weight: 6.71, area: 8.55 },
  { size: "100 x 50", thickness: 4.0, weight: 8.59, area: 10.90 },
  { size: "120 x 60", thickness: 4.0, weight: 10.50, area: 13.30 },
  { size: "150 x 75", thickness: 5.0, weight: 16.20, area: 20.70 },
  { size: "200 x 100", thickness: 5.0, weight: 22.10, area: 28.20 }
];

// Company product specifications
export const PRODUCTS_INFO = [
  {
    id: "erw-pipes",
    name: "ERW Steel Pipes",
    fullName: "Electric Resistance Welded MS Pipes",
    tagline: "High-Frequency Induction Welded Structural Integrity",
    description: "Our high-frequency Electric Resistance Welded (ERW) Mild Steel pipes are sourced from premium quality Hot-Rolled coils. Designed to handle severe structural loads, fluids, and low-pressure gas systems.",
    specifications: "IS: 1239 (Part-1), IS: 1161, IS: 3589",
    sizes: "1/2\" to 6\" (DN 15 to DN 150) in various wall thicknesses",
    applications: ["Scaffolding and structural supports", "Water and fluid distribution networks", "Agriculture irrigation tubing", "General fabrication works", "Bored well casing tubes"],
    features: ["Superb dimensional tolerance", "Normalized weld seam (inner/outer bead trimmer)", "Perfect tensile and bend capability", "Highly precise circularity"],
    imageUrl: "/src/assets/images/product_erw_pipes_1782258692545.jpg"
  },
  {
    id: "gi-pipes",
    name: "GI Steel Pipes",
    fullName: "Hot-Dip Galvanized Iron Pipes",
    tagline: "Heavy-Duty Anti-Corrosive Zinc Shield Protection",
    description: "JNI Hot-Dip Galvanized Iron (GI) pipes are manufactured by coating high-quality ERW pipes with a uniform layer of premium pure zinc. Delivers exceptional defense against oxidative rust in atmospheric, underground, and water pipelines.",
    specifications: "IS: 1239 (Part-1) Galvanized, Hot-Dip Zinc Coating IS: 4736",
    sizes: "1/2\" to 6\" Nominal Bore (Light, Medium, Heavy classes)",
    applications: ["Drinking water municipal supply lines", "Plumbing and sanitary conduit networks", "Irrigation and borewell piping systems", "Solar panel structure framing", "Outdoor signboards & high-humidity structures"],
    features: ["Uniform zinc coating (> 360 g/m²)", "Superior adherence resisting peeling", "Excellent pressure bearing performance", "Eco-friendly, chemical-safe coating"],
    imageUrl: "/src/assets/images/product_gi_pipes_1782258704084.jpg"
  },
  {
    id: "hollow-sections",
    name: "Square & Rectangular Tubes",
    fullName: "Structural Hollow Sections (SHS / RHS)",
    tagline: "Architectural & Industrial Structural Steel Profiles",
    description: "Square and Rectangular steel hollow sections engineered to meet the robust structural requirements of modern civil architecture, heavy vehicle bodies, solar mountings, and pre-engineered buildings (PEB).",
    specifications: "IS: 4923 / IS: 1161",
    sizes: "25x25mm to 150x150mm (Square), 40x20mm to 200x100mm (Rectangular)",
    applications: ["Pre-Engineered Building (PEB) columns & trusses", "Automotive chassis and bus body frames", "Solar panel mounting frames", "Mezzanine floors and industrial shelters", "Modern furniture and structural columns"],
    features: ["High strength-to-weight ratio", "Excellent torsional rigidity", "Accurate corners and perpendicular edges", "Smooth surface ideal for powder coating and welding"],
    imageUrl: "/src/assets/images/product_hollow_sections_1782258716256.jpg"
  }
];

export const TESTIMONIALS = [
  {
    name: "Er. Alok Srivastava",
    role: "Senior Consultant",
    company: "Purvanchal Expressway Infrastructure Ltd.",
    quote: "JNI Steel Tubes demonstrate top-tier mechanical integrity. Their ERW structural hollow sections have been incredibly reliable for our expressway toll-plaza shelters. The dimensional tolerances are excellent.",
    rating: 5
  },
  {
    name: "Shri Rajesh Agrawal",
    role: "Managing Director",
    company: "Agrawal Water Infrastructure Corp.",
    quote: "Procuring hot-dip galvanized pipes directly from Jagdev Nagar Industries' Sultanpur facility has resolved our supply bottleneck. Their IS:1239 Heavy Class GI pipes offer the best uniform coating finish in Northern India.",
    rating: 5
  },
  {
    name: "Sanjay Mishra",
    role: "Proprietor",
    company: "Mishra Tubewell & Fabrication, Sultanpur",
    quote: "JNI pipes are highly welder-friendly and easy to form. Local supply directly from Kavipur ensures low transportation costs, which translates into highly competitive projects for our end clients.",
    rating: 5
  }
];

export const FAQ_DATA = [
  {
    question: "Where is the manufacturing facility of Jagdev Nagar Industries located?",
    answer: "The modern manufacturing facility of Jagdev Nagar Industries is situated in Kavipur – Sultanpur, Uttar Pradesh, India. The plant is spread across a massive 2.5 Bigha, designed for optimized heavy-logistics loading, hot-dip galvanization, and continuous ERW steel production."
  },
  {
    question: "Which Indian Standards (BIS/ISI) do JNI products comply with?",
    answer: "We manufacture products complying with the highest domestic quality codes: IS 1239 (Part-1) for Mild Steel and Galvanized Tubes, IS 1161 for structural pipes, IS 3589 for large diameter water/gas lines, and IS 4923 for Square and Rectangular Hollow Sections."
  },
  {
    question: "What makes hot-dip galvanized (GI) pipes from JNI highly durable?",
    answer: "Our GI pipes are hot-dip galvanized using premium Grade-A zinc, creating a highly durable zinc-iron alloy coating thicker than 360 g/m² (50+ microns). This provides a sacrificial anode system protecting the inner core even when subjected to scratches, moisture, or acidic soils."
  },
  {
    question: "How can I obtain a customized bulk commercial quote?",
    answer: "You can use our integrated 'Instant Pipe Weight Calculator' to compute standard tonnage requirements. Submit the quote request through our inline form, and our sales office in Sultanpur will compile and issue an official quotation with commercial discounts within 4 hours."
  },
  {
    question: "Can JNI deliver steel products across Uttar Pradesh and other states?",
    answer: "Yes. Our Sultanpur dispatch yard is perfectly connected by NH-731 and Purvanchal Expressway, enabling seamless shipping across all districts of Uttar Pradesh (Lucknow, Varanasi, Prayagraj, Gorakhpur) as well as neighbouring states."
  }
];
