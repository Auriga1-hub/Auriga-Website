import { useState, useRef, useEffect } from "react";
import "../css/trial.css";

const TURNSTILE_SITE_KEY = "0x4AAAAAACuIL-SoeDNpEWX7";

function TrialBrampton() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

    const form = e.target;
    const body = new FormData();
    body.append("location", "Brampton");
    body.append("parent_name", form.parent_name.value);
    body.append("phone", form.phone.value);
    body.append("email", form.email.value);
    body.append("player_name", form.player_name.value);
    body.append("dob", form.dob.value);
    body.append("years_played", form.years_played.value);
    body.append("preferred_date", form.preferred_date.value);
    body.append("preferred_time", form.preferred_time.value);
    body.append("heard_about", form.heard_about.value);
    body.append("message", form.message.value);
    body.append("cf-turnstile-response", turnstileResponse);

    try {
      const res = await fetch("/mail/free_trial.php", { method: "POST", body });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        window.turnstile?.reset(widgetIdRef.current);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      window.turnstile?.reset(widgetIdRef.current);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      {/* HERO */}
      <div className="trial-hero">
        <div className="trial-hero-overlay" />
        <div className="trial-hero-container">
          <h1 className="trial-hero-title">Brampton Free Trial</h1>
          <p className="trial-hero-text">
            Book a free trial session for your child and experience Auriga
            Football Club training firsthand.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <section className="trial-section">
        <div className="trial-container">

          {/* OUTER HOVERABLE CARD */}
          <div className="trial-card">

            {submitted ? (
              <div className="trial-success">
                <div className="trial-success-icon">✓</div>
                <h2>Registration Received!</h2>
                <p>Thank you for registering. We'll be in touch shortly to confirm your trial session.</p>
              </div>
            ) : (
              <>
                <div className="trial-form-header">
                  <span className="trial-label">Brampton Location</span>
                  <h2 className="trial-form-title">Free Trial Registration</h2>
                  <p className="trial-notice">
                    Free trial availability at our Brampton location is currently limited.
                    Please contact us directly if no dates are available.
                  </p>
                  <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "12px 20px", borderRadius: "10px", marginTop: "16px", display: "inline-block" }}>
                    <span style={{ color: "#10b981", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      🗓️ Runs strictly on Mondays & Wednesdays
                    </span>
                  </div>
                </div>

                {error && <div className="form-error">{error}</div>}

                <form className="trial-form" onSubmit={handleSubmit}>

                  {/* PARENT INFO */}
                  <div className="trial-fieldset">
                    <h3 className="trial-fieldset-title">Parent / Guardian</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name <span className="req">*</span></label>
                        <input type="text" name="parent_name" placeholder="Jane Smith" required />
                      </div>
                      <div className="form-group">
                        <label>Phone <span className="req">*</span></label>
                        <input type="tel" name="phone" placeholder="647-000-0000" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address <span className="req">*</span></label>
                      <input type="email" name="email" placeholder="jane@example.com" required />
                    </div>
                  </div>

                  {/* PLAYER INFO */}
                  <div className="trial-fieldset">
                    <h3 className="trial-fieldset-title">Player Information</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Player Name <span className="req">*</span></label>
                        <input type="text" name="player_name" placeholder="Player's full name" required />
                      </div>
                      <div className="form-group">
                        <label>Date of Birth <span className="req">*</span></label>
                        <input type="date" name="dob" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Years Played in a Club</label>
                      <input type="text" name="years_played" placeholder="e.g. 2 years, or None" />
                    </div>
                  </div>

                  {/* BOOKING */}
                  <div className="trial-fieldset">
                    <h3 className="trial-fieldset-title">Booking Details</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Preferred Date (Mon & Wed Only) <span className="req">*</span></label>
                        <input type="date" name="preferred_date" required />
                      </div>
                      <div className="form-group">
                        <label>Preferred Time <span className="req">*</span></label>
                        <select name="preferred_time" required>
                          <option value="">Select Time</option>
                          <option>6:00 PM</option>
                          <option>7:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>How did you hear about us?</label>
                      <select name="heard_about">
                        <option value="">Select an option</option>
                        <option>Facebook / Instagram</option>
                        <option>Word of Mouth / Friends</option>
                        <option>Google / Bing Search</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea name="message" rows="4" placeholder="Any additional information or questions..." />
                    </div>
                  </div>

                  <div ref={turnstileRef} style={{ marginBottom: "1rem" }}></div>

                  <button type="submit" className="trial-submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>

                </form>
              </>
            )}

          </div>{/* end trial-card */}

        </div>
      </section>

    </>
  );
}

export default TrialBrampton;