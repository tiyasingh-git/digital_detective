import { motion } from "motion/react";

import { MiraPopup } from "./Mira";
import { EVIDENCE_DATA } from "../../data/investigationData";

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


export function EvidenceExhibitModal({ evidenceId, onClose }: { evidenceId: number; onClose: () => void }) {
  const e = EVIDENCE_DATA.find(ev => ev.id === evidenceId)!;
  const exhibit = EVIDENCE_EXHIBITS[evidenceId];
  if (!exhibit) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 300, backgroundColor: "rgba(0,0,0,0.88)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{ width: "min(480px, 94vw)", backgroundColor: "#07090f", border: "1px solid rgba(201,162,39,0.35)", boxShadow: "0 24px 80px rgba(0,0,0,0.9)" }}
      >
        {/* Header strip */}
        <div style={{ borderBottom: "1px solid rgba(201,162,39,0.2)", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(201,162,39,0.05)" }}>
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.25em", color: "rgba(201,162,39,0.5)", marginBottom: "2px" }}>{exhibit.type}</div>
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.06em" }}>{exhibit.title}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ border: "1px solid rgba(201,162,39,0.35)", padding: "2px 7px" }}>
              <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.15em", color: e.auth > 70 ? "#22c55e" : e.auth > 50 ? "#c9a227" : "#e74c3c" }}>
                AUTH {e.auth}%
              </span>
            </div>
            <button onClick={onClose} style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.45)", background: "none", border: "none", cursor: "pointer", lineHeight: 1 }}>×</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 18px", position: "relative" }}>
          {exhibit.body}
          {/* Caveat margin note */}
          {exhibit.marginNote && (
            <div style={{ position: "absolute", right: "-2px", top: "50%", transform: "translateY(-50%) rotate(2deg)", fontFamily: "Caveat, cursive", fontSize: "14px", color: "#c9a227", opacity: 0.7, textAlign: "right", maxWidth: "90px", lineHeight: 1.4, pointerEvents: "none" }}>
              {exhibit.marginNote}
            </div>
          )}
        </div>

        {/* Commander Mira commentary */}
        {exhibit.mentorNote && (
          <div style={{ borderTop: "1px solid rgba(201,162,39,0.12)", padding: "12px 18px", backgroundColor: "rgba(7,9,15,0.5)" }}>
            <MiraPopup message={exhibit.mentorNote} />
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(201,162,39,0.12)", padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.35)", letterSpacing: "0.12em" }}>
            CASE 2024-1147 · EXHIBIT {evidenceId} · {e.tag}
          </span>
          <button onClick={onClose} style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.14em", color: "#c9a227", border: "1px solid rgba(201,162,39,0.3)", background: "none", padding: "5px 14px", cursor: "pointer" }}
            onMouseEnter={(ev) => (ev.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,162,39,0.08)"}
            onMouseLeave={(ev) => (ev.currentTarget as HTMLElement).style.backgroundColor = "transparent"}
          >CLOSE FILE</button>
        </div>
      </motion.div>
    </motion.div>
  );
}