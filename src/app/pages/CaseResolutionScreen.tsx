import { motion } from "motion/react";

import type { Verdict, CaseRecord } from "../types";
import { MiraPopup } from "../components/shared/Mira";
import { STAMP_PALETTE } from "../data/investigationData";
import { useCaseContent } from "../context/CaseContentContext";

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


export function CaseResolutionScreen({
  verdict, caseRecord, investigated, onReturn,
}: {
  verdict: NonNullable<Verdict>;
  caseRecord: CaseRecord;
  investigated: string[];
  onReturn: () => void;
}) {
  const color = STAMP_PALETTE[verdict].color;
  const { content } = useCaseContent();
  const categoryScores = computeScores(investigated, caseRecord.notebookNotes ?? "");
  const { strengths, opportunities } = computeStrOpps(investigated, caseRecord.notebookNotes ?? "");

  return (
    <div className="absolute inset-0 overflow-y-auto" style={{ background: "radial-gradient(ellipse at center, #0e0c08 0%, #07090f 100%)" }}>
      <div className="flex flex-col items-center py-10 px-4" style={{ minHeight: "100%" }}>

        {/* Verdict stamp */}
        <motion.div
          initial={{ scale: 4, rotate: -12, opacity: 0 }}
          animate={{ scale: 1, rotate: -6, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          style={{ marginBottom: "10px" }}
        >
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color, letterSpacing: "0.3em", textAlign: "center", marginBottom: "4px", opacity: 0.7 }}>VERDICT</div>
          <div style={{
            fontFamily: "Special Elite, serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            color,
            border: `8px solid ${color}`,
            padding: "0.2em 0.7em",
            letterSpacing: "0.14em",
            lineHeight: 1,
            boxShadow: `0 0 60px ${color}40`,
          }}>
            {verdict}
          </div>
        </motion.div>

        {/* Verdict description */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.55)", letterSpacing: "0.15em", marginBottom: "28px", textAlign: "center" }}
        >
          {VERDICT_DESCRIPTIONS[verdict]}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex gap-8 mb-8"
        >
          {[
            { label: "CASE", value: "2024-1147", color: "#c9a227" },
            { label: "EVIDENCE REVIEWED", value: `${caseRecord.verdictsGiven.length + 6}`, color: "#c9a227" },
            { label: "FINAL VERDICT", value: verdict, color },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: "rgba(201,162,39,0.4)", letterSpacing: "0.18em", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontFamily: "Special Elite, serif", fontSize: "18px", color: s.color }}>{s.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Investigation Report */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          style={{ width: "min(640px, 92vw)", marginBottom: "24px" }}
        >
          <div style={{ border: "1px solid rgba(201,162,39,0.25)", backgroundColor: "rgba(201,162,39,0.03)" }}>
            <div style={{ borderBottom: "1px solid rgba(201,162,39,0.18)", padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "Special Elite, serif", fontSize: "15px", color: "#ffd966", letterSpacing: "0.12em" }}>INVESTIGATION REPORT</div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: "rgba(201,162,39,0.4)", letterSpacing: "0.14em" }}>CASE 2024-1147 · THE MIRACLE CURE</div>
            </div>

            {/* Category score bars — 2 columns */}
            <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {categoryScores.map(({ label, score }) => {
                const barColor = score >= 80 ? "#00ff6a" : score >= 60 ? "#c9a227" : "#e74c3c";
                const tier = score >= 80 ? "STRONG" : score >= 60 ? "DEVELOPING" : "EARLY";
                return (
                  <div key={label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: "#b8a878", letterSpacing: "0.08em" }}>{label.toUpperCase()}</span>
                      <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: barColor }}>{tier}</span>
                    </div>
                    <div style={{ height: "3px", backgroundColor: "rgba(201,162,39,0.12)" }}>
                      <div style={{ height: "100%", width: `${score}%`, backgroundColor: barColor, transition: "width 1.2s ease-out" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Strengths / Opportunities */}
            <div style={{ borderTop: "1px solid rgba(201,162,39,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {[
                { heading: "STRENGTHS",    headColor: "#00ff6a", items: strengths.length > 0 ? strengths : ["Made a final decision based on available evidence"] },
                { heading: "OPPORTUNITIES", headColor: "#c9a227", items: opportunities.length > 0 ? opportunities : ["Continue investigating additional post elements"] },
              ].map(({ heading, headColor, items }) => (
                <div key={heading} style={{ padding: "12px 18px", borderRight: heading === "STRENGTHS" ? "1px solid rgba(201,162,39,0.12)" : undefined }}>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: headColor, letterSpacing: "0.18em", marginBottom: "8px" }}>{heading}</div>
                  {items.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "6px", marginBottom: "5px", alignItems: "flex-start" }}>
                      <span style={{ color: headColor, fontSize: "8px", lineHeight: 1.6, flexShrink: 0 }}>·</span>
                      <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "#b8a878", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Commander Mira debrief */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          style={{ width: "min(640px, 92vw)", marginBottom: "28px" }}
        >
          <MiraPopup message={content.miraDebriefs[verdict]} />
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <button onClick={onReturn} style={{
            fontFamily: "Special Elite, serif", fontSize: "16px", letterSpacing: "0.18em",
            color: "#07090f", backgroundColor: color, border: "none",
            padding: "11px 32px", cursor: "pointer",
            boxShadow: `0 0 20px ${color}40`,
          }}>RETURN TO BUREAU</button>
        </motion.div>

      </div>
    </div>
  );
}