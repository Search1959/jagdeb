export interface PipeStandard {
  nominalSize: string; // DN (e.g. DN 15, DN 20, DN 25)
  inchSize: string; // Inches (e.g. 1/2", 3/4", 1")
  outerDiameterMax: number; // mm
  outerDiameterMin: number; // mm
  thickness: {
    light: number; // mm
    medium: number; // mm
    heavy: number; // mm
  };
  weight: {
    light: number; // kg/m
    medium: number; // kg/m
    heavy: number; // kg/m
  };
}

export interface HollowSectionStandard {
  size: string; // e.g. 25x25, 40x40, 100x100
  thickness: number; // mm
  weight: number; // kg/m
  area: number; // cm2
}

export interface Inquiry {
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
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
