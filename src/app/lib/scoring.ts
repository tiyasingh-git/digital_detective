import type { Verdict } from "../types";

// Per-element contribution to each scoring dimension (raw points)
export const EL_SCORES: Record<string, { obs: number; ev: number; src: number; ver: number }> = {
  "headline":        { obs: 30, ev:  8, src:  4, ver:  5 },
  "handle":          { obs: 22, ev: 12, src: 35, ver: 28 },
  "claim-medicines": { obs: 14, ev: 32, src:  8, ver: 20 },
  "claim-effects":   { obs: 10, ev: 26, src:  6, ver: 15 },
  "claim-everyone":  { obs:  8, ev: 18, src:  5, ver:  8 },
  "claim-thousands": { obs:  6, ev: 10, src:  4, ver:  5 },
  "cta":             { obs: 18, ev:  6, src:  3, ver:  6 },
  "engagement":      { obs:  6, ev:  2, src:  2, ver:  2 },
  "comment":         { obs:  8, ev:  4, src:  3, ver:  3 },
};

// Caps calibrated so 2–3 key elements already reach or approach 100%
export const EL_CAPS = { obs: 62, ev: 60, src: 60, ver: 50 };

export function computeScores(investigated: string[], notes: string): { label: string; score: number }[] {
  const toScore = (val: number, cap: number) => Math.round(42 + Math.min(val, cap) / cap * 53);
  const sum = (key: keyof typeof EL_CAPS) =>
    investigated.reduce((a, id) => a + (EL_SCORES[id]?.[key] ?? 0), 0);

  const obs  = toScore(sum("obs"), EL_CAPS.obs);
  const ev   = toScore(sum("ev"),  EL_CAPS.ev);
  const src  = toScore(sum("src"), EL_CAPS.src);
  const ver  = toScore(sum("ver"), EL_CAPS.ver);
  const noteLen = notes.trim().length;
  const rsn  = Math.round(42 + Math.min(noteLen / 120, 1) * 53);
  const ctx  = Math.round(obs * 0.45 + ev * 0.55);
  const crit = Math.round(ev * 0.45 + src * 0.35 + ver * 0.2);
  // Breadth: capped at 3 elements so 3 key ones = full score
  const brd  = Math.round(42 + Math.min(investigated.length / 3, 1) * 53);

  return [
    { label: "Observation Skills",   score: obs  },
    { label: "Evidence Weighting",   score: ev   },
    { label: "Source Tracing",       score: src  },
    { label: "Reasoning Quality",    score: rsn  },
    { label: "Verification Depth",   score: ver  },
    { label: "Context Analysis",     score: ctx  },
    { label: "Critical Thinking",    score: crit },
    { label: "Investigation Scope",  score: brd  },
  ];
}

export function computeStrOpps(investigated: string[], notes: string) {
  const inv = new Set(investigated);
  const strengths: string[] = [];
  const opportunities: string[] = [];

  if (inv.has("headline"))        strengths.push("Identified emotional framing in the headline");
  if (inv.has("handle"))          strengths.push("Questioned the source account's credibility");
  if (inv.has("claim-medicines") || inv.has("claim-effects")) strengths.push("Examined the specific medical claims");
  if (inv.has("cta"))             strengths.push("Recognised urgency tactics in the call-to-action");
  if (notes.trim().length > 80)  strengths.push("Recorded written reasoning before deciding");
  if (inv.has("claim-everyone") || inv.has("claim-thousands")) strengths.push("Scrutinised the scope of the claims");

  if (!inv.has("handle"))         opportunities.push("Investigate the source domain and account age");
  if (!inv.has("claim-medicines") && !inv.has("claim-effects")) opportunities.push("Examine the specific medical claims more closely");
  if (!inv.has("headline"))       opportunities.push("Analyse the emotional framing in the headline");
  if (notes.trim().length < 60)  opportunities.push("Document reasoning with written observations before deciding");
  if (!inv.has("cta"))            opportunities.push("Consider what the urgency to share implies about the source");

  return { strengths: strengths.slice(0, 4), opportunities: opportunities.slice(0, 3) };
}

export const VERDICT_DESCRIPTIONS: Record<NonNullable<Verdict>, string> = {
  TRUST:  "Content assessed as credible. Trust recorded.",
  VERIFY: "Content flagged for further verification.",
  REJECT: "Content rejected as false or misleading.",
  REPORT: "Content reported as harmful health misinformation.",
};

// Overall score for a completed case = average of the 8 category scores, rounded.
// Used to persist a single number on CaseRecord for Detective Records / Profile stats.
export function computeOverallScore(investigated: string[], notes: string): number {
  const scores = computeScores(investigated, notes);
  const avg = scores.reduce((a, s) => a + s.score, 0) / scores.length;
  return Math.round(avg);
}

export function scoreToGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}