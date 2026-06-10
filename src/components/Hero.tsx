import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  const stats = [
    { number: "$0",   label: "Product Markups · Sourcing Agent Fee is 0%" },
    { number: "24h",  label: "Ground Response Guarantee" },
    { number: "100%", label: "Pricing Transparency & Raw Invoices" },
    { number: "6",    label: "Export Markets Served from China" }
  ];

  return (
    <>
      {/* ─── MAIN HERO ─── */}
      <section id="hero" className="relative min-h-[100vh] flex flex-col justify-end pt-32 pb-0 overflow-hidden">
        {/* Background */}
        <div className="hero-img-bg" />
        <div className="hero-img-overlay" />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 relative pb-16">
          <div className="max-w-4xl">
            {/* WFOE trust eyebrow badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="wfoe-badge">
                <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                Registered WFOE · Hangzhou, China
              </div>
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 rounded-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-bold text-white/70">
                  Your Dedicated Mainland Extension
                </span>
              </div>
            </div>

            {/* H1 — DM Sans Bold (not serif) for fast readability */}
            <h1 className="font-sans text-[42px] md:text-[62px] lg:text-[72px] font-bold tracking-tight text-white mb-2 leading-[1.05]">
              Your China Office.<br />
              <span className="font-light italic" style={{ color: "#B8895A" }}>Without the Overhead.</span>
            </h1>

            <div className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 mt-1 flex items-center gap-2" style={{ color: "#B8895A" }}>
              <span className="w-2 h-[1px]" style={{ background: "#B8895A" }} />
              On-Ground Control. Legally Binding. Zero Compromise.
            </div>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-8 font-light">
              <strong className="font-medium" style={{ color: "#D4A574" }}>We step past the digital listing to verify reality on the physical floor</strong> — managing your factories, verifying licenses, inspecting shipments, and negotiating direct prices. No full-time employee risk, no undisclosed agent kickbacks.
            </p>

            {/* Actions — electric blue primary CTA */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16">
              <a
                href="#audit-planner"
                className="inline-flex items-center justify-center gap-2 text-white font-mono text-sm uppercase tracking-wider font-semibold py-4 px-8 rounded-sm transition-all duration-300 shadow-xl btn-cta"
              >
                Run a Free Product Pre-Audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#fba"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-mono text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300"
              >
                See How We Solve FBA Headaches
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/70 hover:border-white/40 hover:text-white font-mono text-sm uppercase tracking-wider py-4 px-8 rounded-sm transition-all duration-300"
              >
                View Pricing Plans
              </a>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10 rounded-sm overflow-hidden">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col p-6 border-r border-white/10 last:border-r-0 bg-black/20 backdrop-blur-sm">
                  <div className="font-sans text-4xl md:text-5xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-2 leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
       </div>
        </div>

      </section>

    
      {/* Photo strip — four corporate B2B images, consistent cool professional grading */}
        <div className="photo-strip relative z-10">
          <div className="photo-strip-item">
            {/* Factory Inspection — inspector with hi-vis vest, tablet, modern assembly line */}
            <img src="https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=85" alt="Factory inspection — inspector with tablet on assembly line" loading="lazy" />
            <div className="photo-strip-label">Factory Inspection</div>
          </div>
          <div className="photo-strip-item">
            {/* Warehouse Logistics — tall organised industrial racking stretching into distance */}
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=85" alt="Warehouse logistics — organised industrial racking" loading="lazy" />
            <div className="photo-strip-label">Warehouse Logistics</div>
          </div>
          <div className="photo-strip-item">
            {/* Quality Control — close-up hands using caliper on electronic components */}
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=85" alt="Quality control — caliper inspection of components" loading="lazy" />
            <div className="photo-strip-label">Quality Control</div>
          </div>
          <div className="photo-strip-item">
            {/* Shipment Prep — neatly stacked branded boxes on pallet, shrink-wrapped */}
            <img src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=85" alt="Shipment prep — uniformly stacked boxes on pallet" loading="lazy" />
            <div className="photo-strip-label">Shipment Prep</div>
          </div>
        </div>
    </>
  );
}
     
