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

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(
      Array.isArray(data) ? data : data
    );
    script.setAttribute("data-seo", "structured-data");
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data]);

  return null;
}

/* ═══════════════════════════════════════════
   Pre-built schema helpers
   ═══════════════════════════════════════════ */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Auriga Football Club",
  "alternateName": "Auriga FC",
  "url": "https://aurigafootballclub.com",
  "logo": "https://aurigafootballclub.com/images/logo.webp",
  "image": "https://aurigafootballclub.com/images/logo.webp",
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
  "name": "Auriga Football Club",
  "image": "https://aurigafootballclub.com/images/logo.webp",
  "url": "https://aurigafootballclub.com",
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
  "name": "Auriga Football Club",
  "url": "https://aurigafootballclub.com",
  "description": "Professional youth soccer training for ages 4–13 in Mississauga, Brampton, and Etobicoke.",
  "publisher": {
    "@type": "Organization",
    "name": "Auriga Football Club",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aurigafootballclub.com/images/logo.webp"
    }
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

export function buildCourseSchema({ name, description, provider = "Auriga Football Club", locationName = "Mississauga, Ontario" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://aurigafootballclub.com"
    },
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
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://aurigafootballclub.com${item.path}`
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
    "organizer": {
      "@type": "Organization",
      "name": "Auriga Football Club",
      "url": "https://aurigafootballclub.com"
    },
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled"
  };
}

export default StructuredData;
