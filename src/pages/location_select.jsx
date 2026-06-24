import { useSearchParams, useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import { trackLocationSelection } from "../utils/analytics";
import "../css/location_select.css";
import "../css/home.css";

const programConfig = {
  recreation: {
    title: "Fundamentals Program (Ages 4–13)",
    subtitle: "Beginner Soccer Training in Mississauga, Brampton & Brampton West Focused on Skills, Confidence, and Game Fundamentals for Kids Ages 4–13",
  },
  trial: {
    title: "Free Assessments",
    subtitle: "Pick your preferred location and book your free assessment session.",
  },
  camp: {
    title: "Christmas Camps",
    subtitle: "Select your location and secure your spot in our holiday camps.",
  },
};

const locations = [
  {
    city: "Mississauga Central",
    slug: "mississauga_central",
    mapSrc: "https://maps.google.com/maps?q=4765+Huron+Heights+Dr,+Mississauga,+ON+L4Z+4G9&z=17&output=embed",
    trialMapSrc: "https://maps.google.com/maps?q=4765+Huron+Heights+Dr,+Mississauga,+ON+L4Z+4G9&z=17&output=embed",
    trialDirectionsUrl: "https://share.google/JJJdxpHYQGxSsKIvk",
    directionsUrl: "https://maps.app.goo.gl/t9JDDXpqjAmm46qW6?g_st=iwb",
  },
  {
    city: "Mississauga West",
    slug: "mississauga_west",
    mapSrc: "https://maps.google.com/maps?q=John+Fraser+Secondary+School,+2665+Erin+Centre+Blvd,+Mississauga,+ON+L5M+5H6&z=17&output=embed",
    directionsUrl: "https://maps.app.goo.gl/fWEZ3YbyeXtEnNgWA?g_st=iwb",
  },
  {
    city: "Brampton",
    slug: "brampton",
    mapSrc: "https://maps.google.com/maps?q=100+Hilldale+Crescent,+Brampton,+ON+L6S+2N3&z=17&output=embed",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=100+Hilldale+Crescent,+Brampton,+ON+L6S+2N3",
  },
  {
    city: "Brampton West",
    slug: "brampton-west",
    mapSrc: "https://maps.google.com/maps?q=10750+Chinguacousy+Rd,+Brampton,+ON+L7A+2Z7&z=17&output=embed",
    directionsUrl: "https://share.google/aVWhIMZ2cx39XlKXQ",
  },
];

function LocationSelect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const program = searchParams.get("program") || "recreation";

  const config = programConfig[program] || programConfig.recreation;

  const handleLocationClick = (locationSlug) => {
    const destination = `/programs/${program}/${locationSlug}`;

    trackLocationSelection({
      programType: program,
      location: locationSlug,
      destination,
    });
    navigate(destination);
  };

  return (
    <>
      <SEOHead
        title={`${config.title} | Choose Training Location | Auriga FC`}
        description={`Select your preferred training location for ${config.title} at Auriga Football Club. Available in Mississauga Central, Mississauga West, Brampton, and Brampton West.`}
        keywords={`soccer training locations, ${config.title.toLowerCase()} mississauga, youth soccer brampton, soccer near me, auriga fc locations`}
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: config.title, path: "/programs/location_select" }])} />

      {/* HERO */}
      <div className="location-select-hero">
        <div className="location-select-hero-overlay" />
        <div className="location-select-hero-container">
          <h1 className="location-select-title">{config.title}</h1>
          <p className="location-select-text">{config.subtitle}</p>
        </div>
      </div>

      {/* LOCATION PICKER */}
      <section className="location-select-section">
        <div className="location-select-container">

          <div className="location-select-heading">
            <h2 className="location-select-section-title">Choose Your Training Location</h2>
          </div>

          <div className="locations-grid">
            {locations.map((loc) => (
              <div
                key={loc.slug}
                className="location-card"
                onClick={() => handleLocationClick(loc.slug)}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", height: "100%" }}
              >
                <h3 className="location-title">{loc.city}</h3>

                <div className="map-container" style={{ flexGrow: 1 }}>
                  {loc.mapImageSrc && program !== "trial" ? (
                    <img
                      src={loc.mapImageSrc}
                      alt={`${loc.city} location map`}
                      loading="lazy"
                      className="map-image"
                    />
                  ) : (
                    <iframe
                      src={program === "trial" && loc.slug === "mississauga_central" ? loc.trialMapSrc : loc.mapSrc}
                      loading="lazy"
                      title={loc.city}
                      style={{ pointerEvents: "none" }} /* Prevent iframe hijacking clicks so card click works */
                    />
                  )}
                  {program === 'trial' && (
                    <a
                      href={loc.slug === "mississauga_central" ? loc.trialDirectionsUrl : loc.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-btn"
                      onClick={(e) => e.stopPropagation()}
                      data-analytics-placement="location_select"
                      style={{ padding: "12px 24px", fontSize: "14px", bottom: "16px" }}
                    >
                      Get Directions 🗺️
                    </a>
                  )}
                </div>

                <div style={{ padding: "20px 24px 24px", background: "#0b2239" }}>
                  <div 
                    style={{ 
                      background: program === 'trial' ? "linear-gradient(90deg, #10b981, #059669)" : "linear-gradient(90deg, #3b82f6, #1d4ed8)", 
                      color: "white", 
                      padding: "16px 24px", 
                      borderRadius: "12px", 
                      fontFamily: "'Montserrat', sans-serif", 
                      fontWeight: "700", 
                      fontSize: "15px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "space-between", 
                      boxShadow: program === 'trial' ? "0 8px 20px rgba(16, 185, 129, 0.3)" : "0 8px 20px rgba(59, 130, 246, 0.3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    <span>{program === 'trial' ? "Book a Tryout" : "Explore Programs"}</span>
                    <span style={{ fontSize: "18px", transition: "transform 0.2s" }}>→</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </>
  );
}

export default LocationSelect;