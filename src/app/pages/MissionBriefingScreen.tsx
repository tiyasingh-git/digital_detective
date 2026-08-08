import { motion } from "motion/react";

import { MiraPopup } from "../components/shared/Mira";
import { CASES_CATALOG } from "../data/casesData";
import { MIRA_MISSION_INTRO } from "../data/investigationData";

export function MissionBriefingScreen({
  caseId, onAccept, onBack,
}: {
  caseId: string;
  onAccept: () => void;
  onBack: () => void;
}) {
  const meta = CASES_CATALOG.find(m => m.caseId === caseId)!;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-auto py-8"
      style={{ background: "radial-gradient(ellipse at center, #0f0c08 0%, #07090f 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: "min(580px, 93vw)", flexShrink: 0 }}
      >
        {/* Red-flagged notification strip */}
        <div style={{
          backgroundColor: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.45)",
          borderBottom: "none",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="dot-pulse" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#ef4444", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "0.26em", color: "#ef4444" }}>PRIORITY · HIGH</div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.12em", color: "#c9b882", marginTop: "2px" }}>
                CLASSIFICATION: ACTIVE INVESTIGATION · REACH: NATIONAL
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.14em", color: "rgba(201,162,39,0.55)", flexShrink: 0 }}>
            CASE {caseId}
          </div>
        </div>

        {/* Case-document panel — same cream paper as recruitment letter */}
        <div style={{
          background: "linear-gradient(170deg,#ead7b4 0%,#d9c49c 100%)",
          padding: "clamp(22px,4vw,44px) clamp(20px,5vw,44px)",
          position: "relative",
          boxShadow: "0 32px 100px rgba(0,0,0,0.92), 0 0 0 1px rgba(201,162,39,0.26)",
        }}>
          {/* Bottom paper edge */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"4px", background:"linear-gradient(to right,#a87c48,#c0a86c,#9e6f38,#c0a86c,#a87c48)" }} />

          {/* Classification header */}
          <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", letterSpacing:"0.3em", color:"#5a3a1a", textAlign:"center", marginBottom:"18px", opacity:0.6 }}>
            BUREAU OF DIGITAL INVESTIGATIONS · PRECINCT 14 · CONFIDENTIAL
          </div>

          {/* Case title stamp */}
          <div style={{ display:"inline-block", transform:"rotate(-2deg)", marginBottom:"18px", borderBottom:"2px solid rgba(90,58,26,0.28)", paddingBottom:"10px" }}>
            <div style={{ fontFamily:"Special Elite,serif", fontSize:"9px", color:"#5a3a1a", letterSpacing:"0.2em", marginBottom:"4px", opacity:0.7 }}>MISSION BRIEFING</div>
            <div style={{ fontFamily:"Special Elite,serif", fontSize:"20px", color:"#1a1005", letterSpacing:"0.07em", lineHeight:1.2 }}>{meta.title}</div>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", color:"#5a3a1a", letterSpacing:"0.18em", marginTop:"4px", opacity:0.65 }}>REF: {caseId}</div>
          </div>

          {/* Case teaser */}
          <div style={{ border:"1px solid rgba(90,58,26,0.18)", backgroundColor:"rgba(90,58,26,0.03)", padding:"12px 14px" }}>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"10px", color:"#2a1a0a", lineHeight:1.9 }}>
              {meta.teaser ?? "Details classified until formal assignment."}
            </div>
          </div>
        </div>

        {/* Commander Mira briefing — outside parchment, on dark bg */}
        <div style={{ padding:"18px 4px 0" }}>
          <MiraPopup message={MIRA_MISSION_INTRO} />
        </div>

        {/* Action row */}
        <div style={{ display:"flex", gap:"12px", alignItems:"center", justifyContent:"space-between", padding:"18px 4px 0" }}>
          <button onClick={onBack} style={{
            fontFamily:"Courier Prime,monospace", fontSize:"8.5px", letterSpacing:"0.16em",
            color:"rgba(201,162,39,0.45)", backgroundColor:"transparent",
            border:"1px solid rgba(201,162,39,0.22)", padding:"8px 18px", cursor:"pointer",
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(201,162,39,0.8)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(201,162,39,0.45)"}
          >← DECLINE</button>

          <button onClick={onAccept} style={{
            fontFamily:"Special Elite,serif", fontSize:"14px", letterSpacing:"0.22em",
            color:"#07090f",
            border:"2px solid rgba(201,162,39,0.7)",
            backgroundColor:"rgba(201,162,39,0.88)",
            padding:"11px 32px", cursor:"pointer", transition:"all 0.18s",
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,162,39,0.88)"}
          >ACCEPT MISSION</button>
        </div>
      </motion.div>
    </div>
  );
}
