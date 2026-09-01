import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/brampton.css";
import "../css/program_page.css";

const programs = [
  {
    title: "Spring Training Program",
    age: "Ages: 4–13",
    date: "May 18 – July 24, 2026",
    path: "/programs/recreation/brampton/spring",
  },
  {
    title: "Summer Training Program",
    age: "Ages: 4–13",
    date: "July 27 – September 30, 2026",
    path: "/programs/recreation/brampton/summer",
  },
  {
    title: "Fall Training Program",
    age: "Ages: 4–13",
    date: "October 5 – January 27",
    path: "/programs/recreation/fall/brampton/index.html",
  },
  {
    title: "Winter Training Program",
    age: "Ages: 4–13",
    date: "February 1 – May 5",
    path: "/programs/recreation/winter/brampton/index.html",
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
      "Brampton, Ontario. Professional outdoor and indoor training facilities designed to support every stage of your child's development.",
  },
  {
    icon: "📅",
    title: "Schedule",
    description:
      "Programs run throughout the year with seasonal training sessions in spring, summer, fall, and winter to keep players developing year-round.",
  },
];

function Brampton() {
  return (
    <>

      {/* HERO */}
      <SEOHead
        title="Soccer Training Brampton | Youth Programs Ages 4-13 | Auriga FC"
        description="Youth soccer training in Brampton, Ontario. Professional coaching for ages 4–13 with year-round sessions. Build skills, confidence, and team play at Auriga Football Club."
        keywords="soccer training brampton, youth soccer brampton, kids soccer lessons brampton, soccer academy brampton, auriga fc brampton"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Brampton", path: "/programs/recreation/brampton" }])} />
      {/* HERO */}
      <div className="bram-hero">
        <div className="bram-hero-overlay" />
        <div className="bram-hero-container">
          <h1 className="bram-hero-title">Brampton Central Training Program</h1>
          <p className="bram-hero-text">
            Professional youth football training in Brampton focused on
            skill development, teamwork, and confidence on the field.
          </p>
        </div>
      </div>


      {/* PROGRAMS SECTION */}
      <section className="bram-programs-section">
        <div className="bram-container">

          <div className="bram-section-heading">
            <span className="bram-label">Available Programs</span>
            <h2 className="bram-section-title">Brampton Central Programs</h2>
          </div>

          <div className="bram-program-grid">
            {programs.map((prog, i) => (
              <div className="bram-program-card" key={i}>
                <div className="bram-program-card-top">
                  <span className="bram-program-badge">{prog.age}</span>
                  <h3>{prog.title}</h3>
                  <div className="bram-program-date">
                    <span>🗓</span> {prog.date}
                  </div>
                </div>
                <a href={prog.path} className="bram-learn-btn">
                  Learn More →
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TRAINING DETAILS */}
      <section className="bram-training-section">
        <div className="bram-container">

          <div className="bram-section-heading">
            <span className="bram-label">What We Offer</span>
            <h2 className="bram-section-title">Training Details</h2>
          </div>

          <div className="bram-training-grid">
            {trainingCards.map((card, i) => (
              <div className="bram-training-card" key={i}>
                <div className="bram-card-icon">{card.icon}</div>
                <div className="bram-card-accent" />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bram-cta">
            <h2>Join Auriga Football Club</h2>
            <p>Develop your skills with professional coaching and a structured program.</p>
            <Link to="/contact" className="bram-cta-btn">Register Now</Link>
          </div>

        </div>
      </section>

    </>
  );
}

export default Brampton;