export const CASE3_ID = "2023-1204";

export const CASE3_INFO = {
  caseId: CASE3_ID,
  title: "THE HEADLINE TRAP",
  difficulty: "⭐⭐⭐ INTERMEDIATE",
  skill: "Read beyond the headline before forming an opinion.",
  xp: 200,
  badge: "📰 HEADLINE HUNTER",
  threatLevel: "🟠 MODERATE",
  reach: "6.2 MILLION USERS",
};

export const CASE3_INTRO = {
  title: "THE HEADLINE TRAP",
  text: [
    "You've proven that photographs can be misleading.",
    "But today...",
    "You won't even need a fake image.",
    "Sometimes the biggest lie is written in the very first sentence people read.",
    "And unfortunately...",
    "Most people never read beyond it.",
  ],
};

export const CASE3_MISSION = {
  priority: "HIGH",
  threatLevel: "🟠 MODERATE",
  reach: "6.2 MILLION USERS",

  description:
    "A headline claiming that the government has 'banned all schools indefinitely' is spreading rapidly across social media.",

  details: [
    "Parents are panicking.",
    "Students are celebrating.",
    "News channels are receiving thousands of calls.",
  ],

  objective:
    "Find out whether the headline tells the complete story.",
};

export const CASE3_POST = {
  platform: "SOCIAL MEDIA",
  label: "VIRAL SOCIAL MEDIA POST",

  headline:
    "GOVERNMENT BANS ALL SCHOOLS IN THE COUNTRY UNTIL FURTHER NOTICE!",

  body: [
    "Parents demand answers.",
    "Students celebrate unexpected holidays.",
    "Read More ↓",
  ],

  engagement: {
    likes: "198K Likes",
    shares: "412K Shares",
    comments: "93K Comments",
  },
};

export const CASE3_COMMENTS = [
  {
    name: "Riya S.",
    text: "Finally! No exams!",
  },
  {
    name: "Concerned Parent",
    text: "This is terrible. What will happen to our children?",
  },
  {
    name: "SchoolLife",
    text: "Why is nobody talking about this on TV?",
  },
  {
    name: "Student007",
    text: "Best news ever 😂",
  },
];

export const CASE3_MISSION_OBJECTIVE =
  "Investigate whether the headline accurately represents the article.";

export const CASE3_TOOLS = [
  {
    id: "article",
    title: "READ FULL ARTICLE",
    symbol: "▣",
    color: "#00bfff",
  },
  {
    id: "headline",
    title: "COMPARE HEADLINE",
    symbol: "◈",
    color: "#c9a227",
  },
  {
    id: "official",
    title: "OFFICIAL GOVERNMENT NOTICE",
    symbol: "◎",
    color: "#22c55e",
  },
  {
    id: "sources",
    title: "MULTIPLE NEWS SOURCES",
    symbol: "◫",
    color: "#9b59b6",
  },
  {
    id: "credibility",
    title: "PUBLICATION CREDIBILITY",
    symbol: "◉",
    color: "#e74c3c",
  },
];

export const CASE3_CLUES = {
  article: {
    title: "READ FULL ARTICLE",

    mentor:
      "Interesting... The article isn't about every school. It's about three.",

    content: (
      <div>
        <div className="case3-label">FULL ARTICLE</div>

        <h3 className="case3-article-headline">
          Government Bans All Schools
        </h3>

        <p>
          After a structural safety inspection found serious damage in one
          school building in{" "}
          <strong>Greenfield District</strong>, local authorities temporarily
          closed <strong>three schools</strong> for repairs over the next two
          weeks.
        </p>

        <div className="case3-warning">
          The article describes a temporary closure affecting three schools in
          one district — not a nationwide school ban.
        </div>
      </div>
    ),

    notebook: "Headline exaggerates the actual story.",
  },

  headline: {
    title: "COMPARE THE HEADLINE",

    mentor:
      "One missing detail completely changed the meaning. The headline removed important context.",

    content: (
      <div>
        <div className="case3-label">HEADLINE</div>

        <div className="case3-quote danger">
          GOVERNMENT BANS ALL SCHOOLS
        </div>

        <div className="case3-label">ACTUAL ARTICLE</div>

        <div className="case3-quote">
          Temporary closure of <strong>three schools</strong>.
        </div>

        <div className="case3-comparison">
          <div>
            <span>HEADLINE SUGGESTS</span>
            <strong>ALL SCHOOLS</strong>
          </div>

          <div>
            <span>ARTICLE STATES</span>
            <strong>THREE SCHOOLS</strong>
          </div>
        </div>
      </div>
    ),

    notebook: "Headline removed important context.",
  },

  official: {
    title: "OFFICIAL GOVERNMENT NOTICE",

    mentor:
      "Always compare important claims with official announcements.",

    content: (
      <div>
        <div className="case3-label">
          OFFICIAL EDUCATION DEPARTMENT
        </div>

        <div className="case3-official">
          <div className="case3-stamp">
            OFFICIAL STATEMENT
          </div>

          <p>
            Temporary closure applies only to schools undergoing safety
            inspections in <strong>Greenfield District</strong>.
          </p>
        </div>

        <div className="case3-warning">
          The official statement contradicts the nationwide claim made by the
          headline.
        </div>
      </div>
    ),

    notebook: "Official statement contradicts the headline.",
  },

  sources: {
    title: "COMPARE OTHER NEWS SOURCES",

    mentor:
      "When multiple trusted organizations report the same facts, confidence increases.",

    content: (
      <div>
        <div className="case3-label">
          INDEPENDENT REPORTING
        </div>

        <div className="case3-source-list">
          <div>
            <span>NEWS SOURCE 01</span>
            <strong>
              Three schools temporarily closed for repairs.
            </strong>
          </div>

          <div>
            <span>NEWS SOURCE 02</span>
            <strong>
              Greenfield District schools closed temporarily.
            </strong>
          </div>

          <div>
            <span>NEWS SOURCE 03</span>
            <strong>
              Safety inspections lead to temporary closures.
            </strong>
          </div>

          <div>
            <span>NEWS SOURCE 04</span>
            <strong>
              No nationwide school closure reported.
            </strong>
          </div>
        </div>

        <div className="case3-success">
          All independent reports agree on the core facts.
        </div>
      </div>
    ),

    notebook: "Independent reporting confirms the truth.",
  },

  credibility: {
    title: "PUBLICATION CREDIBILITY",

    mentor:
      "Clicks generate revenue. Sometimes attention becomes more important than accuracy.",

    content: (
      <div>
        <div className="case3-label">
          WEBSITE OBSERVATIONS
        </div>

        <div className="case3-credibility-list">
          <div>⚠ Pop-up ads appear every few seconds.</div>
          <div>⚠ Headlines frequently use SHOCKING.</div>
          <div>⚠ Headlines frequently use MUST READ.</div>
          <div>⚠ Headlines frequently use YOU WON'T BELIEVE.</div>
          <div>⚠ Headlines frequently use BREAKING.</div>
          <div>
            ⚠ Articles encourage readers to share before deletion.
          </div>
        </div>

        <div className="case3-warning">
          These are common clickbait techniques designed to attract attention
          and encourage sharing.
        </div>
      </div>
    ),

    notebook: "Website uses clickbait techniques.",
  },
};

export const CASE3_EVIDENCE = [
  "Headline exaggerated facts.",
  "Article tells a different story.",
  "Official notice disagrees with headline.",
  "Trusted news confirms only local closures.",
  "Website repeatedly uses sensational language.",
];

export const CASE3_FINAL_OPTIONS = [
  {
    id: "share",
    text: "Share the headline immediately.",
    correct: false,
  },
  {
    id: "verify",
    text:
      "Read the full article and verify the information before sharing.",
    correct: true,
  },
  {
    id: "popular",
    text:
      "Believe whichever headline has more shares.",
    correct: false,
  },
  {
    id: "ignore",
    text: "Ignore all news forever.",
    correct: false,
  },
];

export const CASE3_DEBRIEF = [
  "Excellent work, Detective.",
  "Today's mission teaches one of the oldest tricks on the internet...",
  "Clickbait.",
  "Many people never read the article.",
  "They react to the headline.",
  "Sometimes the article contains accurate information...",
  "But the headline exaggerates it to attract attention.",
  "A Digital Guardian never stops reading after the first sentence.",
];

export const CASE3_LEARNED = [
  "Read beyond the headline.",
  "Check whether the headline accurately reflects the article.",
  "Compare multiple trusted news sources.",
  "Look for official announcements.",
  "Be cautious of sensational words like SHOCKING, MUST READ, BREAKING, YOU WON'T BELIEVE, and SHARE BEFORE IT'S DELETED.",
];

export const CASE3_QUIZ = [
  {
    question: "What made the post misleading?",

    options: [
      "The article was fake.",
      "The headline exaggerated the actual event.",
      "The photographs were edited.",
      "The government website was unavailable.",
    ],

    answer: 1,
  },

  {
    question:
      "What's the best first step before sharing a news story?",

    options: [
      "Read only the headline.",
      "Read the full article and compare with trusted sources.",
      "Check how many likes it has.",
      "Read the comments.",
    ],

    answer: 1,
  },

  {
    question:
      "Which phrase is commonly associated with clickbait?",

    options: [
      "Official Press Release",
      "Annual Report",
      "You Won't Believe What Happened Next!",
      "Research Summary",
    ],

    answer: 2,
  },
];

export const CASE3_REWARD = {
  xp: 200,
  badge: "📰 HEADLINE HUNTER",
  progress: "42%",
};

export const CASE3_HEADQUARTERS = [
  "Three successful investigations.",
  "You've learned to question claims...",
  "Verify images...",
  "And read beyond headlines.",
  "This one worries me.",
  "Because...",
  "It never actually happened.",
  "Yet millions of people believe it did.",
];