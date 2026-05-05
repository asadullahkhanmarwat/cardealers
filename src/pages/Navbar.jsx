import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navTo = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobSub, setMobSub] = useState(null);
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth <= 860 : false
    );

    const location = useLocation();
    const isHome = location.pathname === "/";

    const navBg     = (!isHome || scrolled) ? "rgba(15,23,42,0.97)" : "transparent";
    const navBlur   = (!isHome || scrolled) ? "blur(20px)"          : "none";
    const navBorder = (!isHome || scrolled) ? "1px solid rgba(192,32,42,0.2)" : "none";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        const onResize = () => {
            setIsMobile(window.innerWidth <= 860);
            if (window.innerWidth > 860) { setMobileOpen(false); document.body.style.overflow = ""; }
        };
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        const close = () => setOpenMenu(null);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    const toggle = key => setOpenMenu(p => p === key ? null : key);

    const toggleMobile = () => {
        const next = !mobileOpen;
        setMobileOpen(next);
        document.body.style.overflow = next ? "hidden" : "";
    };

    const closeMobile = () => {
        setMobileOpen(false);
        setMobSub(null);
        document.body.style.overflow = "";
    };

    const serviceItems = [
        { label: "Residential Development", path: "/services/residential-development" },
        { label: "Commercial Properties",   path: "/services/commercial-properties"   },
        { label: "Investment Advisory",     path: "/services/investment-advisory"     },
        { label: "Property Management",     path: "/services/property-management"     },
        { label: "Interior Design",         path: "/services/interior-design"         },
    ];

    const links = [
        { label: "Home",      path: "/"         },
        { label: "About",     path: "/about"     },
        { label: "Services",  key:  "services"   },
        { label: "Team",      path: "/team"      },
        { label: "Portfolio", path: "/portfolio" },
        { label: "Blog",      path: "/blog"      },
        { label: "Contact",   path: "/contact"   },
    ];

    const navLinkClass = ({ isActive }) =>
        isActive ? "nav-link active" : "nav-link";

    return (
        <>
            {/* ── Global CSS — always loaded on every page ─────────── */}
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
                    background: var(--navy);
                    color: var(--cream);
                    font-family: 'Montserrat', sans-serif;
                    overflow-x: hidden;
                }
                .serif { font-family: 'Cormorant Garamond', serif; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: var(--navy); }
                ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }
                .nav-link {
                    display: block; padding: 10px 12px;
                    font-size: 0.67rem; letter-spacing: 0.12em; text-transform: uppercase;
                    color: rgba(248,245,240,0.75); text-decoration: none;
                    background: none; border: none; cursor: pointer;
                    font-family: 'Montserrat', sans-serif; white-space: nowrap;
                    transition: color 0.2s;
                }
                .nav-link:hover { color: var(--red); }
                .nav-link.active { color: var(--red); }
                .mob-link {
                    display: block; width: 100%; padding: 16px 0;
                    border: none; border-bottom: 1px solid rgba(248,245,240,0.06);
                    font-family: 'Montserrat', sans-serif; font-size: 0.78rem;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    color: rgba(248,245,240,0.8); text-decoration: none;
                    background: none; cursor: pointer; text-align: left; transition: color 0.2s;
                }
                .mob-link:hover { color: var(--red); }
                .btn-red {
                    background: var(--red); color: #fff;
                    font-family: 'Montserrat', sans-serif; font-weight: 600;
                    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
                    padding: 14px 32px; border: none; cursor: pointer; transition: background 0.25s;
                }
                .btn-red:hover { background: var(--red2); }
                .btn-outline {
                    background: transparent; color: var(--cream);
                    font-family: 'Montserrat', sans-serif; font-weight: 500;
                    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
                    padding: 13px 32px; border: 1px solid rgba(248,245,240,0.35);
                    cursor: pointer; transition: all 0.25s;
                }
                .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
                .btn-gold {
                    background: var(--gold); color: var(--navy);
                    font-family: 'Montserrat', sans-serif; font-weight: 700;
                    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
                    padding: 14px 32px; border: none; cursor: pointer; transition: background 0.25s;
                }
                .btn-gold:hover { background: var(--gold2); }
                .dd-item {
                    display: block; padding: 10px 20px;
                    font-size: 0.67rem; letter-spacing: 0.08em; text-transform: uppercase;
                    color: rgba(248,245,240,0.7); text-decoration: none; transition: all 0.18s;
                }
                .dd-item:hover { color: var(--gold); background: rgba(192,32,42,0.07); }
                .sec-label {
                    font-size: 0.6rem; font-weight: 700;
                    letter-spacing: 0.28em; text-transform: uppercase; color: var(--red);
                    display: flex; align-items: center; gap: 10px;
                }
                .gold-line { position: relative; display: inline-block; }
                .gold-line::after {
                    content: ''; position: absolute; bottom: -6px; left: 0;
                    width: 56px; height: 2px; background: var(--gold);
                }
                .stat-card {
                    background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));
                    border: 1px solid rgba(192,32,42,0.25);
                    backdrop-filter: blur(12px);
                }
                .service-card {
                    background: var(--navy2);
                    border: 1px solid rgba(248,245,240,0.06);
                    transition: border-color 0.3s, transform 0.3s;
                }
                .service-card:hover { border-color: rgba(192,32,42,0.45); }
                .project-card {
                    background: var(--navy2);
                    border: 1px solid rgba(248,245,240,0.06);
                    overflow: hidden;
                }
                .testi-card {
                    background: linear-gradient(135deg, var(--navy2), var(--navy));
                    border: 1px solid rgba(201,162,39,0.18);
                }
                .arch-grid {
                    background-image:
                        linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,162,39,0.03) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .hero-bg {
                    background:
                        linear-gradient(160deg, rgba(15,23,42,0.93) 0%, rgba(15,23,42,0.62) 50%, rgba(15,23,42,0.9) 100%),
                        url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&auto=format&fit=crop') center/cover no-repeat;
                }
            `}</style>

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <motion.nav
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 70,
                    padding: "0 clamp(16px,4vw,48px)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background:     navBg,
                    backdropFilter: navBlur,
                    borderBottom:   navBorder,
                    transition: "all 0.4s ease",
                }}
            >
                {/* ── Logo ───────────────────────────────────────────── */}
                <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, textDecoration: "none" }}>
                    <div style={{ width: 42, height: 42, border: "2px solid var(--red)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <span className="serif" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)" }}>AKM</span>
                        <div style={{ position: "absolute", top: -4, right: -4, width: 9, height: 9, background: "var(--gold)" }} />
                    </div>
                    <div>
                        <div className="serif" style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.04em", lineHeight: 1, color: "var(--cream)" }}>AKM Real Estate</div>
                        <div style={{ fontSize: 8, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase", marginTop: 2 }}>& Builders · Islamabad</div>
                    </div>
                </Link>

                {/* ── Desktop nav ────────────────────────────────────── */}
                {!isMobile && (
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {links.map(item => (
                            <div key={item.label} style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
                                {item.key === "services" ? (
                                    <>
                                        <button
                                            className={`nav-link${openMenu === "services" ? " active" : ""}`}
                                            onClick={() => toggle("services")}
                                            style={{ display: "flex", alignItems: "center", gap: 5 }}
                                        >
                                            {item.label}
                                            <span style={{
                                                width: 8, height: 8,
                                                borderRight: "1.5px solid currentColor",
                                                borderBottom: "1.5px solid currentColor",
                                                display: "inline-block",
                                                transform: openMenu === "services"
                                                    ? "rotate(-135deg) translateY(-2px)"
                                                    : "rotate(45deg) translateY(-2px)",
                                                transition: "transform 0.25s",
                                            }} />
                                        </button>

                                        {openMenu === "services" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.18 }}
                                                onClick={e => e.stopPropagation()}
                                                style={{
                                                    position: "absolute", top: "calc(100% + 8px)",
                                                    left: "50%", transform: "translateX(-50%)",
                                                    background: "rgba(15,23,42,0.98)",
                                                    backdropFilter: "blur(20px)",
                                                    border: "1px solid rgba(192,32,42,0.25)",
                                                    minWidth: 200, padding: "8px 0", zIndex: 210,
                                                }}
                                            >
                                                {serviceItems.map(s => (
                                                    <Link
                                                        key={s.label}
                                                        to={s.path}
                                                        className="dd-item"
                                                        onClick={() => setOpenMenu(null)}
                                                    >
                                                        {s.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className={navLinkClass}
                                        end={item.path === "/"}
                                    >
                                        {item.label}
                                    </NavLink>
                                )}
                            </div>
                        ))}

                        <motion.button
                            className="btn-red"
                            onClick={() => navTo("/contact")}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{ padding: "10px 22px", fontSize: "0.65rem", marginLeft: 10 }}
                        >
                            Book Consultation
                        </motion.button>
                    </div>
                )}

                {/* ── Hamburger ──────────────────────────────────────── */}
                {isMobile && (
                    <button
                        onClick={toggleMobile}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
                    >
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{
                                width: 24, height: 1.5, background: "var(--cream)",
                                transformOrigin: "center", transition: "all 0.3s",
                                transform: mobileOpen
                                    ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 1 ? "scaleX(0)" : "translateY(-6.5px) rotate(-45deg)")
                                    : "none",
                                opacity: mobileOpen && i === 1 ? 0 : 1,
                            }} />
                        ))}
                    </button>
                )}
            </motion.nav>

            {/* ── Mobile drawer ──────────────────────────────────────── */}
            <AnimatePresence>
                {isMobile && mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.28 }}
                        style={{
                            position: "fixed", top: 70, left: 0, right: 0, bottom: 0,
                            background: "rgba(15,23,42,0.99)", backdropFilter: "blur(24px)",
                            zIndex: 180, overflowY: "auto", padding: "24px 24px 80px",
                        }}
                    >
                        {links.map(item => (
                            <div key={item.label}>
                                {item.key === "services" ? (
                                    <>
                                        <button
                                            className="mob-link"
                                            onClick={() => setMobSub(mobSub === "services" ? null : "services")}
                                            style={{
                                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                                color: mobSub === "services" ? "var(--red)" : undefined,
                                            }}
                                        >
                                            {item.label}
                                            <span style={{
                                                width: 8, height: 8,
                                                borderRight: "1.5px solid currentColor",
                                                borderBottom: "1.5px solid currentColor",
                                                display: "inline-block",
                                                transform: mobSub === "services" ? "rotate(-135deg)" : "rotate(45deg)",
                                                transition: "transform 0.25s",
                                            }} />
                                        </button>

                                        {mobSub === "services" && (
                                            <div style={{ paddingLeft: 16, borderLeft: "2px solid var(--red)", margin: "4px 0 8px 4px" }}>
                                                {serviceItems.map(s => (
                                                    <Link
                                                        key={s.label}
                                                        to={s.path}
                                                        onClick={closeMobile}
                                                        style={{
                                                            display: "block", padding: "10px 0",
                                                            fontSize: "0.68rem", letterSpacing: "0.1em",
                                                            textTransform: "uppercase",
                                                            color: "rgba(248,245,240,0.5)",
                                                            textDecoration: "none",
                                                            borderBottom: "1px solid rgba(248,245,240,0.04)",
                                                            transition: "color 0.2s",
                                                        }}
                                                        onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                                                        onMouseLeave={e => e.currentTarget.style.color = "rgba(248,245,240,0.5)"}
                                                    >
                                                        {s.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        className="mob-link"
                                        end={item.path === "/"}
                                        onClick={closeMobile}
                                        style={({ isActive }) => ({ color: isActive ? "var(--gold)" : undefined })}
                                    >
                                        {item.label}
                                    </NavLink>
                                )}
                            </div>
                        ))}

                        <motion.button
                            className="btn-red"
                            onClick={() => { navTo("/contact"); closeMobile(); }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            style={{ width: "100%", marginTop: 32, padding: 16, fontSize: "0.72rem" }}
                        >
                            Book Consultation
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
