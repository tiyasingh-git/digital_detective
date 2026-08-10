import { motion } from "motion/react";

import type { Tool } from "../../types";
import { useCaseContent } from "../../context/CaseContentContext";

export function GadgetBelt({ activeTool, onSelect, selectedElement }: { activeTool: Tool; onSelect: (t: Tool) => void; selectedElement: string | null }) {
  const { content, getToolResult } = useCaseContent();
  return (
    <div className="flex flex-col h-full" style={{ borderLeft: "1px solid rgba(201,162,39,0.2)" }}>
      <div className="px-3 py-2" style={{ borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#e6d9ac" }}>
          INVESTIGATOR&apos;S KIT
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2 flex-1">
        {content.toolsData.map((tool) => {
          const active = activeTool === tool.id;
          const result = getToolResult(tool.id, selectedElement);
          const isDim = result === "No relevant data for this selection." || result.startsWith("No ");
          return (
            <button
              key={tool.id}
              onClick={() => onSelect(active ? null : tool.id)}
              className="text-left transition-all"
              style={{
                border: `1px solid ${active ? tool.color : "rgba(201,162,39,0.22)"}`,
                backgroundColor: active ? `${tool.color}10` : "rgba(8,10,18,0.8)",
                padding: "9px 10px",
                cursor: "pointer",
              }}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span style={{ fontSize: "9px", color: tool.color, fontFamily: "Courier Prime, monospace", lineHeight: 1 }}>
                  {tool.sym}
                </span>
                <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.12em", color: active ? tool.color : "#d8c88a" }}>
                  {tool.label}
                </span>
              </div>
              {active && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: isDim ? `${tool.color}60` : tool.color, lineHeight: 1.9, marginTop: "6px", fontStyle: isDim ? "italic" : "normal" }}
                >
                  {result.split(" · ").map((line, i) => <div key={i}>{line}</div>)}
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3" style={{ borderTop: "1px solid rgba(201,162,39,0.18)" }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#a89968", letterSpacing: "0.12em", lineHeight: 1.8 }}>
          CASE NO. 2024-1147<br />
          DETECTIVE: R. CHEN<br />
          STATUS: ACTIVE
        </div>
      </div>
    </div>
  );
}