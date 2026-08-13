import { useState } from "react";
import type { CaseRecord } from "../types";
import { computeUnlockedSkillCount } from "../lib/profileStats";

export const SKILL_CARDS_CATALOG = [
  {
    id: "techniques", title: "Investigation Techniques", color: "#00e9ff",
    entries: [
      { title: "Source Authentication", desc: "Verify the origin of any document before using it as evidence. Cross-reference three independent sources." },
      { title: "Digital Trail Analysis", desc: "Follow metadata timestamps and file modification dates to reconstruct the chain of events." },
      { title: "Behavioral Pattern Recognition", desc: "Identify deviations from a subject's established patterns — anomalies often signal deception." },
    ],
  },
  {
    id: "warnings", title: "Warning Signs", color: "#e74c3c",
    entries: [
      { title: "Conflicting Timestamps", desc: "When document creation dates contradict stated timelines, treat the file as potentially fabricated." },
      { title: "Metadata Stripping", desc: "Files with no metadata have been processed to remove identifying information. Treat with suspicion." },
      { title: "Identical Phrasing Across Sources", desc: "Coordinated disinformation campaigns share phrasing templates. Flag verbatim repetition across sources." },
    ],
  },
  {
    id: "checklists", title: "Verification Checklists", color: "#c9a227",
    entries: [
      { title: "Document Verification Protocol", desc: "1. Check metadata. 2. Verify source chain. 3. Cross-reference dates. 4. Confirm authorship." },
      { title: "Witness Statement Review", desc: "Compare timeline against physical evidence. Note inconsistencies. Rate credibility on five-point scale." },
    ],
  },
  {
    id: "concepts", title: "Key Concepts", color: "#9b59b6",
    entries: [
      { title: "Shadow Network", desc: "A coordinated disinformation operation. Multiple actors, single controller. Evidence is distributed to confuse." },
      { title: "Dead Drop Evidence", desc: "Evidence planted deliberately for discovery. May appear authentic but is designed to mislead the investigation." },
    ],
  },
  {
    id: "memory", title: "Memory Tips", color: "#00ff6a",
    entries: [
      { title: "The Red String Method", desc: "Physically map connections between suspects and evidence. Visual webs reveal patterns invisible in flat lists." },
      { title: "Contradiction Logging", desc: "Write down every inconsistency immediately. Memory distorts under pressure. The notebook does not lie." },
    ],
  },
  {
    id: "real-life", title: "Real-Life Application", color: "#b8a878",
    entries: [
      { title: "Lateral Reading", desc: "When verifying a source, leave it immediately and read what others say about it before returning to evaluate." },
      { title: "Reverse Image Search", desc: "Drag any image into a search engine to trace its original context. Repurposed images are a common deception vector." },
    ],
  },
];

export function SkillCardsScreen({ onBack, cases }: { onBack: () => void; cases: CaseRecord[] }) {
  const [openSection, setOpenSection] = useState<string | null>("techniques");
  const unlockedCount = computeUnlockedSkillCount(cases);

  // Flatten catalog to assign each entry a global unlock index
  let runningIndex = 0;
  const sectionsWithUnlock = SKILL_CARDS_CATALOG.map(sec => ({
    ...sec,
    entries: sec.entries.map(e => ({ ...e, unlocked: runningIndex++ < unlockedCount })),
  }));

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "radial-gradient(ellipse at center,#191008 0%,#07090f 100%)" }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-3" style={{ borderBottom: "1px solid rgba(201,162,39,0.18)", backgroundColor: "rgba(7,9,15,0.75)", flexShrink: 0 }}>
        <button onClick={onBack} style={{
          fontFamily: "Special Elite, serif", fontSize: "20px", letterSpacing: "0.15em",
          color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent",
          padding: "5px 14px", cursor: "pointer",
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
        >← BUREAU</button>
        <div>
          <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.08em" }}>SKILL CARDS</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.18em", marginTop: "2px" }}>FIELD MANUAL · CLASSIFIED TECHNIQUES · UNLOCK BY CLOSING CASES</div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Section sidebar */}
        <div className="flex-shrink-0 flex flex-col" style={{ width: "220px", borderRight: "1px solid rgba(201,162,39,0.12)", backgroundColor: "rgba(7,9,15,0.55)", overflowY: "auto", scrollbarWidth: "thin" }}>
          {sectionsWithUnlock.map((sec) => {
            const unlockedInSection = sec.entries.filter(e => e.unlocked).length;
            const isOpen = openSection === sec.id;
            return (
              <button key={sec.id} onClick={() => setOpenSection(isOpen ? null : sec.id)}
                style={{
                  textAlign: "left", padding: "14px 16px",
                  borderBottom: "1px solid rgba(201,162,39,0.08)",
                  borderLeft: `3px solid ${isOpen ? sec.color : "transparent"}`,
                  backgroundColor: isOpen ? "rgba(201,162,39,0.05)" : "transparent",
                  cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,162,39,0.03)"; }}
                onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: isOpen ? sec.color : "#c9b882", letterSpacing: "0.08em", marginBottom: "5px" }}>
                  {sec.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ flex: 1, height: "2px", backgroundColor: "rgba(201,162,39,0.1)" }}>
                    <div style={{ width: `${(unlockedInSection / sec.entries.length) * 100}%`, height: "100%", backgroundColor: sec.color, opacity: 0.8 }} />
                  </div>
                  <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#6b5f42", whiteSpace: "nowrap" }}>
                    {unlockedInSection}/{sec.entries.length}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Entry list */}
        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
          {openSection ? (() => {
            const sec = sectionsWithUnlock.find(s => s.id === openSection)!;
            return (
              <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <div style={{ width: "3px", height: "28px", backgroundColor: sec.color }} />
                  <div style={{ fontFamily: "Special Elite, serif", fontSize: "23px", color: sec.color, letterSpacing: "0.07em" }}>{sec.title}</div>
                </div>
                {sec.entries.map((entry, i) => (
                  <div key={i} style={{
                    border: `1px solid ${entry.unlocked ? "rgba(201,162,39,0.25)" : "rgba(201,162,39,0.08)"}`,
                    borderLeft: `4px solid ${entry.unlocked ? sec.color : "rgba(201,162,39,0.12)"}`,
                    backgroundColor: entry.unlocked ? "rgba(201,162,39,0.03)" : "rgba(7,9,15,0.4)",
                    padding: "16px 20px",
                    opacity: entry.unlocked ? 1 : 0.5,
                    position: "relative",
                  }}>
                    <div className="flex items-start justify-between gap-4">
                      <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: entry.unlocked ? "#c9b882" : "#4a4438", letterSpacing: "0.05em", marginBottom: "6px" }}>
                        {entry.unlocked ? entry.title : "— CLASSIFIED —"}
                      </div>
                      {!entry.unlocked && (
                        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#3a3428", letterSpacing: "0.2em", flexShrink: 0 }}>LOCKED</div>
                      )}
                    </div>
                    <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "13px", color: entry.unlocked ? "#b8a878" : "#3a3428", lineHeight: 1.7 }}>
                      {entry.unlocked ? entry.desc : "Complete more cases to unlock this entry."}
                    </div>
                    {entry.unlocked && (
                      <div style={{ position: "absolute", top: "10px", right: "12px", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: sec.color, opacity: 0.7 }} />
                    )}
                  </div>
                ))}
              </div>
            );
          })() : (
            <div className="flex flex-col items-center justify-center h-full" style={{ opacity: 0.3 }}>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#c9a227", letterSpacing: "0.25em" }}>SELECT A SECTION</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}