import { Link } from "react-router-dom";
import "../css/policies.css";

const clubPolicies = [
  {
    title: "Code of Conduct",
    description:
      "Standards and expectations for all participants, parents, and staff including respect, sportsmanship, safety, and media consent policies.",
    icon: "📋",
    path: "/policies/code-of-conduct",
    linkType: "internal",
  },
  {
    title: "Conflict of Interest",
    description:
      "Guidelines for the identification, management, and disclosure of conflicts of interest within Auriga Football Club operations.",
    icon: "⚖️",
    path: "/policies/conflict-of-interest",
    linkType: "internal",
  },
  {
    title: "OSA Code of Conduct",
    description:
      "Ontario Soccer Association's official code of conduct governing all participants, coaches, and officials in organized soccer programs.",
    icon: "🏅",
    path: "/pdf/Code_of_Conduct_and_Ethics_-_Dec._5.pdf",
    linkType: "download",
  },
  {
    title: "Canada Soccer Conflict of Interest Policy",
    description:
      "Canada Soccer's official policy on the identification, disclosure, and management of conflicts of interest across all levels of the sport.",
    icon: "🇨🇦",
    path: "/pdf/CS-Conflict-of-Interest-Policy-Oct-27_20_EN_Clean.pdf",
    linkType: "download",
  },
  {
    title: "Refund Policy",
    description:
      "Refer to the programs section for the refund policy.",
    icon: "💰",
    path: "/programs/location_select?program=recreation",
    linkType: "internal",
  },
];

function Policies() {
  return (
    <>

      {/* HERO */}
      <div className="policy-hero">
        <div className="policy-hero-overlay" />
        <div className="policy-hero-container">
          <h1 className="policy-hero-title">Policies & Forms</h1>
          <p className="policy-hero-text">
            Review our club policies covering conduct expectations, conflict of interest
            guidelines, and media consent for all members and participants.
          </p>
        </div>
      </div>


      {/* POLICY CARDS */}
      <section className="policy-content-section">
        <div className="policy-container">

          <div className="policy-section-heading">
            <span className="policy-label">Club Policies</span>
            <h2 className="policy-section-title">Select a Policy</h2>
          </div>

          <div className="policy-index-grid">
            {clubPolicies.map((policy, i) => {
              if (policy.linkType === "download") {
                return (
                  <a
                    href={policy.path}
                    download
                    className="policy-index-card"
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="policy-index-icon">{policy.icon}</div>
                    <h3>{policy.title}</h3>
                    <div className="policy-index-accent" />
                    <p>{policy.description}</p>
                    <span className="policy-index-link">
                      Download PDF →
                    </span>
                  </a>
                );
              }
              return (
                <Link
                  to={policy.path}
                  className="policy-index-card"
                  key={i}
                >
                  <div className="policy-index-icon">{policy.icon}</div>
                  <h3>{policy.title}</h3>
                  <div className="policy-index-accent" />
                  <p>{policy.description}</p>
                  <span className="policy-index-link">
                    {policy.title === "Refund Policy" ? "View Programs →" : "View Policy →"}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

    </>
  );
}

export default Policies;
