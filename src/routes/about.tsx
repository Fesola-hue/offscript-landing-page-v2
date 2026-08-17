import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "../components/Wordmark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FOUNDER_URL = "https://aishaonola.me";

const BIO_PARAGRAPHS = [
  "Aisha Onola is the founder and editor of The OffScript, a publication making news easier to understand, more relevant, and a little more enjoyable to keep up with.",
  "She started The OffScript with a simple idea: staying informed shouldn't feel like a full-time job. She shapes the editorial direction, researches and edits every story, and decides what's actually worth your attention.",
  "She's especially drawn to stories where business, tech, work, and culture intersect, especially when there's more to a headline than meets the eye.",
  "Off the newsletter, she's usually building something, writing, or three tabs deep into a rabbit hole that started with one innocent Google search.",
];

const FAQS: { q: string; a: string; id?: string }[] = [
  {
    q: "Okay, but what exactly is The OffScript?",
    a: "The OffScript is a newsletter for people who want to know what's going on, without spending their whole day figuring out what's going on. Every edition brings you the stories and conversations worth knowing, with enough context to actually understand why they matter. And yes, there's usually a soundtrack.",
  },
  {
    q: "Why read The OffScript instead of just reading the news?",
    a: "Because you could open 15 news apps, 6 tabs, and somehow end up on TikTok three hours later. The OffScript does the digging for you: we pick out what's worth your attention, explain the context, connect the dots, and give you the gist without the textbook feeling.",
  },
  {
    q: "Who is this for?",
    a: "You, probably. Especially if you've ever seen a headline, thought \u201cwait, what is happening,\u201d and decided you were too tired to find out. We're particularly interested in making news feel relevant to young Nigerians and the lives we're actually living.",
  },
  {
    id: "faq-sourcing",
    q: "Where do your stories come from?",
    a: "We do the digging before we do the talking. Depending on the story, that means official statements, government publications, company announcements, research, primary sources, and reporting from established news organizations. When sources matter to understanding a story, we'll point you toward them.",
  },
  {
    q: "Who actually runs this thing?",
    a: "__FOUNDER_LINK__ founded and edits The OffScript, and handles the editorial direction, research, story selection, editing, and publishing. Yes, it's currently a very small newsroom. Yes, that newsroom is mostly one person. We're working on it.",
  },
  {
    q: "Do you use AI?",
    a: "Sometimes, as a tool. AI can help with brainstorming, organizing research, transcription, or other parts of the workflow. It doesn't decide what The OffScript publishes. There's a human checking, editing, questioning, and occasionally staring at the screen wondering if a sentence makes sense.",
  },
  {
    id: "faq-ethics",
    q: "Do you have opinions?",
    a: "Of course, we're human. But having a perspective isn't the same as making things up. When we're reporting or explaining something, we're interested in getting the facts right, being clear about what we know, and giving you enough context to form your own opinion.",
  },
  {
    q: "Can I suggest a story?",
    a: "Absolutely. If you see something and think \u201cThe OffScript needs to talk about this,\u201d send it our way. We might even listen.",
  },
  {
    id: "faq-corrections",
    q: "What if you get something wrong?",
    a: "Tell us. Seriously. If we publish something inaccurate, misleading, or missing important context, we want to know. We'll investigate and correct the story when necessary. Being wrong isn't a personality trait we're building the brand around.",
  },
  {
    q: "How often do you publish?",
    a: "Weekly. Once a week, we show up in your inbox with things you probably should know, things you might want to know, and at least one thing that makes you go \u201cwait, WHAT?\u201d",
  },
  {
    q: "Is The OffScript free?",
    a: "Yep. Subscribe and get new editions straight to your inbox. No newspaper subscription required, no pretending you'll actually read 14 newsletters every morning. Just The OffScript.",
  },
];

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => {
    const title = "About | The OffScript";
    const description = "Meet the founder behind The OffScript, and answers to the questions people actually ask.";
    const url = "https://theoffscript.page/about";

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Aisha Onola",
      url: FOUNDER_URL,
      jobTitle: "Founder & Editor",
      worksFor: { "@type": "NewsMediaOrganization", name: "The OffScript", url: "https://theoffscript.page" },
      sameAs: [FOUNDER_URL],
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a.replace("__FOUNDER_LINK__", "Aisha Onola"),
        },
      })),
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: "https://theoffscript.page/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "https://theoffscript.page/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(personSchema) },
        { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      ],
    };
  },
});

function FounderLink({ onLight = false }: { onLight?: boolean }) {
  return (
    <a
      href={FOUNDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-semibold underline underline-offset-4 decoration-[var(--brand-blue)] transition-colors hover:text-[var(--brand-blue)] ${
        onLight ? "text-black" : "text-white"
      }`}
    >
      Aisha Onola
    </a>
  );
}

/** Fades + slides content in the first time it enters the viewport. */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[var(--brand-blue)] selection:text-white">
      <header className="border-b border-white/10">
        <nav className="mx-auto max-w-3xl px-6 h-14 sm:h-16 flex items-center justify-between gap-4" aria-label="Main Navigation">
          <Link to="/" className="text-lg sm:text-xl tracking-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            <Wordmark />
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/archive" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Archive
            </Link>
            <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              ← Back home
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Founder */}
        <div className="mx-auto max-w-2xl px-6 pt-16 sm:pt-20 pb-16 sm:pb-20">
          <Reveal>
            <span
              className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Who's behind this
            </span>
          </Reveal>

          <Reveal delayMs={90} className="mt-6 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
            <img
              src="/aisha-onola.jpg"
              alt="Aisha Onola, founder and editor of The OffScript"
              className="w-full aspect-[4/3] object-cover object-top sm:w-40 sm:aspect-auto sm:h-50 rounded-2xl border border-white/10 shrink-0"
              width={900}
              height={1125}
            />
            <div>
              <h1
                className="text-2xl sm:text-3xl tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                <FounderLink />
              </h1>
              <p className="mt-1 text-sm font-semibold text-[var(--brand-orange)]">Founder & Editor</p>
              <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-neutral-300">
                {BIO_PARAGRAPHS.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* FAQ — its own section: white background marks the shift from bio to Q&A */}
        <section className="bg-white text-black">
          <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
            <Reveal>
              <span
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Frequently asked
              </span>
              <h2
                className="mt-3 text-2xl sm:text-3xl tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                Questions people actually ask.
              </h2>
            </Reveal>

            <Accordion type="multiple" className="mt-8 border-t border-black/10">
              {FAQS.map(({ q, a, id }, i) => (
                <AccordionItem key={q} id={id ?? `faq-${i}`} value={`faq-${i}`} className="border-black/10">
                  <Reveal delayMs={Math.min(i * 40, 280)}>
                    <AccordionTrigger className="py-6 text-left text-base sm:text-lg font-bold text-black hover:no-underline hover:text-[var(--brand-blue)] [&[data-state=open]]:text-[var(--brand-blue)]">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-0 text-sm sm:text-base leading-relaxed text-neutral-600 whitespace-pre-line">
                      {a.includes("__FOUNDER_LINK__") ? (
                        <>
                          <FounderLink onLight /> {a.replace("__FOUNDER_LINK__ ", "")}
                        </>
                      ) : (
                        a
                      )}
                    </AccordionContent>
                  </Reveal>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20 text-center">
          <Reveal>
            <a
              href="/#join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-blue)] text-white px-6 h-14 text-sm font-bold hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Join free
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-xs text-neutral-500">
              Rather read one first? <Link to="/latest" className="text-[var(--brand-blue)] font-semibold">Read the latest issue →</Link>
            </p>
          </Reveal>
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
