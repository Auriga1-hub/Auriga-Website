import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/shop.css";

const categories = ["All", "Equipment", "Apparel", "Accessories", "Fan Gear"];

const products = [
  {
    id: "match-ball",
    category: "Equipment",
    badge: "Official Gear",
    title: "Auriga FC Official Match Ball",
    price: "$30",
    description: "Hand-stitched thermo-bonded soccer ball built for optimal touch, precision flight, and all-weather durability.",
    image: "/images/Ball-.webp",
    status: "Available at Sessions",
  },
  {
    id: "training-ball",
    category: "Equipment",
    badge: "Academy Edition",
    title: "Auriga FC Academy Training Ball",
    price: "$30",
    description: "High-durability training ball engineered for daily drills, footwork development, and scrimmage sessions.",
    image: "/images/Ball-2.webp",
    status: "Available at Sessions",
  },
  {
    id: "shin-guards",
    category: "Equipment",
    badge: "Protection",
    title: "Auriga FC Pro Shin Guards",
    price: "$20",
    description: "Anatomically contoured low-profile protective shell with EVA foam backing for superior impact absorption.",
    image: "/images/Shin 1.webp",
    status: "Available at Sessions",
  },
  {
    id: "snapback-cap",
    category: "Apparel",
    badge: "Fan Gear",
    title: "Auriga FC Structured Snapback",
    price: "$15",
    description: "Classic structured crown with embroidered Auriga FC crest and breathable eyelets for players and supporters.",
    image: "/images/CAP-.webp",
    status: "In Stock",
  },
  {
    id: "performance-cap",
    category: "Apparel",
    badge: "Fan Gear",
    title: "Auriga FC Curved Peak Cap",
    price: "$15",
    description: "Lightweight moisture-wicking club cap perfect for sun protection during outdoor training and sideline support.",
    image: "/images/CAP-2.webp",
    status: "In Stock",
  },
  {
    id: "insulated-bottle",
    category: "Accessories",
    badge: "Club Accessory",
    title: "Insulated Sports Water Bottle",
    price: "$20",
    description: "Double-wall stainless steel insulated bottle keeps drinks ice-cold throughout intense practices and matches.",
    image: "/images/Bottle-.webp",
    status: "In Stock",
  },
  {
    id: "quick-grip-bottle",
    category: "Accessories",
    badge: "Hydration",
    title: "Auriga FC Quick-Grip Bottle",
    price: "$20",
    description: "Ergonomic hydration bottle featuring easy-squeeze flow valve for quick sideline refreshment during drills.",
    image: "/images/Bottle 3.webp",
    status: "In Stock",
  },
  {
    id: "dad-tee",
    category: "Fan Gear",
    badge: "Supporter",
    title: "Auriga FC Soccer Dad Tee",
    price: "$23",
    description: "Premium ringspun cotton supporter tee celebrating our soccer parents cheering proudly from the sidelines.",
    image: "/images/DAD-1.webp",
    status: "In Stock",
  },
  {
    id: "mom-tee",
    category: "Fan Gear",
    badge: "Supporter",
    title: "Auriga FC Soccer Mom Tee",
    price: "$23",
    description: "Soft, comfortable supporter shirt designed for proud Auriga FC moms supporting their young athletes.",
    image: "/images/MOM-.webp",
    status: "In Stock",
  },
];

function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Official Club Shop | Auriga Football Club | Gear & Apparel"
        description="Explore the official Auriga Football Club shop. Browse club soccer balls, training equipment, drinkware, caps, and parent supporter apparel in Mississauga & Brampton."
        keywords="auriga fc shop, youth soccer gear mississauga, soccer balls brampton, auriga merchandise, club soccer kit apparel"
      />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />

      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero-overlay" />
        <div className="shop-hero-container">
          <span className="shop-hero-badge">Official Merchandise</span>
          <h1 className="shop-hero-title">Auriga FC Club Shop</h1>
          <p className="shop-hero-text">
            Gear up with official Auriga Football Club match balls, training equipment,
            drinkware, and supporter apparel for players and families.
          </p>
        </div>
      </section>

      {/* MAIN CATALOG */}
      <section className="shop-section">
        <div className="shop-container">

          {/* FILTER TABS */}
          <div className="shop-filter-bar" role="tablist" aria-label="Product categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`shop-filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <article className="shop-card" key={product.id}>
                <div className="shop-card-img-wrap">
                  <span className="shop-card-badge">{product.badge}</span>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="shop-card-img"
                    loading="lazy"
                  />
                </div>
                <div className="shop-card-body">
                  <div className="shop-card-meta">
                    <span className="shop-card-category">{product.category}</span>
                    <span className="shop-card-price">{product.price}</span>
                  </div>
                  <h2 className="shop-card-title">{product.title}</h2>
                  <p className="shop-card-desc">{product.description}</p>
                  <div className="shop-card-footer">
                    <span className="shop-card-status">{product.status}</span>
                    <Link to="/contact" className="shop-card-btn">
                      Inquire
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* HOW TO ORDER / PICKUP BANNER */}
          <div className="shop-info-banner">
            <div className="shop-info-item">
              <span className="shop-info-icon" aria-hidden="true">📍</span>
              <h3>Pickup at Training</h3>
              <p>
                Merchandise and equipment can be collected directly at any of our training sessions in Mississauga or Brampton.
              </p>
            </div>
            <div className="shop-info-item">
              <span className="shop-info-icon" aria-hidden="true">⚽</span>
              <h3>Custom &amp; Team Orders</h3>
              <p>
                Need team uniforms, customized training kits, or bulk apparel? Contact our administration team for sizing and orders.
              </p>
            </div>
            <div className="shop-info-item">
              <span className="shop-info-icon" aria-hidden="true">💬</span>
              <h3>Have a Question?</h3>
              <p>
                Reach out to us through our contact form or speak directly with our club staff on the pitch during practice.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Shop;
