import React from "react";
import { TrendingUp, Award, Shield, Cpu, ChevronRight } from "lucide-react";

interface HeroProps {
  onNavigateTo: (section: string) => void;
  onOpenCalculator: () => void;
}

export const STEEL_INDICES = [
  { label: "JNI HRC Coils (UP)", value: "₹48,250/Ton", change: "+0.8%", isUp: true },
  { label: "ERW Tubes IS:1239", value: "₹53,900/Ton", change: "+1.2%", isUp: true },
  { label: "GI Pipes (Hot-Dip)", value: "₹61,400/Ton", change: "-0.3%", isUp: false },
  { label: "Structural SHS/RHS", value: "₹55,100/Ton", change: "+0.5%", isUp: true },
  { label: "Steel Scrap Index", value: "₹34,800/Ton", change: "-1.1%", isUp: false },
];

export default function Hero({ onNavigateTo, onOpenCalculator }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#020617] pt-[80px] md:pt-0 overflow-hidden" id="home">
      {/* Background Graphic Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_steel_factory_1782258676780.jpg"
          alt="Jagdev Nagar Industries Steel Plant"
          className="w-full h-full object-cover object-center opacity-25 transform scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Ambient Dark/Blue Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020617] to-transparent" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col justify-center flex-grow">
        {/* Corporate Header Flag / Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full w-fit mb-6 text-xs font-bold uppercase tracking-wide text-blue-300">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></span>
          <span>MSME Registered & ISO Certified</span>
        </div>

        {/* Principal Heading & Taglines */}
        <div className="max-w-4xl">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.05] mb-6 uppercase">
            Building India's <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">Future with Quality</span> <br />
            Steel Pipes
          </h1>
          
          <p className="font-sans text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
            Premium ERW, Galvanized Iron (GI) & Structural Steel Pipes manufactured with high-frequency induction welding. Engineered for infrastructure, construction, plumbing, and industrial excellence.
          </p>
        </div>

        {/* CTA Button Block */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14 max-w-max">
          <button
            onClick={() => onNavigateTo("contact")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-sm hover:bg-blue-500 transition-colors border border-blue-400/30 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/20"
            id="hero-quote-btn"
          >
            Get Custom Quote
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenCalculator}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 hover:border-slate-700 font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-sm transition-all duration-300"
            id="hero-calc-btn"
          >
            Instant Weight Calculator
          </button>
        </div>

        {/* Industrial Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl border-t border-slate-800/60 pt-8">
          <div className="flex items-start gap-3">
            <div className="bg-blue-950/40 border border-blue-800/30 p-2.5 rounded text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-semibold text-white text-sm">ISO Quality Systems</span>
              <span className="font-sans text-xs text-slate-500 font-bold tracking-wider uppercase">Compliance Assured</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-950/40 border border-blue-800/30 p-2.5 rounded text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-semibold text-white text-sm">Advanced ERW Mill</span>
              <span className="font-sans text-xs text-slate-500 font-bold tracking-wider uppercase">High Frequency Welded</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-950/40 border border-blue-800/30 p-2.5 rounded text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-semibold text-white text-sm">MSME Registered</span>
              <span className="font-sans text-xs text-slate-500 font-bold tracking-wider uppercase">Government Approved</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-blue-950/40 border border-blue-800/30 p-2.5 rounded text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-display font-semibold text-white text-sm">100% Quality Tested</span>
              <span className="font-sans text-xs text-slate-500 font-bold tracking-wider uppercase">Hydro & Tensile Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Steel Ticker Tape */}
      <div className="bg-slate-950 border-t border-slate-800/60 py-3 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest border-r border-slate-900 pr-5 shrink-0 hidden md:flex">
            <TrendingUp className="w-4 h-4 animate-bounce text-blue-400" />
            <span>Market Indicators</span>
          </div>

          <div className="flex items-center gap-8 md:gap-12 overflow-x-auto scrollbar-none py-1 w-full pl-0 md:pl-5">
            {STEEL_INDICES.map((index, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0 text-xs font-mono">
                <span className="text-slate-500 font-sans font-medium">{index.label}:</span>
                <span className="text-white font-bold">{index.value}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    index.isUp
                      ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/30"
                      : "bg-rose-950/80 text-rose-400 border border-rose-800/30"
                  }`}
                >
                  {index.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
