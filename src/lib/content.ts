export const HERO = {
  label: "Productize Yourself with AI",
  headline: ["Productize", "Yourself", "with AI"],
  subheading:
    "Turn who you are into what you do, and build your dream business and life with AI as your co\u2011founder",
  button: "Apply now",
  small: "Ten questions, a few minutes, and your 50% is locked in",
} as const;

export const STATS = [
  { num: "800+", label: "People through AI Powered events, programmes and masterclasses" },
  { num: "1,500+", label: "Hours of training in productizing yourself and in Claude, now merged" },
  { num: "10 years", label: "As a product manager at some of the biggest companies in the world" },
] as const;

export type PhaseState = "open" | "next" | "locked";

export const JOURNEY = {
  label: "The journey",
  heading: "Six phases that take you from who you are to a business that scales",
  phases: [
    {
      n: "01",
      name: "Person",
      sub: "Identity and IP",
      state: "open",
      activities: ["Identity excavation", "Your IP map", "Ideal client profile", "Future self design"],
    },
    {
      n: "02",
      name: "Proof",
      sub: "Market validation",
      state: "open",
      activities: ["Competitor matrix", "Market intelligence brief"],
    },
    { n: "03", name: "Promise", sub: "Your signature offer", state: "next", activities: [] },
    { n: "04", name: "Profile", sub: "Content and visibility", state: "locked", activities: [] },
    { n: "05", name: "Pipeline", sub: "Client acquisition", state: "locked", activities: [] },
    { n: "06", name: "Partner", sub: "Scale and partnerships", state: "locked", activities: [] },
  ] as { n: string; name: string; sub: string; state: PhaseState; activities: string[] }[],
  small: "The full journey opens to early-bird applicants first",
};

export const WORKSPACE = {
  label: "Powered by pistachio",
  heading: "The workspace is the programme",
  body: "Every phase, live session, prompt and reflection lives in one place, built on Pistachio, the learning platform I designed for doing rather than watching.",
  tiles: [
    { key: "journey", title: "A path that unlocks as you go", line: "Each phase opens when you're ready for it, so you always know the next step" },
    { key: "sessions", title: "Live with Ross", line: "Join live, add it to your calendar, and catch the recording if you miss it" },
    { key: "library", title: "A library that keeps growing", line: "Over 500 tested prompts and the skills I use in my own business" },
    { key: "reflections", title: "Reflections I read", line: "Every activity ends with a reflection, and I reply to them" },
  ],
} as const;

export const LIVE = {
  label: "Live sessions",
  heading: "You build it with me in the room",
  body: "We work through every phase together in live sessions, and each one is saved in your workspace so you never fall behind.",
  points: ["Live sessions with Ross", "Recordings saved in your workspace", "A community doing the same work"],
} as const;

export const NAVAL = {
  leadIn: "If you had to sum up success in two words",
  quote: "Productize yourself.",
  attribution: "Naval Ravikant",
  support: "Productize has specific knowledge and leverage. Yourself has uniqueness and accountability.",
} as const;

export const WHO = {
  label: "Who this is for",
  heading: "For coaches, consultants and experts ready for the business to reflect how good they are",
  list: [
    "You're earning under $10k a month from what you know and want your first steady months",
    "People already come to you for advice, but how you help has no name, method or price",
    "You can feel AI changing your industry and you'd rather use it to scale yourself",
    "You want to build real things as you go and leave every session holding something",
  ],
  upgrade: {
    before: "Already past $10k a month with a proven offer? ",
    link: "Upgrade",
    after: " is where you belong",
    href: "https://joinupgrade.co",
  },
} as const;

export const BONUSES = {
  label: "Early-bird offer",
  heading: "Early-bird perks for everyone who applies before 31 December",
  cards: [
    { name: "Your Claude setup, done with you", body: "A live session where we get your AI Co-Founder installed and briefed together" },
    { name: "Your offer, reviewed by me", body: "Once your first offer is built, I'll review it personally" },
    { name: "My own assets to adapt", body: "The ScoreCard and lead magnet I use in my own business" },
    { name: "Bonus deep dives", body: "Extra sessions on paid media, video sales letters and launches" },
  ],
} as const;

export const LETTER = {
  label: "A personal note",
  heading: "This is my favourite programme I've ever built",
  paragraphs: [
    "I've spent ten years as a product manager, in startups and in some of the biggest companies in the world. Then I ran two Productize Yourself programmes, iterated the method in the room, and ran five Claude programmes, with a sixth underway. Eighteen months and more than 1,500 hours of teaching both. This is the merger of those two paths, with Claude as your AI co-founder.",
    "The idea starts with Naval Ravikant, and with Dan Koe, Alex Hormozi, Daniel Priestley and Tom Noske along the way. I built it for the version of me who left corporate with plenty of expertise and no idea how to turn it into a business. If that sounds like you, I'd love you to be one of the first through the door.",
  ],
  signOff: "Ross",
  small: "The thinkers named here inspired the programme and aren't affiliated with it",
} as const;

export const FAQ = [
  {
    q: "What does productize yourself mean?",
    a: "Productize yourself is Naval Ravikant's two-word summary of how to build wealth: find what you're uniquely good at, then apply as much leverage as possible. Productize has specific knowledge and leverage. Yourself has uniqueness and accountability. Productize Yourself with AI, also spelt productise, is the programme that turns that idea into six phases you work through with Claude, from who you are to a named offer, a content engine and a client pipeline.",
  },
  {
    q: "Where is Productize Yourself inspired from?",
    a: "The phrase is Naval's. The method also draws on Dan Koe, Alex Hormozi, Daniel Priestley and Tom Noske. None of them are affiliated with the programme. What I added is the doing: two Productize Yourself programmes already run, five Claude programmes completed with a sixth underway, and more than 1,500 hours across 18 months of teaching both, now merged into one path with Claude as your AI co-founder, on top of ten years in product, startups and corporate teams.",
  },
  {
    q: "How did you build this?",
    a: "I ran two Productize Yourself programmes, then iterated the method in the room. In parallel I ran five Claude programmes, and I'm on the sixth now. That's 18 months and over 1,500 hours of training people in productizing themselves and in Claude. This 2027 programme is the merger of those two bodies of work, plus ten years as a product manager across startups and some of the biggest companies in the world. It lives in Pistachio, the learning platform I co-founded.",
  },
  {
    q: "How is this different from a productized service course?",
    a: "A productized service course packages one service into a fixed offer. Productize Yourself with AI starts earlier, with who you are and the IP you already have, then builds your signature offer, content and client pipeline around it, with live sessions and Claude as your AI co-founder.",
  },
  {
    q: "Who runs Productize Yourself?",
    a: "Ross Power, founder of AI Powered, after ten years as a product manager. More than 800 people have been through AI Powered events, programmes and masterclasses. The programme runs on Pistachio and is powered by Claude.",
  },
  {
    q: "When does it open?",
    a: "The 2027 programme. Applicants hear first, before anyone else, along with the early-bird offer.",
  },
  {
    q: "How much will it cost?",
    a: "The full price goes to applicants first, and everyone who applies before 31 December 2026 gets 50% off it when the programme goes live.",
  },
  {
    q: "Do I need to be technical?",
    a: "You don't need to be technical at all, because the setup walks you through every install and setting step by step, and from then on you're mostly having a conversation.",
  },
  {
    q: "Which tools will I need?",
    a: "Your own Claude subscription with the desktop app, plus Google Drive for desktop or OneDrive, and everything else is included.",
  },
  {
    q: "What if I'm already earning more than $10k a month?",
    a: "Then you're probably ready for Upgrade, the community for established founders, and you can join that waitlist instead.",
  },
] as const;

export const FINAL = {
  label: "Apply for an early-bird place",
  headline: "Productize Yourself with AI",
  subheading:
    "If you've been waiting for the moment to turn what you know into something that works without you, 2027 is it.",
  small: "No spam, and you can leave whenever you like",
  closer:
    "Go do your thing. It'll all make sense eventually, and this time you'll have a system to show for it.",
  thanks:
    "Your application is in and your 50% early-bird offer is locked in. Keep an eye on your inbox and WhatsApp, because the first thing I'll send you is how to get Claude ready so you're ahead before we even begin.",
  upgrade:
    "From what you've shared, Upgrade might be an even better fit, and you can join that waitlist too.",
} as const;

export const REVENUE_OPTIONS = [
  "Just starting out",
  "Under $5k",
  "$5k to $10k",
  "Over $10k",
] as const;

export const OFFER = {
  deadline: "31 December 2026",
  chip: "Apply before 31 December for 50% off",
  headline: "Apply before 31 December and you get",
  body: "Everyone who applies before 31 December 2026 locks in half price on Productize Yourself when it opens, along with the early-bird perks below.",
  perks: [
    "50% off the programme when it goes live",
    "Your Claude setup, done with me in a live session",
    "Your first offer, reviewed by me personally",
    "My own ScoreCard and lead magnet to adapt",
  ],
} as const;

export type Question =
  | { key: string; type: "single"; label: string; options: readonly string[]; optional?: boolean }
  | { key: string; type: "multi"; label: string; hint?: string; options: readonly string[]; optional?: boolean }
  | {
      key: string;
      type: "rating" | "scale";
      label: string;
      min: number;
      max: number;
      low: string;
      high: string;
      optional?: boolean;
    }
  | { key: string; type: "text"; label: string; placeholder: string; optional?: boolean };

export const APPLICATION = {
  label: "Apply for an early-bird place",
  button: "Apply now",
  steps: [
    { title: "About you", intro: "So I know who you are and how to reach you" },
    { title: "Where you are now", intro: "There are no wrong answers, this just helps me shape the programme around you" },
    { title: "Finding clients", intro: "Tell me what's worked, what hasn't and what's in the way" },
    { title: "Where you're going", intro: "Last few, then you're in" },
  ],
  questions: [
    [
      {
        key: "py_work_status",
        type: "single",
        label: "Which best describes your work right now?",
        options: [
          "Employed full time",
          "Employed and building something on the side",
          "Freelancing or consulting",
          "Running my own business",
          "Between roles or taking a break",
        ],
      },
      {
        key: "py_business_stage",
        type: "single",
        label: "Where's your business today?",
        options: [
          "I don't have one yet, but I want to start",
          "I've started, but it isn't consistent yet",
          "I have a business with regular clients",
          "I have an established business I want to scale",
        ],
      },
      {
        key: "py_monthly_revenue",
        type: "single",
        label: "Roughly what do you earn from your expertise each month?",
        options: REVENUE_OPTIONS,
      },
      {
        key: "py_expertise",
        type: "text",
        label: "What do people already come to you for help with?",
        placeholder: "For example, untangling messy operations for small agencies",
      },
    ],
    [
      {
        key: "py_lead_gen_tried",
        type: "multi",
        label: "Which of these have you tried to find clients?",
        hint: "Choose as many as you like",
        options: [
          "Referrals and word of mouth",
          "Posting on LinkedIn",
          "Instagram or TikTok",
          "An email newsletter",
          "Paid ads",
          "Networking and events",
          "Cold outreach",
          "Podcasts or speaking",
          "Nothing yet",
        ],
      },
      {
        key: "py_lead_gen_confidence",
        type: "rating",
        label: "How confident are you that you could find your next client this month?",
        min: 1,
        max: 5,
        low: "Not at all",
        high: "Completely",
      },
      {
        key: "py_lead_gen_challenge",
        type: "text",
        label: "What's the biggest thing getting in the way of finding clients?",
        placeholder: "Be as honest as you like",
        optional: true,
      },
    ],
    [
      {
        key: "py_ai_comfort",
        type: "scale",
        label: "How comfortable are you using AI tools like Claude today?",
        min: 1,
        max: 10,
        low: "Never touched it",
        high: "I use it every day",
      },
      {
        key: "py_weekly_time",
        type: "single",
        label: "How much time could you give this each week?",
        options: ["Under 2 hours", "2 to 4 hours", "4 to 6 hours", "More than 6 hours"],
      },
      {
        key: "py_goal_12m",
        type: "text",
        label: "If 2027 goes brilliantly, what does your business look like in 12 months?",
        placeholder: "The clients, the offer, the life around it",
        optional: true,
      },
    ],
  ] as Question[][],
  channels: ["Email", "WhatsApp", "Phone call"],
  consent:
    "I'm happy for Ross Power and AI Powered to contact me about Productize Yourself using the options I've ticked, and I understand I can unsubscribe at any time",
} as const;
