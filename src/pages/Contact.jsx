import React, { useEffect, useRef, useState } from 'react';

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success
  const revealsRef = useRef([]);

  useEffect(() => {
    // ── Scroll reveal logic ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '-50px' });

    const currentReveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    currentReveals.forEach(el => observer.observe(el));

    // Hero immediate animations
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 80 + i * 130);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();

      // Reset button after 4 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <div className="contact-wrapper">
      <style>{`
        .contact-wrapper {
          --navy: #0f172a; --navy2: #1e293b; --navy3: #243447;
          --red: #c0202a; --gold: #c9a227;
          --slate: #94a3b8; --light: #f1f5f9;
          background: var(--navy);
          color: var(--light);
          font-family: 'Cormorant Garamond', Georgia, serif;
          overflow-x: hidden;
        }
        .dm { font-family: 'DM Sans', sans-serif; }
        
        /* HERO */
        .hero { position: relative; padding: 7rem 1.5rem 5rem; text-align: center; overflow: hidden; background: linear-gradient(170deg, #0f172a 55%, #1a0a0c); }
        .glow { position: absolute; border-radius: 50%; pointer-events: none; }
        .glow-red { width: 600px; height: 600px; background: var(--red); top: -300px; left: 50%; transform: translateX(-50%); filter: blur(140px); opacity: .08; }
        .glow-gold { width: 350px; height: 350px; background: var(--gold); bottom: -150px; right: -100px; filter: blur(100px); opacity: .06; }
        .eyebrow { font-size: .65rem; letter-spacing: .3em; text-transform: uppercase; color: var(--gold); margin-bottom: .75rem; }
        .hero-h1 { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 700; line-height: 1.08; color: #fff; }
        .hero-h1 em { font-style: italic; color: var(--red); }
        .hero-sub { margin-top: 1.25rem; font-size: .95rem; line-height: 1.9; color: var(--slate); max-width: 540px; margin-inline: auto; }
        .hero-rule { width: 60px; height: 2px; background: linear-gradient(to right, var(--red), var(--gold)); margin: 2rem auto 0; }

        /* GRID */
        .main { max-width: 1200px; margin: 0 auto; padding: 5rem 1.5rem 7rem; }
        .contact-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: start; }
        @media(max-width: 820px){ .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }

        /* FORM */
        .form-header { margin-bottom: 2.5rem; }
        .form-eyebrow { font-size: .6rem; letter-spacing: .3em; text-transform: uppercase; color: var(--red); margin-bottom: .5rem; }
        .form-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: var(--light); line-height: 1.2; }
        .form-title span { color: var(--gold); }
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media(max-width: 520px){ .form-row { grid-template-columns: 1fr; } }
        .field { display: flex; flex-direction: column; gap: .5rem; }
        .field label { font-size: .65rem; letter-spacing: .18em; text-transform: uppercase; color: var(--slate); }
        .field input, .field textarea, .field select {
          font-family: 'DM Sans', sans-serif; font-size: .875rem; background: var(--navy2); border: 1px solid #1e3a5f;
          color: var(--light); padding: .9rem 1.15rem; border-radius: .65rem; outline: none; transition: 0.25s;
        }
        .field input:focus, .field textarea:focus { border-color: var(--red); box-shadow: 0 0 0 3px rgba(192,32,42,0.15); transform: translateY(-1px); }
        
        .submit-btn {
          background: var(--red); color: #fff; padding: 1.05rem 2rem; border-radius: 999px; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: .5rem; transition: 0.25s; align-self: flex-start;
        }
        .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(192,32,42,0.4); }
        .success-msg { display: none; color: #4ade80; background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25); padding: 0.75rem; border-radius: 0.65rem; text-align: center; margin-top: 0.5rem; }
        .success-msg.show { display: block; }

        /* INFO CARDS */
        .info-stack { display: flex; flex-direction: column; gap: 1.5rem; }
        .info-card { background: var(--navy2); border: 1px solid #1e3a5f; border-radius: 1.15rem; padding: 1.75rem; transition: 0.2s; }
        .info-card:hover { border-color: #2a4a6f; }
        .info-icon { width: 2.75rem; height: 2.75rem; border-radius: .75rem; background: rgba(192,32,42,.12); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 1rem; }
        .info-value { font-size: 1.15rem; font-weight: 600; color: var(--light); line-height: 1.5; }
        .action-btns { display: flex; gap: .75rem; margin-top: 1rem; }
        .action-btn { padding: .65rem 1.2rem; border-radius: 999px; font-size: .7rem; font-weight: 600; text-decoration: none; transition: 0.22s; display: flex; align-items: center; gap: 0.5rem; }
        .btn-whatsapp { background: #25d366; color: #fff; }
        .btn-call { background: var(--navy3); color: var(--light); border: 1px solid #1e3a5f; }

        /* REVEALS */
        .reveal, .reveal-left, .reveal-right { opacity: 0; transition: opacity .7s ease, transform .7s ease; }
        .reveal { transform: translateY(36px); }
        .reveal-left { transform: translateX(-30px); }
        .reveal-right { transform: translateX(30px); }
        .visible { opacity: 1; transform: translate(0,0); }

        .map-card { border-radius: 1.15rem; overflow: hidden; border: 1px solid #1e3a5f; background: var(--navy2); }
        .map-iframe-wrap iframe { filter: invert(90%) hue-rotate(180deg) saturate(.8) brightness(.85); border: none; }
        
        .bottom-cta { background: linear-gradient(135deg,#1a0a0c,var(--navy)); padding: 5.5rem 1.5rem; text-align: center; border-top: 1px solid #1a1a2e; position: relative; }
        .cta-btn { background: var(--red); color: #fff; padding: 1rem 2.5rem; border-radius: 999px; text-decoration: none; display: inline-block; transition: 0.22s; }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="glow glow-red"></div>
        <div className="glow glow-gold"></div>
        <p className="eyebrow dm reveal">AKM Real State & Builders</p>
        <h1 className="hero-h1 reveal" style={{ transitionDelay: '.1s' }}>
          Let's <em>Talk</em><br />Real Estate
        </h1>
        <p className="hero-sub dm reveal" style={{ transitionDelay: '.2s' }}>
          Whether you're buying, investing, or building — our team is ready to turn your vision into a landmark address in Islamabad.
        </p>
        <div className="hero-rule reveal" style={{ transitionDelay: '.3s' }}></div>
      </section>

      {/* Main Content */}
      <div className="main">
        <div className="contact-grid">
          {/* Form Side */}
          <div className="reveal-left">
            <div className="form-header">
              <p className="form-eyebrow dm">Send a Message</p>
              <h2 className="form-title">Build Your <span>Dream Property</span><br />Together</h2>
              <p className="form-sub dm">Fill in the form and one of our consultants will reach out within 24 hours.</p>
            </div>

            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label className="dm" htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="e.g. Ahmed Khan" required />
                </div>
                <div className="field">
                  <label className="dm" htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label className="dm" htmlFor="phone">Phone / WhatsApp</label>
                  <input type="tel" id="phone" placeholder="+92 300 0000000" />
                </div>
                <div className="field">
                  <label className="dm" htmlFor="subject">I'm Interested In</label>
                  <select id="subject" className="dm">
                    <option value="">Select a topic…</option>
                    <option>Buying a Property</option>
                    <option>Selling / Listing</option>
                    <option>Investment Advice</option>
                    <option>Construction Project</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label className="dm" htmlFor="message">Your Message</label>
                <textarea id="message" placeholder="Tell us about your requirements, budget, preferred location…" required></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn dm" 
                disabled={formStatus === 'sending'}
                style={{ 
                    backgroundColor: formStatus === 'success' ? '#16a34a' : 'var(--red)',
                    opacity: formStatus === 'sending' ? 0.7 : 1 
                }}
              >
                {formStatus === 'idle' && <>Send Message <span className="btn-arrow">→</span></>}
                {formStatus === 'sending' && 'Sending...'}
                {formStatus === 'success' && '✓ Sent!'}
              </button>
              
              <div className={`success-msg dm ${formStatus === 'success' ? 'show' : ''}`}>
                ✅ Message received! We'll be in touch within 24 hours.
              </div>
            </form>
          </div>

          {/* Info Side */}
          <div className="info-stack reveal-right">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <p className="form-eyebrow dm">Office Location</p>
              <p className="info-value">F-6 Markaz, Islamabad</p>
              <p className="info-sub dm">Super Market, F-6/3, Islamabad Capital Territory, Pakistan</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <p className="form-eyebrow dm">Speak to Us Directly</p>
              <p className="info-value">+92 51 000 0000</p>
              <div className="action-btns">
                <a href="https://wa.me/925100000000" className="action-btn btn-whatsapp dm" target="_blank" rel="noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp
                </a>
                <a href="tel:+925100000000" className="action-btn btn-call dm">📞 Call Now</a>
              </div>
            </div>

            <div className="map-card reveal">
              <div className="map-iframe-wrap" style={{ height: '260px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.5406705!2d73.0499!3d33.7297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf002a28b9c3%3A0x6b5b3d9b5c88!2sF-6%20Markaz%2C%20Islamabad!5e0!3m2!1sen!2spk!4v1700000000000"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow dm reveal">Ready to Begin?</p>
          <h2 className="hero-h1 reveal" style={{ fontSize: '2.5rem', transitionDelay: '.1s' }}>
            Let's Build Your<br /><span>Dream Property</span> Together
          </h2>
          <a href="#contactForm" className="cta-btn dm reveal" style={{ transitionDelay: '.3s', marginTop: '2rem' }}>
            Start the Conversation →
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;