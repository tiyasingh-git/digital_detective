export type Case2Tool =
  | "scanner"
  | "timeline"
  | "camera"
  | "emotion"
  | "bias"
  | "metadata"
  | "verify";

export type Case2Element = {
  id: string;
  content: string;
  tag: "HEADLINE" | "SOURCE" | "CLAIM" | "ENGAGEMENT" | "COMMENT";
  importance: "HIGH" | "MED" | "LOW";
  directions: string[];
};

export const CASE2_INFO = {
  caseId: "2024-0891",
  title: "HARBOR PHANTOM",
  category: "MARITIME / SOCIAL MEDIA",
  exhibit: "EXHIBIT — VANISHING SHIP MANIFEST",
  platform: "PORT WATCH",
  account: "@HARBOR_EYE",
  time: "07:42",
};

export const CASE2_POST = {
  account: "@HARBOR_EYE",
  accountSubtext: "Port Watch · Independent Maritime Feed",

  headline: "THREE CARGO SHIPS VANISHED FROM THE HARBOR MANIFEST.",

  claims: [
    "Ships disappeared from the official record overnight.",
    "Port officials are hiding what really happened.",
    "The missing vessels were carrying restricted cargo.",
    "Someone altered the shipping database.",
  ],

  cta: "SHARE BEFORE THIS GETS DELETED.",

  engagement: "18,742 likes · 7,391 shares",

  comment:
    "My cousin works near the port. He says something definitely happened.",

  source: "harborwatch-report.com",
};

export const CASE2_ELEMENTS: Case2Element[] = [
  {
    id: "headline",
    content: "THREE CARGO SHIPS VANISHED FROM THE HARBOR MANIFEST.",
    tag: "HEADLINE",
    importance: "HIGH",
    directions: [
      "Find the earliest version of this claim.",
      "Check whether the ships actually disappeared.",
      "Compare the wording with official records.",
      "Look for missing context in the headline.",
      "Record your observation.",
    ],
  },

  {
    id: "claim-1",
    content: "Ships disappeared from the official record overnight.",
    tag: "CLAIM",
    importance: "HIGH",
    directions: [
      "Check the original harbor manifest.",
      "Compare different versions of the record.",
      "Look for legitimate reasons a vessel may be absent.",
      "Check whether the claim confuses a manifest with a live location tracker.",
      "Record your observation.",
    ],
  },

  {
    id: "claim-2",
    content: "Port officials are hiding what really happened.",
    tag: "CLAIM",
    importance: "HIGH",
    directions: [
      "Look for evidence supporting the accusation.",
      "Check whether an official statement exists.",
      "Identify whether the post uses speculation as fact.",
      "Look for another side of the story.",
      "Record your observation.",
    ],
  },

  {
    id: "claim-3",
    content: "The missing vessels were carrying restricted cargo.",
    tag: "CLAIM",
    importance: "HIGH",
    directions: [
      "Find the source of the cargo allegation.",
      "Check whether cargo information is publicly available.",
      "Look for evidence rather than anonymous claims.",
      "Identify what information is actually confirmed.",
      "Record your observation.",
    ],
  },

  {
    id: "claim-4",
    content: "Someone altered the shipping database.",
    tag: "CLAIM",
    importance: "MED",
    directions: [
      "Look for evidence of an actual database change.",
      "Check whether the record has a revision history.",
      "Consider ordinary administrative corrections.",
      "Separate possibility from proof.",
      "Record your observation.",
    ],
  },

  {
    id: "cta",
    content: "SHARE BEFORE THIS GETS DELETED.",
    tag: "CLAIM",
    importance: "MED",
    directions: [
      "Identify the emotional pressure in the wording.",
      "Check whether deletion is actually documented.",
      "Ask why the author wants immediate sharing.",
      "Compare this tactic with common misinformation patterns.",
      "Record your observation.",
    ],
  },

  {
    id: "source",
    content: "harborwatch-report.com",
    tag: "SOURCE",
    importance: "HIGH",
    directions: [
      "Check who owns the website.",
      "Look for an editorial team.",
      "Find the original source of its information.",
      "Check whether the site provides evidence.",
      "Record your observation.",
    ],
  },

  {
    id: "engagement",
    content: "18,742 likes · 7,391 shares",
    tag: "ENGAGEMENT",
    importance: "LOW",
    directions: [
      "Look at how quickly the post spread.",
      "Compare shares with likes.",
      "Ask whether popularity proves accuracy.",
      "Check for signs of coordinated engagement.",
      "Record your observation.",
    ],
  },

  {
    id: "comment",
    content:
      "My cousin works near the port. He says something definitely happened.",
    tag: "COMMENT",
    importance: "LOW",
    directions: [
      "Check whether the commenter provides evidence.",
      "Separate firsthand evidence from hearsay.",
      "Ask whether the claim can be independently verified.",
      "Look for similar anonymous comments.",
      "Record your observation.",
    ],
  },
];

export const CASE2_TOOLS = [
  {
    id: "scanner" as Case2Tool,
    symbol: "◎",
    label: "SOURCE SCANNER",
    color: "#00bfff",
    result:
      "ACCOUNT AGE: 7 MONTHS · FOLLOWERS: 11,200 · VERIFIED: NO · PRIOR POSTS: 214",
  },

  {
    id: "timeline" as Case2Tool,
    symbol: "⊞",
    label: "TIMELINE LENS",
    color: "#c9a227",
    result:
      "FIRST POST: 07:42 · 1,000 SHARES: 08:06 · OFFICIAL UPDATE: 10:15 · SPREAD RATE: HIGH",
  },

  {
    id: "camera" as Case2Tool,
    symbol: "◈",
    label: "CONTEXT CAMERA",
    color: "#9b59b6",
    result:
      "IDENTICAL CLAIMS: 3 ACCOUNTS · EARLIEST VERSION: UNKNOWN · IMAGE SOURCE: UNCONFIRMED",
  },

  {
    id: "emotion" as Case2Tool,
    symbol: "◉",
    label: "EMOTION METER",
    color: "#e74c3c",
    result:
      "FEAR: HIGH · URGENCY: HIGH · ANGER: MEDIUM · CLICKBAIT LANGUAGE: PRESENT",
  },

  {
    id: "bias" as Case2Tool,
    symbol: "◐",
    label: "BIAS COMPASS",
    color: "#22c55e",
    result:
      "FRAMING: SUSPICIOUS · ALTERNATIVE VIEW: ABSENT · ACCUSATION WITHOUT EVIDENCE: HIGH",
  },

  {
    id: "metadata" as Case2Tool,
    symbol: "◫",
    label: "METADATA LENS",
    color: "#9b59b6",
    result:
      "POSTED: 07:42:13 · LOCATION: HIDDEN · EDIT HISTORY: NOT AVAILABLE",
  },

  {
    id: "verify" as Case2Tool,
    symbol: "◻",
    label: "VERIFY CHECKLIST",
    color: "#c9b882",
    result:
      "OFFICIAL SOURCE: FOUND · ORIGINAL EVIDENCE: PARTIAL · CLAIM: MISLEADING · CONTEXT: MISSING",
  },
];

export const CASE2_FINDINGS: Record<
  Case2Tool,
  Record<string, string>
> = {
  scanner: {
    headline:
      "The account has existed for 7 months and has no verified institutional identity.",
    "claim-1":
      "The account is not an official harbor authority or shipping operator.",
    "claim-2":
      "No evidence connects the account to port authorities.",
    "claim-3":
      "The account has previously posted several dramatic maritime claims.",
    "claim-4":
      "No technical evidence of database manipulation is provided.",
    source:
      "The website does not identify a named investigative team.",
    comment:
      "The commenter has no publicly verifiable connection to the port.",
    _default: "No additional source information found.",
  },

  timeline: {
    headline:
      "The claim appeared at 07:42 and spread rapidly before an official port update at 10:15.",
    "claim-1":
      "The wording changed between early posts and later reposts.",
    "claim-2":
      "The accusation appeared before the official explanation was published.",
    "claim-3":
      "The cargo allegation appeared in later reposts, not in the earliest version.",
    "claim-4":
      "No timestamped evidence establishes when a database change supposedly occurred.",
    source:
      "The website article was updated twice after the social post began spreading.",
    comment:
      "The comment appeared after the claim had already gone viral.",
    _default: "No additional timeline information found.",
  },

  camera: {
    headline:
      "Three accounts reused nearly identical wording, but no common original source was identified.",
    "claim-1":
      "The same phrase appears across multiple reposts without a primary document attached.",
    "claim-2":
      "The accusation is repeated without adding new evidence.",
    "claim-3":
      "The restricted-cargo claim appears only in later versions.",
    "claim-4":
      "No screenshot or technical record proving database manipulation is attached.",
    cta:
      "The phrase 'before this gets deleted' appears in several unrelated viral posts.",
    source:
      "The website's article contains no direct copy of an official manifest.",
    comment:
      "Similar anonymous comments repeat the same unverified story.",
    _default: "No additional context information found.",
  },

  emotion: {
    headline:
      "The phrase 'vanished' creates a stronger impression than the available evidence supports.",
    "claim-1":
      "The word 'overnight' creates urgency without explaining the normal update cycle.",
    "claim-2":
      "The accusation 'hiding' presents suspicion as if it were established fact.",
    "claim-3":
      "The restricted-cargo claim is emotionally charged but lacks supporting evidence.",
    "claim-4":
      "The phrase 'someone altered' implies deliberate wrongdoing without proof.",
    cta:
      "The deletion warning encourages immediate sharing before verification.",
    _default: "No additional emotional-language information found.",
  },

  bias: {
    headline:
      "The post frames the situation as a cover-up while leaving out ordinary explanations.",
    "claim-1":
      "The post does not distinguish between a manifest update and a vessel physically disappearing.",
    "claim-2":
      "No official response is presented alongside the accusation.",
    "claim-3":
      "The post provides no evidence that the vessels carried restricted cargo.",
    "claim-4":
      "The possibility of an administrative correction is ignored.",
    cta:
      "The post frames sharing as urgent and necessary rather than encouraging verification.",
    source:
      "The article selects suspicious interpretations without presenting competing explanations.",
    _default: "No additional framing information found.",
  },

  metadata: {
    headline:
      "Post created at 07:42:13. Location information is unavailable.",
    "claim-1":
      "No attached document metadata identifies the original harbor record.",
    source:
      "The website does not provide a clear publication history for its underlying documents.",
    _default: "No additional metadata available.",
  },

  verify: {
    headline:
      "The central claim is misleading: the vessels did not simply 'vanish'; the record changed during a normal administrative update.",
    "claim-1":
      "The available harbor information shows the manifest was undergoing an update.",
    "claim-2":
      "An official explanation exists and does not support the cover-up accusation.",
    "claim-3":
      "No reliable evidence confirms that the vessels carried restricted cargo.",
    "claim-4":
      "No evidence establishes malicious database tampering.",
    source:
      "The website does not provide the primary records needed to support its strongest claims.",
    comment:
      "Personal testimony is not enough to establish what happened to the ships.",
    _default: "No additional verification information found.",
  },
};

export function getCase2Finding(
  tool: Case2Tool,
  elementId: string | null
): string {
  if (!elementId) {
    return CASE2_TOOLS.find((toolData) => toolData.id === tool)?.result ?? "";
  }

  return (
    CASE2_FINDINGS[tool]?.[elementId] ??
    CASE2_FINDINGS[tool]?._default ??
    "No relevant evidence found for this selection."
  );
}