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
    number: "005",
    week: "Week 5",
     url: "https://preview.mailerlite.io/preview/2329743/emails/196349741143950658",

    ticker: [
      "Nigeria produces 50 million tonnes of cement a year but uses less than 30 million and prices still went up",
      "A bag of cement jumped from \u20a69,300 in January to \u20a615,000 by July 2026",
      "Kenya imports its cement and still pays less per bag than Nigerians do",
      "The US national debt just crossed $40 trillion for the first time",
      "Osun's Adeleke won re-election with a bigger margin than his first win in 2022",
    ],

    datePublished: "2026-08-21",
    image: "/issues/issue-005-cement.jpg",
    featureStory: {
      kicker: "This week's headline",
      headline: "We Make Enough Cement to Export It. So Why Is a Bag Still \u20a613,000?",
      quote: "Nigeria produces way more cement than it uses. Neighbouring countries that import theirs still pay less. The FCCPC just finished a three-month investigation and found exactly what you'd expect. This issue is about what that means for anyone trying to build, rent, or just stay housed.",
      body: [
        "Between January and July this year, a 50kg bag of cement went from about \u20a69,300 to as much as \u20a615,000 in some places. The usual suspects got blamed: fuel subsidy removal, the dollar rate, diesel for haulage, inflation. All real. But this week, the Federal Competition and Consumer Protection Commission wrapped up a three-month investigation and found something else going on too.",
        "Nigeria isn't short of cement. We sit on massive limestone deposits across Kogi, Ogun, Edo, and Sokoto. Local factories can produce roughly 50 million tonnes a year and domestic demand rarely crosses 30 million. That's a serious surplus. And yet builders in neighbouring West African countries that import their cement often pay less per bag than Nigerians buying from a factory down the road.",
        "The numbers make it plain: \u20a613,000–15,000 a bag here in July 2026. \u20a69,300 in January. And Kenya, which imports cement, was paying the equivalent of about \u20a67,344 a bag.",
        "So what's happening? Three companies: Dangote, BUA, and Lafarge (now HBM Nigeria) control more than 90 percent of the market. When three players hold that much of anything, prices jump fast when input costs rise and barely move when things settle. While ordinary Nigerians were freezing their building projects, the top producers' annual reports were showing record revenue and healthy margins.",
        "And this isn't the first time someone tried to fix it. In February 2024, those same three companies informally agreed with the government to cap prices around \u20a67,000 to \u20a68,000 a bag. That agreement fell apart within months. Prices kept climbing anyway.",
        "Here's why it hits harder than just a building material going up in price. An entry-level salary or the national minimum wage sits between \u20a670,000 and \u20a6120,000 a month. A modest two-bedroom bungalow needs at least 200 bags of cement for the foundation and walls alone. At \u20a613,000 a bag, that's \u20a62.6 million on cement before you've bought sand, granite, iron rods, or paid a single mason.",
        "The bigger problem is that Nigeria has almost no mortgage system. Mortgages make up less than 1 percent of the economy here, compared to over 70 percent in places like the US. So most of us who want to own something don't borrow to build, we save cash and buy blocks little by little over years. When cement prices move like this, the money saved for 100 bags in January buys only 60 bags by July. The plan doesn't just slow down. It breaks.",
        "Add a housing shortage now estimated at close to 15 million homes, and owning property, the one thing that used to guarantee some financial security in old age is turning into something you can only dream about instead of actually plan for.",
        "Cement prices also feed directly into rent. New apartments get priced against today's cost of building, which is how basic flats in Lagos or Abuja end up demanding \u20a61.5 million to \u20a63 million upfront. And older flats aren't exempt either, 'cement and building costs' still gets pulled out as the reason for a rent hike at renewal, whether the excuse holds up or not.",
        "That's the loop: we can't afford to build, so we rent, and the same cement prices keeping us from owning become the excuse landlords use to raise what we pay for someone else's place.",
        "The FCCPC inquiry is the real test now. Can regulatory pressure actually force fair prices, or will three companies keep deciding whether our generation ever gets to own the roof over our heads?",
      ],
    },
  },
  {
    number: "004",
    week: "Week 4",
    url: "",

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
        "Nigeria just topped a global survey on AI chatbot use. Nine in ten adults here have used one, more than any other country Google and Ipsos measured. That's a wild stat. It's also only half the story.",
        "Because none of that usage runs on anything Nigeria owns. The servers are abroad. The models were built abroad. The bills come in dollars. We're the world's biggest users of a technology we have zero stake in.",
        "There's a real cost to that. Nigerian startups and banks spend an estimated $850 million every year just to store their own data on foreign servers. Over 90 percent of Nigeria's digital data lives somewhere in Europe or the US. That money leaves and doesn't come back.",
        "The pricing situation is its own headache. CBN rules mean most Nigerian cards can't pay international subscriptions directly, so people go through virtual dollar cards from apps like Grey or Chipper Cash. That same $20 AI tool that should cost around \u20a627,000 at the official rate ends up closer to \u20a632,000 through that route. Meanwhile, the one major AI company that actually bothered to price for Nigeria charges closer to \u20a614,900 for the same thing. Same tool. Same month. A \u20a617,000 gap depending on how you pay.",
        "Something is moving on the infrastructure side, though. Nigeria is putting $1 billion into building AI-ready data centers at home. Kasi Cloud is one of the first to come online. The Finance Minister said it plainly at the launch: we can't keep sending foreign exchange abroad for AI we could host ourselves. If it works, that $850 million starts staying in Nigeria instead.",
        "But data centers are just buildings. The harder question is whether Nigeria can build the actual AI, the models, not just the infrastructure underneath them.",
        "Honestly? The talent is already there. Lagos has over 120 active AI startups. A three-person Nigerian team called Decide ranked fourth globally on an AI benchmark, beating well-funded foreign competitors. Terra Industries in Abuja builds AI drones it now exports to eight African countries and Canada. Awarri built N-ATLAS, a language model that actually understands Yoruba, Hausa, Igbo and Nigerian-accented English, something most foreign labs never bothered with.",
        "The gap isn't the people. It's everything around them. Less than 5 percent of African AI talent has access to the computing power you need to build serious models. Only about a third of African universities even offer an AI programme. And the engineers Nigeria trains keep getting picked up by foreign companies paying in dollars, which makes it hard for local startups to hold onto them.",
        "AI is already doing real things here, by the way. Traffic pilots in Lagos and Abuja cut peak-hour travel time by 20 percent. Farming tools are pushing crop yields up 20 to 30 percent. Doctors are using it to catch complications earlier. That's not future talk, it's happening now.",
        "The problem is all of it runs on tools Nigeria doesn't control. If a foreign provider changes its pricing or cuts access, the traffic system, the farming app, the diagnostic tool can all go dark overnight. And most of these tools were built for English speakers first, so the gains for people working in Hausa, Yoruba or Igbo are smaller than the headline numbers suggest.",
        "Nigeria is very good at using AI. The next question is whether it ever gets to own any of it.",
      ],
    },
  },
  {
    number: "003",
    week: "Week 3",
    url: "https://preview.mailerlite.io/preview/2329743/emails/195123552432687080",

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
        "The numbers look good right now. Inflation is easing. The naira is steadier. Foreign investors are trickling back. And Nigeria's stock market just became the best performing exchange on Earth, Bloomberg tracks 92 of them, and Lagos topped the list, up 67 to 68 percent since January.",
        "But go to any market in Lagos and ask how people are feeling. The answer won't match those headlines.",
        "So what's actually going on?",
        "The stock market rally is real, but it's not random. Three things happened at once. The Central Bank told banks to raise fresh capital, so they went back to the stock market to do it, and investors followed. The naira float and subsidy removal, brutal as they were in 2023, are finally producing the stable macro picture economists said they would. And most of the money driving this rally is Nigerian, not foreign: pension funds, domestic institutions chasing yield. Foreign investors are coming back, but slowly.",
        "Which means this is a very specific kind of boom. It's moving between banks, pension funds and big companies. Ecobank up 127 percent. Zenith up nearly 78 percent. Jaiz Bank up over 82 percent. If you're not inside that loop, you're watching it from outside.",
        "And outside that loop, things are rough. Nearly 35 million Nigerians are facing acute hunger this lean season, the worst in a decade. About 3 million children under five are at risk of severe malnutrition this year alone.",
        "Street-level crime is getting bolder too. In Lagos, agbero extortion is back in the news after a viral clip of area boys blocking a wedding convoy and damaging the car when the driver refused to pay. Nigeria now ranks 3rd in Africa on the 2026 global crime index, with police reporting daylight robberies happening in traffic, in plain sight.",
        "Here's the thing about inflation 'easing': it just means prices are rising slower. Not that anything got cheaper. Salaries haven't moved. So even as the macro numbers improve, most people's money still buys less than it did last year.",
        "Tinubu bet his presidency on Nigerians accepting short-term pain for long-term gain. Three years on, the reform math is technically working. But most people still can't feel it at their kitchen table. Nigeria votes again on January 16, 2027, and that gap, between the stock ticker and the grocery bill, is the whole election.",
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
        "There was no big announcement. No single ban. Just three separate policy updates, dropped weeks apart, each one easy to miss on its own. Together, they tell you exactly where things are going.",
        "First: Abuja lost its visa office. From August 1, the US stopped processing immigrant visas at its Abuja embassy, one of 25 embassies across Africa where this happened. Lagos is now the only place in Nigeria handling those applications. One office. 200 million people.",
        "To be clear, this doesn't touch tourist or business visas. If you're going for a holiday or a work trip, nothing changes. The people affected are those trying to move permanently: family visas, employment-based applications, DV lottery winners, fiancé visas. Think of it like closing one of two toll gates on the Lagos-Ibadan expressway. Same destination, one lane. Queues get longer. Appointments get slower.",
        "Second: student visas now have a hard deadline. F-1 students used to be able to stay as long as they were making academic progress, no fixed end date. From September 15, new students get a maximum of four years, with 30 days to arrive before classes start and 30 days to leave after the period ends.",
        "Four years is fine for most undergrad programmes. It's tight for medicine, engineering, or a PhD. Students in longer courses will have to apply for extensions mid-study, and approval isn't guaranteed. The grace period after graduation also drops from 60 days to 30. Nigeria sends over 20,000 students to the US every year, this affects all of them going forward.",
        "Third: the visa itself is now single-use. This one actually came first, quietly, in July 2025. Most new US visas issued to Nigerians are now valid for just three months and allow one entry. Once you leave the US, that visa is done. Coming back, even to the same university, means applying for a new one from scratch. Visas issued before July 2025 are fine. New ones aren't.",
        "None of these changes alone is a ban. But together they make the whole process slower, more expensive, and a lot less forgiving. If you're planning to study or move to the US, start earlier than you think you need to. That's not just advice anymore, it's the new reality.",
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
        "But the uniform was never really the story. It's one small piece of the biggest NYSC shake-up in 53 years, quietly approved by the Federal Executive Council the same week. Camp orientation doubles from three weeks to six. The Passing Out Parade becomes a graduation ceremony. A civilian takes over day-to-day leadership, with the military still handling security.",
        "The change that actually matters though: corps members might finally get posted to places that match what they studied. Right now NYSC can mean a whole year doing nothing related to your degree. A Computer Science grad teaching Basic Science. An Agriculture grad filing paperwork. A Medical Lab Science grad who never sees the inside of a hospital.",
        "If postings matched qualifications, everyone wins: graduates get real experience, organisations get skills they're already paying for. The catch, and there's always one, is that not every local government has a slot for every course. Matching 400,000 graduates a year to the right roles is less a policy win and more a massive logistics problem. But at least someone's finally trying.",
      ],
    },
  },
];

// Homepage always reflects the newest issue.
export const CURRENT_ISSUE = ISSUES[0];

// Everything except the newest issue is "the archive."
export const ARCHIVE_ISSUES = ISSUES.slice(1);
