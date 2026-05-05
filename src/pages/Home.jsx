import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";


const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
    :root {
      --navy:  #0f172a;
      --navy2: #1e293b;
      --navy3: #334155;
      --red:   #c0202a;
      --red2:  #e02d38;
      --gold:  #c9a227;
      --gold2: #e8bf4a;
      --cream: #f8f5f0;
      --muted: rgba(248,245,240,0.55);
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body {
      background:var(--navy);
      color:var(--cream);
      font-family:'Montserrat',sans-serif;
      overflow-x:hidden;
    }
    .serif { font-family:'Cormorant Garamond',serif; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:var(--navy); }
    ::-webkit-scrollbar-thumb { background:var(--red); border-radius:2px; }

    .hero-bg {
      background:
        linear-gradient(160deg, rgba(15,23,42,0.93) 0%, rgba(15,23,42,0.62) 50%, rgba(15,23,42,0.9) 100%),
        url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&auto=format&fit=crop') center/cover no-repeat;
    }
    .gold-line { position:relative; display:inline-block; }
    .gold-line::after {
      content:''; position:absolute; bottom:-6px; left:0;
      width:56px; height:2px; background:var(--gold);
    }
    .stat-card {
      background:linear-gradient(135deg,rgba(30,41,59,0.9),rgba(15,23,42,0.95));
      border:1px solid rgba(192,32,42,0.25);
      backdrop-filter:blur(12px);
    }
    .service-card {
      background:var(--navy2);
      border:1px solid rgba(248,245,240,0.06);
      transition:border-color 0.3s, transform 0.3s;
    }
    .service-card:hover { border-color:rgba(192,32,42,0.45); }
    .project-card {
      background:var(--navy2);
      border:1px solid rgba(248,245,240,0.06);
      overflow:hidden;
    }
    .testi-card {
      background:linear-gradient(135deg,var(--navy2),var(--navy));
      border:1px solid rgba(201,162,39,0.18);
    }
    .btn-red {
      background:var(--red); color:#fff;
      font-family:'Montserrat',sans-serif; font-weight:600;
      font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase;
      padding:14px 32px; border:none; cursor:pointer;
      transition:background 0.25s;
    }
    .btn-red:hover { background:var(--red2); }
    .btn-outline {
      background:transparent; color:var(--cream);
      font-family:'Montserrat',sans-serif; font-weight:500;
      font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase;
      padding:13px 32px; border:1px solid rgba(248,245,240,0.35);
      cursor:pointer; transition:all 0.25s;
    }
    .btn-outline:hover { border-color:var(--gold); color:var(--gold); }
    .btn-gold {
      background:var(--gold); color:var(--navy);
      font-family:'Montserrat',sans-serif; font-weight:700;
      font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase;
      padding:14px 32px; border:none; cursor:pointer;
      transition:background 0.25s;
    }
    .btn-gold:hover { background:var(--gold2); }
    .sec-label {
      font-size:0.6rem; font-weight:700;
      letter-spacing:0.28em; text-transform:uppercase; color:var(--red);
      display:flex; align-items:center; gap:10px;
    }
    .dd-item {
      display:block; padding:10px 20px;
      font-size:0.67rem; letter-spacing:0.08em; text-transform:uppercase;
      color:rgba(248,245,240,0.7); text-decoration:none; transition:all 0.18s;
    }
    .dd-item:hover { color:var(--gold); background:rgba(192,32,42,0.07); }
    .nav-link {
      display:block; padding:10px 12px;
      font-size:0.67rem; letter-spacing:0.12em; text-transform:uppercase;
      color:rgba(248,245,240,0.75); text-decoration:none;
      background:none; border:none; cursor:pointer;
      font-family:'Montserrat',sans-serif; white-space:nowrap;
      transition:color 0.2s;
    }
    .nav-link:hover { color:var(--red); }
    .nav-link.active { color:var(--red); }
    .mob-link {
      display:block; width:100%; padding:16px 0;
      border:none; border-bottom:1px solid rgba(248,245,240,0.06);
      font-family:'Montserrat',sans-serif; font-size:0.78rem;
      letter-spacing:0.15em; text-transform:uppercase;
      color:rgba(248,245,240,0.8); text-decoration:none;
      background:none; cursor:pointer; text-align:left; transition:color 0.2s;
    }
    .mob-link:hover { color:var(--red); }
    .arch-grid {
      background-image:
        linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px),
        linear-gradient(90deg,rgba(201,162,39,0.03) 1px, transparent 1px);
      background-size:60px 60px;
    }
  `}</style>
);


/* ─── Framer variants ─── */
const fadeUp = {
  hidden: { opacity:0, y:36 },
  show:   { opacity:1, y:0, transition:{ duration:0.75, ease:[0.25,0.46,0.45,0.94] } },
};
const scaleIn = {
  hidden: { opacity:0, scale:0.88 },
  show:   { opacity:1, scale:1, transition:{ duration:0.6, ease:"easeOut" } },
};
const stagger = (d=0.12) => ({
  hidden:{},
  show:{ transition:{ staggerChildren:d, delayChildren:0.15 } },
});

/* ─── Animated Counter ─── */
function Counter({ target, suffix="+", duration=2000 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let s = null;
    const step = ts => {
      if (!s) s = ts;
      const p = Math.min((ts-s)/duration, 1);
      setCount(Math.floor((1-Math.pow(1-p,3))*target));
      if (p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="serif"
      style={{ color:"var(--gold)", fontSize:"clamp(2.2rem,4vw,3rem)", fontWeight:700, lineHeight:1 }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}


/* ─── Hero ─── */
function Hero() {
  const navTo = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:["start start","end start"] });
  const y       = useTransform(scrollYProgress, [0,1], ["0%","22%"]);
  const opacity = useTransform(scrollYProgress, [0,0.75], [1,0]);

  return (
    <section ref={ref} style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
      {/* Parallax BG */}
      <motion.div style={{ y, position:"absolute", inset:"-10% 0 -10% 0" }} className="hero-bg arch-grid" />

      {/* Vertical accent lines */}
      <div style={{ position:"absolute", top:0, left:0, width:4, height:"100%", background:"linear-gradient(180deg,transparent,var(--red),transparent)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, right:0, width:1, height:"100%", background:"linear-gradient(180deg,transparent,rgba(201,162,39,0.3),transparent)", pointerEvents:"none" }} />

      <motion.div style={{ opacity, position:"relative", zIndex:10, width:"100%", padding:"120px clamp(20px,6vw,80px) 80px" }}>
        {/* Two-column split: text left, card right */}
        <div style={{ display:"flex", alignItems:"center", gap:"clamp(40px,8vw,100px)", flexWrap:"wrap" }}>

          {/* LEFT */}
          <motion.div variants={stagger(0.13)} initial="hidden" animate="show" style={{ flex:"1 1 300px", maxWidth:620 }}>
            <motion.div variants={fadeUp} className="sec-label" style={{ marginBottom:20 }}>
              <span style={{ width:32, height:1.5, background:"var(--red)", display:"inline-block" }} />
              Premium Real Estate · F-6 Islamabad
            </motion.div>

            <motion.h1 variants={fadeUp} className="serif"
              style={{ fontSize:"clamp(2.6rem,6vw,5.2rem)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:6 }}>
              Building{" "}
              <span style={{ color:"var(--red)", fontStyle:"italic" }}>Landmarks.</span>
            </motion.h1>
            <motion.h1 variants={fadeUp} className="serif"
              style={{ fontSize:"clamp(2.6rem,6vw,5.2rem)", fontWeight:700, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:28 }}>
              Creating{" "}
              <span style={{ color:"var(--gold)", fontStyle:"italic" }}>Legacies.</span>
            </motion.h1>

            <motion.p variants={fadeUp}
              style={{ fontSize:"clamp(0.95rem,1.4vw,1.12rem)", lineHeight:1.85, color:"var(--muted)", maxWidth:480, marginBottom:40 }}>
              Pioneering luxury real estate development across Islamabad's most prestigious addresses since 2008 — where architecture meets legacy.
            </motion.p>

            {/* CTA — full width on mobile via flex-wrap */}
            <motion.div variants={fadeUp} style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <motion.button className="btn-red" whileHover={{scale:1.04}} whileTap={{scale:0.97}}
              onClick={()=> navTo("/portfolio")}  style={{ flex:"1 1 150px" }}>Explore Properties</motion.button>
              <motion.button className="btn-outline" whileHover={{scale:1.04}} whileTap={{scale:0.97}}
              onClick={()=> navTo("/contact")}  style={{ flex:"1 1 150px" }}>Book Consultation</motion.button>
            </motion.div>

            {/* Scroll cue */}
            <motion.div variants={fadeUp} style={{ marginTop:56, display:"flex", alignItems:"center", gap:12 }}>
              <motion.div animate={{y:[0,8,0]}} transition={{repeat:Infinity,duration:1.8,ease:"easeInOut"}}
                style={{ width:1, height:48, background:"linear-gradient(180deg,var(--red),transparent)" }} />
              <span style={{ fontSize:"0.58rem", letterSpacing:"0.22em", color:"var(--muted)", textTransform:"uppercase" }}>Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: floating stats card */}
          <motion.div
            initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.85, duration:0.9, ease:[0.25,0.46,0.45,0.94] }}
            style={{ flex:"1 1 240px", maxWidth:320 }}
          >
            <motion.div
              animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:4.5, ease:"easeInOut" }}
              style={{ border:"1px solid rgba(192,32,42,0.35)", background:"rgba(15,23,42,0.78)", backdropFilter:"blur(16px)", padding:"32px 28px" }}
            >
              <div style={{ height:3, background:"linear-gradient(90deg,var(--red),var(--gold))", marginBottom:24 }} />
              <div style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--red)", marginBottom:6 }}>Established</div>
              <div className="serif" style={{ fontSize:"3.5rem", fontWeight:700, lineHeight:1, color:"var(--cream)", marginBottom:4 }}>2008</div>
              <div style={{ fontSize:"0.65rem", letterSpacing:"0.12em", color:"var(--muted)", marginBottom:26 }}>F-6 Markaz, Islamabad</div>

              <div style={{ borderTop:"1px solid rgba(248,245,240,0.07)", paddingTop:18, display:"flex", flexDirection:"column", gap:13 }}>
                {[
                  { label:"Total Projects",    val:"250+" },
                  { label:"Satisfied Clients", val:"1,200+" },
                  { label:"Area Delivered",    val:"4.2M sq.ft" },
                ].map(row=>(
                  <div key={row.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:"0.68rem", color:"var(--muted)" }}>{row.label}</span>
                    <span className="serif" style={{ fontSize:"1.05rem", fontWeight:700, color:"var(--gold)" }}>{row.val}</span>
                  </div>
                ))}
              </div>
              <motion.button className="btn-gold" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
              onClick={()=> navTo("/portfolio")}  style={{ width:"100%", marginTop:22, padding:12 }}>View Portfolio</motion.button>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:180, background:"linear-gradient(transparent,var(--navy))", pointerEvents:"none" }} />
    </section>
  );
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { value:250,  suffix:"+", label:"Projects Completed" },
    { value:16,   suffix:"+", label:"Years Experience"   },
    { value:1200, suffix:"+", label:"Happy Clients"      },
    { value:800,  suffix:"+", label:"Properties Sold"    },
  ];

  return (
    <section style={{ background:"var(--navy2)", borderTop:"1px solid rgba(192,32,42,0.15)", borderBottom:"1px solid rgba(192,32,42,0.15)", padding:"clamp(48px,8vw,80px) clamp(20px,6vw,80px)" }}>
      <motion.div
        variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}
        /* Tailwind-like responsive grid via CSS Grid */
        style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20, maxWidth:1200, margin:"0 auto" }}
      >
        {stats.map(s=>(
          <motion.div key={s.label} variants={scaleIn}
            className="stat-card"
            style={{ borderRadius:2, padding:"clamp(24px,4vw,40px) 28px", textAlign:"center", position:"relative", overflow:"hidden" }}
          >
            <div style={{ position:"absolute", top:0, right:0, width:40, height:40, background:"linear-gradient(225deg,rgba(192,32,42,0.25),transparent)", pointerEvents:"none" }} />
            <Counter target={s.value} suffix={s.suffix} />
            <div style={{ width:32, height:2, background:"var(--red)", margin:"12px auto" }} />
            <div style={{ fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)" }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const projects = [
    { id:"01", name:"The Margalla Residences", type:"Luxury Apartments",  location:"F-7, Islamabad",       status:"Completed",      sColor:"var(--gold)", desc:"36 ultra-premium residences with panoramic views of the Margalla Hills — refined living redefined." },
    { id:"02", name:"AKM Business Tower",      type:"Commercial Complex", location:"Blue Area, Islamabad", status:"Ongoing",        sColor:"var(--red)",  desc:"A landmark 22-storey corporate tower redefining Islamabad's downtown skyline and business culture." },
    { id:"03", name:"Serene Valley Villas",    type:"Gated Community",   location:"E-11, Islamabad",      status:"Launching Soon", sColor:"rgba(248,245,240,0.6)", desc:"Exclusive villas blending contemporary architecture with the natural serenity of Islamabad's green belt." },
  ];

  return (
    <section style={{ padding:"clamp(72px,10vw,120px) clamp(20px,6vw,80px)", maxWidth:1280, margin:"0 auto" }}>
      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}>

        {/* Header row */}
        <motion.div variants={fadeUp}
          style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:20, marginBottom:52 }}>
          <div>
            <div className="sec-label" style={{ marginBottom:14 }}>
              <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
              Our Portfolio
            </div>
            <h2 className="serif gold-line" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700 }}>Featured Projects</h2>
          </div>
          <motion.button className="btn-outline" whileHover={{scale:1.03}} whileTap={{scale:0.97}}>View All Projects</motion.button>
        </motion.div>

        {/* Grid — 1 col mobile, 2 tablet, 3 desktop via auto-fit */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:22 }}>
          {projects.map((p,i)=>(
            <motion.div key={p.id} variants={fadeUp} transition={{ delay:i*0.1 }}
              className="project-card"
              whileHover={{ y:-6, boxShadow:"0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,32,42,0.3)" }}
              style={{ borderRadius:2 }}
            >
              {/* Image placeholder */}
              <div style={{ height:210, background:"linear-gradient(135deg,#1e293b,#0f172a)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                <svg width="100%" height="100%" style={{ position:"absolute", inset:0, opacity:0.13 }}>
                  <line x1="0" y1="210" x2="210" y2="0" stroke="#c0202a" strokeWidth="0.6"/>
                  <line x1="110" y1="210" x2="320" y2="0" stroke="#c9a227" strokeWidth="0.6"/>
                  <line x1="210" y1="210" x2="420" y2="0" stroke="#c0202a" strokeWidth="0.4"/>
                  <rect x="50" y="30" width="300" height="150" fill="none" stroke="#c9a227" strokeWidth="0.5"/>
                </svg>
                <span className="serif" style={{ fontSize:"5rem", fontWeight:700, color:"rgba(192,32,42,0.1)", userSelect:"none", zIndex:1 }}>{p.id}</span>
                <div style={{ position:"absolute", top:14, right:14, padding:"5px 13px", background:"rgba(15,23,42,0.85)", border:`1px solid ${p.sColor}`, fontSize:"0.55rem", letterSpacing:"0.14em", textTransform:"uppercase", color:p.sColor }}>
                  {p.status}
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"linear-gradient(90deg,var(--red),var(--gold))" }} />
              </div>

              <div style={{ padding:"clamp(18px,3vw,26px)" }}>
                <div style={{ fontSize:"0.6rem", letterSpacing:"0.14em", color:"var(--red)", textTransform:"uppercase", marginBottom:9 }}>
                  {p.type} &nbsp;·&nbsp; {p.location}
                </div>
                <h3 className="serif" style={{ fontSize:"clamp(1.15rem,2vw,1.35rem)", fontWeight:700, marginBottom:10, lineHeight:1.2, color:"var(--cream)" }}>{p.name}</h3>
                <p style={{ fontSize:"0.87rem", lineHeight:1.75, color:"var(--muted)", marginBottom:20 }}>{p.desc}</p>
                <motion.a href="#" whileHover={{x:6}}
                  style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:"0.64rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--gold)", textDecoration:"none" }}>
                  View Project →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Services ─── */
function Services() {
  const services = [
    { icon:"◈", title:"Residential Development", desc:"Luxury homes and apartment complexes crafted to the highest standards of elegance and liveability." },
    { icon:"⬡", title:"Commercial Properties",   desc:"Premium offices, retail centers, and mixed-use developments in Islamabad's prime business zones." },
    { icon:"◇", title:"Investment Advisory",      desc:"Strategic high-yield portfolio consulting to maximize real estate returns across the capital." },
    { icon:"◉", title:"Property Management",      desc:"End-to-end management solutions ensuring your assets perform consistently and profitably." },
    { icon:"⬢", title:"Interior Design",          desc:"Bespoke fit-out and interior design services tailored to the luxury end of the market." },
    { icon:"◎", title:"Legal & Documentation",    desc:"Title clearance, contract drafting, and full legal support for every real estate transaction." },
  ];

  return (
    <section style={{ background:"var(--navy2)", padding:"clamp(72px,10vw,120px) clamp(20px,6vw,80px)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-120, top:"50%", transform:"translateY(-50%)", width:500, height:500, border:"1px solid rgba(192,32,42,0.05)", borderRadius:"50%", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:-60,  top:"50%", transform:"translateY(-50%)", width:350, height:350, border:"1px solid rgba(192,32,42,0.08)", borderRadius:"50%", pointerEvents:"none" }} />

      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}>

          <motion.div variants={fadeUp} style={{ textAlign:"center", marginBottom:56 }}>
            <div className="sec-label" style={{ justifyContent:"center", marginBottom:14 }}>
              <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
              What We Offer
              <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
            </div>
            <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, marginBottom:14 }}>
              Our <span style={{ color:"var(--red)", fontStyle:"italic" }}>Services</span>
            </h2>
            <p style={{ maxWidth:460, margin:"0 auto", fontSize:"0.98rem", lineHeight:1.8, color:"var(--muted)" }}>
              From first blueprint to final handover — we deliver uncompromising excellence.
            </p>
          </motion.div>

          {/* 1 col → 2 col → 3 col */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {services.map((s,i)=>(
              <motion.div key={s.title} variants={fadeUp} transition={{ delay:i*0.07 }}
                className="service-card"
                whileHover={{ y:-5 }}
                style={{ borderRadius:2, padding:"clamp(22px,3vw,34px)", cursor:"default" }}
              >
                <div style={{ fontSize:"1.5rem", color:"var(--red)", marginBottom:14, lineHeight:1 }}>{s.icon}</div>
                <div style={{ height:2, width:28, background:"var(--gold)", marginBottom:14 }} />
                <h3 className="serif" style={{ fontSize:"1.18rem", fontWeight:700, marginBottom:10, color:"var(--cream)" }}>{s.title}</h3>
                <p style={{ fontSize:"0.87rem", lineHeight:1.75, color:"var(--muted)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const reviews = [
    { quote:"AKM delivered our dream villa beyond all expectations. Their commitment to quality is unmatched in Islamabad.", name:"Tariq Mahmood", title:"Director, TM Holdings · F-7",     initials:"TM" },
    { quote:"Their advisory helped us achieve 40% ROI on commercial property in 18 months. Truly the best in the business.", name:"Sadia Akhtar",   title:"CEO, Akhtar Enterprises · E-11", initials:"SA" },
    { quote:"From first consultation to handover, AKM's commitment to excellence was unwavering and deeply impressive.", name:"Bilal Chaudhry", title:"Managing Partner, BC Group · G-10",initials:"BC" },
  ];

  return (
    <section style={{ padding:"clamp(72px,10vw,120px) clamp(20px,6vw,80px)", maxWidth:1280, margin:"0 auto" }}>
      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={{ once:true, margin:"-60px" }}>

        <motion.div variants={fadeUp} style={{ textAlign:"center", marginBottom:56 }}>
          <div className="sec-label" style={{ justifyContent:"center", marginBottom:14 }}>
            <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
            Client Stories
            <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
          </div>
          <h2 className="serif" style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700 }}>
            What Our <span style={{ color:"var(--gold)", fontStyle:"italic" }}>Clients Say</span>
          </h2>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
          {reviews.map((r,i)=>(
            <motion.div key={r.name} variants={scaleIn} transition={{ delay:i*0.1 }}
              className="testi-card"
              whileHover={{ y:-4 }}
              style={{ borderRadius:2, padding:"clamp(22px,3vw,34px)" }}
            >
              <div className="serif" style={{ fontSize:"4.5rem", lineHeight:0.7, color:"rgba(201,162,39,0.2)", marginBottom:18, fontStyle:"italic" }}>"</div>
              <p style={{ fontSize:"0.94rem", lineHeight:1.85, color:"rgba(248,245,240,0.78)", marginBottom:26, fontStyle:"italic" }}>{r.quote}</p>
              <div style={{ display:"flex", alignItems:"center", gap:13, borderTop:"1px solid rgba(201,162,39,0.12)", paddingTop:20 }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(192,32,42,0.15)", border:"1px solid rgba(192,32,42,0.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span className="serif" style={{ fontSize:14, fontWeight:700, color:"var(--red)" }}>{r.initials}</span>
                </div>
                <div>
                  <div style={{ fontSize:"0.8rem", fontWeight:600, marginBottom:3, color:"var(--cream)" }}>{r.name}</div>
                  <div style={{ fontSize:"0.62rem", letterSpacing:"0.1em", color:"var(--muted)" }}>{r.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  const navTo = useNavigate();
  return (
    <section style={{ margin:"0 clamp(16px,4vw,60px) 80px", position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#1a0a0b,#0f172a)", border:"1px solid rgba(192,32,42,0.3)" }}>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(192,32,42,0.08),transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:0, width:4, height:"100%", background:"linear-gradient(180deg,var(--red),var(--gold))" }} />

      <div style={{ padding:"clamp(48px,8vw,80px) clamp(28px,6vw,80px)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:32, flexWrap:"wrap" }}>
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <div className="sec-label" style={{ marginBottom:14 }}>
            <span style={{ width:28, height:1.5, background:"var(--red)", display:"inline-block" }} />
            Ready to Invest?
          </div>
          <h2 className="serif" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, lineHeight:1.1 }}>
            Your next landmark investment<br />
            <span style={{ color:"var(--gold)", fontStyle:"italic" }}>starts with a conversation.</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.15 }}
          style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
          <motion.button onClick={()=> navTo("/contact")} className="btn-red" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>Book Consultation</motion.button>
          <motion.button onClick={()=> navTo("/portfolio")} className="btn-outline" whileHover={{scale:1.04}} whileTap={{scale:0.97}}>Browse Properties</motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ background:"var(--navy2)", borderTop:"1px solid rgba(192,32,42,0.15)", padding:"clamp(48px,8vw,72px) clamp(20px,6vw,80px) clamp(24px,4vw,40px)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"clamp(28px,5vw,60px)", marginBottom:44 }}>
          <div>
            <div className="serif" style={{ fontSize:20, fontWeight:700, marginBottom:6, color:"var(--cream)" }}>
              AKM Real State <span style={{ color:"var(--red)" }}>&</span> Builders
            </div>
            <div style={{ fontSize:"0.6rem", letterSpacing:"0.2em", color:"var(--gold)", textTransform:"uppercase", marginBottom:16 }}>F-6, Islamabad · Est. 2008</div>
            <p style={{ fontSize:"0.87rem", lineHeight:1.8, color:"var(--muted)" }}>
              Building landmark properties and creating lasting legacies across Islamabad's finest addresses.
            </p>
            <div style={{ display:"flex", gap:10, marginTop:18 }}>
              {["in","f","tw","yt"].map(s=>(
                <div key={s} style={{ width:32, height:32, border:"1px solid rgba(192,32,42,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.58rem", color:"var(--muted)", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.color="var(--cream)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(192,32,42,0.3)"; e.currentTarget.style.color="var(--muted)"; }}
                >{s}</div>
              ))}
            </div>
          </div>

          {[
            { title:"Properties", links:["Residential","Commercial","Plots","New Launches"] },
            { title:"Company",    links:["About Us","Our Team","Careers","Press"] },
            { title:"Contact",    links:["F-6 Markaz, Islamabad","+92 51 000 0000","info@akmbuilders.pk","Mon–Sat 9AM–6PM"] },
          ].map(col=>(
            <div key={col.title}>
              <div style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--red)", marginBottom:18, fontWeight:700 }}>{col.title}</div>
              {col.links.map(l=>(
                <div key={l} style={{ fontSize:"0.82rem", color:"var(--muted)", marginBottom:10, cursor:"pointer", transition:"color 0.2s" }}
                  onMouseEnter={e=>e.target.style.color="var(--cream)"}
                  onMouseLeave={e=>e.target.style.color="var(--muted)"}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(248,245,240,0.06)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontSize:"0.65rem", color:"var(--muted)" }}>© 2025 AKM Real State & Builders. All rights reserved.</div>
          <div style={{ fontSize:"0.65rem", color:"var(--muted)" }}>Islamabad · Pakistan</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ─── */
export default function HomePage() {
  return (
    <>
      <Fonts />
      <Hero />
      <Stats />
      <FeaturedProjects />
      <Services />
      <Testimonials />
      <CTABanner />
      <Footer />
    </>
  );
}
