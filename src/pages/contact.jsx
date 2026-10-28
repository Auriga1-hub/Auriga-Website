/**
 * General Inquiry (Contact page) — GoHighLevel embedded form.
 *
 * Migrated 2026-10-22 from the previous custom-coded form (Turnstile +
 * EmailJS / Google Sheets backend) to a native GHL inline form embed.
 *
 * GHL form details (provided by site owner — do not change):
 *   Form name : General Inquiry Form
 *   Form ID   : tzLHeZU1w3WChB1IAw2L
 *   Embed URL : https://api.leadconnectorhq.com/widget/form/tzLHeZU1w3WChB1IAw2L
 *
 * The original implementation is preserved for rollback at:
 *   src/pages/legacy/contact.legacy.jsx
 * Restore instructions:
 *   docs/ghl-migration/general-inquiry-contact.md
 *
 * Technical adjustments made to the supplied embed code for React:
 *   1. HTML attributes converted to JSX equivalents (style object).
 *   2. The GHL loader script (form_embed.js) is injected once via useEffect
 *      instead of a JSX <script> tag, which would not execute reliably in an
 *      SPA. The script auto-resizes the iframe via postMessage.
 *   3. Initial iframe height set to the supplied data-height (885px) instead
 *      of height:100%, because the parent card has no fixed height and 100%
 *      would collapse to the 150px default before the GHL script resizes it.
 *      All other embed attributes are copied verbatim from the supplied code.
 */
import { useEffect } from "react";
import "../css/contact.css";
import SEOHead from "../components/SEOHead";
import StructuredData, { localBusinessSchema, buildBreadcrumbSchema } from "../components/StructuredData";

const GHL_FORM_ID = "tzLHeZU1w3WChB1IAw2L";
const GHL_EMBED_SCRIPT_SRC = "https://link.msgsndr.com/js/form_embed.js";

function Contact() {
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
        title="Contact Auriga FC | Youth Soccer Registration Mississauga & Brampton"
        description="Contact Auriga Football Club for youth soccer registration, program inquiries, or free assessment bookings. Call 647-978-6798 or email info@aurigafootballclub.com. Located in Mississauga, ON."
        keywords="contact auriga fc, soccer registration mississauga, youth soccer inquiries, register kids soccer brampton, soccer club contact"
      />
      <StructuredData data={[localBusinessSchema, buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />

      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-container">
          <h2 className="contact-hero-subtitle">Get In Touch</h2>
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-text">
            Have a question about our programs? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT — Message Us */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">

            {/* LEFT — INFO */}
            <div className="contact-info">

              <div className="contact-info-header">
                <span className="contact-label">Auriga Football Club</span>
                <h2 className="contact-info-title">Youth Soccer Training in Mississauga &amp; Brampton</h2>
                <p className="contact-info-text">
                  Auriga FC provides structured youth soccer training programs for ages 4–13.
                  Our certified coaches focus on technical skill development, small-group training,
                  and long-term player progression.
                </p>
              </div>

              <div className="contact-details">

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📞</div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Phone</span>
                    <a href="tel:6479786798" className="contact-detail-value" data-analytics-placement="contact_page">647-978-6798</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">✉️</div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Email</span>
                    <a href="mailto:info@aurigafootballclub.com" className="contact-detail-value" data-analytics-placement="contact_page">info@aurigafootballclub.com</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📍</div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">4765 Huron Heights Dr,<br />Mississauga, ON L4Z 4G9</span>
                  </div>
                </div>

              </div>

              <div className="contact-socials">
                <a href="https://www.facebook.com/people/Auriga-Football-Club/100091466900502/" target="_blank" rel="noreferrer" className="contact-social-btn" data-analytics-placement="contact_page">
                  Facebook
                </a>
                <a href="https://www.instagram.com/aurigafc" target="_blank" rel="noreferrer" className="contact-social-btn" data-analytics-placement="contact_page">
                  Instagram
                </a>
              </div>

            </div>

            {/* RIGHT — GHL EMBEDDED FORM */}
            <div className="contact-form-wrapper">
              {/* "General Inquiry Form" (GHL form ID: tzLHeZU1w3WChB1IAw2L) */}
              <div className="ghl-embed-wrapper" style={{ width: "100%" }}>
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${GHL_FORM_ID}`}
                  style={{ width: "100%", height: "885px", border: "none", borderRadius: "8px" }}
                  id={`inline-${GHL_FORM_ID}`}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="General Inquiry Form"
                  data-height="885"
                  data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                  data-form-id={GHL_FORM_ID}
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title="General Inquiry Form"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

export default Contact;