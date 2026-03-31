import { Link } from "react-router-dom";
import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer-section" aria-label="Site footer">

      <div className="footer-main">

        {/* LEFT — brand + description */}
        <div className="footer-left">
          <Link to="/" className="footer-brand">
            <img src="/images/logo.webp" alt="Auriga FC" className="footer-brand-logo" loading="lazy" decoding="async" />
          </Link>

          <p className="footer-desc">
            Structured youth soccer training in Mississauga, Etobicoke & Brampton for ages 4–13.
            Certified coaches focused on technical skill, small-group training, and
            long-term player development.
          </p>
        </div>

        {/* MIDDLE — quick links */}
        <div className="footer-nav">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {/* Programs group */}
            <li className="footer-nav-parent">Programs</li>
            <li className="footer-nav-child">
              <Link to="/programs/location_select?program=recreation">Fundamentals</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/programs/development">Development</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/programs/competitive-teams">Competitive Teams</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/programs/personal-training">Personal Training</Link>
            </li>

            <li className="footer-nav-parent">Camps</li>
            <li className="footer-nav-child">
              <Link to="/programs/camps">Summer Camp</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/programs/winter-camp">Winter Camp</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/programs/march-break-camp">March Break Camp</Link>
            </li>

            {/* Resources group */}
            <li className="footer-nav-parent">Resources</li>
            <li className="footer-nav-child">
              <Link to="/resources/player-development">Player Development</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="footer-nav-child">
              <Link to="/policies">Policies</Link>
            </li>

            <li><Link to="/programs/location_select?program=trial">Free Trial</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* RIGHT — contact */}
        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <ul>
            <li>
              <span className="footer-icon">📞</span>
              <a href="tel:6479786798">647-978-6798</a>
            </li>
            <li>
              <span className="footer-icon">✉</span>
              <a href="mailto:info@aurigafootball.com">info@aurigafootball.com</a>
            </li>
            <li>
              <span className="footer-icon">📍</span>
              <span>525 Huntington Ridge Dr,<br />Mississauga, ON L5R 2X7</span>
            </li>
            <li className="footer-social-links" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a 
                href="https://www.facebook.com/people/Auriga-Football-Club/100091466900502/" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#10b981'}
                onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
              >
                Facebook
              </a>
              <span style={{ color: '#334155' }}>|</span>
              <a 
                href="https://www.instagram.com/aurigafc" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
                onMouseOver={(e) => e.target.style.color = '#10b981'}
                onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Auriga Football Club — All Rights Reserved</p>
      </div>

    </footer>
  );
}

export default Footer;