import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: process.env.SITE_URL || "https://ashcx.github.io",
  integrations: [mdx()],
  output: "static"
});
