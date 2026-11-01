import { FAQ, JOURNEY } from "@/lib/content";
import { SITE } from "@/lib/site";

const ORG_ID = `${SITE.orgUrl}/#organization`;
const PERSON_ID = `${SITE.founderUrl}/#person`;
const COURSE_ID = `${SITE.url}/#course`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: "Productize Yourself with AI",
      alternateName: ["Productize Yourself", "Productise Yourself"],
      description: SITE.description,
      inLanguage: "en-GB",
      keywords: SITE.keywords.join(", "),
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.org,
      url: SITE.orgUrl,
      founder: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: SITE.founder,
      url: SITE.founderUrl,
      jobTitle: "Founder of AI Powered",
      worksFor: { "@id": ORG_ID },
      sameAs: [SITE.founderUrl, SITE.orgUrl],
      knowsAbout: [...SITE.keywords],
    },
    {
      "@type": "Course",
      "@id": COURSE_ID,
      name: "Productize Yourself with AI",
      alternateName: ["Productize Yourself", "Productise Yourself", "Productize Yourself programme"],
      url: SITE.url,
      description: SITE.description,
      inLanguage: "en-GB",
      keywords: SITE.keywords.join(", "),
      provider: { "@id": ORG_ID },
      creator: { "@id": PERSON_ID },
      teaches: JOURNEY.phases.map((phase) => `${phase.name}: ${phase.sub}`),
      about: SITE.keywords.map((term) => ({ "@type": "Thing", name: term })),
      audience: {
        "@type": "Audience",
        audienceType: "Coaches, consultants and experts building a business from what they know",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        instructor: { "@id": PERSON_ID },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
