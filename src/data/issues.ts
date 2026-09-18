/* ============================================================
  ISSUES: the only file to touch when a new edition goes out.

   Add the new issue as a new object at the TOP of this array
   (index 0). Everything else updates automatically:
     - the homepage always shows ISSUES[0] as "this week"
     - theoffscript.page/latest always redirects to ISSUES[0].url
     - theoffscript.page/archive lists every issue, newest first

  SEARCH VISIBILITY: two fields matter a lot here:
     - datePublished: the real calendar date the issue went out
       (e.g. "2026-07-25"). Used for the dateline shown on the
       page and for the article's schema markup. Leave it out
      and the page just won't show a date or article schema:
       nothing breaks, it just won't be search-eligible yet.
     - featureStory.body: the FULL text of the week's headline
       story, as an array of paragraphs. This is what actually
       gets indexed and makes the story findable when someone
       searches that topic. Without it, the page falls back to
       just the short teaser + the embedded email, same as
       before.
   ============================================================ */

export type ArticleSource = {
  publication: string;
  title: string;
  url: string;
  /** ISO publication date, e.g. "2026-09-02". Omit when unavailable. */
  date?: string;
};

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
    /** Reporting trail shown below the article when sources are available. */
    sources?: ArticleSource[];
  };
};

export const ISSUES: Issue[] = [
  {
    number: "007",
    week: "Week 7",
    url: "https://preview.mailerlite.io/preview/2329743/emails/197511448216208722",

    ticker: [
      "Uber shut down in Nigeria on September 2 after twelve years in the country",
      "Drivers can move to Bolt or inDrive with their existing Moove-financed cars",
      "Lagos riders now have one fewer major app competing on fares and wait times",
      "inDrive lets riders negotiate fares and pays drivers directly",
      "Late November to early January could bring longer waits and fewer cheap rides",
    ],

    datePublished: "2026-09-04",
    image: "/issues/issue-007-uber.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Uber Just Left Nigeria.",
      quote: "Uber left Nigeria after twelve years, giving riders barely a day's notice. The cars will mostly stay on the road, but one fewer app competing for your ride could mean higher fares, longer waits, and fewer cheap options.",
      body: [
        "Uber shut down in Nigeria on September 2 after twelve years in the country, giving riders barely a day's notice. The company called it a review of its business priorities and did not name a single cause. But the exit lands in a difficult market: cars are expensive to import, petrol costs keep rising, and many drivers say too little is left after Uber takes its cut.",
        "So yes, Uber is gone. But its drivers and cars do not disappear with the app.",
        "Moove, which financed many of those cars, has cleared drivers to switch to Bolt or inDrive. A large share of the vehicles can stay on the road, just under a different app.",
        "The real loss is choice. With one fewer app competing for your ride, especially during rush hour, there is less pressure to keep fares low or wait times short. inDrive may benefit most. Riders can negotiate fares, while drivers receive payment directly, a setup that gives drivers more control over price.",
        "The timing makes this more noticeable. Late November to early January already brings heavier traffic, packed airports, and expensive late-night trips. This year, riders will compare prices across fewer major apps. If demand grows faster than Uber's drivers move elsewhere, expect longer waits and fewer cheap options.",
        "Quick context: surge pricing kicks in when more people want rides than there are drivers available. The app raises fares to attract more drivers, which is why the worst time to be stranded is often the most expensive time to book.",
        "Nigeria is not an isolated exit. Uber left Côte d'Ivoire in September 2025 and Tanzania in January 2026. Across these markets, thin profits, unstable currencies, and high running costs make ride-hailing difficult to sustain.",
        "That creates an opening for local services such as LagRide, Rida, and Rovv. But inheriting Uber's users is the easy part. These companies still have to offer enough cars, fair prices, and reliable service when Lagos gets busiest.",
        "For riders, the practical move is simple: keep more than one app installed, compare before you book, and expect the December rush to test how much competition is really left. Uber may have left Nigeria, but the cost of getting around has not gone anywhere.",
      ],
      sources: [
        {
          publication: "Reuters",
          title: "Uber to exit Nigeria after 12 years of operations",
          url: "https://www.marketscreener.com/news/uber-to-exit-nigeria-after-12-years-of-operations-ce7858d3d88bf222",
          date: "2026-09-02",
        },
        {
          publication: "Premium Times",
          title: "Uber exits Nigeria after 12 years of operation",
          url: "https://www.premiumtimesng.com/business/business-news/907029-uber-exits-nigeria-after-12-years-of-operation.html",
          date: "2026-09-02",
        },
        {
          publication: "TechNext",
          title: "Following Uber Nigeria's exit, Moove permits drivers to operate on Bolt and inDrive",
          url: "https://technext24.com/news/uber-exit-moove-drivers-on-bolt-and-indrive/",
          date: "2026-09-03",
        },
        {
          publication: "inDrive",
          title: "About inDrive",
          url: "https://company.indrive.com/",
        },
        {
          publication: "The Washington Post",
          title: "Uber stops operating in Nigeria and Uganda, surprising drivers and riders",
          url: "https://www.washingtonpost.com/world/2026/09/03/uber-stops-operating-nigeria-uganda-surprising-drivers-riders/",
          date: "2026-09-03",
        },
      ],
    },
  },
  {
    number: "006",
    week: "Week 6",
    url: "https://preview.mailerlite.io/preview/2329743/emails/197033568954746022",

    ticker: [
      "NELFUND received more than 1.6M loan applications and disbursed over ₦322bn",
      "The Federal Government approved more than ₦550bn for the National Hospital and a new cancer institute",
      "6,516 primary healthcare centres across Nigeria are currently non-functional",
      "A ₦297bn road project is under construction between Ibadan and Ijebu-Ode",
      "ASUU cleared 20 state universities to move toward strike over an unimplemented agreement",
    ],

    datePublished: "2026-08-28",
    image: "/issues/issue-006-money.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Nigeria Just Found Billions for Schools, Hospitals, and Roads. So Why Are 6,516 Clinics Still Not Working?",
      quote: "Nigeria announced billions for student loans, hospitals, cancer care, and roads this week. The approvals and announced figures are real, but an announcement and delivery are two different events, sometimes years apart.",
      body: [
        "This week, Nigeria put a lot of big numbers on the record. Billions redirected to student loans. Billions approved for hospitals. Billions more for a cancer institute. It's the kind of week that makes a great screenshot, gets forwarded to three WhatsApp groups, and feels like progress.",
        "Here's the part the screenshot leaves out: announcing money and that money reaching you are two different events, sometimes years apart. Nigeria has funded things loudly and delivered them quietly, or not at all, before. This week showed both sides of that pattern within seven days.",
        "President Tinubu has directed liquid, legally cleared funds recovered by the EFCC, along with unclaimed dividends in the Capital Market Trust Fund and money in the Dormant Accounts Trust Fund, into NELFUND. That could become a new funding stream, though some of it still depends on legal processes. As of August 8, NELFUND had received more than 1.6 million applications and disbursed over ₦322 billion.",
        "Worth remembering before you celebrate too hard: it's a loan. Every naira NELFUND pays out for you gets repaid later, on NELFUND's terms. More funding means more people can borrow their way through school. It does not mean school will get any cheaper.",
        "In the same week, the Federal Executive Council approved more than ₦550 billion for healthcare infrastructure: ₦255.66 billion for an upgrade of the National Hospital, Abuja, and ₦302.3 billion for a new National Institute for Cancer Research and Treatment, due for completion in 36 months.",
        "Now put that beside this: according to the National Primary Health Care Development Agency, 6,516 primary healthcare centres across Nigeria are currently non-functional. These are the small local clinics meant to be your first stop for malaria, childbirth, or a bad fever. A non-functional clinic may have too few staff, no drugs, broken equipment, or some mix of the three.",
        "This is not just neglect; it has a paper trail. The Basic Health Care Provision Fund exists to help keep facilities like these running, and more than 8,300 primary healthcare centres currently receive quarterly support through its NPHCDA gateway. But funding does not fail for one neat reason: counterpart funding, eligibility rules, weak reporting, and delays in accounting for earlier funds have all limited access. The gap between Nigeria's 31,000-plus primary healthcare centres and the facilities receiving this support is real, but it cannot all be blamed on states simply refusing to draw down money.",
        "A flagship cancer institute in Abuja is a big deal, but it will not help the person in a rural ward whose nearest clinic has no one on duty today. Nigeria is investing heavily at one end of healthcare while the other end keeps quietly switching off.",
        "The same tension is showing up in education. While NELFUND was getting a bigger war chest, ASUU cleared 20 state universities to move toward a strike over the unimplemented 2025 FGN-ASUU agreement. The deal, signed last December, promised lecturers a 40% salary increase and better pensions after 16 years of on-and-off negotiation. Ambrose Alli University in Edo did not wait: its lecturers began an indefinite strike on August 25 after a 14-day ultimatum over unpaid arrears expired.",
        "Loan approvals going up while lecture halls go quiet is the same contradiction as the cancer institute and the empty clinic, just in a different uniform. More money to help you afford school. Less certainty that the school you're borrowing for will actually be in session.",
        "The road story is the cleanest version of the pattern because it has a visible finish line. Construction is now underway on the 56.5-kilometre Ibadan-Ijebu-Ode road, a ₦297 billion project connecting Oyo and Ogun states, and it is scheduled to open in mid-2029. If it lands, traders, farmers, and daily commuters on that route will save real time and money. If it slips, as Nigerian road timelines often do, it becomes another announcement waiting for its delivery date.",
        "None of these four stories is a lie. The approvals and announced figures are real. What's unproven is the part that decides whether any of this changes your week: does the loan arrive before your fees are due, does your clinic get a nurse before you get sick, does your lecturer get paid before your semester ends, and does the road open before 2029 quietly becomes 2031?",
        "Every one of these numbers sounds like it's for you. Whether it actually reaches you depends on delivery, not the announcement. Watch what opens, what stays staffed, and what stays open, not what gets a ribbon-cutting. Start with Tracka, BudgIT's citizen project tracker at tracka.ng: search the road, the hospital, or a project in your own state, and check the status it has actually logged, not just what the press release claims.",
      ],
      sources: [
        {
          publication: "The Guardian Nigeria",
          title: "NELFUND: Student loan disbursement hits N322bn",
          url: "https://guardian.ng/education/nelfund-student-loan-disbursement-hits-n322b/",
          date: "2026-08-08",
        },
        {
          publication: "Voice of Nigeria",
          title: "NELFUND hails President Tinubu's support for student loan scheme",
          url: "https://von.gov.ng/nelfund-hails-president-tinubus-support-for-student-loan-scheme/",
          date: "2026-08-20",
        },
        {
          publication: "National Primary Health Care Development Agency",
          title: "Basic Health Care Provision Fund",
          url: "https://nphcda.gov.ng/bhcpf/",
        },
        {
          publication: "Punch",
          title: "Despite billions spent, over 6,500 PHCs still non-functional",
          url: "https://punchng.com/despite-billions-spent-over-6500-phcs-still-non-functional/",
          date: "2026-08-03",
        },
        {
          publication: "The Guardian Nigeria",
          title: "How Nigeria is turning the tide on medical tourism",
          url: "https://guardian.ng/issue/how-nigeria-is-turning-the-tide-on-medical-tourism/",
          date: "2026-08-29",
        },
        {
          publication: "Vanguard",
          title: "ASUU orders 20 varsities to prepare for strike, gives FG, states 14-day ultimatum",
          url: "https://www.vanguardngr.com/2026/08/asuu-orders-20-varsities-to-prepare-for-strike-gives-fg-states-14-day-ultimatum/",
          date: "2026-08-11",
        },
        {
          publication: "Federal Ministry of Works",
          title: "Federal Government flags off Ibadan-Ijebu-Ode road dualisation",
          url: "https://fmino.gov.ng/no-more-temporary-fixes-says-umahi-as-fg-flags-off-ibadan-ijebu-ode-dualisation-minister-moves-to-benin-ekiti-to-tackle-critical-roads/",
          date: "2026-08-25",
        },
      ],
    },
  },
  {
    number: "005",
    week: "Week 5",
     url: "https://preview.mailerlite.io/preview/2329743/emails/196349741143950658",

    ticker: [
      "Nigeria has capacity to produce more than 60 million tonnes of cement a year, uses roughly 25 to 30 million, and prices still went up",
      "A bag of cement jumped from \u20a69,300 in January to \u20a615,000 by July 2026",
      "A bag of cement was still priced lower in Nairobi than in much of Nigeria",
      "The US national debt just crossed $40 trillion for the first time",
      "Osun's Adeleke won re-election with a bigger margin than his first win in 2022",
    ],

    datePublished: "2026-08-21",
    image: "/issues/issue-005-cement.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "We Make Enough Cement to Export It. So Why Is a Bag Still \u20a613,000?",
      quote: "Nigeria has far more installed cement capacity than it uses. Cement was still selling for less in several other African markets. The FCCPC's three-month study found grounds to keep investigating possible price manipulation. This issue is about what that means for anyone trying to build, rent, or just stay housed.",
      body: [
        "Between January and July this year, a 50kg bag of cement went from about \u20a69,300 to as much as \u20a615,000 in some places. The usual suspects got blamed: fuel subsidy removal, the dollar rate, diesel for haulage, inflation. All real. But this week, the Federal Competition and Consumer Protection Commission published preliminary findings from a three-month study and opened a formal investigation into whether something else was going on too.",
        "Nigeria isn't short of cement capacity. We sit on massive limestone deposits across Kogi, Ogun, Edo, and Sokoto. Local factories have installed capacity of roughly 60 to 65 million tonnes a year, while domestic demand sits around 25 to 30 million. That's a serious gap. And yet the FCCPC found cement selling for less in several other African markets.",
        "The numbers make it plain: \u20a613,000–15,000 a bag here in July 2026. \u20a69,300 in January. And the FCCPC's Nairobi comparison put a bag at the equivalent of about \u20a67,344.",
        "So what's happening? Three companies: Dangote, BUA, and Lafarge (now HBM Nigeria) account for more than 90 percent of installed production capacity. That concentration gives them enormous influence over supply, while the FCCPC is still testing whether prices reflect legitimate costs or anticompetitive conduct. While ordinary Nigerians were freezing their building projects, the top producers' financial statements were showing rising revenue and strong profits.",
        "And this isn't the first time someone tried to fix it. In February 2024, those same three companies informally agreed with the government to cap prices around \u20a67,000 to \u20a68,000 a bag. That agreement fell apart within months. Prices kept climbing anyway.",
        "Here's why it hits harder than just a building material going up in price. An entry-level salary or the national minimum wage sits between \u20a670,000 and \u20a6120,000 a month. A modest two-bedroom build can take hundreds of bags of cement. At \u20a613,000 a bag, even 200 bags would cost \u20a62.6 million before you've bought sand, granite, iron rods, or paid a single mason.",
        "The bigger problem is that Nigeria has almost no mortgage system. Mortgages make up less than 1 percent of the economy here, compared to over 70 percent in places like the US. So most of us who want to own something don't borrow to build, we save cash and buy blocks little by little over years. When cement prices move like this, the money saved for 100 bags in January buys only 60 bags by July. The plan doesn't just slow down. It breaks.",
        "Add a housing shortage now estimated at close to 15 million homes, and owning property, the one thing that used to guarantee some financial security in old age is turning into something you can only dream about instead of actually plan for.",
        "Cement prices also feed directly into rent. New apartments get priced against today's cost of building, which is how basic flats in Lagos or Abuja end up demanding \u20a61.5 million to \u20a63 million upfront. And older flats aren't exempt either, 'cement and building costs' still gets pulled out as the reason for a rent hike at renewal, whether the excuse holds up or not.",
        "That's the loop: we can't afford to build, so we rent, and the same cement prices keeping us from owning become the excuse landlords use to raise what we pay for someone else's place.",
        "The FCCPC investigation is the real test now. Can regulatory pressure actually force fair prices, or will three companies keep deciding whether our generation ever gets to own the roof over our heads?",
      ],
      sources: [
        {
          publication: "Federal Competition and Consumer Protection Commission",
          title: "Cement: FCCPC establishes possible price manipulation",
          url: "https://fccpc.gov.ng/cement-fccpc-establishes-possible-price-manipulation/",
          date: "2026-08-18",
        },
        {
          publication: "Federal Ministry of Works",
          title: "Federal Government and cement manufacturers agree on a price range of ₦7,000 to ₦8,000",
          url: "https://www.fmw.gov.ng/readall/title_show_echo_01zz/1?page=133",
          date: "2024-02-20",
        },
        {
          publication: "Federal Ministry of Housing and Urban Development",
          title: "Nigeria's housing deficit estimated at 15 million units",
          url: "https://fmino.gov.ng/fgs-technical-committee-releases-new-housing-data-pegs-deficit-at-15-million-units/",
          date: "2026-01-26",
        },
        {
          publication: "Central Bank of Nigeria",
          title: "Addressing housing deficit in Nigeria: Issues, challenges and prospects",
          url: "https://www.cbn.gov.ng/out/2020/rsd/efr%20vol%2057%20no%204%20december%202019%20addressing%20housing%20deficit%20in%20nigeria%20issues%2C%20challenges%20and%20prospects%20ajayi.pdf",
        },
        {
          publication: "BUA Cement",
          title: "Unaudited financial statements for the six months ended 30 June 2026",
          url: "https://doclib.ngxgroup.com/Financial_NewsDocs/47529_BUA_CEMENT_PLC-_QUARTER_2_-_FINANCIAL_STATEMENT_FOR_2026_FINANCIAL_STATEMENTS_JULY_2026.pdf",
        },
        {
          publication: "Dangote Cement",
          title: "Unaudited results for the six months ended 30 June 2026",
          url: "https://doclib.ngxgroup.com/Financial_NewsDocs/47629_DANGOTE_CEMENT_PLC-H1_2026_EARNINGS_RELEASE_CORPORATE_ACTIONS_JULY_2026.pdf",
          date: "2026-07-29",
        },
      ],
    },
  },
  {
    number: "004",
    week: "Week 4",
    url: "",

    ticker: [
      "Nigeria recorded the highest AI chatbot use among the 21 countries in a Google-Ipsos survey, at 88%",
      "Nigerian companies pay an estimated $850 million a year to host data on foreign servers",
      "Private operators have announced hundreds of millions of dollars in AI-ready data centres in Nigeria",
      "Air Peace and United Nigeria Airlines got grounded this week after unions picketed over \u20a615 billion in unremitted ticket sales charges",
      "Geregu Power defaulted on a \u20a640.09 billion bond after profit fell 88% in the first half of 2026",
    ],

    datePublished: "2026-08-14",
    image: "/issues/issue-004-ai-apps.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Nigeria Doesn't Have an AI Problem. It Has an Ownership Problem.",
      quote: "Nearly nine in ten Nigerian respondents in a Google-Ipsos survey said they use AI chatbots, the highest rate among the 21 countries surveyed. Much of that use runs on models and cloud infrastructure owned outside Nigeria. This issue is about the gap between adoption and ownership.",
      body: [
        "Nigeria just topped a global survey on AI chatbot use. In Google and Ipsos's online survey, 88 percent of Nigerian respondents said they had used one, the highest rate among the 21 countries measured. That's a wild stat. It's also only half the story.",
        "Because much of that usage relies on infrastructure Nigeria does not own. Many servers are abroad. The biggest models were built abroad. Many bills come in dollars. We are among the world's heaviest users of a technology in which Nigeria still holds a relatively small ownership stake.",
        "There's a real cost to that. Nigerian companies spend an estimated $850 million every year to host data on foreign servers. Much of Nigeria's cloud workload is hosted in Europe, the US, and South Africa. A lot of that money leaves and doesn't come back.",
        "Paying for those tools is its own headache. Some Nigerian bank cards still struggle with international subscriptions, pushing users toward dollar cards that add exchange-rate spreads and fees. Local-currency billing can make the same service easier to pay for and budget around, but it is still the exception rather than the rule.",
        "Something is moving on the infrastructure side, though. Private operators have announced hundreds of millions of dollars in AI-ready data centres in Nigeria. Kasi Cloud is one of the first to come online. The Finance Minister said it plainly at the launch: we can't keep sending foreign exchange abroad for AI we could host ourselves. If it works, more of that $850 million could stay in Nigeria instead.",
        "But data centers are just buildings. The harder question is whether Nigeria can build the actual AI, the models, not just the infrastructure underneath them.",
        "Honestly? The talent is already there. Nigeria has an active AI startup scene. A three-person Nigerian team called Decide ranked fourth globally on an AI benchmark, beating well-funded foreign competitors. Terra Industries in Abuja builds AI drones it now exports to eight African countries and Canada. Awarri built N-ATLAS, a language model that actually understands Yoruba, Hausa, Igbo and Nigerian-accented English, something most foreign labs never bothered with.",
        "The gap isn't the people. It's everything around them. A UNDP analysis of Zindi's 11,000-member network found that only 5 percent of African AI talent had access to enough computing power. And the engineers Nigeria trains keep getting picked up by foreign companies paying in dollars, which makes it hard for local startups to hold onto them.",
        "AI tools are already being tested in traffic management, farming, and healthcare. That's not just future talk, but the results vary and the evidence is still emerging.",
        "The problem is that much of it still runs on tools Nigeria doesn't control. If a foreign provider changes its pricing or cuts access, local services built on top can become more expensive or stop working. And most of these tools were built for English speakers first, so the gains for people working in Hausa, Yoruba or Igbo are smaller than the headline numbers suggest.",
        "Nigeria is very good at using AI. The next question is whether it gets to own much more of it.",
      ],
      sources: [
        {
          publication: "Ipsos",
          title: "Google-Ipsos multi-country AI survey 2026",
          url: "https://www.ipsos.com/en-us/google-ipsos-multi-country-ai-survey-2026",
          date: "2026-01-15",
        },
        {
          publication: "The Guardian Nigeria",
          title: "Middle East crisis exposes costly weakness in Nigeria's cloud economy",
          url: "https://guardian.ng/technology/meast-crisis-exposes-costly-weakness-in-nigerias-cloud-economy/",
          date: "2026-04-08",
        },
        {
          publication: "Federal Ministry of Communications, Innovation and Digital Economy",
          title: "Federal Government unveils National Digital Cloud Policy",
          url: "https://fmcide.gov.ng/federal-government-unveils-national-digital-cloud-policy-to-drive-investment-digital-sovereignty-and-government-transformation/",
          date: "2026-08-17",
        },
        {
          publication: "National Centre for Artificial Intelligence and Robotics",
          title: "National AI Strategy at two years: Ecosystem impact report",
          url: "https://ncair.nitda.gov.ng/wp-content/uploads/2026/04/29042026-NAIS-%40-2-Years-Impact-Story-Ecosystem-Compilation-copy.pdf",
          date: "2026-04-29",
        },
        {
          publication: "United Nations Development Programme",
          title: "Only five percent of Africa's AI talent has the compute power it needs",
          url: "https://www.undp.org/digital/blog/only-five-percent-africas-ai-talent-has-compute-power-it-needs",
        },
        {
          publication: "Awarri",
          title: "N-ATLAS model card",
          url: "https://huggingface.co/seun-ajayi/n-atlas-llm/blob/main/README.md",
        },
        {
          publication: "BusinessDay",
          title: "CBN reforms begin reaching consumers as banks expand dollar card spending limits",
          url: "https://businessday.ng/news/article/cbn-reforms-begin-reaching-consumers-as-banks-expand-dollar-card-spending-limits/",
          date: "2026-08-07",
        },
      ],
    },
  },
  {
    number: "003",
    week: "Week 3",
    url: "https://preview.mailerlite.io/preview/2329743/emails/195123552432687080",

    ticker: [
      "Nigeria's stock market became the best performer among 92 exchanges tracked by Bloomberg, up 67-68% this year",
      "Dangote's refinery IPO could be Africa's biggest ever, shares may list under \u20a6500",
      "Team Nigeria won 24 medals at the Commonwealth Games, its best finish in two decades",
      "Nearly 35 million Nigerians face acute hunger this lean season, the worst in a decade",
      "Nigeria ranks third in Africa on Numbeo's crowd-sourced 2026 Crime Index",
    ],

    datePublished: "2026-08-07",
    image: "/issues/issue-003-lagos.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "Nigeria Is Quietly Having One of Its Best Years Internationally. Here's Why You Still Don't Feel It.",
      quote: "Lagos just became the best performing stock market among the 92 exchanges Bloomberg tracks. The naira's stronger, inflation's easing, foreign investors are back. None of that means your money goes further, and this issue is about the gap between the two.",
      body: [
        "The numbers look good right now. Inflation is easing. The naira is steadier. Foreign investors are trickling back. And Nigeria's stock market just became the best performer among the 92 exchanges Bloomberg tracks, up 67 to 68 percent since January.",
        "But go to any market in Lagos and ask how people are feeling. The answer won't match those headlines.",
        "So what's actually going on?",
        "The stock market rally is real, but it's not random. Three things happened at once. The Central Bank told banks to raise fresh capital, so they went back to the stock market to do it, and investors followed. Supporters of the reforms argue that the naira float and subsidy removal, brutal as they were in 2023, are finally contributing to the steadier macro picture they promised. And most of the money driving this rally is Nigerian, not foreign: pension funds, domestic institutions chasing yield. Foreign investors are coming back, but slowly.",
        "Which means this is a very specific kind of boom. It's moving between banks, pension funds and big companies. Ecobank up 127 percent. Zenith up nearly 78 percent. Jaiz Bank up over 82 percent. If you're not inside that loop, you're watching it from outside.",
        "And outside that loop, things are rough. Nearly 35 million Nigerians are facing acute hunger this lean season, the worst in a decade. About 3 million children under five are at risk of severe malnutrition this year alone.",
        "Street-level crime is getting bolder too. In Lagos, agbero extortion is back in the news after a viral clip of area boys blocking a wedding convoy and damaging the car when the driver refused to pay. Nigeria ranked third in Africa on Numbeo's crowd-sourced 2026 Crime Index. That is a perception-based measure, not police crime data.",
        "Here's the thing about inflation 'easing': it just means prices are rising slower. Not that anything got cheaper. Salaries haven't moved. So even as the macro numbers improve, most people's money still buys less than it did last year.",
        "Tinubu bet his presidency on Nigerians accepting short-term pain for long-term gain. Three years on, some headline indicators are improving. But most people still can't feel it at their kitchen table. Nigeria votes again on January 16, 2027, and that gap, between the stock ticker and the grocery bill, is the whole election.",
      ],
      sources: [
        {
          publication: "BusinessDay",
          title: "The world's best-performing stock market is in Lagos. Now comes the harder part",
          url: "https://businessday.ng/opinion/article/the-worlds-best-performing-stock-market-is-in-lagos-now-comes-the-harder-part/",
          date: "2026-08-07",
        },
        {
          publication: "World Food Programme",
          title: "Nigeria country brief",
          url: "https://www.wfp.org/countries/nigeria",
        },
        {
          publication: "United Nations Nigeria",
          title: "United Nations Nigeria newsletter",
          url: "https://nigeria.un.org/en/download/202852/310780",
        },
        {
          publication: "Numbeo",
          title: "Crime Index by Country 2026: Africa",
          url: "https://www.numbeo.com/crime/rankings_by_country.jsp?region=002&title=2026",
        },
        {
          publication: "Independent National Electoral Commission",
          title: "Presidential and National Assembly elections for January 2027",
          url: "https://inecnigeria.org/press/presidential-national-assembly-elections-jan-2027-presidential",
        },
        {
          publication: "Nairametrics",
          title: "Nigerian equities market adds N11.11 trillion in July as banking stocks power recovery",
          url: "https://nairametrics.com/2026/08/01/nigerian-equities-market-adds-n11-11-trillion-in-july-as-banking-stocks-power-recovery/",
          date: "2026-08-01",
        },
      ],
    },
  },
  {
    number: "002",
    week: "Week 2",
    url: "https://preview.mailerlite.io/preview/2329743/emails/194515125398406841",

    ticker: [
      "US shuts routine visa processing in Abuja; Lagos is now the designated hub for Nigeria",
      "A four-year cap on F-1 student status was due September 15 before a court postponed it",
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
        "There was no big announcement. No single ban. Just three separate policy updates, dropped weeks apart, each one easy to miss on its own. Together, they tell you exactly where things are going.",
        "First: Abuja lost routine visa services. From August 1, the US stopped processing routine visas at its Abuja embassy, one of 25 embassies across Africa affected by a wider realignment. Lagos became Nigeria's designated hub for those services. One office. More than 200 million people.",
        "To be clear, this affects routine tourist and business visas too, along with student, work, family, employment-based, DV, fiancé and other cases. The change is about where applications are processed, not whether a visa category still exists. Think of it like closing one of two toll gates on the Lagos-Ibadan expressway. Same destination, one lane. Queues get longer. Appointments get slower.",
        "Second: student visas were due to get a hard deadline. F-1 students used to be able to stay as long as they were making academic progress, no fixed end date. A final rule scheduled for September 15 would have given new students a maximum of four years, with 30 days to arrive before classes start and 30 days to leave after the period ends.",
        "Four years is fine for most undergrad programmes. It's tight for medicine, engineering, or a PhD. Students in longer courses would have had to apply for extensions mid-study, and approval was not guaranteed. The grace period after graduation would also have dropped from 60 days to 30. More than 21,000 Nigerian students were enrolled in US colleges and universities in 2024/25. But on September 14, a federal court postponed the rule while a legal challenge continues.",
        "Third: the visa itself is now single-use. This one actually came first, quietly, in July 2025. Most new US visas issued to Nigerians are now valid for just three months and allow one entry. Once you leave the US, that visa is done. Coming back, even to the same university, means applying for a new one from scratch. Visas issued before July 8, 2025 are fine. New ones aren't.",
        "None of these changes alone is a ban. But together they make the whole process slower, more expensive, and a lot less forgiving. If you're planning to study or move to the US, start earlier than you think you need to. That's not just advice anymore, it's the new reality.",
      ],
      sources: [
        {
          publication: "US Department of State",
          title: "Realignment of US visa services in Africa to regional hubs",
          url: "https://travel.state.gov/content/travel/en/News/visas-news/realignment-of-us-visa-services-in-africa-to-regional-hubs.html",
          date: "2026-07-30",
        },
        {
          publication: "US Department of Homeland Security",
          title: "Establishing a fixed time period of admission and an extension of stay procedure for nonimmigrant academic students",
          url: "https://www.govinfo.gov/content/pkg/FR-2026-07-17/pdf/2026-14439.pdf",
          date: "2026-07-17",
        },
        {
          publication: "Brown University",
          title: "DHS final rule postponed",
          url: "https://isss.brown.edu/news/2026-09-14/dhs-final-rule-postponed",
          date: "2026-09-14",
        },
        {
          publication: "US Department of State",
          title: "Visa reciprocity and civil documents by country: Nigeria",
          url: "https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Nigeria.html",
        },
        {
          publication: "Nigeria Ministry of Foreign Affairs",
          title: "Press release on revised US visa reciprocity schedule for Nigerian citizens",
          url: "https://foreignaffairs.gov.ng/news/wp-content/uploads/2025/07/US-Visa.pdf",
          date: "2025-07-09",
        },
        {
          publication: "Open Doors",
          title: "Nigeria: International student data 2025",
          url: "https://opendoorsdata.org/wp-content/uploads/2025/11/OpenDoors_Country_Fact-Sheet_Nigeria-2025.pdf",
        },
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
        "NYSC's khaki uniform might soon become Adire, the tie-dye fabric our aunty wears to owambes. The Minister of Youth Development, Ayodele Olawande, said it live on Channels TV's The Morning Brief, and Nigerian Twitter did what Nigerian Twitter does.",
        "\"It's Adire. Adire is being produced in Nigeria. We have them in Ogun, we have them in Kwara, we have textile industry. Let's put our money back into the country,\" he said.",
        "Some people loved it. Local textile makers in Ogun and Kwara finally getting a national moment. Others weren't having it: why should a national uniform lean on a fabric tied to one region? By evening, Olawande walked it back. Adire and Ankara were just examples floated during consultations, not a done deal. Khaki lives to see another day, for now.",
        "But the uniform was never really the story. It's one small piece of the biggest NYSC shake-up in 53 years, quietly approved by the Federal Executive Council the same week. Under the approved plan, camp orientation would double from three weeks to six. The Passing Out Parade would become a graduation ceremony. A civilian would take over day-to-day leadership, with the military still handling security.",
        "The change that actually matters though: corps members might finally get posted to places that match what they studied. Right now NYSC can mean a whole year doing nothing related to your degree. A Computer Science grad teaching Basic Science. An Agriculture grad filing paperwork. A Medical Lab Science grad who never sees the inside of a hospital.",
        "If postings matched qualifications, everyone wins: graduates get real experience, organisations get skills they're already paying for. The catch, and there's always one, is that not every local government has a slot for every course. Matching 400,000 graduates a year to the right roles is less a policy win and more a massive logistics problem. But at least someone's finally trying.",
      ],
      sources: [
        {
          publication: "TheCable",
          title: "FEC approves six-week orientation, new uniform in sweeping NYSC reforms",
          url: "https://www.thecable.ng/fec-approves-six-weeks-orientation-new-uniform-in-sweeping-nysc-reforms/",
          date: "2026-06-29",
        },
        {
          publication: "TheCable",
          title: "Adire was only an example: Minister backtracks on new NYSC uniform proposal",
          url: "https://www.thecable.ng/adire-was-only-an-example-minister-backtracks-on-new-nysc-uniform-proposal/",
          date: "2026-07-02",
        },
        {
          publication: "National Youth Service Corps",
          title: "The service year",
          url: "https://platforms.nysc.gov.ng/serviceyear.html",
        },
        {
          publication: "Punch",
          title: "FEC cancels NYSC passing-out parade, extends orientation to six weeks",
          url: "https://punchng.com/fec-cancels-nysc-passing-out-parade-extends-orientation-to-six-weeks/",
          date: "2026-06-30",
        },
        {
          publication: "Federal Ministry of Youth Development",
          title: "Federal Executive Council approves comprehensive NYSC reform",
          url: "https://fmyd.gov.ng/2026/06/29/the-federal-executive-council-fec-has-today-approved-the-comprehensive-reform-of-the-national-youth-service-corps-nysc-marking-the-first-holistic-review-of-the-scheme-in-its-53-year-history/",
          date: "2026-06-29",
        },
      ],
    },
  },
];

// Homepage always reflects the newest issue.
export const CURRENT_ISSUE = ISSUES[0];

// Everything except the newest issue is "the archive."
export const ARCHIVE_ISSUES = ISSUES.slice(1);
