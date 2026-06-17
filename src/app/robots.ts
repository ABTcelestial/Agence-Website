import type { MetadataRoute } from "next";

const BASE_URL = "https://xenondz.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/services/", "/solutions/", "/tarifs", "/realisations", "/about", "/faq", "/contact", "/blog/"],
        disallow: ["/admin/", "/xn-ctrl-8z/", "/src/"],
      },
      { userAgent: "GPTBot",        allow: "/" },
      { userAgent: "ChatGPT-User",  allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot",     allow: "/" },
      { userAgent: "anthropic-ai",  allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot",       allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
