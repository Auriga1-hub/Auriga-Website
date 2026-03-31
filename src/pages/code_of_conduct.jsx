import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/policies.css";

const conductItems = [
  {
    number: 1,
    title: "Respect",
    points: [
      "All participants must show respect for their fellow participants, coaches, referees, and opponents.",
      "Any form of discrimination, bullying, or harassment will not be tolerated.",
    ],
  },
  {
    number: 2,
    title: "Sportsmanship",
    points: [
      "All participants must display good sportsmanship and fair play.",
      "Cheating, diving, or any other form of unsportsmanlike conduct will not be tolerated.",
    ],
  },
  {
    number: 3,
    title: "Safety",
    points: [
      "All participants must follow the safety guidelines set out by the academy and the coaches.",
      "Any behavior that puts themselves or others at risk will not be tolerated.",
    ],
  },
  {
    number: 4,
    title: "Attendance",
    points: [
      "All participants are expected to attend training sessions and matches on time.",
      "If unable to attend, participants are expected to inform their coach or team manager in advance.",
    ],
  },
  {
    number: 5,
    title: "Equipment",
    points: [
      "All participants must have the appropriate equipment for training and matches.",
      "Equipment must be maintained in good condition and must not be shared without permission.",
    ],
  },
  {
    number: 6,
    title: "Social Media",
    points: [
      "Participants are expected to use social media responsibly and in a manner that reflects positively on the academy.",
      "Any inappropriate or offensive use of social media may result in disciplinary action.",
    ],
  },
  {
    number: 7,
    title: "Parental Involvement",
    points: [
      "Parents and guardians are expected to support the academy and their child's participation in the academy. Any issues or concerns should be raised directly with the coaches or academy management.",
    ],
  },
  {
    number: 8,
    title: "Code of Conduct Violations",
    points: [
      "Any violation of the code of conduct may result in disciplinary action, including suspension or expulsion from the academy.",
      "Disciplinary action will be taken in accordance with the academy's disciplinary procedures.",
    ],
  },
];

const legalSections = [
  {
    title: "Consent",
    text: "By signing this form, you grant Auriga FC permission to photograph and record your child's participation in soccer-related activities, both during training sessions and official matches.",
  },
  {
    title: "Usage and Release",
    text: "You authorize Auriga FC to use these photographs and videos for promotional purposes, including but not limited to: displaying images and videos on our academy's official website and social media platforms (e.g., Facebook, Instagram, YouTube, Twitter); incorporating images and videos into printed promotional materials, such as brochures, flyers, and banners; sharing images and videos with local media outlets for coverage of our academy's events or achievements; and presenting images and videos at public events, such as presentations, exhibitions, and tournaments.",
  },
  {
    title: "Copyright and Ownership",
    text: "You understand and agree that all rights, including copyrights, to the photographs and videos taken by Auriga FC, belong solely to Auriga FC. You waive any claims or rights to monetary compensation or royalties arising from the use of these images and videos.",
  },
  {
    title: "Duration of Consent",
    text: "This consent is valid indefinitely unless revoked in writing by the undersigned parent/guardian.",
  },
  {
    title: "Confidentiality",
    text: "Auriga FC acknowledges that it will use reasonable efforts to maintain the privacy and confidentiality of the students in accordance with applicable laws and regulations.",
  },
  {
    title: "Withdrawal of Consent",
    text: "If, at any time, you wish to withdraw your consent and revoke permission for the use of photographs and videos featuring your child, please notify Auriga FC in writing. Please understand that while we will make reasonable efforts to remove the content from future promotional materials, we cannot guarantee the removal of content that has already been distributed or published.",
  },
  {
    title: "Indemnity and Release",
    text: "You release and discharge Auriga FC, its employees, agents, and representatives from any claims, damages, or liabilities arising out of or relating to the use of photographs and videos taken in accordance with this consent form.",
  },
];

function CodeOfConduct() {
  return (
    <>
      <SEOHead
        title="Code of Conduct | Auriga Football Club"
        description="Auriga FC's Code of Conduct outlines standards for respect, sportsmanship, safety, and parental involvement for all participants, parents, and staff."
        keywords="soccer code of conduct, youth soccer rules, auriga fc expectations, sportsmanship policy"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Policies", path: "/policies" }, { name: "Code of Conduct", path: "/policies/code-of-conduct" }])} />

      {/* HERO */}
      <div className="policy-hero">
        <div className="policy-hero-overlay" />
        <div className="policy-hero-container">
          <h1 className="policy-hero-title">Code of Conduct</h1>
          <p className="policy-hero-text">
            Our code of conduct outlines the standards and expectations for all
            participants, parents, and staff at Auriga Football Club.
          </p>
        </div>
      </div>


      {/* CONDUCT ITEMS */}
      <section className="policy-content-section">
        <div className="policy-container">

          <div className="policy-section-heading">
            <span className="policy-label">Standards &amp; Expectations</span>
            <h2 className="policy-section-title">Academy Code of Conduct</h2>
          </div>

          <div className="policy-section-box">
            <div className="policy-items-grid">
              {conductItems.map((item) => (
                <div className="policy-item" key={item.number}>

                  <div className="policy-item-header">
                    <div className="policy-item-number">{item.number}</div>
                    <h3>{item.title}</h3>
                  </div>

                  <div className="policy-item-accent" />

                  <ul className="policy-item-points">
                    {item.points.map((point, i) => (
                      <li key={i}>
                        <span className="policy-bullet">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* LEGAL SECTIONS */}
      <section className="policy-legal-section">
        <div className="policy-container">

          <div className="policy-section-heading">
            <span className="policy-label">Media &amp; Legal</span>
            <h2 className="policy-section-title">Photography, Media &amp; Consent</h2>
          </div>

          <div className="policy-legal-grid">
            {legalSections.map((section, i) => (
              <div className="policy-legal-card" key={i}>
                <h3>{section.title}</h3>
                <div className="policy-legal-accent" />
                <p>{section.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* EFFECTIVE DATE */}
      <section className="policy-effective-section">
        <div className="policy-container">
          <div className="policy-effective-card">
            <h2>Policy Effective Date</h2>
            <p>
              This policy is effective immediately upon approval by the Board of Directors.
            </p>
            <span className="policy-effective-badge">Active Policy</span>
          </div>
        </div>
      </section>

    </>
  );
}

export default CodeOfConduct;
