import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#audit-planner");

  const navLinks = [
    { label: "Free Pre-Audit", id: "#audit-planner" },
    { label: "FBA Problems", id: "#fba" },
    { label: "Services", id: "#services" },
    { label: "Private Label", id: "#private-label" },
    { label: "Our Model", id: "#compare" },
    { label: "Pricing", id: "#pricing" },
    { label: "About", id: "#about" },
    { label: "FAQ", id: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 220;
      for (const link of navLinks) {
        const el = document.querySelector(link.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const bottom = top + el.getBoundingClientRect().height;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveHash(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollActive);
    handleScroll();
    handleScrollActive();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollActive);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(11,31,58,0.97)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.0) 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        padding: scrolled ? "12px 0" : "16px 0",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center font-serif text-lg font-bold transition-colors duration-300"
            style={{ background: "#1D6FE8", color: "#fff" }}
          >
            XA
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-white drop-shadow-sm">
            XinAo<span style={{ color: "#B8895A" }}>.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={link.id}
                  className="relative font-mono text-xs uppercase tracking-wider transition-colors duration-200 pb-1"
                  style={{
                    color: activeHash === link.id ? "#ffffff" : "rgba(255,255,255,0.72)",
                    fontWeight: activeHash === link.id ? "700" : "400",
                  }}
                  onMouseEnter={e => {
                    if (activeHash !== link.id)
                      (e.currentTarget as HTMLElement).style.color = "#60a5fa";
                  }}
                  onMouseLeave={e => {
                    if (activeHash !== link.id)
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)";
                  }}
                >
                  {link.label}
                  {activeHash === link.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "#1D6FE8" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Book Sourcing Audit — unchanged */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 btn-cta"
          >
            Book Sourcing Audit
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-sm text-white hover:text-white/70 transition-all"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 right-0 shadow-xl overflow-hidden z-50"
            style={{ background: "rgba(11,31,58,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="p-6 space-y-6">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.id}
                      onClick={() => setIsOpen(false)}
                      className="font-mono text-xs uppercase tracking-wider block py-1.5 transition-colors"
                      style={
                        activeHash === link.id
                          ? { color: "#1D6FE8", fontWeight: "700", paddingLeft: "8px", borderLeft: "2px solid #1D6FE8" }
                          : { color: "rgba(255,255,255,0.72)" }
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="h-px my-2" style={{ background: "rgba(255,255,255,0.1)" }}></div>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-white font-mono text-xs uppercase tracking-widest py-3 rounded-sm transition-all duration-300 inline-block font-semibold btn-cta"
              >
                Get Free Sourcing Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
