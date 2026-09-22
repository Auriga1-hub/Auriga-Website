// Single source of truth for the site header/navbar.
// Used by src/components/navbar.jsx (React) AND scripts/sync-static-headers.mjs
// (which stamps the same markup into the pre-rendered static HTML pages under public/).
// Edit ONLY this file to change header links, then run `npm run sync-header`.

export const navItems = [
  {
    type: "link",
    label: "Home",
    path: "/",
  },
  {
    type: "dropdown",
    label: "Our Club",
    // when true, dropdown label gets the "active" class if pathname starts with this prefix
    activePrefix: null,
    items: [
      { label: "About Us", path: "/about" },
      { label: "Our Team", path: "/our-team" },
      { label: "Careers", path: "/careers" },
      { label: "Player Development", path: "/resources/player-development" },
    ],
  },
  {
    type: "dropdown",
    label: "Programs",
    activePrefix: "/programs/recreation/",
    items: [
      { label: "Fundamentals", path: "/programs/location_select?program=recreation" },
      { label: "Girls Soccer Program", path: "/programs/girls-soccer-brampton-central" },
      { label: "Development", path: "/programs/development" },
      { label: "Competitive Teams", path: "/programs/competitive-teams" },
      { label: "Personal Training", path: "/programs/personal-training" },
    ],
  },
  {
    type: "dropdown",
    label: "Camps",
    activePrefix: null,
    items: [
      { label: "Summer Camp", path: "/programs/camps" },
      { label: "Winter Camp", path: "/programs/winter-camp" },
      { label: "March Break Camp", path: "/programs/march-break-camp" },
    ],
  },
  {
    type: "dropdown",
    label: "Resources",
    activePrefix: null,
    items: [
      { label: "FAQ", path: "/faq" },
      { label: "Policies", path: "/policies" },
    ],
  },
];

export const navCTAs = [
  {
    label: "Free Assessment",
    path: "/programs/location_select?program=trial",
    className: "free-trial-button",
    analytics: { event: "cta_click", placement: "navbar", label: "free_trial" },
  },
  {
    label: "Contact",
    path: "/contact",
    className: "cta-button",
    analytics: { event: "cta_click", placement: "navbar", label: "contact" },
  },
];
