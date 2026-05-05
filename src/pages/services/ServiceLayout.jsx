import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ─── SHARED ANIMATION VARIANT ─────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

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
};

// ─── SERVICE HERO ─────────────────────────────────────────────────────────────
// Props: eyebrow, title, highlight, subtitle, badge
export function ServiceHero({ eyebrow, title, highlight, subtitle, badge }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <section
        style={{
          position: "relative",
          padding: "110px clamp(20px,6vw,96px) 80px",
          borderBottom: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage:
              "linear-gradient(rgba(201,162,39,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,162,39,1) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
            pointerEvents: "none",
          }}
        />
        {/* Left red bar */}
        <div
          style={{
            position: "absolute", top: 0, left: 0,
            width: 4, height: "100%",
            background: `linear-gradient(180deg,${C.red} 0%,transparent 100%)`,
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 55% 60% at 80% 50%, rgba(192,32,42,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 780, position: "relative" }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 8,
              marginBottom: 24, fontSize: 11,
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <Link to="/services" style={{ color: C.gold, textDecoration: "none" }}>
              Services
            </Link>
            <span style={{ color: C.muted }}>›</span>
            <span style={{ color: C.muted }}>{badge}</span>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
            }}
          >
            <div style={{ width: 40, height: 2, background: C.red }} />
            <span
              style={{
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                color: C.red, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px,6vw,76px)",
              fontWeight: 600, lineHeight: 1.06,
              color: C.text, marginBottom: 24,
            }}
          >
            {title}{" "}
            <em style={{ color: C.gold, fontStyle: "italic" }}>{highlight}</em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 16, color: C.muted,
              maxWidth: 560, lineHeight: 1.8,
              marginBottom: 44,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                style={{
                  display: "inline-block", padding: "14px 36px",
                  background: C.red, color: "#fff", textDecoration: "none",
                  fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                  borderRadius: 1, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Book Consultation
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/portfolio"
                style={{
                  display: "inline-block", padding: "14px 36px",
                  background: "transparent", border: `1px solid ${C.gold}`,
                  color: C.gold, textDecoration: "none",
                  fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                  borderRadius: 1, fontFamily: "'DM Sans', sans-serif",
                }}
              >
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
// Props: eyebrow, title, highlight, center (bool, default true)
export function SectionLabel({ eyebrow, title, highlight, center = true }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        textAlign: center ? "center" : "left",
        marginBottom: 48,
      }}
    >
      <p
        style={{
          fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
          color: C.gold, marginBottom: 12,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(28px,4vw,52px)",
          fontWeight: 600, color: C.text, lineHeight: 1.1,
        }}
      >
        {title}{" "}
        <span style={{ color: C.gold }}>{highlight}</span>
      </h2>
    </motion.div>
  );
}

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────
// Props: icon (JSX), title, desc, i (index for stagger)
export function FeatureCard({ icon, title, desc, i = 0 }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, transition: { duration: 0.28 } }}
      style={{
        background: C.navyCard,
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        padding: "32px 26px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${C.red}, transparent)`,
        }}
      />
      {/* Icon */}
      <div
        style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(201,162,39,0.08)",
          border: `1px solid rgba(201,162,39,0.2)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22, fontWeight: 600,
          color: C.text, marginBottom: 10,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13.5, color: C.muted,
          lineHeight: 1.75,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────
// Props: num, title, desc, i (index for stagger)
export function ProcessStep({ num, title, desc, i = 0 }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        display: "flex", gap: 20,
        paddingBottom: 28,
        borderBottom: `1px solid rgba(201,162,39,0.08)`,
        marginBottom: 28,
      }}
    >
      {/* Number bubble */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(192,32,42,0.12)",
            border: "1px solid rgba(192,32,42,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 16, fontWeight: 700, color: "#fca5a5",
          }}
        >
          {String(num).padStart(2, "0")}
        </div>
      </div>

      <div>
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20, fontWeight: 600,
            color: C.text, marginBottom: 6,
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: 13.5, color: C.muted,
            lineHeight: 1.75,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ─── SERVICE CTA ──────────────────────────────────────────────────────────────
// Props: heading, highlight, sub, btn
export function ServiceCTA({ heading, highlight, sub, btn }) {
  return (
    <section
      style={{
        padding: "96px clamp(20px,6vw,96px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: C.navyLight,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,32,42,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ position: "relative" }}
      >
        {/* Gold divider */}
        <div
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 12, marginBottom: 20,
          }}
        >
          <div style={{ width: 40, height: 1, background: C.gold }} />
          <span
            style={{
              fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
              color: C.gold, fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Get Started
          </span>
          <div style={{ width: 40, height: 1, background: C.gold }} />
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4.5vw,60px)",
            fontWeight: 600, color: C.text,
            maxWidth: 700, margin: "0 auto 20px",
            lineHeight: 1.1,
          }}
        >
          {heading}{" "}
          <em style={{ color: C.gold }}>{highlight}</em>
        </h2>

        <p
          style={{
            fontSize: 15, color: C.muted,
            maxWidth: 480, margin: "0 auto 44px",
            lineHeight: 1.8,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {sub}
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              style={{
                display: "inline-block", padding: "16px 48px",
                background: C.red, color: "#fff", textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {btn}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/services"
              style={{
                display: "inline-block", padding: "16px 48px",
                background: "transparent",
                border: "1px solid rgba(138,154,181,0.3)",
                color: C.muted, textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              All Services
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
