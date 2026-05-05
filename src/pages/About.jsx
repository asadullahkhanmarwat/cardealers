import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

// ── Tokens ────────────────────────────────────────────────────────────────────
const NAVY  = "#0f172a";
const RED   = "#c0202a";
const GOLD  = "#c9a227";
const NAVY2 = "#1e293b";

// ── Reusable animated wrapper ────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
const timeline = [
  {
    year: "2008",
    title: "Establishment",
    desc: "AKM Real State & Builders was founded in the heart of F-6, Islamabad — with a singular vision: build spaces worthy of Pakistan's capital.",
  },
  {
    year: "2013",
    title: "First Major Project",
    desc: "Delivered our landmark residential complex in Blue Area, setting a new benchmark for luxury living in Islamabad.",
  },
  {
    year: "2018",
    title: "Islamabad Expansion",
    desc: "Expanded across F-6, F-7, and E-11 sectors, completing over 40 high-end properties and earning the trust of 300+ families.",
  },
  {
    year: "2024",
    title: "Legacy Continues",
    desc: "With a portfolio spanning residential, commercial, and mixed-use developments — AKM remains Islamabad's most trusted name in real estate.",
  },
];

const values = [
  { icon: "🤝", label: "Trust", desc: "Every relationship is built on transparent dealings and unwavering honesty." },
  { icon: "🏛️", label: "Quality", desc: "We use premium materials and precision engineering — no compromises." },
  { icon: "💡", label: "Innovation", desc: "Modern architecture meets smart design to create future-ready spaces." },
  { icon: "⚖️", label: "Integrity", desc: "Our word is our bond. Commitments made are commitments kept." },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div
      style={{ backgroundColor: NAVY, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#e2e8f0" }}
      className="min-h-screen overflow-x-hidden"
    >
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        body { margin: 0; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .gold { color: ${GOLD}; }
        .red  { color: ${RED}; }
        ::selection { background: ${RED}; color: #fff; }
        .timeline-line::before {
          content: '';
          position: absolute;
          left: 19px;
          top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, ${RED}, ${GOLD});
        }
      `}</style>

      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-32 px-6 overflow-hidden"
        style={{ background: `linear-gradient(160deg, #0f172a 60%, #1a0a0c)` }}
      >
        {/* decorative circle */}
        <div
          className="absolute rounded-full opacity-10 pointer-events-none"
          style={{ width: 600, height: 600, background: RED, top: -200, right: -200, filter: "blur(120px)" }}
        />
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1 }}
          className="dm uppercase text-xs tracking-widest mb-4"
          style={{ color: GOLD }}
        >
          F-6 Islamabad · Est. 2008
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{ color: "#fff" }}
        >
          Our Story,<br />
          <span style={{ color: RED }}>Our Legacy.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="dm mt-6 text-base md:text-lg max-w-xl leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          We design and build spaces that define modern living in Pakistan's capital.
        </motion.p>
        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 flex flex-col items-center gap-1"
        >
          <span className="dm text-xs tracking-widest" style={{ color: "#475569" }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            style={{ width: 2, height: 28, background: `linear-gradient(to bottom, ${RED}, transparent)` }}
          />
        </motion.div>
      </section>

      {/* ── MISSION + VISION ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <FadeUp>
          <p className="dm text-xs uppercase tracking-widest mb-3" style={{ color: RED }}>Our Mission</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-snug mb-6" style={{ color: "#f1f5f9" }}>
            Building More Than<br />
            <span style={{ color: GOLD }}>Structures</span>
          </h2>
          <p className="dm text-base leading-8" style={{ color: "#94a3b8" }}>
            AKM Real State & Builders exists to transform Islamabad's skyline with
            architecture that is both purposeful and beautiful — homes where families
            thrive, and offices where ambitions are realised.
          </p>
          <div className="mt-8 h-px w-24" style={{ background: `linear-gradient(to right, ${RED}, transparent)` }} />
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{ background: NAVY2, border: `1px solid #1e3a5f` }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20"
              style={{ background: RED }}
            />
            <p className="dm text-xs uppercase tracking-widest mb-4" style={{ color: GOLD }}>Our Vision</p>
            <p className="text-2xl font-semibold leading-relaxed" style={{ color: "#f1f5f9" }}>
              "To be Pakistan's most trusted real estate brand — known for spaces that elevate everyday life."
            </p>
            <div className="mt-6 flex gap-12">
              {[["300+", "Families Served"], ["40+", "Projects Completed"], ["16", "Years Experience"]].map(([num, lbl]) => (
                <div key={lbl}>
                  <p className="text-3xl font-bold" style={{ color: RED }}>{num}</p>
                  <p className="dm text-xs mt-1" style={{ color: "#64748b" }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section style={{ background: NAVY2 }} className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <p className="dm text-xs uppercase tracking-widest text-center mb-2" style={{ color: RED }}>
              Company Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: "#f1f5f9" }}>
              A Decade of <span style={{ color: GOLD }}>Excellence</span>
            </h2>
          </FadeUp>

          {/* Desktop: alternating; Mobile: left-aligned list */}
          <div className="hidden md:block relative">
            {/* centre line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${RED}, ${GOLD})` }}
            />
            <div className="flex flex-col gap-16">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeUp key={item.year} delay={i * 0.15}>
                    <div className={`flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                      {/* Content */}
                      <div className="flex-1">
                        <div
                          className={`rounded-xl p-6 relative ${isLeft ? "text-right" : "text-left"}`}
                          style={{ background: NAVY, border: `1px solid #1e3a5f` }}
                        >
                          <p className="dm text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>{item.year}</p>
                          <p className="text-xl font-bold mb-2" style={{ color: "#f1f5f9" }}>{item.title}</p>
                          <p className="dm text-sm leading-7" style={{ color: "#94a3b8" }}>{item.desc}</p>
                        </div>
                      </div>
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold dm"
                          style={{ background: RED, color: "#fff", boxShadow: `0 0 0 4px ${NAVY2}, 0 0 0 6px ${RED}` }}
                        >
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1" />
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden relative timeline-line pl-12">
            {timeline.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.15} className="mb-10 relative">
                <div
                  className="absolute -left-12 top-1 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold dm z-10"
                  style={{ background: RED, color: "#fff", boxShadow: `0 0 0 3px ${NAVY2}, 0 0 0 5px ${RED}` }}
                >
                  {i + 1}
                </div>
                <div className="rounded-xl p-5" style={{ background: NAVY, border: `1px solid #1e3a5f` }}>
                  <p className="dm text-xs uppercase tracking-widest mb-1" style={{ color: GOLD }}>{item.year}</p>
                  <p className="text-lg font-bold mb-2" style={{ color: "#f1f5f9" }}>{item.title}</p>
                  <p className="dm text-sm leading-7" style={{ color: "#94a3b8" }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <FadeUp>
          <p className="dm text-xs uppercase tracking-widest text-center mb-2" style={{ color: RED }}>What We Stand For</p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: "#f1f5f9" }}>
            Core <span style={{ color: GOLD }}>Values</span>
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <FadeUp key={v.label} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(192,32,42,0.18)` }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-2xl p-7 h-full flex flex-col"
                style={{ background: NAVY2, border: `1px solid #1e3a5f`, cursor: "default" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${RED}22` }}
                >
                  {v.icon}
                </div>
                <p className="text-xl font-bold mb-3" style={{ color: "#f1f5f9" }}>{v.label}</p>
                <p className="dm text-sm leading-7" style={{ color: "#94a3b8" }}>{v.desc}</p>
                <div className="mt-auto pt-6">
                  <div className="h-0.5 w-10" style={{ background: `linear-gradient(to right, ${RED}, ${GOLD})` }} />
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FOUNDER MESSAGE ──────────────────────────────────────────────── */}
      <section style={{ background: NAVY2 }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
          {/* Portrait placeholder */}
          <FadeUp className="md:col-span-2 flex justify-center">
            <div className="relative">
              <div
                className="w-56 h-64 rounded-2xl overflow-hidden flex items-end justify-center"
                style={{ background: `linear-gradient(160deg, #1e293b, #0f172a)`, border: `2px solid ${RED}` }}
              >
                {/* Silhouette placeholder */}
                <div className="w-32 h-44 rounded-full mb-0" style={{ background: "#1a2540" }} />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 rounded-xl px-4 py-3"
                style={{ background: RED }}
              >
                <p className="dm text-xs font-bold text-white uppercase tracking-wider">Founder</p>
                <p className="dm text-xs text-red-100">& Chairman</p>
              </div>
              {/* Gold accent corner */}
              <div
                className="absolute -top-3 -left-3 w-8 h-8 rounded"
                style={{ border: `2px solid ${GOLD}` }}
              />
            </div>
          </FadeUp>

          {/* Message */}
          <FadeUp delay={0.2} className="md:col-span-3">
            <p className="dm text-xs uppercase tracking-widest mb-3" style={{ color: RED }}>A Word from Our Founder</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "#f1f5f9" }}>
              Built on <span style={{ color: GOLD }}>Promise</span>,<br />Delivered with <span style={{ color: GOLD }}>Pride</span>
            </h2>
            <blockquote
              className="text-xl italic leading-10 mb-6"
              style={{ color: "#cbd5e1", borderLeft: `3px solid ${RED}`, paddingLeft: "1.5rem" }}
            >
              "When I founded AKM, my promise was simple — every client who trusts us with their dream will receive nothing less than our absolute best. Sixteen years on, that promise is the foundation every one of our buildings stands upon."
            </blockquote>
            <div>
              <p className="text-2xl font-bold" style={{ color: "#f1f5f9" }}>Asad Khan Marwat</p>
              <p className="dm text-sm mt-1" style={{ color: "#64748b" }}>Founder & Chairman — AKM Real State & Builders</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #1a0a0c, ${NAVY})` }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <FadeUp>
          <p className="dm text-xs uppercase tracking-widest mb-3" style={{ color: GOLD }}>Let's Build Together</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#f1f5f9" }}>
            Ready to Find Your <span style={{ color: RED }}>Dream Space?</span>
          </h2>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="dm inline-block px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest"
            style={{ background: RED, color: "#fff", letterSpacing: "0.15em" }}
          >
            Contact AKM Today
          </motion.a>
        </FadeUp>
      </section>
    </div>
  );
}