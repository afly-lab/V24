import React, { useState } from "react";
import { ArrowRight, Loader2, AlertTriangle, MapPin, Check, ShieldCheck } from "lucide-react";
import { AuditResult } from "../types";

export default function PreAuditSection() {
  const [productKeyword, setProductKeyword] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");

  const samples = ["Aquascaping Tools", "LED Lighting", "Laptop Backpack", "Pet Supplies"];

  const generateAudit = async (keywordOverride?: string) => {
    const query = keywordOverride || productKeyword;
    if (!query || query.trim() === "") {
      setAuditError("Please enter a product first.");
      return;
    }
    setAuditLoading(true);
    setAuditError("");
    try {
    const response = await fetch(`/api/audit?t=${Date.now()}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({ productType: query })
      });
      if (!response.ok) throw new Error("HTTP error " + response.status);
      const data = await response.json();
      setAuditResult(data);
      setTimeout(() => {
        document.getElementById("audit-result-view")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e) {
      console.error(e);
      setAuditError("The audit engine is briefly unavailable. Please try again, or message us on WhatsApp for a manual report.");
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <section id="audit-planner" className="py-24 md:py-32 bg-cream border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left intro */}
          <div className="lg:col-span-5">
            <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-3">
              Free Pre-Audit
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
              Analyze your product<br />
              <span className="italic font-light text-ink-faint">before you spend a dollar</span>
            </h2>
            <p className="text-ink-light text-base mt-4 leading-relaxed font-light">
              Enter any product you want to source from China. We generate a free, on-the-ground sourcing assessment — manufacturing hubs, realistic MOQs, target factory pricing, the certifications you will need, and the exact risks we would check on the floor.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {samples.map((s) => (
                <button
                  key={s}
                  onClick={() => { setProductKeyword(s); generateAudit(s); }}
                  className="font-mono text-[10px] uppercase tracking-wider bg-cream-dark text-ink-light border border-ink/10 hover:border-gold hover:text-ink py-1.5 px-3 rounded-full transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input + result card */}
          <div className="lg:col-span-7 bg-cream border border-gold-dark/20 p-8 rounded-sm shadow-xl shadow-ink/5">
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-ink-faint mb-3">
                  Your Product or Specification
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="e.g. stainless aquascaping scissors..."
                    value={productKeyword}
                    onChange={(e) => setProductKeyword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") generateAudit(); }}
                    className="flex-1 bg-cream-dark border border-ink/10 rounded-sm py-4 px-6 text-sm text-ink outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <button
                    onClick={() => generateAudit()}
                    disabled={auditLoading}
                    className="py-4 px-8 font-mono text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 text-white" style={{background:'#1D6FE8'}}
                  >
                    {auditLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                    ) : (
                      <>Generate Free Pre-Audit <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>

              {auditError && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded p-4 flex gap-2 items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Engine briefly offline</p>
                    <p className="text-xs opacity-90">{auditError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* RESULT */}
            {auditResult && (
              <div id="audit-result-view" className="mt-12 pt-12 border-t border-ink/10 space-y-8 animate-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">Sourcing assessment for</span>
                    <h3 className="font-serif text-3xl font-semibold text-ink italic mt-1">{auditResult.productName}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">Risk index:</span>
                    <span className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold ${
                      auditResult.riskScore === "Low"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : auditResult.riskScore === "Medium"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}>
                      {auditResult.riskScore} Risk
                    </span>
                  </div>
                </div>

                <div className="p-6 bg-cream-dark/40 border-l-2 border-gold rounded-sm">
                  <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm block mb-1">
                    On-Ground Sourcing Risk Overview
                  </span>
                  <p className="text-sm text-ink-light leading-relaxed font-light italic">"{auditResult.riskOverview}"</p>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mb-3 block">
                    Manufacturing Clusters in China
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(auditResult?.manufacturingClusters || []).map((cluster, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-cream border border-ink/5 rounded-sm hover:border-gold/50 transition-all">
                        <div className="flex items-center justify-center p-3 rounded bg-cream-dark text-gold h-fit">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-ink">{cluster.city}, {cluster.province}</h4>
                          <p className="text-xs text-ink-faint leading-relaxed mt-1">{cluster.specialization}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-cream-dark/30 rounded border border-ink/5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">Est. MOQ Range</span>
                    <p className="font-serif text-xl font-medium text-ink mt-1 italic">{auditResult.moqExpectation}</p>
                  </div>
                  <div className="p-6 bg-cream-dark/30 rounded border border-ink/5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint">Est. Target Unit Price</span>
                    <p className="font-serif text-xl font-medium text-ink mt-1 italic">{auditResult.targetPriceBenchmark}</p>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint block mb-3">
                    Required Testing & Certifications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(auditResult?.certificationRequirements || []).map((cert) => (
                      <span key={cert} className="inline-flex items-center gap-1.5 bg-ink text-cream font-mono text-[10px] tracking-wider uppercase py-1.5 px-3 rounded-full">
                        <Check className="w-3 h-3 text-gold" />{cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint block mb-3">
                    Our Physical On-Site Inspection Points
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
                    {(auditResult?.onGroundInspectionChecklist || []).map((point, index) => (
                      <li key={index} className="flex gap-2 text-sm text-ink-light">
                        <span className="font-serif font-semibold text-gold-dark">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-ink text-cream rounded-sm border border-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-2 py-0.5 rounded-sm">How Xinao Protects You</span>
                  </div>
                  <p className="text-xs text-cream/85 leading-relaxed font-light">{auditResult.ourRepresentationStrategy}</p>
                </div>

                <a
                  href="#contact"
                  className="w-full text-center font-mono text-[10px] uppercase tracking-widest font-bold py-4 px-4 rounded-sm transition-all duration-300 block text-white" style={{background:'#1D6FE8'}}
                >
                  Turn This Into a Real Sourcing Plan →
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
