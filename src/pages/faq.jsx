import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildFAQSchema, buildBreadcrumbSchema } from "../components/StructuredData";
import { trackFAQOpen } from "../utils/analytics";
import "../css/faq.css";

const faqs = [
  {
    question: "Is the field confirmed for spring and summer?",
    answer: "Yes — the location is confirmed and does not change until the end of the summer season."
  },
  {
    question: "What happens if it rains?",
    answer: "Spring sessions run outdoors. Light rain does not cancel training. In cases of unsafe weather (lightning or severe conditions), sessions are postponed and rescheduled where possible.\n\nWe monitor weather closely and prioritize safety."
  },
  {
    question: "My child is new to soccer. Is that okay?",
    answer: "Absolutely! Our program is structured specifically for beginners and early learners. Sessions are designed to build confidence step-by-step — no pressure, no chaos.\n\nMost players start with little or no experience."
  },
  {
    question: "How do I know this isn't just kids running around?",
    answer: "Every session follows a structured format:\nWarm-up → Ball mastery → Skill development → Controlled games → Cooldown.\n\nSmall groups ensure coaches correct and guide players — not just supervise."
  },
  {
    question: "Are there matches or competitions?",
    answer: "This is a development-focused program. Players regularly participate in small-sided in-house scrimmages to apply what they learn.\n\nOptional Saturday friendly games may be available separately for families interested in additional match exposure."
  },
  {
    question: "What if my child misses a session?",
    answer: "We understand occasional conflicts. However, development requires consistency. We encourage regular attendance to maximize progress.\n\nPlease notify us in advance if your child will miss a session."
  },
  {
    question: "Why is there a $30 deposit?",
    answer: "The deposit secures your child's spot in a capped group. This ensures committed families and stable group structure.\n\nIf you decide not to continue after the first session, the deposit is fully refundable."
  },
  {
    question: "What equipment does my child need?",
    answer: "• Soccer cleats (outdoor)\n• Shin pads (U8+)\n• Water bottle\n• Age-appropriate soccer ball\n\nUniform details will be shared after registration."
  },
  {
    question: "What happens after this program?",
    answer: "Players may continue in the next seasonal development cycle.\n\nFor families seeking a higher level of competition, competitive pathway options may be introduced based on readiness and progression."
  },
  {
    question: "Can I watch the training sessions?",
    answer: "Yes — spring and summer sessions are held outdoors, and parents are welcome to observe.\n\nWe do ask that parents allow coaches to lead the session without sideline instruction, so players can stay focused and independent."
  },
  {
    question: "How do I register or ask questions?",
    answer: "You can register directly through our programs page, fill out the contact form, or reach us directly:\n\n📞 647-978-6798\n📧 info@aurigafootball.com"
  },
];

function FAQItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const hasTrackedOpen = useRef(false);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    if (!hasTrackedOpen.current) {
      hasTrackedOpen.current = true;
      trackFAQOpen(question);
    }

    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 300);
  };

  return (
    <div
      className={`faq-item ${open ? "faq-item--open" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="faq-question">
        <span className="faq-number">0{index + 1}</span>
        <h3>{question}</h3>
        <div className="faq-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="faq-answer">
        <div className="faq-answer-inner">
          {answer.split("\n").map((line, i) =>
            line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <>
      <SEOHead
        title="FAQ | Auriga Football Club | Youth Soccer Questions & Answers"
        description="Find answers to frequently asked questions about Auriga FC's youth soccer programs, registration, schedules, equipment, refund policy, and more. Kids soccer training in Mississauga & Brampton."
        keywords="soccer faq, youth soccer questions, kids soccer registration, auriga fc questions, soccer program information mississauga"
      />
      <StructuredData data={[
        buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Resources", path: "/faq" }, { name: "FAQ", path: "/faq" }]),
        buildFAQSchema(faqs)
      ]} />

      {/* HERO */}
      <div className="faq-hero">
        <div className="faq-hero-overlay" />
        <div className="faq-hero-container">
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-text">
            Everything you need to know about our programs, policies, and what to expect.
          </p>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-layout">

            {/* LEFT — FAQ LIST */}
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            {/* RIGHT — STICKY CTA */}
            <div className="faq-sidebar">
              <div className="faq-cta-card">
                <span className="faq-cta-label">Still have questions?</span>
                <h3 className="faq-cta-title">Ask Us Directly</h3>
                <p className="faq-cta-text">
                  Our team is happy to answer any questions about the program, schedules, or registration.
                </p>
                <Link
                  to="/contact"
                  className="faq-cta-btn"
                  data-analytics-event="cta_click"
                  data-analytics-placement="faq_sidebar"
                  data-analytics-destination="/contact"
                  data-analytics-label="contact_us"
                >
                  Contact Us
                </Link>
                <div className="faq-cta-divider" />
                <div className="faq-cta-contact">
                  <a href="tel:6479786798" className="faq-cta-link" data-analytics-placement="faq_sidebar">📞 647-978-6798</a>
                  <a href="mailto:info@aurigafootball.com" className="faq-cta-link" data-analytics-placement="faq_sidebar">📧 info@aurigafootball.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}

export default FAQ;