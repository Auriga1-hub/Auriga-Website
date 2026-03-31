import { Link } from "react-router-dom";
import TestimonialBar from "../components/TestimonialBar";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema, buildEventSchema } from "../components/StructuredData";
import "../css/camps.css";

const activities = [
  { icon: "⚽", label: "Soccer" },
  { icon: "🏃", label: "Age Appropriate Technical Activities" },
  { icon: "🏀", label: "Basketball" },
  { icon: "🚩", label: "Capture the Flag" },
  { icon: "🏆", label: "Mini World Cup / Champions League" },
  { icon: "🎯", label: "Small-Sided Games" },
  { icon: "⚾", label: "Soccer Baseball" },
  { icon: "🏁", label: "Relay Races" },
  { icon: "🛝", label: "Playground" },
  { icon: "🤾", label: "Dodgeball" },
  { icon: "🎨", label: "Arts & Crafts" },
  { icon: "✨", label: "& More!" },
];

const schedule = [
  { time: "9:00 AM", activity: "Player arrival" },
  { time: "9:10–9:20 AM", activity: "Players divided into groups based on date of birth and interests" },
  { time: "9:20–9:40 AM", activity: "Ice breaker game" },
  { time: "9:40–10:00 AM", activity: "Snack break" },
  { time: "10:00–10:50 AM", activity: "Fun Activity #1 (Outdoor or Indoor) or Soccer training session #1" },
  { time: "11:00–11:50 AM", activity: "Fun Activity #2 (Outdoor or Indoor) Soccer training session #2" },
  { time: "12:00–1:00 PM", activity: "Lunch" },
  { time: "1:10–2:00 PM", activity: "Fun Activity #3 (Indoor)" },
  { time: "2:10–3:00 PM", activity: "Fun Activity #4 (Indoor)" },
  { time: "3:00–3:15 PM", activity: "Snack break" },
  { time: "3:15–4:00 PM", activity: "Mini World Cup or alternate games" },
];

function MarchBreakCamp() {
  return (
    <>
      <SEOHead
        title="March Break Soccer Camp | Kids Camp Mississauga & Brampton | Auriga FC"
        description="Action-packed March Break soccer camp for kids ages 4–13. Soccer training, multi-sport activities, and outdoor fun at Auriga FC in Mississauga, Brampton & Etobicoke."
        keywords="march break camp mississauga, spring break soccer camp, kids march break activities brampton, march break sports camp, soccer camp etobicoke"
      />
      <StructuredData data={[
        buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Camps", path: "/programs/camps" }, { name: "March Break Camp", path: "/programs/march-break-camp" }]),
        buildEventSchema({ name: "Auriga FC March Break Soccer Camp", description: "March Break soccer and multi-sport camp for ages 4-13 in Mississauga, Brampton, and Etobicoke.", startDate: "2027-03-15", endDate: "2027-03-19", locationName: "Mississauga, Ontario" })
      ]} />

      {/* HERO */}
      <div className="camps-hero">
        <div className="camps-hero-overlay" />
        <div className="camps-hero-container">
          <h1 className="camps-hero-title">March Break Camp</h1>
          <p className="camps-hero-text">
            Join our engaging and high-energy March Break camps designed to develop football skills
            while prioritizing fun, teamwork, and building fond memories during the break.
          </p>
          <div className="camps-hero-meta">
            <span>🌷 March Break</span>
            <span>⚽ Ages 4–13</span>
            <span>📍 Mississauga Central, Mississauga West, Etobicoke &amp; Brampton</span>
          </div>
        </div>
      </div>

      <TestimonialBar />


      {/* INTRO */}
      <section className="camps-intro-section">
        <div className="camps-container">
          <div className="camps-section-box">
            <div className="camps-section-heading">
              <span className="camps-label">Spring Energy</span>
              <h2 className="camps-section-title">Our March Break Camp</h2>
            </div>
            <div className="camps-intro-text">
              <p>
                Auriga Football Club offers exciting March Break camps to keep
                players active and engaged during the spring break.
              </p>
              <p>
                Make the most of March Break with an action-packed camp focused on
                skill-building, multi-sport activities, and outdoor fun.
              </p>
              <div style={{ marginTop: "24px", textAlign: "center" }}>
                <Link to="/contact" className="camps-cta-btn">Register Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ACTIVITIES */}
      <section className="camps-activities-section">
        <div className="camps-container">
          <div className="camps-section-box">
            <div className="camps-section-heading">
              <span className="camps-label">March Break Camp</span>
              <h2 className="camps-section-title">Camp Activities &amp; Reminders</h2>
            </div>
            <div className="camps-activities-grid">
              {activities.map((a, i) => (
                <div className="camps-activity-card" key={i}>
                  <div className="camps-activity-icon">{a.icon}</div>
                  <div className="camps-card-accent" />
                  <p>{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* SCHEDULE */}
      <section className="camps-schedule-section">
        <div className="camps-container">
          <div className="camps-section-box">
            <div className="camps-section-heading">
              <span className="camps-label">A Day at Camp</span>
              <h2 className="camps-section-title">Example of Daily Schedule</h2>
            </div>

            <div className="camps-schedule-grid">
              {schedule.map((item, i) => (
                <div className="camps-schedule-card" key={i}>
                  <div className="camps-schedule-time">{item.time}</div>
                  <div className="camps-card-accent" />
                  <p>{item.activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="camps-cta-section">
        <div className="camps-container">
          <div className="camps-cta">
            <h2>Ready for an Unforgettable March Break?</h2>
            <p>Secure your spot in our March Break camp and give your child a week of sports, fun, and new friendships.</p>
            <Link to="/contact" className="camps-cta-btn">Register Now</Link>
          </div>
        </div>
      </section>

    </>
  );
}

export default MarchBreakCamp;
