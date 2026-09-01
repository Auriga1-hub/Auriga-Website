import { Fragment } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/brampton.css";
import "../css/brampton_north.css";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?sca_esv=f6dab0cbe71090ff&rlz=1C5OZZY_enIN1197IN1198&cs=1&sxsrf=ANbL-n67vhWktKmwURSm8J45UPK-A2BGHQ:1775834781563&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQpv9CHLYHrPEKUmBrc4KYe8ubjTa54lil2rTGhXtamXU33s5-Dh0OvLalDOjt34ZGWikNYW3oYwe6_rwfXnjto3ljoX4AvMf15uz4f6itqwL3IMLw%3D%3D&q=Auriga+Football+Club+Reviews&sa=X&ved=2ahUKEwjIx9aKzOOTAxX6JzQIHXneEkkQ0bkNegQIHhAH&biw=1728&bih=915&dpr=2";

/* ==========================================================
   EVERGREEN CONTENT — stays the same across every season.
   ========================================================== */

const developCards = [
  {
    title: "Technical Skills",
    description:
      "Dribbling, passing, and ball control fundamentals taught in structured progressions.",
  },
  {
    title: "Game Understanding",
    description:
      "Decision making, positioning, and game awareness through guided scenarios.",
  },
  {
    title: "Confidence & Discipline",
    description:
      "Positive coaching that builds focus, consistency, and self-belief.",
  },
  {
    title: "In-House Matches",
    description:
      "Friendly games designed to build confidence and real match experience.",
  },
];

const sessionFlow = ["Warm-Up", "Ball Mastery", "Technical Skill", "Game-Based Activity", "Small-Sided Play"];

const whyAuriga = [
  "Structured training (not just games)",
  "Focus on long-term development",
  "Positive and disciplined environment",
  "Experienced and certified coaching",
];

const registrationSteps = [
  { label: "Step 1", text: "Secure your spot with a $30 deposit" },
  { label: "Step 2", text: "Choose your schedule", list: ["1 Day/Week", "2 Days/Week"] },
  { label: "Step 3", text: "Attend your first training session" },
  { label: "Step 4", text: "Continue the season or receive a full deposit refund if the program is not the right fit." },
];

const cappedReasons = ["Individual coaching attention", "High repetition", "Controlled learning environment"];

const parentTestimonial = {
  text: "Auriga FC has been incredible for my son. In just a year, he has built confidence, learned teamwork, and made great friends. The coaches provide constructive, supportive feedback that helps kids grow both in skills and character. Beyond soccer, he's developed resilience, sportsmanship, and perseverance in a positive environment.",
  author: "Massoma Jafari",
};

/* ==========================================================
   SEASONAL PROGRAM DATA — the only part that changes when
   Auriga moves from Spring → Summer → Fall → Winter.
   Location is confirmed; schedule/pricing publish closer to
   each season's registration opening.
   ========================================================== */

const LOCATION = "25 Mountainberry Rd, Brampton, ON L6R 1J3";
const FACILITY = "Father Clair Tipping CES";
const LOCATION_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=25+Mountainberry+Rd+Brampton+ON+L6R+1J3";

const seasonalPrograms = [
  { season: "Spring", status: "Coming Soon" },
  { season: "Summer", status: "Coming Soon" },
  {
    season: "Fall",
    status: "Registration Open",
    dates: "Oct 6 – Jan 15 (26 Sessions)",
    days: "Tuesdays & Fridays",
    ageGroups: [
      { label: "U4–U8", time: "6:15 – 7:05 PM" },
      { label: "U9–U13", time: "7:05 – 8:00 PM" },
    ],
    twoDayPrice: "$515 + HST",
    oneDayPrice: "$310 + HST",
    oneDayNote: "1 Day/Week: Choose Tuesday or Friday",
    confirmNote: "After completing registration, please email or text us to confirm your preferred training day.",
    deposit: {
      amount: "$30 Deposit to secure your spot",
      note: "Payment plans available during the time of registration.",
      perks: ["Uniform set included"],
    },
    registerLinks: {
      oneDay: "https://aurigafc.playbookapi.com/programs/camp_registration/?class_package%5B%5D=76279",
      twoDay: "https://aurigafc.playbookapi.com/programs/camp_registration/?class_package%5B%5D=76278",
    },
  },
  {
    season: "Winter",
    status: "Registration Open",
    dates: "Jan 19 – Apr 30 (26 Sessions)",
    days: "Tuesdays & Fridays",
    ageGroups: [
      { label: "U4–U8", time: "6:15 – 7:05 PM" },
      { label: "U9–U13", time: "7:05 – 8:00 PM" },
    ],
    twoDayPrice: "$515 + HST",
    oneDayPrice: "$310 + HST",
    oneDayNote: "1 Day/Week: Choose Tuesday or Friday",
    confirmNote: "After completing registration, please email or text us to confirm your preferred training day.",
    deposit: {
      amount: "$30 Deposit to secure your spot",
      note: "Payment plans available during the time of registration.",
      perks: ["Uniform set included"],
    },
    registerLinks: {
      oneDay: "https://aurigafc.playbookapi.com/programs/camp_registration/?class_package%5B%5D=76328",
      twoDay: "https://aurigafc.playbookapi.com/programs/camp_registration/?class_package%5B%5D=76329",
    },
  },
];

function BramptonNorth() {
  return (
    <>
      <SEOHead
        title="Soccer Training Brampton North | Youth Programs Ages 4-13 | Auriga FC"
        description="Youth soccer training in Brampton North, Ontario. Professional coaching for ages 4–13 with year-round seasonal sessions. Build skills, confidence, and team play at Auriga Football Club."
        keywords="soccer training brampton north, youth soccer brampton north, kids soccer lessons brampton, soccer academy brampton, auriga fc brampton north"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Brampton North", path: "/programs/recreation/brampton-north" }])} />

      {/* HERO */}
      <div className="bram-hero">
        <div className="bram-hero-overlay" />
        <div className="bram-hero-container">
          <h1 className="bram-hero-title">Brampton North Training Program</h1>
          <p className="bram-hero-text">
            Year-round youth soccer development for ages 4–13, focused on
            technical skill, confidence, and game understanding.
          </p>
          <div className="bn-hero-badges">
            <span className="bn-hero-badge">Ages 4–13</span>
            <span className="bn-hero-badge">Beginner to Intermediate</span>
            <span className="bn-hero-badge">1 or 2 Days/Week</span>
            <span className="bn-hero-badge">Year-Round Training</span>
          </div>
          <a href="#available-programs" className="bn-hero-cta">View Available Programs</a>
        </div>
      </div>

      {/* WHO IS THIS PROGRAM FOR? / AGE GROUPS */}
      <section className="bn-section" style={{ background: "linear-gradient(180deg, #071a2d, #0b1f33)" }}>
        <div className="bram-container">
          <div className="bn-two-col">
            <article className="bn-info-card">
              <h3>Who Is This Program For?</h3>
              <ul className="bn-info-list">
                <li><span>•</span> Players new to soccer who need strong fundamentals</li>
                <li><span>•</span> Kids already playing recreational soccer who want additional development</li>
                <li><span>•</span> Players looking to improve technical ability and confidence</li>
                <li><span>•</span> Families looking for consistent, structured soccer training</li>
              </ul>
            </article>

            <article className="bn-info-card">
              <h3>Age Groups</h3>
              <div className="bn-age-group">
                <strong>U4–U8</strong>
                <span>Confidence, Foundation & Ball Mastery</span>
              </div>
              <div className="bn-age-group">
                <strong>U9–U13</strong>
                <span>Confidence, Leadership, Technical Development & Game Understanding</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT PLAYERS DEVELOP */}
      <section className="bn-section bn-section-alt">
        <div className="bram-container">
          <div className="bram-section-heading">
            <span className="bram-label">Player Development</span>
            <h2 className="bram-section-title">What Your Child Will Develop</h2>
          </div>
          <div className="bn-develop-grid">
            {developCards.map((card) => (
              <article className="bn-develop-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THE PROGRAM WORKS */}
      <section className="bn-section" style={{ background: "linear-gradient(180deg, #071a2d, #0b1f33)" }}>
        <div className="bram-container">
          <div className="bram-section-heading">
            <span className="bram-label">Our Methodology</span>
            <h2 className="bram-section-title">How The Program Works</h2>
          </div>
          <p style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", fontFamily: "'Nunito', sans-serif", color: "#cbd5e1", fontSize: "16px", lineHeight: 1.75 }}>
            Every player follows an age-appropriate, structured curriculum built on
            consistent training and repetition. Sessions progressively build
            technical ability so players keep developing throughout the year,
            with a choice of training frequency to match your family's schedule.
          </p>
          <div className="bn-frequency-grid">
            <article className="bn-frequency-card">
              <h4>1 Day / Week</h4>
              <p>Choose one available training day each week to build fundamentals at a steady pace.</p>
            </article>
            <article className="bn-frequency-card">
              <h4>2 Days / Week</h4>
              <p>Attend both available training days each week for accelerated, more frequent development.</p>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT A TRAINING SESSION LOOKS LIKE */}
      <section className="bn-section bn-section-alt">
        <div className="bram-container">
          <div className="bram-section-heading">
            <span className="bram-label">Inside A Session</span>
            <h2 className="bram-section-title">What A Training Session Looks Like</h2>
          </div>
          <div className="bn-flow">
            {sessionFlow.map((step, i) => (
              <Fragment key={step}>
                <div className="bn-flow-step">{step}</div>
                {i < sessionFlow.length - 1 && <span className="bn-flow-arrow">→</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AURIGA */}
      <section className="bn-section" style={{ background: "linear-gradient(180deg, #071a2d, #0b1f33)" }}>
        <div className="bram-container">
          <div className="bn-two-col" style={{ gridTemplateColumns: "1fr" }}>
            <article className="bn-info-card" style={{ maxWidth: "700px", margin: "0 auto" }}>
              <h3>Why Auriga</h3>
              <ul className="bn-info-list bn-info-list-center" style={{ maxWidth: "560px", margin: "0 auto" }}>
                {whyAuriga.map((point) => (
                  <li key={point}><span>•</span> {point}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* PARENT REVIEWS / TESTIMONIALS */}
      <section id="testimonials" className="bn-testimonial-section">
        <div className="bram-container">
          <h2 className="bn-testimonial-title">What Parents Say About Us</h2>
          <div className="bn-testimonial-wrap">
            <div className="bn-testimonial-stars">★★★★★</div>
            <p className="bn-testimonial-quote">{parentTestimonial.text}</p>
            <div className="bn-testimonial-author">– {parentTestimonial.author}</div>
          </div>
          <div style={{ marginTop: "22px", textAlign: "center" }}>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="bn-google-reviews-link">
              View Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* REGISTRATION PROCESS */}
      <section className="bn-section bn-section-alt" style={{ paddingBottom: "30px" }}>
        <div className="bram-container">
          <div className="bram-section-heading">
            <span className="bram-label">How Registration Works</span>
            <h2 className="bram-section-title">Simple, Risk-Free Start</h2>
          </div>
          <div className="bn-steps">
            {registrationSteps.map((step) => (
              <div className="bn-step" key={step.label}>
                <span className="bn-step-label">{step.label}:</span> {step.text}
                {step.list && (
                  <ul className="bn-step-list">
                    {step.list.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <article className="bn-policy-card">
            <h3>Registration, Deposits & Refund Policy</h3>
            <h4>Registration & Deposit</h4>
            <ul>
              <li><span>•</span> To secure a spot in the program, a $30 deposit is required at registration.</li>
              <li><span>•</span> This deposit is applied toward your total program fee.</li>
            </ul>
            <h4>Refund Policy</h4>
            <ul>
              <li><span>•</span> If you choose not to continue after the first session, your $30 deposit will be fully refunded.</li>
              <li><span>•</span> From the second session onward, the deposit becomes non-refundable, as spots are confirmed and staffing is finalized.</li>
              <li><span>•</span> After the second session, no refunds are issued unless communicated otherwise.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* PROGRAM POLICIES / IMPORTANT INFORMATION / FAQ */}
      <section className="bn-section" style={{ background: "linear-gradient(180deg, #071a2d, #0b1f33)", paddingTop: "30px" }}>
        <div className="bram-container">
          <article className="bn-capped-card">
            <h3>Why Spots Are Capped</h3>
            <span className="bn-capped-underline" />
            <p className="bn-capped-intro">We limit group size to maintain:</p>
            <div className="bn-capped-pills">
              {cappedReasons.map((reason) => (
                <span className="bn-capped-pill" key={reason}>{reason}</span>
              ))}
            </div>
            <p className="bn-capped-footer">Once groups reach capacity, registration closes.</p>
          </article>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <Link to="/faq" className="bn-faq-link">Visit FAQ</Link>
          </div>
        </div>
      </section>

      {/* AVAILABLE TRAINING PROGRAMS */}
      <section id="available-programs" className="bn-section bn-section-alt">
        <div className="bram-container">
          <div className="bram-section-heading">
            <span className="bram-label">Available Training Programs</span>
            <h2 className="bram-section-title">Available Training Programs</h2>
            <p style={{ marginTop: "16px", fontFamily: "'Nunito', sans-serif", color: "#8faabf", fontSize: "16px" }}>
              Choose the season and training schedule that works best for your family.
            </p>
          </div>

          <div className="bn-deposit-box" style={{ maxWidth: "640px", margin: "0 auto 40px" }}>
            <h4>Sibling Discount</h4>
            <p>If enrolling more than one kid, a sibling discount will be applied during the time of registration when you register both kids together.</p>
            <ul>
              <li>✔ 15% off for the second child</li>
              <li>✔ 20% off for the third child or more</li>
            </ul>
          </div>

          <div className="bn-season-grid">
            {seasonalPrograms.map((prog) => (
              <article className="bn-season-card" key={prog.season}>
                <span className="bn-season-status">{prog.status}</span>
                <h3 className="bn-season-name">{prog.season} Training Program</h3>
                <div className="bn-season-row">📍 <span><strong>{FACILITY}</strong><br />{LOCATION} <a href={LOCATION_MAPS_URL} target="_blank" rel="noopener noreferrer" className="bn-map-link">View on map</a></span></div>

                {prog.dates && <div className="bn-season-row">🗓 <span>{prog.dates}</span></div>}
                {prog.days && <div className="bn-season-row">📅 <span>{prog.days}</span></div>}
                {prog.ageGroups && prog.ageGroups.map((ag) => (
                  <div className="bn-season-row" key={ag.label}><strong>{ag.label}:</strong> {ag.time}</div>
                ))}

                {prog.twoDayPrice ? (
                  <div className="bn-season-pricing">
                    <div className="bn-season-price"><span>2 Days/Week</span><strong>{prog.twoDayPrice}</strong></div>
                    <div className="bn-season-price"><span>1 Day/Week</span><strong>{prog.oneDayPrice}</strong></div>
                  </div>
                ) : (
                  <p className="bn-season-note">Dates, training days/times, and pricing will be published when {prog.season.toLowerCase()} registration opens.</p>
                )}
                {prog.oneDayNote && <p className="bn-season-note bn-season-note-highlight">{prog.oneDayNote}</p>}
                {prog.confirmNote && <p className="bn-season-note bn-season-note-highlight">{prog.confirmNote}</p>}

                {prog.deposit && (
                  <div className="bn-deposit-box">
                    <h4>{prog.deposit.amount}</h4>
                    <p>{prog.deposit.note}</p>
                    <ul>
                      {prog.deposit.perks.map((perk) => (
                        <li key={perk}>✔ {perk}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {prog.registerLinks ? (
                  <div className="bn-register-group">
                    <a href={prog.registerLinks.twoDay} target="_blank" rel="noopener noreferrer" className="bn-register-btn">Register 2 Day/Week</a>
                    <a href={prog.registerLinks.oneDay} target="_blank" rel="noopener noreferrer" className="bn-register-btn">Register 1 Day/Week</a>
                  </div>
                ) : prog.dates ? (
                  <Link to="/contact" className="bn-season-register">Register Now</Link>
                ) : (
                  <Link to="/contact" className="bn-season-register" style={{ background: "linear-gradient(90deg, #64748b, #475569)" }}>Notify Me</Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

export default BramptonNorth;
