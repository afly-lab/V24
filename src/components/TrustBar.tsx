import React from "react";
import { ShieldCheck, MapPin, Percent, Globe } from "lucide-react";

export default function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: "WFOE Registered", sub: "Feb 2026, Hangzhou PRC", color: "#1D6FE8" },
    { icon: MapPin,      label: "Physically On-Ground", sub: "Xihu District, Hangzhou", color: "#0d9488" },
    { icon: Percent,     label: "0% Commission", sub: "Flat fee — zero supplier markup", color: "#B8895A" },
    { icon: Globe,       label: "6 Export Markets", sub: "GCC · USA · EU · CA · AU · IN", color: "#6d28d9" },
  ];

  return (
    <div className="trust-bar py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x" style={{borderColor:'rgba(11,31,58,0.08)'}}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-3 px-0 md:px-6 first:pl-0 last:pr-0">
                <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{background:`${item.color}14`}}>
                  <Icon className="w-4 h-4" style={{color: item.color}} />
                </div>
                <div>
                  <p className="font-sans font-semibold text-xs" style={{color:'#0B1F3A'}}>{item.label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider" style={{color:'#4a7aab'}}>{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
