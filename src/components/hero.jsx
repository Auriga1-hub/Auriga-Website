import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/hero.css";

const HERO_SLIDES = [
  {
    image: "/images/hero-home.webp",
    title: (
      <>
        Kids Soccer Training &<br />
        Youth Development Academy<br />
        <span className="hero-title-accent">Auriga Football Club</span>
      </>
    ),
    text: "Auriga Football Club is a community-driven youth soccer academy offering professional training programs that builds skills, fitness, and confidence, with clear development and competitive pathways for young players.",
    buttons: [
      {
        to: "/programs/location_select",
        label: "View Fundamental Programs",
        variant: "primary",
        analyticsLabel: "view_programs",
      },
      {
        to: "/programs/location_select?program=trial",
        label: "Book Free Assessment",
        variant: "outline",
        analyticsLabel: "book_free_trial",
      },
    ],
  },
  {
    image: "/images/hero-home-2.webp",
    imageClassName: "hero-bg-slide--girls-soccer",
    title: (
      <>
        Girls Soccer Starter Program
      </>
    ),
    text: "A beginner-friendly, girls-only soccer program built to grow confidence, friendships, and fundamentals in a supportive environment.",
    buttons: [
      {
        to: "/programs/girls-soccer-brampton-central",
        label: "Explore Girls Soccer Program",
        variant: "primary",
        analyticsLabel: "girls_soccer_program",
      },
    ],
  },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <div className="hero-section">

      <div className="hero-bg-carousel">
        {HERO_SLIDES.map((slideItem, index) => (
          <div
            key={slideItem.image}
            className={`hero-bg-slide${slideItem.imageClassName ? ` ${slideItem.imageClassName}` : ""}${index === activeSlide ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${slideItem.image})` }}
          />
        ))}
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-col">

            <h1 className="hero-title">
              {slide.title}
            </h1>

            <p className="hero-text">
              {slide.text}
            </p>

            <div className="hero-buttons">

              {slide.buttons.map((button) => (
                <Link
                  key={button.analyticsLabel}
                  to={button.to}
                  className={`hero-btn hero-btn--${button.variant}`}
                  data-analytics-event="cta_click"
                  data-analytics-placement="hero"
                  data-analytics-destination={button.to}
                  data-analytics-label={button.analyticsLabel}
                >
                  {button.label}
                </Link>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Hero;
