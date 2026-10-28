/**
 * Brampton (Central) Free Assessment — GoHighLevel embedded form.
 *
 * Migrated 2026-10-21 from the previous custom-coded form (Turnstile +
 * EmailJS / Google Sheets backend) to a native GHL inline form embed.
 *
 * GHL form details (provided by site owner — do not change):
 *   Form name : Free Assessment - Brampton Central
 *   Form ID   : xfC8JOa6w5yqz8XmP3jK
 *   Embed URL : https://api.leadconnectorhq.com/widget/form/xfC8JOa6w5yqz8XmP3jK
 *
 * The original implementation is preserved for rollback at:
 *   src/pages/legacy/free_trial_brampton.legacy.jsx
 * Restore instructions:
 *   docs/ghl-migration/brampton-central-free-assessment.md
 *
 * Technical adjustments made to the supplied embed code for React:
 *   1. HTML attributes converted to JSX equivalents (style object).
 *   2. The GHL loader script (form_embed.js) is injected once via useEffect
 *      instead of a JSX <script> tag, which would not execute reliably in an
 *      SPA. The script auto-resizes the iframe via postMessage.
 *   3. Initial iframe height set to the supplied data-height (1012px) instead
 *      of height:100%, because the parent card has no fixed height and 100%
 *      would collapse to the 150px default before the GHL script resizes it.
 *      All other embed attributes are copied verbatim from the supplied code.
 */
import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import "../css/trial.css";

const GHL_FORM_ID = "xfC8JOa6w5yqz8XmP3jK";
const GHL_EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

function TrialBrampton() {
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
        title="Free Soccer Trial Brampton | Book Now | Auriga FC"
        description="Book a free soccer trial session in Brampton. Experience Auriga FC's professional youth coaching for ages 4–13. Limited spots — register today!"
        keywords="free soccer trial brampton, try soccer free brampton, kids soccer trial brampton, free youth soccer session brampton"
      />

      {/* HERO */}
      <div className="trial-hero">
        <div className="trial-hero-overlay" />
        <div className="trial-hero-container">
          <h1 className="trial-hero-title">Brampton Free Assessment</h1>
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
              <span className="trial-label">Brampton Location</span>
              <h2 className="trial-form-title">Free Assessment Registration</h2>
              <p className="trial-notice">
                Free assessment availability at our Brampton location is currently limited.
                Please contact us directly if no dates are available.
              </p>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "12px 20px", borderRadius: "10px", marginTop: "16px", display: "inline-block" }}>
                <span style={{ color: "#10b981", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                  🗓️ Runs on Mondays and Wednesdays
                </span>
              </div>
            </div>

            {/* GHL EMBEDDED FORM — "Free Assessment - Brampton Central" (ID: xfC8JOa6w5yqz8XmP3jK) */}
            <div className="ghl-embed-wrapper" style={{ width: "100%" }}>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${GHL_FORM_ID}`}
                style={{ width: "100%", height: "1012px", border: "none", borderRadius: "8px" }}
                id={`inline-${GHL_FORM_ID}`}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Free Assessment - Brampton Central"
                data-height="1012"
                data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                data-form-id={GHL_FORM_ID}
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title="Free Assessment - Brampton Central"
              ></iframe>
            </div>
          </div>{/* end trial-card */}

        </div>
      </section>

    </>
  );
}

export default TrialBrampton;