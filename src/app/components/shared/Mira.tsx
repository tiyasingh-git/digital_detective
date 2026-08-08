import { motion } from "motion/react";

export function MiraPortrait({ size = 50 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      border: "1px solid rgba(201,162,39,0.55)",
      backgroundColor: "#08090f",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Shoulder base */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "38%", background: "linear-gradient(to top, rgba(201,162,39,0.12), transparent)", borderTop: "1px solid rgba(201,162,39,0.2)" }} />
      {/* Neck */}
      <div style={{ position: "absolute", bottom: "34%", left: "50%", transform: "translateX(-50%)", width: "18%", height: "10%", backgroundColor: "rgba(201,162,39,0.08)" }} />
      {/* Head silhouette */}
      <div style={{ position: "absolute", top: "14%", left: "50%", transform: "translateX(-50%)", width: "42%", height: "44%", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "rgba(201,162,39,0.06)" }} />
      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 3, left: 3, width: 6, height: 6, borderTop: "1px solid rgba(201,162,39,0.7)", borderLeft: "1px solid rgba(201,162,39,0.7)" }} />
      <div style={{ position: "absolute", top: 3, right: 3, width: 6, height: 6, borderTop: "1px solid rgba(201,162,39,0.7)", borderRight: "1px solid rgba(201,162,39,0.7)" }} />
      <div style={{ position: "absolute", bottom: 3, left: 3, width: 6, height: 6, borderBottom: "1px solid rgba(201,162,39,0.7)", borderLeft: "1px solid rgba(201,162,39,0.7)" }} />
      <div style={{ position: "absolute", bottom: 3, right: 3, width: 6, height: 6, borderBottom: "1px solid rgba(201,162,39,0.7)", borderRight: "1px solid rgba(201,162,39,0.7)" }} />
      {/* Label */}
      <div style={{ position: "absolute", bottom: 3, left: 0, right: 0, textAlign: "center", fontFamily: "Courier Prime, monospace", fontSize: "5px", color: "rgba(201,162,39,0.55)", letterSpacing: "0.18em" }}>MIRA</div>
    </div>
  );
}


export function MiraPopup({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
    >
      {/* Speech bubble */}
      <div style={{ flex: 1, backgroundColor: "#07090f", border: "1px solid rgba(201,162,39,0.3)", padding: "10px 14px", position: "relative" }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "6.5px", color: "#00e9ff", letterSpacing: "0.22em", marginBottom: "5px", opacity: 0.8 }}>COMMANDER MIRA</div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "rgba(0,233,255,0.72)", lineHeight: 1.75 }}>{message}</div>
        {/* Tail pointing right toward portrait */}
        <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%) rotate(45deg)", width: 10, height: 10, backgroundColor: "#07090f", borderRight: "1px solid rgba(201,162,39,0.3)", borderTop: "1px solid rgba(201,162,39,0.3)" }} />
      </div>
      <MiraPortrait size={50} />
    </motion.div>
  );
}
