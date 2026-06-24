import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Menu, X, Building2, Calculator, ShieldCheck, Download } from "lucide-react";

interface NavbarProps {
  onNavClick: (section: string) => void;
  activeSection: string;
  onOpenCalculator: () => void;
}

export default function Navbar({ onNavClick, activeSection, onOpenCalculator }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "calculator", label: "Calculator" },
    { id: "facility", label: "Manufacturing" },
    { id: "quality", label: "Quality" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavItemClick = (id: string) => {
    onNavClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar for Contact & Info */}
      <div className="bg-[#020617] text-slate-300 text-[11px] py-2 px-4 border-b border-slate-800/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              Sales Hotline: +91 7003646556
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              info@jagdevnagarindustries.com
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Sultanpur, UP, India
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-blue-950/40 border border-blue-500/30 text-blue-300 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
              MSME Registered
            </span>
            <span className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[9px]">
              Make in India
            </span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav
        className={`w-full py-4 px-4 md:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-[#020617]/95 backdrop-blur-md shadow-lg border-b border-slate-800/60 py-3"
            : "bg-[#020617]/80 backdrop-blur-md border-b border-slate-800/30"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand Panel */}
          <button
            onClick={() => handleNavItemClick("home")}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-slate-400 rounded-sm flex items-center justify-center font-bold text-xl italic border border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300 text-white">
              JN
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-white uppercase">
                JAGDEV NAGAR
              </span>
              <span className="text-[10px] tracking-[0.22em] text-blue-400 font-bold uppercase mt-0.5">
                INDUSTRIES
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link List */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`transition-all duration-200 relative py-1 hover:text-white ${
                  activeSection === item.id
                    ? "text-white"
                    : "text-slate-400"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-sm" />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Button Call */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="./jni_company_brochure.pdf"
              download="Jagdev_Nagar_Industries_Brochure.pdf"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#020617] hover:bg-slate-900 text-slate-200 rounded-sm transition-colors border border-slate-800 hover:border-slate-700 text-xs font-bold uppercase tracking-wider cursor-pointer"
              id="nav-brochure-btn"
            >
              <Download className="w-4 h-4 text-blue-400" />
              Brochure
            </a>
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-sm hover:bg-blue-500 transition-colors border border-blue-400/30 text-xs font-bold uppercase tracking-wider"
              id="nav-calc-btn"
            >
              <Calculator className="w-4 h-4" />
              Weight Calculator
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-slate-200 hover:text-white p-1"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[48px] md:top-[80px] bg-[#020617]/98 backdrop-blur-lg z-40 flex flex-col justify-between py-8 px-6 border-t border-slate-850 animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`text-left font-display text-lg font-bold py-2.5 border-b border-slate-900 transition-colors ${
                  activeSection === item.id ? "text-blue-400" : "text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <a
              href="./jni_company_brochure.pdf"
              download="Jagdev_Nagar_Industries_Brochure.pdf"
              className="w-full flex items-center justify-center gap-2 bg-[#020617] hover:bg-slate-900 text-slate-200 text-sm font-bold uppercase tracking-wider py-3.5 rounded-sm border border-slate-800 hover:border-slate-700 cursor-pointer text-center"
            >
              <Download className="w-4.5 h-4.5 text-blue-400" />
              Download Brochure (PDF)
            </a>
            <button
              onClick={() => {
                onOpenCalculator();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold uppercase tracking-wider py-3.5 rounded-sm border border-blue-400/30"
            >
              <Calculator className="w-4.5 h-4.5" />
              Instant Weight Calculator
            </button>
            <div className="flex flex-col gap-1.5 text-center text-slate-400 text-xs py-2 bg-slate-900/40 rounded border border-slate-800/30">
              <span className="font-semibold text-slate-300">Corporate Sales Support:</span>
              <span>+91 7003646556 / +91 9918044700</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
