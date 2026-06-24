import React, { useState, useEffect } from "react";
import { IS1239_STANDARDS, SHS_STANDARDS, RHS_STANDARDS } from "../data";
import { Calculator, HelpCircle, FileText, Check, ChevronDown, RefreshCw } from "lucide-react";

interface CalculatorProps {
  onAddInquiry: (details: { productType: string; dimensions: string; quantity: string }) => void;
}

export default function PipeCalculator({ onAddInquiry }: CalculatorProps) {
  // Types: 'round' (IS1239 ERW/GI), 'square' (SHS), 'rectangular' (RHS)
  const [calcType, setCalcType] = useState<"round" | "square" | "rectangular">("round");
  
  // States for Round Pipe (IS 1239)
  const [selectedNB, setSelectedNB] = useState(IS1239_STANDARDS[2].nominalSize); // default DN 25 (1")
  const [selectedGrade, setSelectedGrade] = useState<"light" | "medium" | "heavy">("medium");
  const [isCustomRound, setIsCustomRound] = useState(false);
  const [customOD, setCustomOD] = useState("33.5"); // mm
  const [customThickness, setCustomThickness] = useState("3.2"); // mm

  // States for SHS/RHS
  const [selectedSHSSize, setSelectedSHSSize] = useState(SHS_STANDARDS[3].size); // 50x50
  const [selectedRHSSize, setSelectedRHSSize] = useState(RHS_STANDARDS[2].size); // 60x40
  const [isCustomHollow, setIsCustomHollow] = useState(false);
  const [customH, setCustomH] = useState("50");
  const [customW, setCustomW] = useState("50");
  const [customHollowThickness, setCustomHollowThickness] = useState("3.2");

  // Common States
  const [lengthPerPiece, setLengthPerPiece] = useState("6"); // meters (standard Indian length)
  const [quantity, setQuantity] = useState("100"); // pieces

  // Calculations Output State
  const [weightPerMeter, setWeightPerMeter] = useState(0); // kg/m
  const [weightPerPiece, setWeightPerPiece] = useState(0); // kg
  const [totalWeight, setTotalWeight] = useState(0); // kg
  const [totalTons, setTotalTons] = useState(0); // Tons
  const [surfaceArea, setSurfaceArea] = useState(0); // sq.m (total painting area)

  // Recalculate whenever inputs change
  useEffect(() => {
    let kgPerMeter = 0;
    let surfaceAreaPerMeter = 0; // sq m per meter

    if (calcType === "round") {
      if (!isCustomRound) {
        // Standard IS 1239 lookup
        const spec = IS1239_STANDARDS.find((s) => s.nominalSize === selectedNB);
        if (spec) {
          kgPerMeter = spec.weight[selectedGrade];
          // Surface Area = pi * OD
          const odMeters = spec.outerDiameterMax / 1000;
          surfaceAreaPerMeter = Math.PI * odMeters;
        }
      } else {
        // Custom Round Pipe weight calculation:
        // Formula: Weight (kg/m) = (OD - t) * t * 0.0246615
        const od = parseFloat(customOD) || 0;
        const t = parseFloat(customThickness) || 0;
        if (od > 0 && t > 0) {
          kgPerMeter = (od - t) * t * 0.0246615;
          surfaceAreaPerMeter = Math.PI * (od / 1000);
        }
      }
    } else if (calcType === "square") {
      if (!isCustomHollow) {
        const spec = SHS_STANDARDS.find((s) => s.size === selectedSHSSize);
        if (spec) {
          kgPerMeter = spec.weight;
          // Perimeter = 4 * side. Surface Area = Perimeter * length
          const side = parseFloat(spec.size.split("x")[0]) || 0;
          surfaceAreaPerMeter = (side * 4) / 1000;
        }
      } else {
        // Custom square tube: Weight = (Side - t) * t * 0.0314
        const s = parseFloat(customW) || 0;
        const t = parseFloat(customHollowThickness) || 0;
        if (s > 0 && t > 0) {
          kgPerMeter = (s - t) * t * 0.0314;
          surfaceAreaPerMeter = (s * 4) / 1000;
        }
      }
    } else if (calcType === "rectangular") {
      if (!isCustomHollow) {
        const spec = RHS_STANDARDS.find((s) => s.size === selectedRHSSize);
        if (spec) {
          kgPerMeter = spec.weight;
          const dimensions = spec.size.split("x");
          const h = parseFloat(dimensions[0]) || 0;
          const w = parseFloat(dimensions[1]) || 0;
          surfaceAreaPerMeter = ((h + w) * 2) / 1000;
        }
      } else {
        // Custom rectangular tube: Weight = ((H + W) - 2 * t) * t * 0.0157
        const h = parseFloat(customH) || 0;
        const w = parseFloat(customW) || 0;
        const t = parseFloat(customHollowThickness) || 0;
        if (h > 0 && w > 0 && t > 0) {
          kgPerMeter = ((h + w) - 2 * t) * t * 0.0157;
          surfaceAreaPerMeter = ((h + w) * 2) / 1000;
        }
      }
    }

    const len = parseFloat(lengthPerPiece) || 0;
    const qty = parseFloat(quantity) || 0;

    const singleWeight = kgPerMeter * len;
    const orderWeight = singleWeight * qty;
    const orderTons = orderWeight / 1000;
    const totalSurfaceArea = surfaceAreaPerMeter * len * qty;

    setWeightPerMeter(kgPerMeter);
    setWeightPerPiece(singleWeight);
    setTotalWeight(orderWeight);
    setTotalTons(orderTons);
    setSurfaceArea(totalSurfaceArea);
  }, [
    calcType,
    selectedNB,
    selectedGrade,
    isCustomRound,
    customOD,
    customThickness,
    selectedSHSSize,
    selectedRHSSize,
    isCustomHollow,
    customH,
    customW,
    customHollowThickness,
    lengthPerPiece,
    quantity
  ]);

  const handleInquiryIntegration = () => {
    let productType = "";
    let dimensions = "";

    if (calcType === "round") {
      productType = "ERW / GI Steel Pipes";
      dimensions = isCustomRound
        ? `Custom Round Pipe: OD ${customOD}mm, Thickness ${customThickness}mm`
        : `IS:1239 Round Pipe: ${selectedNB} NB (Nominal Bore) - ${selectedGrade.toUpperCase()} Class`;
    } else if (calcType === "square") {
      productType = "Square Hollow Sections (SHS)";
      dimensions = isCustomHollow
        ? `Custom Square Tube: ${customW}x${customW}mm, Thickness ${customHollowThickness}mm`
        : `IS:4923 SHS: Size ${selectedSHSSize}mm`;
    } else {
      productType = "Rectangular Hollow Sections (RHS)";
      dimensions = isCustomHollow
        ? `Custom Rectangular Tube: ${customH}x${customW}mm, Thickness ${customHollowThickness}mm`
        : `IS:4923 RHS: Size ${selectedRHSSize}mm`;
    }

    dimensions += ` - Length: ${lengthPerPiece}m per piece`;

    onAddInquiry({
      productType,
      dimensions,
      quantity: `${quantity} pieces (Est. ${totalTons.toFixed(3)} Tons)`
    });
  };

  const currentNBData = IS1239_STANDARDS.find((s) => s.nominalSize === selectedNB);

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="calculator">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Engineering Tools
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            Instant Steel Weight & Specifications Configurator
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-xs text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
            Perfect for site engineers, civil contractors, and procurement managers to instantly estimate structural loads, paint surface metrics, and bulk order tonnage complying with IS codes.
          </p>
        </div>

        {/* Calculator Interactive Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Parameter Configuration form (Col Span 7) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800/60 p-6 md:p-8 rounded-sm backdrop-blur-sm shadow-lg flex flex-col justify-between">
            <div>
              {/* Selector Tabs: Shape Selection */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button
                  onClick={() => { setCalcType("round"); setIsCustomRound(false); }}
                  className={`py-3 px-2 rounded-sm text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ${
                    calcType === "round"
                      ? "bg-blue-600/10 text-blue-400 border-blue-400/40"
                      : "bg-[#020617]/40 text-slate-400 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  Round Pipe
                </button>
                <button
                  onClick={() => { setCalcType("square"); setIsCustomHollow(false); }}
                  className={`py-3 px-2 rounded-sm text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ${
                    calcType === "square"
                      ? "bg-blue-600/10 text-blue-400 border-blue-400/40"
                      : "bg-[#020617]/40 text-slate-400 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  Square SHS
                </button>
                <button
                  onClick={() => { setCalcType("rectangular"); setIsCustomHollow(false); }}
                  className={`py-3 px-2 rounded-sm text-xs font-bold uppercase tracking-wider text-center border transition-all duration-300 ${
                    calcType === "rectangular"
                      ? "bg-blue-600/10 text-blue-400 border-blue-400/40"
                      : "bg-[#020617]/40 text-slate-400 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  Rectangular RHS
                </button>
              </div>

              {/* SECTION: ROUND PIPE CONFIGURATOR */}
              {calcType === "round" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-800/40 pb-3 mb-2">
                    <span className="font-display font-semibold text-white text-sm">Round Pipe Standards</span>
                    <button
                      onClick={() => setIsCustomRound(!isCustomRound)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {isCustomRound ? "Use IS:1239 Standards" : "Configure Custom Dimensions"}
                    </button>
                  </div>

                  {!isCustomRound ? (
                    /* Standard IS 1239 Inputs */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Nominal Bore (NB Size)
                        </label>
                        <div className="relative">
                          <select
                            value={selectedNB}
                            onChange={(e) => setSelectedNB(e.target.value)}
                            className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 appearance-none font-mono"
                          >
                            {IS1239_STANDARDS.map((s) => (
                              <option key={s.nominalSize} value={s.nominalSize}>
                                {s.nominalSize} ({s.inchSize}) - NB
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Thickness Class / Grade
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["light", "medium", "heavy"] as const).map((grade) => (
                            <button
                              key={grade}
                              onClick={() => setSelectedGrade(grade)}
                              className={`py-3 px-1 rounded-sm text-xs font-semibold text-center border transition-all duration-300 uppercase tracking-wider ${
                                selectedGrade === grade
                                  ? "bg-blue-600 text-white border-blue-400"
                                  : "bg-[#020617] text-slate-300 border-slate-800 hover:border-slate-700"
                              }`}
                            >
                              {grade}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Custom Round Pipe Inputs */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Outer Diameter (OD - mm)
                        </label>
                        <input
                          type="number"
                          value={customOD}
                          onChange={(e) => setCustomOD(e.target.value)}
                          placeholder="e.g. 60.3"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Wall Thickness (mm)
                        </label>
                        <input
                          type="number"
                          value={customThickness}
                          onChange={(e) => setCustomThickness(e.target.value)}
                          placeholder="e.g. 3.6"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: SQUARE SHS CONFIGURATOR */}
              {calcType === "square" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-800/40 pb-3 mb-2">
                    <span className="font-display font-semibold text-white text-sm">Square Section Standards</span>
                    <button
                      onClick={() => setIsCustomHollow(!isCustomHollow)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {isCustomHollow ? "Use IS:4923 Standards" : "Configure Custom Dimensions"}
                    </button>
                  </div>

                  {!isCustomHollow ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Standard Size (mm x mm)
                      </label>
                      <div className="relative">
                        <select
                          value={selectedSHSSize}
                          onChange={(e) => setSelectedSHSSize(e.target.value)}
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 appearance-none font-mono"
                        >
                          {SHS_STANDARDS.map((s) => (
                            <option key={s.size} value={s.size}>
                              {s.size} mm (Thickness: {s.thickness}mm)
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Side Size (Width/Height - mm)
                        </label>
                        <input
                          type="number"
                          value={customW}
                          onChange={(e) => setCustomW(e.target.value)}
                          placeholder="e.g. 50"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Wall Thickness (mm)
                        </label>
                        <input
                          type="number"
                          value={customHollowThickness}
                          onChange={(e) => setCustomHollowThickness(e.target.value)}
                          placeholder="e.g. 3.2"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: RECTANGULAR RHS CONFIGURATOR */}
              {calcType === "rectangular" && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-800/40 pb-3 mb-2">
                    <span className="font-display font-semibold text-white text-sm">Rectangular Section Standards</span>
                    <button
                      onClick={() => setIsCustomHollow(!isCustomHollow)}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {isCustomHollow ? "Use IS:4923 Standards" : "Configure Custom Dimensions"}
                    </button>
                  </div>

                  {!isCustomHollow ? (
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Standard Size (Height x Width - mm)
                      </label>
                      <div className="relative">
                        <select
                          value={selectedRHSSize}
                          onChange={(e) => setSelectedRHSSize(e.target.value)}
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 appearance-none font-mono"
                        >
                          {RHS_STANDARDS.map((s) => (
                            <option key={s.size} value={s.size}>
                              {s.size} mm (Thickness: {s.thickness}mm)
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Height (mm)
                        </label>
                        <input
                          type="number"
                          value={customH}
                          onChange={(e) => setCustomH(e.target.value)}
                          placeholder="e.g. 80"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Width (mm)
                        </label>
                        <input
                          type="number"
                          value={customW}
                          onChange={(e) => setCustomW(e.target.value)}
                          placeholder="e.g. 40"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Thickness (mm)
                        </label>
                        <input
                          type="number"
                          value={customHollowThickness}
                          onChange={(e) => setCustomHollowThickness(e.target.value)}
                          placeholder="e.g. 3.2"
                          className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* COMMON PARAMETERS: LENGTH & QUANTITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 border-t border-slate-800/40 pt-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    Length per Piece (meters)
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" title="Standard commercial steel pipes are manufactured in 6-meter lengths (approx. 20 feet)" />
                  </label>
                  <input
                    type="number"
                    value={lengthPerPiece}
                    onChange={(e) => setLengthPerPiece(e.target.value)}
                    placeholder="Standard is 6m"
                    className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono font-semibold"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block font-medium">Standard commercial length is 6.0 meters.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Total Order Quantity (Pieces)
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full bg-[#020617] border border-slate-800 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 font-mono font-semibold"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block font-medium">Specify number of pipe tubes needed.</span>
                </div>
              </div>
            </div>

            {/* Action buttons inside form */}
            <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleInquiryIntegration}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold uppercase text-xs tracking-wider py-4 px-6 rounded-sm shadow-md transition-all duration-300 hover:bg-blue-500 border border-blue-400/30"
                id="calc-add-rfp-btn"
              >
                <Check className="w-4 h-4" />
                Add to Inquiry Cart
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 bg-[#020617] hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-700 font-bold uppercase text-xs tracking-wider py-4 px-6 rounded-sm transition-all duration-300"
                id="calc-print-btn"
              >
                <FileText className="w-4 h-4" />
                Print Datasheet
              </button>
            </div>
          </div>

          {/* Right Column: Calculations Outputs & Visual Schematics (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Tube Cross-section Schematic Panel */}
            <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-sm flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden shadow-md">
              <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-500 uppercase font-semibold">
                Dynamic Profile Preview
              </div>

              {/* DYNAMIC SHAPE SCHEMATIC */}
              <div className="w-40 h-40 flex items-center justify-center mt-4">
                {calcType === "round" && (
                  <div
                    className="rounded-full bg-[#020617] flex items-center justify-center relative shadow-inner"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderWidth: `${Math.max(4, (weightPerMeter * 1.5))}px`,
                      borderColor: selectedGrade === "heavy" ? "#2563eb" : selectedGrade === "medium" ? "#3b82f6" : "#64748b"
                    }}
                  >
                    <div className="text-center font-mono">
                      <span className="block text-[10px] text-slate-500">PLAIN END</span>
                      <span className="block text-xs font-bold text-slate-300">
                        {isCustomRound ? `${customOD}mm` : currentNBData?.nominalSize}
                      </span>
                    </div>
                  </div>
                )}

                {calcType === "square" && (
                  <div
                    className="bg-[#020617] flex items-center justify-center relative shadow-inner rounded-sm"
                    style={{
                      width: "110px",
                      height: "110px",
                      borderWidth: "8px",
                      borderColor: "#475569"
                    }}
                  >
                    <div className="text-center font-mono">
                      <span className="block text-[9px] text-slate-500">SHS TUBE</span>
                      <span className="block text-xs font-bold text-slate-300">
                        {isCustomHollow ? `${customW}x${customW}` : selectedSHSSize}
                      </span>
                    </div>
                  </div>
                )}

                {calcType === "rectangular" && (
                  <div
                    className="bg-[#020617] flex items-center justify-center relative shadow-inner rounded-sm"
                    style={{
                      width: "140px",
                      height: "80px",
                      borderWidth: "8px",
                      borderColor: "#334155"
                    }}
                  >
                    <div className="text-center font-mono">
                      <span className="block text-[9px] text-slate-500">RHS TUBE</span>
                      <span className="block text-xs font-bold text-slate-300">
                        {isCustomHollow ? `${customH}x${customW}` : selectedRHSSize}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mini Technical stats overlay */}
              <div className="w-full mt-6 grid grid-cols-2 gap-4 text-center border-t border-slate-800/40 pt-4">
                <div>
                  <span className="block text-[10px] text-slate-500 font-mono uppercase">Unit Weight</span>
                  <span className="font-mono text-sm font-bold text-blue-400">
                    {weightPerMeter.toFixed(2)} kg/m
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-mono uppercase">Single Tube</span>
                  <span className="font-mono text-sm font-bold text-white">
                    {weightPerPiece.toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Core Calculations Readouts */}
            <div className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-sm shadow-lg flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-800/40 pb-2">
                  Material Estimate Summary
                </h4>

                <div className="flex flex-col gap-4">
                  {/* Total Tonnage metric (BIG) */}
                  <div className="bg-[#020617]/50 p-4 rounded-sm border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block mb-1">
                      Estimated Order Tonnage
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
                        {totalTons.toFixed(3)}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">Metric Tons (MT)</span>
                    </div>
                  </div>

                  {/* Calculations Details List */}
                  <div className="flex flex-col gap-2.5 text-xs font-mono text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-500">Total Order Weight:</span>
                      <span className="text-white font-bold">{totalWeight.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-500">Surface Area (for Coating):</span>
                      <span className="text-blue-400 font-bold">{surfaceArea.toFixed(1)} m²</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/40">
                      <span className="text-slate-500">Total Structural Length:</span>
                      <span className="text-white font-bold">{(parseFloat(lengthPerPiece) * parseFloat(quantity) || 0).toLocaleString()} meters</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Compliance Standard:</span>
                      <span className="text-emerald-400 font-semibold uppercase">
                        {calcType === "round" ? "IS:1239 compliant" : "IS:4923 compliant"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industrial Footnote */}
              <div className="mt-6 text-[10px] text-slate-500 leading-relaxed border-t border-slate-800/40 pt-4">
                * Note: Weight calculations are based on standard steel density of <strong>7.85 g/cm³</strong> as mandated by Indian Standards. Permissible dimensional tolerances are +/- 10% for light and +/- 8.5% for medium/heavy classes as per BIS codes.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
