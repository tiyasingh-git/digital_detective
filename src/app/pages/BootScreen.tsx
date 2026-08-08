import { useState, useEffect } from "react";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0); // 0=blank 1=line1 2=line2 3=line3 4=fading

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 380);
    const t2 = setTimeout(() => setPhase(2), 1020);
    const t3 = setTimeout(() => setPhase(3), 1680);
    const t4 = setTimeout(() => onDone(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  const LINES = [
    { text: "SECURE CONNECTION ESTABLISHED", amber: false },
    { text: "Connecting to Bureau Network...",  amber: false },
    { text: "Identity Verified.",               amber: true  },
  ];

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#07090f", cursor: "pointer" }}
      onClick={onDone}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "9px", width: "min(440px, 88vw)" }}>
        {LINES.map((l, i) => (
          <div key={i} style={{
            fontFamily: "Courier Prime, monospace",
            fontSize: "13px",
            letterSpacing: "0.1em",
            color: l.amber ? "#c9a227" : "#b8a878",
            opacity: phase > i ? 1 : 0,
            transition: "opacity 0.52s ease",
            textShadow: l.amber && phase > i ? "0 0 8px rgba(201,162,39,0.55)" : "none",
            display: "flex",
            gap: "10px",
          }}>
            <span style={{ color: "rgba(201,162,39,0.38)", flexShrink: 0 }}>&gt;</span>
            <span>{l.text}</span>
          </div>
        ))}
      </div>
      {phase >= 3 && (
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.22em", color: "rgba(201,162,39,0.28)", marginTop: "36px" }}>
          TAP TO CONTINUE
        </div>
      )}
    </div>
  );
}
