/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";

/**
 * StructuredData — Injects a JSON-LD <script> block into <head>.
 * Automatically cleans up on unmount / re-render.
 *
 * Usage:
 *   <StructuredData data={{ "@context": "https://schema.org", ... }} />
 *   <StructuredData data={[schema1, schema2]} />  // multiple schemas
 */
function StructuredData({ data }) {
  useEffect(() => {
    if (!data) return;

    const output = Array.isArray(data) 
      ? { "@context": "https://schema.org", "@graph": data }
      : data;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(output);
    script.setAttribute("data-seo", "structured-data");
    
    // Safety check to remove any previous rogue structured data tags injected by this component
    const oldScript = document.querySelector('script[data-seo="structured-data"]');
    if (oldScript) oldScript.remove();

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data]);

  return null;
}

/* ═══════════════════════════════════════════
   Core IDs & Constants
   ═══════════════════════════════════════════ */
const DOMAIN = "https://aurigafootballclub.com";
const LOGO_URL = `${DOMAIN}/images/logo.webp`;
const ORG_ID = `${DOMAIN}/#organization`;
const WEBSITE_ID = `${DOMAIN}/#website`;

/* ═══════════════════════════════════════════
   Pre-built schema models
   ═══════════════════════════════════════════ */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "@id": ORG_ID,
  "name": "Auriga Football Club",
  "alternateName": "Auriga FC",
  "url": DOMAIN,
  "logo": {
    "@type": "ImageObject",
    "@id": `${DOMAIN}/#logo`,
    "url": LOGO_URL,
    "contentUrl": LOGO_URL,
    "caption": "Auriga Football Club Logo"
  },
  "image": LOGO_URL,
  "description": "Auriga Football Club offers professional youth soccer training for ages 4–13 in Mississauga, Brampton, and Etobicoke. Programs include fundamentals, development academy, competitive teams, personal training, and seasonal camps.",
  "sport": "Soccer",
  "foundingLocation": {
    "@type": "Place",
    "name": "Mississauga, Ontario, Canada"
  },
  "areaServed": [
    { "@type": "City", "name": "Mississauga", "containedInPlace": { "@type": "State", "name": "Ontario" } },
    { "@type": "City", "name": "Brampton", "containedInPlace": { "@type": "State", "name": "Ontario" } },
    { "@type": "City", "name": "Etobicoke", "containedInPlace": { "@type": "State", "name": "Ontario" } }
  ],
  "telephone": "+1-647-978-6798",
  "email": "info@aurigafootball.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "525 Huntington Ridge Dr",
    "addressLocality": "Mississauga",
    "addressRegion": "ON",
    "postalCode": "L5R 2X7",
    "addressCountry": "CA"
  },
  "sameAs": [
    "https://www.facebook.com/people/Auriga-Football-Club/100091466900502/",
    "https://www.instagram.com/aurigafc"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-647-978-6798",
    "contactType": "customer service",
    "email": "info@aurigafootball.com",
    "availableLanguage": "English"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${DOMAIN}/#localbusiness`,
  "name": "Auriga Football Club",
  "image": LOGO_URL,
  "url": DOMAIN,
  "telephone": "+1-647-978-6798",
  "email": "info@aurigafootball.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "525 Huntington Ridge Dr",
    "addressLocality": "Mississauga",
    "addressRegion": "ON",
    "postalCode": "L5R 2X7",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.5890,
    "longitude": -79.6441
  },
  "parentOrganization": { "@id": ORG_ID },
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "21:00"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "name": "Auriga Football Club",
  "url": DOMAIN,
  "description": "Professional youth soccer training for ages 4–13 in Mississauga, Brampton, and Etobicoke.",
  "publisher": { "@id": ORG_ID },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${DOMAIN}/?s={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\n/g, " ")
      }
    }))
  };
}

export function buildCourseSchema({ name, description, locationName = "Mississauga, Ontario" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": { "@id": ORG_ID },
    "location": {
      "@type": "Place",
      "name": locationName,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mississauga",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    }
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMAIN}${window.location.pathname}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${DOMAIN}${item.path}`
    }))
  };
}

export function buildEventSchema({ name, description, startDate, endDate, locationName, locationAddress }) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": locationName,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": locationAddress || "525 Huntington Ridge Dr",
        "addressLocality": "Mississauga",
        "addressRegion": "ON",
        "addressCountry": "CA"
      }
    },
    "organizer": { "@id": ORG_ID },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled"
  };
}

export default StructuredData;
