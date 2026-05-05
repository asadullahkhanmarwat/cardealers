import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Team from "./pages/Team.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Blog from "./pages/Blog.jsx";
import Contact from "./pages/Contact.jsx";

import ResidentialDevelopment from "./pages/services/ResidentialDevelopment.jsx";
import CommercialProperties from "./pages/services/CommercialProperties.jsx";
import InvestmentAdvisory from "./pages/services/InvestmentAdvisory.jsx";
import PropertyManagement from "./pages/services/PropertyManagement.jsx";
import InteriorDesign from "./pages/services/InteriorDesign.jsx";

/* ─── Google Fonts ─── */
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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* services mega menu */}
        <Route path="/services/residential-development" element={<ResidentialDevelopment />} />
        <Route path="/services/commercial-properties" element={<CommercialProperties />} />
        <Route path="/services/investment-advisory" element={<InvestmentAdvisory />} />
        <Route path="/services/property-management" element={<PropertyManagement />} />
        <Route path="/services/interior-design" element={<InteriorDesign />} />
      </Routes>
    </>
  );
}

export default App;