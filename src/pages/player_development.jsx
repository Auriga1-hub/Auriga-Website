import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/player_development.css";

function PlayerDevelopment() {
  return (
    <>
      <SEOHead
        title="Player Development Pathway | Auriga FC Soccer Academy"
        description="Discover Auriga FC's clear player development pathway from fundamentals to competitive teams. Structured progression for young soccer players ages 4–13 in Mississauga & Brampton."
        keywords="player development soccer, soccer pathway mississauga, youth soccer progression, soccer academy development, kids soccer levels"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources/player-development" }, { name: "Player Development", path: "/resources/player-development" }])} />

      {/* HERO */}
      <div className="player-dev-hero">
        <div className="player-dev-hero-overlay" />
        <div className="player-dev-hero-container">
          <h1 className="player-dev-hero-title">Player Development Pathway</h1>
          <p className="player-dev-hero-text">
            A clear progression from recreational football to competitive development teams.
          </p>
        </div>
      </div>

      {/* CONTENT PORTION */}
      <section className="player-dev-section">
        <div className="player-dev-container">
          
          {/* INTRO */}
          <div className="player-dev-intro">
            <span className="player-dev-label">Our Pathway</span>
            <h2 className="player-dev-title">Auriga Player Development Pathway</h2>
            <p>
              At Auriga Football Club, player development follows a clear pathway
              designed to support both recreational players and those who aim to
              compete at higher levels.
            </p>
          </div>

          {/* LARGE IMAGE */}
          <div className="player-dev-large-image">
             <img src="/images/player_development.webp" alt="Player Development Pathway" loading="lazy" decoding="async" width="800" height="450" />
          </div>

          {/* 3 STEPS GRID */}
          <div className="player-dev-steps-grid">
            <div className="player-dev-step-card">
              <div className="step-number">01</div>
              <h3>Fundamentals Program</h3>
              <p>
                Most players begin in our Fundamentals Program, where they build
                confidence, coordination, and core technical skills in a
                structured and positive training environment.
              </p>
            </div>

            <div className="player-dev-step-card">
              <div className="step-number">02</div>
              <h3>Development Academy</h3>
              <p>
                Players who want to continue improving their skills can join the
                Development Academy, which provides more advanced training focused on
                technical development, game intelligence, and stronger training
                intensity. This program is open to players who are motivated to
                develop their game further.
              </p>
            </div>

            <div className="player-dev-step-card">
              <div className="step-number">03</div>
              <h3>Competitive Teams</h3>
              <p>
                From there, players who demonstrate strong ability, commitment,
                and readiness may be invited to join our Development / Competitive
                Teams. These teams participate in structured team training, friendly
                matches, tournaments, and league competitions.
              </p>
            </div>
          </div>

          {/* HIGHLIGHT */}
          <div className="player-dev-highlight">
            <p>
              Our pathway follows the principles of the Canada Soccer Grassroots
              development model and aligns with the broader provincial development
              structure in Ontario. This system allows every player to enjoy the
              game while also providing a clear pathway for those who want to
              progress into competitive soccer.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="player-dev-cta">
        <div className="player-dev-cta-container">
          <h2 className="cta-title">Ready to Start the Journey?</h2>
          <p className="cta-text">
            Find the right program for your child's age and experience level.
          </p>
          <div className="player-dev-buttons">
             <Link to="/programs/location_select?program=recreation" className="player-dev-btn-primary">
                Fundamentals
             </Link>
             <Link to="/programs/development" className="player-dev-btn-outline">
                Development Academy
             </Link>
          </div>
        </div>
      </section>

    </>
  );
}

export default PlayerDevelopment;
