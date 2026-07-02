export const site = {
  name: "Keith Tan",
  title: "Photographer + Data Analyst Portfolio",
  description: "A portfolio for corporate event photography, social content, and data analytics work.",
  whatsapp: "+65 8927 1158",
  whatsappUrl: "https://wa.me/6589271158"
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
