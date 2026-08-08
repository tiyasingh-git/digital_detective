import type { Verdict } from "../types";

export const TOOLS_DATA = [
  {
    id: "scanner" as const, sym: "◎", label: "SOURCE SCANNER", color: "#00bfff",
    result: "ACCOUNT AGE: 94 DAYS\nFOLLOWERS: 2,400 — UNVERIFIED\nVERIFIED BADGE: NONE\nPRIOR FLAGS: 2",
  },
  {
    id: "timeline" as const, sym: "⊞", label: "TIMELINE LENS", color: "#c9a227",
    result: "POST PUBLISHED: 06:14\n500 SHARES BY: 08:00\nFIRST FLAG: 09:45\nSPREAD RATE: ACCELERATING",
  },
  {
    id: "camera" as const, sym: "◈", label: "CONTEXT CAMERA", color: "#9b59b6",
    result: "PLATFORM: SOCIAL FEED\nTAGS: #health #cure #share\nSIMILAR POSTS: 4 DETECTED\nORIG SOURCE: UNVERIFIED",
  },
  {
    id: "emotion" as const, sym: "◉", label: "EMOTION METER", color: "#e74c3c",
    result: "HEADLINE TONE: FEAR/URGENCY\nEMOJI USAGE: EXCESSIVE\nCLICKBAIT SCORE: HIGH\nLANGUAGE BIAS: LOADED",
  },
  {
    id: "bias" as const, sym: "◐", label: "BIAS COMPASS", color: "#22c55e",
    result: "FRAMING: FEAR-BASED\nEMOTION LOAD: HIGH\nNEUTRALITY INDEX: 0.14\nPRIM LEAN: HEALTH FEAR",
  },
  {
    id: "metadata" as const, sym: "◫", label: "METADATA LENS", color: "#9b59b6",
    result: "POSTED: 06:14:08 AM\nACCOUNT AGE: 94 DAYS\nPRIOR POSTS: 38\nLOCATION: HIDDEN",
  },
  {
    id: "verify" as const, sym: "◻", label: "VERIFY CHECKLIST", color: "#c9b882",
    result: "SOURCE CITED: UNVERIFIED SITE\nEXPERT REVIEW: NONE\nPEER-REVIEWED: NO\nFACT-CHECKED: DISPUTED",
  },
];


// Keys are toolId → elementId → factual finding text (facts, not conclusions).
// Elements with no meaningful data for a tool fall through to _default.
export const TOOL_FINDINGS: Record<string, Record<string, string>> = {
  scanner: {
    "handle":     "naturalheals.in domain registered 42 days ago · no author names listed · no editorial policy · no contact page",
    "engagement": "account age: 94 days · prior health-claim flags: 2 · engagement rate inconsistent with follower count",
    "comment":    "commenter account created 61 days ago · no prior medical posts · comment upvoted within 18 minutes of posting",
    "_default":   "No source-related data for this selection.",
  },
  timeline: {
    "headline":    "post published 06:14 · 500 shares reached by 08:00 · spread rate logged as accelerating by monitoring tools",
    "engagement":  "124,532 likes accumulated over 14 hours · share-to-like ratio: 1:3.2 · first platform flag recorded at 09:45",
    "comment":     "comment posted 2 hours after original post · upvote burst pattern associated with coordinated engagement",
    "_default":    "No time-sequence data for this selection.",
  },
  camera: {
    "headline":        "identical headline text found on 4 separate accounts · earliest known version predates this account by 6 months",
    "claim-medicines": "identical bullet phrasing found in 6 prior posts across 3 platforms · no research citation found in any instance",
    "claim-effects":   "identical bullet phrasing found in 6 prior posts across 3 platforms · no research citation found in any instance",
    "claim-everyone":  "identical bullet phrasing found in 6 prior posts across 3 platforms · no research citation found in any instance",
    "claim-thousands": "identical bullet phrasing found in 6 prior posts across 3 platforms · no research citation found in any instance",
    "cta":             "'Share with loved ones' phrasing appears in 38 documented health-misinformation posts in the past 90 days",
    "handle":          "naturalheals.in links to a supplement product page · account promotes 2 other products with similar unverified claims",
    "_default":        "No cross-platform context data for this selection.",
  },
  emotion: {
    "headline":        "all-caps lettering · exclamation mark · '7 DAYS' adds artificial deadline · no hedging language present",
    "cta":             "family-based emotional appeal ('loved ones') · imperative verb 'Share' · no source reference included",
    "claim-medicines": "absolute term 'No' with no qualifiers · zero caveats · benefits-only language pattern",
    "claim-effects":   "absolute term 'No' with no qualifiers · zero caveats · benefits-only language pattern",
    "claim-everyone":  "universal claim 'Everyone' with no exceptions stated · no individual-variation acknowledgement",
    "claim-thousands": "vague large number ('thousands') with no source · designed to convey social proof without verifiable data",
    "_default":        "No emotional-language data for this selection.",
  },
  bias: {
    "headline":        "implies medical establishment suppresses a cure · no alternative perspective offered · uses fear framing",
    "cta":             "urgency framing positions sharing as a moral duty · no verification step suggested",
    "claim-medicines": "benefits-only presentation · no risk information · no exceptions or contraindications stated",
    "claim-effects":   "benefits-only presentation · no risk information · no exceptions or contraindications stated",
    "claim-everyone":  "benefits-only presentation · no risk information · no exceptions or contraindications stated",
    "claim-thousands": "social-proof framing without verifiable data · number functions as authority without citation",
    "handle":          "account name implies health authority · no commercial-interest disclaimer present",
    "_default":        "No framing data for this selection.",
  },
  metadata: {
    "handle":     "account age: 94 days · total posts: 38 · location data: hidden · no linked editorial team",
    "engagement": "post timestamp: 06:14:08 UTC · device metadata stripped from post · geolocation field absent",
    "_default":   "No metadata available for this selection.",
  },
  verify: {
    "headline":        "no peer-reviewed study found across 3 databases · claim listed as disputed by independent fact-checkers",
    "claim-medicines": "no clinical trial result found supporting this · closest published study found no statistically significant effect",
    "claim-effects":   "no clinical trial result found supporting this · closest published study found no statistically significant effect",
    "claim-everyone":  "no clinical trial result found supporting this · closest published study found no statistically significant effect",
    "claim-thousands": "no clinical trial result found supporting this · closest published study found no statistically significant effect",
    "handle":          "naturalheals.in not listed in any press or medical credibility database · domain registered via private registrar",
    "comment":         "commenter's claim is unverifiable · anecdotal personal report does not constitute clinical evidence",
    "_default":        "No verifiable data for this selection.",
  },
};


export function getToolResult(toolId: string, elementId: string | null): string {
  if (!elementId) {
    // Default: normalise multi-line hardcoded result to · separator
    return TOOLS_DATA.find(t => t.id === toolId)?.result.replace(/\n/g, " · ") ?? "";
  }
  return TOOL_FINDINGS[toolId]?.[elementId] ?? TOOL_FINDINGS[toolId]?.["_default"] ?? "No relevant data for this selection.";
}


export const WITNESS_DATA = [
  { id: 1, name: "@HEALTHTRUTH22", time: "06:14", role: "ORIGINAL POSTER — ANONYMOUS", statement: "Posted the claim with zero credentials: \"DOCTORS DON'T WANT YOU TO KNOW THIS 🚨\" Account is 94 days old. No real name. No bio. Two prior health-misinformation flags." },
  { id: 2, name: "@CURIOUS_MOM", time: "08:30", role: "COMMENT — BELIEVER", statement: "\"My aunt tried this last month and she says it really helped. Why would they lie to us?\" 847 likes on the comment. No source cited. Emotional appeal only." },
  { id: 3, name: "MED-ALERT BOT", time: "09:45", role: "AUTOMATED FLAG — FACT-CHECK DB", statement: "Health claim flagged across three independent fact-check databases. No peer-reviewed study found. Domain naturacurenews.net registered only 42 days ago." },
];


export const EVIDENCE_DATA = [
  { id: 1, label: "VIRAL POST — SCREENGRAB", tag: "SOCIAL MEDIA", auth: 62, flagged: true },
  { id: 2, label: "POSTER'S ACCOUNT", tag: "ACCOUNT", auth: 38, flagged: true },
  { id: 3, label: "ORIGINAL SOURCE CHECK", tag: "SOURCING", auth: 12, flagged: true },
  { id: 4, label: "SCIENTIFIC EVIDENCE", tag: "RESEARCH", auth: 15, flagged: true },
  { id: 5, label: "EXPERT OPINION", tag: "EXPERT", auth: 91, flagged: false },
  { id: 6, label: "WEBSITE CREDIBILITY", tag: "DIGITAL", auth: 24, flagged: true },
];


export const SUSPECT_DATA = [
  { id: 1, name: "@HEALTHTRUTH22", role: "Anonymous Poster — Account Age 94d", suspicion: 84 },
  { id: 2, name: "NATURACURENEWS.NET", role: "Source Website — No Contact Info", suspicion: 79 },
  { id: 3, name: "VITABOOST BRAND", role: "Supplement Brand — Potential Beneficiary", suspicion: 52 },
];


export const TIMELINE_DATA = [
  { time: "06:14", event: "Viral post published — anonymous account", active: false },
  { time: "08:00", event: "500 shares reached — spread accelerating", active: false },
  { time: "09:45", event: "Fact-check bot flags the claim — 3 databases", active: true },
  { time: "12:00", event: "Post reaches 12,000 views — still live", active: false },
  { time: "14:30", event: "Medical association issues public warning", active: false },
  { time: "ONGOING", event: "Original post still live — no retraction", active: false },
];


// Suspect node IDs (gold nodes that can be nominated as primary source of misinformation)
export const SUSPECT_NODE_IDS = [1, 3, 6]; // @HLTHTRUTH22, NATURACURE, SHARE CHAIN


export const CORRECT_SUSPECT_ID = 1; // @HEALTHTRUTH22 — original anonymous poster


export const STAMP_PALETTE: Record<string, { bg: string; color: string }> = {
  TRUST:  { bg: "#06170d", color: "#00ff6a" },
  VERIFY: { bg: "#150f03", color: "#f59e0b" },
  REJECT: { bg: "#160404", color: "#ef4444" },
  REPORT: { bg: "#021620", color: "#00e9ff" },
};


export const EVIDENCE_EXHIBITS: Record<number, {
  type: string; title: string; body: React.ReactNode; marginNote?: string; mentorNote?: string;
}> = {
  1: {
    type: "SOCIAL MEDIA EXHIBIT",
    title: "VIRAL POST — SCREENGRAB",
    mentorNote: "No name, no date, no credentials — that's your first red flag, Recruit.",
    body: (
      <div>
        <div style={{ border: "1px solid rgba(201,162,39,0.2)", backgroundColor: "rgba(7,9,15,0.8)", padding: "12px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.4)", letterSpacing: "0.15em", marginBottom: "6px" }}>POST CONTENT — SCREENGRAB</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#ffd966", lineHeight: 1.7, borderLeft: "2px solid rgba(201,162,39,0.3)", paddingLeft: "10px" }}>
            "DOCTORS DON'T WANT YOU TO KNOW THIS 🚨 Ancient herb CURES ALL diseases — even ones Big Pharma said were impossible. SHARE before they delete this!!!"
          </div>
        </div>
        {[["SHARES", "38,400 IN 6H"], ["LIKES", "12,100"], ["COMMENTS", "2,840 — MOSTLY UNCRITICAL"], ["AUTHOR", "UNKNOWN — NO CREDENTIALS"], ["SOURCE LINK", "NATURACURENEWS.NET"]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-2">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "90px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: (k === "AUTHOR" || k === "SOURCE LINK") ? "#e74c3c" : "#c9b882" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.15)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e74c3c", lineHeight: 1.7 }}>
          FLAG: No author identified. No date on original claim. No institutional affiliation. Emotional language designed to trigger rapid sharing.
        </div>
      </div>
    ),
  },
  2: {
    type: "ACCOUNT DOSSIER",
    title: "POSTER'S ACCOUNT — @HEALTHTRUTH22",
    mentorNote: "94 days old. Thousands of followers. Growth like that doesn't happen organically.",
    body: (
      <div>
        <div style={{ border: "1px solid rgba(201,162,39,0.2)", padding: "10px", marginBottom: "12px", backgroundColor: "rgba(201,162,39,0.04)" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.15em", marginBottom: "4px" }}>ACCOUNT RECORD</div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.06em" }}>@HEALTHTRUTH22</div>
        </div>
        {[["ACCOUNT AGE", "94 DAYS"], ["FOLLOWERS", "2,400"], ["FOLLOWING", "1,800"], ["VERIFIED", "NO"], ["PRIOR FLAGS", "2 — HEALTH MISINFORMATION"], ["BIO", "NONE — NO REAL NAME"]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-2">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "100px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: (k === "VERIFIED" || k === "PRIOR FLAGS" || k === "BIO") ? "#e74c3c" : "#c9b882" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.15)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e74c3c", lineHeight: 1.7 }}>
          FLAG: Created 3 months ago. Growth inconsistent with organic reach. Previously flagged twice for health misinformation. No verifiable identity.
        </div>
      </div>
    ),
  },
  3: {
    type: "SOURCE VERIFICATION",
    title: "ORIGINAL SOURCE CHECK",
    marginNote: "no trail leads anywhere",
    mentorNote: "The link leads nowhere credible. When a source can't be traced, the claim collapses with it.",
    body: (
      <div>
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.2)", marginBottom: "10px" }} />
        {[["SOURCE URL", "NATURACURENEWS.NET"], ["DOMAIN AGE", "42 DAYS OLD"], ["CONTACT INFO", "NONE — NO EDITOR LISTED"], ["ARCHIVE", "NOT INDEXED PRE-2024"], ["PRIMARY CLAIM", "\"ANCIENT REMEDY CURES ALL\""]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-1.5">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "90px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: (k === "CONTACT INFO" || k === "DOMAIN AGE") ? "#e74c3c" : "#c9b882" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.12)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e74c3c", lineHeight: 1.7 }}>
          FLAG: No original research linked. Domain registered 42 days ago. No named editor or journalist. Story cannot be traced to any primary source.
        </div>
      </div>
    ),
  },
  4: {
    type: "RESEARCH AUDIT",
    title: "SCIENTIFIC EVIDENCE — NO STUDY FOUND",
    mentorNote: "No study. No paper. No trial. If the science existed, it would be published — and it isn't.",
    body: (
      <div>
        <div style={{ border: "1px solid rgba(201,162,39,0.2)", padding: "10px", marginBottom: "12px", backgroundColor: "rgba(7,9,15,0.8)" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.15em", marginBottom: "6px" }}>DATABASE SEARCH RESULTS</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#e74c3c", letterSpacing: "0.08em", lineHeight: 1.6 }}>
            PUBMED: 0 RESULTS<br />
            WHO DATABASE: 0 RESULTS<br />
            COCHRANE LIBRARY: 0 RESULTS
          </div>
        </div>
        {[["PEER-REVIEWED", "NONE FOUND"], ["CLINICAL TRIAL", "NONE REGISTERED"], ["CITED STUDIES", "NONE — CLAIM UNSUPPORTED"], ["CONSENSUS", "NO SCIENTIFIC CONSENSUS"]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-2">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "110px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#e74c3c" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.15)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e74c3c", lineHeight: 1.7 }}>
          FLAG: Zero peer-reviewed studies support this claim across three major medical databases. No clinical trial on record. The claim is scientifically unsupported.
        </div>
      </div>
    ),
  },
  5: {
    type: "EXPERT INTERVIEW TRANSCRIPT",
    title: "EXPERT OPINION — DR. K. OSEI",
    marginNote: "asked him twice — stood by it",
    mentorNote: "Dr. Osei is a credible anchor. Note his exact words: 'no credible study.' That's your counterweight.",
    body: (
      <div>
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.2)", marginBottom: "10px" }} />
        {[["EXPERT", "DR. K. OSEI — EPIDEMIOLOGY"], ["INSTITUTION", "NATIONAL HEALTH INSTITUTE"], ["DATE", "CURRENT CASE · ORAL STATEMENT"]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-1.5">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "90px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "17px", color: "#c9b882" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.12)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Caveat, cursive", fontSize: "17px", color: "#ffffff", lineHeight: 1.65 }}>
          "I reviewed the claim circulating online. There is no credible study — peer-reviewed or otherwise — supporting it. The plant mentioned does not demonstrate therapeutic value beyond placebo. I would urge anyone who saw this post not to act on it."
        </div>
      </div>
    ),
  },
  6: {
    type: "DIGITAL CREDIBILITY AUDIT",
    title: "WEBSITE CREDIBILITY — NATURACURENEWS.NET",
    mentorNote: "No About page. No contact. All caps. High ad density. Every marker of a junk-science site — check them all.",
    body: (
      <div>
        <div style={{ border: "1px solid rgba(201,162,39,0.2)", padding: "10px", marginBottom: "12px", backgroundColor: "rgba(201,162,39,0.04)" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.15em", marginBottom: "4px" }}>SITE AUDIT — NATURACURENEWS.NET</div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966" }}>HIGH AD DENSITY · ALL-CAPS HEADLINE · NO SOURCES</div>
        </div>
        {[["ABOUT PAGE", "MISSING"], ["CONTACT INFO", "NONE"], ["AD DENSITY", "VERY HIGH — 8 ADS ABOVE FOLD"], ["HEADLINE FORMAT", "ALL-CAPS — EMOTIONAL"], ["BYLINE", "\"NATURAL NEWS DESK\" — ANON"], ["DOMAIN AGE", "42 DAYS"]].map(([k, v]) => (
          <div key={k} className="flex gap-2 mb-2">
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.5)", letterSpacing: "0.12em", minWidth: "110px" }}>{k}</span>
            <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: (k === "ABOUT PAGE" || k === "CONTACT INFO" || k === "BYLINE") ? "#e74c3c" : "#c9b882" }}>{v}</span>
          </div>
        ))}
        <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.15)", margin: "10px 0" }} />
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e74c3c", lineHeight: 1.7 }}>
          FLAG: Website displays 8 of 10 low-credibility markers. No editorial contact. No sourced references. All-caps headline is a known clickbait pattern.
        </div>
      </div>
    ),
  },
};


export const MIRA_MISSION_INTRO = "This post spread to 38,000 people in six hours. The source is anonymous. The medical claim is unsupported. I need you to evaluate it: should it be trusted, verified further, rejected as false, or reported as harmful? Take your time with the evidence.";


export const MIRA_DEBRIEFS: Record<NonNullable<Verdict>, string> = {
  TRUST: "Confidence is useful — but trust without verification is a vulnerability. Review your Source Verification score. In this case, the anonymous origin and absent scientific study both argued for caution before trust.",
  VERIFY: "Smart call. Flagging content for verification is the most defensible choice when the evidence trail leads to dead ends. You protected yourself and others from acting on an unconfirmed claim.",
  REJECT: "Your evidence assessment is sound. No peer-reviewed study, an anonymous 94-day-old account, a website with no editorial standards — each one a named reason. Rejection, when supported by evidence, is a reasoned decision.",
  REPORT: "The right move. Health misinformation causes real harm. Every report triggers a platform review and slows the spread. You did not just assess the content — you acted on it.",
};


export const POST_ELEMENTS: { id: string; content: string; directions: string[] }[] = [
  { id: "headline",        content: "DIABETES GONE IN 7 DAYS!", directions: ["Find the original source of this claim", "Look for supporting medical research", "Check independent fact-checker coverage", "Investigate the emotional wording", "Record an observation and continue"] },
  { id: "claim-medicines", content: "No Medicines",             directions: ["Search for clinical evidence behind this", "Look for health authority statements", "Check whether any trial supports this claim", "Investigate what the phrase leaves out", "Record an observation and continue"] },
  { id: "claim-effects",   content: "No Side Effects",          directions: ["Find pharmacology sources on this substance", "Look for opposing medical literature", "Check whether this claim has been studied", "Investigate the safety implication", "Record an observation and continue"] },
  { id: "claim-everyone",  content: "Works for Everyone",       directions: ["Evaluate the scope of this generalisation", "Look for patient group exclusions", "Check what a broad medical claim requires", "Investigate what is being omitted", "Record an observation and continue"] },
  { id: "claim-thousands", content: "Helped thousands of people", directions: ["Find any verifiable data behind this figure", "Look for original source of these testimonials", "Check independent verification of the numbers", "Investigate the lack of specificity", "Record an observation and continue"] },
  { id: "cta",             content: "Share with your loved ones!", directions: ["Examine why urgency to share is included", "Look for this pattern in known misinformation", "Check whether credible sources use this tactic", "Investigate the emotional framing of the appeal", "Record an observation and continue"] },
  { id: "handle",          content: "naturalheals.in",          directions: ["Find when this account or domain was created", "Look for previous posts from this source", "Check site-credibility tools for this domain", "Investigate editorial standards listed on the site", "Record an observation and continue"] },
  { id: "engagement",      content: "124,532 likes",            directions: ["Find the spread timeline for this post", "Look into how engagement metrics can be inflated", "Check whether popularity implies accuracy", "Investigate the share-to-like ratio", "Record an observation and continue"] },
  { id: "comment",         content: "My uncle tried this and his sugar levels are normal now.", directions: ["Find the commenter's account history", "Look for similar anecdotal comment patterns", "Check whether personal testimony equals clinical proof", "Investigate whether this comment can be verified", "Record an observation and continue"] },
];


export const POST_ELEMENT_META: Record<string, { tag: string; importance: "HIGH" | "MED" | "LOW" }> = {
  "headline":        { tag: "HEADLINE CLAIM", importance: "HIGH" },
  "handle":          { tag: "SOURCE ACCOUNT", importance: "HIGH" },
  "claim-medicines": { tag: "BODY CLAIM",     importance: "HIGH" },
  "claim-effects":   { tag: "BODY CLAIM",     importance: "HIGH" },
  "claim-everyone":  { tag: "BODY CLAIM",     importance: "MED"  },
  "claim-thousands": { tag: "BODY CLAIM",     importance: "MED"  },
  "cta":             { tag: "CALL TO ACTION", importance: "MED"  },
  "engagement":      { tag: "ENGAGEMENT",     importance: "LOW"  },
  "comment":         { tag: "USER COMMENT",   importance: "LOW"  },
};


export const VERDICTS = [
  { id: "TRUST" as const, color: "#00ff6a" },
  { id: "VERIFY" as const, color: "#f59e0b" },
  { id: "REJECT" as const, color: "#ef4444" },
  { id: "REPORT" as const, color: "#00e9ff" },
];
