const whatsappMessage = `Hi Ash, I’d like to enquire about a project.

Service needed:
Date or timeframe:
Location:
Requirements:

Could you let me know your availability?`;

export const site = {
  name: "Ash Chong",
  title: "Event Photography & Social Content | Ash Chong",
  description:
    "Corporate event photography and social media content for businesses and brands in Singapore, from large conferences to small studio launches.",
  whatsapp: "+65 8927 1158",
  whatsappUrl: `https://api.whatsapp.com/send/?phone=6589271158&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`
};

export const featuredEventFilm = {
  videoId: "BefG_TBCul0",
  posterUrl: "/images/airwallex-ecom-north.webp",
  linkedinUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7493109029649645568/",
  label: "Featured event film",
  title: "Airwallex x Ecom North.",
  titleLineTwo: "Built to Scale.",
  description:
    "A highlight film from the Airwallex × Ecom North Singapore Summit, bringing together speaker sessions, conversations, and moments from the event."
} as const;

// Single source of truth for published pricing figures — referenced by the
// Photography/Social media "What to expect" sections and the Contact page
// pricing teaser, so a number only ever needs to change in one place.
export const pricing = {
  photography: {
    halfDay: 600,
    fullDay: 1400
  },
  content: {
    single: 350,
    campaign: 875,
    retainer: 1200
  }
};

// Master switch: flip a section to `false` to hide it from the navbar, footer
// sitemap, home page, and sitemap.xml. The page itself still resolves if
// visited directly (soft-hide), so no routing changes are needed.
export const sections = {
  photography: true,
  video: true,
  content: true, // Social media page
  caseStudy: false, // Featured case-study block inside /content/ — no content written yet, kept as a reserved toggle
  data: false
} satisfies Record<string, boolean>;

const allNavItems = [
  { id: "photography", href: "/photography/", label: "Photography" },
  { id: "video", href: "/videography/", label: "Event video" },
  { id: "content", href: "/content/", label: "Social media" },
  { id: "data", href: "/data/", label: "Data" },
  { id: "contact", href: "/contact/", label: "Contact" }
] as const;

export const navItems = allNavItems.filter((item) => sections[item.id as keyof typeof sections] ?? true);
