import { useState, useEffect } from "react";

const testimonials = [
  {
    text: "My son built confidence, resilience, and real skills in a positive environment.",
    author: "Massoma Jafari",
  },
  {
    text: "Professional, supportive coaches who genuinely care about kids' development.",
    author: "Ronny Leon Perez",
  },
  {
    text: "Exceptional training focused on confidence, skills, and individual growth.",
    author: "Rajesh",
  },
];

function TestimonialBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #1e3a8a, #0b1f35)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
        borderTop: '1px solid rgba(16, 185, 129, 0.3)',
        padding: '28px 24px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {testimonials.map((t, index) => (
          <div
            key={index}
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 0.6s ease',
              position: index === activeIndex ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Nunito', sans-serif",
                fontSize: '16px',
                fontStyle: 'italic',
                color: '#e2e8f0',
                lineHeight: '1.6',
                letterSpacing: '0.3px',
              }}
            >
              "{t.text}"
            </p>
            <p
              style={{
                margin: '10px 0 0',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                color: '#10b981',
                letterSpacing: '1px',
              }}
            >
              – {t.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialBar;
