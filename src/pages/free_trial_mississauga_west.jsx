/**
 * Mississauga West Free Assessment — GoHighLevel embedded form.
 *
 * Migrated 2026-10-21 from the previous custom-coded form (Turnstile +
 * EmailJS / Google Sheets backend) to a native GHL inline form embed.
 *
 * GHL form details (provided by site owner — do not change):
 *   Form name : Free Assessment - Mississauga West
 *   Form ID   : wmDR8dnbVD09AaeOcuxW
 *   Embed URL : https://api.leadconnectorhq.com/widget/form/wmDR8dnbVD09AaeOcuxW
 *
 * The original implementation is preserved for rollback at:
 *   src/pages/legacy/free_trial_mississauga_west.legacy.jsx
 * Restore instructions:
 *   docs/ghl-migration/mississauga-west-free-assessment.md
 *
 * Technical adjustments made to the supplied embed code for React:
 *   1. HTML attributes converted to JSX equivalents (style object).
 *   2. The GHL loader script (form_embed.js) is injected once via useEffect
 *      instead of a JSX <script> tag, which would not execute reliably in an
 *      SPA. The script auto-resizes the iframe via postMessage.
 *   3. Initial iframe height set to the supplied data-height (1041px) instead
 *      of height:100%, because the parent card has no fixed height and 100%
 *      would collapse to the 150px default before the GHL script resizes it.
 *      All other embed attributes are copied verbatim from the supplied code.
 */
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import "../css/trial.css";

const GHL_FORM_ID = "wmDR8dnbVD09AaeOcuxW";
const GHL_EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

function TrialMississaugaWest() {
  useEffect(() => {
    // Load the GHL form embed script once (shared loader, safe to keep loaded
    // when navigating away — it only acts on GHL form iframes).
    if (!document.querySelector(`script[src="${GHL_EMBED_SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = GHL_EMBED_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Free Soccer Trial Mississauga West | Book Now | Auriga FC"
        description="Book a free soccer trial at our Mississauga West location. Try Auriga FC's professional youth coaching for ages 4–13. Limited spots — register today!"
        keywords="free soccer trial mississauga west, try soccer free, kids soccer trial west mississauga, free youth soccer session"
      />

      {/* HERO */}
      <div className="trial-hero">
        <div className="trial-hero-overlay" />
        <div className="trial-hero-container">
          <h1 className="trial-hero-title">Mississauga West Free Assessment</h1>
          <p className="trial-hero-text">
            Book a free assessment session for your child and experience Auriga
            Football Club training firsthand.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <section className="trial-section">
        <div className="trial-container">
          {/* OUTER HOVERABLE CARD */}
          <div className="trial-card">
            <div className="trial-form-header">
              <span className="trial-label">Mississauga West Location</span>
              <h2 className="trial-form-title">Free Assessment Registration</h2>
              <p className="trial-notice">
                Free assessment availability at our Mississauga West location is currently limited.
                Please contact us directly if no dates are available.
              </p>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "12px 20px", borderRadius: "10px", marginTop: "16px", display: "inline-block" }}>
                <span style={{ color: "#10b981", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🗓️ Runs strictly on Tuesdays and Fridays only
                </span>
              </div>
            </div>

            {/* VENUE DETAILS (preserved from the original form) */}
            <div className="trial-notice" style={{ marginBottom: "24px" }}>
              <a
                href="https://maps.app.goo.gl/6F9UU9wiekYx7xm48"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#10b981", display: "block", fontWeight: 700, textDecoration: "underline" }}
              >
                Tuesday: St. Edith Stein CES, 6234 Osprey Blvd, Mississauga, ON L5N 5V5
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=3345+Escada+Dr+Mississauga+ON+L5M+7V5"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#10b981", display: "block", fontWeight: 700, textDecoration: "underline" }}
              >
                Friday: St. Bernard of Clairvaux CES, 3345 Escada Dr, Mississauga, ON L5M 7V5
              </a>
            </div>

            {/* GHL EMBEDDED FORM — "Free Assessment - Mississauga West" (ID: wmDR8dnbVD09AaeOcuxW) */}
            <div className="ghl-embed-wrapper" style={{ width: "100%" }}>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${GHL_FORM_ID}`}
                style={{ width: "100%", height: "1041px", border: "none", borderRadius: "8px" }}
                id={`inline-${GHL_FORM_ID}`}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Free Assessment - Mississauga West"
                data-height="1041"
                data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                data-form-id={GHL_FORM_ID}
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title="Free Assessment - Mississauga West"
              ></iframe>
            </div>
          </div>{/* end trial-card */}
        </div>
      </section>
    </>
  );
}

export default TrialMississaugaWest;
