import React from "react";
import { Award, Target, Landmark, ArrowUpRight, ShieldCheck, Users } from "lucide-react";

interface AboutProps {
  onNavigateTo: (section: string) => void;
}

export default function About({ onNavigateTo }: AboutProps) {
  const objectives = [
    {
      icon: <Landmark className="w-5 h-5 text-blue-400" />,
      title: "Government Project Partner",
      desc: "Ready to fulfill municipal water supply schemes, irrigation lines, and state-backed infrastructure contracts."
    },
    {
      icon: <Target className="w-5 h-5 text-blue-400" />,
      title: "Industrial & Agricultural Supply",
      desc: "Supplying top-grade agricultural tubing for bores and robust structural sections for warehouse structures."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      title: "Rigid Quality Framework",
      desc: "Strict adherence to Bureau of Indian Standards (BIS) parameters ensuring high burst strength and durability."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      title: "Investor-Friendly Leadership",
      desc: "Led by Shri Shivesh Jaiswal, focusing on regional employment, local development, and scalable partnerships."
    }
  ];

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="about">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Corporate Profile
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            Pioneering Industrial Steel in Eastern Uttar Pradesh
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grid: Corporate Overview & Mission/Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Descriptive Profile */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-display font-bold text-2xl text-blue-400 mb-4 uppercase tracking-wide">
              Strength in Steel. Trust in Quality.
            </h3>
            
            <p className="font-sans text-slate-300 text-base leading-relaxed mb-6">
              <strong>Jagdev Nagar Industries (JNI)</strong> is an upcoming, highly progressive steel pipe manufacturing enterprise establishing its state-of-the-art facility in <strong>Kavipur – Sultanpur, Uttar Pradesh</strong>. Under the vision of our owner, <strong>Shri Shivesh Jaiswal</strong>, we are committed to engineering next-generation welded tubes that empower regional and national developments.
            </p>
            
            <p className="font-sans text-slate-400 text-base leading-relaxed mb-8">
              Recognizing the vital need for high-end piping solutions across municipal drinking water schemes (Jal Jeevan Mission), industrial conduits, and structural PEB installations, JNI is investing in highly advanced continuous cold-forming tube mills, integrated hot-dip zinc galvanization baths, and comprehensive testing laboratories.
            </p>

            {/* Strategic Pillars (Vision & Mission Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-sm">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Award className="w-5 h-5 text-blue-400" />
                  <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Our Vision</h4>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  To be acknowledged as the most reliable, quality-certified manufacturer of ERW and GI pipes in Northern India, recognized for engineering innovation, customer trust, and robust contribution to state infrastructure.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-sm">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wide">Our Mission</h4>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  To manufacture premium-grade steel products adhering to stringent BIS standards, utilizing advanced machinery, maintaining ethical governance under Shri Shivesh Jaiswal, and creating high-quality local employment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Focus and Visual Accents */}
          <div className="lg:col-span-5">
            <div className="relative p-1 bg-gradient-to-br from-slate-800 to-blue-950/60 rounded-sm shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-[#020617]/50 z-10" />
              <img
                src="/src/assets/images/factory_sultanpur_1782258729947.jpg"
                alt="Upcoming JNI Plant in Sultanpur"
                className="w-full h-[320px] md:h-[400px] object-cover rounded-sm opacity-85 group-hover:scale-101 transition-transform duration-550"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#020617]/95 border border-slate-800/60 p-5 rounded-sm backdrop-blur-md">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase block mb-1">
                  MANUFACTURING BASE
                </span>
                <span className="font-display font-bold text-lg text-white block mb-2">
                  Kavipur, Sultanpur Project
                </span>
                <p className="font-sans text-xs text-slate-300 mb-3 leading-relaxed">
                  2.5 Bigha plant strategically situated in Uttar Pradesh to handle massive logistical storage and high-volume daily rollouts.
                </p>
                <button
                  onClick={() => onNavigateTo("facility")}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors"
                >
                  Explore Plant Capabilities
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Serve & Corporate Objectives Grid */}
        <div className="border-t border-slate-800/60 pt-16">
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase">
              Our Core Operational Objectives
            </h3>
            <p className="font-sans text-xs text-slate-450 mt-1.5 max-w-xl mx-auto">
              How JNI serves infrastructure contractors, government projects, and rural agricultural distribution setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, index) => (
              <div
                key={index}
                className="bg-[#020617] border border-slate-800/60 hover:border-blue-500/35 p-6 rounded-sm hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-950/40 w-10 h-10 rounded-sm flex items-center justify-center mb-4 border border-blue-900/30">
                  {obj.icon}
                </div>
                <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2">
                  {obj.title}
                </h4>
                <p className="font-sans text-xs text-slate-450 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
