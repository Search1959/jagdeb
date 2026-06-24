import React from "react";
import { ShieldCheck, Award, Flame, Activity, CheckCircle2 } from "lucide-react";

export default function Quality() {
  const testSteps = [
    {
      title: "100% Hydrostatic Leak Testing",
      desc: "Every single agricultural or conduit pipe is pressurized to standard test parameters (up to 5.0 MPa) for 5 full seconds. Ensures absolute longitudinal seam and weld line security, eliminating leak risks.",
      icon: <Activity className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Dimensional & Ovality Auditing",
      desc: "Precise micrometer checks verify outer diameter (OD), wall thickness, circular tolerance, and end-facing angles. We maintain strict compliance within +/- 10% bounds as codified by IS codes.",
      icon: <Award className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Chemical Spectroscopy Analysis",
      desc: "Raw HR steel coils are chemical-tested to verify exact carbon levels (<0.20%), sulfur, and phosphorus concentrations. Ensures ideal structural welding properties and long-term durability.",
      icon: <Flame className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Mechanical Tensile & Flange Tests",
      desc: "Standard bend and crushing tests are conducted in our laboratory. Pipes are compressed and expanded to verify metallurgical elongation metrics and absolute structural weld resilience.",
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="quality">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Quality Assurance
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            Uncompromising Standards. Complete Verification.
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-xs text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
            At Jagdev Nagar Industries, quality is not a static milestone; it is our operational lifeline. We test rigorously to protect structural integrity, public utilities, and investor trust.
          </p>
        </div>

        {/* Quality Standards Certification Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left panel: QA Principles & Badges */}
          <div className="lg:col-span-4 bg-slate-900/30 border border-slate-800/60 p-8 rounded-sm shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
            
            <h3 className="font-display font-bold text-xl text-white mb-6 uppercase tracking-wide">
              Our Core Quality Directives
            </h3>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-slate-300">
                  <strong>BIS Standards Ready</strong>: Configured for full BIS certification alignment, guaranteeing immediate eligibility for public works.
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-slate-300">
                  <strong>Traceability System</strong>: Every production batch is traced back to the primary HR/CR steel coil ladle number.
                </p>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="font-sans text-xs text-slate-300">
                  <strong>Zero Blow-Hole Galvanizing</strong>: Advanced degreasing, fluxing, and pickling ensure spotless hot-dip zinc coatings.
                </p>
              </div>
            </div>

            {/* Indian Govt Alignment Badges Panel */}
            <div className="border-t border-slate-800/40 mt-8 pt-6 flex flex-wrap gap-3">
              <span className="bg-blue-950/60 border border-blue-800/30 text-blue-400 font-mono text-[9px] font-bold py-1 px-2.5 rounded-sm">
                ISI Certification Ready
              </span>
              <span className="bg-blue-950/60 border border-blue-800/30 text-blue-400 font-mono text-[9px] font-bold py-1 px-2.5 rounded-sm">
                ISO 9001 Systems
              </span>
            </div>
          </div>

          {/* Right panel: Continuous Quality Testing Steps Flow */}
          <div className="lg:col-span-8">
            <h3 className="font-display font-bold text-base text-slate-300 mb-6 uppercase tracking-wider">
              Our In-House Four-Stage Metallurgical Process
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/30 border border-slate-800/60 p-6 rounded-sm hover:border-slate-700/80 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-950/50 p-2 rounded-sm border border-blue-900/40 text-blue-400">
                      {step.icon}
                    </div>
                    <h4 className="font-display font-bold text-white text-base leading-snug uppercase tracking-wide">
                      {step.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
