import React from "react";

export const CASE5_ID = "2024-1501";

export const CASE5_INFO = {
  caseId: CASE5_ID,
  title: "THE VOICE THAT NEVER SPOKE",
  difficulty: "⭐⭐⭐⭐⭐ ADVANCED",
  skill:
    "Verify videos and identify deepfakes before believing or sharing them.",
  xp: 300,
  badge: "🎥 DEEPFAKE DETECTIVE",
  threatLevel: "🔴 VERY HIGH",
  reach: "18.7 MILLION VIEWS",
};

export const CASE5_INTRO = {
  title: "THE VOICE THAT NEVER SPOKE",
  text: [
    "The room is unusually tense.",
    "Every monitor in the headquarters is playing the same viral video.",
    "Every time we remove it, ten more copies appear.",
    "False information doesn't disappear.",
    "It multiplies.",
    "Today, your eyes won't be enough.",
    "You'll have to trust your investigation—not your instincts.",
  ],
};

export const CASE5_MISSION = {
  priority: "CRITICAL",
  threatLevel: "🔴 VERY HIGH",
  reach: "18.7 MILLION VIEWS",
  description:
    "A viral video appears to show Mayor Daniel Brooks announcing that the city's drinking water has been contaminated.",
  details: [
    "People are emptying supermarket shelves.",
    "Hospitals are receiving emergency calls.",
    "Schools are closing early.",
    "The city is in chaos.",
  ],
  objective:
    "Determine whether the Mayor actually made the announcement.",
};

export const CASE5_POST = {
  platform: "SOCIAL MEDIA",
  label: "VIRAL VIDEO",
  headline: "🚨 URGENT MESSAGE FROM THE MAYOR",
  body: [
    "Effective immediately, nobody should drink tap water.",
    "The contamination is severe.",
    "Store enough bottled water for at least two weeks.",
    "This announcement will soon be removed.",
    "Please share this video with everyone.",
  ],
  videoLength: "1 MIN 42 SEC",
  engagement: {
    views: "18.7 MILLION VIEWS",
    shares: "5.2 MILLION SHARES",
  },
};

export const CASE5_COMMENTS = [
  {
    name: "David",
    text: "I'm buying bottled water right now.",
  },
  {
    name: "Nisha",
    text: "Why isn't the government doing anything?",
  },
  {
    name: "Chris",
    text: "This looks completely real.",
  },
  {
    name: "Emma",
    text: "I just sent this to my entire neighborhood.",
  },
];

export const CASE5_MISSION_OBJECTIVE =
  "Determine whether the viral video is authentic.";

export const CASE5_TOOLS = [
  {
    id: "official",
    title: "OFFICIAL GOVERNMENT WEBSITE",
    symbol: "◎",
    color: "#22c55e",
  },
  {
    id: "speech",
    title: "FULL SPEECH ARCHIVE",
    symbol: "▶",
    color: "#00bfff",
  },
  {
    id: "audio",
    title: "AUDIO ANALYSIS",
    symbol: "♫",
    color: "#c9a227",
  },
  {
    id: "lipsync",
    title: "LIP SYNC ANALYSIS",
    symbol: "◉",
    color: "#9b59b6",
  },
  {
    id: "reverse",
    title: "REVERSE VIDEO SEARCH",
    symbol: "↻",
    color: "#e74c3c",
  },
  {
    id: "ai",
    title: "AI VIDEO DETECTION",
    symbol: "AI",
    color: "#00e9ff",
  },
];

export const CASE5_CLUES = {
  official: {
    title: "OFFICIAL GOVERNMENT WEBSITE",
    mentor:
      "If a public official really announced something this serious, check whether the official organization confirms it.",
    content: (
      <div>
        <div className="case5-label">
          OFFICIAL CITY WEBSITE
        </div>

        <div className="case5-official">
          <div className="case5-stamp">
            OFFICIAL ANNOUNCEMENT
          </div>

          <h3>WATER QUALITY UPDATE</h3>

          <p>
            Water quality remains safe.
          </p>

          <p>
            No emergency contamination warning
            has been issued.
          </p>
        </div>

        <div className="case5-warning">
          The official city website directly
          contradicts the viral video's claim.
        </div>
      </div>
    ),
    notebook:
      "Official government website says water remains safe.",
  },

  speech: {
    title: "FULL SPEECH ARCHIVE",
    mentor:
      "Find the original recording. Sometimes a real video is reused and given completely different audio or context.",
    content: (
      <div>
        <div className="case5-label">
          ORIGINAL VIDEO
        </div>

        <div className="case5-video-card">
          <div className="case5-video-status">
            ORIGINAL RECORDING
          </div>

          <h3>
            MAYOR DANIEL BROOKS — LIBRARY OPENING
          </h3>

          <p>
            Recorded three days before the viral
            video appeared.
          </p>

          <p>
            Topic: Opening of a new public library.
          </p>

          <div className="case5-observation">
            Same clothes.
            <br />
            Same background.
            <br />
            Same camera angle.
          </div>
        </div>

        <div className="case5-success">
          The viral video appears to reuse real
          footage from another event.
        </div>
      </div>
    ),
    notebook:
      "Original footage was a library-opening speech.",
  },

  audio: {
    title: "AUDIO ANALYSIS",
    mentor:
      "A convincing voice is not proof that the person actually said the words.",
    content: (
      <div>
        <div className="case5-label">
          DIGITAL AUDIO LAB
        </div>

        <div className="case5-analysis">
          <div>
            <span>TONE</span>
            <strong>INCONSISTENT</strong>
          </div>

          <div>
            <span>BACKGROUND NOISE</span>
            <strong>ARTIFICIALLY REMOVED</strong>
          </div>

          <div>
            <span>VOICE TRANSITIONS</span>
            <strong>UNNATURALLY SMOOTH</strong>
          </div>

          <div>
            <span>SYNTHETIC AUDIO PROBABILITY</span>
            <strong>91%</strong>
          </div>
        </div>

        <div className="case5-warning">
          Possible AI-generated voice detected.
        </div>
      </div>
    ),
    notebook:
      "Audio analysis indicates possible synthetic voice.",
  },

  lipsync: {
    title: "LIP SYNC ANALYSIS",
    mentor:
      "Slow the video down. Tiny mismatches between speech and facial movement can reveal manipulation.",
    content: (
      <div>
        <div className="case5-label">
          VIDEO ANALYSIS — 25% SPEED
        </div>

        <div className="case5-analysis">
          <div>
            <span>MOUTH MOVEMENT</span>
            <strong>SLIGHTLY DELAYED</strong>
          </div>

          <div>
            <span>WORD SHAPES</span>
            <strong>MISMATCHED</strong>
          </div>

          <div>
            <span>EYELID MOVEMENT</span>
            <strong>BRIEFLY FREEZES</strong>
          </div>
        </div>

        <div className="case5-success">
          Lip synchronization issues detected.
        </div>
      </div>
    ),
    notebook:
      "Lip-sync inconsistencies detected.",
  },

  reverse: {
    title: "REVERSE VIDEO SEARCH",
    mentor:
      "Search for earlier versions of the footage. The oldest version can reveal where the video originally came from.",
    content: (
      <div>
        <div className="case5-label">
          SEARCH RESULTS
        </div>

        <div className="case5-search-result">
          <div>
            <span>ORIGINAL UPLOAD</span>
            <strong>
              MAYOR'S OFFICE
            </strong>
          </div>

          <div>
            <span>UPLOAD DATE</span>
            <strong>
              3 DAYS AGO
            </strong>
          </div>

          <div>
            <span>ORIGINAL TOPIC</span>
            <strong>
              LIBRARY OPENING
            </strong>
          </div>

          <div>
            <span>VIRAL VERSION</span>
            <strong>
              APPEARED 6 HOURS AGO
            </strong>
          </div>
        </div>

        <div className="case5-warning">
          The viral version was uploaded after
          the authentic recording.
        </div>
      </div>
    ),
    notebook:
      "Original recording predates the manipulated viral version.",
  },

  ai: {
    title: "AI VIDEO DETECTION",
    mentor:
      "Detection tools can help identify manipulation, but never rely on one tool alone.",
    content: (
      <div>
        <div className="case5-label">
          AI VIDEO DETECTION SYSTEM
        </div>

        <div className="case5-ai-result">
          <div className="case5-ai-score">
            91%
          </div>

          <div>
            <span>
              ESTIMATED SYNTHETIC AUDIO
            </span>

            <strong>
              HIGH PROBABILITY
            </strong>
          </div>
        </div>

        <div className="case5-analysis">
          <div>
            <span>VOICE</span>
            <strong>ANOMALOUS</strong>
          </div>

          <div>
            <span>LIP SYNCHRONIZATION</span>
            <strong>INCONSISTENT</strong>
          </div>

          <div>
            <span>ORIGINAL FOOTAGE</span>
            <strong>FOUND</strong>
          </div>
        </div>

        <div className="case5-warning">
          AI detection is supporting evidence,
          not absolute proof.
        </div>
      </div>
    ),
    notebook:
      "Detection system indicates likely manipulated video.",
  },
};

export const CASE5_EVIDENCE = [
  "Official website contradicts the video.",
  "Original speech discussed a library opening.",
  "AI-generated voice detected.",
  "Lip-sync inconsistencies detected.",
  "Original footage predates the viral version.",
];

export const CASE5_FINAL_OPTIONS = [
  {
    id: "share",
    text: "Share the warning immediately.",
    correct: false,
  },
  {
    id: "assume",
    text: "Assume the Mayor is hiding the truth.",
    correct: false,
  },
  {
    id: "verify",
    text:
      "Verify the announcement through official government channels before believing or sharing the video.",
    correct: true,
  },
  {
    id: "ignore",
    text: "Ignore every video online forever.",
    correct: false,
  },
];

export const CASE5_DEBRIEF = [
  "Excellent work, Detective.",
  "Deepfakes don't always invent people.",
  "Sometimes they steal reality.",
  "They reuse real footage.",
  "They replace voices.",
  "They edit context.",
  "And within minutes...",
  "Millions believe something that never happened.",
  "Technology itself isn't the enemy.",
  "The danger begins when technology is used to deceive.",
];

export const CASE5_LEARNED = [
  "Check whether an official organization has published the same announcement.",
  "Look for the original upload.",
  "Compare multiple trusted news sources.",
  "Watch for unusual lip movements, frozen expressions, or mismatched audio.",
  "Remember that convincing visuals are not proof of authenticity.",
];

export const CASE5_QUIZ = [
  {
    question:
      "What was the strongest clue that the video was manipulated?",
    options: [
      "It had millions of views.",
      "The original video showed a completely different speech.",
      "The mayor wore a blue tie.",
      "The comments looked suspicious.",
    ],
    answer: 1,
  },

  {
    question:
      "What should you do if you receive an urgent video claiming to be from a public official?",
    options: [
      "Share it immediately.",
      "Verify it through official government channels.",
      "Believe it because it looks real.",
      "Judge it based on comments.",
    ],
    answer: 1,
  },

  {
    question:
      "Can a real video be edited to spread false information?",
    options: [
      "Yes",
      "No",
    ],
    answer: 0,
  },
];

export const CASE5_REWARD = {
  xp: 300,
  badge: "🎥 DEEPFAKE DETECTIVE",
  progress: "74%",
};

export const CASE5_HEADQUARTERS = [
  "Five missions.",
  "Five different ways misinformation tried to fool you.",
  "You've learned to question what people say...",
  "What they write...",
  "What they show...",
  "And even what they appear to say on camera.",
  "Commander... we've intercepted another case.",
  "A large graph appears on the holographic screen.",
  "The caption reads: CRIME HAS DOUBLED IN JUST ONE YEAR!",
  "The graph appears convincing.",
  "But something feels... off.",
  "Not every lie uses fake photos.",
  "Sometimes...",
  "THE NUMBERS TELL THE WRONG STORY.",
  "🔔 CASE FILE 006 INCOMING",
];