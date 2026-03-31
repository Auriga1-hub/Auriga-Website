import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/about.css";

function About() {
  return (
    <>
      <SEOHead
        title="About Auriga FC | Youth Soccer Academy Mississauga & Brampton"
        description="Learn about Auriga Football Club's mission, vision, and coaching philosophy. Professional youth soccer academy developing young players ages 4–13 in Mississauga, Brampton, and Etobicoke."
        keywords="about auriga football club, youth soccer academy mississauga, soccer coaching philosophy, kids soccer school brampton, youth development soccer"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      {/* HERO */}
      <div className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-container">
          <h1 className="about-hero-title">About Our Academy</h1>
          <p className="about-hero-text">
            Developing young athletes through structured coaching,
            technical training, and a passion for the game.
          </p>
        </div>
      </div>

      {/* ABOUT CONTENT */}
      <section className="about-page-section">
        <div className="about-page-container">
          <div className="about-page-layout">

            {/* LEFT — main cards */}
            <div className="about-cards-col">

              <div className="about-card">
                <h2>Our Mission &amp; Vision</h2>
                <p>
                  At Auriga, our mission is to inspire and empower young athletes to achieve their
                  highest potential on and off the field. We are dedicated to providing a nurturing
                  and inclusive environment that fosters personal growth, teamwork, and a lifelong
                  passion for soccer.
                </p>
                <p>
                  To be the premier soccer academy that cultivates future champions, both on and off
                  the field, by blending top-tier training with the pure joy of the game. We envision
                  a community where young athletes thrive in a fun, supportive, and challenging
                  environment, becoming not only exceptional players but also well-rounded individuals.
                </p>
              </div>

              <div className="about-card">
                <h2>Philosophy &amp; Style of Play</h2>
                <p>
                  At Auriga Football Club, our style of play is inspired by the world's best
                  possession-based systems. We teach players to value the ball, think quickly,
                  and make smart decisions under pressure.
                </p>
                <p>
                  Every session blends discipline with confidence, helping each child understand
                  their individual role while learning how to move, create, and combine as part of a team.
                </p>
                <p>
                  With a focus on individual growth within a unified team identity, we build young
                  athletes who play with creativity, control, and joy — the Auriga way.
                </p>
              </div>

            </div>

            {/* RIGHT — sticky side card */}
            <div className="about-side-col">
              <div className="why-join-card">
                <h3>Why Join Us?</h3>
                <p>
                  At Auriga Football Club, your child isn't just another player in a crowd —
                  they're guided with intention, structure, and genuine care.
                </p>
                <p>
                  With certified coaches and structured programs, each child learns the right
                  way from day one, following a pathway from fundamentals to competitive football.
                </p>
                <p>
                  Parents choose Auriga because their children are mentored, supported, and pushed
                  to grow — not just as athletes, but as confident individuals ready for long-term success.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta-container">
          <h2 className="cta-title">Start Your Journey With Auriga Football Club</h2>
          <p className="cta-text">
            Join our professional youth training programs and help your child develop
            confidence, discipline, and technical football skills.
          </p>
          <Link to="/contact" className="about-cta-btn">
            Get In Touch With Us
          </Link>
        </div>
      </section>

    </>
  );
}

export default About;