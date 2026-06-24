import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import PipeCalculator from "./components/Calculator";
import Factory from "./components/Factory";
import Quality from "./components/Quality";
import InquiryForm from "./components/InquiryForm";
import AISteelAdvisor from "./components/AISteelAdvisor";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  
  // States for calculator pre-fill integration
  const [prefProduct, setPrefProduct] = useState("");
  const [prefDimensions, setPrefDimensions] = useState("");
  const [prefQuantity, setPrefQuantity] = useState("");

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll to account for sticky navbar height (approx. 80px)
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Pre-fill from products catalog selection
  const handleInquireFromProduct = (productName: string) => {
    setPrefProduct(productName);
    setPrefDimensions(`Standard specifications requested for: ${productName}`);
    setPrefQuantity("10 Tons");
    
    // Smooth scroll directly to contact panel
    handleScrollToSection("contact");
  };

  // Pre-fill from calculator estimation
  const handleAddInquiryFromCalculator = (details: {
    productType: string;
    dimensions: string;
    quantity: string;
  }) => {
    setPrefProduct(details.productType);
    setPrefDimensions(details.dimensions);
    setPrefQuantity(details.quantity);

    // Smooth scroll directly to contact panel
    handleScrollToSection("contact");
  };

  const clearPrefills = () => {
    setPrefProduct("");
    setPrefDimensions("");
    setPrefQuantity("");
  };

  // Monitor viewport scroll to highlight active navigation link automatically
  useEffect(() => {
    const sections = ["home", "about", "products", "calculator", "facility", "quality", "contact"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // adding offset of navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Top Navigation */}
      <Navbar
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
        onOpenCalculator={() => handleScrollToSection("calculator")}
      />

      {/* Main Single Page Layout Sections */}
      <main className="relative">
        {/* HERO BANNER SECTION */}
        <Hero
          onNavigateTo={handleScrollToSection}
          onOpenCalculator={() => handleScrollToSection("calculator")}
        />

        {/* CORPORATE ABOUT US PROFILE */}
        <About onNavigateTo={handleScrollToSection} />

        {/* PRODUCTS CATOLOG SHOWROOM */}
        <Products
          onInquireProduct={handleInquireFromProduct}
          onOpenCalculator={() => handleScrollToSection("calculator")}
        />

        {/* INTERACTIVE STEEL WEIGHT CONFIGURATOR */}
        <PipeCalculator onAddInquiry={handleAddInquiryFromCalculator} />

        {/* MANUFACTURING INFRASTRUCTURE TOUR */}
        <Factory />

        {/* QUALITY SYSTEMS & BIS CODES Compliance */}
        <Quality />

        {/* LEAD REGISTRATION & CONTACT RFP FORM */}
        <InquiryForm
          prefilledProduct={prefProduct}
          prefilledDimensions={prefDimensions}
          prefilledQuantity={prefQuantity}
          clearPrefills={clearPrefills}
        />
      </main>

      {/* DOCKED/FLOATING SMART AI CONSULTANT */}
      <AISteelAdvisor />

      {/* FOOTER & SOCIAL DESKS */}
      <Footer onNavClick={handleScrollToSection} />
      
    </div>
  );
}
