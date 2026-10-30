import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredData, { buildBreadcrumbSchema } from "../components/StructuredData";
import "../css/shop.css";

const categories = ["All", "Equipment", "Apparel", "Accessories", "Fan Gear"];

const products = [
  {
    id: "club-ball",
    category: "Equipment",
    badge: "Official Gear",
    title: "Auriga FC Official Soccer Ball",
    price: "$30",
    description: "Hand-stitched thermo-bonded soccer ball built for optimal touch, precision flight, and all-weather durability.",
    images: [
      "/images/Ball-.webp",
      "/images/Ball-2.webp",
      "/images/Ball-3.webp",
    ],
    status: "Available at Sessions",
  },
  {
    id: "shin-guards",
    category: "Equipment",
    badge: "Protection",
    title: "Auriga FC Pro Shin Guards",
    price: "$20",
    description: "Anatomically contoured low-profile protective shell with EVA foam backing for superior impact absorption.",
    images: ["/images/Shin 1.webp", "/images/Shin 2.webp"],
    status: "Available at Sessions",
  },
  {
    id: "club-cap",
    category: "Apparel",
    badge: "Fan Gear",
    title: "Auriga FC Club Cap",
    price: "$15",
    description: "Classic structured crown with embroidered Auriga FC crest and breathable eyelets for players and supporters.",
    images: ["/images/CAP-.webp", "/images/CAP-2.webp"],
    status: "In Stock",
  },
  {
    id: "club-water-bottle",
    category: "Accessories",
    badge: "Club Accessory",
    title: "Auriga FC Sports Water Bottle",
    price: "$20",
    description: "Double-wall stainless steel insulated bottle keeps drinks ice-cold throughout intense practices and matches.",
    images: ["/images/Bottle-.webp", "/images/Bottle 3.webp"],
    status: "In Stock",
  },
  {
    id: "dad-tee",
    category: "Fan Gear",
    badge: "Supporter",
    title: "Auriga FC Soccer Dad Tee",
    price: "$23",
    description: "Premium ringspun cotton supporter tee celebrating our soccer parents cheering proudly from the sidelines.",
    images: ["/images/DAD-1.webp", "/images/DAD-2.webp"],
    status: "In Stock",
  },
  {
    id: "mom-tee",
    category: "Fan Gear",
    badge: "Supporter",
    title: "Auriga FC Soccer Mom Tee",
    price: "$23",
    description: "Soft, comfortable supporter shirt designed for proud Auriga FC moms supporting their young athletes.",
    images: ["/images/MOM-.webp"],
    status: "In Stock",
  },
];

function ProductImageCarousel({ product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageCount = product.images.length;

  useEffect(() => {
    product.images.forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, [product.images]);

  const showImage = (index) => {
    setActiveImageIndex((index + imageCount) % imageCount);
  };

  return (
    <div className={`shop-card-img-wrap ${imageCount > 1 ? "has-carousel" : ""}`}>
      <span className="shop-card-badge">{product.badge}</span>
      <img
        id={`shop-product-image-${product.id}`}
        src={product.images[activeImageIndex]}
        alt={`${product.title} - image ${activeImageIndex + 1} of ${imageCount}`}
        className="shop-card-img"
        loading="lazy"
      />
      {imageCount > 1 && (
        <div className="shop-carousel-controls" aria-label={`${product.title} images`}>
          <button
            type="button"
            className="shop-carousel-arrow"
            aria-label={`Previous image for ${product.title}`}
            aria-controls={`shop-product-image-${product.id}`}
            onClick={() => showImage(activeImageIndex - 1)}
          >
            <span aria-hidden="true">&lsaquo;</span>
          </button>
          <div className="shop-carousel-pagination">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`shop-carousel-dot ${activeImageIndex === index ? "active" : ""}`}
                aria-label={`Show image ${index + 1} of ${imageCount} for ${product.title}`}
                aria-current={activeImageIndex === index ? "true" : undefined}
                aria-controls={`shop-product-image-${product.id}`}
                onClick={() => showImage(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="shop-carousel-arrow"
            aria-label={`Next image for ${product.title}`}
            aria-controls={`shop-product-image-${product.id}`}
            onClick={() => showImage(activeImageIndex + 1)}
          >
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>
      )}
    </div>
  );
}

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
                <ProductImageCarousel product={product} />
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
