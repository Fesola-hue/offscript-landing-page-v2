import type { ArticleSource } from "../data/issues";

function formatSourceDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ReportingTrail({ sources }: { sources?: ArticleSource[] }) {
  if (!sources?.length) return null;

  return (
    <section
      aria-labelledby="reporting-trail-heading"
      className="mt-16 border-t border-white/15 pt-9 sm:mt-20 sm:pt-10"
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-orange)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Reporting trail
      </p>
      <h2
        id="reporting-trail-heading"
        className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Sources &amp; further reading
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
        The reporting, data and documents behind this story.
      </p>

      <ul className="mt-8 border-t border-white/10">
        {sources.map((source) => (
          <li
            key={source.url}
            className="grid min-w-0 gap-3 border-b border-white/10 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8 sm:py-6"
          >
            <div className="min-w-0">
              <p
                className="break-words text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-neutral-500"
                style={{ fontFamily: "var(--font-mono)", overflowWrap: "anywhere" }}
              >
                {source.publication}
              </p>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block break-words text-sm font-semibold leading-relaxed text-neutral-100 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--brand-blue)] hover:decoration-[var(--brand-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)] sm:text-base"
                style={{ overflowWrap: "anywhere" }}
              >
                {source.title}
              </a>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read source: ${source.title}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-blue)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-blue)]"
              >
                Read source <span aria-hidden="true">↗</span>
              </a>
            </div>

            {source.date && (
              <time
                dateTime={source.date}
                className="text-xs text-neutral-500 sm:pt-0.5 sm:text-right"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatSourceDate(source.date)}
              </time>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
