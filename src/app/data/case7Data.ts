export interface Case7Clue {
  id: string;
  title: string;
  tool: string;
  description: string;
  finding: string;
  dialogue: string;
}

export const CASE7_DATA = {
  caseId: "2024-1607",

  title: "THE PERFECT TRAP",

  difficulty: "⭐⭐⭐⭐⭐",

  skill:
    "How to identify phishing scams, fake websites, and fraudulent messages before clicking on them.",

  xp: 400,

  badge: "🎣 Scam Shield",

  operation: "THE PERFECT TRAP",

  priority: "CRITICAL",

  threatLevel: "SEVERE",

  estimatedVictims: "120,000 Users",

  introduction: {
    location:
      "Digital Guardians Headquarters – Cyber Defense Lab",

    paragraphs: [
      "A large digital map lights up.",
      "Red dots begin appearing across the country.",
      "One. Ten. Hundreds. Thousands.",
    ],

    leo: [
      "Commander...",
      "These aren't misinformation posts.",
    ],

    mira: [
      "No.",
      "They're phishing attacks.",
      "Sometimes...",
      "People don't lose because they believe fake news.",
      "They lose because they trust the wrong website.",
    ],

    alert: [
      "₹18 Crore Lost This Month",
      "12,000 Victims",
      "Average Time Before Clicking: 11 Seconds",
    ],
  },

  briefing: {
    paragraphs: [
      "Thousands of citizens have received a message claiming they are eligible for a ₹50,000 Disaster Relief Payment.",
      "The website looks official.",
      "The logo looks genuine.",
      "The language sounds professional.",
      "Within hours...",
      "People began entering their bank details.",
    ],
  },

  sms: {
    sender: "GOV-RELIEF",

    title: "₹50,000 Emergency Relief Assistance",

    message: [
      "🎉 Congratulations!",
      "You have been selected to receive",
      "₹50,000 Emergency Relief Assistance",
      "Claim before midnight.",
      "Failure to respond will permanently cancel your payment.",
    ],

    url: "www.relief-gov-india-support.in",
  },

  comments: [
    {
      name: "Neha",
      text: "I already submitted mine.",
    },
    {
      name: "Rohit",
      text: "Got the money yet?",
    },
    {
      name: "Amit",
      text: "My parents also received this.",
    },
    {
      name: "Sana",
      text: "Is this real?",
    },
  ],

  missionObjective:
    "Determine whether the message and website are genuine.",

  tools: [
    "Website Inspector",
    "URL Checker",
    "WHOIS Registration",
    "Official Government Portal",
    "HTTPS Certificate Viewer",
    "Cyber Crime Database",
  ],

  clues: [
    {
      id: "clue-1",
      title: "URL Inspection",
      tool: "URL Checker",
      description:
        "The suspicious website uses the domain www.relief-gov-india-support.in. The fictional official portal used in this case is www.govrelief.gov. The domains do not match.",
      finding: "Suspicious URL.",
      dialogue:
        "Scammers know people rarely read an entire web address.",
    },

    {
      id: "clue-2",
      title: "Website Inspection",
      tool: "Website Inspector",
      description:
        'The website contains government-style branding, national colors, a professional layout, and a countdown saying "ONLY 12 MINUTES LEFT!"',
      finding: "Artificial urgency.",
      dialogue:
        "Pressure is one of a scammer's favorite tools.",
    },

    {
      id: "clue-3",
      title: "Registration Details",
      tool: "WHOIS Registration",
      description:
        "The domain was registered only three days ago. The owner information is hidden and the registration details do not establish an official government connection.",
      finding: "Recently registered domain.",
      dialogue:
        "Would an official government portal appear only three days ago?",
    },

    {
      id: "clue-4",
      title: "Form Analysis",
      tool: "Website Inspector",
      description:
        "The form requests a full name, phone number, Aadhaar number, bank account details, ATM PIN, CVV, and OTP.",
      finding: "Sensitive information requested.",
      dialogue:
        "Stop. No legitimate organization should ask you to provide your ATM PIN or OTP through a suspicious payment form.",
    },

    {
      id: "clue-5",
      title: "Official Verification",
      tool: "Official Government Portal",
      description:
        "The fictional official government portal used for this investigation contains no announcement for the claimed relief payment. The case's cyber-crime database also flags the suspicious domain as fraudulent.",
      finding: "Confirmed phishing website.",
      dialogue:
        "The official source gives us the answer. The relief scheme cannot be verified, and the suspicious website has been flagged.",
    },
  ] as Case7Clue[],

  collectedEvidence: [
    "Fake domain name.",
    "Recently registered website.",
    "Artificial urgency.",
    "Requests confidential banking information.",
    "No official government announcement.",
    "Listed as a phishing website.",
  ],

  verdict: {
    question: "What should you do?",

    options: [
      {
        id: "submit",
        text: "Submit your details quickly before the deadline.",
        correct: false,
      },
      {
        id: "share",
        text: "Share the link with family.",
        correct: false,
      },
      {
        id: "verify",
        text:
          "Avoid entering personal information and verify only through official government websites.",
        correct: true,
      },
      {
        id: "ignore",
        text: "Ignore all government websites forever.",
        correct: false,
      },
    ],

    correctAnswer: "verify",

    explanation:
      "The message uses a suspicious domain, artificial urgency, requests sensitive information, and cannot be verified through an official source.",
  },

  debrief: {
    paragraphs: [
      "Scammers rarely break into your account.",
      "Most of the time...",
      "They simply convince you to open the door.",
      "A professional design doesn't prove legitimacy.",
      "Urgent messages are often designed to stop you from thinking.",
      "Every click is a decision.",
    ],
  },

  learned: [
    "Check the website URL carefully.",
    "Verify the scheme through official government or company websites.",
    "Never share OTPs, ATM PINs, CVV numbers, or passwords.",
    "Don't trust countdown timers or limited-time claims without verification.",
    "If unsure, contact the organization using official contact details rather than those provided in the suspicious message.",
  ],

  quiz: [
    {
      question:
        "Which clue most strongly suggested the website was fake?",
      options: [
        "It looked professional.",
        "It asked for an ATM PIN, CVV, and OTP.",
        "It used the national flag.",
        "It had colorful buttons.",
      ],
      answer: 1,
    },
    {
      question:
        "Why do phishing websites often use countdown timers?",
      options: [
        "To improve website speed.",
        "To create urgency and pressure people into acting without thinking.",
        "To save electricity.",
        "To make the page look modern.",
      ],
      answer: 1,
    },
    {
      question:
        "What should you do before entering personal or banking information online?",
      options: [
        "Verify the website through official sources.",
        "Trust the first result on social media.",
        "Follow what the comments say.",
        "Enter the information quickly before the offer expires.",
      ],
      answer: 0,
    },
  ],

  reward: {
    xp: 400,
    badge: "🎣 Scam Shield",
    levelProgress: "92%",
  },

  transition: {
    leo: "Commander... phishing attack contained.",

    mira: [
      "Good work.",
      "You've learned how false information spreads.",
      "You've learned how fake images and videos manipulate people.",
      "You've learned how scammers exploit trust.",
      "The next threat isn't a fake post.",
      "It's a world where you only see information that confirms what you already believe.",
    ],

    nextCaseTitle: "THE FILTER BUBBLE",
  },
} as const;