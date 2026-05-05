import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy:      "#0a1628",
  navyLight: "#0f1e38",
  navyCard:  "#0d1b30",
  red:       "#c0202a",
  gold:      "#c9a227",
  goldDim:   "rgba(201,162,39,0.12)",
  text:      "#f0ece4",
  muted:     "#8a9ab5",
  border:    "rgba(201,162,39,0.15)",
  cream:     "rgba(240,236,228,0.06)",
};

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const zoomIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🛋️",
    title: "Luxury Interiors",
    desc: "Full turnkey interior solutions using premium materials — Italian marble, bespoke millwork, and curated art installations that define prestige living.",
    tag: "Premium Finish",
  },
  {
    icon: "📐",
    title: "Space Planning",
    desc: "Architectural-grade space planning that maximises flow, natural light, and functional beauty across residential and commercial projects.",
    tag: "Functional Design",
  },
  {
    icon: "🪑",
    title: "Custom Furniture Design",
    desc: "Bespoke furniture crafted to your specification — from dining tables to built-in wardrobes — sourced from Islamabad's finest artisans and Italian manufacturers.",
    tag: "Made to Order",
  },
  {
    icon: "🖥️",
    title: "3D Visualization",
    desc: "Photorealistic 3D renders and walkthroughs so you experience every detail before a single nail is driven. Decisions made with total confidence.",
    tag: "Photorealistic",
  },
];

// Gallery items — placeholder gradient tiles with room labels
const GALLERY = [
  { label: "Master Bedroom Suite",  size: "large",  gradient: "linear-gradient(135deg,#1a1a2e,#16213e)",  accent: "#c9a227", icon: "🛏️" },
  { label: "Open-Plan Living",      size: "small",  gradient: "linear-gradient(135deg,#1e1418,#12080e)",  accent: "#c0202a", icon: "🛋️" },
  { label: "Gourmet Kitchen",       size: "small",  gradient: "linear-gradient(135deg,#0d1f17,#060e0a)",  accent: "#2ecc71", icon: "🍽️" },
  { label: "Private Study",         size: "medium", gradient: "linear-gradient(135deg,#1a1628,#0e0a1a)",  accent: "#c9a227", icon: "📚" },
  { label: "Spa Bathroom",          size: "medium", gradient: "linear-gradient(135deg,#0a1e1c,#040c0a)",  accent: "#c9a227", icon: "🛁" },
  { label: "Rooftop Lounge",        size: "small",  gradient: "linear-gradient(135deg,#1e1a0a,#0e0e04)",  accent: "#c9a227", icon: "🌆" },
];

// Before / After data
const BEFORE_AFTER = [
  {
    room: "Living Room Transformation",
    before: { bg: "linear-gradient(135deg,#1a1410,#0a0804)", label: "Before — Standard Finish",  icon: "🏚️" },
    after:  { bg: "linear-gradient(135deg,#1a2d4a,#0d1628)", label: "After — AKM Luxury Design", icon: "🏡" },
    detail: "Complete spatial redesign, Italian limestone flooring, custom joinery, and bespoke lighting scheme.",
  },
  {
    room: "Home Office Redesign",
    before: { bg: "linear-gradient(135deg,#12100a,#080600)", label: "Before — Basic Setup",       icon: "🗃️" },
    after:  { bg: "linear-gradient(135deg,#161428,#0c0a1a)", label: "After — Executive Suite",    icon: "💼" },
    detail: "Built-in bookshelves, acoustic panels, ergonomic custom desk, and layered ambient lighting.",
  },
];

// ─── GALLERY CARD ─────────────────────────────────────────────────────────────
function GalleryCard({ item, index }) {
  const sizes = {
    large:  { gridColumn: "span 2", aspectRatio: "16/9" },
    medium: { gridColumn: "span 1", aspectRatio: "4/3"  },
    small:  { gridColumn: "span 1", aspectRatio: "4/3"  },
  };
  const s = sizes[item.size];

  return (
    <motion.div
      variants={zoomIn} initial="hidden"
      whileInView="visible" viewport={{ once: true }}
      custom={index}
      whileHover={{ scale: 1.025, zIndex: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        gridColumn: s.gridColumn,
        aspectRatio: s.aspectRatio,
        position: "relative", overflow: "hidden",
        cursor: "pointer", borderRadius: 2,
        border: `1px solid ${C.border}`,
      }}
      className="gallery-card"
    >
      <div
        style={{
          width: "100%", height: "100%",
          background: item.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: item.size === "large" ? 80 : 56,
          transition: "transform 0.6s ease",
        }}
        className="gallery-img"
      >
        {item.icon}
      </div>

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(0deg, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 50%, transparent 100%)",
      }} />

      {/* Label */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 20 }}>
        <div style={{
          display: "inline-block", padding: "3px 10px",
          borderLeft: `2px solid ${item.accent}`,
          background: `rgba(10,22,40,0.6)`,
          fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
          color: item.accent, marginBottom: 8,
        }}>
          AKM Design
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: item.size === "large" ? 22 : 17,
          fontWeight: 600, color: C.text,
        }}>
          {item.label}
        </div>
      </div>

      {/* Hover zoom style */}
      <style>{`
        .gallery-card:hover .gallery-img { transform: scale(1.08); }
      `}</style>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function InteriorDesign() {
  return (
    <div style={{
      background: C.navy, minHeight: "100vh", paddingTop: 70,
      fontFamily: "'DM Sans', sans-serif", color: C.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        padding: "88px clamp(20px,6vw,96px) 72px",
        borderBottom: `1px solid ${C.border}`,
        overflow: "hidden",
      }}>
        {/* Diagonal accent */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "45%", height: "100%",
          background: "linear-gradient(135deg, transparent 40%, rgba(201,162,39,0.04) 100%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 4, height: "100%",
          background: `linear-gradient(0deg, ${C.gold} 0%, transparent 100%)`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 800 }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>
            <Link to="/services" style={{ color: C.gold, textDecoration: "none" }}>Services</Link>
            <span style={{ color: C.muted }}>›</span>
            <span style={{ color: C.muted }}>Interior Design</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold }}>
              AKM Design Studio
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(38px,6vw,76px)",
            fontWeight: 600, lineHeight: 1.06, marginBottom: 24,
          }}>
            Elegant Interior Design{" "}
            <em style={{ color: C.gold, fontStyle: "italic" }}>for Modern Living</em>
          </h1>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>
            Where architecture meets artistry. AKM's design studio transforms raw spaces into timeless environments that breathe luxury, purpose, and identity.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{
                display: "inline-block", padding: "14px 36px",
                background: C.gold, color: C.navy,
                textDecoration: "none", fontSize: 11,
                letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1, fontWeight: 600,
              }}>
                Start Your Project
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a href="#gallery" style={{
                display: "inline-block", padding: "14px 36px",
                background: "transparent",
                border: `1px solid rgba(138,154,181,0.35)`,
                color: C.muted, textDecoration: "none",
                fontSize: 11, letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1,
              }}>
                View Gallery ↓
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(20px,6vw,96px)" }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
            Our Capabilities
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 600,
          }}>
            Design Services
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: C.navyCard,
                border: `1px solid ${C.border}`,
                padding: "36px 28px",
                position: "relative", overflow: "hidden",
                borderRadius: 2,
              }}
            >
              {/* Gold corner accent */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 48, height: 48,
                borderBottom: `1px solid ${C.border}`,
                borderLeft: `1px solid ${C.border}`,
                background: C.goldDim,
              }} />

              <div style={{ fontSize: 38, marginBottom: 22 }}>{s.icon}</div>
              <div style={{
                display: "inline-block", padding: "3px 10px", marginBottom: 14,
                fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
                borderLeft: `2px solid ${C.gold}`,
                background: C.goldDim, color: C.gold,
              }}>
                {s.tag}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 24, fontWeight: 600, marginBottom: 12,
              }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── GALLERY GRID ──────────────────────────────────────────────────── */}
      <section id="gallery" style={{
        padding: "0 clamp(20px,6vw,96px) 80px",
        borderTop: `1px solid ${C.border}`,
        paddingTop: 80,
      }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
            Completed Spaces
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 600,
          }}>
            Design Gallery
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
          className="id-gallery"
        >
          {GALLERY.map((item, i) => (
            <GalleryCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────────── */}
      <section style={{
        padding: "80px clamp(20px,6vw,96px)",
        background: C.navyLight,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 52 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
            The Transformation
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 600,
          }}>
            Before & After
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {BEFORE_AFTER.map((ba, i) => (
            <motion.div
              key={ba.room}
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              custom={i}
            >
              <p style={{
                fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
                color: C.muted, marginBottom: 14,
              }}>
                {ba.room}
              </p>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 8, marginBottom: 14,
              }}
                className="ba-grid"
              >
                {/* Before */}
                <div style={{
                  aspectRatio: "16/7",
                  background: ba.before.bg,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  border: `1px solid rgba(138,154,181,0.15)`,
                  borderRadius: 2, position: "relative",
                }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{ba.before.icon}</div>
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    padding: "4px 12px", background: "rgba(10,22,40,0.8)",
                    fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
                    color: C.muted, border: `1px solid rgba(138,154,181,0.2)`,
                    borderRadius: 1,
                  }}>
                    Before
                  </div>
                  <p style={{ fontSize: 12, color: C.muted, letterSpacing: "0.5px" }}>{ba.before.label}</p>
                </div>

                {/* After */}
                <div style={{
                  aspectRatio: "16/7",
                  background: ba.after.bg,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  border: `1px solid ${C.border}`,
                  borderRadius: 2, position: "relative",
                }}>
                  <div style={{ fontSize: 52, marginBottom: 12 }}>{ba.after.icon}</div>
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    padding: "4px 12px", background: "rgba(10,22,40,0.8)",
                    fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
                    color: C.gold, border: `1px solid ${C.border}`,
                    borderRadius: 1,
                  }}>
                    After
                  </div>
                  <p style={{ fontSize: 12, color: C.gold, letterSpacing: "0.5px" }}>{ba.after.label}</p>
                </div>
              </div>

              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                <span style={{ color: C.gold }}>↳ </span>{ba.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px clamp(20px,6vw,96px)" }}>
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          style={{ marginBottom: 52 }}
        >
          <p style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold, marginBottom: 12 }}>
            How We Work
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4vw,52px)", fontWeight: 600,
          }}>
            The Design Process
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 1, background: C.border,
        }}>
          {[
            { step: "01", title: "Discovery",      desc: "Site survey, lifestyle brief, and vision alignment session with your dedicated designer." },
            { step: "02", title: "Concept Design", desc: "Mood boards, material palettes, and spatial layout options presented for your approval." },
            { step: "03", title: "3D Visualization",desc: "Photorealistic renders of every room. You see it before we build it." },
            { step: "04", title: "Execution",       desc: "Our in-house team handles procurement, installation, and quality control end-to-end." },
          ].map((p, i) => (
            <motion.div
              key={p.step}
              variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              custom={i}
              style={{
                background: C.navyCard, padding: "36px 28px",
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 52, fontWeight: 700,
                color: "rgba(201,162,39,0.15)",
                lineHeight: 1, marginBottom: 16,
              }}>
                {p.step}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20, fontWeight: 600, marginBottom: 10,
              }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{
        padding: "96px clamp(20px,6vw,96px)",
        textAlign: "center",
        position: "relative", overflow: "hidden",
        borderTop: `1px solid ${C.border}`,
        background: C.navyLight,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <motion.div
          variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 40, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.gold }}>
              Begin Your Transformation
            </span>
            <div style={{ width: 40, height: 1, background: C.gold }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px,4.5vw,60px)", fontWeight: 600,
            maxWidth: 700, margin: "0 auto 20px", lineHeight: 1.1,
          }}>
            Transform Your Space with{" "}
            <em style={{ color: C.gold }}>AKM Design</em>
          </h2>
          <p style={{ fontSize: 15, color: C.muted, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.8 }}>
            Book a complimentary design consultation and let our studio create a space that is unmistakably yours.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{
                display: "inline-block", padding: "16px 44px",
                background: C.gold, color: C.navy,
                textDecoration: "none", fontSize: 11,
                letterSpacing: "3px", textTransform: "uppercase",
                borderRadius: 1, fontWeight: 600,
              }}>
                Book Design Consultation
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

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .id-gallery { grid-template-columns: 1fr !important; }
          .id-gallery > * { grid-column: span 1 !important; }
          .ba-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
