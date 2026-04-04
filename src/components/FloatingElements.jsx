import "../css/floating.css";

const items = [
  { emoji: "⚽", className: "float-item float-1" },
  { emoji: "🏆", className: "float-item float-2" },
  { emoji: "⚽", className: "float-item float-3" },
  { emoji: "🥅", className: "float-item float-4" },
  { emoji: "🏆", className: "float-item float-5" },
  { emoji: "⚽", className: "float-item float-6" },
  { emoji: "🥇", className: "float-item float-7" },
  { emoji: "⚽", className: "float-item float-8" },
];

function FloatingElements() {
  return (
    <div className="floating-container" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className={item.className}>
          {item.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingElements;
