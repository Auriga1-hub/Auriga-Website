import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/careers.css";

const jobs = [
  {
    title: "Senior Development Coach",
    badge: "U9–U13 | Development & Competitive",
    responsibilities: [
      "Lead structured U9–U13 development sessions.",
      "Create progressive training plans focused on individual player development.",
      "Develop players technically, physically, tactically, and through decision-making.",
      "Prepare players for competitive games, leagues, and tournaments.",
      "Identify individual strengths and areas for improvement.",
      "Provide meaningful player-development feedback.",
      "Maintain attendance and player-development records.",
      "Support and mentor other coaches when required.",
    ],
    lookingFor: [
      "3–5+ years of youth coaching experience.",
      "Experience with U9–U13 development, academy, or competitive players.",
      "Strong understanding of youth player development.",
      "Canada Soccer C Licence or higher preferred.",
      "B Licence or working toward B Licence is an asset.",
      "Strong communication, leadership, and organizational skills.",
      "Professional, reliable, and punctual.",
      "Passionate about long-term player development.",
    ],
  },
  {
    title: "Youth Development Coach",
    badge: "U8–U10 | Development",
    responsibilities: [
      "Lead structured U8–U10 development sessions.",
      "Build strong technical fundamentals including passing, receiving, first touch, turning, dribbling, and ball carrying.",
      "Incorporate movement, coordination, balance, agility, and speed.",
      "Develop player confidence and comfort with the ball.",
      "Introduce decision-making through small-sided games.",
      "Adapt sessions according to player ability.",
      "Track attendance and player development.",
    ],
    lookingFor: [
      "3+ years of relevant youth coaching experience preferred.",
      "Experience working with U8–U10 players.",
      "Strong understanding of technical development.",
      "Canada Soccer coaching certification preferred.",
      "Patient, energetic, and engaging.",
      "Reliable and punctual.",
      "Strong communication skills.",
      "Passionate about long-term youth development.",
    ],
  },
  {
    title: "Grassroots Coach",
    badge: "U4–U8 | Grassroots Development",
    responsibilities: [
      "Create fun, energetic, and structured sessions.",
      "Develop fundamental movement skills including balance, coordination, agility, and jumping.",
      "Introduce age-appropriate technical fundamentals.",
      "Develop basic ball control, dribbling, passing, and receiving.",
      "Keep young players engaged and actively involved.",
      "Build player confidence and enjoyment of the game.",
      "Maintain a safe and positive environment.",
    ],
    lookingFor: [
      "Grassroots or youth coaching experience preferred.",
      "Experience with U4–U8 players is an asset.",
      "Canada Soccer grassroots certification preferred.",
      "Patient, energetic, and positive.",
      "Comfortable working with young children.",
      "Reliable and punctual.",
      "Strong communication skills.",
      "Passionate about introducing children to soccer.",
    ],
  },
];

const whyCoach = [
  "Work with players at different stages of development.",
  "Follow structured development objectives.",
  "Develop your coaching methodology.",
  "Receive feedback and support from the technical team.",
  "Work alongside other coaches.",
  "Gain experience in development and competitive environments.",
  "Progress into greater coaching responsibilities as the club grows.",
];

const standards = [
  { title: "Player-First Mindset", text: "Prioritize long-term player development over simply winning games." },
  { title: "Preparation", text: "Know what you're teaching and why you're teaching it." },
  { title: "Observation", text: "Recognize individual strengths, weaknesses, and development needs." },
  { title: "Adaptability", text: "Adjust your coaching according to the age, ability, and needs of the players." },
  { title: "Progression", text: "Build sessions progressively rather than simply repeating the same activities." },
  { title: "Communication", text: "Communicate clearly and professionally with players, parents, and coaches." },
  { title: "Professionalism", text: "Be prepared, organized, reliable, and punctual." },
  { title: "Coachability", text: "Be willing to receive feedback and continuously improve your own coaching." },
];

const developmentOpportunities = [
  "Development groups",
  "Competitive teams",
  "Lead coaching responsibilities",
  "Player assessments",
  "Coach mentorship",
  "Curriculum development",
  "Technical leadership opportunities",
];

const hiringSteps = [
  { title: "Application", text: "Submit your resume, coaching experience, certifications, and availability." },
  { title: "Interview", text: "Discuss your coaching philosophy, experience, and approach to player development." },
  { title: "Practical Assessment", text: "Shortlisted candidates may be invited to conduct a practical coaching session." },
  { title: "Join the Team", text: "Successful candidates will join the Auriga coaching team and receive support from the technical team." },
];

function Careers() {
  return (
    <>
      <SEOHead
        title="Careers | Coaching Jobs at Auriga Football Club"
        description="Join the Auriga FC coaching team. We're hiring Senior Development, Youth Development, and Grassroots coaches for our Mississauga & Brampton youth soccer programs."
        keywords="soccer coaching jobs, auriga fc careers, youth soccer coach jobs mississauga, football coaching jobs brampton"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />

      {/* HERO */}
      <div className="careers-hero">
        <div className="careers-hero-overlay" />
        <div className="careers-hero-container">
          <h1 className="careers-hero-title">Join the Auriga FC Coaching Team</h1>
          <p className="careers-hero-text">
            Auriga FC is growing, and we're looking for coaches who are passionate about
            developing young players and creating a structured, positive environment for
            long-term player development.
          </p>
          <p className="careers-hero-text">
            We are looking for coaches who understand that coaching is more than running
            drills — it's about identifying player needs, creating purposeful sessions, and
            helping players progress.
          </p>
        </div>
      </div>

      {/* CURRENT OPPORTUNITIES */}
      <section className="careers-opportunities-section">
        <div className="careers-container">
          <div className="careers-section-heading">
            <span className="careers-label">Now Hiring</span>
            <h2 className="careers-section-title">Current Opportunities</h2>
            <p>We currently have three coaching opportunities available.</p>
          </div>

          <div className="careers-jobs-grid">
            {jobs.map((job) => (
              <div className="careers-job-card" key={job.title}>
                <h3 className="careers-job-title">{job.title}</h3>
                <span className="careers-job-badge">{job.badge}</span>

                <div className="careers-job-subheading">Responsibilities</div>
                <ul className="careers-job-list">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>
                      <span className="careers-job-bullet">→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="careers-job-divider" />

                <div className="careers-job-subheading">Who We're Looking For</div>
                <ul className="careers-job-list">
                  {job.lookingFor.map((item, i) => (
                    <li key={i}>
                      <span className="careers-job-bullet">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY COACH AT AURIGA */}
      <section className="careers-why-section">
        <div className="careers-container">
          <div className="careers-why-layout">
            <div className="careers-why-text">
              <span className="careers-label">Why Auriga</span>
              <h2 className="careers-section-title" style={{ display: "block" }}>Why Coach at Auriga?</h2>
              <p>At Auriga, coaches are part of a structured player-development environment.</p>
              <p>You'll have the opportunity to:</p>
            </div>

            <div className="careers-why-card">
              <ul className="careers-why-list">
                {whyCoach.map((item, i) => (
                  <li key={i}>
                    <span className="careers-why-icon">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7.5L6 10.5L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* OUR COACHING STANDARD */}
      <section className="careers-standard-section">
        <div className="careers-container">
          <div className="careers-section-heading">
            <span className="careers-label">Our Coaching Standard</span>
            <h2 className="careers-section-title">What We Look For in Every Coach</h2>
          </div>

          <div className="careers-standard-grid">
            {standards.map((item) => (
              <div className="careers-standard-card" key={item.title}>
                <div className="careers-standard-accent" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACH DEVELOPMENT */}
      <section className="careers-development-section">
        <div className="careers-container">
          <div className="careers-development-layout">
            <div className="careers-development-text">
              <span className="careers-label">Coach Development</span>
              <h2 className="careers-section-title" style={{ display: "block" }}>We're Building Coaches, Not Just Hiring Them.</h2>
              <p>
                As Auriga continues to grow, strong coaches will have opportunities to take
                on greater responsibilities, including:
              </p>
              <p>
                Our goal is to build a strong internal coaching structure where experienced
                coaches help develop the next generation of coaches.
              </p>
            </div>

            <div className="careers-development-card">
              <ul className="careers-development-list">
                {developmentOpportunities.map((item, i) => (
                  <li key={i}>
                    <span className="careers-job-bullet">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="careers-process-section">
        <div className="careers-container">
          <div className="careers-section-heading">
            <span className="careers-label">How It Works</span>
            <h2 className="careers-section-title">Hiring Process</h2>
          </div>

          <div className="careers-process-grid">
            {hiringSteps.map((step, i) => (
              <div className="careers-process-card" key={step.title}>
                <div className="careers-process-number">0{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="careers-cta">
        <div className="careers-cta-container">
          <h2 className="cta-title">Ready to Join Auriga?</h2>
          <p className="cta-text">
            If you're interested in any of the positions above, email your resume to:
          </p>
          <a href="mailto:info@aurigafootballclub.com" className="careers-cta-email">
            info@aurigafootballclub.com
          </a>
          <p className="careers-cta-note">
            Please use the title of the position you're applying for as the subject line
            of your email.
          </p>
          <span className="careers-cta-subject">Example — Subject: Senior Development Coach</span>
          <br />
          <a
            href="mailto:info@aurigafootballclub.com"
            className="careers-cta-btn"
            data-analytics-event="cta_click"
            data-analytics-placement="careers_page"
            data-analytics-destination="mailto:info@aurigafootballclub.com"
            data-analytics-label="email_resume"
          >
            Email Your Resume
          </a>
        </div>
      </section>

    </>
  );
}

export default Careers;
