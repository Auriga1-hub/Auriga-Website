import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://aurigafc.ca";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/logo.webp`;

/**
 * SEOHead — Sets per-page document title, meta description, keywords,
 * canonical URL, and Open Graph / Twitter Card tags.
 *
 * Usage:
 *   <SEOHead
 *     title="Page Title | Auriga FC"
 *     description="150-char meta description"
 *     keywords="keyword1, keyword2"
 *     ogImage="/images/hero.webp"   // optional, relative to domain
 *   />
 */
function SEOHead({ title, description, keywords, ogImage }) {
  const { pathname } = useLocation();
  const canonicalUrl = `${BASE_URL}${pathname}`;
  const ogImageUrl = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`)
    : DEFAULT_OG_IMAGE;

  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImageUrl);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Auriga Football Club");

    // Twitter Card
    setMeta("property", "twitter:card", "summary_large_image");
    setMeta("property", "twitter:title", title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:image", ogImageUrl);
  }, [title, description, keywords, canonicalUrl, ogImageUrl]);

  return null; // This component only manipulates <head>
}

export default SEOHead;
