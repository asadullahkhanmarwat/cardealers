import { motion } from "framer-motion";
import { ServiceHero, SectionLabel, FeatureCard, ServiceCTA, fadeUp } from "./ServiceLayout";

const offerings = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="1" /><path d="M8 3v18M2 9h6M2 14h6M14 9h6M14 14h6" /></svg>,
    title: "Office Buildings",
    desc: "Grade-A office towers with flexible floor plates, high-speed infrastructure, underground parking, and premium lobby experiences.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h20v14H2z" /><path d="M6 7V4h12v3M9 12h6M9 16h6" /></svg>,
    title: "Shopping Complexes",
    desc: "Modern retail environments with optimal footfall design, anchor tenant zoning, and high-visibility signage for maximum commercial ROI.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="2" width="18" height="20" rx="1" /><path d="M3 8h18M9 2v6M15 2v6M7 13h2M11 13h2M15 13h2M7 17h2M11 17h2M15 17h2" /></svg>,
    title: "Business Centers",
    desc: "Multi-tenant business hubs offering co-working zones, conference facilities, and serviced offices in Islamabad's key commercial corridors.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V6l9-3 9 3v15H3z" /><path d="M9 21v-6h6v6" /><path d="M9 9h2M13 9h2M9 13h2M13 13h2" /></svg>,
    title: "High-Rise Commercial",
    desc: "Landmark mixed-use towers combining retail podiums, corporate floors, and investment units — engineered for long-term capital appreciation.",
  },
];

const features = [
  { title: "Prime Locations", desc: "All developments are positioned in high-demand commercial zones — F-6, F-7, Blue Area — for maximum visibility and footfall." },
  { title: "ROI-Focused Design", desc: "Every square foot is planned to optimize rental yields and capital value, backed by detailed feasibility analysis." },
  { title: "Modern Architecture", desc: "Internationally inspired facades, LEED-friendly design, and curtain-wall glazing that make a powerful first impression." },
  { title: "Smart Infrastructure", desc: "Fibre-ready cabling, BMS systems, energy-efficient HVAC, and EV charging points as standard in all AKM commercial builds." },
  { title: "Legal Compliance", desc: "Full CDA NOC, SECP registration, and building code compliance handled by our in-house legal and regulatory team." },
  { title: "Investor Support", desc: "Dedicated investor relations team offering payment plans, leaseback options, and resale advisory services post-completion." },
];

export default function CommercialProperties() {
  return (
    <div className="min-h-screen" style={{ background: "#0f172a", color: "#f5f5f5", fontFamily: "'Outfit', sans-serif" }}>

      <ServiceHero
        eyebrow="Commercial Services"
        title="Premium Commercial"
        highlight="Real Estate Solutions"
        subtitle="Strategic commercial developments that blend architectural excellence with investor-grade returns — built for Pakistan's fastest-growing business districts."
        badge="Commercial Properties"
      />

      {/* ── OFFERINGS ── */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel eyebrow="Project Types" title="What We" highlight="Develop" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((o, i) => <FeatureCard key={o.title} {...o} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 px-5" style={{ background: "linear-gradient(180deg, rgba(30,41,59,0.3), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionLabel eyebrow="Why Choose AKM Commercial" title="Built for" highlight="Performance" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 0 30px rgba(192,32,42,0.2)" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex gap-5 p-6 rounded-2xl"
                style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(201,162,39,0.1)" }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ background: "#c0202a" }} />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1.5" style={{ fontSize: "1rem" }}>{f.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTMENT HIGHLIGHTS ── */}
      <section className="py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <SectionLabel eyebrow="Investment Case" title="Commercial Real Estate" highlight="by the Numbers" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "12–18%", label: "Average Annual ROI" },
              { num: "95%", label: "Occupancy Rate" },
              { num: "50+", label: "Commercial Projects" },
              { num: "₨2B+", label: "Total Project Value" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl p-6"
                style={{ background: "linear-gradient(145deg, #1e293b, #16202f)", border: "1px solid rgba(201,162,39,0.15)" }}
              >
                <div className="font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#c9a227" }}>{s.num}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceCTA
        heading="Invest in High-Value"
        highlight="Commercial Spaces"
        sub="Premium commercial assets with guaranteed occupancy support and investor-focused payment plans tailored to your portfolio goals."
        btn="Book an Investor Meeting"
      />
    </div>
  );
}
