import { useState, useRef, useEffect } from "react";
import "../css/contact.css";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../utils/emailConfig";

const TURNSTILE_SITE_KEY = "0x4AAAAAACuIL-SoeDNpEWX7";

function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && widgetIdRef.current === null) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [submitted]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const turnstileResponse = window.turnstile?.getResponse(widgetIdRef.current);
    if (!turnstileResponse) {
      setError("Please complete the captcha verification.");
      setLoading(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: "General Website Inquiry",
      "g-recaptcha-response": turnstileResponse,
    };

    try {
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
        window.turnstile?.reset(widgetIdRef.current);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setError("Failed to send message. Please check your connection and try again.");
      window.turnstile?.reset(widgetIdRef.current);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

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
                    <a href="tel:6479786798" className="contact-detail-value">647-978-6798</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">✉️</div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Email</span>
                    <a href="mailto:info@aurigafootball.com" className="contact-detail-value">info@aurigafootball.com</a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">📍</div>
                  <div className="contact-detail-body">
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">525 Huntington Ridge Dr,<br />Mississauga, ON L5R 2X7</span>
                  </div>
                </div>

              </div>

              <div className="contact-socials">
                <a href="https://www.facebook.com/people/Auriga-Football-Club/100091466900502/" target="_blank" rel="noreferrer" className="contact-social-btn">
                  Facebook
                </a>
                <a href="https://www.instagram.com/aurigafc" target="_blank" rel="noreferrer" className="contact-social-btn">
                  Instagram
                </a>
              </div>

            </div>

            {/* RIGHT — FORM */}
            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>

                  {error && <div className="form-error">{error}</div>}

                  <div className="contact-form-row">
                    <div className={`contact-field ${focused === "name" || formData.name ? "active" : ""}`}>
                      <label>Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className={`contact-field ${focused === "phone" || formData.phone ? "active" : ""}`}>
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className={`contact-field ${focused === "email" || formData.email ? "active" : ""}`}>
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className={`contact-field ${focused === "message" || formData.message ? "active" : ""}`}>
                    <label>Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell us about your child, age group, or any questions..."
                    />
                  </div>

                  <div ref={turnstileRef} style={{ marginBottom: "1rem" }}></div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
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

export default Contact;