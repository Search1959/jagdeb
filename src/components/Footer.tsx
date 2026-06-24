import React from "react";
import { MessageCircle, Phone, Mail, MapPin, Award, ChevronRight, ArrowUpRight, Download } from "lucide-react";

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-slate-300 pt-20 pb-8 border-t border-slate-800/60 relative z-30 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Primary Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <button
              onClick={() => onNavClick("home")}
              className="flex items-center gap-2.5 text-left group mb-5 cursor-pointer"
            >
              <div className="bg-gradient-to-br from-blue-600 to-slate-400 p-2 rounded-sm text-slate-950">
                <Award className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <span className="block font-display font-bold text-lg tracking-tight text-white leading-none">
                  JAGDEV NAGAR
                </span>
                <span className="block font-sans text-[10px] font-bold tracking-widest text-blue-400 mt-0.5">
                  INDUSTRIES
                </span>
              </div>
            </button>
            
            <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
              An upcoming premier manufacturer of ERW, GI, and Structural steel hollow sections based in Kavipur – Sultanpur, Uttar Pradesh. Dedicated to absolute quality and nation-building pipelines.
            </p>

            <div className="flex flex-col gap-1.5">
              <span className="bg-blue-950/40 border border-blue-900/30 text-blue-400 px-3 py-1 rounded-sm text-[10px] font-semibold font-mono tracking-wide max-w-max">
                Udyam Registration: MSME Compliant
              </span>
              <span className="bg-emerald-950/40 border border-emerald-900/30 text-emerald-400 px-3 py-1 rounded-sm text-[10px] font-semibold font-mono tracking-wide max-w-max">
                100% Proudly Made in India
              </span>
            </div>

            <div className="mt-6">
              <a
                href="/jni_company_brochure.pdf"
                download="Jagdev_Nagar_Industries_Brochure.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-sm border border-slate-800 hover:border-slate-700 cursor-pointer transition-all duration-300 w-full sm:w-auto justify-center"
                id="footer-brochure-btn"
              >
                <Download className="w-4 h-4 text-blue-400" />
                Company Brochure (PDF)
              </a>
            </div>
          </div>

          {/* Quick Navigations */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
              Quick Navigations
            </h4>
            <ul className="flex flex-col gap-3 text-xs">
              {[
                { id: "home", label: "Home Base" },
                { id: "about", label: "Corporate Profile" },
                { id: "products", label: "Our Steel Products" },
                { id: "calculator", label: "Weight Calculator" },
                { id: "facility", label: "Sultanpur Facility" },
                { id: "quality", label: "Quality Inspections" },
                { id: "contact", label: "RFP & Contact Us" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-blue-400 flex items-center gap-1.5 text-slate-400 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Standards Compliance Info */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
              Standards Compliance
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs text-slate-400">
              <li>
                <span className="font-mono text-white block">IS 1239 (Part-1)</span>
                <span className="block text-[11px]">Specification for Mild Steel & Galvanized GI Tubes</span>
              </li>
              <li>
                <span className="font-mono text-white block">IS 4923 / IS 1161</span>
                <span className="block text-[11px]">Carbon Steel Hollow Sections (SHS & RHS)</span>
              </li>
              <li>
                <span className="font-mono text-white block">IS 3589</span>
                <span className="block text-[11px]">Steel Pipes for Water, Gas and Sewage conduits</span>
              </li>
            </ul>
          </div>

          {/* Contact coordinates summary */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-6">
              Corporate Registry
            </h4>
            <div className="flex flex-col gap-4 text-xs text-slate-400">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Jagdev Nagar Patar Khas, Bhelara, Kavipur, Sultanpur, UP, India - 228151
                </span>
              </div>
              <div className="flex gap-2.5 items-start font-mono">
                <Phone className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5 font-semibold text-white">
                  <span>+91 7003646556</span>
                  <span>+91 9836264750</span>
                  <span>+91 9918044700</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Mail className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="hover:text-blue-400 text-white font-medium">
                  info@jagdevnagarindustries.com
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-800/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} <strong>Jagdev Nagar Industries (JNI)</strong>. All Rights Reserved.
            <span className="block md:inline md:ml-2 text-slate-600">Owner: Shri Shivesh Jaiswal</span>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="hover:text-blue-400 transition-colors">Sultanpur Project, Uttar Pradesh</span>
            <span className="text-slate-800">|</span>
            <span className="hover:text-blue-400 transition-colors">Strength in Steel. Trust in Quality.</span>
          </div>
        </div>

      </div>

      {/* WhatsApp Floating Contact Bubble (Direct Action) */}
      <a
        href="https://wa.me/917003646556?text=Hello%20Jagdev%20Nagar%20Industries%21%20I%20visited%20your%20website%20and%20would%20like%20to%20request%20a%20commercial%20quote%20for%20steel%20pipes."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-sm shadow-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 group border border-emerald-400/40 cursor-pointer"
        title="Direct WhatsApp Corporate Assistance"
        id="whatsapp-floating-btn"
      >
        <MessageCircle className="w-5.5 h-5.5" />
        <span className="font-sans font-bold text-xs uppercase tracking-wider pr-1 max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 whitespace-nowrap">
          WhatsApp JNI
        </span>
      </a>
    </footer>
  );
}
