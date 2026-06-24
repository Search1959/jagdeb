import React, { useState } from "react";
import { PRODUCTS_INFO } from "../data";
import { ArrowRight, CheckCircle2, ShieldCheck, Layers, FileText } from "lucide-react";

interface ProductsProps {
  onInquireProduct: (productName: string) => void;
  onOpenCalculator: () => void;
}

export default function Products({ onInquireProduct, onOpenCalculator }: ProductsProps) {
  const [selectedProductTab, setSelectedProductTab] = useState(PRODUCTS_INFO[0].id);

  const activeProduct = PRODUCTS_INFO.find((p) => p.id === selectedProductTab) || PRODUCTS_INFO[0];

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="products">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Our Product Range
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            Engineered Steel Products of Extreme Integrity
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-xs text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
            Our production suite is engineered from premium HR steel coils and hot-dip galvanized using purest raw zinc. Designed strictly in alignment with Bureau of Indian Standards (BIS) codifications.
          </p>
        </div>

        {/* Product Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {PRODUCTS_INFO.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProductTab(product.id)}
              className={`font-sans text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-3.5 rounded-sm border transition-all duration-300 ${
                selectedProductTab === product.id
                  ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/10"
                  : "bg-slate-900/50 text-slate-400 border-slate-800/80 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>

        {/* Product Details Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-900/30 border border-slate-800/60 p-6 md:p-10 rounded-sm backdrop-blur-sm shadow-xl">
          
          {/* Left Panel: Image and Quick Badges */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-sm overflow-hidden shadow-lg border border-slate-800/40 relative group mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent z-10" />
              <img
                src={activeProduct.imageUrl}
                alt={activeProduct.name}
                className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-101 transition-transform duration-550"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 block uppercase">
                  Featured Product
                </span>
                <span className="font-display font-bold text-lg text-white block uppercase">
                  {activeProduct.fullName}
                </span>
              </div>
            </div>

            {/* Compliance Parameters Summary */}
            <div className="bg-[#020617]/60 border border-slate-800/60 p-5 rounded-sm">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-4 h-4" />
                <span>BIS Standard Conformance</span>
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Specifications:</span>
                  <span className="font-mono font-semibold text-white">{activeProduct.specifications}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Availability:</span>
                  <span className="font-mono text-white text-right">{activeProduct.sizes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Descriptions, Highlights, Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase">
                {activeProduct.tagline}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white mt-1 mb-4 uppercase">
                {activeProduct.fullName}
              </h3>
              
              <p className="font-sans text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                {activeProduct.description}
              </p>

              {/* Grid: Core Applications & Strategic Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Applications Column */}
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    Key Applications
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {activeProduct.applications.map((app, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features Column */}
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    Technical Strengths
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {activeProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Interaction Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-800/60">
              <button
                onClick={() => onInquireProduct(activeProduct.name)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-sm hover:bg-blue-500 transition-colors border border-blue-400/30 text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-900/20"
                id={`prod-inquire-btn-${activeProduct.id}`}
              >
                Inquire Product
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenCalculator}
                className="flex items-center justify-center gap-2 bg-[#020617] hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-700 font-bold uppercase text-xs tracking-wider py-3.5 px-6 rounded-sm transition-all duration-300"
                id={`prod-calc-btn-${activeProduct.id}`}
              >
                Launch Weight Calculator
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
