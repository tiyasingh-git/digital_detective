import { motion } from "motion/react";

import { MiraPopup } from "./Mira";
import { useCaseContent } from "../../context/CaseContentContext";


export function EvidenceExhibitModal({ evidenceId, onClose }: { evidenceId: number; onClose: () => void }) {
  const { content } = useCaseContent();
  const e = content.evidenceData.find(ev => ev.id === evidenceId)!;
  const exhibit = content.evidenceExhibits[evidenceId];
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