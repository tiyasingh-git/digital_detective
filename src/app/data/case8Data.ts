/* =========================================================
   CASE 8 DATA
   THE INVISIBLE BUBBLE
========================================================= */

export const CASE8_ID = "2024-1608";

export const CASE8_INFO = {
  caseId: CASE8_ID,
  title: "THE INVISIBLE BUBBLE",
  difficulty: "⭐⭐⭐⭐⭐⭐",
  difficultyLabel: "EXPERT",
  skill:
    "How algorithms, confirmation bias, and echo chambers shape what we believe online.",
  xpReward: 450,
  badge: "🫧 Perspective Seeker",
  priority: "🟠 HIGH",
  threatLevel: "GROWING",
  estimatedReach: "ENTIRE PLATFORM",
};


/* =========================================================
   TRANSITION
========================================================= */

export const CASE8_TRANSITION = {
  title: "CASE FILE 008",
  location:
    "Digital Guardians Headquarters – Intelligence Analysis Room",

  lines: [
    "For the first time...",
    "The room is completely silent.",
    "No alarms.",
    "No breaking news.",
    "No emergency alerts.",
    "Just hundreds of social media posts floating across giant holographic screens.",
  ],

  mira: [
    "Detective...",
    "Tell me what you see.",
  ],

  observation: [
    "You examine the feed.",
    "Every post agrees with each other.",
    "Every comment supports the same opinion.",
    "Every recommended video repeats the same message.",
    "Everything feels... strangely identical.",
  ],

  leo: [
    "Leo scrolls further.",
    "Nothing changes.",
    "The same opinions.",
    "The same headlines.",
    "The same videos.",
  ],

  reveal: [
    "Another investigator logs into a different account.",
    "Their feed is completely different.",
    "Same topic.",
    "Opposite opinions.",
    "Completely different recommendations.",
  ],

  miraConclusion: [
    "Neither person searched for misinformation.",
    "Yet both believe they're seeing the complete truth.",
    "Today's enemy isn't a fake post.",
    "It's a world where you stop seeing anything different.",
  ],
};


/* =========================================================
   MISSION BRIEFING
========================================================= */

export const CASE8_MISSION = {
  operationName: "THE INVISIBLE BUBBLE",
  priority: "🟠 High",
  threatLevel: "Growing",
  estimatedReach: "Entire Platform",

  briefing: [
    "Citizens are becoming increasingly divided over a proposed city project.",
    "Nobody is checking facts anymore.",
    "Everyone believes they're completely right.",
    "The strange part?",
    "Each group is only seeing information that supports its own beliefs.",
  ],
};


/* =========================================================
   INVESTIGATION TOOLS
========================================================= */

export const CASE8_TOOLS = [
  {
    id: "recommendation-timeline",
    name: "Recommendation Timeline",
    description:
      "Compare the content recommended to different users.",
  },

  {
    id: "search-history",
    name: "Search History",
    description:
      "Inspect previous searches that may influence recommendations.",
  },

  {
    id: "watch-history",
    name: "Watch History",
    description:
      "Review videos previously watched by the users.",
  },

  {
    id: "algorithm-viewer",
    name: "Platform Algorithm Viewer",
    description:
      "Inspect the factors influencing recommendations.",
  },

  {
    id: "fact-comparison",
    name: "Fact Comparison Tool",
    description:
      "Compare information from different perspectives.",
  },
];


/* =========================================================
   EVIDENCE 1
========================================================= */

export const CASE8_EVIDENCE_1 = {
  id: "case8-feed-comparison",
  title: "USER FEED COMPARISON",

  userA: {
    label: "USER A",
    posts: [
      "Project Will Save Thousands of Jobs",
      "Experts Strongly Support Development",
      "Five Reasons Critics Are Wrong",
      "Citizens Celebrate New Project",
    ],
  },

  userB: {
    label: "USER B",
    posts: [
      "Project Will Destroy Wildlife",
      "Experts Warn of Environmental Disaster",
      "Citizens Protest New Project",
      "Development Must Be Stopped",
    ],
  },

  mira: [
    "Both users believe they're seeing the full picture.",
  ],
};


/* =========================================================
   COMMUNITY COMMENTS
========================================================= */

export const CASE8_COMMENTS = [
  {
    user: "User A",
    comment:
      "Everyone knows this project is amazing.",
  },

  {
    user: "User B",
    comment:
      "Anyone supporting this clearly hasn't done research.",
  },

  {
    user: "User A",
    comment:
      "People who disagree are just spreading fear.",
  },

  {
    user: "User B",
    comment:
      "They're all brainwashed.",
  },
];


/* =========================================================
   EVIDENCE 2
   WATCH HISTORY
========================================================= */

export const CASE8_WATCH_HISTORY = {
  userA: {
    title: "USER A WATCH HISTORY",
    items: [
      "10 videos supporting the project.",
      "Ignored opposing viewpoints.",
    ],
  },

  userB: {
    title: "USER B WATCH HISTORY",
    items: [
      "12 videos criticizing the project.",
      "Skipped supporting arguments.",
    ],
  },

  finding:
    "Previous behavior influences recommendations.",
};


/* =========================================================
   EVIDENCE 3
   SEARCH HISTORY
========================================================= */

export const CASE8_SEARCH_HISTORY = {
  userA: {
    searches: [
      "Benefits of Development",
    ],
  },

  userB: {
    searches: [
      "Dangers of Development",
    ],
  },

  finding:
    "Search behavior reinforces existing interests.",
};


/* =========================================================
   EVIDENCE 4
   RECOMMENDATION ENGINE
========================================================= */

export const CASE8_ALGORITHM = {
  title: "RECOMMENDATION ENGINE",

  factors: [
    "Similarity",
    "Watch Time",
    "Engagement",
    "Previous Likes",
    "Previous Shares",
  ],

  leo: [
    "The algorithm isn't deciding what's true.",
    "It's deciding what you'll probably click.",
  ],

  finding:
    "Recommendations prioritize engagement—not accuracy.",
};


/* =========================================================
   EVIDENCE 5
   MISSING INFORMATION
========================================================= */

export const CASE8_MISSING_INFORMATION = {
  title: "MISSING INFORMATION",

  observation: [
    "Several balanced reports never appeared for either user.",
    "The two feeds showed mostly opposing extremes.",
  ],

  mira: [
    "The truth often lives between two extremes.",
  ],

  finding:
    "Balanced perspectives are missing.",
};


/* =========================================================
   EVIDENCE 6
   CONFIRMATION BIAS TEST
========================================================= */

export const CASE8_CONFIRMATION_BIAS = {
  title: "CONFIRMATION BIAS TEST",

  instruction:
    "The player receives four headlines and chooses which one to open.",

  observation:
    "The player naturally clicks the headline matching their previous choices.",

  leo: [
    "Caught you.",
  ],

  realization:
    "Humans naturally prefer information confirming what they already believe.",

  finding:
    "Confirmation bias reinforces existing beliefs.",
};


/* =========================================================
   NOTEBOOK FINDINGS
========================================================= */

export const CASE8_FINDINGS = [
  {
    id: "algorithm-personalization",
    text:
      "Recommendation algorithms personalize content.",
  },

  {
    id: "search-influence",
    text:
      "Search history shapes future recommendations.",
  },

  {
    id: "engagement-choice",
    text:
      "Users engage mostly with information they already agree with.",
  },

  {
    id: "missing-perspectives",
    text:
      "Balanced viewpoints become less visible.",
  },

  {
    id: "confirmation-bias",
    text:
      "Confirmation bias reinforces existing beliefs.",
  },
];


/* =========================================================
   FINAL DECISION
========================================================= */

export const CASE8_FINAL_DECISION = {
  question:
    "What is the biggest problem?",

  options: [
    {
      id: "fake-news",
      text:
        "The platform is intentionally creating fake news.",
      correct: false,
    },

    {
      id: "one-opinion",
      text:
        "The internet should only show one opinion.",
      correct: false,
    },

    {
      id: "echo-chamber",
      text:
        "Algorithms and our own choices can create echo chambers where we mostly see information we already agree with.",
      correct: true,
    },

    {
      id: "every-recommendation",
      text:
        "Every recommendation online is false.",
      correct: false,
    },
  ],

  correctAnswer: "echo-chamber",
};


/* =========================================================
   MISSION DEBRIEF
========================================================= */

export const CASE8_DEBRIEF = {
  mira: [
    "Technology didn't force these people into separate worlds.",
    "It simply kept giving them more of what they already liked.",
    "And slowly...",
    "Curiosity disappeared.",
    "Questions disappeared.",
    "Different opinions disappeared.",
    "The strongest Digital Guardians don't only verify information.",
    "They deliberately seek perspectives they haven't considered.",
  ],
};


/* =========================================================
   WHAT YOU LEARNED
========================================================= */

export const CASE8_LEARNINGS = [
  "Read information from multiple trustworthy sources.",
  "Don't rely on one platform alone.",
  "Challenge your own assumptions.",
  "Understand that recommendation algorithms prioritize engagement.",
  "Be willing to explore viewpoints different from your own before forming conclusions.",
];


/* =========================================================
   QUICK QUIZ
========================================================= */

export const CASE8_QUIZ = [
  {
    id: "q1",
    question:
      "What is an echo chamber?",

    options: [
      "A room with loud sounds.",
      "An online environment where people mostly encounter information that reinforces their existing beliefs.",
      "A fake news website.",
      "A messaging app.",
    ],

    correctAnswer: 1,
  },

  {
    id: "q2",
    question:
      "Why do algorithms often recommend similar content?",

    options: [
      "Because they predict what users are most likely to engage with.",
      "Because all information is identical.",
      "Because they know the truth.",
      "To confuse users.",
    ],

    correctAnswer: 0,
  },

  {
    id: "q3",
    question:
      "Which habit helps reduce confirmation bias?",

    options: [
      "Reading only sources you agree with.",
      "Exploring multiple credible perspectives before reaching a conclusion.",
      "Ignoring expert opinions.",
      "Sharing every trending post.",
    ],

    correctAnswer: 1,
  },
];


/* =========================================================
   REWARDS
========================================================= */

export const CASE8_REWARDS = {
  xp: 450,
  badge: "🫧 Perspective Seeker",
  levelProgress: "96%",
};


/* =========================================================
   HEADQUARTERS CONCLUSION
========================================================= */

export const CASE8_CONCLUSION = {
  lines: [
    "The social media feeds slowly disappear.",
    "The room becomes quiet again.",
  ],

  mira: [
    "You've become more than an investigator.",
    "You've become someone who asks better questions.",
  ],

  leo: [
    "Commander...",
    "These aren't separate incidents anymore.",
    "They're happening all at once.",
  ],

  alerts: [
    "Fake health advice",
    "AI-generated images",
    "Deepfake videos",
    "Scam websites",
    "Manipulated statistics",
    "Viral rumors",
    "Clickbait headlines",
  ],

  globalAlert:
    "⚠ GLOBAL DIGITAL ALERT ⚠",

  alertMessage:
    "Multiple coordinated misinformation campaigns detected.",

  finalLines: [
    "Every lesson.",
    "Every investigation.",
    "Every skill.",
    "You'll need all of them.",
    "Detective...",
    "Your final mission has begun.",
  ],
};