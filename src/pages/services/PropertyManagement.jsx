import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:      "#0a1628",
  navyLight: "#0f1e38",
  navyCard:  "#111f36",
  red:       "#c0202a",
  redDark:   "#9a1822",
  gold:      "#c9a227",
  text:      "#f0ece4",
  muted:     "#8a9ab5",
  border:    "rgba(201,162,39,0.15)",
  green:     "#2ecc71",
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "👥",
    title: "Tenant Management",
    desc: "End-to-end tenant screening, onboarding, lease management, and dispute resolution handled by our dedicated team.",
    stats: "500+ Tenants Managed",
  },
  {
    icon: "💳",
    title: "Rent Collection",
    desc: "Automated rent collection, digital payment systems, arrears tracking, and transparent financial reporting.",
    stats: "99.2% Collection Rate",
  },
  {
    icon: "🔧",
    title: "Maintenance Handling",
    desc: "24/7 maintenance request portal, vetted contractor network, preventive maintenance schedules, and rapid response SLAs.",
    stats: "<4hr Response Time",
  },
  {
    icon: "📡",
    title: "Property Monitoring",
    desc: "Smart security systems, remote CCTV monitoring, utility management, and real-time property health dashboards.",
    stats: "Live 24/7 Monitoring",
  },
];

const CHECKLIST = [
  "Tenant background verification & screening",
  "Digital lease agreement preparation",
  "Monthly rent collection & owner disbursement",
  "Utility bill management & reconciliation",
  "Quarterly property inspection reports",
  "24/7 emergency maintenance response",
  "Annual property valuation updates",
  "Legal compliance & documentation",
  "Insurance coordination & claims handling",
  "Dedicated relationship manager assigned",
];

const DASHBOARD_STATS = [
  { label: "Properties Managed",  value: "340+",   color: C.gold  },
  { label: "Avg. Occupancy Rate", value: "96.4%",  color: C.green },
  { label: "Client Retention",    value: "94%",    color: C.red   },
  { label: "Years Experience",    value: "15+",    color: C.gold  },
];

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function Section({ children, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} data-inview={inView} style={style}>
      {children}
    </div>
  );
}

// ─── CHECKLIST ITEM ───────────────────────────────────────────────────────────
function CheckItem({ text, index, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index * 0.5}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 20px",
        background: C.navyCard,
        border: `1px solid ${C.border}`,
        marginBottom: 8,
        borderRadius: 2,
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 300 }}
        style={{
          width: 22, height: 22, borderRadius: "50%",
          background: `rgba(46,204,113,0.15)`,
          border: `1.5px solid ${C.green}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: 11, color: C.green,
        }}
      >
        ✓
      </motion.div>
      <span style={{ fontSize: 13.5, color: "rgba(240,236,228,0.82)", lineHeight: 1.5 }}>
        {text}
      </span>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PropertyManagement() {
  const checkRef = useRef(null);
  const checkInView = useInView(checkRef, { once: true, margin: "-60px" });

  return (
    <div style={{
      background: C.navy, minHeight: "100vh", paddingTop: 70,
      fontFamily: "'DM Sans', sans-serif", color: C.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative", padding: "88px clamp(20px,6vw,96px) 72px",
        borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}>
        {/* Background grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(201,162,39,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }} />
        {/* Red accent bar top-left */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(180deg, ${C.red} 0%, transparent 100%)` }} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>
            <Link to="/services" style={{ color: C.gold, textDecoration: "none" }}>Services</Link>
            <span style={{ color: C.muted }}>›</span>
            <span style={{ color: C.muted }}>Property Management</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 2, background: C.red }} />
            <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.red }}>
              AKM Property Services
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(38px,6vw,72px)",
            fontWeight: 600, lineHeight: 1.08,
            maxWidth: 720, marginBottom: 24,
          }}>
            Complete Property Management{" "}
            <em style={{ color: C.gold, fontStyle: "italic" }}>Solutions</em>
          </h1>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            From tenant placement to maintenance — AKM handles every aspect of your property with precision, transparency, and 15 years of Islamabad expertise.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{
                display: "inline-block", padding: "14px 36px",
                background: C.red, color: "#fff",
                textDecoration: "none", fontSize: 11,
                letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1,
              }}>
                Get Started
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/portfolio" style={{
                display: "inline-block", padding: "14px 36px",
                background: "transparent",
                border: `1px solid ${C.gold}`,
                color: C.gold, textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1,
              }}>
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── DASHBOARD STATS ───────────────────────────────────────────────── */}
      <Section>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)",
          borderBottom: `1px solid ${C.border}`,
          gap: 1, background: C.border,
          margin: "0 clamp(20px,6vw,96px)",
        }}>
          {DASHBOARD_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              custom={i}
              style={{
                background: C.navyCard, padding: "28px 20px", textAlign: "center",
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 38, fontWeight: 600, color: s.color, lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: C.muted, marginTop: 6 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── SERVICE CARDS ─────────────────────────────────────────────────── */}
      <Section style={{ padding: "80px clamp(20px,6vw,96px)" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
            What We Handle
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, marginBottom: 52,
          }}>
            Our Core Services
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1, background: C.border,
        }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                background: C.navyCard, padding: "36px 28px",
                cursor: "default", position: "relative", overflow: "hidden",
              }}
            >
              {/* Top accent line on hover handled via border */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: 2, background: `linear-gradient(90deg, ${C.red}, transparent)`,
              }} />

              <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 600, marginBottom: 12, color: C.text,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                {s.desc}
              </p>
              <div style={{
                display: "inline-block", padding: "5px 14px",
                background: "rgba(201,162,39,0.08)",
                border: `1px solid ${C.border}`,
                fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase",
                color: C.gold, borderRadius: 1,
              }}>
                {s.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── CHECKLIST + SIDE PANEL ────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(20px,6vw,96px)",
        background: C.navyLight,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
          className="pm-grid"
        >
          {/* Left — Checklist */}
          <div ref={checkRef}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
                Full Scope
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 600, marginBottom: 32,
              }}>
                Everything Included
              </h2>
            </motion.div>

            <div>
              {CHECKLIST.map((item, i) => (
                <CheckItem key={item} text={item} index={i} inView={checkInView} />
              ))}
            </div>
          </div>

          {/* Right — Dashboard mockup */}
          <motion.div
            variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            custom={2}
          >
            <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
              Owner Dashboard
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 600, marginBottom: 32,
            }}>
              Real-Time Visibility
            </h2>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 32 }}>
              Every property owner gets access to our live dashboard — track rent payments, maintenance tickets, occupancy status, and monthly reports all in one place.
            </p>

            {/* Mini dashboard cards */}
            {[
              { label: "Rent Collected This Month", value: "PKR 2.4M", up: true },
              { label: "Open Maintenance Tickets",  value: "3 Active",  up: null },
              { label: "Occupancy Status",          value: "96% Full",  up: true },
              { label: "Next Inspection Due",       value: "12 Jun 2025", up: null },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                variants={fadeIn} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                custom={i}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 20px",
                  background: C.navyCard,
                  border: `1px solid ${C.border}`,
                  marginBottom: 8, borderRadius: 2,
                }}
              >
                <span style={{ fontSize: 13, color: C.muted }}>{row.label}</span>
                <span style={{
                  fontSize: 14, fontWeight: 500,
                  color: row.up === true ? C.green : row.up === false ? C.red : C.gold,
                }}>
                  {row.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{
        padding: "96px clamp(20px,6vw,96px)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,32,42,0.08) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold }}>
              Ready to Start
            </span>
            <div style={{ width: 40, height: 1, background: C.gold }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4.5vw,60px)", fontWeight: 600,
            maxWidth: 700, margin: "0 auto 20px",
            lineHeight: 1.1,
          }}>
            Let Us Manage Your Property{" "}
            <em style={{ color: C.gold }}>Professionally</em>
          </h2>
          <p style={{ fontSize: 15, color: C.muted, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Join 340+ property owners across Islamabad who trust AKM to protect and grow their real estate investments.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{
                display: "inline-block", padding: "16px 44px",
                background: C.red, color: "#fff", textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", borderRadius: 1,
              }}>
                Book a Free Consultation
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/services" style={{
                display: "inline-block", padding: "16px 44px",
                background: "transparent", border: `1px solid rgba(138,154,181,0.35)`,
                color: C.muted, textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", borderRadius: 1,
              }}>
                All Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .pm-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
