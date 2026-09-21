import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/about.css";

function OurTeam() {
  return (
    <>
      <SEOHead
        title="Our Team | Auriga Football Club"
        description="Meet the coaching team behind Auriga Football Club and learn how our coaches support young players through structured, positive, and purposeful soccer development."
        keywords="Auriga Football Club team, youth soccer coaches Mississauga, soccer coaches Brampton, Auriga FC coaching team"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our Team", path: "/our-team" }])} />

      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-container">
          <h1 className="about-hero-title">Our Team</h1>
          <p className="about-hero-text">
            Dedicated coaches helping young players grow with confidence, discipline, and a love for the game.
          </p>
        </div>
      </div>

      {/* TEAM CONTENT */}
      <section className="about-page-section">
        <div className="about-page-container">
          <div className="about-page-layout">
            <div className="about-cards-col">
              <div className="about-card">
                <h2>Coaching With Purpose</h2>
                <p>
                  Our coaching team is committed to creating a positive, structured environment where every player can learn, compete, and enjoy soccer.
                </p>
                <p>
                  Sessions are designed around clear teaching points, meaningful repetition, and age-appropriate challenges that help players understand the game and build confidence.
                </p>
              </div>

              <div className="about-card">
                <h2>Supporting Every Player</h2>
                <p>
                  Auriga coaches work with players at every stage of their development, from building fundamental skills to preparing motivated players for competitive environments.
                </p>
                <p>
                  We focus on technical quality, decision-making, teamwork, and personal growth so players can carry what they learn on the field into their everyday lives.
                </p>
              </div>
            </div>

            <div className="about-side-col">
              <div className="why-join-card">
                <h3>What Guides Our Team?</h3>
                <p>
                  Our coaches lead with patience, consistency, and genuine care for each player's progress.
                </p>
                <p>
                  We believe strong relationships, clear standards, and an encouraging training environment help young athletes reach their potential.
                </p>
                <p>
                  Together, our team is building a club where players feel supported to work hard, take responsibility, and keep improving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-container">
          <h2 className="cta-title">Train With Auriga Football Club</h2>
          <p className="cta-text">
            Learn more about our programs and find the right next step for your player.
          </p>
          <Link to="/contact" className="about-cta-btn">
            Get In Touch With Us
          </Link>
        </div>
      </section>
    </>
  );
}

export default OurTeam;
