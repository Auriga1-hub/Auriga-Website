import { useParams } from "react-router-dom";
import programs from "../data/programs";
import TestimonialBar from "../components/TestimonialBar";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema, buildCourseSchema } from "../components/StructuredData";
import "../css/program_page.css";

function ProgramPage() {

  const { location, program } = useParams();

  const [season, ...ageParts] = program.split("-");
  const age = ageParts.join("-");

  const programData = programs?.[location]?.[season]?.[age];

  if (!programData) {
    return <div style={{ padding: "120px", color: "white" }}>Program not found</div>;
  }

  const scheduleItems = location === "brampton" && season === "spring" && age === "u4-13"
    ? [
        "Mondays & Wednesdays",
        "Ages 4-8, 5:30 - 6:30 PM",
        "Ages 9-13, 6:30 - 7:30 PM",
        "Uniforms Provided on First Day",
      ]
    : [
        "2 sessions per week",
        "Weekday evening training",
        programData.location,
        "Final training days confirmed in April",
      ];

  return (
    <>
      <SEOHead
        title={`${programData.title} | Auriga FC Soccer Program`}
        description={`Register for ${programData.title} at Auriga Football Club. Ages ${programData.age}, professional coaching, small groups, ${programData.location}. ${programData.price}. Secure your spot today.`}
        keywords={`${programData.title.toLowerCase()}, youth soccer ${location.replace('_', ' ')}, kids soccer program, auriga fc registration, soccer training ages ${programData.age}`}
      />
      <StructuredData data={[
        buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Programs", path: "/programs/location_select" }, { name: location.replace('_', ' '), path: `/programs/recreation/${location}` }, { name: programData.title, path: `/programs/recreation/${location}/${program}` }]),
        buildCourseSchema({ name: programData.title, description: `Youth soccer training program for ages ${programData.age} at ${programData.location}. Professional coaching in a structured, small-group environment.`, locationName: programData.location })
      ]} />

      {/* HERO */}
      <section className="program-hero">
        <div className="program-hero-overlay" />
        <div className="program-container program-hero-content">
          <h1 className="program-hero-title">{programData.title}</h1>
          <p className="program-hero-text">
            A fun and structured introduction to soccer for young players ages {programData.age}.
          </p>
          <a href={programData.registerUrl} target="_blank" rel="noreferrer" className="program-btn">
            Secure Your Spot
          </a>
        </div>
      </section>

      <TestimonialBar />


      {/* TRAINING SCHEDULE — content left, image right */}
      <section className="program-section">
        <div className="program-container">
          <div className="split-layout">
            <div className="split-content">
              <h2 className="section-title left-align">Training Schedule</h2>
              <div className="section-divider left-align" />
              <div className="schedule-card">
                <h3>Spring Program</h3>
                <p className="schedule-dates">{programData.date}</p>
                <ul className="schedule-list">
                  {scheduleItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="split-image">
              <img src="/images/training-schedule.webp" alt="Training Schedule Image" loading="lazy" decoding="async" width="600" height="450" />
            </div>
          </div>
        </div>
      </section>


      {/* ANNOUNCEMENT */}
      {programData.announcement && (
        <div 
          style={{
            background: 'linear-gradient(90deg, #1e3a8a, #0b1f35)',
            borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
            borderTop: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '16px 20px',
            textAlign: 'center'
          }}
        >
          <p style={{
            margin: 0,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: 'white',
            letterSpacing: '0.5px',
          }}>
            <span style={{ 
              color: '#10b981', 
              marginRight: '8px', 
              fontWeight: 800,
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '4px 10px',
              borderRadius: '4px'
            }}>
              Announcement
            </span>
            {programData.announcement.title}
          </p>
          <p style={{
            margin: '8px 0 0',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            color: '#94a3b8',
          }}>
            {programData.announcement.subtitle}
          </p>
        </div>
      )}

      {location === "brampton" && (
        <section className="program-section light">
          <div className="program-container">
            <div className="location-card">
              <h2 className="section-title">Location</h2>
              <div className="section-divider" />
              <p>Hilldale Public School</p>
              <p>
                <a href="https://share.google/nwSYNEKPygTDNRNBF" target="_blank" rel="noreferrer">
                  https://share.google/nwSYNEKPygTDNRNBF
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      <section className="program-section light">
        <div className="program-container">
          <h2 className="section-title">What Your Child Will Actually Get</h2>
          <div className="section-divider" />
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>Structured Sessions</h3>
              <p>Every session follows a structured training plan.</p>
            </div>
            <div className="benefit-card">
              <h3>Confidence With The Ball</h3>
              <p>Kids develop dribbling, turning and shooting skills.</p>
            </div>
            <div className="benefit-card">
              <h3>Better Coordination</h3>
              <p>Balance, agility and movement development.</p>
            </div>
            <div className="benefit-card">
              <h3>Small Group Attention</h3>
              <p>Each player receives coaching attention.</p>
            </div>
            <div className="benefit-card">
              <h3>Certified Coaches</h3>
              <p>Experienced youth development coaches.</p>
            </div>
            <div className="benefit-card">
              <h3>Friendly Games</h3>
              <p>Small sided matches to build confidence.</p>
            </div>
          </div>
        </div>
      </section>


      {/* PRICE — image left, content right */}
      <section className="program-section">
        <div className="program-container">
          <div className="split-layout reverse">
            <div className="split-image">
              <img src="/images/bg_2.webp" alt="Program pricing" loading="lazy" decoding="async" width="600" height="450" />
            </div>
            <div className="split-content">
              <div className="price-card">
                <h2 className="section-title left-align">Spring Program Cost</h2>
                <div className="section-divider left-align" />
                <h3>{programData.date}</h3>
                <h1 className="price">{programData.price}</h1>
                <p>Ages 4–13</p>
                <div className="deposit">$30 Deposit</div>
                <ul className="price-features">
                  <li>✔ Risk-Free after Session 1</li>
                  <li>✔ No hidden fees</li>
                  <li>✔ Spots capped per group</li>
                </ul>
                <a href={programData.registerUrl} target="_blank" rel="noreferrer" className="program-btn">
                  Secure Your Spot
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* STEPS */}
      <section className="program-section light">
        <div className="program-container">
          <div className="steps-wrapper">
            <h2 className="section-title">How Spring Registration Works</h2>
            <div className="section-divider" />
            <div className="steps">
              <div className="step">Step 1: Secure spot with $30 deposit</div>
              <div className="step">Step 2: Attend first session</div>
              <div className="step">Step 3: Full refund after day one if the program is not the right fit</div>
              <div className="step">Step 4: Season confirmed from session 2</div>
            </div>
          </div>
        </div>
      </section>


      {/* WHY SPOTS ARE CAPPED */}
      <section className="program-section">
        <div className="program-container">
          <div className="policy-card">
            <h2 className="section-title">Why Spots Are Capped</h2>
            <div className="section-divider" />
            <p className="policy-intro">We limit group size to maintain:</p>
            <ul className="policy-list">
              <li>Individual coaching attention</li>
              <li>High repetition</li>
              <li>Controlled learning environment</li>
            </ul>
            <p className="policy-note">
              Once groups reach capacity, registration closes.
            </p>
          </div>
        </div>
      </section>


      {/* REGISTRATION, DEPOSITS & REFUND POLICY */}
      <section className="program-section light">
        <div className="program-container">
          <div className="policy-card">
            <h2 className="section-title">Registration, Deposits &amp; Refund Policy</h2>
            <div className="section-divider" />

            <div className="policy-block">
              <h3 className="policy-heading">Registration &amp; Deposit</h3>
              <p className="policy-text">
                To secure a spot in the program, a <strong>$30 deposit</strong> is required at registration.
                This deposit is applied toward your total program fee.
              </p>
            </div>

            <div className="policy-block">
              <h3 className="policy-heading">Refund Policy</h3>
              <ul className="policy-refund-list">
                <li>If you choose not to continue after the first session, your $30 deposit will be fully refunded.</li>
                <li>From the second session onward, the deposit becomes non-refundable, as spots are confirmed and staffing is finalized.</li>
                <li>After the second session, no refunds are issued unless communicated otherwise.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="program-cta">
        <div className="program-container">
          <div className="cta-card">
            <h2 className="cta-title">Spring Groups Filling Fast</h2>
            <p className="cta-text">
              Registration closes once this age group reaches capacity.
            </p>
            <a href={programData.registerUrl} target="_blank" rel="noreferrer" className="program-btn">
              Secure Your Spot
            </a>
          </div>
        </div>
      </section>

    </>
  );
}

export default ProgramPage;