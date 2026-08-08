export const HANDBOOK_SECTIONS = [
  { id: "techniques", title: "Investigation Techniques", desc: "Standard protocols for evidence gathering and verification.", locked: false },
  { id: "warnings", title: "Warning Signs", desc: "Common indicators of fabricated or tampered evidence.", locked: false },
  { id: "checklists", title: "Verification Checklists", desc: "Step-by-step procedures for authenticating documents and media.", locked: true },
  { id: "concepts", title: "Key Concepts", desc: "Core terminology and theoretical frameworks for digital investigation.", locked: true },
  { id: "memory", title: "Memory Tips", desc: "Mnemonic devices and cognitive aids for field operations.", locked: true },
  { id: "real-life", title: "Real-Life Application Tips", desc: "Translating digital investigation techniques to practical scenarios.", locked: true },
];


export function HandbookScreen() {
  return (
    <div className="flex h-full items-center justify-center p-5" style={{ background: "radial-gradient(ellipse at center,#191008 0%,#07090f 100%)" }}>
      <div className="flex flex-col" style={{
        height: "88%", width: "100%", maxWidth: "960px",
        boxShadow: "0 24px 90px rgba(0,0,0,0.85), 0 0 0 1px rgba(201,162,39,0.2)",
        background: "linear-gradient(to right,#d0af8a 0%,#dbbe96 15%,#e8d5a3 50%,#dbbe96 85%,#d0af8a 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(transparent,transparent 27px,rgba(80,50,18,0.16) 27px,rgba(80,50,18,0.16) 28px)",
        }} />
        
        {/* Leather spine overlay */}
        <div className="absolute left-0 top-0 bottom-0" style={{ width: "14px", background: "linear-gradient(to right,#2a1608,#3a2010)", boxShadow: "inset -4px 0 8px rgba(0,0,0,0.5), 2px 0 6px rgba(0,0,0,0.4)", zIndex: 10 }} />

        <div className="relative z-10 flex flex-col h-full pl-10 pr-6 py-8">
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "28px", color: "#3a2010", letterSpacing: "0.12em", marginBottom: "4px" }}>
            DETECTIVE HANDBOOK
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#5a3a1a", letterSpacing: "0.2em", marginBottom: "24px", opacity: 0.8 }}>
            PRECINCT 14 · FIELD MANUAL
          </div>

          <div className="flex-1 overflow-y-auto pr-4 flex flex-col gap-4" style={{ scrollbarWidth: "thin" }}>
            {HANDBOOK_SECTIONS.map((section) => (
              <div key={section.id} style={{
                border: `1px solid ${section.locked ? "rgba(90,58,26,0.15)" : "rgba(90,58,26,0.3)"}`,
                borderLeft: `4px solid ${section.locked ? "rgba(90,58,26,0.2)" : "#8a2810"}`,
                backgroundColor: section.locked ? "rgba(226,207,174,0.3)" : "rgba(242,237,226,0.6)",
                padding: "16px 20px",
                opacity: section.locked ? 0.6 : 1,
              }}>
                <div className="flex items-center justify-between mb-2">
                  <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: section.locked ? "#5a3a1a" : "#1a1005", letterSpacing: "0.05em" }}>
                    {section.title}
                  </div>
                  {section.locked && (
                    <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#8a2810", letterSpacing: "0.2em" }}>
                      CLASSIFIED
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#5a3a1a", lineHeight: 1.6 }}>
                  {section.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
