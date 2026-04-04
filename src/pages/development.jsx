import { Link } from "react-router-dom";
import TestimonialBar from "../components/TestimonialBar";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema, buildCourseSchema } from "../components/StructuredData";
import "../css/development.css";

const skills = [
  { icon: "⚽", label: "Ball control and dribbling" },
  { icon: "🎯", label: "Passing and receiving" },
  { icon: "💥", label: "Shooting and finishing" },
  { icon: "🛡️", label: "Attacking and defending principles" },
  { icon: "🏃", label: "Movement off the ball" },
  { icon: "🧠", label: "Game awareness" },
];

const trainingItems = [
  "2 structured training sessions per week",
  "Small-group development environment",
  "High repetition and individual coaching feedback",
  "Year-round development (indoor and outdoor seasons)",
];

const playerItems = [
  "Players who want structured, high-quality training",
  "Players motivated to improve their skills",
  "Players committed to consistent training",
  "Players interested in progressing toward competitive soccer",
];

const pathwayItems = ["Youth leagues", "Friendly matches with other clubs", "Youth tournaments"];

const teams = [
  {
    year: "2014–2015",
    title: "Development Team",
    description:
      "Players train in a competitive development environment and participate in leagues and tournaments.",
  },
  {
    year: "2017–2018",
    title: "Development Group",
    description:
      "Focused on building strong technical foundations while preparing players for future competitive environments.",
  },
];

const coachingCerts = [
  "Learn to Train certified coaches",
  "Soccer for Life certified coaches",
];

function Development() {
  return (
    <>
      <SEOHead
        title="Development Academy | Advanced Youth Soccer Training Mississauga & Brampton"
        description="Join the Auriga Development Academy for advanced youth soccer training. Small-group sessions, certified coaches, and a clear pathway to competitive teams. Ages 7–12 in Mississauga & Brampton."
        keywords="soccer development academy, advanced youth soccer training, soccer academy mississauga, competitive soccer pathway, youth football development brampton"
      />
      <StructuredData data={[
        buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Development Academy", path: "/programs/development" }]),
        buildCourseSchema({ name: "Auriga Development Academy", description: "Advanced youth soccer training program for ages 7-12. Small-group sessions focusing on technical development, game intelligence, and competitive readiness." })
      ]} />

      {/* HERO */}
      <div className="dev-hero">
        <div className="dev-hero-overlay" />
        <div className="dev-hero-container">
          <h1 className="dev-hero-title">Development Academy</h1>
          <p className="dev-hero-text">
            Small, focused training groups preparing players for competitive environments.
          </p>
          <div className="dev-hero-meta">
            <span>⚽ Ages: U7–U12</span>
            <span>📅 Sessions: 2 per week</span>
            <span>📍 Mississauga &amp; Brampton</span>
          </div>
        </div>
      </div>

      <TestimonialBar />


      {/* INTRO */}
      <section className="dev-intro-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-section-heading">
              <span className="dev-label">About the Program</span>
              <h2 className="dev-section-title">Bridging Fundamentals &amp; Competition</h2>
            </div>
            <div className="dev-intro-text">
              <p>
                The Auriga Development Academy is designed for players who want more focused training
                and a pathway toward competitive soccer.
              </p>
              <p>
                This program serves as the bridge between Auriga's Fundamentals Program and our
                Competitive Development Teams.
              </p>
              <p>
                Players train in a structured environment where coaches focus on technical
                improvement, game intelligence, and decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SKILLS */}
      <section className="dev-skills-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-section-heading">
              <span className="dev-label">Curriculum</span>
              <h2 className="dev-section-title">What Players Work On</h2>
            </div>
            <div className="dev-skills-grid">
              {skills.map((s, i) => (
                <div className="dev-skill-card" key={i}>
                  <div className="dev-skill-icon">{s.icon}</div>
                  <div className="dev-card-accent" />
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
            <p className="dev-skills-note">
              Players are also introduced to tactical concepts such as spacing, support play, and transitions.
            </p>
          </div>
        </div>
      </section>


      {/* TRAINING STRUCTURE */}
      <section className="dev-training-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-section-heading">
              <span className="dev-label">How We Train</span>
              <h2 className="dev-section-title">Training Structure</h2>
            </div>
            <div className="dev-training-grid">
              {trainingItems.map((item, i) => (
                <div className="dev-training-card" key={i}>
                  <div className="dev-check">✓</div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="dev-training-note">
              Training sessions are designed to help players build confidence, consistency, and competitive readiness.
            </p>
          </div>
        </div>
      </section>


      {/* WHO IS THIS FOR */}
      <section className="dev-players-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-two-col">
              <div className="dev-section-heading left">
                <span className="dev-label">Eligibility</span>
                <h2 className="dev-section-title">Who This Program Is For</h2>
              </div>
              <ul className="dev-players-list">
                {playerItems.map((item, i) => (
                  <li key={i}>
                    <span className="dev-bullet">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* PATHWAY */}
      <section className="dev-pathway-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-section-heading">
              <span className="dev-label">Next Steps</span>
              <h2 className="dev-section-title">Pathway to Competitive Teams</h2>
            </div>
            <p className="dev-pathway-text">
              Players who demonstrate strong development may be invited to try out for Auriga's Competitive Development Teams.
            </p>
            <div className="dev-pathway-tags">
              {pathwayItems.map((item, i) => (
                <span className="dev-tag" key={i}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CURRENT TEAMS */}
      <section className="dev-teams-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-section-heading">
              <span className="dev-label">Active Groups</span>
              <h2 className="dev-section-title">Current Development Teams</h2>
            </div>
            <div className="dev-team-grid">
              {teams.map((team, i) => (
                <div className="dev-team-card" key={i}>
                  <span className="dev-team-year">{team.year}</span>
                  <div className="dev-card-accent" />
                  <h3>{team.title}</h3>
                  <p>{team.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* COACHING */}
      <section className="dev-coaching-section">
        <div className="dev-container">
          <div className="dev-section-box">
            <div className="dev-two-col">
              <div className="dev-section-heading left">
                <span className="dev-label">Our Staff</span>
                <h2 className="dev-section-title">Coaching</h2>
              </div>
              <div className="dev-coaching-content">
                <p>
                  Players train under coaches certified through the Canada Soccer coaching pathway.
                </p>
                <ul className="dev-cert-list">
                  {coachingCerts.map((cert, i) => (
                    <li key={i}>
                      <span className="dev-bullet">✓</span>
                      {cert}
                    </li>
                  ))}
                </ul>
                <p>
                  Our coaching staff focuses on creating a structured and supportive environment
                  that prioritizes long-term player development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="dev-cta-section">
        <div className="dev-container">
          <div className="dev-cta">
            <h2>Ready to Join the Development Academy?</h2>
            <p>Take the next step in your child's football journey with structured, professional coaching.</p>
            <Link to="/contact" className="dev-cta-btn">Get In Touch</Link>
          </div>
        </div>
      </section>

    </>
  );
}

export default Development;