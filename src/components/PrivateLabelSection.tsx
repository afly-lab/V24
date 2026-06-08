import React from "react";
import { BadgeCheck, ArrowRight } from "lucide-react";

export default function PrivateLabelSection() {
  const steps = [
    { num: "01", title: "Find the product", text: "We locate the exact factory making the product you want — sourced through domestic Chinese channels at true factory price, not the export markup overseas buyers pay." },
    { num: "02", title: "Brand it as yours", text: "Custom logo printed or engraved on the product, custom retail packaging, brand insert cards. Your brand — not a generic listing." },
    { num: "03", title: "Inspect & certify", text: "We physically inspect production, pull test reports in your brand name, and assemble your full compliance file before shipping." },
    { num: "04", title: "FBA-ready ship", text: "FNSKU labels, box IDs, polybags, export docs — your private-label product arrives at Amazon ready to sell under Brand Registry." }
  ];

  return (
    <section id="private-label" className="bg-cream">

      {/* ── SECTION 2: Private Label — full-bleed background image ── */}
      <div className="relative w-full min-h-[560px] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=85')" }}
          aria-hidden="true"
        />
        {/* Dark overlay — left-heavy so text column pops */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(5,10,20,0.88) 0%, rgba(5,10,20,0.78) 50%, rgba(5,10,20,0.55) 100%)" }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">
            <span className="inline-block w-fit bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-5">
              Private Label
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Build your own brand,<br />
              <span className="italic font-light text-white/60">not a generic listing</span>
            </h2>
            <p className="text-white/75 leading-relaxed text-base font-light mb-8">
              A generic product can be hijacked and undercut by any seller. A private-label brand cannot. We turn a factory product into <em className="text-white/90">your</em> product — owned, protected, and impossible to copy on your ASIN.
            </p>

            {/* 3 bullet points */}
            <div className="space-y-3 mb-10 border-t border-white/10 pt-6">
              <div className="flex gap-3 text-sm text-white/80">
                <BadgeCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Custom branding &amp; packaging negotiated on the factory floor</span>
              </div>
              <div className="flex gap-3 text-sm text-white/80">
                <BadgeCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Test reports issued in your brand name — Amazon-defensible</span>
              </div>
              <div className="flex gap-3 text-sm text-white/80">
                <BadgeCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Brand Registry-ready so hijackers get removed fast</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-white font-mono text-[11px] uppercase tracking-widest py-4 px-8 rounded-sm font-bold transition-all duration-300 btn-cta"
            >
              Launch My Private Label <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Step cards ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="bg-cream-dark/40 border border-ink/10 p-7 rounded-sm hover:border-gold/50 transition-all duration-300 group">
              <span className="font-mono text-xs text-gold-dark font-bold">{s.num}</span>
              <h3 className="font-serif text-xl font-medium text-ink mt-3 mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
              <p className="text-sm text-ink-faint leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
