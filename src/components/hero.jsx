import { Link } from "react-router-dom";
import "../css/hero.css";

function Hero() {
  return (
    <div className="hero-section">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-col">

            <h1 className="hero-title">
              Kids Soccer Training &<br />
              Youth Development Academy<br />
              <span className="hero-title-accent">Auriga Football Club</span>
            </h1>

            <p className="hero-text">
              Auriga Football Club is a community-driven youth soccer academy offering professional training programs that builds skills, fitness, and confidence, with clear development and competitive pathways for young players.
            </p>

            <div className="hero-buttons">

              <Link to="/programs/location_select" className="hero-btn hero-btn--primary">
                View Programs
              </Link>

              <Link to="/programs/location_select?program=trial" className="hero-btn hero-btn--outline">
                Book Free Trial
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Hero;
