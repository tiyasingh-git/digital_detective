export const CASE6_ID = "2024-1502";

export const CASE6_INFO = {
  caseId: CASE6_ID,
  operationName: "The Twisted Numbers",
  title: "THE TWISTED NUMBERS",
  difficulty: "⭐⭐⭐⭐⭐",
  skill: "Statistics, Graphs & Data Manipulation",
  xpReward: 350,
  badge: "📊 Data Detective",
  priority: "🟠 High",
  threatLevel: "Moderate",
  estimatedReach: "8.4 Million Views",
};

export const CASE6_INTRO = {
  transition: {
    title: "Transition from Case 5",
    paragraphs: [
      "The investigation room is quiet.",
      "Huge holographic screens display colorful charts, graphs, and statistics floating in the air.",
      "Analyst Leo adjusts one of the graphs.",
      "Commander Mira walks in carrying a printed newspaper.",
    ],
    newspaperHeadline: "CRIME HAS DOUBLED IN JUST ONE YEAR!",
    miraObservation: [
      "Tell me, Detective...",
      "What do you notice?",
      "It looks convincing.",
      "But the data never changed.",
    ],
    finalMessage: [
      "Today...",
      "You'll discover that numbers don't always tell the truth.",
      "Sometimes...",
      "People tell lies using numbers.",
    ],
  },

  notification: "🔔 CASE FILE 006 RECEIVED",

  briefing: [
    "A post claiming that crime has doubled in Brookhaven City has gone viral.",
    "Citizens are panicking.",
    "Parents are refusing to let their children go outside.",
    "Businesses are closing early.",
    "Local elections are only a week away.",
    "Your mission...",
    "Determine whether the graph tells the whole story.",
  ],
};

export const CASE6_POST = {
  label: "Viral Social Media Post",

  headline: "🚨 CRIME HAS DOUBLED!",

  body: `"Brookhaven is no longer safe."`,

  graph: {
    year2024: 10,
    year2025: 20,
    visual2024: "█",
    visual2025: "██████████",
  },

  caption: "The government is hiding the truth!",

  engagement: {
    likes: "483K Likes",
    shares: "1.1 Million Shares",
    comments: "210K Comments",
  },

  comments: [
    {
      username: "Raj",
      text: "This city is becoming dangerous.",
    },
    {
      username: "Sophia",
      text: "I knew things were getting worse.",
    },
    {
      username: "Daniel",
      text: "Look at the graph! The difference is huge!",
    },
    {
      username: "Maya",
      text: "I'm moving somewhere else.",
    },
  ],
};

export const CASE6_TOOLS = [
  {
    id: "dataset",
    title: "Original Dataset",
  },
  {
    id: "graph",
    title: "Graph Editor",
  },
  {
    id: "government",
    title: "Government Crime Report",
  },
  {
    id: "factcheck",
    title: "Fact Check Archive",
  },
  {
    id: "calculator",
    title: "Percentage Calculator",
  },
];

export const CASE6_CLUES = {
  dataset: {
    title: "Government Crime Report",
    content: [
      "2024",
      "10 reported incidents",
      "",
      "2025",
      "20 reported incidents",
    ],
    notebook: "Crime increased from 10 to 20.",
    mira: [
      "Interesting...",
      "The numbers did increase.",
      "But is the graph honest?",
    ],
  },

  graph: {
    title: "Graph Inspection",
    content: [
      "The Y-axis starts at 9 instead of 0.",
      "Because of this...",
      "10 appears tiny.",
      "20 appears enormous.",
    ],
    leo: [
      "Changing where a graph begins can completely change how people feel about the data.",
    ],
    notebook: "Graph uses a truncated Y-axis.",
  },

  government: {
    title: "Population Data",
    content: [
      "Brookhaven Population",
      "",
      "2024",
      "1,200 people",
      "",
      "2025",
      "2,600 people",
      "",
      "Crime per 1,000 residents:",
      "2024 → 8.3",
      "2025 → 7.7",
    ],
    mira: [
      "The total number increased...",
      "But the crime rate per person actually decreased.",
    ],
    notebook: "Context changes the conclusion.",
  },

  factcheck: {
    title: "Fact Check Archive",
    content: [
      "Independent fact-checkers conclude:",
      "",
      "The graph uses real numbers.",
      "However...",
      "It removes important context.",
      "It exaggerates the visual difference.",
    ],
    notebook: "Data is technically real but presented misleadingly.",
  },

  calculator: {
    title: "Graph Editor",
    content: [
      "Player resets the graph.",
      "",
      "Y-axis begins at zero.",
      "",
      "The dramatic difference almost disappears.",
    ],
    leo: [
      "Same data.",
      "Different presentation.",
      "Very different emotional impact.",
    ],
    notebook: "Honest graph looks very different.",
  },
};

export const CASE6_NOTEBOOK = [
  "Crime increased from 10 to 20.",
  "Population also more than doubled.",
  "Crime rate actually decreased.",
  "Graph started at 9 instead of 0.",
  "Missing context created a misleading impression.",
];

export const CASE6_VERDICT = {
  question: "What should you conclude?",

  options: [
    {
      id: "a",
      text: "Crime doubled, so the city is twice as dangerous.",
      correct: false,
    },
    {
      id: "b",
      text: "The graph proves the city is unsafe.",
      correct: false,
    },
    {
      id: "c",
      text: "The graph uses real numbers but presents them in a misleading way by hiding context.",
      correct: true,
    },
    {
      id: "d",
      text: "All statistics are fake.",
      correct: false,
    },
  ],

  correctAnswer:
    "The graph uses real numbers but presents them in a misleading way by hiding context.",
};

export const CASE6_DEBRIEF = {
  paragraphs: [
    "Excellent investigation.",
    "Neither graph changed the numbers.",
    "Only the presentation changed.",
    "Statistics are powerful.",
    "They help us understand the world.",
    "But without context...",
    "Even true numbers can tell a false story.",
  ],
};

export const CASE6_LEARNINGS = [
  "Check the source of the data.",
  "Look at the graph's axes and labels.",
  "Ask whether important context has been left out.",
  "Be careful with percentages that don't mention actual numbers.",
  "Compare information with trusted official reports.",
];

export const CASE6_QUIZ = [
  {
    question: "Why was the graph misleading?",
    options: [
      "The numbers were completely fake.",
      "The graph started its Y-axis at 9 instead of 0, exaggerating the difference.",
      "The colors were red.",
      "The graph was shared on social media.",
    ],
    correctIndex: 1,
  },

  {
    question: "What additional information changed the interpretation?",
    options: [
      "The city's weather.",
      "The population increased significantly, causing the crime rate per person to decrease.",
      "The graph had too many bars.",
      "Nothing.",
    ],
    correctIndex: 1,
  },

  {
    question: "Can true statistics still be presented in a misleading way?",
    options: [
      "Yes",
      "No",
    ],
    correctIndex: 0,
  },
];

export const CASE6_REWARDS = {
  title: "MISSION COMPLETE",
  xp: "+350 XP",
  badge: "📊 Data Detective",
  levelProgress: "84%",
};

export const CASE6_ENDING = {
  paragraphs: [
    "You've learned something many adults struggle with.",
    "Not every misleading post is completely false.",
    "Sometimes...",
    "The facts are carefully arranged to lead you toward the wrong conclusion.",
  ],

  urgentAlert: {
    title: "URGENT",
    message: "Claim your ₹50,000 Government Relief Payment before midnight!",
    details: [
      "It looks official.",
      "It has the national emblem.",
      "It even includes a countdown timer.",
    ],
  },

  leo: "Commander... this website looks genuine.",

  mira: "That's exactly what worries me.",

  nextCaseNotification: "A new case file opens.",
};