import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import type { Tool } from "../../types";
import { useCaseContent } from "../../context/CaseContentContext";
import type { PostElement } from "../../data/caseContent.types";

export function CenterPanel({ activeTool, selectedElement, investigated, onSelectElement, onMarkInvestigated }: {
  activeTool: Tool;
  selectedElement: string | null;
  investigated: Set<string>;
  onSelectElement: (id: string | null) => void;
  onMarkInvestigated: (id: string) => void;
}) {
  const [mouse, setMouse] = useState({ x: 50, y: 40 });
  const ref = useRef<HTMLDivElement>(null);
  const { content, getToolResult } = useCaseContent();
  const { toolsData: TOOLS_DATA, postElements: POST_ELEMENTS } = content;

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const toolColor = activeTool ? TOOLS_DATA.find((t) => t.id === activeTool)?.color : undefined;
  const selectedPost = POST_ELEMENTS.find(e => e.id === selectedElement) ?? null;

  // Inline span renderer — regular function, not a React component, avoids remount churn
  const pspan = (el: PostElement) => {
    const isSel = selectedElement === el.id;
    const isDone = investigated.has(el.id);
    return (
      <span
        key={el.id}
        onClick={(e) => { e.stopPropagation(); onSelectElement(isSel ? null : el.id); }}
        onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.textShadow = "0 0 9px rgba(201,162,39,0.6)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
        style={{
          cursor: "pointer",
          padding: "0 3px",
          backgroundColor: isSel ? "rgba(201,162,39,0.16)" : isDone ? "rgba(201,162,39,0.06)" : "transparent",
          border: isSel ? "1px solid rgba(201,162,39,0.45)" : "1px solid transparent",
          color: isSel ? "#ffd966" : isDone ? "#c9a227" : "inherit",
          transition: "background-color 0.1s, color 0.1s",
          display: "inline",
        }}
      >
        {el.content}{isDone ? <span style={{ fontSize: "7px", color: "#c9a227", verticalAlign: "super", marginLeft: "2px" }}>✓</span> : null}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header — unchanged */}
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid rgba(201,162,39,0.2)", flexShrink: 0 }}>
        <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966", letterSpacing: "0.09em" }}>EXHIBIT — VIRAL HEALTH CLAIM</div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9b882", letterSpacing: "0.15em" }}>CASE 2024-1147 · SOCIAL MEDIA</div>
      </div>

      <div
        ref={ref}
        className="flex-1 relative overflow-hidden"
        style={{ cursor: "crosshair" }}
        onMouseMove={handleMove}
        onClick={() => onSelectElement(null)}
      >
        {/* Dark base — replaces stock photo */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #06080e 0%, #090a18 50%, #06080e 100%)" }} />

        {/* Dark wash */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(5,8,18,0.35)" }} />

        {/* Lamp spotlight that follows mouse — unchanged */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 38% 32% at ${mouse.x}% ${mouse.y}%, rgba(220,180,80,0.11) 0%, transparent 70%)` }} />

        {/* Social post card */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "20px" }}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "rgba(11,13,22,0.92)", border: "1px solid rgba(201,162,39,0.1)", padding: "18px 20px", maxWidth: "360px", width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,162,39,0.05)" }}
          >
            {/* Platform header */}
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "13px", paddingBottom: "10px", borderBottom: "1px solid rgba(201,162,39,0.08)" }}>
              <div style={{ width: "26px", height: "26px", border: "1px solid rgba(201,162,39,0.3)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(201,162,39,0.07)", flexShrink: 0 }}>
                <span style={{ fontFamily: "Special Elite, serif", fontSize: "11px", color: "#c9a227" }}>N</span>
              </div>
              <div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10.5px", color: "#d0c8a8", lineHeight: 1 }}>{pspan(POST_ELEMENTS[6])}</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(201,162,39,0.28)", letterSpacing: "0.1em", marginTop: "2px" }}>Health & Wellness · Sponsored</div>
              </div>
            </div>

            {/* Headline */}
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "17px", color: "#ece4cc", letterSpacing: "0.03em", lineHeight: 1.3, marginBottom: "12px" }}>
              {pspan(POST_ELEMENTS[0])}
            </div>

            {/* Body claims */}
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#c2baa0", lineHeight: 2, marginBottom: "12px" }}>
              {[POST_ELEMENTS[1], POST_ELEMENTS[2], POST_ELEMENTS[3], POST_ELEMENTS[4]].map(el => (
                <div key={el.id} style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                  <span style={{ color: "rgba(201,162,39,0.35)", flexShrink: 0, fontSize: "8px" }}>◆</span>
                  {pspan(el)}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10.5px", color: "#cfc8a8", fontStyle: "italic", marginBottom: "13px" }}>
              {pspan(POST_ELEMENTS[5])}
            </div>

            {/* Divider + engagement + comment */}
            <div style={{ borderTop: "1px solid rgba(201,162,39,0.08)", paddingTop: "10px" }}>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.4)", letterSpacing: "0.04em", marginBottom: "8px" }}>
                ♥ {pspan(POST_ELEMENTS[7])}
              </div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(196,188,165,0.6)", borderLeft: "2px solid rgba(201,162,39,0.16)", paddingLeft: "8px", lineHeight: 1.65 }}>
                <span style={{ color: "rgba(201,162,39,0.3)" }}>user_comment: </span>
                &ldquo;{pspan(POST_ELEMENTS[8])}&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Tool overlays — unchanged */}
        {activeTool && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 pointer-events-none">
            {activeTool === "scanner" && (
              <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${toolColor}12 1px, transparent 1px), linear-gradient(90deg, ${toolColor}12 1px, transparent 1px)`, backgroundSize: "44px 44px", border: `1px solid ${toolColor}30` }}>
                {[["8%","12%"],["45%","28%"],["72%","55%"],["28%","68%"]].map(([l,t], i) => (
                  <div key={i} className="absolute" style={{ left: l, top: t }}>
                    <div style={{ width: 18, height: 18, border: `1.5px solid ${toolColor}`, borderRadius: "50%", position: "relative" }}>
                      <div style={{ position: "absolute", inset: "-5px", border: `1px solid ${toolColor}40`, borderRadius: "50%" }} />
                      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 3, height: 3, borderRadius: "50%", backgroundColor: toolColor }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTool === "timeline" && (
              <div className="absolute inset-x-4 bottom-4" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: toolColor! }}>
                <div style={{ borderTop: `1px solid ${toolColor}40`, paddingTop: "8px" }}>SPREAD WINDOW · PUBLISHED: 06:14 · 500 SHARES: 08:00 ←→ FIRST FLAG: 09:45</div>
              </div>
            )}
            {activeTool === "camera" && (
              <>
                {[[28,38],[55,22],[71,62]].map(([lx,ty], i) => (
                  <div key={i} className="absolute" style={{ left: `${lx}%`, top: `${ty}%`, transform: "translate(-50%,-50%)" }}>
                    <div style={{ width: 22, height: 22, border: `2px solid ${toolColor}`, borderRadius: "50%", position: "relative" }}>
                      <div style={{ position: "absolute", inset: "-7px", border: `1px solid ${toolColor}35`, borderRadius: "50%" }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 4, height: 4, border: `1px solid ${toolColor}`, borderRadius: "50%" }} />
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 4, fontFamily: "Courier Prime, monospace", fontSize: "9px", color: toolColor, whiteSpace: "nowrap" }}>SITE {String.fromCharCode(65 + i)}</div>
                  </div>
                ))}
              </>
            )}
            {activeTool === "emotion" && (
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 55% 55% at 42% 40%, ${toolColor}22 0%, transparent 65%)` }}>
                <div className="absolute top-4 right-4" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: toolColor, border: `1px solid ${toolColor}40`, padding: "6px 10px", backgroundColor: `${toolColor}10` }}>
                  FEAR/URGENCY: HIGH<br />CLICKBAIT SCORE: HIGH
                </div>
              </div>
            )}
            {activeTool === "bias" && (
              <div className="absolute inset-0 pointer-events-none" style={{ border: `1px solid ${toolColor}28` }}>
                <div className="absolute top-4 left-1/2" style={{ transform: "translateX(-50%)", fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: toolColor, border: `1px solid ${toolColor}40`, padding: "6px 14px", backgroundColor: `${toolColor}08`, textAlign: "center", letterSpacing: "0.12em" }}>
                  FRAMING ANALYSIS ACTIVE<br /><span style={{ fontSize: "9px", opacity: 0.7 }}>SCANNING FOR LOADED LANGUAGE</span>
                </div>
                {[["12%","38%","FEAR"],["70%","22%","ANGER"],["48%","72%","URGENCY"]].map(([l,t,lbl], i) => (
                  <div key={i} className="absolute" style={{ left: l, top: t }}>
                    <div style={{ width: 16, height: 16, border: `1.5px solid ${toolColor}90`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: toolColor }} />
                    </div>
                    <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 3, fontFamily: "Courier Prime, monospace", fontSize: "10px", color: toolColor, whiteSpace: "nowrap" }}>{lbl}</div>
                  </div>
                ))}
              </div>
            )}
            {activeTool === "metadata" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-4 left-4 right-4" style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: toolColor, border: `1px solid ${toolColor}35`, padding: "8px 12px", backgroundColor: `${toolColor}07`, letterSpacing: "0.1em", lineHeight: 1.9 }}>
                  POST META · PUBLISHED: 06:14:08 · ACCT AGE: 94d · PRIOR FLAGS: 2 · LOCATION: HIDDEN
                </div>
                {[["18%","20%"],["60%","45%"]].map(([l,t],i) => (
                  <div key={i} className="absolute" style={{ left:l, top:t, width:20, height:20, border:`1px solid ${toolColor}60`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width:6, height:6, border:`1px solid ${toolColor}`, borderRadius:"50%" }} />
                  </div>
                ))}
              </div>
            )}
            {activeTool === "verify" && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: toolColor, lineHeight: 2.2, letterSpacing: "0.06em" }}>
                  {[{ label: "SOURCE CITED", pass: false }, { label: "FACT-CHECKED", pass: false }, { label: "REVERSE IMG", pass: false }, { label: "AUTHORSHIP", pass: true }].map(row => (
                    <div key={row.label} className="flex items-center gap-2">
                      <span style={{ color: row.pass ? "#22c55e" : "#e74c3c", fontSize: "9px" }}>{row.pass ? "✓" : "✗"}</span>
                      <span style={{ opacity: 0.85 }}>{row.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Corner metadata — unchanged */}
        <div className="absolute top-3 left-3" style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#ffd966", letterSpacing: "0.12em" }}>
          [EXHIBIT-01 · @HLTHTRUTH22 · 06:14 · SOCIAL FEED]
        </div>
        <div className="absolute bottom-3 right-3" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#a89968" }}>
          MAGNIFICATION ACTIVE · MOVE TO INSPECT
        </div>

        {/* Bottom fade — unchanged */}
        <div className="absolute inset-x-0 bottom-0 h-8 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(7,9,15,1) 0%, transparent 100%)" }} />
      </div>

      {/* Bottom bar — investigation directions when element selected, tool readout otherwise */}
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <motion.div
            key="directions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: "1px solid rgba(201,162,39,0.35)", backgroundColor: "rgba(201,162,39,0.07)", overflow: "hidden", flexShrink: 0 }}
          >
            <div className="px-4 py-2">
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "7.5px", color: "rgba(201,162,39,0.45)", letterSpacing: "0.22em", marginBottom: "5px" }}>
                SELECTED: {selectedPost.content.toUpperCase().slice(0, 38)}{selectedPost.content.length > 38 ? "…" : ""}
              </div>
              <div className="flex flex-col" style={{ gap: "1px" }}>
                {selectedPost.directions.map((dir, i) => (
                  <button
                    key={i}
                    onClick={() => { onMarkInvestigated(selectedPost.id); onSelectElement(null); }}
                    style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#c9b882", letterSpacing: "0.07em", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "2px 0", display: "flex", alignItems: "center", gap: "7px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffd966"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9b882"; }}
                  >
                    <span style={{ color: "rgba(201,162,39,0.32)", flexShrink: 0, fontSize: "8px" }}>{i + 1}.</span>
                    {dir}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : activeTool && toolColor ? (
          <motion.div
            key="toolreadout"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: `1px solid ${toolColor}35`, backgroundColor: `${toolColor}07`, overflow: "hidden", flexShrink: 0 }}
          >
            <div className="px-4 py-2">
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: toolColor, letterSpacing: "0.12em" }}>
                {getToolResult(activeTool!, selectedElement)}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}