import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NAVY  = "#0f172a";
const NAVY2 = "#1e293b";
const RED   = "#c0202a";
const GOLD  = "#c9a227";

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const team = [
  {
    name: "A.K. Marwat", role: "Founder & CEO", exp: "16+ years in real estate development",
    years: "16 yrs", skills: ["Leadership", "Strategy", "Development", "Investments"],
  },
  {
    name: "Ali Ahmed", role: "Project Manager", exp: "11+ years managing large-scale builds",
    years: "11 yrs", skills: ["Agile PM", "Budgeting", "Scheduling", "Risk Mgmt"],
  },
  {
    name: "Usman Raza", role: "Civil Engineer", exp: "9+ years in structural engineering",
    years: "9 yrs", skills: ["Structural", "AutoCAD", "Site Safety", "QA/QC"],
  },
  {
    name: " Malik Riaz", role: "Real Estate Consultant", exp: "8+ years advising premium clients",
    years: "8 yrs", skills: ["Valuation", "Market Analysis", "Negotiation", "CRM"],
  },
];

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const active = hovered || tapped;

  return (
    <FadeUp delay={0.06 + index * 0.1}>
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 260 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setTapped(t => !t)}
        style={{ background: NAVY2, border: "1px solid #1e3a5f", borderRadius: "1.25rem", overflow: "hidden",
          boxShadow: active ? "0 28px 56px rgba(192,32,42,.22)" : "none", cursor: "pointer" }}
      >
        {/* Image area */}
        <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(160deg,#243447,#0f172a)",
            display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ width: 110, height: 155, borderRadius: "55px 55px 0 0", background: "linear-gradient(to bottom,#2a3a50,#1a2535)" }} />
          </div>
          {/* Experience badge */}
          <div style={{ position: "absolute", top: "1rem", right: "1rem", background: GOLD, color: NAVY,
            fontFamily: "'DM Sans',sans-serif", fontSize: ".65rem", fontWeight: 700,
            padding: ".3rem .65rem", borderRadius: 999 }}>
            {member.years}
          </div>
          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(192,32,42,.92) 0%, transparent 55%)",
              display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1rem" }}>
              {member.skills.map(s => (
                <span key={s} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".6rem", fontWeight: 600,
                  letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(255,255,255,.15)",
                  color: "#fff", borderRadius: 999, padding: ".25rem .6rem", border: "1px solid rgba(255,255,255,.25)" }}>
                  {s}
                </span>
              ))}
            </div>
            <a href="#" onClick={e => e.stopPropagation()}
              style={{ display: "flex", alignItems: "center", gap: ".4rem", fontFamily: "'DM Sans',sans-serif",
                fontSize: ".7rem", fontWeight: 600, color: "#fff", textDecoration: "none",
                letterSpacing: ".1em", textTransform: "uppercase" }}>
              <LinkedInIcon /> View LinkedIn
            </a>
          </motion.div>
        </div>
        {/* Body */}
        <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".6rem", letterSpacing: ".2em",
            textTransform: "uppercase", color: RED, marginBottom: ".3rem" }}>{member.role}</p>
          <p style={{ fontSize: "1.35rem", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2 }}>{member.name}</p>
          <div style={{ height: 1, margin: "1rem 0", background: `linear-gradient(to right, ${RED}, transparent)` }} />
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".75rem", color: "#94a3b8" }}>{member.exp}</p>
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

export default function TeamPage() {
  return (
    <div style={{ backgroundColor: NAVY, fontFamily: "'Cormorant Garamond',Georgia,serif", color: "#e2e8f0", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap'); body{margin:0}`}</style>

      {/* Hero */}
      <section style={{ position: "relative", padding: "7rem 1.5rem 5rem", textAlign: "center",
        background: "linear-gradient(170deg,#0f172a 55%,#1a0a0c)", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: RED,
          top: -350, left: "50%", transform: "translateX(-50%)", filter: "blur(130px)", opacity: .07 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".65rem", letterSpacing: ".3em", textTransform: "uppercase", color: GOLD, marginBottom: ".75rem" }}>
          The People Behind AKM
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .1 }}
          style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.1, color: "#fff" }}>
          Meet Our <em style={{ color: RED, fontStyle: "italic" }}>Expert</em><br />Team
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .25 }}
          style={{ fontFamily: "'DM Sans',sans-serif", marginTop: "1.25rem", fontSize: ".95rem", lineHeight: 1.9,
            color: "#94a3b8", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          A curated team of visionaries, engineers, and consultants — united by one goal.
        </motion.p>
      </section>

      {/* Team grid */}
      <section style={{ padding: "5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp className="text-center" style={{ textAlign: "center", marginBottom: "1rem" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".65rem", letterSpacing: ".3em",
              textTransform: "uppercase", color: RED, marginBottom: ".5rem" }}>Our People</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#f1f5f9" }}>
              Talent That <span style={{ color: GOLD }}>Builds Trust</span>
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.75rem", marginTop: "3.5rem" }}>
            {team.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
