import Script from "next/script";

// Universitet üçün Organization Schema
export function OrganizationJsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://eipu.edu.pl/#organization",
    name: "European International Peace University",
    alternateName: [
      "EIPU",
      "Европейский Международный Университет По миру и безопасности",
      "Avrupa Uluslararası Barış Üniversitesi",
    ],
    url: "https://eipu.edu.pl",
    logo: {
      "@type": "ImageObject",
      url: "https://eipu.edu.pl/images/EIPU-logo.png",
      width: 512,
      height: 512,
    },
    image: "https://eipu.edu.pl/images/EIPU-logo-tam.jpg",
    description:
      "European International Peace University (EIPU) - International education in Poland with bachelor's, master's and PhD programs. Quality education through peace and global understanding.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PL",
      addressLocality: "Poland",
    },
    sameAs: [
      "https://www.facebook.com/eipu.edu.pl",
      "https://www.instagram.com/eipu.edu.pl",
      "https://www.linkedin.com/school/eipu",
      "https://twitter.com/eipu_edu",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "admissions",
      availableLanguage: ["English", "Turkish", "Russian"],
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

// Universitet üçün CollegeOrUniversity Schema
export function UniversityJsonLd() {
  const universityData = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "European International Peace University",
    alternateName: "EIPU",
    url: "https://eipu.edu.pl",
    logo: "https://eipu.edu.pl/images/EIPU-logo.png",
    description:
      "EIPU offers international bachelor's, master's and PhD programs in Poland. Fostering peace through education and global understanding.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Poland",
    },
    hasOfferingCatalog: {
      "@type": "OfferingCatalog",
      name: "Academic Programs",
      itemListElement: [
        {
          "@type": "Course",
          name: "Bachelor Programs",
          description: "Undergraduate degree programs",
        },
        {
          "@type": "Course",
          name: "Master Programs",
          description: "Graduate degree programs",
        },
        {
          "@type": "Course",
          name: "PhD Programs",
          description: "Doctoral degree programs",
        },
      ],
    },
  };

  return (
    <Script
      id="university-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(universityData) }}
    />
  );
}

// WebSite Schema - Axtarış üçün
export function WebsiteJsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://eipu.edu.pl/#website",
    url: "https://eipu.edu.pl",
    name: "EIPU - European International Peace University",
    alternateName: ["EIPU", "European International Peace University"],
    description: "Official website of European International Peace University",
    publisher: {
      "@id": "https://eipu.edu.pl/#organization",
    },
    inLanguage: ["en", "tr", "ru"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://eipu.edu.pl/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

// Bütün JSON-LD-ləri birləşdirən komponent
export function SeoJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <UniversityJsonLd />
      <WebsiteJsonLd />
    </>
  );
}
