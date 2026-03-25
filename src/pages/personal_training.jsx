import { Link } from "react-router-dom";
import TestimonialBar from "../components/TestimonialBar";
import "../css/personal_training.css";

function PersonalTraining() {
  return (
    <>
      {/* HERO */}
      <div className="pt-hero">
        <div className="pt-hero-overlay" />
        <div className="pt-hero-container">
          <h1 className="pt-hero-title">Personal Training</h1>
          <p className="pt-hero-text">
            Focused. Structured. Built for real improvement. Individual attention
            designed to accelerate progress and develop core skills.
          </p>
        </div>
      </div>

      <TestimonialBar />

      {/* INTRO */}
      <section className="pt-intro-section">
        <div className="pt-container">
          <div className="pt-section-box">
            <div className="pt-section-heading">
              <span className="pt-label">Accelerated Development</span>
              <h2 className="pt-section-title">Personal Soccer Training (Ages 7–13)</h2>
            </div>
            <div className="pt-intro-text">
              <p>
                Auriga’s Personal Training program is designed for players who want faster,
                targeted development beyond regular group sessions. These sessions are
                tailored to the player’s level, position, and goals.
              </p>
              <p>
                Whether your child is building fundamentals or preparing for competitive play,
                personal training provides the individual attention needed to accelerate progress.
              </p>
              <div style={{ marginTop: "24px" }}>
                <Link to="/programs/personal-training/contact" className="pt-cta-btn">Register Now</Link>
              </div>
            </div>

            <div className="pt-features-grid">
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">👤</div>
                <h3>1-on-1 & Small Group Sessions</h3>
                <p>Direct coaching with constant feedback and correction for maximum skill retention.</p>
              </div>
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">🎯</div>
                <h3>Position-specific</h3>
                <p>Focused work based on the actual demands of your child's role on the field.</p>
              </div>
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">⚡</div>
                <h3>Technical Skill</h3>
                <p>Ball control, passing, finishing, and decision-making under intense pressure.</p>
              </div>
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">🎮</div>
                <h3>Game-realistic</h3>
                <p>Sessions designed to translate directly from the training ground to match performance.</p>
              </div>
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">📈</div>
                <h3>Confidence</h3>
                <p>Players improve faster when they understand the 'why' behind every move.</p>
              </div>
              <div className="pt-feature-card">
                <div className="pt-card-accent" />
                <div className="pt-feature-icon">🛡️</div>
                <h3>Professionalism</h3>
                <p>A serious training atmosphere focused on high standards, discipline, and grit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOALKEEPER TRAINING */}
      <section className="pt-gk-section">
        <div className="pt-container">
          <div className="pt-section-box">
            <div className="pt-gk-centered-content">
              <div className="pt-gk-content">
                <div className="pt-section-heading">
                  <span className="pt-label">Specialized Sessions</span>
                  <h2 className="pt-section-title">Goalkeeper Training (Ages 7–13)</h2>
                </div>
                <div className="pt-gk-text-wrapper">
                  <p style={{ color: "#94a3b8", marginBottom: "24px", fontFamily: "Nunito, sans-serif", textAlign: "center" }}>
                    Specialized training for a specialized position. Our sessions focus on the core technical
                    and tactical aspects required for modern goalkeepers.
                  </p>
                  <p style={{ color: "#94a3b8", marginBottom: "40px", fontFamily: "Nunito, sans-serif", textAlign: "center" }}>
                    Designed to build confidence, positioning, and decision-making under pressure.
                  </p>
                </div>
              </div>
              <div className="pt-gk-details">
                <h3 style={{ color: "white", marginBottom: "24px", fontFamily: "Montserrat, sans-serif", textAlign: "center" }}>Training Includes:</h3>
                <ul className="pt-gk-list centered">
                  <li><span className="pt-bullet">✓</span> Shot stopping techniques</li>
                  <li><span className="pt-bullet">✓</span> Handling and distribution</li>
                  <li><span className="pt-bullet">✓</span> Positioning and footwork</li>
                  <li><span className="pt-bullet">✓</span> 1v1 situations</li>
                  <li><span className="pt-bullet">✓</span> Game awareness and communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY & AVAILABILITY */}
      <section className="pt-info-section" style={{ background: "#061226", padding: "10px 0 40px 0" }}>
        <div className="pt-container">
          <div className="pt-info-grid">
            <div className="pt-info-box">
              <h3>Who This Is For</h3>
              <p>Players looking to improve faster than group training allows.</p>
              <p>Players preparing for competitive teams or tryouts.</p>
              <p>Goalkeepers who need position-specific development.</p>
            </div>
            <div className="pt-info-box">
              <h3>Limited Availability</h3>
              <p>We only take a small number of players per week to maintain training quality and attention.</p>
              <p>Spots are filled on a first-come, first-served basis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-cta-section">
        <div className="pt-container">
          <div className="pt-cta">
            <h2>Request a Personal Training Slot</h2>
            <p>Submit your request and we’ll get back to you with available timings and details.</p>
            <Link to="/programs/personal-training/contact" className="pt-cta-btn">Register Now</Link>
            <span className="pt-cta-note">(Spots are limited and filled on a first-come basis.)</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalTraining;
