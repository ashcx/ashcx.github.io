import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { galleryUrl, projectUrl, published } from "@lib/content";
import { sections } from "@lib/site";

export const GET: APIRoute = async ({ site }) => {
  const photos = published(await getCollection("photography"));
  const projects = published(await getCollection("data-projects"));
  const routes = [
    "/",
    ...(sections.photography ? ["/photography/", ...photos.map(galleryUrl)] : []),
    ...(sections.content ? ["/content/"] : []),
    ...(sections.data ? ["/data/", ...projects.map(projectUrl)] : []),
    "/contact/"
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${new URL(route, site)}</loc></url>`)
    .join("\n")}\n</urlset>\n`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};
