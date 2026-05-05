import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const COLORS = {
  navy:      "#0a1628",
  navyLight: "#0f1e38",
  red:       "#c0202a",
  redDark:   "#9a1822",
  gold:      "#c9a227",
  goldLight: "#e8c048",
  text:      "#f0ece4",
  muted:     "#8a9ab5",
};

// ─── PROJECT DATA ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1, name: "F-6 Luxury Apartments", category: "Residential",
    location: "F-6/1, Islamabad", year: "2022", featured: true,
    tagClass: "gold",
    gradient: "linear-gradient(135deg,#1a2d4a,#0a1628)",
    icon: "🏢",
    desc: "A landmark residential development in the heart of F-6, offering 48 premium apartments with panoramic Margalla Hills views. Each unit features Italian marble, smart home integration, and 24-hour concierge.",
    specs: { Units: "48 Apts", Area: "2,400 sqft", Status: "Delivered" },
  },
  {
    id: 2, name: "AKM Commercial Tower", category: "Commercial",
    location: "Blue Area, Islamabad", year: "2021",
    tagClass: "red",
    gradient: "linear-gradient(135deg,#1c1a2e,#0a0a1a)",
    icon: "🏗️",
    desc: "A 22-storey Grade-A commercial tower in Islamabad's premier business district. Houses 140+ corporate offices with double-glazed façade, earthquake-resistant structure, and rooftop access.",
    specs: { Floors: "22 Levels", Area: "180,000 sqft", Status: "Delivered" },
  },
  {
    id: 3, name: "Margalla Heights Villas", category: "Residential",
    location: "E-7, Islamabad", year: "2023",
    tagClass: "gold",
    gradient: "linear-gradient(135deg,#0d1f17,#0a1610)",
    icon: "🏡",
    desc: "Exclusive hillside villa community with 12 bespoke villas, each enjoying unobstructed Margalla Hills views, private pools, landscaped gardens, and full concierge services.",
    specs: { Units: "12 Villas", Area: "6,500 sqft", Status: "Delivered" },
  },
  {
    id: 4, name: "Skyline Business Hub", category: "Commercial",
    location: "Jinnah Avenue, Islamabad", year: "2020",
    tagClass: "red",
    gradient: "linear-gradient(135deg,#1e1a14,#100e08)",
    icon: "🏙️",
    desc: "A mixed-use development blending premium retail, hospitality, and office space. A landmark of Islamabad's commercial skyline since its 2020 completion.",
    specs: { Floors: "14 Levels", Area: "95,000 sqft", Status: "Delivered" },
  },
  {
    id: 5, name: "Riviera Residences F-6", category: "Ongoing",
    location: "F-6/3, Islamabad", year: "2025",
    tagClass: "green",
    gradient: "linear-gradient(135deg,#0a1e1c,#061210)",
    icon: "🏗️",
    desc: "Our flagship ongoing project — 64 ultra-luxury apartments with sky lounges, a health club, and a residents-only rooftop infinity pool. Expected delivery Q3 2025.",
    specs: { Units: "64 Apts", Area: "3,200 sqft", Status: "Q3 2025" },
  },
  {
    id: 6, name: "Executive Business Park", category: "Ongoing",
    location: "G-8 Markaz, Islamabad", year: "2026",
    tagClass: "green",
    gradient: "linear-gradient(135deg,#1a1420,#0e0c14)",
    icon: "🏢",
    desc: "A 28-floor IT and business park with strata-title offices, data-center infrastructure, co-working tiers and a ground-floor retail promenade.",
    specs: { Floors: "28 Levels", Area: "220,000 sqft", Status: "2026" },
  },
  {
    id: 7, name: "Capital Grand Suites", category: "Residential",
    location: "F-8, Islamabad", year: "2019",
    tagClass: "gold",
    gradient: "linear-gradient(135deg,#1a1410,#100c08)",
    icon: "🏡",
    desc: "Boutique serviced apartment suites designed for diplomatic and executive clientele. 30 fully-furnished residences with 5-star amenities.",
    specs: { Units: "30 Suites", Area: "1,800 sqft", Status: "Delivered" },
  },
  {
    id: 8, name: "The Pearl Commercial", category: "Commercial",
    location: "F-10, Islamabad", year: "2018",
    tagClass: "red",
    gradient: "linear-gradient(135deg,#1e1418,#120c10)",
    icon: "🏪",
    desc: "A multi-tenant commercial complex with premium retail, food court, and 6 floors of leasable office space. One of AKM's highest-performing investment-grade assets.",
    specs: { Floors: "9 Levels", Area: "75,000 sqft", Status: "Delivered" },
  },
  {
    id: 9, name: "Greens Townhouse Cluster", category: "Ongoing",
    location: "E-11, Islamabad", year: "2025",
    tagClass: "green",
    gradient: "linear-gradient(135deg,#0d1e12,#081208)",
    icon: "🌿",
    desc: "A boutique eco-sensitive townhouse development — 20 terrace homes with rainwater harvesting, solar-ready rooftops, and car-free pedestrian zones.",
    specs: { Units: "20 Homes", Area: "3,800 sqft", Status: "Late 2025" },
  },
];

const FILTERS = ["All", "Residential", "Commercial", "Ongoing"];

const STATS = [
  { num: "47+",    label: "Projects Delivered" },
  { num: "12",     label: "Ongoing Builds"     },
  { num: "20+",    label: "Years Experience"   },
  { num: "PKR 8B+",label: "Portfolio Value"    },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
};

// ─── TAG STYLES ───────────────────────────────────────────────────────────────
const tagStyles = {
  gold:  { borderColor: COLORS.gold,  background: "rgba(201,162,39,0.1)",  color: COLORS.gold  },
  red:   { borderColor: COLORS.red,   background: "rgba(192,32,42,0.12)",  color: "#e87070"    },
  green: { borderColor: "#4caf7d",    background: "rgba(76,175,125,0.1)",  color: "#4caf7d"    },
};

// ─── SUBCOMPONENTS ─────────────────────────────────────────────────────────────

function Tag({ type, label }) {
  const s = tagStyles[type] || tagStyles.gold;
  return (
    <span
      className="inline-block text-[9px] tracking-[2px] uppercase px-2.5 py-1 mb-2"
      style={{ borderLeft: `2px solid ${s.borderColor}`, ...s }}
    >
      {label}
    </span>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wider" style={{ color: "#4caf7d" }}>
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: "#4caf7d" }}
      />
      Live Construction
    </span>
  );
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, featured, onClick }) {
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${featured ? "col-span-2 max-[600px]:col-span-1" : ""}`}
      style={{ background: COLORS.navyLight, aspectRatio: featured ? "16/9" : "4/3" }}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={index}
      onClick={() => onClick(project)}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
    >
      {/* Background illustration */}
      <div
        className="w-full h-full flex items-center justify-center text-7xl transition-transform duration-700 group-hover:scale-110"
        style={{ background: project.gradient }}
      >
        {project.icon}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background: "linear-gradient(0deg, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.5) 50%, transparent 100%)",
          opacity: 0.75,
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <Tag type={project.tagClass} label={project.category} />
        <h3
          className="text-2xl font-semibold leading-tight mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.text }}
        >
          {project.name}
        </h3>
        <p className="text-xs tracking-wider" style={{ color: COLORS.muted }}>
          {project.location}
        </p>
        <motion.div
          className="flex items-center gap-2 mt-3 text-[11px] tracking-[2px] uppercase"
          style={{ color: COLORS.gold }}
          initial={{ opacity: 0, y: 6 }}
          whileHover={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
        >
          <span className="h-px w-7" style={{ background: COLORS.gold }} />
          View Project
        </motion.div>
      </div>

      {/* Hover CTA override — CSS-only version as fallback */}
      <style>{`
        .group:hover .card-cta-reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </motion.div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const specEntries = Object.entries(project.specs);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: "rgba(5,12,24,0.92)", backdropFilter: "blur(10px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="relative w-full max-w-2xl overflow-y-auto"
        style={{
          background: COLORS.navyLight,
          border: `1px solid rgba(201,162,39,0.2)`,
          borderRadius: 2,
          maxHeight: "90vh",
        }}
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Hero image */}
        <div
          className="h-64 flex items-center justify-center text-8xl relative"
          style={{ background: project.gradient }}
        >
          {project.icon}
          {/* Red accent bar */}
          <div
            className="absolute bottom-0 left-0 h-1 w-24"
            style={{ background: COLORS.red }}
          />
        </div>

        {/* Close */}
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-lg transition-colors duration-200"
          style={{
            background: "rgba(10,22,40,0.85)",
            border: `1px solid rgba(201,162,39,0.2)`,
            color: COLORS.text,
            borderRadius: 1,
          }}
          onClick={onClose}
          onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.red)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(10,22,40,0.85)")}
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8">
          <Tag type={project.tagClass} label={project.category} />
          <h2
            className="text-4xl font-semibold leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.text }}
          >
            {project.name}
          </h2>
          <p
            className="text-xs tracking-widest uppercase mb-5 flex items-center gap-3"
            style={{ color: COLORS.muted }}
          >
            {project.location}
            <span style={{ color: "rgba(138,154,181,0.3)" }}>·</span>
            {project.tagClass === "green"
              ? <LiveBadge />
              : <span style={{ color: "#4caf7d" }}>✓ Completed {project.year}</span>
            }
          </p>

          <div className="h-px mb-5" style={{ background: "rgba(201,162,39,0.15)" }} />

          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(240,236,228,0.72)" }}>
            {project.desc}
          </p>

          {/* Specs grid */}
          <div
            className="grid grid-cols-3 mb-6"
            style={{ border: `1px solid rgba(201,162,39,0.18)`, gap: 1, background: "rgba(201,162,39,0.18)" }}
          >
            {specEntries.map(([key, val]) => (
              <div
                key={key}
                className="text-center py-4 px-3"
                style={{ background: COLORS.navy }}
              >
                <div
                  className="text-2xl font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.gold }}
                >
                  {val}
                </div>
                <div className="text-[10px] tracking-wider uppercase mt-1" style={{ color: COLORS.muted }}>
                  {key}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              className="px-8 py-3 text-[11px] tracking-[3px] uppercase text-white font-medium"
              style={{ background: COLORS.red, borderRadius: 1 }}
              whileHover={{ backgroundColor: COLORS.redDark }}
              whileTap={{ scale: 0.98 }}
            >
              Request Information
            </motion.button>
            <motion.button
              className="px-8 py-3 text-[11px] tracking-[3px] uppercase font-medium"
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.gold}`,
                color: COLORS.gold,
                borderRadius: 1,
              }}
              whileHover={{ backgroundColor: "rgba(201,162,39,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              View Brochure
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  function handleFilterChange(f) {
    if (f === activeFilter) return;
    setActiveFilter(f);
  }

  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: COLORS.navy, fontFamily: "'DM Sans', sans-serif", color: COLORS.text }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.section
        className="relative text-center px-10 pt-16 pb-12"
        style={{
          borderBottom: `1px solid rgba(201,162,39,0.18)`,
          background: "linear-gradient(180deg,rgba(192,32,42,0.07) 0%,transparent 100%)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-[11px] tracking-[4px] uppercase mb-3.5"
          style={{ color: COLORS.gold }}
        >
          AKM Real Estate & Builders — F-6, Islamabad
        </p>
        <h1
          className="font-semibold leading-none mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(44px,7vw,80px)",
          }}
        >
          Our{" "}
          <span style={{ color: COLORS.gold }}>Portfolio</span>
        </h1>
        <p
          className="text-[15px] leading-relaxed max-w-md mx-auto"
          style={{ color: COLORS.muted }}
        >
          Decades of architectural excellence across Islamabad's most prestigious addresses.
        </p>
        <div
          className="w-14 h-0.5 mx-auto mt-6"
          style={{ background: COLORS.red }}
        />
      </motion.section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <motion.div
        className="flex mx-10"
        style={{ borderBottom: `1px solid rgba(201,162,39,0.18)` }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            className="flex-1 text-center py-5 px-4"
            style={{
              borderRight: i < STATS.length - 1 ? `1px solid rgba(201,162,39,0.18)` : "none",
            }}
          >
            <div
              className="text-3xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.gold }}
            >
              {s.num}
            </div>
            <div
              className="text-[10px] tracking-[1.5px] uppercase mt-1"
              style={{ color: COLORS.muted }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── FILTERS ──────────────────────────────────────────── */}
      <motion.div
        className="flex items-center gap-2.5 px-10 py-7 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        {FILTERS.map((f) => (
          <motion.button
            key={f}
            className="flex-shrink-0 px-5 py-2 text-[11px] tracking-[2px] uppercase transition-all duration-300"
            style={{
              borderRadius: 1,
              border: `1px solid ${activeFilter === f ? COLORS.red : "rgba(138,154,181,0.25)"}`,
              background: activeFilter === f ? COLORS.red : "transparent",
              color: activeFilter === f ? "#fff" : COLORS.muted,
              cursor: "pointer",
            }}
            onClick={() => handleFilterChange(f)}
            whileHover={
              activeFilter !== f
                ? { borderColor: COLORS.gold, color: COLORS.gold }
                : {}
            }
            whileTap={{ scale: 0.97 }}
          >
            {f === "All" ? "All Projects" : f}
          </motion.button>
        ))}
      </motion.div>

      {/* ── GRID ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid mx-10 max-[600px]:mx-0"
          style={{
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 1,
            background: "rgba(201,162,39,0.18)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          {filtered.length === 0 ? (
            <div
              className="col-span-3 text-center py-16 text-sm"
              style={{ color: COLORS.muted }}
            >
              No projects in this category yet.
            </div>
          ) : (
            filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={i === 0 && activeFilter === "All"}
                onClick={setSelectedProject}
              />
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
