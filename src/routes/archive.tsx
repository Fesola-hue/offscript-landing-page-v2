import { createFileRoute, Link } from '@tanstack/react-router'
import { ISSUES } from "../data/issues";
import { Wordmark } from "../components/Wordmark";

export const Route = createFileRoute('/archive')({
  component: ArchivePage,
  head: () => {
    const archiveSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "The OffScript Archive",
      description: "Every past issue of The OffScript, all in one place.",
      url: "https://theoffscript.page/archive",
      isPartOf: { "@type": "NewsMediaOrganization", name: "The OffScript", url: "https://theoffscript.page" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ISSUES.map((issue, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://theoffscript.page/issue/${issue.number}`,
          name: issue.featureStory.headline,
        })),
      },
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Archive | The OffScript" },
        { name: "description", content: "Every past issue of The OffScript, all in one place." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://theoffscript.page/archive" },
        { property: "og:title", content: "Archive | The OffScript" },
        { property: "og:description", content: "Every past issue of The OffScript, all in one place." },
        { property: "og:image", content: "https://theoffscript.page/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Archive | The OffScript" },
        { name: "twitter:description", content: "Every past issue of The OffScript, all in one place." },
        { name: "twitter:image", content: "https://theoffscript.page/og-image.jpg" },
      ],
      links: [
        { rel: "canonical", href: "https://theoffscript.page/archive" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(archiveSchema) },
      ],
    };
  },
});

function ArchivePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[var(--brand-blue)] selection:text-white">
      <header className="border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-6 h-14 sm:h-16 flex items-center justify-between gap-4" aria-label="Main Navigation">
          <Link to="/" className="text-lg sm:text-xl tracking-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            <Wordmark />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              ← Back home
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <span
          className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Every issue
        </span>
        <h1
          className="mt-3 text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          The Archive.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-lg">
          Every issue of The OffScript, newest first. Missed a Friday? Catch up here.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-col gap-10 sm:gap-14">
          {ISSUES.map((issue, i) => {
            const dateLabel = issue.datePublished
              ? new Date(`${issue.datePublished}T00:00:00Z`).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })
              : issue.week;

            return (
              <Link
                key={issue.number}
                to="/issue/$number"
                params={{ number: issue.number }}
                className="group block"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-950">
                  <img
                    src={issue.image ?? "/og-image.jpg"}
                    alt={issue.featureStory.headline}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm sm:text-base font-bold text-white">Aisha Onola</p>
                      <p className="text-xs sm:text-sm text-neutral-300">{dateLabel}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className="text-xs font-bold text-[var(--brand-blue)] bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        Issue {issue.number}
                      </span>
                      {i === 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--brand-orange)] bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
                          Latest
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <h2 className="mt-5 text-xl sm:text-2xl font-bold text-white leading-snug">
                  {issue.featureStory.headline}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-400 leading-relaxed line-clamp-3">
                  {issue.featureStory.quote}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)] group-hover:opacity-80 transition-opacity">
                  Read More
                  <span
                    aria-hidden
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    ↗
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-[11px] text-neutral-500">
          © {new Date().getFullYear()} The OffScript · Lagos · Worldwide
        </div>
      </footer>
    </div>
  );
}
