import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Building2, User, PhoneCall, ListFilter, ShieldAlert } from "lucide-react";
import { Inquiry } from "../types";

interface InquiryFormProps {
  prefilledProduct?: string;
  prefilledDimensions?: string;
  prefilledQuantity?: string;
  clearPrefills: () => void;
}

export default function InquiryForm({
  prefilledProduct = "",
  prefilledDimensions = "",
  prefilledQuantity = "",
  clearPrefills
}: InquiryFormProps) {
  // Form fields state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState("ERW Steel Pipes");
  const [dimensions, setDimensions] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  // UI Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Live Server Inquiries list
  const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);

  // Apply prefills when they change
  useEffect(() => {
    if (prefilledProduct) {
      setProductType(prefilledProduct);
    }
    if (prefilledDimensions) {
      setDimensions(prefilledDimensions);
    }
    if (prefilledQuantity) {
      setQuantity(prefilledQuantity);
    }
  }, [prefilledProduct, prefilledDimensions, prefilledQuantity]);

  // Load inquiries from API
  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/inquiries");
      const result = await response.json();
      if (result.success) {
        setInquiryList(result.data);
      }
    } catch (error) {
      console.error("Failed to load inquiries list:", error);
    }
  };

  useEffect(() => {
    fetchInquiries();
    // Poll every 15 seconds to simulate real-time updates for other investors!
    const interval = setInterval(fetchInquiries, 15000);
    return () => clearInterval(interval);
  }, []);

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !quantity) {
      setSubmitError("Please fill out all mandatory fields: Full Name, Phone Number, and Quantity.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          phone,
          email,
          location,
          productType,
          dimensions,
          quantity,
          notes
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        // Clear fields
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setLocation("");
        setDimensions("");
        setQuantity("");
        setNotes("");
        clearPrefills();
        
        // Refresh leads board
        fetchInquiries();
      } else {
        setSubmitError(result.error || "Failed to submit inquiry.");
      }
    } catch (error) {
      setSubmitError("Server communication error. Please try calling our direct desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#020617] py-24 px-4 md:px-8 border-t border-slate-800/60" id="contact">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Inquiry & Contact Desk
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mt-2 uppercase">
            Initiate Commercial RFP & Inquiries
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-xs text-slate-400 mt-4 leading-relaxed max-w-xl mx-auto">
            Ready to deploy pipelines or structural support frameworks? Submit your sizing requisites or directly connect with Shri Shivesh Jaiswal's commercial cell.
          </p>
        </div>

        {/* Info & Form layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Left Panel: Corporate Contacts & Maps (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            <div className="bg-slate-900/30 border border-slate-800/60 p-6 md:p-8 rounded-sm shadow-md">
              <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
                <Building2 className="w-5 h-5 text-blue-400" />
                Jagdev Nagar Industries
              </h3>

              {/* Contacts Details */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-950/40 p-3 rounded-sm border border-blue-900/30 text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-semibold text-xs uppercase text-slate-500 tracking-wider">
                      Manufacturing Facility Address
                    </span>
                    <p className="font-sans text-sm text-slate-300 mt-1 leading-relaxed">
                      Jagdev Nagar Patar Khas, Bhelara,<br />
                      Kavipur, Sultanpur, Uttar Pradesh – 228151, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-950/40 p-3 rounded-sm border border-blue-900/30 text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-semibold text-xs uppercase text-slate-500 tracking-wider">
                      Direct Hotlines (Owner cell)
                    </span>
                    <p className="font-sans text-sm text-slate-300 mt-1 font-semibold flex flex-col gap-1 font-mono">
                      <span>+91 7003646556</span>
                      <span>+91 9836264750</span>
                      <span>+91 9918044700</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-950/40 p-3 rounded-sm border border-blue-900/30 text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-semibold text-xs uppercase text-slate-500 tracking-wider">
                      Official Mailing Channel
                    </span>
                    <p className="font-sans text-sm text-slate-300 mt-1 font-semibold hover:text-blue-400 transition-colors">
                      info@jagdevnagarindustries.com
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Google Map Embed / Clean Location Card */}
            <div className="bg-slate-900/30 border border-slate-800/60 p-4 rounded-sm shadow-md h-[240px] relative overflow-hidden group">
              {/* Fallback clean placeholder vector map if direct iFrame has issues, or load clean standard iFrame */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.4251264251!2d82.046556!3d26.26475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a0932fd51c6b3%3A0xe8d0a27170c0c66!2sKavipur%2C%20Sultanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719225881000!5m2!1sen!2sin"
                className="w-full h-full border-0 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="JNI Sultanpur Facility Location Map"
              />
            </div>

          </div>

          {/* Right Panel: The RFP Form Panel (Col Span 7) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800/60 p-6 md:p-8 rounded-sm shadow-md">
            <h3 className="font-display font-bold text-lg text-white mb-6 uppercase tracking-wider">
              Get Official Commercial Quotation
            </h3>

            {submitSuccess && (
              <div className="bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 p-4 rounded-sm mb-6 flex gap-3 items-start animate-in zoom-in-95 duration-200">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Inquiry Registered Successfully!</span>
                  <span className="text-xs leading-relaxed block mt-0.5">
                    Your request has been filed under the JNI Procurement Ledger. Shri Shivesh Jaiswal's billing cell has been alerted and will issue an official quote within 4 hours.
                  </span>
                </div>
              </div>
            )}

            {submitError && (
              <div className="bg-rose-950/60 border border-rose-800/40 text-rose-400 p-4 rounded-sm mb-6 flex gap-3 items-start animate-in zoom-in-95 duration-200">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Form Validation Notice</span>
                  <span className="text-xs block mt-0.5">{submitError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-400" />
                    Full Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-blue-400" />
                    Company / Organisation Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Contractor name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <PhoneCall className="w-3 h-3 text-blue-400" />
                    WhatsApp/Mobile Phone <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. buyer@infrastructure.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                </div>
              </div>

              {/* Row 3: Location and Product Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    Delivery Site Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, State (e.g. Lucknow, UP)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Product Interest Type
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium appearance-none"
                  >
                    <option value="ERW Steel Pipes">ERW Steel Pipes</option>
                    <option value="GI Steel Pipes">GI Steel Pipes (Hot-Dip)</option>
                    <option value="MS Black Pipes">MS Black Pipes</option>
                    <option value="Square Hollow Sections">Square Tubes (SHS)</option>
                    <option value="Rectangular Hollow Sections">Rectangular Tubes (RHS)</option>
                    <option value="Custom Structural Pipes">Structural Steel Sections</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Custom Dimensions & Quantity (Required) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    Pipe Dimensions & Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DN 50 Medium Class or 100x100mm"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                  {prefilledDimensions && (
                    <span className="text-[10px] text-blue-400 mt-1 block">✓ Prefilled from dynamic calculator</span>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    Required Quantity <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 500 Pieces or 10 Tons"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-[#020617] border border-slate-800 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                  />
                </div>
              </div>

              {/* Notes / Special Instructions Textarea */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Special Procurement Requirements / Remarks
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention custom lengths, specific zinc coating thickesses, bevelled ends requirements, or delivery schedule preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#020617] border border-slate-800 rounded-sm p-4 text-sm focus:outline-none focus:border-blue-500/50 text-white font-medium"
                />
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold uppercase text-xs tracking-wider py-4 rounded-sm shadow-md transition-all duration-300 disabled:opacity-50 border border-blue-400/30 cursor-pointer"
                id="contact-form-submit-btn"
              >
                {isSubmitting ? (
                  <span>Registering Lead on Server...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Official Inquiry
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

        {/* Real-time Procurement Ledger Board */}
        <div className="border-t border-slate-800/40 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase">
                Transparency Portal
              </span>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight mt-1 uppercase">
                Live Corporate Inquiry Ledger
              </h3>
              <p className="font-sans text-xs text-slate-400 mt-1">
                Real-time active quotation and procurement requests received from national contractors & developers at our Sultanpur desk.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-sm flex items-center gap-2 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-300 font-medium">Active Connection</span>
            </div>
          </div>

          {/* Table Ledger Panel */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-sm overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-[#020617] text-slate-400 font-mono border-b border-slate-800/60 uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-6 font-semibold">Ledger ID</th>
                    <th className="py-4 px-6 font-semibold">Contractor / Client</th>
                    <th className="py-4 px-6 font-semibold">Product Requested</th>
                    <th className="py-4 px-6 font-semibold">Dimensions</th>
                    <th className="py-4 px-6 font-semibold text-right">Volume</th>
                    <th className="py-4 px-6 font-semibold text-center">Desk Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {inquiryList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                        Initializing connection to JNI ledger board...
                      </td>
                    </tr>
                  ) : (
                    inquiryList.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-4 px-6 font-mono font-semibold text-blue-400">
                          {lead.id}
                        </td>
                        <td className="py-4 px-6">
                          <span className="block font-semibold text-white">{lead.name}</span>
                          <span className="block text-[10px] text-slate-500 font-mono mt-0.5">{lead.company}</span>
                        </td>
                        <td className="py-4 px-6 font-semibold">
                          {lead.productType}
                        </td>
                        <td className="py-4 px-6 text-slate-400 truncate max-w-xs font-mono text-[11px]" title={lead.dimensions}>
                          {lead.dimensions}
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-semibold text-white">
                          {lead.quantity}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`inline-block py-1 px-2.5 rounded-sm text-[10px] font-bold tracking-wide uppercase ${
                              lead.status === "Contacted"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-900/30"
                                : lead.status === "Reviewed"
                                ? "bg-blue-950 text-blue-400 border border-blue-900/30"
                                : "bg-amber-950 text-amber-400 border border-amber-900/30"
                            }`}
                          >
                            ● {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
