import { motion } from "framer-motion";
import { ServiceHero, SectionLabel, FeatureCard, ProcessStep, ServiceCTA, fadeUp } from "./ServiceLayout";

const offerings = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V11L12 3l9 8v10H15v-6H9v6H3z" /></svg>,
    title: "Luxury Apartments",
    desc: "Thoughtfully designed high-rise apartments featuring premium finishes, panoramic views, and smart-home integrations in F-6 and surrounding sectors.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V9L12 2l9 7v12H3z" /><rect x="9" y="14" width="6" height="7" /></svg>,
    title: "Villas & Homes",
    desc: "Spacious, architect-designed villas with private gardens, double-height ceilings, and bespoke interior options tailored to each family's lifestyle.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="1" /><path d="M6 7V5a2 2 0 014 0v2M14 7V5a2 2 0 014 0v2M2 12h20" /></svg>,
    title: "Gated Communities",
    desc: "Secure, self-contained residential enclaves offering clubhouses, parks, 24/7 security, and a strong sense of community in prime Islamabad locations.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10" r="3" /></svg>,
    title: "Smart Housing Projects",
    desc: "Future-ready residences integrating IoT systems, energy-efficient design, automated security, and high-speed connectivity infrastructure.",
  },
];

const processes = [
  { title: "Land Acquisition", desc: "We identify and secure prime plots with full legal due diligence, ensuring clean title and strategic location value." },
  { title: "Planning & Design", desc: "Our architects and urban planners craft detailed master plans, unit layouts, and 3D renders for complete project visualization." },
  { title: "Construction", desc: "Premium materials, certified contractors, and strict quality oversight across every phase — from foundation to fit-out." },
  { title: "Delivery & Handover", desc: "Smooth handover process with full documentation, snag resolution, and post-handover support for every client." },
];

const whyUs = [
  { label: "200+", sub: "Residential Units Delivered" },
  { label: "18+", sub: "Years in Islamabad Market" },
  { label: "100%", sub: "Legal Title Guarantee" },
  { label: "5★", sub: "Client Satisfaction Rating" },
];

export default function ResidentialDevelopment() {
  return (
    <div className="min-h-screen" style={{ background: "#0f172a", color: "#f5f5f5", fontFamily: "'Outfit', sans-serif" }}>

      <ServiceHero
        eyebrow="Residential Services"
        title="Luxury Residential Development"
        highlight="in Islamabad"
        subtitle="High-end living spaces crafted with precision — from intimate villas to landmark apartment towers, every AKM home is a statement of elevated living."
        badge="Residential Development"
      />

      {/* ── WHAT WE OFFER ── */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel eyebrow="What We Offer" title="Everything You Need in" highlight="One Developer" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((o, i) => <FeatureCard key={o.title} {...o} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY AKM ── */}
      <section className="py-16 px-5" style={{ background: "rgba(30,41,59,0.35)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl p-6"
                style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(201,162,39,0.12)" }}
              >
                <div className="font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", color: "#c9a227" }}>{w.label}</div>
                <div className="text-slate-400 text-sm">{w.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionLabel eyebrow="Our Process" title="How We" highlight="Deliver" center={false} />
            <div />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
            <div>
              {processes.map((p, i) => (
                <ProcessStep key={p.title} num={i + 1} title={p.title} desc={p.desc} i={i} />
              ))}
            </div>
            {/* Decorative side panel */}
            <motion.div
              className="hidden lg:flex flex-col justify-center rounded-2xl p-10 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1e293b, #16202f)", border: "1px solid rgba(201,162,39,0.15)" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(192,32,42,0.12) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#c9a227" }}>Our Commitment</p>
              <h3 className="font-bold text-white mb-4 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem" }}>
                Building Homes, <br /><span style={{ color: "#c9a227" }}>Building Futures</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Every AKM residential project undergoes rigorous quality assurance at each phase. We don't just build structures — we craft environments where families flourish for generations.
              </p>
              <div className="space-y-3">
                {["CDA-Approved Projects", "Premium Material Guarantee", "On-Time Delivery Promise", "Post-Handover Support"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(192,32,42,0.2)", border: "1px solid rgba(192,32,42,0.4)" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fca5a5" strokeWidth="1.5"><path d="M2 5l2 2 4-4" /></svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServiceCTA
        heading="Build Your Dream Home"
        highlight="with AKM"
        sub="From first consultation to final handover — we make your residential vision a flawless reality."
        btn="Schedule a Site Visit"
      />
    </div>
  );
}
