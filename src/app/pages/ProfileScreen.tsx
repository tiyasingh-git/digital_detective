import type { PlayerProfile } from "../types";

export function ProfileScreen({ profile, onBack }: { profile: PlayerProfile | null; onBack?: () => void }) {
  if (!profile) return null;
  return (
    <div className="flex flex-col h-full" style={{ background: "linear-gradient(135deg,#191008 0%,#140e06 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle 1px at 17px 17px, rgba(201,162,39,0.05) 0, transparent 0)",
        backgroundSize: "17px 17px",
      }} />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(201,162,39,0.15)", backgroundColor: "rgba(7,9,15,0.65)" }}>
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} style={{
              fontFamily: "Special Elite, serif", fontSize: "22px", letterSpacing: "0.15em",
              color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent",
              padding: "4px 12px", cursor: "pointer",
            }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
            >← BUREAU</button>
          )}
          <div>
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "23px", color: "#ffd966", letterSpacing: "0.1em" }}>DETECTIVE PROFILE</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.2em", marginTop: "2px" }}>OFFICIAL SERVICE RECORD</div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9a227", letterSpacing: "0.15em" }}>{profile.badgeId}</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#6b5f42", letterSpacing: "0.15em", marginTop: "2px" }}>STATUS: ACTIVE</div>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          {/* Identity & Stats Row */}
          <div className="flex gap-6">
            {/* Identity Card */}
            <div className="flex-shrink-0 flex items-center gap-6" style={{ border: "1px solid rgba(201,162,39,0.2)", padding: "20px", backgroundColor: "rgba(7,9,15,0.75)" }}>
              <div style={{ width: "90px", height: "105px", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "rgba(201,162,39,0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "#c9a227" }}>
                <AvatarTile idx={profile.avatarId} selected={false} onSelect={() => {}} />
              </div>
              <div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.15em", marginBottom: "4px" }}>NAME</div>
                <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966", letterSpacing: "0.05em", marginBottom: "12px" }}>{profile.name}</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.15em", marginBottom: "4px" }}>RANK</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9b882", letterSpacing: "0.08em" }}>DETECTIVE II</div>
              </div>
            </div>

            {/* Main Stats */}
            <div className="flex-1 flex justify-between gap-4">
              {[
                { label: "TOTAL XP", value: "4,250", color: "#00e9ff" },
                { label: "COINS", value: "850", color: "#c9a227" },
                { label: "CASES CLOSED", value: "14", color: "#00ff6a" },
                { label: "AVG SCORE", value: "92%", color: "#ffd966" },
              ].map(stat => (
                <div key={stat.label} className="flex-1 flex flex-col justify-center items-center text-center" style={{ border: "1px solid rgba(201,162,39,0.2)", backgroundColor: "rgba(7,9,15,0.75)", padding: "16px" }}>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#6b5f42", letterSpacing: "0.15em", marginBottom: "8px" }}>{stat.label}</div>
                  <div style={{ fontFamily: "Special Elite, serif", fontSize: "26px", color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotion Progress */}
          <div style={{ border: "1px solid rgba(201,162,39,0.2)", backgroundColor: "rgba(7,9,15,0.75)", padding: "20px" }}>
            <div className="flex justify-between mb-3">
              <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.15em" }}>PROMOTION PROGRESS</span>
              <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9a227", letterSpacing: "0.15em" }}>1,750 XP TO NEXT RANK</span>
            </div>
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.2)" }}>
              <div style={{ width: "70%", height: "100%", background: "linear-gradient(to right, #c9a227, #ffd966)" }} />
            </div>
          </div>

          {/* Achievements Grid */}
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#ffd966", letterSpacing: "0.2em", borderBottom: "1px solid rgba(201,162,39,0.2)", paddingBottom: "8px", marginBottom: "16px" }}>SERVICE AWARDS & SKILLS</div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { title: "SHARP EYE", desc: "Found 10 critical clues without hints.", color: "#00e9ff" },
                { title: "FLAWLESS LOGIC", desc: "Submitted a 100% correct Evidence Wall.", color: "#00ff6a" },
                { title: "NIGHT OWL", desc: "Completed 5 cases during the night shift.", color: "#c9a227" },
                { title: "INTERROGATOR", desc: "Caught 3 suspects in a lie.", color: "#e74c3c" },
              ].map(ach => (
                <div key={ach.title} style={{ border: "1px solid rgba(201,162,39,0.15)", backgroundColor: "rgba(7,9,15,0.6)", padding: "16px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "100%", backgroundColor: ach.color }} />
                  <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#c9b882", marginBottom: "6px" }}>{ach.title}</div>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#6b5f42", lineHeight: 1.5 }}>{ach.desc}</div>
                </div>
              ))}
            </div>

            {/* Skill Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "SOURCE SCANNER MASTERY", desc: "Successfully validated 50 individual sources.", active: true },
                { title: "TIMELINE LENS EXPERT", desc: "Reconstructed 10 chronological anomalies.", active: false },
              ].map(skill => (
                <div key={skill.title} style={{
                  border: `1px solid ${skill.active ? "rgba(201,162,39,0.3)" : "rgba(201,162,39,0.1)"}`,
                  borderLeft: `4px solid ${skill.active ? "#c9a227" : "rgba(201,162,39,0.2)"}`,
                  backgroundColor: skill.active ? "rgba(201,162,39,0.05)" : "rgba(7,9,15,0.4)",
                  padding: "16px 20px",
                  opacity: skill.active ? 1 : 0.5,
                }}>
                  <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: skill.active ? "#ffd966" : "#c9b882", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    {skill.title}
                  </div>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#b8a878", lineHeight: 1.6 }}>
                    {skill.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
