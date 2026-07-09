export const site = {
  name: "Ash Chong",
  title: "Event Photography & Social Content | Ash Chong",
  description:
    "Corporate event photography and social media content for businesses and brands in Singapore, from large conferences to small studio launches.",
  whatsapp: "+65 8927 1158",
  whatsappUrl:
    "https://api.whatsapp.com/send/?phone=6589271158&text=Hi+Ash%21+I+would+like+to+book+your+photography+%2F+social+media+services.%0A%0ASome+details+of+my+upcoming+event+%2F+marketing+campaign+are+as+follows%3A%0A-+%20&type=phone_number&app_absent=0"
};

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
  content: true, // Social media page
  caseStudy: false, // Featured case-study block inside /content/ — no content written yet, kept as a reserved toggle
  data: false
} satisfies Record<string, boolean>;

const allNavItems = [
  { id: "photography", href: "/photography/", label: "Photography" },
  { id: "content", href: "/content/", label: "Social media" },
  { id: "data", href: "/data/", label: "Data" },
  { id: "contact", href: "/contact/", label: "Contact" }
] as const;

export const navItems = allNavItems.filter((item) => sections[item.id as keyof typeof sections] ?? true);
