import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import { ISSUES } from "../data/issues";
import { Wordmark } from "../components/Wordmark";
import { MailerLiteForm } from "../components/MailerLiteForm";

// theoffscript.page/issue/002 (etc).
//
// If featureStory.body is filled in for an issue, this renders the
// full story as real text on the page — that's what gets it crawled
// and searchable. The original emailed version stays available in a
// collapsed "read as sent" section underneath, so nothing is hidden,
// it's just not the first thing loaded.
//
// If an issue has no body text yet, this falls back to the old
// full-frame embed view, unchanged. Add body paragraphs in
// ../data/issues.ts whenever you're ready and the page upgrades
// itself automatically, nothing else to touch.
export const Route = createFileRoute('/issue/$number')({
  component: IssuePage,
  loader: ({ params }) => {
    const issue = ISSUES.find((i) => i.number === params.number);
    if (!issue) throw notFound();
    return issue;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const issue = loaderData;
    const num = issue.number;
    const title = `${issue.featureStory.headline} | The OffScript`;
    const description = issue.featureStory.quote;
    const url = `https://theoffscript.page/issue/${num}`;
    const hasFullStory = Boolean(issue.datePublished && issue.featureStory.body?.length);

    const meta = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Aisha Onola" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "https://theoffscript.page/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://theoffscript.page/og-image.jpg" },
    ];

    if (hasFullStory) {
      meta.push({ property: "article:published_time", content: issue.datePublished! });
    }

    const scripts = hasFullStory
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: issue.featureStory.headline,
              description: issue.featureStory.quote,
              image: ["https://theoffscript.page/og-image.jpg"],
              datePublished: issue.datePublished,
              dateModified: issue.datePublished,
              author: [{ "@type": "Person", name: "Aisha Onola", url: "https://aishaonola.me", jobTitle: "Founder & Editor" }],
              publisher: {
                "@type": "NewsMediaOrganization",
                name: "The OffScript",
                logo: { "@type": "ImageObject", url: "https://theoffscript.page/favicon-512x512.png" },
              },
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              isAccessibleForFree: true,
              articleBody: issue.featureStory.body!.join("\n\n"),
            }),
          },
        ]
      : undefined;

    return { meta, scripts, links: [{ rel: "canonical", href: url }] };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4 px-6 text-center">
      <p className="text-neutral-400">That issue doesn't exist (yet).</p>
      <Link to="/archive" className="text-[var(--brand-blue)] font-semibold">
        ← Back to the archive
      </Link>
    </div>
  ),
});

function IssueNav({ issue }: { issue: (typeof ISSUES)[number] }) {
  // Full-story pages have the "read as sent" toggle further down as a
  // built-in fallback, so this link can hide on mobile there without
  // leaving anyone stuck. Embed-only issues have no such fallback — the
  // iframe is the only view — so this stays visible at every size for
  // those, in case it ever renders awkwardly on a small screen.
  const hasFullStory = Boolean(issue.datePublished && issue.featureStory.body?.length);

  return (
    <header className="shrink-0 border-b border-white/10">
      <nav className="mx-auto max-w-3xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3" aria-label="Main Navigation">
        <Link to="/" className="text-lg sm:text-xl tracking-tight shrink-0" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          <Wordmark />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <Link to="/about" className="hidden sm:block text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
            About
          </Link>
          <Link to="/archive" className="text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
            ← Archive
          </Link>
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
          >
            Open ↗
          </a>
        </div>
      </nav>
    </header>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function FullStoryPage({ issue }: { issue: (typeof ISSUES)[number] }) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (showOriginal) {
    return (
      <div className="h-screen flex flex-col bg-black text-white font-sans antialiased">
        <IssueNav issue={issue} />
        <div className="shrink-0 border-b border-white/10">
          <div className="mx-auto max-w-2xl px-6 py-3">
            <button
              onClick={() => setShowOriginal(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:opacity-80 transition-opacity"
            >
              <span className="rotate-180">↓</span>
              Hide, back to article
            </button>
          </div>
        </div>
        <div className="relative flex-1 min-h-0">
          {!loaded && !failed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-3 text-neutral-500">
                <div className="h-6 w-6 rounded-full border-2 border-neutral-700 border-t-[var(--brand-blue)] animate-spin" />
                <span className="text-xs">Loading Issue {issue.number}…</span>
              </div>
            </div>
          )}
          {failed ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black px-6">
              <div className="text-center">
                <p className="text-neutral-400 text-sm mb-4">Your browser blocked the preview.</p>
                <a
                  href={issue.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-blue)] text-white px-6 h-12 text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Open issue in new tab ↗
                </a>
              </div>
            </div>
          ) : (
            <iframe
              key={issue.url}
              src={issue.url}
              title={`The OffScript Issue ${issue.number}, full email`}
              className="h-full w-full border-0 bg-white"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[var(--brand-blue)] selection:text-white">
      <IssueNav issue={issue} />

      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500" style={{ fontFamily: "var(--font-mono)" }}>
          <span>Issue {issue.number}</span>
          <span>·</span>
          <time dateTime={issue.datePublished}>{formatDate(issue.datePublished!)}</time>
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-orange)]">
          {issue.featureStory.kicker}
        </p>

        <h1
          className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {issue.featureStory.headline}
        </h1>

        <p className="mt-4 text-sm text-neutral-500">
          By{" "}
          <a
            href="https://aishaonola.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-neutral-300 hover:text-white underline underline-offset-4 decoration-[var(--brand-blue)] transition-colors"
          >
            Aisha Onola
          </a>
          , Editor
        </p>

        <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-neutral-200">
          {issue.featureStory.body!.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-sm text-neutral-400">
            This is one story from Issue {issue.number}. The full weekly email covers a few
            more, plus a playlist to match the mood.
          </p>
          <button
            onClick={() => setShowOriginal(true)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:opacity-80 transition-opacity"
          >
            Read the full issue as it was emailed
            <span className="transition-transform">↓</span>
          </button>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">Get the next one free</p>
          <MailerLiteForm />
        </div>
      </main>
    </div>
  );
}

function EmbedOnlyPage({ issue }: { issue: (typeof ISSUES)[number] }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-black text-white font-sans antialiased">
      <IssueNav issue={issue} />
      <div className="relative flex-1 min-h-0">
        {!loaded && !failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-3 text-neutral-500">
              <div className="h-6 w-6 rounded-full border-2 border-neutral-700 border-t-[var(--brand-blue)] animate-spin" />
              <span className="text-xs">Loading Issue {issue.number}…</span>
            </div>
          </div>
        )}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black px-6">
            <div className="text-center">
              <p className="text-neutral-400 text-sm mb-4">Your browser blocked the preview.</p>
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-blue)] text-white px-6 h-12 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Open issue in new tab ↗
              </a>
            </div>
          </div>
        ) : (
          <iframe
            key={issue.url}
            src={issue.url}
            title={`The OffScript Issue ${issue.number}`}
            className="h-full w-full border-0 bg-white"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

function IssuePage() {
  const issue = Route.useLoaderData();
  const hasFullStory = Boolean(issue.datePublished && issue.featureStory.body?.length);

  return hasFullStory ? <FullStoryPage issue={issue} /> : <EmbedOnlyPage issue={issue} />;
}
