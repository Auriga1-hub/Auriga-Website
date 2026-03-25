import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-navbar">

      <div className="container header-container">

        {/* LOGO */}
        <div className="site-logo">
          <NavLink to="/" className="logo-wrapper">
            <img src="/images/logo.webp" alt="Auriga Football Club" className="navbar-logo" fetchpriority="high" />
          </NavLink>
        </div>

        {/* HAMBURGER BUTTON */}
        <button className={`mobile-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`site-navigation ${isOpen ? 'nav-open' : ''}`}>

          <ul className="site-menu">

            {/* HOME */}
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Home
              </NavLink>
            </li>

            {/* ABOUT */}
            <li>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                About
              </NavLink>
            </li>

            {/* PROGRAMS */}
            <li className="has-children">
              <span className="menu-link nav-label">
                Programs
                <span className="dropdown-arrow">▾</span>
              </span>
              <ul className="dropdown">
                <li>
                  <NavLink to="/programs/location_select?program=recreation" onClick={closeMenu}>
                    Fundamentals
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/programs/development" onClick={closeMenu}>
                    Development
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/programs/competitive-teams" onClick={closeMenu}>
                    Competitive Teams
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/programs/personal-training" onClick={closeMenu}>
                    Personal Training
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* CAMPS */}
            <li className="has-children">
              <span className="menu-link nav-label">
                Camps
                <span className="dropdown-arrow">▾</span>
              </span>
              <ul className="dropdown">
                <li>
                  <NavLink to="/programs/camps" onClick={closeMenu}>Summer Camp</NavLink>
                </li>
                <li>
                  <NavLink to="/programs/winter-camp" onClick={closeMenu}>Winter Camp</NavLink>
                </li>
                <li>
                  <NavLink to="/programs/march-break-camp" onClick={closeMenu}>March Break Camp</NavLink>
                </li>
              </ul>
            </li>

            {/* RESOURCES */}
            <li className="has-children">
              <span className="menu-link nav-label">
                Resources
                <span className="dropdown-arrow">▾</span>
              </span>
              <ul className="dropdown">
                <li>
                  <NavLink to="/resources/player-development" onClick={closeMenu}>Player Development</NavLink>
                </li>
                <li>
                  <NavLink to="/faq" onClick={closeMenu}>FAQ</NavLink>
                </li>
                <li>
                  <NavLink to="/policies" onClick={closeMenu}>Policies</NavLink>
                </li>
              </ul>
            </li>

            {/* FREE TRIAL BUTTON — primary CTA */}
            <li className="free-trial-button">
              <NavLink to="/programs/location_select?program=trial" onClick={closeMenu}>
                Free Trial
              </NavLink>
            </li>

            {/* CONTACT BUTTON — ghost/outline */}
            <li className="cta-button">
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>

          </ul>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;