/* ============================================================
   ISSUES — the only file to touch when a new edition goes out.

   Add the new issue as a new object at the TOP of this array
   (index 0). Everything else updates automatically:
     - the homepage always shows ISSUES[0] as "this week"
     - theoffscript.page/latest always redirects to ISSUES[0].url
     - theoffscript.page/archive lists every issue, newest first

   SEARCH VISIBILITY — two fields matter a lot here:
     - datePublished: the real calendar date the issue went out
       (e.g. "2026-07-25"). Used for the dateline shown on the
       page and for the article's schema markup. Leave it out
       and the page just won't show a date or article schema —
       nothing breaks, it just won't be search-eligible yet.
     - featureStory.body: the FULL text of the week's headline
       story, as an array of paragraphs. This is what actually
       gets indexed and makes the story findable when someone
       searches that topic. Without it, the page falls back to
       just the short teaser + the embedded email, same as
       before.
   ============================================================ */

export type Issue = {
  number: string;
  week: string;
  url: string;
  ticker: string[];
  /** ISO date the issue actually went out, e.g. "2026-07-25". */
  datePublished?: string;
  /** Cover image shown on the archive page, e.g. "/issues/issue-004-ai-apps.jpg". */
  image?: string;
  featureStory: {
    kicker: string;
    headline: string;
    quote: string;
    /** Full story text, one paragraph per array item. */
    body?: string[];
  };
};

export const ISSUES: Issue[] = [
  {
    number: "004",
    week: "Week 4",
    // TODO(Fesola): drop in the real MailerLite webview link for Issue 004,
    // same as the other issues below — needed for "Open in new tab" and the
    // "read as sent" fallback on the issue page.
    url: "https://preview.mailerlite.io/preview/2329743/emails/195703529769273128",

    ticker: [
      "Nigeria has the highest AI chatbot adoption rate on Earth, 88% of adults, versus a 62% global average",
      "Nigerian startups and banks pay an estimated $850 million a year just to host data on foreign servers",
      "Nigeria is mid-way through a $1 billion push to build its own AI-ready data centers at home",
      "Air Peace and United Nigeria Airlines got grounded this week after unions picketed over \u20a615 billion in unremitted ticket sales charges",
      "Geregu Power defaulted on a \u20a640.09 billion bond after profit fell 88% in the first half of 2026",
    ],

    datePublished: "2026-08-14",
    image: "/issues/issue-004-ai-apps.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Nigeria Doesn't Have an AI Problem. It Has an Ownership Problem.",
      quote: "Nearly nine in ten Nigerian adults use AI chatbots, the highest adoption rate on Earth. None of it runs on a server, model, or currency Nigeria controls. This issue is about the gap between adoption and ownership.",
      body: [
        "Nearly nine in ten Nigerian adults have used an AI chatbot, the highest adoption share recorded anywhere in Google and Ipsos's 2026 global survey, ahead of every other country measured. Nigeria leads the world in using the technology. It just doesn't own any of it.",
        "Every one of those conversations runs on a server Nigeria doesn't own, trained on a model Nigeria didn't build, billed in a currency Nigeria doesn't control. A report from the AI Empowerment Foundation put it plainly this month: Nigeria is adopting AI faster than it's building anything underneath that adoption. It's consuming the technology, not owning it.",
        "That gap has a price tag. Nigerian startups and banks pay an estimated $850 million a year just to host their own data on foreign servers. Over 90 percent of the country's digital data sits somewhere in Europe or the US.",
        "Some of that really is just naira math. The currency has lost significant ground against the dollar over the years, so anything priced in dollars costs more in naira than it used to, and that's true of everything imported, not just AI. But it doesn't fully explain what's happening here. At today's official rate, around \u20a61,368 to the dollar, a straight conversion of a $20 subscription comes to about \u20a627,360. That's not what most Nigerians actually pay, because CBN forex rules block most Nigerian cards from paying international subscriptions directly. The workaround, a virtual dollar card from providers like Grey or Chipper Cash, pushes that same $20 tool to around \u20a632,000, nearly \u20a65,000 above the straight conversion. Meanwhile, on the rare occasion a platform bothers to localize its pricing properly, the same subscription can run closer to \u20a614,900, actually below the straight conversion.",
        "Same $20. Same month. A roughly \u20a617,000 spread depending entirely on which door you walked through to pay. That's not inflation. That's what happens when a market gets priced as an afterthought. Only one major AI company has bothered to price for that reality.",
        "There's a real answer in motion, though. Nigeria is mid-way through a $1 billion push to build its own AI-ready data centers at home, with Kasi Cloud among the first to come online. The Finance Minister said the quiet part out loud at its commissioning: Nigeria can't keep paying foreign exchange for AI capability hosted abroad, it has to become a producer, not just a consumer. If it works, that $850 million currently leaving the country every year starts staying in it instead, and the jobs that come with running that infrastructure stay here too.",
        "But data centers only solve where AI gets hosted. They don't answer whether Nigeria can build the AI itself, the models, not just the buildings underneath them.",
        "So can Nigeria actually build the thing? The honest answer is more promising than you'd expect. Lagos alone anchors more than 120 active AI startups, spread across healthtech, fintech, agritech and language tech. Decide, a three-person Nigerian startup with zero outside funding, ranked fourth globally on an international benchmark for AI spreadsheet agents, ahead of teams backed by far more money. Terra Industries, out of Abuja, builds AI-powered surveillance drones it now exports to eight African countries and Canada. And N-ATLAS, the government-backed language model built by Lagos startup Awarri, already understands Yoruba, Hausa, Igbo and Nigerian-accented English, a problem most foreign labs never bothered solving.",
        "So yes, the talent is real, and it's already shipping things the rest of the world uses. What's thin is everything underneath that talent. Fewer than 5 percent of African AI talent has access to the computing power serious model-building actually requires, per reporting corroborated by the UN Development Programme. Only 31 percent of African universities surveyed by the World Bank even offer a dedicated AI programme. And the engineers Nigeria does train increasingly take remote jobs with foreign companies paying in dollars, pulling talent away from the same local startups this whole movement depends on.",
        "Nigeria has the people. What it doesn't have enough of yet is the compute, the university pipeline, or the salaries to keep them home long enough to build at the scale this moment calls for.",
        "And here's where all of this actually touches daily life. AI is already doing real, measurable work in Nigeria right now. AI traffic pilots in Lagos and Abuja have cut peak-hour travel time by 20 percent. Agriculture advisory tools are pushing crop yields up 20 to 30 percent for farmers using them. Doctors are using AI to catch birth asphyxia earlier and read scans faster. None of that is hypothetical. It's happening.",
        "But all of it sits on foundations Nigeria doesn't control. If a foreign provider changes its pricing, cuts access, or shifts its policies, the traffic system, the farming tool, the diagnostic support can all disappear overnight, and no one in Nigeria gets a vote on that decision. Most of these tools are also still built mainly for English speakers, so for anyone working in Hausa, Yoruba or Igbo, a lot of that 20 to 30 percent gain was never really built with them in mind to begin with.",
        "So no, the adoption numbers aren't the story. The story is what happens to a country that's gotten very good, very fast, at using a technology it doesn't yet own a piece of.",
      ],
    },
  },
  {
    number: "003",
    week: "Week 3",
    url: "https://preview.mailerlite.io/emails/webview/2329743/195148145367189493",

    ticker: [
      "Nigeria's stock market just became the best performing exchange on Earth, up 67-68% this year",
      "Dangote's refinery IPO could be Africa's biggest ever, shares may list under \u20a6500",
      "Team Nigeria won 24 medals at the Commonwealth Games, its best finish in two decades",
      "Nearly 35 million Nigerians face acute hunger this lean season, the worst in a decade",
      "Nigeria now ranks 3rd in Africa for armed robbery as daylight crime spikes in traffic",
    ],

    datePublished: "2026-08-07",
    image: "/issues/issue-003-lagos.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Nigeria Is Quietly Having One of Its Best Years Internationally. Here's Why You Still Don't Feel It.",
      quote: "Lagos just became the best performing stock market on Earth, ahead of every exchange Bloomberg tracks. The naira's stronger, inflation's easing, foreign investors are back. None of that means your money goes further, and this issue is about the gap between the two.",
      body: [
        "The economy is stabilizing. Inflation is easing. The naira is stronger than it's been in years. The stock market is leading the world. Foreign investors are paying attention again.",
        "Yet groceries still cost a fortune. Salaries haven't magically caught up. For most Nigerians, life still feels just as hard.",
        "Both things are true, at the same time.",
        "Start with the market. Not London. Not New York. Not South Korea, which spent this year riding the global AI boom. Lagos.",
        "Bloomberg tracks 92 stock exchanges worldwide. By July, Nigeria's had quietly outperformed every single one, up 67 to 68 percent since January, ahead of South Korea's KOSPI, which is up 66 percent.",
        "So why now? Three things collided at once.",
        "First, banks got forced into it. The Central Bank ordered lenders to raise fresh capital, so the big banks went back to the stock market to raise it, and investors piled in behind them. Ecobank is up 127 percent this year. Jaiz Bank is up over 82 percent. Zenith is up nearly 78 percent.",
        "Second, the reforms are finally showing up in the numbers. The naira float, the subsidy removal, tighter coordination between fiscal and monetary policy, all of it was brutal in year one. Three years later, it's producing exactly what economists said it eventually would: a more stable macro picture that makes Nigerian companies look investable again.",
        "Third, and this is the part most headlines skip: it's mostly Nigerian money driving this, not foreign money. Pension funds repositioning after the bank recapitalisation, domestic institutions chasing yield now that fixed-income returns have dropped, that's the bulk of this rally. Foreign investors are trickling back in too, but they're not the main story yet.",
        "Which means this isn't blind optimism about Nigeria's future. It's specific and technical, moving mostly between banks, pension funds and big companies, a closed loop most ordinary Nigerians were never inside of to begin with.",
        "Outside that loop, here's what's actually happening. Nearly 35 million Nigerians are projected to face acute hunger this lean season, June to August, the worst level in a decade. About 3 million children under five are at risk of severe malnutrition this year alone.",
        "The danger has gotten more visible too. In Lagos, agbero extortion is trending again, not because it's new but because it's bolder, the latest round kicked off by a viral clip of area boys blocking a wedding convoy and damaging the car when the driver wouldn't pay. Armed robbery is following the same pattern: Nigeria now ranks 13th worldwide and 3rd in Africa on the 2026 global crime index, with police describing daylight robberies happening in traffic, in plain view, with no one stepping in.",
        "The government has a name for this moment. President Tinubu staked his presidency on Nigerians rewarding short-term pain with long-term gain, after removing the fuel subsidy and floating the naira in 2023. Three years on, the reform math is technically working, reserves are up, the naira's steadied, but most people still can't trace any of it to their kitchen table. Nigeria votes again on January 16, 2027, and every angle here collapses into one question at the ballot box: was the pain worth it?",
        "Inflation falling just means prices are rising slower, not that anything got cheaper. Wages haven't moved. So even as the headline numbers improve, most people's money still buys less than it did last year, the part that gets skipped when the good stats get quoted.",
        "So no, the rally on the NGX and the hunger numbers above aren't separate stories. They're one story about who a booming Nigeria is currently built for, and it isn't the average Nigerian yet. Whether that changes won't show up on a stock ticker. It'll show up in whether people's fare, food and patience all outlast the wait for the reward they keep being promised.",
      ],
    },
  },
  {
    number: "002",
    week: "Week 2",
    url: "https://preview.mailerlite.io/preview/2329743/emails/194515125398406841",

    ticker: [
      "US shuts routine visa processing in Abuja \u2014 Lagos is now the only office for 200M+ people",
      "F-1 student visas get a hard 4-year cap starting September 15",
      "Most Nigerian visas are now single-entry, valid for just 3 months",
      "Tyla's Lagos tour date quietly vanished amid boycott backlash",
      "Obi told Tinubu to retire. Oshiomhole fired right back",
    ],

    datePublished: "2026-07-30",
    image: "/issues/issue-002-trump.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "The US Is Quietly Locking Nigerians Out",
      quote: "Three separate US visa rule changes landed in the same few weeks, and none of them made one big scary headline alone. Read together, they tell you exactly where this is going.",
      body: [
        "Nobody announced a sweeping ban on Nigerians travelling to the US. There wasn't one dramatic headline or a single policy that changed everything overnight.",
        "Instead, it happened the bureaucratic way: three separate updates, released weeks apart, each sounding ordinary on its own. Read together, though, they tell a much bigger story about where US immigration policy toward Nigeria is heading.",
        "First: your embassy just got smaller. Starting August 1, the US stopped processing routine immigrant visas at its embassy in Abuja, alongside 24 other embassies across Africa. For Nigerians, that leaves Lagos as the country's only immigrant visa processing centre, one office serving more than 200 million people.",
        "This doesn't affect tourist or business visas, so a holiday or a conference trip is unaffected. The people feeling this are those applying to move permanently: family-sponsored immigrants, employment-based applicants, fiancé visas, adoption cases, and Diversity Visa winners.",
        "Imagine closing one of only two toll gates on a busy expressway. The destination hasn't changed. Everyone's just been forced into a single lane. Expect longer queues, slower appointments, and more waiting.",
        "Second: student visas now come with a clock. For decades, international students on F-1 visas could remain in the US for as long as they were making normal academic progress. That changes on September 15, when new students will receive a maximum four-year admission period, with just 30 days to enter before classes begin and another 30 days to leave once that period expires.",
        "For many students, four years is enough. For medical school, engineering, doctoral programmes, and other longer courses, it may not be. Those students will now have to apply for extra time during their studies, and approval isn't automatic. The visa no longer adapts to the education; the education now has to fit around the visa.",
        "A few smaller changes come with it: the grace period after graduation drops from 60 days to 30, and students generally won't be allowed to change schools or majors during their first year without qualifying for limited exceptions. Nigeria remains one of the largest sources of international students in the US, with more than 20,000 Nigerians enrolled during the 2023/24 academic year.",
        "Third: the visa is becoming single-use. This change actually arrived first. Since July 2025, most new US visas issued to Nigerians, including many student visas, have been valid for just three months and allow only one entry.",
        "Previously, students could travel home during holidays and return using the same visa while it remained valid. Now, once someone leaves the US, that visa has done its job. Coming back usually means applying for another one before being allowed to re-enter, even when returning to the same university. Older visas issued before July 2025 aren't affected. New ones are.",
        "None of these policies, on their own, completely shuts Nigerians out. Together, however, they make the process slower, more expensive, and far less flexible.",
        "Getting into the US now takes more planning. Staying there comes with stricter timelines. Even travelling home during studies may mean starting another visa application from scratch. For anyone considering studying or relocating to the US, applying early is no longer just good advice. It's becoming a necessity.",
        "This wasn't one headline-making policy. It was three bureaucratic changes that quietly reshaped the experience of moving to the United States, which is exactly why they're worth reading together. The story isn't any single rule. It's the direction they're all pointing.",
      ],
    },
  },
  {
    number: "001",
    week: "Week 1",
    url: "https://preview.mailerlite.io/preview/2329743/emails/193672596052510190",

    ticker: [
      "NYSC almost swapped khaki for Adire this week",
      "\u20a61.3B was quietly paid to an agency that \u201cdoesn\u2019t legally exist\u201d",
      "Inflation dipped to 15.91%, first drop in 3 months",
      "20 million kids never make it past primary school",
      "Nigeria takes on Meta, Google & X over stolen news content",
    ],

    datePublished: "2026-07-24",
    image: "/issues/issue-001-nysc.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Everyone argued about a uniform. They missed the real reform.",
      quote: "NYSC almost swapped khaki for Adire this week. Almost nobody noticed the actual reform hiding right behind it: the biggest shake-up to the scheme in 53 years.",
      body: [
        "NYSC's khaki uniform might soon become Adire, the tie-dye fabric our aunty wears to owambes. Earlier this month, the Minister of Youth Development, Ayodele Olawande, said it live on Channels Television's The Morning Brief, and Nigerian Twitter did what Nigerian Twitter does.",
        "\"It's Adire. Adire is being produced in Nigeria. We have them in Ogun, we have them in Kwara, we have textile industry. Let's put our money back into the country,\" he said.",
        "Some people loved it: local textile makers in states like Ogun and Kwara finally getting the spotlight. Others weren't having it. Why should a national uniform lean on a fabric tied to one region? Would corps members from elsewhere feel like an afterthought?",
        "By evening, Olawande walked it back a little. Adire and Ankara were just \"examples of proposals\" floated during consultations, not a done deal. \"No final decision has been taken on the fabric or design,\" he said. Khaki lives to see another day, for now.",
        "Here's the thing, though: the uniform was never really the story. It's one small piece of the biggest NYSC shake-up in 53 years, quietly approved by the Federal Executive Council days earlier, the result of a review committee that had been working since September 2025. Camp orientation goes from three weeks to six. The old Passing Out Parade becomes a graduation ceremony. A civilian now takes over day-to-day leadership, with the military still handling security.",
        "Buried in that same announcement is a change that matters more than any of it: corps members might finally start getting posted to organisations that actually match what they studied. Right now, NYSC can turn into a year of doing almost nothing related to your degree, just to tick a national box. A Computer Science graduate might spend their service year teaching Basic Science. An Agriculture graduate could end up filing paperwork at a desk. Someone with a Medical Laboratory Science degree might never set foot in a hospital.",
        "If postings actually matched qualifications, everyone wins: graduates get real experience, and organisations get skills they're already paying for. The catch, and there's always a catch, is that not every local government has a slot for every course of study, so matching almost 400,000 graduates a year to the right roles is less a policy win and more a massive logistics headache.",
      ],
    },
  },
];

// Homepage always reflects the newest issue.
export const CURRENT_ISSUE = ISSUES[0];

// Everything except the newest issue is "the archive."
export const ARCHIVE_ISSUES = ISSUES.slice(1);
