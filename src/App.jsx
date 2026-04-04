import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingElements from "./components/FloatingElements";

/* MAIN PAGES */
const Home = lazy(() => import("./pages/home"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));

/* PROGRAM LANDING PAGES */
const Development = lazy(() => import("./pages/development"));
const Camps = lazy(() => import("./pages/camps"));
const WinterCamp = lazy(() => import("./pages/winter_camp"));
const MarchBreakCamp = lazy(() => import("./pages/march_break_camp"));
const PersonalTraining = lazy(() => import("./pages/personal_training"));
const PersonalTrainingContact = lazy(() => import("./pages/personal_training_contact"));
const CompetitiveTeams = lazy(() => import("./pages/competitive_teams"));
const TrialMississaugaCentral = lazy(() => import("./pages/free_trial_mississauga_central"));
const TrialMississaugaWest = lazy(() => import("./pages/free_trial_mississauga_west"));
const TrialEtobicoke = lazy(() => import("./pages/free_trial_etobicoke"));
const TrialBrampton = lazy(() => import("./pages/free_trial_brampton"));

/* LOCATION SELECTOR */
const LocationSelect = lazy(() => import("./pages/location_select"));

/* LOCATION PROGRAM LISTS */
const MississaugaCentral = lazy(() => import("./pages/mississauga_central"));
const MississaugaWest = lazy(() => import("./pages/mississauga_west"));
const Etobicoke = lazy(() => import("./pages/etobicoke"));
const Brampton = lazy(() => import("./pages/brampton"));

/* PROGRAM PAGE */
const ProgramPage = lazy(() => import("./pages/program_page"));

/* RESOURCES */
const FAQ = lazy(() => import("./pages/faq"));
const Policies = lazy(() => import("./pages/policies"));
const CodeOfConduct = lazy(() => import("./pages/code_of_conduct"));
const ConflictOfInterest = lazy(() => import("./pages/conflict_of_interest"));
const PlayerDevelopment = lazy(() => import("./pages/player_development"));

// Lightweight loading component
const PageLoader = () => (
  <div style={{ 
    height: "100vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    background: "#0b1f35",
    color: "#10b981",
    fontSize: "24px",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "800"
  }}>
    <div className="loader-text">AURIGA FC</div>
  </div>
);

function App() {
  return (
    <div className="app-root">
      <ScrollToTop />
      <FloatingElements />
      <Navbar />

      <main className="app-main">
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* MAIN PAGES */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/programs/development" element={<Development />} />
            <Route path="/programs/personal-training" element={<PersonalTraining />} />
            <Route path="/programs/personal-training/contact" element={<PersonalTrainingContact />} />
            <Route path="/programs/competitive-teams" element={<CompetitiveTeams />} />
            <Route path="/programs/camps" element={<Camps />} />
            <Route path="/programs/winter-camp" element={<WinterCamp />} />
            <Route path="/programs/march-break-camp" element={<MarchBreakCamp />} />

            {/* FREE TRIAL */}
            <Route path="/programs/trial/mississauga_central" element={<TrialMississaugaCentral />} />
            <Route path="/programs/trial/mississauga_west" element={<TrialMississaugaWest />} />
            <Route path="/programs/trial/etobicoke" element={<TrialEtobicoke />} />
            <Route path="/programs/trial/brampton" element={<TrialBrampton />} />

            {/* LOCATION SELECTOR */}
            <Route path="/programs/location_select" element={<LocationSelect />} />

            {/* LOCATION PROGRAM LISTS */}
            <Route path="/programs/recreation/mississauga_central" element={<MississaugaCentral />} />
            <Route path="/programs/recreation/mississauga_west" element={<MississaugaWest />} />
            <Route path="/programs/recreation/etobicoke" element={<Etobicoke />} />
            <Route path="/programs/recreation/brampton" element={<Brampton />} />

            {/* DYNAMIC PROGRAM PAGES */}
            <Route path="/programs/recreation/:location/:program" element={<ProgramPage />} />

            {/* RESOURCES */}
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/policies/code-of-conduct" element={<CodeOfConduct />} />
            <Route path="/policies/conflict-of-interest" element={<ConflictOfInterest />} />
            <Route path="/resources/player-development" element={<PlayerDevelopment />} />

          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;