import React, { useEffect, useState, useRef } from 'react';

const AkmJournal = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const observerRef = useRef(null);

  // Blog Data Array for easy management
  const blogPosts = [
    {
      id: 1,
      cat: 'investment',
      date: 'Feb 2025',
      readTime: '5 min',
      title: '5 High-Return Zones in Islamabad for 2025 Investors',
      excerpt: 'From E-11 to B-17, we map out the sectors offering the strongest ROI for residential and commercial buyers — backed by recent transaction data.',
      bgClass: 'bg-inv',
      delay: '0s'
    },
    {
      id: 2,
      cat: 'construction',
      date: 'Jan 2025',
      readTime: '4 min',
      title: 'Smart Homes Are No Longer a Luxury in Pakistan',
      excerpt: "Home automation, solar integration, and earthquake-resistant design are becoming standard. Here's what modern construction looks like in 2025.",
      bgClass: 'bg-con',
      delay: '.08s'
    },
    {
      id: 3,
      cat: 'buyer',
      date: 'Dec 2024',
      readTime: '7 min',
      title: 'The Complete First-Timer\'s Guide to Buying in Islamabad',
      excerpt: 'Paperwork, down payments, sector selection, legal checks — we break down every step so you walk in confident and walk out with the right property.',
      bgClass: 'bg-buy',
      delay: '.16s'
    },
    {
      id: 4,
      cat: 'investment',
      date: 'Nov 2024',
      readTime: '5 min',
      title: 'Plot vs Apartment: What Should You Buy in 2025?',
      excerpt: 'We crunch the numbers on appreciation rates, rental yields, and liquidity to help you decide where your capital works harder.',
      bgClass: 'bg-inv',
      delay: '.06s'
    },
    {
      id: 5,
      cat: 'construction',
      date: 'Oct 2024',
      readTime: '4 min',
      title: 'Sustainable Building Materials Reshaping Pakistan\'s Construction',
      excerpt: 'Fly-ash bricks, bamboo reinforcement, and recycled steel — how AKM is adopting green construction standards right here in Islamabad.',
      bgClass: 'bg-con',
      delay: '.14s'
    },
    {
      id: 6,
      cat: 'buyer',
      date: 'Sep 2024',
      readTime: '6 min',
      title: '5 Hidden Costs Every First-Time Buyer Forgets to Budget For',
      excerpt: "Transfer fees, CDA NOCs, stamp duty — first-time buyers are often blindsided by costs beyond the listed price. Here's the full list.",
      bgClass: 'bg-buy',
      delay: '.22s'
    }
  ];

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-40px' });

    const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
    revealElements.forEach(el => observerRef.current.observe(el));

    // Cleanup
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [activeFilter]); // Re-run when filter changes to catch newly rendered cards

  const handleFilterClick = (cat) => {
    setActiveFilter(cat);
  };

  const getCatLabel = (cat) => {
    const labels = {
      investment: 'Investment Tips',
      construction: 'Construction Trends',
      buyer: 'First-Time Buyer'
    };
    return labels[cat] || cat;
  };

  return (
    <div className="akm-journal-container">
      <style>{`
        :root {
          --navy: #0f172a; --navy2: #1e293b; --navy3: #243447;
          --red: #c0202a; --gold: #c9a227; --slate: #94a3b8; --light: #f1f5f9;
        }
        .akm-journal-container {
          background: var(--navy);
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: var(--light);
          min-height: 100vh;
        }
        .dm { font-family: 'DM Sans', sans-serif; }
        
        /* Hero Section */
        .hero { position: relative; padding: 6rem 1.5rem 4.5rem; text-align: center; overflow: hidden; background: linear-gradient(165deg, #0f172a 50%, #1a0a0c); }
        .hero-glow { position: absolute; width: 700px; height: 700px; border-radius: 50%; background: var(--red); top: -320px; left: 50%; transform: translateX(-50%); filter: blur(140px); opacity: .08; pointer-events: none; }
        .hero-glow-gold { position: absolute; width: 350px; height: 350px; border-radius: 50%; background: var(--gold); bottom: -150px; right: -80px; filter: blur(100px); opacity: .06; pointer-events: none; }
        .eyebrow { font-size: .65rem; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); margin-bottom: .75rem; }
        .hero-h1 { font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; line-height: 1.05; color: #fff; }
        .hero-h1 em { font-style: italic; color: var(--red); }
        .hero-sub { margin-top: 1.25rem; font-size: .9rem; line-height: 1.9; color: var(--slate); max-width: 500px; margin-inline: auto; }
        .hero-rule { width: 60px; height: 2px; background: linear-gradient(to right, var(--red), var(--gold)); margin: 2rem auto 0; }

        /* Featured Card */
        .featured-wrap { max-width: 1200px; margin: 0 auto; padding: 4rem 1.5rem 0; }
        .feat-label { font-size: .6rem; letter-spacing: .3em; text-transform: uppercase; color: var(--red); margin-bottom: .5rem; }
        .feat-section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; color: var(--light); margin-bottom: 2rem; }
        .feat-section-title span { color: var(--gold); }
        .featured-card { display: grid; grid-template-columns: 1.4fr 1fr; gap: 0; border-radius: 1.5rem; overflow: hidden; border: 1px solid #1e3a5f; background: var(--navy2); min-height: 380px; }
        @media(max-width: 700px){ .featured-card { grid-template-columns: 1fr; } }
        .feat-img { position: relative; overflow: hidden; display: flex; align-items: flex-end; padding: 2rem; min-height: 260px; }
        .feat-img-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #1a2a3f, #0f172a 60%, #1a0a0c 100%); z-index: 0; }
        .feat-img-pat { position: absolute; inset: 0; opacity: .06; z-index: 1; background-image: repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%); background-size: 22px 22px; }
        .feat-badge { position: relative; z-index: 2; display: flex; flex-direction: column; gap: .6rem; }
        .feat-cat { font-family: 'DM Sans', sans-serif; font-size: .58rem; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; background: var(--red); color: #fff; padding: .25rem .65rem; border-radius: 999px; width: fit-content; }
        .feat-title-lg { font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 700; color: #fff; line-height: 1.25; position: relative; z-index: 2; }
        .feat-body { padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; }
        .feat-meta { font-size: .68rem; color: #64748b; display: flex; gap: 1rem; margin-bottom: 1rem; }
        .feat-desc { font-size: .85rem; line-height: 1.9; color: var(--slate); flex: 1; margin-bottom: 1.5rem; }
        .feat-cta { font-size: .7rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; color: #fff; background: var(--red); padding: .7rem 1.5rem; border-radius: 999px; cursor: pointer; width: fit-content; transition: 0.3s; }
        .feat-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(192,32,42,.35); }

        /* Filter & Grid */
        .filters-wrap { max-width: 1200px; margin: 3rem auto 0; padding: 0 1.5rem; }
        .filters { display: flex; flex-wrap: wrap; gap: .65rem; align-items: center; }
        .filter-btn { font-family: 'DM Sans', sans-serif; font-size: .68rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; padding: .45rem 1.1rem; border-radius: 999px; cursor: pointer; border: 1px solid #1e3a5f; background: transparent; color: var(--slate); transition: all .22s ease; }
        .filter-btn.active { background: var(--red); border-color: var(--red); color: #fff; }
        .grid-wrap { max-width: 1200px; margin: 2.5rem auto 0; padding: 0 1.5rem 5rem; }
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media(max-width: 900px){ .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 560px){ .blog-grid { grid-template-columns: 1fr; } }
        
        .blog-card { border-radius: 1.15rem; overflow: hidden; background: var(--navy2); border: 1px solid #1e3a5f; cursor: pointer; transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .blog-card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 24px 48px rgba(192,32,42,.18); }
        .card-img { height: 185px; position: relative; overflow: hidden; }
        .card-img-inner { width: 100%; height: 100%; transition: transform .5s ease; display: flex; align-items: flex-end; padding: 1.1rem; }
        .card-cat-badge { font-family: 'DM Sans', sans-serif; font-size: .56rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; background: var(--red); color: #fff; padding: .22rem .6rem; border-radius: 999px; z-index: 1; }
        .card-body { padding: 1.35rem; }
        .card-meta { font-size: .63rem; color: #64748b; display: flex; gap: .8rem; margin-bottom: .6rem; }
        .card-title { font-size: 1.15rem; font-weight: 700; color: var(--light); line-height: 1.3; margin-bottom: .6rem; transition: color .2s; }
        .blog-card:hover .card-title { color: var(--gold); }
        .card-excerpt { font-size: .78rem; line-height: 1.85; color: var(--slate); margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .card-read-more { font-size: .68rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--red); display: flex; align-items: center; gap: .4rem; transition: gap .2s; }
        .bg-inv { background: linear-gradient(135deg, #1a2a3f, #0d1a2d); }
        .bg-con { background: linear-gradient(135deg, #1f1a0e, #0f172a); }
        .bg-buy { background: linear-gradient(135deg, #1a0f0f, #0f172a); }

        /* Animations */
        .reveal { opacity: 0; transform: translateY(32px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
        .reveal-scale { opacity: 0; transform: scale(.95); transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
        .reveal.visible, .reveal-scale.visible { opacity: 1; transform: translateY(0) scale(1); }

        /* Newsletter */
        .newsletter { background: var(--navy2); border-top: 1px solid #1e3a5f; padding: 4rem 1.5rem; }
        .nl-inner { max-width: 580px; margin: 0 auto; text-align: center; }
        .nl-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 700; color: var(--light); margin-bottom: .65rem; }
        .nl-h2 span { color: var(--red); }
        .nl-form { display: flex; gap: .65rem; max-width: 440px; margin: 0 auto; }
        @media(max-width: 460px){ .nl-form { flex-direction: column; } }
        .nl-input { flex: 1; font-family: 'DM Sans', sans-serif; font-size: .82rem; background: var(--navy); border: 1px solid #1e3a5f; color: var(--light); padding: .8rem 1.15rem; border-radius: 999px; outline: none; }
        .nl-btn { font-family: 'DM Sans', sans-serif; font-size: .68rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; background: var(--red); color: #fff; padding: .8rem 1.5rem; border-radius: 999px; border: none; cursor: pointer; transition: 0.3s; }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-glow-gold"></div>
        <p className="eyebrow dm reveal">Insights & Expertise</p>
        <h1 className="hero-h1 reveal" style={{ transitionDelay: '.1s' }}>
          The AKM <em>Journal</em>
        </h1>
        <p className="hero-sub dm reveal" style={{ transitionDelay: '.2s' }}>
          Expert advice on investing, building, and buying property in Pakistan's capital.
        </p>
        <div className="hero-rule reveal" style={{ transitionDelay: '.3s' }}></div>
      </section>

      {/* Featured */}
      <div className="featured-wrap">
        <div className="reveal">
          <p className="feat-label dm">⭐ Featured Article</p>
          <h2 className="feat-section-title">Editor's <span>Pick</span></h2>
        </div>
        <div className="featured-card reveal" style={{ transitionDelay: '.1s' }}>
          <div className="feat-img">
            <div className="feat-img-bg"></div>
            <div className="feat-img-pat"></div>
            <svg style={{ position: 'absolute', bottom: 0, right: 0, opacity: .07, zIndex: 1 }} width="260" height="260" viewBox="0 0 260 260">
              <circle cx="260" cy="260" r="180" fill="none" stroke="#c9a227" strokeWidth="36" />
            </svg>
            <div className="feat-badge">
              <span className="feat-cat">Investment Tips</span>
              <h2 className="feat-title-lg">Why F-6 Islamabad Remains Pakistan's Safest Real Estate Bet in 2025</h2>
            </div>
          </div>
          <div className="feat-body">
            <div>
              <div className="feat-meta dm">
                <span>📅 March 2025</span>
                <span>⏱ 6 min read</span>
                <span>👤 A.K. Malik</span>
              </div>
              <p className="feat-desc dm">
                With inflation reshaping Pakistan's economy, we break down why F-6 continues to outperform every major urban real estate market — with data, on-ground insight, and a roadmap for first-time investors.
              </p>
            </div>
            <span className="feat-cta dm">Read Full Article →</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filters-wrap reveal" style={{ transitionDelay: '.1s' }}>
        <div className="filters">
          {['all', 'investment', 'construction', 'buyer'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn dm ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => handleFilterClick(cat)}
            >
              {cat === 'all' ? 'All Posts' : 
               cat === 'investment' ? '💰 Investment Tips' :
               cat === 'construction' ? '🏗 Construction Trends' : '🏠 First-Time Buyer'}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid-wrap">
        <div className="blog-grid">
          {blogPosts
            .filter(post => activeFilter === 'all' || post.cat === activeFilter)
            .map((post) => (
              <article key={post.id} className="blog-card reveal-scale" style={{ transitionDelay: post.delay }}>
                <div className="card-img">
                  <div className={`card-img-inner ${post.bgClass}`}>
                    <span className="card-cat-badge">{getCatLabel(post.cat)}</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-meta dm">
                    <span>📅 {post.date}</span>
                    <span>⏱ {post.readTime}</span>
                  </div>
                  <h3 className="card-title">{post.title}</h3>
                  <p className="card-excerpt dm">{post.excerpt}</p>
                  <span className="card-read-more dm">Read More <span className="arrow">→</span></span>
                </div>
              </article>
            ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter">
        <div className="nl-inner">
          <p className="nl-eyebrow dm reveal">Stay Informed</p>
          <h2 className="nl-h2 reveal" style={{ transitionDelay: '.1s' }}>Get <span>Expert Insights</span> In Your Inbox</h2>
          <p className="nl-sub dm reveal" style={{ transitionDelay: '.2s' }}>
            Monthly deep-dives on Islamabad real estate — no spam, just actionable intelligence.
          </p>
          <div className="nl-form reveal" style={{ transitionDelay: '.3s' }}>
            <input className="nl-input dm" type="email" placeholder="Your email address" />
            <button className="nl-btn dm">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AkmJournal;