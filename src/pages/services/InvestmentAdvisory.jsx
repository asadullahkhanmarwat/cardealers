import { motion } from "framer-motion";
import { ServiceHero, SectionLabel, FeatureCard, ServiceCTA, fadeUp } from "./ServiceLayout";

const services = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
    title: "Investment Consultation",
    desc: "One-on-one advisory sessions with senior consultants who analyze your capital, risk profile, and investment timeline to craft a tailored property strategy.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM3 9h18M9 3v18" /></svg>,
    title: "Market Analysis",
    desc: "Comprehensive research reports covering sector-wise price trends, supply-demand dynamics, and emerging micro-markets in Islamabad and Rawalpindi.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20l5-8 4 4 4-6 5 10H3z" /></svg>,
    title: "ROI Forecasting",
    desc: "Data-driven projections using historical appreciation rates, rental yield benchmarks, and infrastructure growth multipliers to forecast 5–10 year returns.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    title: "Risk Assessment",
    desc: "Thorough due diligence covering legal title, developer credibility, regulatory compliance, and market timing to protect every investment decision.",
  },
];

const stats = [
  { num: "₨4.5B+", label: "Client Investments Managed" },
  { num: "22%", label: "Average Annual ROI Achieved" },
  { num: "300+", label: "Investors Advised" },
  { num: "97%", label: "Client Retention Rate" },
];

const steps = [
  { step: "01", title: "Initial Assessment", desc: "We evaluate your financial position, goals, and risk appetite through a structured discovery session." },
  { step: "02", title: "Market Research", desc: "Our analysts compile custom market intelligence reports relevant to your target investment category." },
  { step: "03", title: "Strategy Presentation", desc: "A detailed investment roadmap is presented with multiple scenario models and projected outcomes." },
  { step: "04", title: "Execution Support", desc: "We accompany you through transaction, legal review, and property registration for a seamless close." },
  { step: "05", title: "Portfolio Monitoring", desc: "Ongoing quarterly portfolio reviews with rebalancing advice as market conditions evolve." },
];

export default function InvestmentAdvisory() {
  return (
    <div className="min-h-screen" style={{ background: "#0f172a", color: "#f5f5f5", fontFamily: "'Outfit', sans-serif" }}>

      <ServiceHero
        eyebrow="Advisory Services"
        title="Smart Real Estate"
        highlight="Investment Guidance"
        subtitle="Evidence-based investment strategies combining Islamabad market expertise with global best practices — helping you build a high-performing property portfolio."
        badge="Investment Advisory"
      />

      {/* ── SERVICES ── */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel eyebrow="Our Advisory Services" title="Guidance at" highlight="Every Stage" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => <FeatureCard key={s.title} {...s} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── STATS + PROCESS — 2 col ── */}
      <section className="py-20 px-5" style={{ background: "rgba(30,41,59,0.3)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: stats */}
            <div>
              <SectionLabel eyebrow="Track Record" title="Our Investment" highlight="Results" center={false} />
              <div className="grid grid-cols-2 gap-5">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="rounded-2xl p-6"
                    style={{ background: "linear-gradient(145deg, #1e293b, #16202f)", border: "1px solid rgba(201,162,39,0.15)" }}
                  >
                    <div className="font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#c9a227" }}>{s.num}</div>
                    <div className="text-slate-400 text-sm">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: process */}
            <div>
              <SectionLabel eyebrow="Our Process" title="How We" highlight="Work" center={false} />
              <div className="space-y-0">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex gap-5 pb-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(192,32,42,0.15)", border: "1px solid rgba(192,32,42,0.35)", color: "#fca5a5" }}>
                        {s.step}
                      </div>
                      {i < steps.length - 1 && <div className="w-px mx-auto mt-1" style={{ height: "28px", background: "rgba(201,162,39,0.12)" }} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1" style={{ fontSize: "0.95rem" }}>{s.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceCTA
        heading="Maximize Your"
        highlight="Real Estate Returns"
        sub="Speak with our senior advisors today. First consultation is free — because your financial success is our portfolio."
        btn="Book Free Consultation"
      />
    </div>
  );
}
