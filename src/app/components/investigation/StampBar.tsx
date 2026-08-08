import type { Verdict } from "../../types";
import { VERDICTS } from "../../data/investigationData";

export function StampBar({ onStamp }: { onStamp: (v: Verdict) => void }) {
  return (
    <div className="flex" style={{ borderTop: "1px solid rgba(201,162,39,0.1)", backgroundColor: "rgba(4,5,12,0.92)", flexShrink: 0 }}>
      {VERDICTS.map((v, i) => (
        <button
          key={v.id}
          onClick={() => onStamp(v.id)}
          className="flex-1 py-3 group transition-all"
          style={{ borderRight: i < 3 ? "1px solid rgba(201,162,39,0.1)" : "none", cursor: "pointer" }}
        >
          <div style={{
            fontFamily: "Special Elite, serif",
            fontSize: "22px",
            letterSpacing: "0.2em",
            color: v.color,
            opacity: 1,
            transition: "opacity 0.2s, text-shadow 0.2s",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textShadow = `0 0 12px ${v.color}80`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
          >
            {v.id}
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#c9b882", letterSpacing: "0.2em", marginTop: "3px" }}>
            STAMP TO RECORD
          </div>
        </button>
      ))}
    </div>
  );
}
