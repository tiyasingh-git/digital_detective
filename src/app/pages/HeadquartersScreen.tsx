import type { Screen } from "../types";
import { Rain } from "../components/investigation/Rain";

export const CORK_ITEMS = [
  { id: 1, label: "VIRAL POST — CAP", x: 6, y: 9, rot: -3 },
  { id: 2, label: "@HLTHTRUTH22", x: 22, y: 4, rot: 2 },
  { id: 3, label: "SOURCE CHECK", x: 40, y: 11, rot: -1 },
  { id: 4, label: "NO STUDY FOUND", x: 57, y: 6, rot: 4 },
  { id: 5, label: "WEBSITE AUDIT", x: 71, y: 13, rot: -2 },
  { id: 6, label: "EXPERT — OSEI", x: 16, y: 42, rot: 3 },
  { id: 7, label: "SHARE CHAIN", x: 44, y: 50, rot: -4 },
  { id: 8, label: "VITABOOST LINK", x: 67, y: 44, rot: 2 },
];


export const CORK_STRINGS = [[1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [2, 6], [3, 7], [4, 7], [5, 8], [6, 7], [7, 8]];


export function HeadquartersScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const getCenter = (id: number) => {
    const item = CORK_ITEMS.find((i) => i.id === id);
    return item ? { x: item.x + 5, y: item.y + 3.5 } : { x: 0, y: 0 };
  };

  return (
    <div className="flex h-full">
      {/* Rain window left */}
      <div className="flex-shrink-0 relative overflow-hidden" style={{ width: "160px", borderRight: "1px solid rgba(201,162,39,0.1)", background: "linear-gradient(180deg,#030810 0%,#050d14 100%)" }}>
        <Rain />
        {/* Window frame */}
        <div className="absolute inset-4 pointer-events-none" style={{ border: "1px solid rgba(201,162,39,0.18)" }}>
          <div className="absolute inset-x-0" style={{ top: "50%", borderTop: "1px solid rgba(201,162,39,0.12)" }} />
          <div className="absolute inset-y-0" style={{ left: "50%", borderLeft: "1px solid rgba(201,162,39,0.12)" }} />
        </div>
        {/* Condensation blur on glass */}
        <div className="absolute inset-4 pointer-events-none" style={{ backdropFilter: "blur(0.5px)" }} />
        {/* NPC silhouette */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ filter: "blur(1.5px)", opacity: 0.85 }}>
          <svg width="38" height="68" viewBox="0 0 38 68" fill="#04080e">
            <ellipse cx="19" cy="11" rx="9" ry="10" />
            <rect x="9" y="20" width="20" height="33" rx="3" />
            <rect x="2" y="23" width="8" height="26" rx="4" />
            <rect x="28" y="23" width="8" height="26" rx="4" />
            <rect x="9" y="52" width="7" height="16" rx="3" />
            <rect x="22" y="52" width="7" height="16" rx="3" />
          </svg>
        </div>
        <div className="absolute bottom-4 inset-x-0 text-center" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.1em" }}>
          CDR. MIRA
        </div>
      </div>

      {/* Corkboard center */}
      <div className="flex-1 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#191008 0%,#140e06 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle 1px at 18px 18px, rgba(201,162,39,0.06) 0, transparent 0)",
          backgroundSize: "18px 18px",
        }} />
        <div className="absolute top-3 left-4" style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#c9a227", letterSpacing: "0.07em" }}>
          BUREAU HQ — OPERATIONS BOARD
        </div>

        {/* SVG strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {CORK_STRINGS.map(([a, b], i) => {
            const pa = getCenter(a), pb = getCenter(b);
            return (
              <line key={i}
                x1={`${pa.x}%`} y1={`${pa.y}%`}
                x2={`${pb.x}%`} y2={`${pb.y}%`}
                stroke={i % 3 === 0 ? "rgba(192,18,18,0.7)" : "rgba(192,18,18,0.38)"}
                strokeWidth={i % 3 === 0 ? "1.4" : "0.9"}
              />
            );
          })}
        </svg>

        {/* Cards */}
        {CORK_ITEMS.map((item) => (
          <div key={item.id} className="absolute" style={{ left: `${item.x}%`, top: `${item.y + 10}%`, transform: `rotate(${item.rot}deg)`, zIndex: 2 }}>
            <div style={{
              backgroundColor: "#e2cfae",
              padding: "5px 9px",
              width: "88px",
              boxShadow: "2px 4px 14px rgba(0,0,0,0.65)",
              position: "relative",
            }}>
              <div style={{ position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#c9a227", boxShadow: "0 0 5px #c9a22790" }} />
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#1a1005", letterSpacing: "0.07em", lineHeight: 1.5 }}>{item.label}</div>
            </div>
          </div>
        ))}

        {/* Navigation / Room doors */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-3 px-6">
          {[
            { id: "case-select", label: "MISSION BOARD", icon: "◎", locked: false, badge: true },
            { id: "notebook", label: "NOTEBOOK", icon: "⊞", locked: false },
            { id: "handbook", label: "HANDBOOK", icon: "◈", locked: false },
            { id: "evidence-wall", label: "EVIDENCE WALL", icon: "◉", locked: false },
            { id: "profile", label: "PROFILE", icon: "▲", locked: false },
            { id: "settings", label: "SETTINGS", icon: "▼", locked: false },
            { id: "archive", label: "ARCHIVE", icon: "■", locked: true },
            { id: "comms", label: "COMMS", icon: "◆", locked: true },
          ].map((tab, i) => (
            <div key={i} className="transition-all relative" style={{
              border: "1px solid rgba(201,162,39,0.2)",
              padding: "7px 12px",
              backgroundColor: "rgba(7,9,15,0.75)",
              cursor: tab.locked ? "not-allowed" : "pointer",
              opacity: tab.locked ? 0.4 : 1,
            }}
              onClick={() => !tab.locked && onNavigate(tab.id as Screen)}
              onMouseEnter={(e) => { if (!tab.locked) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.55)"; (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"; } }}
              onMouseLeave={(e) => { if (!tab.locked) { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.2)"; (e.currentTarget as HTMLElement).style.textShadow = "none"; } }}
            >
              {tab.badge && (
                <div className="absolute dot-pulse" style={{ top: "-3px", right: "-3px", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#e74c3c" }} />
              )}
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#c9a227", fontSize: "9px" }}>{tab.icon}</span> {tab.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status right panel */}
      <div className="flex-shrink-0 flex flex-col" style={{ width: "130px", borderLeft: "1px solid rgba(201,162,39,0.1)", backgroundColor: "#060810" }}>
        <div className="px-3 py-2" style={{ borderBottom: "1px solid rgba(201,162,39,0.1)" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.15em" }}>CASE STATUS</div>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-4">
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.12em", marginBottom: "2px" }}>RANK</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#c9b882", letterSpacing: "0.08em" }}>DETECTIVE II</div>
          </div>
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.12em", marginBottom: "2px" }}>XP / COINS</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#c9b882", letterSpacing: "0.08em" }}>4,250 / 850</div>
          </div>
          <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.08)" }} />
          {[
            { label: "LEADS OPEN", value: "07", color: "#c9a227" },
            { label: "SUSPECTS", value: "03", color: "#e74c3c" },
            { label: "EVIDENCE", value: "12", color: "#00bfff" },
            { label: "DAYS ACTIVE", value: "04", color: "#6b5f42" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#3a3428", letterSpacing: "0.12em" }}>{s.label}</div>
              <div style={{ fontFamily: "Special Elite, serif", fontSize: "26px", color: s.color, lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="p-3" style={{ borderTop: "1px solid rgba(201,162,39,0.08)" }}>
          <div className="amber-glow" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9a227", letterSpacing: "0.1em" }}>● ACTIVE</div>
        </div>
      </div>
    </div>
  );
}
