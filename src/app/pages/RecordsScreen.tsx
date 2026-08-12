import type { CaseRecord } from "../types";
import { CASES_CATALOG } from "../data/casesData";
import { scoreToGrade } from "../lib/scoring";
import { computeProfileStats } from "../lib/profileStats";

export function RecordsScreen({ onBack, cases }: { onBack: () => void; cases: CaseRecord[] }) {
  const closed = cases
    .filter(c => c.status === "closed-solved" || c.status === "closed-cold")
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""));

  const { solvedCount, coldCount, avgScore, avgGrade } = computeProfileStats(cases);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "radial-gradient(ellipse at center,#191008 0%,#07090f 100%)" }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(201,162,39,0.18)", backgroundColor: "rgba(7,9,15,0.75)", flexShrink: 0 }}>
        <button onClick={onBack} style={{
          fontFamily: "Special Elite, serif", fontSize: "20px", letterSpacing: "0.15em",
          color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent",
          padding: "5px 14px", cursor: "pointer",
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
        >← BUREAU</button>
        <div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.08em" }}>DETECTIVE RECORDS</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.18em", marginTop: "2px" }}>CASE HISTORY · SCORES · CAREER SUMMARY</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">

          {/* Career summary strip */}
          <div className="flex gap-4">
            {[
              { label: "CASES SOLVED", value: `${solvedCount}` },
              { label: "COLD CASES",   value: `${coldCount}` },
              { label: "AVG SCORE",    value: avgScore !== null ? `${avgScore}%` : "—" },
              { label: "AVG GRADE",    value: avgGrade ?? "—" },
            ].map(stat => (
              <div key={stat.label} className="flex-1 flex flex-col items-center justify-center text-center" style={{ border: "1px solid rgba(201,162,39,0.2)", backgroundColor: "rgba(7,9,15,0.75)", padding: "14px" }}>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#6b5f42", letterSpacing: "0.15em", marginBottom: "6px" }}>{stat.label}</div>
                <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966" }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Case history list */}
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#ffd966", letterSpacing: "0.2em", borderBottom: "1px solid rgba(201,162,39,0.2)", paddingBottom: "8px", marginBottom: "14px" }}>
              CLOSED CASE FILES
            </div>

            {closed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16" style={{ opacity: 0.35 }}>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#c9a227", letterSpacing: "0.2em" }}>
                  NO CASES CLOSED YET
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {closed.map(c => {
                  const meta = CASES_CATALOG.find(m => m.caseId === c.caseId);
                  const score = c.finalScore ?? null;
                  const grade = score !== null ? scoreToGrade(score) : null;
                  const solved = c.status === "closed-solved";
                  return (
                    <div key={c.caseId} style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      border: "1px solid rgba(201,162,39,0.18)",
                      borderLeft: `4px solid ${solved ? "#00ff6a" : "#e74c3c"}`,
                      backgroundColor: "rgba(7,9,15,0.6)", padding: "14px 18px",
                    }}>
                      <div className="flex-1">
                        <div style={{ fontFamily: "Special Elite, serif", fontSize: "18px", color: "#c9b882", marginBottom: "3px" }}>
                          {meta?.title ?? c.caseId}
                        </div>
                        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.1em" }}>
                          {c.caseId} · {solved ? "SOLVED" : "COLD"}{c.finalVerdict ? ` · VERDICT: ${c.finalVerdict}` : ""}
                          {c.completedAt ? ` · ${new Date(c.completedAt).toLocaleDateString()}` : ""}
                        </div>
                      </div>
                      <div className="flex flex-col items-end" style={{ minWidth: "70px" }}>
                        <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966" }}>
                          {score !== null ? `${score}%` : "—"}
                        </div>
                        {grade && (
                          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#6b5f42", letterSpacing: "0.15em" }}>
                            GRADE {grade}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}