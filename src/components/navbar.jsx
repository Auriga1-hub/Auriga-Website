import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navItems, navCTAs } from "../data/navConfig";
import "../css/navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="site-navbar">

      <div className="container header-container">

        {/* LOGO */}
        <div className="site-logo">
          <NavLink to="/" className="logo-wrapper" onClick={() => { closeMenu(); scrollToTop(); }}>
            <img src="/images/logo.webp" alt="Auriga Football Club" className="navbar-logo" fetchpriority="high" loading="eager" />
          </NavLink>
        </div>

        {/* HAMBURGER BUTTON */}
        <button className={`mobile-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`site-navigation ${isOpen ? 'nav-open' : ''}`} aria-label="Main navigation">

          <ul className="site-menu">

            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        closeMenu();
                        scrollToTop();
                      }}
                      className={({ isActive }) =>
                        isActive ? "menu-link active" : "menu-link"
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                );
              }

              const isDropdownActive =
                item.activePrefix && location.pathname.startsWith(item.activePrefix);

              return (
                <li className="has-children" key={item.label}>
                  <span className={`menu-link nav-label${isDropdownActive ? " active" : ""}`}>
                    {item.label}
                    <span className="dropdown-arrow">▾</span>
                  </span>
                  <ul className="dropdown">
                    {item.items.map((sub) => (
                      <li key={sub.path}>
                        <NavLink to={sub.path} onClick={closeMenu}>{sub.label}</NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}

            {navCTAs.map((cta) => (
              <li className={cta.className} key={cta.path}>
                <NavLink
                  to={cta.path}
                  onClick={closeMenu}
                  data-analytics-event={cta.analytics.event}
                  data-analytics-placement={cta.analytics.placement}
                  data-analytics-destination={cta.path}
                  data-analytics-label={cta.analytics.label}
                >
                  {cta.label}
                </NavLink>
              </li>
            ))}

          </ul>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;