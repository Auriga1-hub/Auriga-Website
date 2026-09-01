import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/mississauga_west.css";
import "../css/program_page.css";

const programs = [
  {
    title: "Spring Training Program",
    age: "Ages: 4–13",
    date: "May 18 – July 24, 2026",
    path: "/programs/recreation/spring/mississauga_west",
  },
  {
    title: "Summer Training Program",
    age: "Ages: 4–13",
    date: "July 27 – September 30, 2026",
    path: "/programs/recreation/summer/mississauga_west",
  },
  {
    title: "Fall Training Program",
    age: "Ages: 4–13",
    date: "October 6 – January 15",
    path: "/programs/recreation/fall/mississauga_west",
  },
  {
    title: "Winter Training Program",
    age: "Ages: 4–13",
    date: "January 19 – April 30",
    path: "/programs/recreation/winter/mississauga_west",
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

function MississaugaWest() {
  return (
    <>
      {/* HERO */}
      <SEOHead
        title="Soccer Training Mississauga West | Youth Programs | Auriga FC"
        description="Youth soccer training programs in west Mississauga. Professional coaching for ages 4–13 with year-round spring, summer, fall, and winter sessions at Auriga Football Club."
        keywords="soccer training mississauga west, youth soccer west mississauga, kids soccer lessons, soccer program meadowvale, auriga fc"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Mississauga West", path: "/programs/recreation/mississauga_west" }])} />
      {/* HERO */}
      <div className="mw-hero">
        <div className="mw-hero-overlay" />
        <div className="mw-hero-container">
          <h1 className="mw-hero-title">Mississauga West Training Program</h1>
          <p className="mw-hero-text">
            Professional youth football training in Mississauga West focused on
            skill development, teamwork, and confidence on the field.
          </p>
        </div>
      </div>


      {/* PROGRAMS SECTION */}
      <section className="mw-programs-section">
        <div className="mw-container">

          <div className="mw-section-heading">
            <span className="mw-label">Available Programs</span>
            <h2 className="mw-section-title">Mississauga West Programs</h2>
          </div>

          <div className="mw-program-grid">
            {programs.map((prog, i) => (
              <div className="mw-program-card" key={i}>
                <div className="mw-program-card-top">
                  <span className="mw-program-badge">{prog.age}</span>
                  <h3>{prog.title}</h3>
                  <div className="mw-program-date">
                    <span>🗓</span> {prog.date}
                  </div>
                </div>
                <a href={prog.path} className="mw-learn-btn">
                  Learn More →
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAINING DETAILS */}
      <section className="mw-training-section">
        <div className="mw-container">

          <div className="mw-section-heading">
            <span className="mw-label">What We Offer</span>
            <h2 className="mw-section-title">Training Details</h2>
          </div>

          <div className="mw-training-grid">
            {trainingCards.map((card, i) => (
              <div className="mw-training-card" key={i}>
                <div className="mw-card-icon">{card.icon}</div>
                <div className="mw-card-accent" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mw-cta">
            <h2>Join Auriga Football Club</h2>
            <p>Develop your skills with professional coaching and a structured program.</p>
            <Link to="/contact" className="mw-cta-btn">Register Now</Link>
          </div>

          {/* FAQ Section */}
          <div className="mw-faq">
            <p>Have any more questions? Please visit our FAQ's page.</p>
            <Link to="/faq" className="mw-faq-btn">Visit FAQ</Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default MississaugaWest;
