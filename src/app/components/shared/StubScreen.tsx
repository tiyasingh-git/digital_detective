export function StubScreen({ title, sub, onBack }: { title: string; sub: string; onBack: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: "#07090f" }}>
      <div style={{ transform: "rotate(-4deg)", textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontFamily: "Special Elite, serif", fontSize: "28px", color: "#c9a227", letterSpacing: "0.1em" }}>{title}</div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.2em", marginTop: "6px" }}>{sub}</div>
      </div>
      <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.3)", letterSpacing: "0.22em", marginBottom: "28px" }}>
        — UNDER CONSTRUCTION —
      </div>
      <button
        onClick={onBack}
        style={{
          fontFamily: "Special Elite, serif",
          fontSize: "20px",
          letterSpacing: "0.2em",
          color: "#c9a227",
          border: "1px solid rgba(201,162,39,0.4)",
          backgroundColor: "transparent",
          padding: "10px 28px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
      >
        ← BACK
      </button>
    </div>
  );
}
