import React, { useState } from "react";
import { 
  ArrowRight, CheckCircle2, ChevronDown, Mail, AlertTriangle, 
  Loader2, Linkedin, Phone, MessageSquare
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PreAuditSection from "./components/PreAuditSection";
import ProblemSection from "./components/ProblemSection";
import FbaSection from "./components/FbaSection";
import PrivateLabelSection from "./components/PrivateLabelSection";
import { InquireForm } from "./types";
import TrustBar from "./components/TrustBar";

export default function App() {
  // Custom Lead Inquiry Form
  const [inquireForm, setInquireForm] = useState<InquireForm>({
    name: "",
    email: "",
    subject: "",
    phone: "",
    company: "",
    product: "",
    budget: "$10,000 - $50,000",
    plan: "Growth — 8 Products — $1,199/mo",
    message: ""
  });
  const [emailValidationError, setEmailValidationError] = useState("");
  const [inquireStatus, setInquireStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [inquireMsg, setInquireMsg] = useState("");
   const [wechatCopied, setWechatCopied] = useState(false);
  const [pricingTab, setPricingTab] = useState<"monthly" | "ondemand">("monthly");

  // Accordion active indexes
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  const [serviceOpen, setServiceOpen] = useState<{ [key: number]: boolean }>({ 0: true });

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleService = (index: number) => {
    setServiceOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check email with precise email format pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquireForm.email)) {
      setEmailValidationError("Please enter a valid business email address (e.g. name@company.com)");
      return;
    }
    
    // Clear validation error and proceed
    setEmailValidationError("");
    setInquireStatus("submitting");
    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquireForm)
      });
      const data = await response.json();
      if (data.success) {
        setInquireStatus("success");
        setInquireMsg(data.message || "Inquiry received. We will respond within 24 hours. For faster contact: WhatsApp +8619560110778.");
      } else {
        setInquireStatus("error");
        setInquireMsg(data.error || "Inquiry submission failed. Please verify fields are entered.");
      }
    } catch (err: any) {
      setInquireStatus("error");
      setInquireMsg("Network connection error. Please try again.");
    }
  };

  const serviceCategories = [
    {
      title: "Factory-Direct Sourcing & Verification",
      num: "01",
      tags: ["Domestic factory-direct pricing", "Factory vs trading-company check", "On-site video walkthroughs", "Business licence verification"],
      details: "We source through domestic Chinese channels at true factory prices — not the export prices with a 20–30% markup baked in that overseas buyers pay. We verify the factory is real, speak directly to the factory director, and confirm production capability in person before you commit a single dollar."
    },
    {
      title: "Amazon FBA Prep & Compliance",
      num: "02",
      tags: ["FNSKU labelling per unit", "Box ID labels (all 4 sides)", "Polybag & suffocation warnings", "Shipment-plan quantity match"],
      details: "Your shipment arrives Amazon-ready, not stranded. We apply FNSKU labels to every unit, label every carton on all four sides, poly-bag and void-fill to Amazon spec, verify quantities against your shipment plan, and issue the commercial invoice under our registered WFOE entity."
    },
    {
      title: "Quality Inspection & Certification",
      num: "03",
      tags: ["Random production-line inspection", "Pre-shipment photo & video log", "Test reports in your brand name", "CE / FCC / compliance file"],
      details: "We pull random units from your actual production run — not the sample the factory hand-picks — and inspect against your spec. We walk your product into SGS or Bureau Veritas, get test reports issued in your brand name, and assemble the full compliance file Amazon will accept."
    },
    {
      title: "Private Label & Ongoing Partnership",
      num: "04",
      tags: ["Custom branding & packaging", "Brand Registry-ready documentation", "Reorder & inventory management", "Freight & export coordination"],
      details: "Think of us as your physical presence on the ground in China — your own team where your products are made. We coordinate custom branding, manage reorders, consolidate freight, expedite export documents, and keep your launch timeline on track."
    }
  ];

  return (
    <div className="relative min-h-screen bg-white selection:bg-gold/30 selection:text-ink pb-0">
      {/* Sensory Paper Texture */}
      <div className="grain-overlay" />

      {/* Nav */}
      <Navbar />

      {/* Hero */}
      <Hero />


      {/* FREE PRE-AUDIT TOOL */}
      <PreAuditSection />

      {/* FBA GRIEVANCES & SOLUTIONS — core FBA-focused block */}
      <FbaSection />

      {/* WHY SOURCING FAILS SECTION */}
      <ProblemSection />

      {/* PRIVATE LABEL */}
      <PrivateLabelSection />

      {/* SERVICE PHOTO STRIP — cinematic premium images */}
      <div className="photo-strip">
        <div className="photo-strip-item"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=85" alt="Lab testing — high-tech laboratory" loading="lazy" /><div className="photo-strip-label">Lab Testing</div></div>
        <div className="photo-strip-item"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=85" alt="Market research — data analytics dark office" loading="lazy" /><div className="photo-strip-label">Market Research</div></div>
        <div className="photo-strip-item"><img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=85" alt="Freight logistics" loading="lazy" /><div className="photo-strip-label">Freight Logistics</div></div>
        <div className="photo-strip-item"><img src="https://images.unsplash.com/photo-1595872702557-47f88e9a2c7a?w=600&q=85" alt="Container shipping — massive cargo ship bow" loading="lazy" /><div className="photo-strip-label">Container Shipping</div></div>
      </div>

      {/* DETAILED SERVICES ACCORDIONS - A highly styled typographic grid */}
      <section id="services" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Sticky Intro header */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm">
                Field Operations
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
                Our On-Ground <br />
                <span className="italic font-light text-ink-faint">Infrastructure</span>
              </h2>
              <p className="text-ink-light leading-relaxed text-base font-light">
                Think of XinAo as your dedicated On-Ground Execution Arm directly in the center of China’s e-commerce and export core. We serve importers globally with legally accountable, NDA-backed local oversight.
              </p>
              
              <div className="border-t border-ink/10 pt-6 space-y-3">
                <div className="flex gap-2 text-xs text-ink-light">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Direct supplier communications (No Chinese gatekeepers)</span>
                </div>
                <div className="flex gap-2 text-xs text-ink-light">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>NDAs signed before any product details are processed</span>
                </div>
                <div className="flex gap-2 text-xs text-ink-light">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Raw real invoices are direct and transparent</span>
                </div>
              </div>

              <div>
                <a
                  href="#contact"
                  className="text-white font-mono text-[11px] uppercase tracking-widest py-4 px-8 rounded-sm inline-block transition-all duration-300 font-bold"
                  style={{background:"#1D6FE8"}}
                  onMouseEnter={e => (e.currentTarget.style.background='#1558c0')}
                  onMouseLeave={e => (e.currentTarget.style.background='#1D6FE8')}
                >
                  Book On-Ground Operations Consultation
                </a>
              </div>
            </div>

            {/* Styled Services list */}
            <div className="lg:col-span-1"></div>
            <div className="lg:col-span-6 space-y-4">
              {serviceCategories.map((service, index) => (
                <div
                  key={index}
                  className="border-b border-ink/10 py-6 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleService(index)}
                    aria-expanded={!!serviceOpen[index]}
                    aria-controls={`service-panel-${index}`}
                    className="w-full flex items-center justify-between text-left group rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                    style={{"--tw-ring-color":"#1D6FE8"} as React.CSSProperties}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold" style={{
                        color: index === 0 ? '#B8895A' : index === 1 ? '#1D6FE8' : index === 2 ? '#0d9488' : '#6d28d9'
                      }}>
                        {service.num}
                      </span>
                      <h3 className="font-serif text-lg md:text-xl font-medium text-ink group-hover:text-gold transition-colors duration-200">
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-ink-faint group-hover:text-ink transition-transform duration-300 ${
                      serviceOpen[index] ? "rotate-180" : ""
                    }`} />
                  </button>

                  <div
                    id={`service-panel-${index}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-500 ${
                      serviceOpen[index] ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm text-ink-light leading-relaxed font-light pl-8">
                      {service.details}
                    </p>
                    <div className="flex flex-wrap gap-2 pl-8 mt-4">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono tracking-wide uppercase bg-cream-dark text-ink-light py-1 px-3 border border-ink/5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Physical Presence — factory floor professional meeting */}
      <div className="relative w-full min-h-[500px] flex items-center overflow-hidden border-t border-ink/10">
        {/* Background — professional contract meeting on active Chinese factory production line */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=85')" }}
          aria-hidden="true"
        />
        {/* Deep dark-blue overlay — heavier on left so text is always crisp, lighter right reveals factory scene */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(5,10,30,0.94) 0%, rgba(5,10,30,0.86) 45%, rgba(5,10,30,0.68) 100%)" }}
          aria-hidden="true"
        />
        {/* Content — verbatim, top-left aligned */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">
            <span
              className="inline-block w-fit text-white font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-5"
              style={{ background: "#1D6FE8" }}
            >
              Why It Matters
            </span>
            <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Your suppliers treat local<br />
              <span className="italic font-light text-white/55">representatives differently.</span>
            </h3>
            <p className="text-white/70 text-base leading-relaxed max-w-xl">
              Factories prioritise production timelines for buyers who can physically show up. Our WFOE registration gives us the same standing as a local Chinese company — and the legal teeth to enforce it.
            </p>
          </div>
        </div>
      </div>

      {/* COMPARISON - THE OUTSOURCING MODEL COMPARATIVE */}
      <section id="compare" className="py-24 bg-ink text-cream border-t border-ink/10 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mb-16">
            <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-3">
              Architectural Transparency
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-cream leading-tight">
              A Direct Comparison of<br />
              <span className="italic font-light text-gold-light">China Sourcing Partnerships</span>
            </h2>
            <p className="text-cream/70 text-sm mt-4 font-light max-w-xl">
              Understand the clear financial and legal implications of different product sourcing strategies inside China.
            </p>
          </div>

          <div className="overflow-x-auto border border-cream/10 rounded-sm">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-cream/10">
                  <th className="p-6 text-cream/40 font-normal uppercase tracking-wider">Strategic Sourcing Metrics</th>
                  <th className="p-6 text-cream/60 font-normal uppercase tracking-wider">Trading Agencies</th>
                  <th className="p-6 text-cream/60 font-normal uppercase tracking-wider">Full In-house Hire</th>
                  <th className="p-6 font-bold uppercase tracking-widest bg-cream/5 border-x relative" style={{color:"#93c5fd",borderColor:"rgba(29,111,232,0.35)"}}>
                    XinAo Dedicated Mainland Infrastructure
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full" style={{background:"#1D6FE8"}}>
                      Highly recommended
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream/5">
                <tr>
                  <td className="p-6 font-semibold text-cream/80">Monthly Retainer & Fees</td>
                  <td className="p-6 text-cream/60">Undefined kickbacks added per unit costs</td>
                  <td className="p-6 text-cream/60">$7,000+ Salaried Base + Visas + Logistics</td>
                  <td className="p-6 bg-cream/5 font-bold border-x" style={{color:"#93c5fd",borderColor:"rgba(29,111,232,0.25)"}}>From $499 Flat/Month | $0 Sourcing Fee</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-cream/80">Pricing Open-Book Policy</td>
                  <td className="p-6 text-red-400">Locked (Hidden 10-25% markups)</td>
                  <td className="p-6 text-emerald-400">Open-Book</td>
                  <td className="p-6 text-emerald-400 bg-cream/5 font-bold border-x" style={{borderColor:"rgba(29,111,232,0.25)"}}>100% Raw Direct Factory Quotes</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-cream/80">Supplier Contacts Access</td>
                  <td className="p-6 text-red-400">Restricted (Agent brokers communication)</td>
                  <td className="p-6 text-emerald-400">Direct Access</td>
                  <td className="p-6 text-emerald-400 bg-cream/5 font-bold border-x" style={{borderColor:"rgba(29,111,232,0.25)"}}>100% Unfiltered Direct Relationships</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-cream/80">Physical On-ground Verification</td>
                  <td className="p-6 text-cream/40">Rarely or self-verified photos only</td>
                  <td className="p-6 text-emerald-400">In-person visits</td>
                  <td className="p-6 text-emerald-400 bg-cream/5 font-bold border-x" style={{borderColor:"rgba(29,111,232,0.25)"}}>Continuous Live On-Site audits & walkthroughs</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-cream/80">On-Ground Legal Accountability</td>
                  <td className="p-6 text-cream/40">Unaccountable Freelancers</td>
                  <td className="p-6 text-emerald-400">Company Liability</td>
                  <td className="p-6 text-emerald-400 bg-cream/5 font-bold border-x" style={{borderColor:"rgba(29,111,232,0.25)"}}>NDA legally enforceable with resident representatives</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-cream/80">Strategic Commitments</td>
                  <td className="p-6 text-cream/40">Often require massive MOQ orders</td>
                  <td className="p-6 text-red-400">Strict local employment laws</td>
                  <td className="p-6 text-emerald-400 bg-cream/5 font-bold border-x" style={{borderColor:"rgba(29,111,232,0.25)"}}>Flexible Subscription | Pause or Cancel anytime</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="pricing" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-3">
              Transparent FBA Plans
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
              Your China Team, Priced By Product
            </h2>
            <p className="text-ink-faint text-sm mt-4 font-light">
              Every plan includes the full service — physical inspection, FBA prep, pre-shipment report, export docs, freight coordination, and WhatsApp support. Flat fee. 0% markup. Cancel anytime.
            </p>
         </div>

          {/* Pricing Tab Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-cream-dark border border-ink/10 rounded-sm p-1 gap-1">
              <button
                onClick={() => setPricingTab("monthly")}
                className={`font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-sm transition-all duration-200 ${
                  pricingTab === "monthly" ? "bg-ink text-cream" : "text-ink-faint hover:text-ink"
                }`}
              >
                Monthly Retainer
              </button>
              <button
                onClick={() => setPricingTab("ondemand")}
                className={`font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-6 rounded-sm transition-all duration-200 ${
                  pricingTab === "ondemand" ? "bg-ink text-cream" : "text-ink-faint hover:text-ink"
                }`}
              >
                On-Demand Services
              </button>
            </div>
          </div>

          {/* MONTHLY RETAINER TAB */}
          {pricingTab === "monthly" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Tier 1: Starter — 3 Products */}
            <div className="bg-cream border border-ink/15 hover:border-gold/60 p-8 rounded-sm flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5 transition-all duration-300 relative">
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm">Up to 3 Active Products</span>
                <h3 className="font-serif text-2xl text-ink mt-2">Starter</h3>
                <p className="text-xs text-ink-faint mt-1 leading-relaxed">Your China-based FBA VA for sellers launching their first products. Everything you need to source and ship Amazon-ready.</p>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-ink">$499</span>
                  <span className="font-mono text-xs text-ink-faint">/ month</span>
                </div>

                <div className="border-t border-ink/10 pt-6">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3">Everything included</span>
                  <ul className="space-y-3 font-mono text-[11px] uppercase tracking-wider text-ink-light">
                    {[
                      "Up to 3 active products",
                      "Factory-direct sourcing at true price",
                      "Physical factory inspection",
                      "Full FBA prep — FNSKU, box IDs, polybag",
                      "Pre-shipment inspection report",
                      "Export documentation",
                      "Freight coordination",
                      "WhatsApp priority support"
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="text-gold font-bold shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => setInquireForm(prev => ({ ...prev, plan: "Starter — 3 Products — $499/mo" }))}
                  className="w-full text-center border text-ink font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 block hover:text-white" style={{borderColor:"#1D6FE8",transition:"all 0.2s"}} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.background="#1D6FE8";(e.currentTarget as HTMLElement).style.color="white"}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.background="";(e.currentTarget as HTMLElement).style.color=""}}
                >
                  Start With 3 Products →
                </a>
              </div>
            </div>

            {/* Tier 2: Growth — 8 Products */}
            <div className="bg-cream p-8 rounded-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative" style={{border:"2px solid #1D6FE8", boxShadow:"0 4px 24px rgba(29,111,232,0.08)"}}>
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[8px] font-mono font-bold uppercase tracking-[0.14em] py-1 px-4 rounded-full shadow-lg" style={{background:"#1D6FE8"}}>
                Most Popular For Scaling Sellers
              </span>
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mt-1">Up to 8 Active Products</span>
                <h3 className="font-serif text-2xl text-ink mt-2">Growth</h3>
                <p className="text-xs text-ink-faint mt-1 leading-relaxed font-light">
                  For sellers expanding their catalogue. The same full-service FBA prep across more SKUs, with reorder and inventory management.
                </p>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-ink">$1,199</span>
                  <span className="font-mono text-xs text-ink-faint">/ month</span>
                </div>

                <div className="border-t border-ink/10 pt-6">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3">Everything in Starter, plus more volume</span>
                  <ul className="space-y-3 font-mono text-[11px] uppercase tracking-wider text-ink-light">
                    {[
                      "Up to 8 active products",
                      "Factory-direct sourcing at true price",
                      "Physical factory inspection",
                      "Full FBA prep — FNSKU, box IDs, polybag",
                      "Pre-shipment inspection report",
                      "Export documentation",
                      "Freight coordination",
                      "Reorder & inventory management",
                      "WhatsApp priority support"
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="text-gold font-bold shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => setInquireForm(prev => ({ ...prev, plan: "Growth — 8 Products — $1,199/mo" }))}
                  className="w-full text-center font-mono text-[10px] uppercase tracking-widest font-bold py-3.5 px-4 rounded-sm transition-all duration-300 block text-white"
                  style={{background:"#1D6FE8"}}
                  onMouseEnter={e => (e.currentTarget.style.background='#1558c0')}
                  onMouseLeave={e => (e.currentTarget.style.background='#1D6FE8')}
                >
                  Scale To 8 Products →
                </a>
              </div>
            </div>

            {/* Tier 3: Your China Office — Unlimited */}
            <div className="bg-ink border-2 border-gold p-8 rounded-sm flex flex-col justify-between shadow-2xl shadow-ink/15 relative lg:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-ink text-[8.5px] font-mono font-bold uppercase tracking-[0.15em] py-1 px-4 rounded-full shadow-lg">
                Your Full China Office
              </span>

              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mt-1">Unlimited Active Products</span>
                <h3 className="font-serif text-2xl text-cream mt-2">Your In-House China Office</h3>
                <p className="text-xs text-cream/70 mt-1 leading-relaxed font-light">
                  A dedicated representative working only for you. Unlimited products, private label development, and a permanent on-ground operational footprint.
                </p>

                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-gold-light">$2,499</span>
                  <span className="font-mono text-xs text-cream/50">/ month</span>
                </div>

                <div className="border-t border-cream/15 pt-6">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3">Everything in Growth, plus</span>
                  <ul className="space-y-3 font-mono text-[11px] uppercase tracking-wider text-cream/85">
                    {[
                      "Unlimited active products",
                      "Dedicated account representative",
                      "Private label brand development",
                      "Certification project management",
                      "Trade show & Canton Fair sourcing",
                      "Multi-factory freight consolidation"
                    ].map((f, idx) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="text-gold-light font-bold shrink-0">✓</span>
                        <span className={idx === 0 ? "text-white font-semibold" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => setInquireForm(prev => ({ ...prev, plan: "China Office — Unlimited — $2,499/mo" }))}
                  className="w-full text-center bg-gold hover:bg-cream text-ink font-mono text-[10px] uppercase tracking-widest font-bold py-3.5 px-4 rounded-sm transition-all duration-300 block"
                >
                  Build My China Office →
                </a>
              </div>
            </div>

           </div>
          )}

          {/* ON-DEMAND SERVICES TAB — progressive 1→2→3→4 service bundles */}
          {pricingTab === "ondemand" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Bundle 1 — One Service */}
            <div className="bg-cream border border-ink/15 hover:border-gold/60 p-7 rounded-sm flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5 transition-all duration-300">
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3">1 Service · within 48 hours</span>
                <h3 className="font-serif text-2xl text-ink mt-1">Supplier Verification</h3>
                <p className="text-xs text-ink-faint mt-2 leading-relaxed">A single, focused check. We confirm your supplier is a real factory — not a trading company hiding behind a polished listing.</p>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-ink">$49</span>
                  <span className="font-mono text-xs text-ink-faint">one-time</span>
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-2">Includes 1 service</span>
                  <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-light">
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">①</span><span>On-the-ground supplier verification</span></li>
                  </ul>
                  <ul className="space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-3">
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Business licence verification</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Factory vs trading-company determination</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Written report with risk rating</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <a href="#contact" onClick={() => setInquireForm(prev => ({ ...prev, plan: "On-Demand: 1 Service — Supplier Verification — $49" }))}
                  className="w-full text-center border text-ink font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 block hover:text-white" style={{borderColor:"#1D6FE8",transition:"all 0.2s"}} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.background="#1D6FE8";(e.currentTarget as HTMLElement).style.color="white"}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.background="";(e.currentTarget as HTMLElement).style.color=""}}>
                  Request This →
                </a>
              </div>
            </div>

            {/* Bundle 2 — Two Services */}
            <div className="bg-cream border border-ink/15 hover:border-gold/60 p-7 rounded-sm flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5 transition-all duration-300">
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3">2 Services · within 72 hours</span>
                <h3 className="font-serif text-2xl text-ink mt-1">Verify + Source</h3>
                <p className="text-xs text-ink-faint mt-2 leading-relaxed">Verification plus a full sourcing report — manufacturing hubs, real factory pricing, and the best verified supplier options for one product.</p>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-ink">$99</span>
                  <span className="font-mono text-xs text-ink-faint">one-time</span>
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-2">Includes 2 services</span>
                  <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-light">
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">①</span><span>On-the-ground supplier verification</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">②</span><span>Single-product sourcing report</span></li>
                  </ul>
                  <ul className="space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-3">
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Manufacturing hubs & clusters</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>MOQ ranges & real unit-cost benchmarks</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Top verified supplier options</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <a href="#contact" onClick={() => setInquireForm(prev => ({ ...prev, plan: "On-Demand: 2 Services — Verify + Source — $99" }))}
                  className="w-full text-center border text-ink font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 block hover:text-white" style={{borderColor:"#1D6FE8",transition:"all 0.2s"}} onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.background="#1D6FE8";(e.currentTarget as HTMLElement).style.color="white"}} onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.background="";(e.currentTarget as HTMLElement).style.color=""}}>
                  Request This →
                </a>
              </div>
            </div>

            {/* Bundle 3 — Three Services (Most Popular) */}
            <div className="bg-cream p-7 rounded-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative" style={{border:"2px solid #1D6FE8", boxShadow:"0 2px 16px rgba(29,111,232,0.06)"}}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[8px] font-mono font-bold uppercase tracking-[0.14em] py-1 px-4 rounded-full shadow-lg whitespace-nowrap" style={{background:"#1D6FE8"}}>
                Most Popular
              </span>
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3 mt-1">3 Services · within 72 hours</span>
                <h3 className="font-serif text-2xl text-ink mt-1">Verify + Source + Inspect</h3>
                <p className="text-xs text-ink-faint mt-2 leading-relaxed">Everything in the 2-service bundle, plus a physical pre-shipment inspection of your batch before it ever leaves the factory floor.</p>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-ink">$179</span>
                  <span className="font-mono text-xs text-ink-faint">one-time</span>
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-2">Includes 3 services</span>
                  <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider text-ink-light">
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">①</span><span>On-the-ground supplier verification</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">②</span><span>Single-product sourcing report</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold font-bold shrink-0">③</span><span>Physical pre-shipment inspection</span></li>
                  </ul>
                  <ul className="space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-3">
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>On-site photo & video log</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>AQL 2.5 random sampling</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold/60 shrink-0">–</span><span>Pass / fail recommendation</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <a href="#contact" onClick={() => setInquireForm(prev => ({ ...prev, plan: "On-Demand: 3 Services — Verify + Source + Inspect — $179" }))}
                  className="w-full text-center font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 block text-white" style={{background:"#1D6FE8"}}>
                  Request This →
                </a>
              </div>
            </div>

            {/* Bundle 4 — Four Services */}
            <div className="bg-ink border-2 border-gold p-7 rounded-sm flex flex-col justify-between shadow-2xl shadow-ink/15 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink text-[8px] font-mono font-bold uppercase tracking-[0.14em] py-1 px-4 rounded-full shadow-lg whitespace-nowrap">
                Complete Coverage
              </span>
              <div>
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-3 mt-1">4 Services · end-to-end</span>
                <h3 className="font-serif text-2xl text-cream mt-1">Full On-Ground Package</h3>
                <p className="text-xs text-cream/70 mt-2 leading-relaxed">All three services, plus a physical rescue visit and a complete FBA-ready prep & export handoff for one shipment.</p>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="font-serif text-5xl font-semibold text-gold-light">$299</span>
                  <span className="font-mono text-xs text-cream/50">one-time</span>
                </div>
                <div className="border-t border-cream/15 pt-4">
                  <span className="inline-block bg-gold text-ink font-mono text-[8px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-2">Includes 4 services</span>
                  <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider text-cream/85">
                    <li className="flex items-start gap-2"><span className="text-gold-light font-bold shrink-0">①</span><span>On-the-ground supplier verification</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold-light font-bold shrink-0">②</span><span>Single-product sourcing report</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold-light font-bold shrink-0">③</span><span>Physical pre-shipment inspection</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold-light font-bold shrink-0">④</span><span>FBA prep & export handoff</span></li>
                  </ul>
                  <ul className="space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-cream/50 mt-3">
                    <li className="flex items-start gap-2"><span className="text-gold-light/60 shrink-0">–</span><span>FNSKU + carton box-ID labelling</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold-light/60 shrink-0">–</span><span>Polybag & Amazon-spec void fill</span></li>
                    <li className="flex items-start gap-2"><span className="text-gold-light/60 shrink-0">–</span><span>Export docs under our WFOE entity</span></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <a href="#contact" onClick={() => setInquireForm(prev => ({ ...prev, plan: "On-Demand: 4 Services — Full On-Ground Package — $299" }))}
                  className="w-full text-center text-white font-mono text-[10px] uppercase tracking-widest font-bold py-3 px-4 rounded-sm transition-all duration-300 block btn-cta">
                  Request This →
                </a>
              </div>
            </div>

          </div>
          )}

          <div className="mt-8 mb-2 text-center">
            <p className="font-mono text-[11px] text-ink-faint">
              <span className="inline-block border border-ink/15 rounded-sm px-3 py-1 bg-cream-dark">
                We limit active client count to maintain quality — <a href="#contact" className="underline underline-offset-2 text-ink hover:text-ink-faint transition-colors">check availability →</a>
              </span>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              {pricingTab === "monthly"
                ? "All plans include 0% markup · Raw invoices shared directly · NDA before any product details"
                : "On-demand services include a written deliverable · Most clients convert to a monthly retainer after first engagement"}
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT - MANAGING DIRECTOR ABDUL RAHMAN'S BIO */}
      <section id="about" className="py-24 bg-cream-dark/40 border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* MD Graphic Card - Styled to elegant slightly smaller size */}
            <div className="lg:col-span-4 flex justify-center w-full">
              <div className="relative border border-blue-cta/40 w-48 aspect-[3/4] bg-cream-dark p-3 rounded-sm shadow-xl shadow-ink/5 overflow-hidden group" style={{ boxShadow: "0 0 0 3px rgba(29,111,232,0.08), 0 20px 48px rgba(11,31,58,0.14)" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent z-10"></div>
                <img
                  src="https://lh3.googleusercontent.com/d/1pBIw5y4YiSdP4oY5dA6yE7fyK0uTAm4X"
                  alt="Abdul Rahman - Managing Director of XinAo International Trade Co., Ltd."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-sm"
                  referrerPolicy="no-referrer"
                />

                {/* Float Overlap Card */}
                <div className="absolute bottom-3 left-3 right-3 bg-cream p-2 z-20 rounded-sm border border-blue-cta/20 shadow-lg">
                  <span className="font-mono text-[7px] uppercase tracking-widest text-gold-dark font-bold block mb-0.5">
                    XinAo International
                  </span>
                  <p className="font-serif text-xs font-semibold text-ink leading-tight">
                    Abdul Rahman
                  </p>
                  <p className="text-[8px] font-mono text-ink-faint mt-0.5 uppercase tracking-wider">
                    Managing Director
                  </p>
                </div>
              </div>
            </div>

            {/* MD Context — verbatim */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
                Your Dedicated <br />
                <span className="italic font-light text-ink-faint">Mainland Extension.</span>
              </h2>

              <blockquote className="border-l-3 border-gold pl-6 text-lg italic text-ink-light font-serif">
               "For 4 years, I ran Havens Commerce Partners — a China Representative Office coordinating sourcing and export logistics for buyers across the US, Europe, Canada, Australia, the Middle East, and India.

I watched the same failures repeat in every market: hidden markups, trading companies presented as manufacturers, certificates that nobody verified, and buyers overseas with no one on the ground who worked exclusively for them.

I founded XinAo to be the operation I never found as an exporter — flat fee, zero commission, physically present, working only for the buyer."
              </blockquote>
              <div className="mt-4 pl-6 font-mono text-xs text-ink-faint uppercase tracking-widest space-y-1">
                <p className="font-semibold text-ink">— Abdul Rahman, Founder &amp; Managing Director</p>
                <p>XinAo International Trade Co., Ltd.</p>
                <p>Wholly Foreign-Owned Enterprise (WFOE) · Registered in Hangzhou, China</p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-24 bg-cream border-t border-ink/5">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-3">
              Sourcing Answers
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">
              A Transparent Explanation <br />
              <span className="italic font-light text-ink-faint">of Chinese Operations</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How is this different from a remote overseas assistant?",
                a: "A remote overseas assistant has never set foot in China. We are physically on the ground — we walk into the factory, pay suppliers in RMB at domestic prices, inspect your actual production units, and prep your FBA shipment ourselves. Real presence, right where your products are made."
              },
              {
                q: "Will my FBA shipment really arrive Amazon-ready?",
                a: "Yes. We apply your FNSKU labels to every unit, place box ID labels on all four sides of each carton, poly-bag with suffocation warnings where required, use Amazon-approved void fill, and verify quantities against your shipment plan before anything ships. No stranded inventory, no removal fees."
              },
              {
                q: "How do you get cheaper prices than my Alibaba supplier?",
                a: "We source through China's domestic factory channels, where prices are typically 20–30% below the export prices overseas buyers are quoted. As a registered Chinese entity with a local bank account, we pay suppliers in RMB at domestic rates overseas buyers simply cannot access."
              },
              {
                q: "Can you help me build a private label brand?",
                a: "Yes. We coordinate custom branding and packaging on the factory floor, obtain test reports issued in your brand name, and assemble a Brand Registry-ready compliance file — so your product cannot be hijacked or undercut on your own ASIN."
              },
              {
                q: "What if the factory sends the wrong specification?",
                a: "We pull random units from your actual production run — not the sample the factory hand-picks — and inspect against your approved spec before loading. If anything is wrong, we catch it in China, where it can still be fixed, instead of after 500 units reach Amazon."
              },
              {
                q: "Can I cancel my plan anytime?",
                a: "Yes. All plans are billed monthly on a rolling basis. You can cancel with 30 days notice and no penalty."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-ink/10 pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={!!faqOpen[index]}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex justify-between items-center text-left py-4 rounded-sm group text-ink font-serif text-lg font-medium focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{focusVisibleOutlineColor:"#1D6FE8"} as React.CSSProperties}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-ink-faint group-hover:text-ink transition-transform duration-300 ${
                    faqOpen[index] ? "rotate-180" : ""
                  }`} />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-300 ${
                    faqOpen[index] ? "max-h-[200px] mt-2 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm font-sans text-ink-light pl-4 leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LEAD INQUIRY ENQUIRY FORM */}
      <section id="contact" className="py-24 bg-cream border-t border-ink/5 cta-photo-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side context */}
            <div className="lg:col-span-5 space-y-6" style={{position:"relative",zIndex:2}}>
              <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm">
                Direct Enquiries
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
                Deploy Your On-Ground <br />
                <span className="italic font-light text-ink-faint">Execution Arm</span>
              </h2>
              <p className="text-ink-light leading-relaxed text-sm font-light">
                Submit your product specifications or outline the exact difficulties you are experiencing with your existing manufacturers. Our on-ground representatives will verify factory operations, analyze your requirements, and deliver a comprehensive roadmap within 24 hours.
              </p>
            </div>

            {/* Enquiry Form Card */}
            <div className="lg:col-span-7 bg-cream border border-gold-dark/20 p-8 rounded-sm shadow-xl shadow-ink/5" style={{position:"relative",zIndex:2}}>
              
              {inquireStatus === "success" ? (
                <div className="py-10 space-y-6 animate-fade-up">
                  {/* Success header */}
                  <div className="flex items-center gap-4 pb-6 border-b border-ink/10">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{background:"rgba(16,185,129,0.12)",border:"1.5px solid rgba(16,185,129,0.35)"}}>
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-sans text-xl font-bold text-ink">Inquiry received — thank you.</h3>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-600 mt-0.5">Our on-ground team will reply within 24 hours.</p>
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">What happens next</p>
                    {[
                      "We review your product specifications and sourcing requirements",
                      "Our on-ground team in Hangzhou prepares a customised response",
                      "You receive a full sourcing roadmap and recommended action plan within 24 hours"
                    ].map((step, i) => (
                      <div key={i} className="flex gap-3 text-sm text-ink-light">
                        <span className="font-mono text-[10px] font-bold mt-0.5 shrink-0" style={{color:"#1D6FE8"}}>0{i+1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>

                  {/* Direct contact fallback — always shown */}
                  <div className="rounded-sm p-5 space-y-3" style={{background:"#F5F7FA",border:"1px solid rgba(11,31,58,0.08)"}}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Need a faster response? Contact us directly:</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://wa.me/8619560110778?text=Hi%2C%20I%20just%20submitted%20an%20inquiry%20and%20would%20like%20to%20follow%20up."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all duration-200"
                        style={{background:"#25D366"}}
                      >
                        <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.34 11.894-11.953 11.894-2.007-.001-3.977-.51-5.713-1.488L0 24zm6.59-3.791c1.558.924 3.1 1.411 4.717 1.411 5.309 0 9.632-4.321 9.635-9.63.001-2.572-1.002-4.99-2.824-6.812S13.918 2.378 12.011 2.377c-5.311 0-9.633 4.32-9.636 9.63-.001 1.702.457 3.361 1.32 4.868l-.872 3.19 3.226-.856z"/></svg>
                        WhatsApp +8619560110778
                      </a>
                      <a
                        href="mailto:abdu@xinaointernational.com"
                        className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all duration-200"
                        style={{background:"rgba(29,111,232,0.10)",color:"#1D6FE8",border:"1px solid rgba(29,111,232,0.25)"}}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        abdu@xinaointernational.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => { setInquireStatus("idle"); setInquireMsg(""); setInquireForm({ name:"",email:"",subject:"",phone:"",company:"",product:"",budget:"$10,000 - $50,000",plan:"Growth — 8 Products — $1,199/mo",message:"" }); }}
                    className="font-mono text-xs uppercase tracking-widest text-ink-faint hover:text-ink font-semibold block underline underline-offset-4 transition-colors"
                  >
                    ← Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquireSubmit} className="space-y-6">
                  {inquireStatus === "error" && (
                    <div className="rounded-sm p-4 space-y-3" style={{background:"#FEF2F2",border:"1px solid rgba(220,38,38,0.25)"}}>
                      <div className="flex gap-2 items-start">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-red-800">Submission failed — please try again.</p>
                          <p className="text-xs text-red-700">{inquireMsg}</p>
                        </div>
                      </div>
                      <div className="pt-1 border-t border-red-200 flex flex-wrap gap-2">
                        <p className="text-xs text-red-700 w-full">Or contact us directly:</p>
                        <a href="mailto:abdu@xinaointernational.com" className="text-xs font-mono font-bold underline underline-offset-2 text-red-800">abdu@xinaointernational.com</a>
                        <span className="text-red-300 text-xs">·</span>
                        <a href="https://wa.me/8619560110778" target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold underline underline-offset-2 text-red-800">WhatsApp +8619560110778</a>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquireForm.name}
                        onChange={(e) => setInquireForm({ ...inquireForm, name: e.target.value })}
                        placeholder="John Miller"
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Email Address (Business or Personal)</label>
                      <input
                        type="email"
                        required
                        value={inquireForm.email}
                        onChange={(e) => {
                          const emailVal = e.target.value;
                          setInquireForm({ ...inquireForm, email: emailVal });
                          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal) || emailVal === "") {
                            setEmailValidationError("");
                          }
                        }}
                        placeholder="john@importhub.com or john.miller@gmail.com"
                        className={`w-full bg-cream-dark border rounded-sm py-3 px-4 text-sm text-ink outline-none transition-all ${
                          emailValidationError ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-ink/10 focus:border-gold"
                        }`}
                      />
                      {emailValidationError && (
                        <p className="text-red-600 font-mono text-[10px] mt-1 uppercase tracking-wider">{emailValidationError}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Inquiry Subject</label>
                      <input
                        type="text"
                        required
                        value={inquireForm.subject}
                        onChange={(e) => setInquireForm({ ...inquireForm, subject: e.target.value })}
                        placeholder="e.g. Supplier Audit Request"
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Phone Number / WhatsApp</label>
                      <input
                        type="text"
                        value={inquireForm.phone}
                        onChange={(e) => setInquireForm({ ...inquireForm, phone: e.target.value })}
                        placeholder="+61 412 345 678"
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Company / Individual Name</label>
                      <input
                        type="text"
                        value={inquireForm.company}
                        onChange={(e) => setInquireForm({ ...inquireForm, company: e.target.value })}
                        placeholder="e.g., Import Hub Ltd or Individual"
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Target Product to Sourcing</label>
                      <input
                        type="text"
                        required
                        value={inquireForm.product}
                        onChange={(e) => setInquireForm({ ...inquireForm, product: e.target.value })}
                        placeholder="e.g. Ergonomic Chairs"
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Target Sourcing budget</label>
                      <select
                        value={inquireForm.budget}
                        onChange={(e) => setInquireForm({ ...inquireForm, budget: e.target.value })}
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3.5 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      >
                        <option value="Under $10,000">Under $10,000</option>
                        <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                        <option value="$50,000 - $200,000">$50,000 - $200,000</option>
                        <option value="$200,000+">$200,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Selected service or plan</label>
                      <select
                        value={inquireForm.plan}
                        onChange={(e) => setInquireForm({ ...inquireForm, plan: e.target.value })}
                        className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3.5 px-4 text-sm text-ink outline-none focus:border-gold transition-all"
                      >
                        <option value="Starter — 3 Products — $499/mo">Starter — 3 Products — $499/mo</option>
                        <option value="Growth — 8 Products — $1,199/mo">Growth — 8 Products — $1,199/mo</option>
                        <option value="China Office — Unlimited — $2,499/mo">China Office — Unlimited — $2,499/mo</option>
                        <option value="Custom consultation">Custom consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-2">Vendor difficulties / Sourcing specifications</label>
                    <textarea
                      rows={4}
                      value={inquireForm.message}
                      onChange={(e) => setInquireForm({ ...inquireForm, message: e.target.value })}
                      placeholder="My current manufacturer is delaying shipments. I need a ground representative to visit the factory and review batch quality..."
                      className="w-full bg-cream-dark border border-ink/10 rounded-sm py-3 px-4 text-sm text-ink outline-none focus:border-gold transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={inquireStatus === "submitting"}
                    className="w-full py-4 font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-white" style={{background:'#1D6FE8'}}
                  >
                    {inquireStatus === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Logging Inquiry...
                      </>
                    ) : (
                      <>
                        Book Free Supply Chain Audit
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream border-t border-cream/10 pt-24 pb-12 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-cream/10">
            {/* Brand */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center font-serif text-lg font-bold text-white" style={{background:'#1D6FE8'}}>
                  XA
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                  XinAo International Trade Co., Ltd.<span className="text-gold">.</span>
                </span>
              </div>
              <p className="text-xs text-cream/60 max-w-xl leading-relaxed font-light">
                XinAo International Trade Co., Ltd. ensures that the End-to-End Factory Sourcing & Strict On-Ground Governance workflow is seamless, legally bulletproof, and executed without intermediaries.
              </p>
              
              <div className="space-y-1 pt-2">
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm">
                  Registered Office
                </span>
                <p className="text-xs text-cream/75 leading-relaxed font-mono">
                  XinAo International Trade Co., Ltd.<br />
                  804-5, Building 1, No.188, Jinbaihua North Road,<br />
                  Xihu District, Hangzhou, People's Republic of China
                </p>
                <p className="text-[9px] text-gold/60 font-mono uppercase tracking-widest mt-2">
                  Wholly Foreign-Owned Enterprise (WFOE) · Registered in Hangzhou, PRC
                </p>
              </div>
            </div>

            {/* Support info */}
            <div className="lg:col-span-6 space-y-6 lg:text-right">
              <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm">
                Direct Contact Channels
              </span>

              <div className="flex flex-wrap gap-x-4 gap-y-3 justify-start lg:justify-end">
                {/* Voice Call Badge */}
                <a 
                  href="tel:+8619560110778"
                  className="group flex items-center gap-2.5 bg-cream-dark/5 px-4 py-2.5 rounded-sm border border-cream/10 hover:border-gold hover:bg-cream-dark/10 transition-all duration-300 cursor-pointer text-left"
                >
                  <Phone className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cream/80 group-hover:text-gold transition-colors">Connect</span>
                </a>

                {/* WhatsApp Badge */}
                <a 
                  href="https://wa.me/8619560110778?text=Hi%2C%20I'd%20like%20to%20discuss%20sourcing%20coordination."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 bg-cream-dark/5 px-4 py-2.5 rounded-sm border border-cream/10 hover:border-gold hover:bg-cream-dark/10 transition-all duration-300 cursor-pointer text-left"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cream/80 group-hover:text-gold transition-colors">WhatsApp</span>
                </a>

                {/* WeChat Badge */}
                <div 
                  onClick={() => {
                    navigator.clipboard.writeText("8619560110778");
                    setWechatCopied(true);
                    setTimeout(() => setWechatCopied(false), 3000);
                  }}
                  className="group flex items-center gap-2.5 bg-cream-dark/5 px-4 py-2.5 rounded-sm border border-cream/10 hover:border-gold hover:bg-cream-dark/10 transition-all duration-300 cursor-pointer text-left"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cream/80 group-hover:text-gold transition-colors">
                    {wechatCopied ? "WeChat ID Copied!" : "WeChat"}
                  </span>
                </div>

                {/* Email Badge */}
                <a 
                  href="mailto:abdu@xinaointernational.com"
                  className="group flex items-center gap-2.5 bg-cream-dark/5 px-4 py-2.5 rounded-sm border border-cream/10 hover:border-gold hover:bg-cream-dark/10 transition-all duration-300 cursor-pointer text-left py-2.5"
                >
                  <Mail className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cream/80 group-hover:text-gold transition-colors">Email</span>
                </a>

                {/* LinkedIn Badge */}
                <a 
                  href="https://www.linkedin.com/in/abdul-rahman-thakidiyil-muhamed-ismail-7b743a40b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 bg-cream-dark/5 px-4 py-2.5 rounded-sm border border-cream/10 hover:border-gold hover:bg-cream-dark/10 transition-all duration-300 cursor-pointer text-left"
                >
                  <Linkedin className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-cream/80 group-hover:text-gold transition-colors">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[9px] text-cream/40 uppercase tracking-widest pt-8 border-t border-cream/5">
            <p>© 2026 XinAo International Trade Co., Ltd. All rights reserved.</p>
            <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.2em] select-none">
              <span className="text-cream/40 uppercase">Enabling Direct Trade</span>
              <span className="text-cream/20">|</span>
              <span className="text-gold font-semibold uppercase">Hangzhou, PRC</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Active WhatsApp button */}
      <a
        href="https://wa.me/8619560110778?text=Hi%2C%20I'd%20like%20to%20schedule%20a%20free%20China%20Sourcing%20Audit."
        target="_blank"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-all duration-300 z-40 flex items-center justify-center"
        aria-label="Direct WhatsApp Contact"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.557-5.34 11.894-11.953 11.894-2.007-.001-3.977-.51-5.713-1.488L0 24zm6.59-3.791c1.558.924 3.1 1.411 4.717 1.411 5.309 0 9.632-4.321 9.635-9.63.001-2.572-1.002-4.99-2.824-6.812S13.918 2.378 12.011 2.377c-5.311 0-9.633 4.32-9.636 9.63-.001 1.702.457 3.361 1.32 4.868l-.872 3.19 3.226-.856zM17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
      </a>
    </div>
  );
}
