export const CASE1_ID = "2024-1147";

export const CASE1_INFO = {
  title: "THE MIRACLE CURE",
  difficulty: "⭐ Beginner",
  skill:
    "Source Verification & Health Misinformation",
  xp: 100,
  badge: "💊 Health Fact Checker",
  priority: "HIGH",
  threatLevel: "🟠 MODERATE",
  reach: "2.8 Million Views",
};

export const CASE1_INTRO = [
  "The headquarters is quiet.",
  "Screens glow across the investigation room, displaying thousands of posts being shared across social media.",
  "Suddenly...",
  "🔔 NEW CASE RECEIVED",
  "Commander Mira walks into the room holding a tablet.",
  "She looks concerned.",
];

export const CASE1_INTRO_DIALOGUE = [
  "Detective, we've got our first real assignment.",
  "A health claim is spreading rapidly across social media.",
  "People aren't just believing it...",
  "They're changing their health decisions because of it.",
  "DIABETES CAN BE CURED IN JUST 7 DAYS!",
  "It sounds incredible.",
  "And that's exactly why we need to investigate it.",
  "A claim isn't true just because thousands of people believe it.",
];

export const CASE1_MISSION = {
  description:
    "A viral Instagram account is claiming that diabetes can be completely cured in just seven days using a special natural method.",
  details: [
    "The post has received hundreds of thousands of likes.",
    "People are commenting that they're planning to stop their regular treatment.",
    "We need to know whether this claim is supported by reliable evidence.",
  ],
  objective:
    "Find the source. Check the evidence. Verify the claim.",
};

export const CASE1_POST = {
  account: "@NaturalHealthSecrets",
  followers: "1.4 Million",
  verified: false,
  headline:
    "🚨 DOCTORS DON'T WANT YOU TO KNOW THIS!",
  claim:
    "DIABETES CAN BE CURED IN JUST 7 DAYS!",
  body: [
    "A new natural method can supposedly restore your body's ability to control blood sugar.",
    "No medication.",
    "No injections.",
    "No expensive treatment.",
    "Just follow this simple 7-day routine!",
    "Thousands of people have already tried it.",
    "\"Doctors are hiding the truth!\"",
  ],
  engagement: {
    likes: "387K Likes",
    shares: "742K Shares",
    comments: "96K Comments",
  },
};

export const CASE1_COMMENTS = [
  {
    user: "Riya",
    text:
      "My uncle has diabetes. I'm sending this to him right now!",
  },
  {
    user: "Arjun",
    text:
      "Finally! A natural solution.",
  },
  {
    user: "Meera",
    text:
      "Has anyone actually tried this?",
  },
  {
    user: "HealthWarrior99",
    text:
      "Big pharmaceutical companies don't want people to know about this.",
  },
];

export const CASE1_TOOLS = [
  {
    id: "source",
    title: "SOURCE CHECKER",
    symbol: "◎",
    color: "#00e9ff",
  },
  {
    id: "author",
    title: "AUTHOR PROFILE",
    symbol: "◉",
    color: "#c9a227",
  },
  {
    id: "science",
    title: "SCIENTIFIC EVIDENCE",
    symbol: "⌬",
    color: "#ffd966",
  },
  {
    id: "medical",
    title: "MEDICAL ORGANIZATION REPORTS",
    symbol: "✚",
    color: "#00e9ff",
  },
  {
    id: "factcheck",
    title: "FACT-CHECK ARCHIVE",
    symbol: "✓",
    color: "#c9a227",
  },
  {
    id: "comments",
    title: "COMMENT ANALYSIS",
    symbol: "☷",
    color: "#ffd966",
  },
] as const;

export type Case1ToolId =
  (typeof CASE1_TOOLS)[number]["id"];

export const CASE1_CLUES: Record<
  Case1ToolId,
  {
    title: string;
    mentor: string;
    notebook: string;
    content: string[];
  }
> = {
  source: {
    title: "SOURCE CHECKER",
    mentor:
      "A large following doesn't automatically make someone an expert. Major health claims should have a reliable source.",
    notebook:
      "The account provides no reliable scientific source.",
    content: [
      "Account: @NaturalHealthSecrets",
      "Followers: 1.4 Million",
      "Verified: ❌ No",
      "Medical Credentials: ❌ None listed",
      "Source for claim: \"Ancient natural medicine\"",
      "Scientific studies linked: ❌ None",
    ],
  },

  author: {
    title: "AUTHOR PROFILE",
    mentor:
      "When someone makes a major health claim, check who they are and whether they have relevant expertise.",
    notebook:
      "The account has no listed medical credentials.",
    content: [
      "The account does not identify a qualified medical professional.",
      "No medical license or professional credentials are listed.",
      "The account's popularity does not establish medical credibility.",
    ],
  },

  science: {
    title: "SCIENTIFIC EVIDENCE",
    mentor:
      "Extraordinary health claims require strong evidence. A testimonial isn't the same thing as scientific research.",
    notebook:
      "No reliable scientific evidence supports the seven-day cure claim.",
    content: [
      "No credible clinical study supports the claim.",
      "No published research paper is provided.",
      "No medical evidence is linked.",
      "No qualified medical expert is cited.",
    ],
  },

  medical: {
    title: "MEDICAL ORGANIZATION REPORTS",
    mentor:
      "Compare viral medical claims with information from trusted medical organizations.",
    notebook:
      "Trusted medical information does not support the viral claim.",
    content: [
      "Trusted medical information explains that diabetes requires appropriate medical management.",
      "There is no evidence supporting the claim that diabetes can simply be completely cured in seven days using this viral method.",
    ],
  },

  factcheck: {
    title: "FACT-CHECK ARCHIVE",
    mentor:
      "Fear, secrecy, and guaranteed results can be designed to make people react emotionally before investigating.",
    notebook:
      "The post uses emotional language and unsupported promises.",
    content: [
      "The archive contains fact-checks discussing similar viral health claims.",
      "\"Doctors don't want you to know.\"",
      "\"Big companies are hiding this.\"",
      "\"Guaranteed results.\"",
      "The claims provide dramatic promises but little or no reliable evidence.",
    ],
  },

  comments: {
    title: "COMMENT ANALYSIS",
    mentor:
      "Personal experiences can feel convincing, but popularity isn't evidence.",
    notebook:
      "Testimonials and comments do not prove the medical claim.",
    content: [
      "\"It worked for my cousin!\"",
      "\"My sugar went down after trying this.\"",
      "\"Everyone should try this.\"",
      "These are personal experiences, not controlled scientific evidence.",
    ],
  },
};

export const CASE1_FINAL_OPTIONS = [
  {
    id: "popular",
    text:
      "The claim must be true because millions of people shared it.",
    correct: false,
  },
  {
    id: "followers",
    text:
      "The account has enough followers to be considered reliable.",
    correct: false,
  },
  {
    id: "unsupported",
    text:
      "The claim is unsupported by reliable evidence and should not be treated as a proven medical fact.",
    correct: true,
  },
  {
    id: "hidden-truth",
    text:
      "Anyone who disagrees with the post is hiding the truth.",
    correct: false,
  },
];

export const CASE1_DEBRIEF = [
  "You did it, Detective.",
  "The post looked convincing because it used confidence, popularity, and emotional language.",
  "But when we investigated the source...",
  "There was no reliable evidence behind the claim.",
  "A viral claim is still just a claim until reliable evidence supports it.",
  "And when health is involved, never let a social media post replace trustworthy medical information.",
];

export const CASE1_LEARNED = [
  "Check who created the claim.",
  "Look for reliable scientific evidence.",
  "Check trusted medical organizations.",
  "Be cautious of guaranteed or miraculous results.",
  "Don't treat testimonials as scientific proof.",
  "Avoid making health decisions based only on viral social media posts.",
];

export const CASE1_QUIZ = [
  {
    question:
      "What was the biggest problem with the viral claim?",
    options: [
      "The post didn't have enough likes.",
      "The account had no medical credentials or reliable evidence supporting the claim.",
      "The post used too many emojis.",
      "The account had too many followers.",
    ],
    answer: 1,
  },
  {
    question:
      "Why aren't personal testimonials enough to prove a medical treatment works?",
    options: [
      "People never tell the truth online.",
      "Personal experiences don't provide the controlled scientific evidence needed to establish whether a treatment is effective.",
      "Testimonials are always fake.",
      "Social media comments cannot contain information.",
    ],
    answer: 1,
  },
  {
    question:
      "What should you do when you see a major health claim online?",
    options: [
      "Share it immediately.",
      "Trust it if enough people agree.",
      "Verify the claim using reliable medical and scientific sources.",
    ],
    answer: 2,
  },
];

export const CASE1_REWARD = {
  xp: 100,
  badge: "💊 Health Fact Checker",
  progress: "10%",
};

export const CASE1_TRANSITION = [
  "Your first investigation is complete.",
  "But misinformation doesn't always invent completely fake information.",
  "Sometimes...",
  "The information is real...",
  "But the context is wrong.",
  "🔔 CASE FILE 002 RECEIVED",
  "Yesterday's Disaster",
  "Don't just ask whether the image is real.",
  "Find out when and where it was actually taken.",
];