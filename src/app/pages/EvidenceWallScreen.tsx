import type { CaseRecord } from "../types";
import { CASES_CATALOG } from "../data/casesData";

export const WALL_NODE_POSITIONS = [
  { x: 12, y: 12, color: "#c9a227" },
  { x: 58, y: 20, color: "#e74c3c" },
  { x: 28, y: 50, color: "#9b59b6" },
  { x: 72, y: 38, color: "#c9b882" },
  { x: 44, y: 64, color: "#c9a227" },
  { x: 80, y: 58, color: "#e74c3c" },
  { x: 16, y: 72, color: "#c9b882" },
];


export function EvidenceWallScreen({ cases }: { cases: CaseRecord[] }) {
  const solvedCases = cases.filter(c => c.status === "closed-solved");
  const activeNodes = solvedCases.map((c, i) => {
    const pos = WALL_NODE_POSITIONS[i % WALL_NODE_POSITIONS.length];
    const meta = CASES_CATALOG.find(m => m.caseId === c.caseId);
    return { id: i, label: meta?.title ?? c.caseId, x: pos.x, y: pos.y, color: pos.color };
  });
  const activeStrings: [number, number][] = activeNodes.length > 1
    ? activeNodes.slice(1).map((_, i) => [i, i + 1] as [number, number])
    : [];
  const shadowProgress = Math.min(100, Math.round((solvedCases.length / Math.max(CASES_CATALOG.length, 1)) * 100));

  return (
    <div className="flex flex-col h-full" style={{ background: "#060810" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(201,162,39,0.15)", flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#c9a227", letterSpacing: "0.07em" }}>
            CONSPIRACY BOARD — THE SHADOW NETWORK
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.14em", marginTop: "2px" }}>
            OVERARCHING CONNECTIONS · CLUES PINNED FROM CLOSED CASES
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#6b5f42", letterSpacing: "0.1em" }}>STORY PROGRESSION</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#c9a227", letterSpacing: "0.05em" }}>{shadowProgress}% UNCOVERED</div>
        </div>
      </div>

      {/* Cork wall */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg,#191008 0%,#100c05 100%)",
          backgroundImage: "radial-gradient(circle 1px at 16px 16px, rgba(201,162,39,0.04) 0, transparent 0)",
          backgroundSize: "16px 16px",
        }} />

        {/* SVG strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {activeStrings.map(([a, b], i) => {
            const pa = activeNodes.find((n) => n.id === a)!;
            const pb = activeNodes.find((n) => n.id === b)!;
            if (!pa || !pb) return null;
            return (
              <line key={i}
                x1={`${pa.x + 4}%`} y1={`${pa.y + 2}%`}
                x2={`${pb.x + 4}%`} y2={`${pb.y + 2}%`}
                stroke={i % 4 === 0 ? "rgba(200,20,20,0.75)" : i % 4 === 1 ? "rgba(200,20,20,0.5)" : "rgba(200,20,20,0.35)"}
                strokeWidth={i % 4 === 0 ? "1.6" : "0.9"}
              />
            );
          })}
          {/* No selection rings — wall is reference only */}
        </svg>

        {/* Empty state */}
        {activeNodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Special Elite, serif", fontSize: "18px", color: "rgba(201,162,39,0.22)", letterSpacing: "0.1em", marginBottom: "8px" }}>NO EVIDENCE YET</div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.18)", letterSpacing: "0.2em" }}>SOLVE YOUR FIRST CASE TO PIN EVIDENCE HERE</div>
            </div>
          </div>
        )}

        {/* Evidence nodes — one per solved case, read-only */}
        {activeNodes.map((node) => {
          const rot = ((node.id * 7) % 9) - 4;
          return (
            <div key={node.id} className="absolute" style={{ left: `${node.x}%`, top: `${node.y + 4}%` }}>
              <div
                style={{
                  backgroundColor: "#e2cfae",
                  padding: "5px 8px",
                  minWidth: "78px",
                  transform: `rotate(${rot}deg)`,
                  boxShadow: `0 0 0 1px ${node.color}45, 3px 4px 12px rgba(0,0,0,0.72)`,
                  cursor: "default",
                  position: "relative",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = `rotate(0deg) scale(1.05)`}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = `rotate(${rot}deg) scale(1)`}
              >
                <div style={{ position: "absolute", top: "-5px", left: "50%", transform: "translateX(-50%)", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: node.color, boxShadow: `0 0 5px ${node.color}80` }} />
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#1a1005", textAlign: "center", lineHeight: 1.45 }}>{node.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center px-5 py-2.5" style={{ borderTop: "1px solid rgba(201,162,39,0.15)", flexShrink: 0 }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.08em" }}>
          CONNECTIONS: {activeStrings.length} · FLAGGED NODES: {activeNodes.filter(n => n.color === "#e74c3c").length}
        </div>
      </div>
    </div>
  );
}