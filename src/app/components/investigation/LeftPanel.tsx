import { useCaseContent } from "../../context/CaseContentContext";

export function LeftPanel({ investigated }: { investigated: string[] }) {
  const { content } = useCaseContent();
  const { postElements: POST_ELEMENTS, postElementMeta: POST_ELEMENT_META } = content;
  const importanceColor = { HIGH: "#e74c3c", MED: "#c9a227", LOW: "#6b5f42" };

  return (
    <div className="flex flex-col h-full" style={{ borderRight: "1px solid rgba(201,162,39,0.2)" }}>
      {/* Header */}
      <div style={{ padding: "9px 12px 8px", borderBottom: "1px solid rgba(201,162,39,0.14)", flexShrink: 0 }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8px", color: "rgba(201,162,39,0.45)", letterSpacing: "0.22em", marginBottom: "1px" }}>CASE FILE</div>
        <div style={{ fontFamily: "Special Elite, serif", fontSize: "12px", color: "#ffd966", letterSpacing: "0.1em" }}>OBSERVATIONS</div>
      </div>

      {/* Log */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "8px", scrollbarWidth: "thin" }}>
        {investigated.length === 0 ? (
          <div style={{ padding: "16px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8px", color: "rgba(201,162,39,0.28)", letterSpacing: "0.12em", lineHeight: 1.9 }}>
              SELECT AN ELEMENT<br />IN THE POST TO BEGIN<br />INVESTIGATION
            </div>
          </div>
        ) : (
          <div className="flex flex-col" style={{ gap: "5px" }}>
            {investigated.map((id) => {
              const el = POST_ELEMENTS.find(e => e.id === id);
              const meta = POST_ELEMENT_META[id];
              if (!el || !meta) return null;
              return (
                <div key={id} style={{ border: "1px solid rgba(201,162,39,0.14)", padding: "7px 8px", backgroundColor: "rgba(201,162,39,0.03)" }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: "3px" }}>
                    <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(201,162,39,0.45)", letterSpacing: "0.14em" }}>{meta.tag}</span>
                    <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7px", color: importanceColor[meta.importance], letterSpacing: "0.06em" }}>{meta.importance}</span>
                  </div>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "8.5px", color: "#c9b882", lineHeight: 1.5, wordBreak: "break-word" }}>
                    {el.content.length > 42 ? el.content.slice(0, 42) + "…" : el.content}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ padding: "8px 12px 10px", borderTop: "1px solid rgba(201,162,39,0.14)", flexShrink: 0 }}>
        <div className="flex justify-between" style={{ marginBottom: "5px" }}>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(201,162,39,0.4)", letterSpacing: "0.14em" }}>ELEMENTS CHECKED</span>
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "#c9a227" }}>{investigated.length}/{POST_ELEMENTS.length}</span>
        </div>
        <div style={{ height: "3px", backgroundColor: "rgba(201,162,39,0.12)" }}>
          <div style={{ height: "100%", width: `${(investigated.length / POST_ELEMENTS.length) * 100}%`, backgroundColor: "#c9a227", transition: "width 0.4s ease" }} />
        </div>
      </div>
    </div>
  );
}