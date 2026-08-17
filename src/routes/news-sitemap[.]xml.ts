import { createFileRoute } from "@tanstack/react-router";
import { ISSUES } from "../data/issues";

// theoffscript.page/news-sitemap.xml
//
// A separate sitemap in Google's news:news format (see
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap).
//
// Google's spec is strict: only articles published in the last 48
// hours belong in here. This will usually be EMPTY, and that's
// correct — it should only ever contain this week's issue, and only
// for the two days right after it goes out. Older issues live in the
// regular /sitemap.xml instead, with no news:news tags, exactly as
// Google's own "don't backdate old content into the news sitemap"
// guidance wants.
//
// Nothing to touch here when publishing — this reads off the same
// datePublished + featureStory.body already required for a full
// issue page (../data/issues.ts), so an issue only shows up once
// it's actually search-eligible.

const BASE_URL = "https://theoffscript.page";
const PUBLICATION_NAME = "The OffScript";
const LANGUAGE = "en";
const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/news-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = Date.now();

        const recentIssues = ISSUES.filter((issue) => {
          if (!issue.datePublished || !issue.featureStory.body?.length) return false;
          const publishedAt = new Date(`${issue.datePublished}T00:00:00Z`).getTime();
          return now - publishedAt <= TWO_DAYS_MS && now >= publishedAt;
        });

        const entries = recentIssues
          .map(
            (issue) => `  <url>
    <loc>${BASE_URL}/issue/${issue.number}</loc>
    <news:news>
      <news:publication>
        <news:name>${PUBLICATION_NAME}</news:name>
        <news:language>${LANGUAGE}</news:language>
      </news:publication>
      <news:publication_date>${issue.datePublished}</news:publication_date>
      <news:title>${escapeXml(issue.featureStory.headline)}</news:title>
    </news:news>
  </url>`
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>
`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=900",
          },
        });
      },
    },
  },
});
