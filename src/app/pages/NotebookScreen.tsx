import { useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";

import type { CaseRecord, Verdict } from "../types";
import { STAMP_PALETTE } from "../data/investigationData";
import { useCaseContent } from "../context/CaseContentContext";
import { CASES_CATALOG } from "../data/casesData";

export const NOTE_ENTRIES = [
  {
    short: "Author unknown — no name, no credentials.",
    flag: "CRITICAL",
    detail: "Anonymous authorship is a key red flag. Any credible medical claim will cite the name, institution, and credentials of the person making it. This post listed none — it cannot be attributed or verified.",
  },
  {
    short: "No peer-reviewed study found in any database.",
    flag: "RESEARCH",
    detail: "PubMed, WHO, and the Cochrane Library returned zero results for this claim. Peer review is the minimum standard for medical evidence. An absence of any study means no scientific foundation exists.",
  },
  {
    short: "Headline designed to trigger fear and sharing.",
    flag: "MANIPULATION",
    detail: "All-caps text, urgent emoji, and 'SHARE before they delete this' are deliberate emotional triggers engineered to bypass critical thinking and encourage rapid sharing before anyone pauses to verify.",
  },
  {
    short: "Website: no About page, no contact info.",
    flag: "DIGITAL",
    detail: "A credible news or research outlet always lists its editorial team, a contact address, and an About page. naturacurenews.net has none — it cannot be held accountable for what it publishes.",
  },
  {
    short: "Medical claim is entirely unsupported.",
    flag: "EXPERT",
    detail: "Dr. K. Osei (National Health Institute) stated: 'There is no credible study — peer-reviewed or otherwise — supporting this claim.' The substance does not demonstrate therapeutic value beyond placebo.",
  },
  {
    short: "Post actively encourages mass sharing.",
    flag: "PATTERN",
    detail: "The call to 'SHARE before they delete this' is a manipulation tactic designed to create urgency and prevent the reader from fact-checking. Legitimate health information does not need to be spread this way.",
  },
];


export const NOTEBOOK_CASES: Record<string, {
  photos: { label: string; url: string; rot: number; align: "flex-start" | "flex-end" }[];
  evidenceItems: string[];
}> = {
  "2024-1147": {
    photos: [
      { label: "VIRAL POST — SCREENGRAB", url: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?w=220&h=150&fit=crop&auto=format", rot: -2, align: "flex-start" },
      { label: "NATURACURENEWS.NET AUDIT", url: "https://images.unsplash.com/photo-1579869847557-1f67382cc158?w=220&h=150&fit=crop&auto=format", rot: 3, align: "flex-end" },
      { label: "DR. OSEI — EXPERT STMT.", url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=220&h=150&fit=crop&auto=format", rot: -1, align: "flex-start" },
    ],
    evidenceItems: [
      "Author unknown — no credentials listed",
      "No peer-reviewed study found in 3 databases",
      "Headline uses fear language + urgent emoji",
      "Source website 42 days old, no About page",
      "Account only 94 days old, 2 prior flags",
      "Post actively encourages mass sharing",
    ],
  },
};


export const VERDICT_PAST: Record<NonNullable<Verdict>, string> = {
  TRUST: "TRUSTED", VERIFY: "VERIFIED", REJECT: "REJECTED", REPORT: "REPORTED",
};


export function NotebookScreen({ cases, onUpdateNotes, onBack }: {
  cases: CaseRecord[];
  onUpdateNotes: (caseId: string, notes: string) => void;
  onBack: () => void;
}) {
  const [currentPage, setCurrentPage] = useState<"index" | string>("index");
  const { content } = useCaseContent();
  const [prevPage, setPrevPage] = useState<"index" | string | null>(null);
  const [pageDir, setPageDir] = useState<"forward" | "back">("forward");
  const [shadowKey, setShadowKey] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipKey, setFlipKey] = useState(0);

  const solvedCases = useMemo(() => cases.filter(c => c.status === "closed-solved"), [cases]);
  const solvedIds = useMemo(() => solvedCases.map(c => c.caseId), [solvedCases]);

  const navigate = useCallback((target: "index" | string, dir: "forward" | "back") => {
    setPrevPage(currentPage);
    setPageDir(dir);
    setCurrentPage(target);
    setShadowKey(k => k + 1);
    setFlipKey(k => k + 1);
    setIsFlipping(true);
  }, [currentPage]);

  const goBack = useCallback(() => {
    const idx = solvedIds.indexOf(currentPage as string);
    if (idx <= 0) navigate("index", "back");
    else navigate(solvedIds[idx - 1], "back");
  }, [currentPage, solvedIds, navigate]);

  const goForward = useCallback(() => {
    if (currentPage === "index") {
      if (solvedIds.length > 0) navigate(solvedIds[0], "forward");
    } else {
      const idx = solvedIds.indexOf(currentPage as string);
      if (idx < solvedIds.length - 1) navigate(solvedIds[idx + 1], "forward");
    }
  }, [currentPage, solvedIds, navigate]);

  const canGoBack = currentPage !== "index";
  const canGoForward = currentPage === "index"
    ? solvedIds.length > 0
    : solvedIds.indexOf(currentPage as string) < solvedIds.length - 1;
  const currentIdx = solvedIds.indexOf(currentPage as string);

  const suspicionFor = (v: Verdict): number => {
    if (v === "REPORT") return 92; if (v === "REJECT") return 85;
    if (v === "VERIFY") return 58; return 26;
  };

  const ruledLines = { backgroundImage: "repeating-linear-gradient(transparent,transparent 27px,rgba(80,50,18,0.16) 27px,rgba(80,50,18,0.16) 28px)" };

  const TabMarkers = ({ active }: { active: "A" | "B" | "C" }) => (
    <div className="absolute right-0 top-14 flex flex-col gap-1.5" style={{ zIndex: 20 }}>
      {(["A", "B", "C"] as const).map(l => (
        <div key={l} style={{ backgroundColor: l === active ? "#c9a227" : "#5a3a1a", width: "20px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: l === active ? "#07090f" : "#c9b882" }}>{l}</span>
        </div>
      ))}
    </div>
  );

  // Render helpers — each returns one page div (flex-1) for either the static backdrop or the turning overlay.
  const renderLeft = (pg: "index" | string): React.ReactNode => {
    if (pg === "index") {
      return (
        <div className="flex-1 relative overflow-hidden p-5" style={{ background: "linear-gradient(135deg,#c8976c 0%,#d4a87a 25%,#dfbf90 55%,#d4a87a 80%,#c0906a 100%)", borderRight: "2px solid #5a3a1a" }}>
          <div className="absolute inset-0 pointer-events-none" style={ruledLines} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(55,25,5,0.3) 100%)" }} />
          <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: "30px", background: "linear-gradient(to right, rgba(55,25,5,0.25) 0%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "36px", background: "linear-gradient(to top, rgba(55,25,5,0.2) 0%, transparent 100%)" }} />
          <div className="absolute pointer-events-none" style={{ right: "8%", bottom: "12%", width: "72px", height: "72px", borderRadius: "50%", border: "3px solid rgba(80,50,18,0.28)", boxShadow: "inset 0 0 16px rgba(80,50,18,0.08)", transform: "rotate(-10deg) scaleX(1.35)" }} />
          <div className="absolute pointer-events-none" style={{ left: "11%", bottom: "19%", transform: "rotate(-6deg)", zIndex: 5 }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "radial-gradient(circle at 38% 36%, #8a3a18, #521e08)", boxShadow: "0 2px 8px rgba(0,0,0,0.55), inset 0 1px 3px rgba(255,140,60,0.18)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(201,162,39,0.28)" }}>
              <span style={{ fontFamily: "Special Elite, serif", fontSize: "18px", color: "rgba(201,162,39,0.65)" }}>⊛</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "30px 30px 0 0", borderColor: "#a07238 transparent transparent transparent", opacity: 0.32 }} />
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-5" style={{ opacity: 0.55 }}>
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "38px", color: "#5a3a1a", textAlign: "center", letterSpacing: "0.06em", lineHeight: 1.25 }}>CASE<br />JOURNAL</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "#5a3a1a", letterSpacing: "0.28em", textAlign: "center" }}>PRECINCT 14<br />FIELD DIVISION</div>
            <div style={{ width: "52px", height: "52px", border: "2px solid rgba(90,58,26,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Special Elite, serif", fontSize: "20px", color: "#5a3a1a" }}>◎</div>
          </div>
        </div>
      );
    }
    const cr = solvedCases.find(c => c.caseId === pg);
    const meta = CASES_CATALOG.find(m => m.caseId === pg);
    const nbData = NOTEBOOK_CASES[pg as string];
    if (!cr) return null;
    const photos = nbData?.photos ?? [];
    const pgIdx = solvedIds.indexOf(pg as string);
    return (
      <div className="flex-1 relative overflow-hidden p-5" style={{ background: "linear-gradient(to right,#c8a478 0%,#d4b086 30%,#dfc090 55%,#d4b086 80%,#c2966e 100%)", borderRight: "2px solid #5a3a1a" }}>
        <div className="absolute inset-0 pointer-events-none" style={ruledLines} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle 0.4px at 1px 1px, rgba(80,50,18,0.18) 0, transparent 0)", backgroundSize: "3px 3px", opacity: 0.6 }} />
        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: "32px", background: "linear-gradient(to right, rgba(45,18,3,0.28) 0%, rgba(45,18,3,0.08) 60%, transparent 100%)" }} />
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "28px", background: "linear-gradient(to bottom, rgba(45,18,3,0.22) 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: "36px", background: "linear-gradient(to top, rgba(45,18,3,0.25) 0%, transparent 100%)" }} />
        <div className="absolute pointer-events-none" style={{ right: "8%", bottom: "12%", width: "72px", height: "72px", borderRadius: "50%", border: "3px solid rgba(80,50,18,0.28)", boxShadow: "inset 0 0 16px rgba(80,50,18,0.08)", transform: "rotate(-10deg) scaleX(1.35)" }} />
        <div className="relative z-10 h-full flex flex-col">
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "14px", color: "#5a3a1a", letterSpacing: "0.1em", marginBottom: "12px", opacity: 0.65, flexShrink: 0 }}>EXHIBIT LOG — {(meta?.title ?? pg).toUpperCase()}</div>
          <div style={{ flex: 1, overflowY: "auto", minHeight: 0, scrollbarWidth: "none" as const }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "8px" }}>
              {photos.map((photo, i) => (
                <div key={i} style={{ display: "flex", justifyContent: photo.align }}>
                  <div style={{ transform: `rotate(${photo.rot}deg)`, backgroundColor: "#f2ede2", padding: "5px 5px 22px", boxShadow: "3px 4px 14px rgba(0,0,0,0.45)" }}>
                    <img src={photo.url} alt={photo.label} style={{ width: "140px", height: "95px", objectFit: "cover", filter: "grayscale(0.45) contrast(1.1) brightness(0.95)", display: "block" }} />
                    <div style={{ fontFamily: "Caveat, cursive", fontSize: "12px", color: "#5a3a1a", marginTop: "4px", textAlign: "center" }}>{photo.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={goBack} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "5px", fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "rgba(90,58,26,0.45)", letterSpacing: "0.15em", background: "none", border: "none", cursor: "pointer", marginTop: "10px", paddingTop: "8px", borderTop: "1px dashed rgba(80,50,18,0.18)" }}>
            ◂◂ {pgIdx === 0 ? "INDEX" : "PREV CASE"}
          </button>
        </div>
      </div>
    );
  };

  const renderRight = (pg: "index" | string): React.ReactNode => {
    const pgIdx = solvedIds.indexOf(pg as string);
    const pgCanGoForward = pg === "index" ? solvedIds.length > 0 : pgIdx < solvedIds.length - 1;
    if (pg === "index") {
      return (
        <div className="flex-1 relative overflow-hidden p-6" style={{ background: "linear-gradient(160deg,#ecdab0 0%,#e8d4a0 55%,#e0ca88 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" style={ruledLines} />
          <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 42px 42px 0", borderColor: "transparent #b88e30 transparent transparent", opacity: 0.45 }} />
          <div className="absolute pointer-events-none" style={{ right: "14%", bottom: "20%", width: "52px", height: "46px", borderRadius: "52% 40% 58% 42%", border: "2px solid rgba(80,50,18,0.11)", transform: "rotate(18deg) scaleX(1.5)", opacity: 0.65 }} />
          <TabMarkers active="A" />
          <div className="relative z-10 h-full flex flex-col pr-6">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px", flexShrink: 0 }}>
              <div>
                <div style={{ fontFamily: "Caveat, cursive", fontSize: "30px", color: "#3a2010", fontWeight: 700, marginBottom: "2px" }}>Case Index</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "#5a3a1a", letterSpacing: "0.18em", opacity: 0.7 }}>SOLVED CASES — PRECINCT 14</div>
              </div>
              <div style={{ transform: "rotate(2.5deg)", border: "1.5px solid rgba(90,58,26,0.38)", padding: "4px 9px", backgroundColor: "rgba(90,58,26,0.05)", flexShrink: 0, marginTop: "3px" }}>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: "rgba(90,58,26,0.48)", letterSpacing: "0.15em" }}>CASES SOLVED</div>
                <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#5a3a1a", textAlign: "center", lineHeight: 1 }}>{solvedCases.length}</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" as const, minHeight: 0 }}>
              {solvedCases.length === 0 ? (
                <div style={{ fontFamily: "Caveat, cursive", fontSize: "21px", color: "rgba(90,58,26,0.42)", marginTop: "48px", textAlign: "center", lineHeight: 1.7 }}>
                  No cases solved yet.<br /><span style={{ fontSize: "15px" }}>Complete your first case to see it here.</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  {solvedCases.map((c, i) => {
                    const meta = CASES_CATALOG.find(m => m.caseId === c.caseId);
                    const sp = STAMP_PALETTE[c.finalVerdict ?? "VERIFY"];
                    return (
                      <div key={c.caseId}>
                        <button onClick={() => navigate(c.caseId, "forward")} style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: "none", padding: "9px 0 9px 10px", cursor: "pointer", textAlign: "left", borderLeft: `3px solid ${sp.color}`, width: "100%" }}>
                          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(90,58,26,0.5)", flexShrink: 0 }}>{i + 1}.</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "Special Elite, serif", fontSize: "12px", color: "#3a2010", letterSpacing: "0.07em" }}>{meta?.title ?? c.caseId}</div>
                            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8px", color: "rgba(90,58,26,0.5)", letterSpacing: "0.12em", marginTop: "1px" }}>#{c.caseId} · {c.finalVerdict}</div>
                          </div>
                          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "11px", color: "rgba(90,58,26,0.35)", flexShrink: 0, paddingRight: "4px" }}>▸</span>
                        </button>
                        <div style={{ borderBottom: "1px dashed rgba(80,50,18,0.2)", marginLeft: "10px" }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ flex: "0 0 auto", minHeight: "28px", position: "relative", pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: "12%", top: "30%", width: "44px", height: "38px", borderRadius: "48% 52% 55% 45%", border: "1.5px solid rgba(80,50,18,0.09)", transform: "rotate(-14deg) scaleX(1.4)", opacity: 0.7 }} />
              <div style={{ position: "absolute", right: "18%", top: "55%", width: "26px", height: "22px", borderRadius: "50%", border: "1px solid rgba(80,50,18,0.07)", transform: "rotate(8deg) scaleX(1.7)", opacity: 0.6 }} />
            </div>
            {pgCanGoForward && (
              <button onClick={goForward} style={{ marginTop: "6px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px", fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "rgba(90,58,26,0.45)", letterSpacing: "0.15em", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>FIRST CASE ▸▸</button>
            )}
          </div>
        </div>
      );
    }
    const cr = solvedCases.find(c => c.caseId === pg);
    const meta = CASES_CATALOG.find(m => m.caseId === pg);
    const nbData = NOTEBOOK_CASES[pg as string];
    if (!cr) return null;
    const sp = STAMP_PALETTE[cr.finalVerdict ?? "VERIFY"];
    const baseEvidence = nbData?.evidenceItems ?? [];
    const extraEvidence = (cr.discoveredFindings ?? []).map(f => {
      const toolLabel = content.toolsData.find(t => t.id === f.toolId)?.label ?? f.toolId.toUpperCase();
      return `[${toolLabel}] ${f.text}`;
    });
    const evidenceItems = [...baseEvidence, ...extraEvidence];
    const suspicion = suspicionFor(cr.finalVerdict);
    const meterColor = suspicion > 75 ? "#8a2810" : suspicion > 50 ? "#c9a227" : "#3a6828";
    return (
      <div className="flex-1 relative overflow-hidden p-6" style={{ background: "linear-gradient(to right,#e8d5a3 0%,#e0c896 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={ruledLines} />
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 42px 42px 0", borderColor: "transparent #b88e30 transparent transparent", opacity: 0.45 }} />
        <TabMarkers active="B" />
        <div style={{ position: "absolute", right: "28px", bottom: "50px", fontFamily: "Caveat, cursive", fontSize: "14px", color: "#8a2810", border: "2px solid #8a2810", borderRadius: "50%", padding: "8px 6px", lineHeight: 1.5, transform: "rotate(8deg)", textAlign: "center", width: "78px", pointerEvents: "none" }}>check the<br />source first!</div>
        <div className="relative z-10 h-full flex flex-col pr-7">
          <div style={{ fontFamily: "Caveat, cursive", fontSize: "25px", color: "#3a2010", fontWeight: 700, marginBottom: "1px" }}>Case Notes — {meta?.title ?? pg}</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8px", color: "#5a3a1a", letterSpacing: "0.14em", marginBottom: "12px", opacity: 0.65 }}>#{cr.caseId} · PAGE {pgIdx + 1} OF {solvedIds.length}</div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-16" style={{ scrollbarWidth: "none" as const, minHeight: 0 }}>
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.55)", letterSpacing: "0.22em", marginBottom: "6px" }}>◈ EVIDENCE COLLECTED</div>
              <div className="flex flex-col gap-1">
                {evidenceItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                    <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "11px", color: "#3a6828", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "Caveat, cursive", fontSize: "15px", color: "#3a2010", lineHeight: 1.35 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.55)", letterSpacing: "0.22em", marginBottom: "6px" }}>◉ SUSPICION METER</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, height: "9px", backgroundColor: "rgba(90,58,26,0.14)", border: "1px solid rgba(90,58,26,0.22)" }}>
                  <div style={{ width: `${suspicion}%`, height: "100%", backgroundColor: meterColor }} />
                </div>
                <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a2010", flexShrink: 0 }}>{suspicion}%</span>
              </div>
              <div style={{ fontFamily: "Caveat, cursive", fontSize: "13px", color: "rgba(90,58,26,0.52)", marginTop: "3px" }}>{suspicion > 75 ? "High — strong red flags identified" : suspicion > 50 ? "Moderate — some concerns noted" : "Low — content appeared credible"}</div>
            </div>
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.55)", letterSpacing: "0.22em", marginBottom: "6px" }}>◐ DECISION</div>
              <div style={{ display: "inline-flex", alignItems: "center", border: `1.5px solid ${sp.color}`, backgroundColor: sp.bg, padding: "5px 14px" }}>
                <span style={{ fontFamily: "Special Elite, serif", fontSize: "14px", color: sp.color, letterSpacing: "0.16em" }}>{cr.finalVerdict}</span>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.55)", letterSpacing: "0.22em", marginBottom: "6px" }}>◫ REASONING NOTES</div>
              <textarea value={cr.notebookNotes ?? ""} onChange={(e) => onUpdateNotes(cr.caseId, e.target.value)} placeholder="Write your reasoning here..." rows={4} style={{ width: "100%", resize: "none", fontFamily: "Caveat, cursive", fontSize: "16px", color: "#3a2010", backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(90,58,26,0.3)", padding: "6px 8px", outline: "none", lineHeight: 1.5 }} />
            </div>
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.55)", letterSpacing: "0.22em", marginBottom: "6px" }}>◻ FINAL VERDICT</div>
              <div style={{ fontFamily: "Caveat, cursive", fontSize: "19px", color: "#3a2010", fontWeight: 700 }}>CASE CLOSED — {VERDICT_PAST[cr.finalVerdict ?? "VERIFY"]}</div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(90,58,26,0.4)", letterSpacing: "0.14em", marginTop: "2px" }}>See full report in Investigation Records</div>
            </div>
          </div>
          {pgCanGoForward && (
            <button onClick={goForward} style={{ position: "absolute", bottom: "16px", right: "32px", display: "flex", alignItems: "center", gap: "5px", fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "rgba(90,58,26,0.45)", letterSpacing: "0.15em", background: "none", border: "none", cursor: "pointer" }}>NEXT CASE ▸▸</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#07090f" }}>

      {/* ── Header (fix 4): gradient bg + glow underline + flanked icon ── */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, rgba(6,7,14,0.98) 0%, rgba(16,11,3,0.98) 100%)",
          borderBottom: "1px solid rgba(201,162,39,0.28)",
          boxShadow: "0 1px 0 rgba(201,162,39,0.16), 0 3px 16px rgba(201,162,39,0.06)",
          zIndex: 150,
        }}
      >
        <button
          onClick={onBack}
          style={{ fontFamily: "Special Elite, serif", fontSize: "22px", letterSpacing: "0.15em", color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent", padding: "4px 12px", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
        >← BUREAU</button>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <span style={{ fontFamily: "Special Elite, serif", fontSize: "14px", color: "rgba(201,162,39,0.3)", lineHeight: 1 }}>⊠</span>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "11px", color: "#b8a878", letterSpacing: "0.28em" }}>NOTEBOOK</span>
          <span style={{ fontFamily: "Special Elite, serif", fontSize: "14px", color: "rgba(201,162,39,0.3)", lineHeight: 1 }}>⊠</span>
        </div>
        <div style={{ width: "128px" }} />
      </div>

      {/* ── Book area ── */}
      <div className="flex-1 flex items-center justify-center p-5" style={{ background: "radial-gradient(ellipse at center,#191008 0%,#07090f 100%)" }}>
        <div style={{ position: "relative", height: "88%", width: "100%", maxWidth: "960px" }}>

          {/* Ground shadow */}
          <div style={{ position: "absolute", bottom: "-30px", left: "6%", right: "6%", height: "55px", zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 65%)", filter: "blur(10px)" }} />

          {/* Right fore-edge page stack */}
          <div style={{ position: "absolute", right: "10px", top: "1.5%", bottom: "1.5%", width: "12px", zIndex: 1, pointerEvents: "none", background: "repeating-linear-gradient(to right, rgba(232,213,163,0.9) 0px, rgba(232,213,163,0.9) 1px, rgba(210,188,140,0.5) 1px, rgba(210,188,140,0.5) 2px, transparent 2px, transparent 3px)", transform: "translateX(12px)", boxShadow: "2px 0 6px rgba(0,0,0,0.4)" }} />

          {/* Bottom fore-edge page stack */}
          <div style={{ position: "absolute", bottom: "0px", left: "2%", right: "2%", height: "10px", zIndex: 1, pointerEvents: "none", background: "repeating-linear-gradient(to bottom, rgba(232,213,163,0.8) 0px, rgba(232,213,163,0.8) 1px, rgba(210,188,140,0.45) 1px, rgba(210,188,140,0.45) 2px, transparent 2px, transparent 3px)", transform: "translateY(10px)", boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />

          {/* Book — flat (no rotateX tilt), depth from shadow only */}
          <div className="flex" style={{ height: "100%", boxShadow: "0 28px 80px rgba(0,0,0,0.9), 0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.18)", position: "relative", zIndex: 2 }}>

            {/* Leather spine — deepened crease shadow so center reads as a real binding */}
            <div style={{ width: "18px", flexShrink: 0, position: "relative", background: "linear-gradient(to right, #1a0d03, #2a1608 45%, #3d2212 65%, #2a1608)", boxShadow: "inset -7px 0 16px rgba(0,0,0,0.85), inset 2px 0 4px rgba(255,255,255,0.03), 6px 0 18px rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.55)", zIndex: 3 }}>
              {[18, 34, 50, 66, 82].map(pct => (
                <div key={pct} style={{ position: "absolute", left: "50%", top: `${pct}%`, transform: "translate(-50%,-50%)", width: "5px", height: "2px", backgroundColor: "rgba(201,162,39,0.22)" }} />
              ))}
            </div>

            {/* Pages area — perspective pivot at spine (50% = center crease) */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden", perspective: "1300px", perspectiveOrigin: "50% 50%" }}>

              {/* Paper backing */}
              <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(to right, #ddc898 0%, #edddb0 40%, #f4e8c8 55%, #edddb0 75%, #ddc898 100%)" }} />

              {/* Shadow sweep — travels across pages as the turn animates */}
              <motion.div
                key={`sw-${shadowKey}`}
                initial={{ opacity: 0.5, x: pageDir === "forward" ? "-30%" : "30%" }}
                animate={{ opacity: 0, x: pageDir === "forward" ? "110%" : "-110%" }}
                transition={{ duration: 0.52, ease: [0.42, 0, 0.58, 1] }}
                style={{
                  position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none",
                  background: pageDir === "forward"
                    ? "linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.15) 35%, transparent 65%)"
                    : "linear-gradient(to left, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.15) 35%, transparent 65%)",
                }}
              />
              {/* Crease shadow — lifting page casts a soft shadow onto the static page beneath it */}
              <motion.div
                key={`cs-${shadowKey}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.52, ease: [0.42, 0, 0.58, 1] }}
                style={{
                  position: "absolute", top: 0, bottom: 0, zIndex: 18, pointerEvents: "none",
                  left: pageDir === "forward" ? "calc(50% - 18px)" : "calc(50% - 18px)",
                  width: "36px",
                  background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, transparent 70%)",
                  filter: "blur(5px)",
                }}
              />

              {/* Static backdrop — always renders the destination spread; z-index 1 (underneath) */}
              <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 1 }}>
                {renderLeft(currentPage)}
                {renderRight(currentPage)}
              </div>

              {/* Turning page — only the physically turning half; no clipPath, pure rotateY on its own element */}
              {isFlipping && prevPage !== null && (
                <motion.div
                  key={flipKey}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: pageDir === "forward" ? -180 : 180 }}
                  onAnimationComplete={() => setIsFlipping(false)}
                  transition={{ duration: 0.52, ease: [0.42, 0, 0.58, 1] }}
                  style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    left: pageDir === "forward" ? "50%" : 0,
                    width: "50%",
                    transformOrigin: pageDir === "forward" ? "0% 50%" : "100% 50%",
                    backfaceVisibility: "hidden",
                    pointerEvents: "none",
                    zIndex: 5,
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  {pageDir === "forward" ? renderRight(prevPage) : renderLeft(prevPage)}
                </motion.div>
              )}

              
            </div>

            {/* Right leather cover edge */}
            <div style={{ width: "10px", flexShrink: 0, background: "linear-gradient(to right,#3a2010,#2a1608)", boxShadow: "inset 2px 0 6px rgba(0,0,0,0.4)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}