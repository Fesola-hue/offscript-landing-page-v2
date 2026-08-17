import { createFileRoute } from "@tanstack/react-router";
import { ISSUES } from "../data/issues";

// theoffscript.page/sitemap.xml
//
// Generated on every request from the same ISSUES array that drives
// the archive and issue pages — nothing to maintain by hand. Publish
// a new issue in ../data/issues.ts and it shows up here automatically,
// with its real datePublished as <lastmod>.
//
// This replaced a hand-edited public/sitemap.xml, which had to be
// updated manually every time an issue went out.

const BASE_URL = "https://theoffscript.page";

type SitemapUrl = {
  loc: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: string;
  lastmod?: string;
};

function buildXml(urls: SitemapUrl[]): string {
  const entries = urls
    .map((u) => {
      const lastmod = u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "";
      return `  <url>
    <loc>${u.loc}</loc>${lastmod}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticUrls: SitemapUrl[] = [
          { loc: `${BASE_URL}/`, changefreq: "weekly", priority: "1.0" },
          { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.7" },
          { loc: `${BASE_URL}/archive`, changefreq: "weekly", priority: "0.8" },
          { loc: `${BASE_URL}/latest`, changefreq: "weekly", priority: "0.8" },
        ];

        const issueUrls: SitemapUrl[] = ISSUES.map((issue, i) => ({
          loc: `${BASE_URL}/issue/${issue.number}`,
          changefreq: "monthly",
          priority: i === 0 ? "0.9" : "0.6",
          lastmod: issue.datePublished,
        }));

        const xml = buildXml([...staticUrls, ...issueUrls]);

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
