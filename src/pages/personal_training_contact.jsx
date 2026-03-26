import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../utils/emailConfig";

const TURNSTILE_SITE_KEY = "0x4AAAAAACuIL-SoeDNpEWX7";

function PersonalTrainingContact() {
  const [ptFormData, setPtFormData] = useState({ ptName: "", ptPhone: "", ptEmail: "", ptAge: "", ptMessage: "" });
  const [ptSubmitted, setPtSubmitted] = useState(false);
  const [ptLoading, setPtLoading] = useState(false);
  const [ptError, setPtError] = useState("");
  const [ptFocused, setPtFocused] = useState(null);
  
  const ptTurnstileRef = useRef(null);
  const ptWidgetIdRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    let interval;

    const renderWidget = () => {
      if (ptTurnstileRef.current && window.turnstile && ptWidgetIdRef.current === null) {
        try {
          ptWidgetIdRef.current = window.turnstile.render(ptTurnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme: "dark",
          });
        } catch (e) {
          console.error("Turnstile render error", e);
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      interval = setInterval(() => {
        if (window.turnstile && isMounted) {
          renderWidget();
          clearInterval(interval);
        }
      }, 200);
    }

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
      if (ptWidgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(ptWidgetIdRef.current);
        ptWidgetIdRef.current = null;
      }
    };
  }, [ptSubmitted]);

  const handlePtChange = (e) => setPtFormData({ ...ptFormData, [e.target.name]: e.target.value });

  const handlePtSubmit = async (e) => {
    e.preventDefault();
    setPtError("");
    setPtLoading(true);

    const turnstileResponse = window.turnstile?.getResponse(ptWidgetIdRef.current);
    if (!turnstileResponse) {
      setPtError("Please complete the captcha verification.");
      setPtLoading(false);
      return;
    }

    const templateParams = {
      from_name: ptFormData.ptName,
      from_email: ptFormData.ptEmail,
      phone: ptFormData.ptPhone,
      child_age: ptFormData.ptAge,
      message: ptFormData.ptMessage,
      subject: "Personal Training Inquiry",
      "g-recaptcha-response": turnstileResponse, // Turnstile response can sometimes be passed as recaptcha response in EmailJS
    };

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setPtSubmitted(true);
      } else {
        setPtError("Something went wrong. Please try again.");
        window.turnstile?.reset(ptWidgetIdRef.current);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setPtError("Failed to send message. Please check your connection and try again.");
      window.turnstile?.reset(ptWidgetIdRef.current);
    } finally {
      setPtLoading(false);
    }
  };

  return (
    <>
      <div className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-container">
          <h2 className="contact-hero-subtitle">Get In Touch</h2>
          <h1 className="contact-hero-title">Personal Training</h1>
          <p className="contact-hero-text">
            Interested in one-on-one or small group personal training sessions? 
            Fill out the form below and we'll get back to you with availability!
          </p>
        </div>
      </div>

      <section className="contact-section">
        <div className="contact-container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className="contact-form-wrapper">
              {ptSubmitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>
                  <h3>Inquiry Sent!</h3>
                  <p>Thanks for your interest in personal training. We'll be in touch soon.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handlePtSubmit}>
                  {ptError && <div className="form-error">{ptError}</div>}

                  <div className="contact-form-row">
                    <div className={`contact-field ${ptFocused === "ptName" || ptFormData.ptName ? "active" : ""}`}>
                      <label>Name *</label>
                      <input
                        type="text"
                        name="ptName"
                        required
                        value={ptFormData.ptName}
                        onChange={handlePtChange}
                        onFocus={() => setPtFocused("ptName")}
                        onBlur={() => setPtFocused(null)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className={`contact-field ${ptFocused === "ptPhone" || ptFormData.ptPhone ? "active" : ""}`}>
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="ptPhone"
                        required
                        value={ptFormData.ptPhone}
                        onChange={handlePtChange}
                        onFocus={() => setPtFocused("ptPhone")}
                        onBlur={() => setPtFocused(null)}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className={`contact-field ${ptFocused === "ptEmail" || ptFormData.ptEmail ? "active" : ""}`}>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="ptEmail"
                      required
                      value={ptFormData.ptEmail}
                      onChange={handlePtChange}
                      onFocus={() => setPtFocused("ptEmail")}
                      onBlur={() => setPtFocused(null)}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className={`contact-field ${ptFocused === "ptAge" || ptFormData.ptAge ? "active" : ""}`}>
                    <label>Child's Age *</label>
                    <input
                      type="text"
                      name="ptAge"
                      required
                      value={ptFormData.ptAge}
                      onChange={handlePtChange}
                      onFocus={() => setPtFocused("ptAge")}
                      onBlur={() => setPtFocused(null)}
                      placeholder="e.g. 9 years old"
                    />
                  </div>

                  <div className={`contact-field ${ptFocused === "ptMessage" || ptFormData.ptMessage ? "active" : ""}`}>
                    <label>Message *</label>
                    <textarea
                      name="ptMessage"
                      rows={5}
                      required
                      value={ptFormData.ptMessage}
                      onChange={handlePtChange}
                      onFocus={() => setPtFocused("ptMessage")}
                      onBlur={() => setPtFocused(null)}
                      placeholder="Tell us about your child's goals, position, or any specific areas to work on..."
                    />
                  </div>

                  <div ref={ptTurnstileRef} style={{ marginBottom: "1rem" }}></div>

                  <button type="submit" className="contact-submit-btn" disabled={ptLoading}>
                    {ptLoading ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PersonalTrainingContact;
