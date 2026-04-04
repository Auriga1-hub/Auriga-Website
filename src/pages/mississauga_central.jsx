import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/mississauga_central.css";

const programs = [
  {
    title: "Spring Development Training Program",
    age: "Ages: 4–13",
    date: "May 18 – July 24, 2026",
    path: "/programs/recreation/mississauga_central/spring-u4-13",
  },
];

const trainingCards = [
  {
    icon: "⚽",
    title: "Training Philosophy",
    description:
      "Auriga Football Club focuses on building confident, technically skilled players who understand the game. Our training combines structured drills, small-sided games, and decision-making exercises.",
  },
  {
    icon: "📍",
    title: "Location",
    description:
      "Mississauga, Ontario. Professional outdoor and indoor training facilities designed to support every stage of your child's development.",
  },
  {
    icon: "📅",
    title: "Schedule",
    description:
      "Programs run throughout the year with seasonal training sessions in spring, summer, fall, and winter to keep players developing year-round.",
  },
];

function MississaugaCentral() {
  return (
    <>
      <SEOHead
        title="Soccer Training Mississauga Central | Youth Programs | Auriga FC"
        description="Professional youth soccer training programs in central Mississauga. Spring, summer, fall, and winter sessions for ages 4–13. Structured coaching focused on skill development."
        keywords="soccer training mississauga central, youth soccer mississauga, kids soccer lessons central mississauga, soccer program near me"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Mississauga Central", path: "/programs/recreation/mississauga_central" }])} />

      {/* HERO */}
      <div className="mc-hero">
        <div className="mc-hero-overlay" />
        <div className="mc-hero-container">
          <h1 className="mc-hero-title">Mississauga Central Training Program</h1>
          <p className="mc-hero-text">
            Professional youth football training in Mississauga Central focused on
            skill development, teamwork, and confidence on the field.
          </p>
        </div>
      </div>


      {/* PROGRAMS SECTION */}
      <section className="mc-programs-section">
        <div className="mc-container">

          <div className="mc-section-heading">
            <span className="mc-label">Available Programs</span>
            <h2 className="mc-section-title">Mississauga Central Programs</h2>
          </div>

          <div className="mc-program-grid">
            {programs.map((prog, i) => (
              <div className="mc-program-card" key={i}>
                <div className="mc-program-card-top">
                  <span className="mc-program-badge">{prog.age}</span>
                  <h3>{prog.title}</h3>
                  <div className="mc-program-date">
                    <span>🗓</span> {prog.date}
                  </div>
                </div>
                <Link to={prog.path} className="mc-learn-btn">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAINING DETAILS */}
      <section className="mc-training-section">
        <div className="mc-container">

          <div className="mc-section-heading">
            <span className="mc-label">What We Offer</span>
            <h2 className="mc-section-title">Training Details</h2>
          </div>

          <div className="mc-training-grid">
            {trainingCards.map((card, i) => (
              <div className="mc-training-card" key={i}>
                <div className="mc-card-icon">{card.icon}</div>
                <div className="mc-card-accent" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mc-cta">
            <h2>Join Auriga Football Club</h2>
            <p>Develop your skills with professional coaching and a structured program.</p>
            <Link to="/contact" className="mc-cta-btn">Register Now</Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default MississaugaCentral;
