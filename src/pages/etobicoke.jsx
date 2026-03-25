import { Link } from "react-router-dom";
import "../css/etobicoke.css";

const programs = [
  {
    title: "Spring Development Training Program",
    age: "Ages: 4–13",
    date: "May 18 – July 24, 2026",
    path: "/programs/recreation/etobicoke/spring-u4-13",
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
      "Etobicoke, Ontario. Professional outdoor and indoor training facilities designed to support every stage of your child's development.",
  },
  {
    icon: "📅",
    title: "Schedule",
    description:
      "Programs run throughout the year with seasonal training sessions in spring, summer, fall, and winter to keep players developing year-round.",
  },
];

function Etobicoke() {
  return (
    <>
      {/* HERO */}
      <div className="eto-hero">
        <div className="eto-hero-overlay" />
        <div className="eto-hero-container">
          <h1 className="eto-hero-title">Etobicoke Training Program</h1>
          <p className="eto-hero-text">
            Professional youth football training in Etobicoke focused on
            skill development, teamwork, and confidence on the field.
          </p>
        </div>
      </div>


      {/* PROGRAMS SECTION */}
      <section className="eto-programs-section">
        <div className="eto-container">

          <div className="eto-section-heading">
            <span className="eto-label">Available Programs</span>
            <h2 className="eto-section-title">Etobicoke Programs</h2>
          </div>

          <div className="eto-program-grid">
            {programs.map((prog, i) => (
              <div className="eto-program-card" key={i}>
                <div className="eto-program-card-top">
                  <span className="eto-program-badge">{prog.age}</span>
                  <h3>{prog.title}</h3>
                  <div className="eto-program-date">
                    <span>🗓</span> {prog.date}
                  </div>
                </div>
                <Link to={prog.path} className="eto-learn-btn">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAINING DETAILS */}
      <section className="eto-training-section">
        <div className="eto-container">

          <div className="eto-section-heading">
            <span className="eto-label">What We Offer</span>
            <h2 className="eto-section-title">Training Details</h2>
          </div>

          <div className="eto-training-grid">
            {trainingCards.map((card, i) => (
              <div className="eto-training-card" key={i}>
                <div className="eto-card-icon">{card.icon}</div>
                <div className="eto-card-accent" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="eto-cta">
            <h2>Join Auriga Football Club</h2>
            <p>Develop your skills with professional coaching and a structured program.</p>
            <Link to="/contact" className="eto-cta-btn">Register Now</Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default Etobicoke;
