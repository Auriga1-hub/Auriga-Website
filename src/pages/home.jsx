import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../components/hero";
import SEOHead from "../components/SEOHead";
import StructuredData, { organizationSchema, localBusinessSchema, websiteSchema, buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/home.css";
import "../css/player_development.css";
import "../css/personal_training.css";



const programs = [
  {
    image: "/images/program_1.webp",
    title: "Fundamentals Program (Ages 4–13)",
    subHeadline: "Beginner Soccer Training for Kids Focused on Skills, Confidence & Game Fundamentals",
    description:
      "Our Fundamentals Program introduces young players to soccer through structured, fun, and engaging sessions. Players develop coordination, ball control, and basic game understanding in a positive environment that builds confidence from day one.",
    cta: "Register",
    path: "/programs/location_select?program=recreation",
  },
  {
    image: "/images/IMG_0351.webp",
    title: "Development Academy (Ages 7–13)",
    subHeadline: "Advanced Youth Soccer Training to Build Skills, Game Intelligence & Long-Term Player Development",
    description:
      "Designed for players who want to improve beyond the basics, the Development Academy focuses on technical skills, decision-making, and game awareness. Sessions are structured to challenge players and prepare them for higher levels of play.",
    cta: "Join Development Academy",
    path: "/programs/development",
  },
  {
    image: "/images/IMG_0349.webp",
    title: "Development / Competitive Teams (Invite-Based)",
    subHeadline: "Competitive Youth Soccer Program with Team Training, Matches & Pathway to Higher Levels",
    description:
      "For players ready to compete, our Development Teams provide structured team training along with friendly matches, tournaments, and league participation. Players are selected based on performance, commitment, and readiness.",
    cta: "Request Tryout",
    path: "/contact",
  },
];

const galleryImages = [
  "/images/img_1.webp",
  "/images/img_2.webp",
  "/images/img_3.webp",
  "/images/img_1.webp",
  "/images/img_2.webp",
  "/images/img_3.webp",
  "/images/img_1.webp",
  "/images/img_2.webp",
  "/images/img_3.webp",
  "/images/img_1.webp",
  "/images/img_2.webp",
  "/images/img_3.webp",
];

const locations = [
  {
    title: "Mississauga Central",
    mapSrc: "https://maps.google.com/maps?q=T.+L.+Kennedy+Secondary+School,+3100+Hurontario+St,+Mississauga,+ON+L5B+1N7&z=17&output=embed",
    directionsUrl: "https://maps.app.goo.gl/t9JDDXpqjAmm46qW6?g_st=iwb",
  },
  {
    title: "Mississauga West",
    mapSrc: "https://maps.google.com/maps?q=John+Fraser+Secondary+School,+2665+Erin+Centre+Blvd,+Mississauga,+ON+L5M+5H6&z=17&output=embed",
    directionsUrl: "https://maps.app.goo.gl/fWEZ3YbyeXtEnNgWA?g_st=iwb",
  },
  {
    title: "Brampton",
    mapSrc: "https://maps.google.com/maps?q=Bramalea+Secondary+School,+510+Balmoral+Dr,+Brampton,+ON+L6T+1W4&z=17&output=embed",
    directionsUrl: "https://maps.app.goo.gl/oPMQQJDYttSQmQvC7?g_st=iwb",
  },
  {
    title: "Brampton West",
    mapSrc: "https://maps.google.com/maps?q=Brampton+West,+Ontario&z=12&output=embed",
    directionsUrl: "https://maps.app.goo.gl/DrkMiQr9ZoDLbx6Y9",
  },
];

const testimonials = [
  {
    text: "Auriga FC provides exceptional training with coaches who focus on each child's individual strengths and weaknesses. The kids are improving day by day, gaining confidence and skills. It's a great team environment where players grow both on and off the field.",
    author: "Rajesh",
  },
  {
    text: "Auriga FC has been incredible for my son. In just a year, he has built confidence, learned teamwork, and made great friends. The coaches provide constructive, supportive feedback that helps kids grow both in skills and character. Beyond soccer, he's developed resilience, sportsmanship, and perseverance in a positive environment.",
    author: "Massoma Jafari",
  },
  {
    text: "Auriga FC is a fantastic place for young soccer enthusiasts. The coaches give balanced feedback that helps kids build both skills and attitude to succeed. The club's discipline and professionalism shape players not only as athletes but also as individuals.",
    author: "Shermal Manamendra",
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance every 5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <>
      <SEOHead
        title="Auriga FC | Kids Soccer Training Mississauga & Brampton | Ages 4-13"
        description="Auriga Football Club offers professional kids soccer training for ages 4–13 in Mississauga, Brampton, and Etobicoke. Join our development academy, competitive teams, personal training, or seasonal soccer camps. Book a free trial today."
        keywords="kids soccer training mississauga, youth soccer brampton, soccer academy GTA, auriga football club, soccer camps mississauga, youth football etobicoke, free soccer trial, soccer school ontario"
      />
      <StructuredData data={[
        organizationSchema, 
        localBusinessSchema, 
        websiteSchema, 
        buildBreadcrumbSchema([{ name: "Home", path: "/" }])
      ]} />
      <Hero />

      {/* ANNOUNCEMENT BAR */}
      <div 
        className="announcement-marquee-container"
        style={{
          background: 'linear-gradient(90deg, #1e3a8a, #0b1f35)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
          borderTop: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '16px 0',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div className="announcement-marquee-content">
          <p className="announcement-text" style={{
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: 'white',
            letterSpacing: '0.5px',
            display: 'inline-block'
          }}>
            <span className="announcement-badge" style={{ 
              color: '#10b981', 
              marginRight: '8px', 
              fontWeight: 800,
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '4px 10px',
              borderRadius: '4px'
            }}>
              Announcement
            </span>
            Spring Program begins on May 18
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-wrapper">

            <div className="about-image">
              <img src="/images/about-us.webp" alt="About Us Image" loading="lazy" width="600" height="400" />
            </div>

            <div className="about-content">
              <span className="section-label">About Auriga Football Club</span>

              <h2 className="about-title">
                Developing Young Players Through{" "}
                <span>Professional Coaching</span>
              </h2>

              <p className="about-text">
                Auriga Football Club offers structured kids soccer training programs designed for ages 4–13. Our programs focus on technical skill development, confidence, and long-term player growth through a clear pathway from recreational training to competitive teams. Serving families in Mississauga, Brampton, and nearby areas, we provide professional coaching in a positive and disciplined environment.
              </p>

              <Link
                to="/about"
                className="about-btn"
                data-analytics-event="cta_click"
                data-analytics-placement="home_about"
                data-analytics-destination="/about"
                data-analytics-label="learn_more_about"
              >
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="programs-section">
        <div className="programs-container">

          <div className="programs-heading">
            <h2 className="programs-title" style={{ marginBottom: "16px" }}>Our Soccer Programs (Ages 4–13)</h2>
            <p className="programs-intro" style={{ textAlign: "center", color: "#64748b", maxWidth: "800px", margin: "0 auto 48px", fontSize: "18px", lineHeight: "1.6" }}>
              Structured kids soccer training programs in Mississauga, Brampton, and surrounding areas, designed to develop skills, confidence, and a clear pathway into competitive soccer.
            </p>
          </div>

          <div className="programs-grid">
            {programs.map((program, index) => (
              <div className="program-card" key={index}>

                <div className="program-card-image">
                  <img src={program.image} alt={program.title} width="400" height="250" />
                </div>

                <div className="program-content">
                  <h3 style={{ marginBottom: "8px" }}>{program.title}</h3>
                  <h4 style={{ color: "#10b981", fontSize: "15px", fontWeight: "600", marginBottom: "16px", lineHeight: "1.4" }}>
                    {program.subHeadline}
                  </h4>
                  <p>{program.description}</p>
                  <Link
                    to={program.path}
                    className="program-btn"
                    data-analytics-event="cta_click"
                    data-analytics-placement="home_program_card"
                    data-analytics-destination={program.path}
                    data-analytics-label={program.title}
                  >
                    {program.cta}
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PLAYER DEVELOPMENT PATHWAY */}
      <section className="player-dev-section" style={{ padding: "30px 0" }}>
        <div className="player-dev-container">
          <div className="player-dev-step-card" style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            <div className="player-dev-intro" style={{ margin: "0 auto", maxWidth: "800px" }}>
              <span className="player-dev-label">Our Pathway</span>
              <h2 className="player-dev-title" style={{ fontSize: "36px" }}>A Clear Pathway for Every Player</h2>
              <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", color: "#cbd5e1", lineHeight: "1.8", marginTop: "24px", marginBottom: "32px" }}>
                Players progress through Auriga Football Club based on their development, moving from fundamentals to advanced training and into competitive team environments. This structured pathway ensures that every player receives the right level of challenge and opportunity to grow.
              </p>
            </div>

            <div className="player-dev-large-image" style={{ margin: "0", width: "100%", maxWidth: "800px" }}>
              <img src="/images/player_development.webp" alt="Player Development Pathway" loading="lazy" width="800" height="450" style={{ width: "100%", display: "block", borderRadius: "20px" }} />
            </div>
            
          </div>
        </div>
      </section>

      {/* CAMPS SUMMARY — 3 Cards */}
      <section className="pt-summary-section camps-summary" style={{ background: "#0b1f35", padding: "40px 0 60px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pt-container" style={{ maxWidth: "1400px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="pt-label">Special Programs</span>
            <h2 className="pt-section-title">Seasonal Soccer Camps</h2>
            <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "17px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif", maxWidth: "700px", margin: "16px auto 0" }}>
              Intensive camp programs designed to boost skills, build teamwork, and provide an immersive football experience during breaks.
            </p>
          </div>

          <div className="camps-summary-grid">

            {/* Summer Camp */}
            <Link
              to="/programs/camps"
              className="pt-summary-link-wrapper"
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
              data-analytics-event="cta_click"
              data-analytics-placement="home_camp_summary"
              data-analytics-destination="/programs/camps"
              data-analytics-label="summer_camp"
            >
              <div className="pt-section-box summary-box" style={{ margin: "0", cursor: "pointer", height: "100%", flexGrow: 1, padding: "40px 16px" }}>
                <div className="pt-summary-content" style={{ textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                  <span className="pt-label">☀️ Summer</span>
                  <h2 className="pt-section-title camps-title-nowrap" style={{ fontSize: "24px" }}>Summer Camp</h2>
                  <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "15px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif", flexGrow: 1 }}>
                    A full week of soccer, multi-sport activities, and fun for ages 4–13. Build skills, make friends, and stay active all summer.
                  </p>
                  <div style={{ marginTop: "28px", textAlign: "center" }}>
                    <span className="pt-cta-btn" style={{ padding: "14px 32px", fontSize: "13px" }}>
                      Explore Summer Camp →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Winter Camp */}
            <Link
              to="/programs/winter-camp"
              className="pt-summary-link-wrapper"
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
              data-analytics-event="cta_click"
              data-analytics-placement="home_camp_summary"
              data-analytics-destination="/programs/winter-camp"
              data-analytics-label="winter_camp"
            >
              <div className="pt-section-box summary-box" style={{ margin: "0", cursor: "pointer", height: "100%", flexGrow: 1, padding: "40px 16px" }}>
                <div className="pt-summary-content" style={{ textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                  <span className="pt-label">❄️ Winter</span>
                  <h2 className="pt-section-title camps-title-nowrap" style={{ fontSize: "24px" }}>Winter Camp</h2>
                  <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "15px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif", flexGrow: 1 }}>
                    Keep your child active and improving during winter breaks with indoor training, games, and team-building activities.
                  </p>
                  <div style={{ marginTop: "28px", textAlign: "center" }}>
                    <span className="pt-cta-btn" style={{ padding: "14px 32px", fontSize: "13px" }}>
                      Explore Winter Camp →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* March Break Camp */}
            <Link
              to="/programs/march-break-camp"
              className="pt-summary-link-wrapper"
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
              data-analytics-event="cta_click"
              data-analytics-placement="home_camp_summary"
              data-analytics-destination="/programs/march-break-camp"
              data-analytics-label="march_break_camp"
            >
              <div className="pt-section-box summary-box" style={{ margin: "0", cursor: "pointer", height: "100%", flexGrow: 1, padding: "40px 16px" }}>
                <div className="pt-summary-content" style={{ textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                  <span className="pt-label">🌸 March Break</span>
                  <h2 className="pt-section-title camps-title-nowrap" style={{ fontSize: "24px" }}>March Break Camp</h2>
                  <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "15px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif", flexGrow: 1 }}>
                    An action-packed week of soccer, sports, and fun during March Break. Perfect for players to sharpen their skills.
                  </p>
                  <div style={{ marginTop: "28px", textAlign: "center" }}>
                    <span className="pt-cta-btn" style={{ padding: "14px 32px", fontSize: "13px" }}>
                      Explore March Break Camp →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* PERSONAL TRAINING SUMMARY */}
      <section className="pt-summary-section" style={{ background: "#061226", padding: "50px 0" }}>
        <div className="pt-container">
          <Link
            to="/programs/personal-training"
            className="pt-summary-link-wrapper"
            style={{ textDecoration: 'none' }}
            data-analytics-event="cta_click"
            data-analytics-placement="home_personal_training"
            data-analytics-destination="/programs/personal-training"
            data-analytics-label="personal_training"
          >
            <div className="pt-section-box summary-box" style={{ margin: "0", cursor: "pointer" }}>
              <div className="pt-summary-content">
                <span className="pt-label">Advanced Coaching</span>
                <h2 className="pt-section-title">Personal Soccer Training</h2>
                <p style={{ color: "#94a3b8", marginTop: "24px", fontSize: "17px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif" }}>
                  Faster, targeted development beyond regular group sessions. 
                  Tailored to the player’s level, position, and goals.
                </p>
                
                <p style={{ color: "#94a3b8", marginTop: "16px", fontSize: "17px", lineHeight: "1.8", fontFamily: "Nunito, sans-serif" }}>
                  Includes specialized <strong style={{ color: "#10b981" }}>Goalkeeper Training</strong> focusing on 
                  positioning, shot-stopping, and modern tactical awareness.
                </p>

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                  <span className="pt-cta-btn" style={{ padding: "16px 40px", fontSize: "14px" }}>
                    Learn More About Personal Training →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="testimonials-container">

          <h2 className="testimonial-title">What Parents Say About Us</h2>
          <div 
            className="testimonial-slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {testimonials.map((t, index) => (
              <div
                className={`testimonial ${index === activeIndex ? "active" : ""}`}
                key={index}
              >
                <div className="testimonial-stars">★★★★★</div>
                <p>{t.text}</p>
                <div className="testimonial-author">– {t.author}</div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`testimonial-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div style={{ marginTop: "22px", textAlign: "center" }}>
            <a
              href="https://www.google.com/search?sca_esv=f6dab0cbe71090ff&rlz=1C5OZZY_enIN1197IN1198&cs=1&sxsrf=ANbL-n67vhWktKmwURSm8J45UPK-A2BGHQ:1775834781563&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQpv9CHLYHrPEKUmBrc4KYe8ubjTa54lil2rTGhXtamXU33s5-Dh0OvLalDOjt34ZGWikNYW3oYwe6_rwfXnjto3ljoX4AvMf15uz4f6itqwL3IMLw%3D%3D&q=Auriga+Football+Club+Reviews&sa=X&ved=2ahUKEwjIx9aKzOOTAxX6JzQIHXneEkkQ0bkNegQIHhAH&biw=1728&bih=915&dpr=2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "8px 24px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                color: "#3b82f6",
                borderBottom: "2px solid #3b82f6",
                textDecoration: "none",
              }}
            >
              View Google Reviews
            </a>
          </div>

        </div>
      </section>

      {/* TRAINING GALLERY */}
      <section className="gallery-section">
        <div className="gallery-heading">
          <h2 className="gallery-title">Training Gallery</h2>
        </div>

        <div className="gallery-slider">
          <div className="gallery-track">
            {galleryImages.map((src, index) => (
              <div className="gallery-item" key={index}>
                <img src={src} alt={`Training ${(index % 3) + 1}`} loading="lazy" width="300" height="200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="locations-section">
        <div className="locations-container">

          <div className="locations-heading">
            <h2 className="locations-title">Locations</h2>
          </div>

          <div className="locations-grid">
            {locations.map((loc, index) => (
              <div className="location-card" key={index}>

                <h3 className="location-title">{loc.title}</h3>

                <div className="map-container">
                  <div style={{ position: "relative", height: "340px" }}>
                    <iframe
                      src={loc.mapSrc}
                      loading="lazy"
                      title={loc.title}
                    />
                    {loc.title === "Brampton West" && (
                      <a
                        href={loc.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Brampton West location in Google Maps"
                        style={{
                          position: "absolute",
                          inset: 0,
                          zIndex: 2,
                        }}
                      />
                    )}
                  </div>
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-btn"
                    data-analytics-placement="home_locations"
                  >
                    Get Directions
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}

export default Home;