import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory array to store dynamic quote/inquiry submissions
const inquiries: Array<{
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  productType: string;
  dimensions: string;
  quantity: string;
  notes?: string;
  timestamp: string;
  status: "Pending" | "Reviewed" | "Contacted";
}> = [
  {
    id: "JNI-2026-001",
    name: "Ramesh Kumar",
    company: "UP Water Works & Infra Ltd.",
    phone: "+91 9415012345",
    email: "ramesh.kumar@upinfra.com",
    location: "Sultanpur, Uttar Pradesh",
    productType: "GI Pipes (Galvanized)",
    dimensions: "IS 1239 Heavy Grade - DN 80 (3\") - 6m Length",
    quantity: "250 Tons",
    notes: "Urgent procurement for municipal drinking water supply extension pipeline in Sultanpur district.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "Contacted"
  },
  {
    id: "JNI-2026-002",
    name: "Vikram Aditya Singh",
    company: "Aura Developers & Builders",
    phone: "+91 9918044700",
    email: "procurement@aurabuilders.in",
    location: "Lucknow, Uttar Pradesh",
    productType: "Square Tubes (SHS)",
    dimensions: "100x100mm, 4.0mm thickness - 6m Length",
    quantity: "850 pieces",
    notes: "Required for structural steel columns in commercial mall project.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: "Pending"
  }
];

// Initialize Gemini AI Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini AI initialized successfully on the server.");
  } catch (error) {
    console.error("Failed to initialize Gemini AI Client:", error);
  }
} else {
  console.log("GEMINI_API_KEY is not configured. Falling back to rule-based interactive steel advisor.");
}

// API Routes

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Get List of Inquiries (for demonstrating real full-stack state & investor admin panel!)
app.get("/api/inquiries", (req, res) => {
  res.json({ success: true, count: inquiries.length, data: inquiries });
});

// Submit a new Inquiry / Quote request
app.post("/api/inquire", (req, res) => {
  try {
    const { name, company, phone, email, location, productType, dimensions, quantity, notes } = req.body;

    if (!name || !phone || !productType || !quantity) {
      return res.status(400).json({ success: false, error: "Missing required fields (name, phone, productType, quantity)." });
    }

    const newInquiry = {
      id: `JNI-2026-${String(inquiries.length + 1).padStart(3, "0")}`,
      name,
      company: company || "Individual",
      phone,
      email: email || "N/A",
      location: location || "India",
      productType,
      dimensions: dimensions || "Custom Specifications",
      quantity,
      notes: notes || "",
      timestamp: new Date().toISOString(),
      status: "Pending" as const
    };

    inquiries.unshift(newInquiry); // Insert at the beginning of the array

    return res.json({
      success: true,
      message: "Your quote request has been registered. Our corporate sales desk will contact you within 4 hours.",
      data: newInquiry
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Smart AI Steel Advisor powered by Gemini API
app.post("/api/gemini/consult", async (req, res) => {
  try {
    const { query, conversationHistory = [] } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, error: "Query is required." });
    }

    // System instruction to prime the model for JNI's professional corporate context
    const systemInstruction = `You are "JNI Steel Advisor", an expert metallurgy engineer and commercial sales consultant for Jagdev Nagar Industries (JNI), a leading and modern upcoming steel pipe manufacturer based in Kavipur - Sultanpur, Uttar Pradesh, India (Owner: Shri Shivesh Jaiswal).

Your tone must be highly professional, helpful, technical, corporate, and trustworthy. You assist engineers, structural contractors, water project managers, government buyers, and investors.

Provide precise, detailed responses. When relevant, reference Indian Standard Specifications (BIS / ISI Standards) such as:
1. IS:1239 (Part-1) for Mild Steel Tubes (ERW) and GI pipes (Light, Medium, Heavy grades, sizes DN 15 to DN 150).
2. IS:1161 for Steel Tubes for Structural purposes.
3. IS:3589 for Steel Pipes for water, gas, and sewage (sizes DN 150 to DN 2000).
4. IS:4923 for Hollow Steel Sections (Square and Rectangular tubes for structural works).

Products Manufactured by JNI:
- ERW Steel Pipes (for structural, gas, irrigation applications)
- MS Black Pipes (Mild Steel Black, heavy industrial applications)
- GI Pipes (Galvanized Iron with uniform zinc coating, anti-corrosive, for plumbing, water transmission, agricultural pipelines)
- Square Hollow Sections (SHS) & Rectangular Hollow Sections (RHS) for modern construction, columns, and architectural trusses.
- Structural Steel Sections (Tubes, hollow sections, customized diameters)

Address the company, Jagdev Nagar Industries (JNI), as an emerging power in Northern India's steel manufacturing sector, establishing a modern state-of-the-art plant over 2.5 Bigha in Sultanpur with over ₹8 Crore in investment, quality inspection labs, high-frequency induction ERW welding, and hydro-testing capabilities.

If asked about pricing, kindly explain that steel prices fluctuate daily according to commodity rates, but JNI offers the most competitive direct-from-mill pricing. Recommend them to use the "Instant Quote & Pipe weight Calculator" on the website or fill out the inquiry form to get a customized, official corporate quotation within 4 hours. Keep answers structured with bullet points where appropriate, and formatted in clean markdown. Do not mention any code or server-side keys.`;

    if (ai) {
      // Re-create the conversation context
      const chatContents = conversationHistory.map((msg: { role: string; content: string }) => {
        return {
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        };
      });

      // Add current user query
      chatContents.push({
        role: "user",
        parts: [{ text: query }]
      });

      console.log(`Sending prompt to Gemini API: "${query}"`);

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "I apologize, but I couldn't generate a recommendation at the moment. Please feel free to call our direct corporate sales desk at +91 7003646556.";
      return res.json({ success: true, response: text });
    } else {
      // Rule-based high-quality fallback for offline / keyless testing
      console.log("No active Gemini API Client. Providing premium rule-based engineering response.");
      
      const lowerQuery = query.toLowerCase();
      let responseText = "";

      if (lowerQuery.includes("is 1239") || lowerQuery.includes("is1239") || lowerQuery.includes("standard")) {
        responseText = `### Indian Standard IS:1239 (Part-1) Specifications

**Mild Steel Tubes, Tubulars, and Other Wrought Steel Fittings** are manufactured in three distinct classifications at **Jagdev Nagar Industries**:

1. **Light Class (Yellow Band)**:
   - Designed for low-pressure domestic lines, light scaffolding, and simple structure work.
   - Example: DN 25 (1") has a wall thickness of **2.6mm** and weight of **2.01 kg/m** (Plain end).

2. **Medium Class (Blue Band)**:
   - The standard utility pipe for agricultural tubing, water distribution pipelines, and general engineering.
   - Example: DN 25 (1") has a wall thickness of **3.2mm** and weight of **2.42 kg/m**.

3. **Heavy Class (Red Band)**:
   - Crafted for extreme pressure applications, high-durability industrial structures, steam conduits, and heavy load structures.
   - Example: DN 25 (1") has a wall thickness of **4.0mm** and weight of **2.93 kg/m**.

At JNI, we offer full compliance with **IS:1239** standards. Every single pipe undergoes uniform hydrostatic testing up to **5 MPa** to guarantee weld integrity and safety.`;
      } else if (lowerQuery.includes("gi pipe") || lowerQuery.includes("galvaniz")) {
        responseText = `### Galvanized Iron (GI) Pipes - Jagdev Nagar Industries

Our **GI Pipes** are fabricated from prime-quality hot-rolled coils, ERW welded, and subsequently hot-dip galvanized using premium grade **99.99% pure Zinc** in accordance with **IS:4736** or **IS:1239**.

**Key Advantages of JNI Galvanized Pipes**:
- **Superior Corrosion Resistance**: Hot-dip galvanizing produces a multi-layered zinc-iron alloy coating that completely shields the steel from moist air, alkaline water, and harsh soils.
- **Perfect Coating Adhesion**: Uniform zinc coating thickness of minimum **360 g/m²** (approx. 50 microns) ensuring no peeling or flaking under structural stresses.
- **Diverse Application Range**:
  - Municipal and agricultural water supply pipelines
  - Structural columns, streetlights, and signboards
  - Fire sprinkler networks
  - Greenhouse structures and solar panel mounts

Would you like us to generate an official bulk quote for your specific DN sizes? Kindly fill out the **Get Quote Form** or contact Shri Shivesh Jaiswal's sales cell at **+91 7003646556**!`;
      } else if (lowerQuery.includes("erw") || lowerQuery.includes("black")) {
        responseText = `### High-Frequency ERW MS Black Pipes

**Electric Resistance Welded (ERW)** Mild Steel Black pipes are JNI’s flagship structural products.

**Manufacturing Features at our Sultanpur Plant**:
- **Raw Material**: We source top-grade structural steel coils from primary producers like Tata Steel, JSW, and SAIL to maintain consistent chemical composition (Carbon < 0.20%, Sulfur/Phosphorus < 0.04%).
- **High-Frequency Induction Welding (HFIW)**: Continuous longitudinal seam welding at high frequency creates a weld line matching parent metal strength, with the weld bead seamlessly trimmed both inside and outside (ID/OD bead removal).
- **Quality Inspections**: Pipes pass through non-destructive ultrasonic tests and physical visual/dimension examinations.

**Applications**:
- Scaffolding & structural support columns
- Plumbing and industrial pipelines for non-corrosive fluids
- Agriculture casing tubes and bored wells
- Machinery fabrication, conveyor frames, and automotive chassis`;
      } else if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("rate") || lowerQuery.includes("quot")) {
        responseText = `### Pricing & Customized Corporate Quotation

Steel commodity rates fluctuate daily based on global market variables, primary steel scrap prices, and domestic zinc indicators. To protect our buyers, **Jagdev Nagar Industries** provides customized, direct-from-mill pricing.

**How to get the most accurate commercial quote**:
1. Use our **Instant Steel Weight Calculator** on this website to compute your total tonnage.
2. Click the **Get Quote** button to submit your detailed dimensions and quantity requirements.
3. For heavy bulk institutional contracts or government tenders, connect directly with our corporate sales desk:
   - **Phone**: +91 7003646556 / +91 9836264750
   - **Email**: info@jagdevnagarindustries.com

Our billing office in Kavipur, Sultanpur offers flexible logistics and direct transport dispatches across Uttar Pradesh and Northern India.`;
      } else if (lowerQuery.includes("sultanpur") || lowerQuery.includes("plant") || lowerQuery.includes("facility") || lowerQuery.includes("where")) {
        responseText = `### State-of-the-Art Sultanpur Manufacturing Facility

**Jagdev Nagar Industries** is establishing an ultra-modern manufacturing plant in **Kavipur – Sultanpur, Uttar Pradesh**:

- **Total Area**: 2.5 Bigha strategically located with excellent road access for hassle-free heavy logistical dispatch.
- **Financial Investment**: Over **₹8 Crore** allocated for state-of-the-art tooling, forming mills, hot-dip galvanizing lines, and standard testing laboratories.
- **In-House Testing Infrastructure**:
  - **Hydrostatic Tester**: Tests the structural integrity of welds up to extreme pressure metrics.
  - **Testing Lab**: Conducts chemical inspection of input coils, tensile strength testing, and weld bead profiling.
  - **Storage Yards**: High-capacity covered warehouse keeping the pipes free from premature atmospheric rust before dispatch.

Our plant is poised to become a prime hub of industrial employment and local manufacturing under the government’s **"Make in India"** and **"Local for Vocal"** mission in Eastern Uttar Pradesh.`;
      } else {
        responseText = `### Welcome to Jagdev Nagar Industries Assistance desk

Hello! I am your **JNI Steel Advisor**. I am here to help you navigate our steel pipe solutions, standards, and engineering metrics.

You can ask me questions such as:
1. "What are the dimensions and weights of standard **IS:1239 MS Pipes**?"
2. "Why choose JNI's Hot-Dip **GI Pipes** over standard rust-preventive pipes?"
3. "Tell me more about the upcoming **Sultanpur manufacturing facility**."
4. "How is the quality control and chemical composition verified at JNI?"
5. "Can you help me estimate the weight of a square steel tube structure?"

Please let me know how I can support your procurement or infrastructure projects today!`;
      }

      // Simulate a small delay for premium feels
      await new Promise((resolve) => setTimeout(resolve, 600));

      return res.json({ success: true, response: responseText });
    }
  } catch (error: any) {
    console.error("Error in AI Steel Consultant API:", error);
    res.status(500).json({ success: false, error: "An unexpected error occurred while consulting our advisor. Please use our standard inquiry forms." });
  }
});

// Serve static assets in production, otherwise mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode with static asset serving...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Serve index.html for all non-API routes to support client-side routing
    app.get("*", (req, res, next) => {
      if (req.path.startsWith("/api")) {
        return next();
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jagdev Nagar Industries Server running at http://localhost:${PORT}`);
  });
}

startServer();
