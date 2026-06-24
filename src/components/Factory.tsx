import React from "react";
import { Landmark, TrendingUp, Layers, Cpu, Award } from "lucide-react";

export default function Factory() {
  const stats = [
    { label: "Planned Investment", value: "₹8+ Crore", description: "Allotted for advanced cold-rolling forming mills & hot-dip galvanizing lines" },
    { label: "Manufacturing Area", value: "2.5 Bigha", description: "Spacious industrial layout strategically developed for optimized logistics" },
    { label: "Hydrostatic Rating", value: "100% Tested", description: "In-house pressure testing of every welded steel conduit tube" },
    { label: "Daily Output Potential", value: "High Tonnage", description: "Configured for rapid infrastructure and government supply contracts" }
  ];

  const highlights = [
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      title: "State-of-the-Art Forming Mill",
      desc: "Continuous high-frequency induction welded tube production with automatic internal & external weld seam trimmers."
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      title: "Hot-Dip Galvanizing Bath",
      desc: "Highly controlled automated thermal zinc baths ensuring perfect metallurgical alloy bonding exceeding 360 g/m²."
    },
    {
      icon: <Award className="w-5 h-5 text-blue-400" />,
      title: "Comprehensive Testing Lab",
      desc: "Equipped for chemical verification, tensile inspections, bend examinations, and ultra-high hydraulic pressure rating checks."
    }
  ];

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="facility">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Manufacturing Facility
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            The Sultanpur Manufacturing Facility
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-xs text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
            Our state-of-the-art facility in Kavipur – Sultanpur, UP is being developed in line with global steel processing architectures to feed Northern India's high-demand projects.
          </p>
        </div>

        {/* Plant Overview layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Panel: Highlights List */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-6 uppercase tracking-wide">
              Industrial Precision and Continuous High-Speed Production
            </h3>
            
            <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              To achieve premium quality, our plant is outfitted with top-tier CNC pipe forming machinery and multi-stage pickling and galvanization cells. Under our strict policy, we only utilize premium hot-rolled and cold-rolled steel sheets sourced directly from global leaders like Tata Steel, JSW, and SAIL.
            </p>

            <div className="flex flex-col gap-6">
              {highlights.map((hl, index) => (
                <div key={index} className="flex gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-sm p-3 h-12 w-12 flex items-center justify-center shrink-0">
                    {hl.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-base mb-1 uppercase tracking-wide">
                      {hl.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      {hl.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Rendered Plant Image & Badging */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative p-1 bg-gradient-to-tr from-blue-950/40 to-slate-800 rounded-sm shadow-2xl overflow-hidden group">
              <img
                src="/src/assets/images/factory_sultanpur_1782258729947.jpg"
                alt="Sultanpur steel pipe manufacturing plant layout render"
                className="w-full h-[320px] md:h-[420px] object-cover rounded-sm opacity-85 group-hover:scale-101 transition-transform duration-550"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4 bg-[#020617]/80 border border-slate-800/40 text-blue-400 font-mono text-[10px] font-bold px-3 py-1.5 rounded-sm backdrop-blur-sm shadow uppercase">
                ESTD. 2026 PROJECT
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-900/40 border border-slate-800/60 p-8 rounded-sm">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col text-center lg:text-left">
              <span className="font-display font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400 mb-1 font-mono">
                {stat.value}
              </span>
              <span className="font-sans font-bold text-white text-xs mb-1.5 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="font-sans text-xs text-slate-400 leading-normal">
                {stat.description}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
