import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/policies.css";

const guidelines = [
  {
    number: 1,
    title: "Disclosure",
    text: "All individuals involved in the club's activities must promptly disclose any actual or potential conflicts of interest to the Board of Directors as soon as they become aware of them.",
  },
  {
    number: 2,
    title: "Prohibition",
    text: "No individual may use their position at Auriga Football Club to promote personal interests or gain an unfair advantage for themselves or others.",
  },
  {
    number: 3,
    title: "Evaluation",
    text: "The Board of Directors will evaluate all disclosed conflicts of interest to determine their impact on the integrity of the club and whether they interfere with the individual's ability to act in the club's best interests.",
  },
  {
    number: 4,
    title: "Recusal",
    text: "Any individual with a conflict of interest must recuse themselves from any decision-making process or discussion where their personal or financial interest may affect their judgment or influence the outcome.",
  },
  {
    number: 5,
    title: "Confidentiality",
    text: "All disclosures and evaluations of conflicts of interest will be treated as confidential information and will be shared only with those who need to know.",
  },
  {
    number: 6,
    title: "Record-Keeping",
    text: "Auriga Football Club will maintain records of all disclosed conflicts and their evaluations for a minimum of three years.",
  },
  {
    number: 7,
    title: "Training",
    text: "All individuals involved in the club's activities will receive training on this policy and the importance of identifying and managing conflicts of interest.",
  },
  {
    number: 8,
    title: "Enforcement",
    text: "Violations of this policy may result in disciplinary action, including but not limited to termination of employment, removal from the Board of Directors, or termination of membership.",
  },
  {
    number: 9,
    title: "Amendment",
    text: "This policy may be amended by a two-thirds vote of the Board of Directors.",
  },
  {
    number: 10,
    title: "Acknowledgement",
    text: "All individuals involved in Auriga Football Club's activities must acknowledge that they have read, understand, and will comply with this policy.",
  },
];

const overviewCards = [
  {
    title: "Purpose",
    text: "The purpose of this policy is to establish clear guidelines for the identification, management, and disclosure of conflicts of interest that may arise in the operations of Auriga Football Club.",
  },
  {
    title: "Scope",
    text: "This policy applies to all members, officers, directors, employees, volunteers, coaches, and any other individuals involved in the activities of Auriga Football Club.",
  },
  {
    title: "Definition",
    text: "A conflict of interest occurs when an individual has a personal, financial, or professional interest that could compromise or interfere with their ability to act in the best interests of Auriga Football Club.",
  },
];

function ConflictOfInterest() {
  return (
    <>
      <SEOHead
        title="Conflict of Interest Policy | Auriga Football Club"
        description="Auriga FC's Conflict of Interest policy provides guidelines for identifying, managing, and disclosing conflicts of interest within club operations."
        keywords="conflict of interest policy, soccer club governance, auriga fc policy, youth sports ethics"
      />
      <StructuredData data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Policies", path: "/policies" }, { name: "Conflict of Interest", path: "/policies/conflict-of-interest" }])} />

      {/* HERO */}
      <div className="policy-hero">
        <div className="policy-hero-overlay" />
        <div className="policy-hero-container">
          <h1 className="policy-hero-title">Conflict of Interest Policy</h1>
          <p className="policy-hero-text">
            Clear guidelines for the identification, management, and disclosure
            of conflicts of interest within Auriga Football Club.
          </p>
        </div>
      </div>


      {/* PURPOSE / SCOPE / DEFINITION */}
      <section className="policy-content-section">
        <div className="policy-container">

          <div className="policy-section-heading">
            <span className="policy-label">Policy Overview</span>
            <h2 className="policy-section-title">Purpose, Scope &amp; Definition</h2>
          </div>

          <div className="policy-legal-grid" style={{ marginBottom: 0 }}>
            {overviewCards.map((card, i) => (
              <div className="policy-legal-card" key={i}>
                <h3>{card.title}</h3>
                <div className="policy-legal-accent" />
                <p>{card.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* GUIDELINES */}
      <section className="policy-legal-section">
        <div className="policy-container">

          <div className="policy-section-heading">
            <span className="policy-label">Policy Framework</span>
            <h2 className="policy-section-title">Guidelines</h2>
          </div>

          <div className="policy-section-box">
            <div className="policy-items-grid">
              {guidelines.map((item) => (
                <div className="policy-item" key={item.number}>

                  <div className="policy-item-header">
                    <div className="policy-item-number">{item.number}</div>
                    <h3>{item.title}</h3>
                  </div>

                  <div className="policy-item-accent" />

                  <ul className="policy-item-points">
                    <li>
                      <span className="policy-bullet">→</span>
                      {item.text}
                    </li>
                  </ul>

                </div>
              ))}
            </div>
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

export default ConflictOfInterest;
