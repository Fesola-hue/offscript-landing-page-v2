import { createFileRoute, Link } from '@tanstack/react-router'
import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { CURRENT_ISSUE } from "../data/issues";
import { Wordmark } from "../components/Wordmark";
import { MailerLiteForm } from "../components/MailerLiteForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => {
    const schemaOrg = {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      "name": "The OffScript",
      "alternateName": "OffScript",
      "url": "https://theoffscript.page",
      "logo": "https://theoffscript.page/favicon-512x512.png",
      "founder": {
        "@type": "Person",
        "name": "Aisha Onola",
        "url": "https://aishaonola.me"
      },
      "sameAs": [
        "https://check.theoffscript.page",
        "https://instagram.com/theoffscriptfm",
        "https://x.com/theoffscriptfm",
        "https://linkedin.com/company/theoffscriptfm"
      ],
      // Real pages that already say this, not placeholders — see the
      // About page FAQ. Deliberately not filling in the rest of the
      // NewsMediaOrganization/Trust Project fields (diversityPolicy,
      // ownershipFundingInfo, noBylinesPolicy, etc.) since there's no
      // genuine content behind them yet for a one-person newsroom.
      "masthead": "https://theoffscript.page/about",
      "correctionsPolicy": "https://theoffscript.page/about#faq-corrections",
      "verificationFactCheckingPolicy": "https://theoffscript.page/about#faq-sourcing",
      "ethicsPolicy": "https://theoffscript.page/about#faq-ethics"
    };

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "The OffScript" },
        { title: "The OffScript | Nigeria's News, Actually Explained" },
        { name: "description", content: "A free weekly email that translates Nigeria's politics, money, and culture into plain English. Read less. Understand more. No grammar, no wahala." },
        { name: "keywords", content: "nigerian news brief, weekly newsletter nigeria, simplified news, lagos newsletter, business news nigeria, news explained, offscript, the offscript" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://theoffscript.page" },
        { property: "og:title", content: "The OffScript — Read less. Understand more." },
        { property: "og:description", content: "One weekly email cutting through Nigeria's noise. Politics, money, and culture, translated into what it actually means for you." },
        { property: "og:image", content: "https://theoffscript.page/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@theoffscriptfm" },
        { name: "twitter:title", content: "The OffScript — Read less. Understand more." },
        { name: "twitter:description", content: "Clear, plain-English context on Nigerian politics, money, and culture, delivered every Friday. Free forever." },
        { name: "twitter:image", content: "https://theoffscript.page/og-image.jpg" },
      ],
      links: [
        { rel: "canonical", href: "https://theoffscript.page/" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(schemaOrg) }
      ]
    };
  },
});

/* ============================================================
   SITE COPY — evergreen brand copy. Rewrite this if the voice
   or positioning changes; it doesn't move week to week.
   ============================================================ */
const COPY = {
  eyebrow: "Every Friday · Free forever",
  headline: ["Read less.", "Understand more."],
  sub: "One weekly email breaking down Nigeria's politics, money, and culture into what it actually means for you. No grammar, no wahala.",
  ctaPrimary: "Join Free",
  fine: "Free forever. One email a week. Unsubscribe anytime.",
  demo: {
    kicker: "See it in action",
    headline: "Same story. Actually readable.",
    lede: "This is the whole point. Toggle between the raw headline and how we'd actually write it.",
  },
  latestIssue: {
    kicker: "This week",
    cta: "Read the full issue",
  },
  guide: {
    kicker: "Every Friday",
    headline: "What's inside every issue.",
    lede: "Same seven sections, every week, so you always know what you're getting. Swipe through →",
  },
  format: {
    kicker: "The format",
    headline: "Why it reads different.",
  },
  join: {
    kicker: "Last call",
    headline: "Don't miss next Friday's email.",
    sub: "Drop your email. We'll handle the rest, every week, for free.",
    skim: "Rather read one first?",
  },
  footerDesc: "A weekly email for Nigerians who want the news straight, the context real, and a playlist that actually fits the mood.",
};

// Evergreen — the recurring segments every issue is built from.
// Definitions only, not this week's specific stories.
const SECTION_GUIDE = [
  { label: "Main Character", desc: "The biggest story of the week, broken down without the noise." },
  { label: "The Soundtrack", desc: "Three songs picked to match the week's mood." },
  { label: "Government", desc: "What's actually happening in government and policy, translated." },
  { label: "Numbers We Can't Ignore", desc: "One stat worth knowing, explained in plain terms." },
  { label: "Side Quests", desc: "Two smaller stories that don't need five minutes each." },
  { label: "Word Market", desc: "Big words from the week's news, decoded." },
  { label: "Rabbit Hole", desc: "Extra reads, watches, and listens for the curious." },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/theoffscriptfm" },
  { label: "X", href: "https://x.com/theoffscriptfm" },
  { label: "LinkedIn", href: "https://linkedin.com/company/theoffscriptfm" },
];

// Illustrative examples for the interactive "translator" demo below the
// fold. Generic and evergreen on purpose — swap anytime, doesn't need to
// track this week's actual stories.
const TRANSLATIONS = [
  {
    tag: "Money",
    raw: "CBN adjusts benchmark interest rate amid inflationary pressures and FX volatility concerns.",
    clear: "Interest rates went up again. Loans get pricier, savings get a little sweeter.",
  },
  {
    tag: "Politics",
    raw: "National Assembly moves to amend the Electoral Act ahead of the next general elections.",
    clear: "Lawmakers are rewriting the election rules again — here's what changes for you as a voter.",
  },
  {
    tag: "Policy",
    raw: "Federal Government unveils phased rollout of a new tertiary education funding framework.",
    clear: "Student loans are getting an overhaul. Here's what it means if you're in school.",
  },
];

// THIS WEEK'S ISSUE now lives in ../data/issues.ts — that's the only
// file to touch when a new edition goes out (see comment in that file).

const FORMAT_DATA = [
  {
    id: "01",
    title: "No stiff grammar",
    description: "We write the way Nigerians actually talk. Politics, economy, and global news, broken down so anyone can follow it, first read.",
    icon: "grammar",
  },
  {
    id: "02",
    title: "Naija context, not just news",
    description: "Not just what happened, what it means for your naira and your hustle. Whether you're reading from Lagos, London, or Atlanta.",
    icon: "context",
  },
  {
    id: "03",
    title: "Built to skim",
    description: "Every story comes tagged with a read time. Two minutes or one, you know what you're signing up for before you start.",
    icon: "skim",
  },
];

// --- UTILS & HOOKS ---
function scrollToForm(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

// --- PAGE SECTIONS ---
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4" aria-label="Main Navigation">
        <a href="#top" className="text-lg sm:text-xl tracking-tight shrink-0" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          <Wordmark />
        </a>

        {/* Full link set — desktop only */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#guide" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">What's inside</a>
          <a href="#how" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">The format</a>
          <Link to="/latest" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Latest issue</Link>
          <Link to="/archive" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Archive</Link>
          <Link to="/about" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">About</Link>
          <a href="https://check.theoffscript.page" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--brand-orange)] hover:opacity-80 transition-opacity whitespace-nowrap">Take the Dossier →</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Archive stays visible on mobile on its own — it's the one
             link readers use to get familiar with the brand, so it
             shouldn't be buried behind a menu tap. */}
          <Link
            to="/archive"
            className="md:hidden text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
          >
            Archive
          </Link>

          <a
            href="#join"
            onClick={scrollToForm}
            className="inline-flex items-center rounded-full bg-[var(--brand-blue)] text-white px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Join free
          </a>

          {/* Hamburger — mobile only, holds the remaining links */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex items-center justify-center w-7 h-7 text-neutral-300 hover:text-white transition-colors"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — What's inside / The format / Latest issue */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md px-4 sm:px-6 py-4 flex flex-col gap-4">
          <a href="#guide" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">What's inside</a>
          <a href="#how" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">The format</a>
          <Link to="/latest" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">Latest issue</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">About</Link>
          <a href="https://check.theoffscript.page" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--brand-orange)] hover:opacity-80 transition-opacity">Take the Dossier →</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-2xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 flex flex-col items-center text-center">
      <div className="flex items-center gap-3 mb-7 animate-fade-in-up">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--brand-blue)] animate-blink" />
        </span>
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {COPY.eyebrow}
        </span>
      </div>

      <h1
        className="text-[2.6rem] leading-[1.08] sm:text-6xl md:text-7xl tracking-tight text-white animate-fade-in-up-delay-1"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {COPY.headline[0]}
        <br />
        <span className="relative inline-block mt-1">
          <span className="relative z-10">{COPY.headline[1]}</span>
          <span
            className="absolute inset-x-0 bottom-[4px] sm:bottom-3 h-[10px] sm:h-4 -z-0 animate-expand"
            style={{ backgroundColor: "var(--brand-blue)" }}
            aria-hidden="true"
          />
        </span>
      </h1>

      <p className="mt-7 text-base md:text-lg leading-relaxed text-neutral-400 max-w-lg animate-fade-in-up-delay-2">
        {COPY.sub}
      </p>

      <div className="mt-9 w-full max-w-sm flex flex-col items-center gap-4 animate-fade-in-up-delay-3">
        <a
          href="#join"
          onClick={scrollToForm}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-blue)] text-white w-full h-14 text-base font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[var(--brand-blue)]/25"
        >
          {COPY.ctaPrimary}
          <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">→</span>
        </a>
        <Link
          to="/latest"
          className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
        >
          Read Latest Issue →
        </Link>
      </div>
      <p className="mt-4 text-xs text-neutral-500 font-medium">{COPY.fine}</p>
    </section>
  );
}

function Ticker() {
  const items = [...CURRENT_ISSUE.ticker, ...CURRENT_ISSUE.ticker];
  const [paused, setPaused] = useState(false);
  return (
    <div
      className="border-y border-white/10 bg-[var(--brand-blue)] py-3 overflow-hidden cursor-pointer select-none"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused((p) => !p)}
    >
      <div
        className="flex w-max animate-ticker"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 text-xs sm:text-sm font-semibold text-white">
            {item}
            <span className="ml-6 opacity-60">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TranslatorDemo() {
  const [index, setIndex] = useState(0);
  const [showClear, setShowClear] = useState(true);
  const item = TRANSLATIONS[index];

  return (
    <section className="border-t border-black/5 bg-[var(--brand-cream)] overflow-hidden">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <Reveal className="text-center mb-10">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500" style={{ fontFamily: "var(--font-mono)" }}>
            {COPY.demo.kicker}
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl tracking-tight text-neutral-900"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {COPY.demo.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-md mx-auto">{COPY.demo.lede}</p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="rounded-3xl border border-black/10 bg-white shadow-xl p-6 sm:p-9">
            <div className="flex items-center justify-center gap-1 rounded-full bg-neutral-100 p-1 mx-auto w-fit mb-8">
              <button
                type="button"
                onClick={() => setShowClear(false)}
                className={`px-4 sm:px-5 h-9 rounded-full text-xs sm:text-sm font-semibold transition-colors ${!showClear ? "bg-neutral-900 text-white" : "text-neutral-500"}`}
              >
                The raw headline
              </button>
              <button
                type="button"
                onClick={() => setShowClear(true)}
                className={`px-4 sm:px-5 h-9 rounded-full text-xs sm:text-sm font-semibold transition-colors ${showClear ? "bg-[var(--brand-blue)] text-white" : "text-neutral-500"}`}
              >
                The OffScript's take
              </button>
            </div>

            <div className="min-h-[130px] flex items-center justify-center text-center px-2">
              <p
                key={`${index}-${showClear}`}
                className="text-lg sm:text-2xl leading-snug text-neutral-900 animate-fade-in-up"
                style={{
                  fontFamily: showClear ? "var(--font-sans)" : "var(--font-display)",
                  fontWeight: showClear ? 600 : 700,
                }}
              >
                {showClear ? item.clear : item.raw}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-orange)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.tag}
              </span>
              <div className="flex items-center gap-2">
                {TRANSLATIONS.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Show example ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-neutral-900" : "w-2 bg-neutral-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LatestIssue() {
  const { featureStory } = CURRENT_ISSUE;
  return (
    <section className="border-t border-black/5 bg-[var(--brand-cream)] overflow-hidden">
      <div className="mx-auto max-w-4xl py-4 sm:py-6 px-6 pb-20">
        <Reveal>
          <div className="rounded-2xl bg-[var(--brand-blue-deep)] p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-8 shadow-xl">
            <div className="max-w-lg">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                {COPY.latestIssue.kicker} · Issue {CURRENT_ISSUE.number}
              </span>
              <h2
                className="mt-4 text-2xl sm:text-3xl md:text-4xl tracking-tight text-white leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {featureStory.headline}
              </h2>
              <blockquote className="mt-5 border-l-2 border-[var(--brand-orange)] pl-5">
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">{featureStory.quote}</p>
              </blockquote>
            </div>
            <Link
              to="/latest"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[var(--brand-blue-deep)] px-6 h-14 text-sm font-bold hover:brightness-95 active:scale-[0.98] transition-all w-fit shrink-0"
            >
              {COPY.latestIssue.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionGuide() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / SECTION_GUIDE.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActive(Math.min(SECTION_GUIDE.length - 1, Math.max(0, idx)));
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / SECTION_GUIDE.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  return (
    <section id="guide" className="border-t border-white/10 bg-black overflow-hidden">
      <div className="mx-auto max-w-5xl py-20">
        <Reveal className="max-w-lg mb-10 px-6">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400" style={{ fontFamily: "var(--font-mono)" }}>
            {COPY.guide.kicker}
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {COPY.guide.headline}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">{COPY.guide.lede}</p>
        </Reveal>

        <Reveal delayMs={100}>
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-2"
          >
            {SECTION_GUIDE.map((item, i) => (
              <div
                key={item.label}
                className="snap-start shrink-0 w-[82%] sm:w-[46%] md:w-[31%] rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="text-xs font-bold text-[var(--brand-blue)]" style={{ fontFamily: "var(--font-mono)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base sm:text-lg font-bold text-white">{item.label}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Issue sections">
            {SECTION_GUIDE.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to section ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-[var(--brand-blue)]" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FormatIcon({ kind }: { kind: string }) {
  if (kind === "grammar") {
    return (
      <div className="h-9 w-9 rounded-lg bg-[var(--brand-blue)] flex items-center justify-center shrink-0" aria-hidden="true">
        <span className="text-white text-sm font-extrabold" style={{ fontFamily: "var(--font-display)" }}>Aa</span>
      </div>
    );
  }
  if (kind === "context") {
    return (
      <div className="flex items-end gap-[3px] h-9" aria-hidden="true">
        <span className="w-2 h-4 rounded-sm bg-[var(--brand-blue)]" />
        <span className="w-2 h-6 rounded-sm bg-[var(--brand-blue)]" />
        <span className="w-2 h-9 rounded-sm bg-[var(--brand-blue)]" />
      </div>
    );
  }
  return (
    <div
      className="h-9 px-2.5 rounded-lg bg-[var(--brand-blue)] flex items-center justify-center shrink-0"
      style={{ fontFamily: "var(--font-mono)" }}
      aria-hidden="true"
    >
      <span className="text-white text-xs font-bold">2 MIN</span>
    </div>
  );
}

function FormatTimeline() {
  return (
    <section id="how" className="border-t border-black/5 bg-[var(--brand-cream)] overflow-hidden">
      <div className="mx-auto max-w-5xl py-20 px-6">
        <Reveal className="max-w-lg mb-12">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500" style={{ fontFamily: "var(--font-mono)" }}>
            {COPY.format.kicker}
          </span>
          <h2
            className="mt-3 text-2xl sm:text-3xl md:text-4xl tracking-tight text-neutral-900"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {COPY.format.headline}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {FORMAT_DATA.map((item, i) => (
            <Reveal key={item.id} delayMs={i * 90}>
              <div className="h-full rounded-2xl border border-black/10 bg-white p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400" style={{ fontFamily: "var(--font-mono)" }}>{item.id}</span>
                  <FormatIcon kind={item.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-neutral-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderTeaser() {
  return (
    <section className="border-t border-white/10 bg-black overflow-hidden">
      <div className="mx-auto max-w-3xl py-16 sm:py-20 px-6">
        <Reveal className="text-center sm:text-left">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500" style={{ fontFamily: "var(--font-mono)" }}>
            Who's behind this
          </span>
        </Reveal>
        <Reveal delayMs={90} className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 text-center sm:text-left">
          <img
            src="/aisha-onola.jpg"
            alt="Aisha Onola, founder and editor of The OffScript"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-white/10 shrink-0"
            width={112}
            height={112}
          />
          <div>
            <h2 className="text-xl sm:text-2xl tracking-tight text-white" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              <a
                href="https://aishaonola.me"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-[var(--brand-blue)] hover:text-[var(--brand-blue)] transition-colors"
              >
                Aisha Onola
              </a>
              , Founder & Editor
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-md">
              Aisha started The OffScript with a simple idea: staying informed shouldn't feel like a full-time job. She shapes the editorial direction and edits every story herself.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)] hover:opacity-80 transition-opacity"
            >
              More about The OffScript
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function JoinBanner() {
  return (
    <section id="join" className="border-t border-white/10 relative overflow-hidden bg-[var(--brand-blue-deep)]">
      <div
        className="absolute -right-24 top-1/2 w-[420px] h-[420px] rounded-full bg-[var(--brand-blue)] opacity-20 blur-[100px] pointer-events-none hidden md:block animate-float-y"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6 py-20 relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <Reveal className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <span className="h-px w-6 bg-[var(--brand-orange)]" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{COPY.join.kicker}</span>
          </div>
          <h2
            className="text-3xl md:text-5xl tracking-tight leading-tight text-white"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {COPY.join.headline}
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/60 max-w-xs mx-auto md:mx-0">
            {COPY.join.sub}
          </p>
          <p className="mt-6 text-sm text-white/50">
            {COPY.join.skim}{" "}
            <a
              href="/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--brand-orange)] hover:opacity-80 transition-opacity underline underline-offset-4"
            >
              Read Latest Issue →
            </a>
          </p>
        </Reveal>

        <Reveal delayMs={120} className="border border-white/10 bg-black/30 rounded-2xl p-4 shadow-xl">
          <MailerLiteForm />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center md:justify-between gap-6 text-center md:text-left">
        <div>
          <div className="text-xl tracking-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            <Wordmark />
          </div>
          <p className="mt-2 text-xs text-neutral-400 max-w-xs leading-relaxed">
            {COPY.footerDesc}
          </p>
          <p className="mt-2 text-[11px] text-neutral-600">Lagos, Nigeria</p>
          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a href="https://check.theoffscript.page" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-500 hover:text-[var(--brand-blue)] transition-colors">
              Take the Dossier
            </a>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-[var(--brand-blue)] transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-2 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} The OffScript. Tailored for the curious Nigerian.</p>
          <p className="uppercase tracking-[0.2em] text-neutral-600">Lagos · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroEnd = document.getElementById("hero-end");
    const joinSection = document.getElementById("join");
    if (!heroEnd || !joinSection) return;

    let pastHero = false;
    let inJoin = false;
    const update = () => setShow(pastHero && !inJoin);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );
    const joinObserver = new IntersectionObserver(
      ([entry]) => {
        inJoin = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 }
    );

    heroObserver.observe(heroEnd);
    joinObserver.observe(joinSection);
    return () => {
      heroObserver.disconnect();
      joinObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 bg-black/90 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href="#join"
        onClick={scrollToForm}
        className="flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-blue)] text-white w-full h-12 text-sm font-bold active:scale-[0.98] transition-transform"
      >
        {COPY.ctaPrimary} — takes 10 seconds
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-[var(--brand-blue)] selection:text-white relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[var(--brand-blue)] opacity-[0.06] rounded-full blur-[120px] animate-float" />
      </div>
      <Header />
      <main id="top" className="relative z-10 pt-14 sm:pt-16">
        <Hero />
        <span id="hero-end" aria-hidden="true" />
        <Ticker />
        <TranslatorDemo />
        <LatestIssue />
        <SectionGuide />
        <FormatTimeline />
        <FounderTeaser />
        <JoinBanner />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  );
}
