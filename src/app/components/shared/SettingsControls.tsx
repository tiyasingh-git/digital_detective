export function ToggleSwitch({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.18em", color: on ? "#c9a227" : "#3a3428", minWidth: "24px", textAlign: "right" }}>
        {on ? "ON" : "OFF"}
      </span>
      <button
        onClick={() => onChange(!on)}
        style={{
          width: "38px", height: "20px", position: "relative", cursor: "pointer",
          border: `1px solid ${on ? "#c9a227" : "rgba(201,162,39,0.22)"}`,
          backgroundColor: on ? "rgba(201,162,39,0.12)" : "rgba(7,9,15,0.7)",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        <div style={{
          position: "absolute", top: "2px",
          left: on ? "20px" : "2px",
          width: "14px", height: "14px",
          backgroundColor: on ? "#c9a227" : "#3a3428",
          transition: "left 0.15s, background-color 0.15s",
        }} />
      </button>
    </div>
  );
}


export function SegmentedControl({
  options, value, onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-shrink-0" style={{ border: "1px solid rgba(201,162,39,0.3)" }}>
      {options.map((opt, i) => (
        <button key={opt.id} onClick={() => onChange(opt.id)} style={{
          fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.12em",
          padding: "5px 12px",
          color: value === opt.id ? "#07090f" : "#6b5f42",
          backgroundColor: value === opt.id ? "#c9a227" : "transparent",
          border: "none",
          borderLeft: i > 0 ? "1px solid rgba(201,162,39,0.3)" : "none",
          cursor: "pointer", transition: "all 0.15s",
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}


export function SettingsSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.28em", color: "#c9a227", marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ border: "1px solid rgba(201,162,39,0.22)", backgroundColor: "rgba(7,9,15,0.75)" }}>
        {children}
      </div>
    </div>
  );
}


export function SettingsRow({
  title, desc, control,
}: {
  title: string; desc: string; control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(201,162,39,0.1)" }}>
      <div className="flex-1">
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#ffd966", letterSpacing: "0.06em", marginBottom: "2px" }}>{title}</div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#b8a878", lineHeight: 1.5 }}>{desc}</div>
      </div>
      {control}
    </div>
  );
}
