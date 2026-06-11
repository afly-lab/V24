import React from "react";
import { X, Check, PackageCheck, AlertTriangle } from "lucide-react";

export default function FbaSection() {
  const grievances = [
    { title: "Shipment rejected at Amazon", text: "Wrong FNSKU labels, missing box IDs, non-compliant packaging. Your $8,000 shipment sits stranded in an Amazon warehouse generating storage fees while you scramble to fix it from another continent." },
    { title: "Factory sends wrong specification", text: "The product you receive is different from the sample you approved. Wrong steel grade, different colour, inferior component. You only discover this when customers start leaving 1-star reviews." },
    { title: "Fake certification documents", text: "The factory's CE and FCC certificates look real but cannot be verified. When Amazon requests compliance documentation, your listing gets suspended because the test reports are fabricated." },
    { title: "Alibaba middleman markup", text: "You are paying 20–30% more than the actual factory price because you are buying through export-facing platforms, not the domestic factory channels we work in. That margin gap is what your competitors use to undercut you on price or outspend you on ads." },
    { title: "No one to inspect before shipping", text: "By the time you discover a quality problem, 500 units are already in Amazon's warehouse or your customer's hands. A $150 pre-shipment inspection would have prevented a $5,000 disaster." },
    { title: "Communication delays kill timelines", text: "Time zone differences, language barriers, and slow WeChat responses mean your product launch keeps slipping. Your competitors are already ranking while you are waiting for a factory reply." }
  ];

  const solutions = [
    "Your FNSKU label on every unit, covering the factory barcode",
    "FBA Box ID label on all 4 sides of every carton",
    "Amazon-approved void fill: bubble wrap or air pillows",
    "Individual polybags with suffocation warning where required",
    "Quantity verified and confirmed against your shipment plan",
    "Commercial invoice issued by our registered WFOE entity",
    "English labelling on all outer cartons",
    "Pre-shipment inspection report showing compliance"
  ];

  return (
    <section id="fba" className="bg-cream-dark border-y border-ink/10">

      {/* ── FULL-BLEED INTRO: Amazon FBA fulfillment center ── */}
      <div className="relative w-full min-h-[520px] flex items-center overflow-hidden">
        {/* Background — cinematic Amazon FBA warehouse */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Amazone FBA.png')" }}
          aria-hidden="true"
        />
        {/* Dark overlay bg-black/60 */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-3xl">
            {/* Tag — sharp rectangle, tightly wraps text, no rounded corners */}
            <span
              className="inline-block bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold mb-5"
              style={{ padding: "5px 12px", borderRadius: 0 }}
            >
              Built For Amazon FBA &amp; FBM Sellers
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Every way China sourcing<br />
              <span className="italic font-light text-white/60">goes wrong for FBA sellers</span>
            </h2>
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">
              67% of new FBA sellers face a shipment rejection at least once. Since January 2026, Amazon no longer fixes prep issues at the warehouse — what arrives must be ready. Here is what goes wrong, and exactly what we do instead.
            </p>
          </div>
        </div>
      </div>

      {/* ── 6 grievance cards ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {grievances.map((g, i) => (
            <div key={i} className="bg-cream border border-ink/5 p-8 rounded-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute left-0 bottom-0 w-full h-[3px] bg-red-china scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-sm bg-red-china/5 border border-red-china/20">
                <X className="w-5 h-5 text-red-china" />
              </div>
              <h3 className="font-sans font-semibold text-lg text-ink mb-3">{g.title}</h3>
              <p className="text-ink-faint text-sm leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>

        {/* ── The $8,000 mistake split ── */}
        <div className="bg-ink text-cream rounded-sm border border-gold/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-cream/10">
              <div className="inline-flex items-center gap-2 bg-red-china/10 px-3 py-1 rounded-sm mb-5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-china" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-red-china font-semibold">The $8,000 Mistake</span>
              </div>
              <h3 className="font-serif text-3xl text-cream leading-snug mb-5">
                What the factory ships<br /><span className="italic font-light text-cream/50">when no one is on the ground</span>
              </h3>
              <ul className="space-y-3">
                {["Factory barcode on the product instead of your FNSKU","One shipping label on one side of the carton","Packing peanuts (banned by Amazon) as void fill","No polybag or suffocation warning where required","Quantity that doesn't match your shipment plan","Commercial invoice in the factory's name, not your brand"].map((item,i) => (
                  <li key={i} className="flex gap-3 text-sm text-cream/70 leading-relaxed">
                    <X className="w-4 h-4 text-red-china shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 md:p-12 bg-cream/[0.03]">
              <div className="inline-flex items-center gap-2 bg-gold/10 px-3 py-1 rounded-sm mb-5">
                <PackageCheck className="w-3.5 h-3.5 text-gold" />
                <span className="inline-block bg-gold text-ink font-mono text-[9px] uppercase tracking-[0.1em] font-bold px-2 py-0.5 rounded-sm">What Xinao Ships Instead</span>
              </div>
              <h3 className="font-serif text-3xl text-cream leading-snug mb-5">
                FBA-ready, every time<br /><span className="italic font-light text-gold-light">prepped at our China facility</span>
              </h3>
              <ul className="space-y-3">
                {solutions.map((item,i) => (
                  <li key={i} className="flex gap-3 text-sm text-cream/85 leading-relaxed">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── SECTION 1: Quality Control — full-bleed precision inspector ── */}
        <div className="mt-16 rounded-sm overflow-hidden relative w-full min-h-[500px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Physical Inspection.png')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
            <div className="max-w-2xl">
              <span className="inline-block w-fit bg-gold text-ink font-mono text-[10px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-sm mb-5">
                Quality Control
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
                Physical inspection.<br />
                <span className="italic font-light text-white/60">Before it leaves China.</span>
              </h3>
              <p className="text-white/75 text-base leading-relaxed max-w-xl">
                We pull random units from your actual production run — not the sample the factory hand-picks — and inspect against your approved spec before loading. If anything is wrong, we catch it in China.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
