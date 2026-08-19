const navigation = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Our Club",
    dropdown: [
      { name: "About Us",            path: "/about" },
      { name: "Careers",             path: "/careers" },
      { name: "Player Development",  path: "/resources/player-development" },
    ],
  },
  {
    name: "Programs",
    dropdown: [
      { name: "Recreational Programs", path: "/programs/location_select?program=recreation" },
      { name: "Free Assessments",           path: "/programs/location_select?program=trial" },
      { name: "Christmas Camps",       path: "/programs/christmas-camps" },
    ],
  },
  {
    name: "Resources",
    dropdown: [
      { name: "Regulations & Policies", path: "/resources/regulations" },
    ],
  },
];

export default navigation;