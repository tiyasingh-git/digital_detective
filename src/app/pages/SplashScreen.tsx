import { useState, useEffect } from "react";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [barW, setBarW] = useState(0);

  useEffect(() => {
    // Animate bar to 100% over ~1.4s then call onDone
    let raf: number;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / duration) * 100, 100);
      setBarW(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(onDone, 180);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#07090f", cursor: "pointer" }}
      onClick={onDone}
    >
      {/* Faint badge ring behind wordmark */}
      <div style={{
        position: "absolute",
        width: "320px", height: "320px",
        border: "1px solid rgba(201,162,39,0.07)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute",
        width: "260px", height: "260px",
        border: "1px solid rgba(201,162,39,0.05)",
        borderRadius: "50%",
      }} />

      {/* Precinct stamp arc text — top */}
      <div style={{
        fontFamily: "Courier Prime, monospace",
        fontSize: "10px",
        letterSpacing: "0.35em",
        color: "rgba(201,162,39,0.35)",
        marginBottom: "18px",
        textTransform: "uppercase",
      }}>
        ·&nbsp;PRECINCT&nbsp;14&nbsp;·&nbsp;DIVISION&nbsp;OF&nbsp;DIGITAL&nbsp;INVESTIGATIONS&nbsp;·
      </div>

      {/* Main wordmark */}
      <div style={{ transform: "rotate(-4deg)", textAlign: "center" }}>
        <div
          className="amber-glow"
          style={{
            fontFamily: "Special Elite, serif",
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            color: "#ffd966",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          DIGITAL
        </div>
        <div
          className="amber-glow"
          style={{
            fontFamily: "Special Elite, serif",
            fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
            color: "#ffd966",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          DETECTIVE
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        fontFamily: "Courier Prime, monospace",
        fontSize: "9.5px",
        letterSpacing: "0.28em",
        color: "#b8a878",
        marginTop: "22px",
        marginBottom: "36px",
      }}>
        TRUTH IS EVIDENCE. EVERYTHING ELSE IS NOISE.
      </div>

      {/* Loading bar */}
      <div style={{
        width: "260px",
        height: "2px",
        backgroundColor: "rgba(201,162,39,0.12)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: `${barW}%`,
          background: "linear-gradient(to right, #c9a227, #00e9ff)",
          transition: "width 0.04s linear",
          boxShadow: "0 0 8px rgba(0,233,255,0.5)",
        }} />
      </div>

      {/* Tap hint */}
      <div style={{
        fontFamily: "Courier Prime, monospace",
        fontSize: "9.5px",
        letterSpacing: "0.2em",
        color: "rgba(201,162,39,0.3)",
        marginTop: "14px",
      }}>
        TAP TO CONTINUE
      </div>

      {/* Corner case number */}
      <div className="absolute bottom-4 right-4" style={{
        fontFamily: "Courier Prime, monospace",
        fontSize: "9px",
        letterSpacing: "0.15em",
        color: "rgba(201,162,39,0.18)",
      }}>
        VER 1.0.0 · CASE ENGINE REV 14
      </div>
    </div>
  );
}
