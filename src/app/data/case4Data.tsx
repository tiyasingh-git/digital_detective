import React from "react";

export const CASE4_ID = "2024-1389";

export const CASE4_INFO = {
  caseId: CASE4_ID,
  title: "THE PERFECT FAKE",
  difficulty: "⭐⭐⭐⭐ INTERMEDIATE",
  skill:
    "How to identify AI-generated images and understand why they can be misleading.",
  xp: 250,
  badge: "🤖 AI INVESTIGATOR",
  threatLevel: "🔴 HIGH",
  reach: "12.3 MILLION USERS",
};

export const CASE4_INTRO = {
  title: "THE PERFECT FAKE",
  text: [
    "Until now, our investigations involved real photos used in the wrong context.",
    "Today's mission is different.",
    "The image you're about to see...",
    "Never existed.",
  ],
  leo: [
    "Commander... this image has already crossed 12 million views.",
  ],
  mira: [
    "Until now, our investigations involved real photos used in the wrong context.",
    "Today's mission is different.",
    "The image you're about to see...",
    "Never existed.",
  ],
};

export const CASE4_MISSION = {
  priority: "🔴 CRITICAL",
  threatLevel: "🔴 HIGH",
  reach: "12.3 MILLION USERS",
  description:
    "A shocking image of internationally renowned scientist Dr. Elena Ross being arrested has gone viral overnight.",
  details: [
    "The internet is convinced she's been involved in a massive financial scam.",
    "Several news pages have reposted it.",
    "Her reputation is collapsing.",
    "Nobody can find evidence that the arrest ever happened.",
  ],
  objective:
    "Determine whether the image is authentic before reaching a conclusion.",
};

export const CASE4_POST = {
  platform: "SOCIAL MEDIA",
  label: "VIRAL SOCIAL MEDIA POST",
  headline:
    "World-famous scientist Dr. Elena Ross arrested outside National Research Centre.",
  body: [
    "Authorities remain silent.",
    "Why isn't the mainstream media covering this?",
  ],
  engagement: {
    likes: "426K Likes",
    shares: "890K Shares",
    comments: "201K Comments",
  },
};

export const CASE4_COMMENTS = [
  {
    name: "ScienceToday",
    text: "I always knew something was suspicious.",
  },
  {
    name: "TruthSeeker99",
    text: "The media is hiding everything again.",
  },
  {
    name: "Priya M.",
    text: "I can't believe this... I admired her.",
  },
  {
    name: "Arjun",
    text: "This photo looks real to me.",
  },
];

export const CASE4_MISSION_OBJECTIVE =
  "Investigate the evidence and determine whether the viral image is authentic.";

export const CASE4_TOOLS = [
  {
    id: "reverse-search",
    title: "REVERSE IMAGE SEARCH",
    symbol: "⌕",
    color: "#00bfff",
  },
  {
    id: "official-news",
    title: "OFFICIAL NEWS SEARCH",
    symbol: "◫",
    color: "#22c55e",
  },
  {
    id: "zoom",
    title: "IMAGE ZOOM",
    symbol: "⊕",
    color: "#c9a227",
  },
  {
    id: "metadata",
    title: "IMAGE METADATA",
    symbol: "◎",
    color: "#9b59b6",
  },
  {
    id: "ai-detection",
    title: "AI DETECTION REPORT",
    symbol: "◉",
    color: "#e74c3c",
  },
  {
    id: "timeline",
    title: "EVENT TIMELINE",
    symbol: "◷",
    color: "#00e9ff",
  },
];

export const CASE4_CLUES = {
  "reverse-search": {
    title: "REVERSE IMAGE SEARCH",
    mentor:
      "Sometimes no search results don't prove something is real. An image may simply be new or manipulated.",
    content: (
      <div>
        <div className="case4-label">SEARCH RESULT</div>

        <div className="case4-official">
          <div className="case4-stamp">REVERSE IMAGE SEARCH</div>

          <p>
            No earlier version of the image was found in the search results.
          </p>
        </div>

        <div className="case4-warning">
          No previous version found — but that does not prove the image is
          authentic.
        </div>
      </div>
    ),
    notebook: "No previous version found.",
  },

  "official-news": {
    title: "OFFICIAL NEWS SEARCH",
    mentor:
      "An arrest involving someone this famous would normally be covered by multiple reliable sources.",
    content: (
      <div>
        <div className="case4-label">TRUSTED NEWS SEARCH</div>

        <div className="case4-source-list">
          <div>
            <span>TRUSTED NEWS OUTLETS</span>
            <strong>No reports of the arrest.</strong>
          </div>

          <div>
            <span>PRESS CONFERENCE</span>
            <strong>No press conference found.</strong>
          </div>

          <div>
            <span>POLICE STATEMENT</span>
            <strong>No police statement found.</strong>
          </div>

          <div>
            <span>EYEWITNESS ACCOUNTS</span>
            <strong>No credible eyewitness accounts found.</strong>
          </div>
        </div>

        <div className="case4-warning">
          No credible reporting supports the viral claim.
        </div>
      </div>
    ),
    notebook: "No credible reporting found.",
  },

  zoom: {
    title: "IMAGE ZOOM INVESTIGATION",
    mentor:
      "AI image generators have improved dramatically, but they can still struggle with fine details like text, reflections, and hands.",
    content: (
      <div>
        <div className="case4-label">VISUAL OBSERVATIONS</div>

        <div className="case4-credibility-list">
          <div>⚠ Police badge text appears distorted.</div>
          <div>⚠ One officer's fingers merge together unnaturally.</div>
          <div>⚠ Reflections in the car windows don't match the surroundings.</div>
          <div>⚠ A street sign contains unreadable letters.</div>
        </div>

        <div className="case4-warning">
          Multiple visual inconsistencies appear when the image is examined
          closely.
        </div>
      </div>
    ),
    notebook: "Visual inconsistencies detected.",
  },

  metadata: {
    title: "IMAGE METADATA",
    mentor:
      "Metadata isn't always available, but missing information can be another clue.",
    content: (
      <div>
        <div className="case4-label">METADATA REPORT</div>

        <div className="case4-comparison">
          <div>
            <span>CAMERA INFORMATION</span>
            <strong>NOT AVAILABLE</strong>
          </div>

          <div>
            <span>DEVICE DETAILS</span>
            <strong>NOT AVAILABLE</strong>
          </div>

          <div>
            <span>LOCATION DATA</span>
            <strong>NOT AVAILABLE</strong>
          </div>

          <div>
            <span>CREATION TIME</span>
            <strong>2 HOURS BEFORE VIRAL POST</strong>
          </div>
        </div>

        <div className="case4-warning">
          The image contains no useful camera, device, or location metadata.
        </div>
      </div>
    ),
    notebook: "Missing metadata.",
  },

  "ai-detection": {
    title: "AI DETECTION REPORT",
    mentor:
      "No detector is perfect. That's why we never rely on a single tool.",
    content: (
      <div>
        <div className="case4-label">ACADEMY AI DETECTION SYSTEM</div>

        <div className="case4-ai-score">
          <div className="case4-ai-number">94%</div>
          <div className="case4-ai-caption">
            PROBABILITY OF AI GENERATION
          </div>
        </div>

        <div className="case4-credibility-list">
          <div>⚠ Artificial lighting</div>
          <div>⚠ Unrealistic facial texture</div>
          <div>⚠ Inconsistent shadows</div>
          <div>⚠ Distorted typography</div>
          <div>⚠ Finger anomalies</div>
        </div>

        <div className="case4-warning">
          AI detection strongly suggests the image was generated or
          manipulated, but this result should be combined with other evidence.
        </div>
      </div>
    ),
    notebook: "High probability of AI generation.",
  },

  timeline: {
    title: "EVENT TIMELINE",
    mentor:
      "A major arrest should leave a trail of evidence. Compare the timing of the viral post with what can actually be verified.",
    content: (
      <div>
        <div className="case4-label">TIMELINE ANALYSIS</div>

        <div className="case4-source-list">
          <div>
            <span>VIRAL IMAGE</span>
            <strong>Appeared online overnight.</strong>
          </div>

          <div>
            <span>IMAGE CREATION</span>
            <strong>Approximately two hours before the viral post.</strong>
          </div>

          <div>
            <span>TRUSTED NEWS</span>
            <strong>No credible reports of an arrest.</strong>
          </div>

          <div>
            <span>OFFICIAL SOURCES</span>
            <strong>No confirmation of the event.</strong>
          </div>
        </div>

        <div className="case4-success">
          The timeline provides no reliable evidence that the arrest occurred.
        </div>
      </div>
    ),
    notebook: "Timeline contains no credible confirmation of the arrest.",
  },
};

export const CASE4_EVIDENCE = [
  "No trusted news reports.",
  "Distorted text detected.",
  "Unnatural hands detected.",
  "Inconsistent reflections detected.",
  "Missing metadata.",
  "AI detector indicates likely AI generation.",
  "No credible timeline confirming the arrest.",
];

export const CASE4_FINAL_OPTIONS = [
  {
    id: "share",
    text: "Share the image because it looks convincing.",
    correct: false,
  },
  {
    id: "guilty",
    text: "Assume the scientist is guilty.",
    correct: false,
  },
  {
    id: "verify",
    text:
      "Verify through trusted sources before believing or sharing the image.",
    correct: true,
  },
  {
    id: "ignore",
    text: "Ignore every image created online.",
    correct: false,
  },
];

export const CASE4_DEBRIEF = [
  "Outstanding work, Detective.",
  "Today's mission wasn't about proving whether AI is good or bad.",
  "AI is a powerful technology with many positive uses.",
  "The real challenge begins when AI-generated content is presented as real without disclosure.",
  "One realistic image can destroy a person's reputation in minutes.",
  "That's why Digital Guardians don't trust appearances.",
  "They verify the story behind them.",
];

export const CASE4_LEARNED = [
  "Look for coverage from trusted news organizations.",
  "Check if multiple independent sources report the same event.",
  "Zoom in for unusual details.",
  "Look for distorted text, reflections, hands, or lighting.",
  "Remember that AI detection tools help — but they are not perfect.",
  "Always combine multiple pieces of evidence before making a decision.",
];

export const CASE4_QUIZ = [
  {
    question: "Which clue suggested the image might be AI-generated?",
    options: [
      "It had many likes.",
      "It contained distorted text and unnatural hands.",
      "The scientist looked surprised.",
      "The image was colorful.",
    ],
    answer: 1,
  },
  {
    question: "Can AI-generated images always be identified by one tool?",
    options: ["Yes", "No"],
    answer: 1,
  },
  {
    question:
      "What's the safest response when you see a shocking viral image?",
    options: [
      "Share it immediately.",
      "Verify it through trusted and independent sources before believing or sharing the image.",
      "Trust the comments.",
      "Judge the person in the image.",
    ],
    answer: 1,
  },
];

export const CASE4_REWARD = {
  xp: 250,
  badge: "🤖 AI INVESTIGATOR",
  progress: "58%",
};

export const CASE4_HEADQUARTERS = [
  "Four successful investigations.",
  "You're beginning to notice what most people miss.",
  "Four badges now stand on your profile.",
  "But the investigation isn't over.",
  "We've got another problem.",
  "A famous world leader appears to announce a shocking new policy.",
  "The voice sounds real.",
  "The facial expressions are flawless.",
  "The lip movements match perfectly.",
  "But the official office denies that the speech ever happened.",
  "Today's challenge was a fake image.",
  "Tomorrow's challenge...",
  "can talk.",
  "CASE FILE 005 INCOMING.",
];