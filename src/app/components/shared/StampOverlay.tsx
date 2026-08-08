import { useEffect } from "react";
import { motion } from "motion/react";

import { motion } from "motion/react";
import type { Verdict } from "../../types";

export const STAMP_PALETTE: Record<string, { bg: string; color: string }> = {
  TRUST:  { bg: "#06170d", color: "#00ff6a" },
  VERIFY: { bg: "#150f03", color: "#f59e0b" },
  REJECT: { bg: "#160404", color: "#ef4444" },
  REPORT: { bg: "#021620", color: "#00e9ff" },
};


export function StampOverlay({ verdict, onDone }: { verdict: Verdict; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  if (!verdict) return null;
  const p = STAMP_PALETTE[verdict];

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 200, backgroundColor: "rgba(0,0,0,0.9)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        initial={{ scale: 4.5, rotate: -14, opacity: 0 }}
        animate={{ scale: 1, rotate: -7, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 550, damping: 20, mass: 1.3 }}
        style={{
          fontFamily: "Special Elite, serif",
          fontSize: "clamp(4rem, 13vw, 10rem)",
          color: p.color,
          border: `10px solid ${p.color}`,
          padding: "0.25em 0.7em",
          backgroundColor: p.bg,
          letterSpacing: "0.14em",
          lineHeight: 1,
          boxShadow: `0 0 80px ${p.color}55, inset 0 0 40px ${p.color}18`,
        }}
      >
        {verdict}
      </motion.div>
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ fontFamily: "Courier Prime, monospace", color: "#6b5f42", fontSize: "9px", letterSpacing: "0.22em" }}
      >
        VERDICT RECORDED — CASE FILE UPDATED
      </div>
    </motion.div>
  );
}
