import { motion } from "motion/react";

import { MiraPopup } from "../components/shared/Mira";
import { Grain, ScanLines, Vignette } from "../components/Atmosphere";

export const MIRA_ONBOARDING_MSG = "Welcome, Detective. Before we send you into the field, there's one rule every Digital Guardian must remember. Information is powerful. Used responsibly, it can save lives. Used carelessly, it can create fear, confusion, and harm. During every mission, you'll investigate clues, analyze evidence, and make a final decision. There are no trick questions. Only careful observation.";


export function MiraOnboardingScreen({ onDone }: { onDone: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "radial-gradient(ellipse at 50% 40%, #191008 0%, #07090f 100%)" }}>
      <Grain /><ScanLines /><Vignette />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{ maxWidth: "580px", width: "100%", padding: "0 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "rgba(201,162,39,0.45)", letterSpacing: "0.32em", marginBottom: "8px" }}>
            BUREAU ORIENTATION · FIELD DIVISION
          </div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "24px", color: "#c9a227", letterSpacing: "0.1em", animation: "amber-glow 2.4s ease-in-out infinite" }}>
            COMMANDER BRIEFING
          </div>
        </div>

        {/* Mira message */}
        <MiraPopup message={MIRA_ONBOARDING_MSG} />

        {/* CTA */}
        <button
          onClick={onDone}
          style={{
            fontFamily: "Special Elite, serif", fontSize: "18px", letterSpacing: "0.22em",
            color: "#07090f", backgroundColor: "#c9a227",
            border: "none", padding: "13px 48px", cursor: "pointer",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#ffd966"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#c9a227"; }}
        >
          READY?
        </button>
      </motion.div>
    </div>
  );
}