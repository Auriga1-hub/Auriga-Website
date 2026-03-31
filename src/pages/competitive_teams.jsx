import { Link } from "react-router-dom";
import TestimonialBar from "../components/TestimonialBar";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/competitive_teams.css";

const teams = [
  {
    year: "2017–2018 Born",
    title: "U7–U8 Development Team",
    description:
      "Young players building strong technical foundations while being introduced to structured team environments and competitive match play.",
  },
  {
    year: "2014–2015 Born",
    title: "U10–U11 Development Team",
    description:
      "Players training in a competitive development environment with regular participation in leagues, friendlies, and tournaments.",
  },
];

const expectItems = [
  "Structured team training sessions",
  "Match experience through friendlies and tournaments",
  "Tactical development and game understanding",
  "Higher expectations for discipline, focus, and consistency",
  "A clear pathway into advanced competitive environments",
];

const whoItems = [
  "Players with prior experience in structured soccer environments",
  "Players who are committed to improving and competing",
  "Families looking for a more serious development pathway",
];

const pathwayFeatures = [
  "Technical skill development",
  "Game intelligence and decision-making",
  "Consistency, discipline, and training habits",
];

function CompetitiveTeams() {
  return (
    <>
      <SEOHead
        title="Competitive Soccer Teams | Youth League Mississauga & Brampton | Auriga FC"
        description="Join Auriga FC's invite-based competitive development teams for youth soccer players. Structured team training, league play, tournaments, and a clear pathway to higher levels. Mississauga & Brampton."
        keywords="competitive youth soccer teams, soccer league mississauga, youth tournament teams, competitive soccer brampton, invite-based soccer program"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: "Competitive Teams", path: "/programs/competitive-teams" }])} />

      {/* HERO */}
      <div className="ct-hero">
        <div className="ct-hero-overlay" />
        <div className="ct-hero-container">
          <h1 className="ct-hero-title">Competitive Development Teams</h1>
          <p className="ct-hero-text">
            Train. Compete. Progress.
          </p>
          <div className="ct-hero-meta">
            <span>🏆 Invite-Based</span>
            <span>⚽ Competitive Match Play</span>
            <span>📍 Mississauga &amp; Brampton</span>
          </div>
        </div>
      </div>

      <TestimonialBar />


      {/* INTRO */}
      <section className="ct-intro-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">About the Program</span>
              <h2 className="ct-section-title">Invite-Based Competitive Teams</h2>
            </div>
            <div className="ct-intro-text">
              <p>
                Auriga Football Club's Competitive Development Teams are designed for players who
                are ready to take the next step into structured team environments. These teams focus
                on higher-level training, match play, and long-term player progression.
              </p>
              <p>
                Participation in competitive teams is by invitation only, based on a player's
                ability, commitment, and readiness.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CURRENT TEAMS */}
      <section className="ct-teams-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">Active Groups</span>
              <h2 className="ct-section-title">Current Competitive Teams</h2>
            </div>
            <p style={{ color: "#94a3b8", textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", marginBottom: "32px", lineHeight: "1.7" }}>
              We currently operate the following development teams. These teams train consistently
              and participate in friendly matches, tournaments, and league opportunities.
            </p>
            <div className="ct-team-grid">
              {teams.map((team, i) => (
                <div className="ct-team-card" key={i}>
                  <span className="ct-team-year">{team.year}</span>
                  <div className="ct-card-accent" />
                  <h3>{team.title}</h3>
                  <p>{team.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* WHAT TO EXPECT */}
      <section className="ct-expect-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">Program Details</span>
              <h2 className="ct-section-title">What to Expect</h2>
            </div>
            <p style={{ color: "#94a3b8", textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", marginBottom: "28px", lineHeight: "1.7" }}>
              Players in our competitive teams receive:
            </p>
            <ul className="ct-expect-list">
              {expectItems.map((item, i) => (
                <li key={i}>
                  <span className="ct-bullet">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* TRAINING & GAME LOCATIONS */}
      <section className="ct-locations-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">Where We Train</span>
              <h2 className="ct-section-title">Training &amp; Game Locations</h2>
            </div>
            <div className="ct-locations-text">
              <p>
                Training sessions and matches are held across <strong style={{ color: "#10b981" }}>Mississauga and Brampton</strong>.
              </p>
              <p>
                Locations are selected to ensure accessibility for players across both regions while
                maintaining high-quality training environments.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* WHO THIS IS FOR */}
      <section className="ct-who-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">Eligibility</span>
              <h2 className="ct-section-title">Who This Is For</h2>
            </div>
            <p style={{ color: "#94a3b8", textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", marginBottom: "28px", lineHeight: "1.7" }}>
              This program is ideal for:
            </p>
            <ul className="ct-who-list">
              {whoItems.map((item, i) => (
                <li key={i}>
                  <span className="ct-bullet">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* REQUEST A TRYOUT CTA */}
      <section className="ct-cta-section">
        <div className="ct-container">
          <div className="ct-cta">
            <h2>Request a Tryout</h2>
            <p>
              If your child has experience playing in structured clubs or teams and is ready for a
              more competitive environment, you can request a tryout. All players are assessed before
              being invited into a competitive team.
            </p>
            <Link to="/contact" className="ct-cta-btn">Request a Tryout</Link>
            <span className="ct-cta-note">(Spots are limited and selections are based on performance and readiness.)</span>
          </div>
        </div>
      </section>


      {/* PATHWAY */}
      <section className="ct-pathway-section">
        <div className="ct-container">
          <div className="ct-section-box">
            <div className="ct-section-heading">
              <span className="ct-label">Development Path</span>
              <h2 className="ct-section-title">The Pathway to Competitive Teams</h2>
            </div>
            <p className="ct-pathway-text">
              The most effective way to enter our Competitive Development Teams is through the
              Development Academy. Players who consistently perform at a high level in the
              Development Academy may be identified and invited into competitive teams.
            </p>
            <p style={{ color: "#94a3b8", textAlign: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", marginBottom: "8px" }}>
              Our Development Academy focuses on:
            </p>
            <ul className="ct-pathway-features">
              {pathwayFeatures.map((item, i) => (
                <li key={i}>
                  <span className="ct-bullet">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* SECONDARY CTA — Join Development */}
      <section className="ct-secondary-cta">
        <div className="ct-container">
          <div className="ct-cta">
            <h2>Start Your Journey</h2>
            <p>
              If your child is not yet in a competitive team, we recommend starting with the
              Development Academy to build the foundation required for higher-level play.
            </p>
            <Link to="/programs/development" className="ct-cta-btn">Join Development Academy</Link>
          </div>
        </div>
      </section>

    </>
  );
}

export default CompetitiveTeams;
