import type { CaseRecord } from "../types";
import { CASES_CATALOG } from "../data/casesData";

export function CaseSelectScreen({
  cases, onSelect, onBrief, onBack,
}: {
  cases: CaseRecord[];
  onSelect: (caseId: string, resume: boolean) => void;
  onBrief: (caseId: string) => void;
  onBack: () => void;
}) {
  const [shakingId, setShakingId] = useState<string | null>(null);

  const handleCardClick = (c: CaseRecord) => {
    if (c.status === "locked") {
      setShakingId(c.caseId);
      setTimeout(() => setShakingId(null), 400);
      return;
    }
    if (c.status === "in-progress") { onSelect(c.caseId, true); return; }
    if (c.status === "available")   { onBrief(c.caseId); return; }
    onSelect(c.caseId, true);
  };

  const statusColor = (s: CaseStatus) =>
    s === "in-progress" ? "#00e9ff" : s === "closed-solved" ? "#00ff6a" : s === "closed-cold" ? "#e74c3c" : s === "available" ? "#c9a227" : "#3a3428";
  const statusLabel = (s: CaseStatus) =>
    s === "available" ? "AVAILABLE" : s === "in-progress" ? "IN PROGRESS" : s === "closed-solved" ? "CLOSED · SOLVED" : s === "closed-cold" ? "CLOSED · COLD" : "LOCKED";

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "linear-gradient(135deg,#191008 0%,#140e06 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle 1px at 17px 17px, rgba(201,162,39,0.05) 0, transparent 0)",
        backgroundSize: "17px 17px",
      }} />

      {/* Header */}
      <div className="relative flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(201,162,39,0.18)", backgroundColor: "rgba(7,9,15,0.65)" }}>
        <button onClick={onBack} style={{
          fontFamily: "Special Elite, serif", fontSize: "20px", letterSpacing: "0.15em",
          color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent",
          padding: "5px 14px", cursor: "pointer",
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
        >← BUREAU</button>
        <div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.08em" }}>SELECT CASE FILE</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.18em" }}>OPEN A NEW INVESTIGATION OR REVIEW CLOSED FILES</div>
        </div>
      </div>

      {/* Grid */}
      <div className="relative flex-1 overflow-y-auto p-8 flex flex-wrap gap-5 content-start justify-center" style={{ scrollbarWidth: "thin" }}>
        {cases.map((c, idx) => {
          const meta = CASES_CATALOG.find(m => m.caseId === c.caseId)!;
          const locked = c.status === "locked";
          const rot = ((idx * 5 + 2) % 7) - 3;
          return (
            <div
              key={c.caseId}
              className={shakingId === c.caseId ? "card-shake" : ""}
              style={{ "--rot": `${rot}deg` } as React.CSSProperties}
              onClick={() => handleCardClick(c)}
            >
              <div style={{
                width: "200px",
                backgroundColor: locked ? "#0d0e14" : "#e2cfae",
                padding: "14px 12px 18px",
                transform: `rotate(${rot}deg)`,
                boxShadow: locked ? "2px 4px 14px rgba(0,0,0,0.7)" : "3px 5px 16px rgba(0,0,0,0.65)",
                cursor: locked ? "not-allowed" : "pointer",
                position: "relative",
                border: locked ? "1px solid rgba(201,162,39,0.12)" : "none",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
                onMouseEnter={(e) => { if (!locked) { (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.04)`; (e.currentTarget as HTMLElement).style.boxShadow = "4px 6px 22px rgba(0,0,0,0.8)"; } }}
                onMouseLeave={(e) => { if (!locked) { (e.currentTarget as HTMLElement).style.transform = `rotate(${rot}deg) scale(1)`; (e.currentTarget as HTMLElement).style.boxShadow = "3px 5px 16px rgba(0,0,0,0.65)"; } }}
              >
                {/* Pin */}
                <div style={{ position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: statusColor(c.status), boxShadow: `0 0 5px ${statusColor(c.status)}80` }} />

                {/* Locked CLASSIFIED overlay */}
                {locked && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(7,9,15,0.0)" }}>
                    <div style={{ transform: "rotate(-20deg)", fontFamily: "Special Elite, serif", fontSize: "20px", color: "#e74c3c", border: "2px solid #e74c3c", padding: "4px 10px", opacity: 0.55, letterSpacing: "0.2em" }}>
                      CLASSIFIED
                    </div>
                  </div>
                )}

                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: locked ? "rgba(201,162,39,0.3)" : "#5a3a1a", letterSpacing: "0.1em", marginBottom: "4px" }}>
                  {c.caseId}
                </div>
                <div style={{ fontFamily: "Special Elite, serif", fontSize: locked ? "12px" : "13px", color: locked ? "rgba(201,162,39,0.2)" : "#1a1005", letterSpacing: "0.05em", lineHeight: 1.3, marginBottom: "6px" }}>
                  {locked ? "CLASSIFIED" : meta.title}
                </div>
                {!locked && meta.teaser && (
                  <div style={{ fontFamily: "Caveat, cursive", fontSize: "20px", color: "#5a3a1a", lineHeight: 1.5, marginBottom: "8px" }}>
                    {meta.teaser}
                  </div>
                )}
                {locked && (
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.2)", lineHeight: 1.5 }}>
                    SOLVE PRIOR CASE<br />TO UNLOCK
                  </div>
                )}
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: statusColor(c.status), flexShrink: 0 }} />
                  <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: locked ? "rgba(201,162,39,0.25)" : "#5a3a1a", letterSpacing: "0.1em" }}>
                    {statusLabel(c.status)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
