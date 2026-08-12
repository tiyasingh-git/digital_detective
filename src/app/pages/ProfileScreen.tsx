import type { PlayerProfile, CaseRecord } from "../types";
import { AvatarTile } from "../components/profile/AvatarTile";
import { computeProfileStats } from "../lib/profileStats";

export function ProfileScreen({ profile, cases, onBack }: { profile: PlayerProfile | null; cases: CaseRecord[]; onBack?: () => void }) {
  if (!profile) return null;
  const { solvedCount, xp, rank, nextRankXp, progressPct, avgScore, avgGrade } = computeProfileStats(cases);
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
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9b882", letterSpacing: "0.08em" }}>{rank}</div>
              </div>
            </div>

            {/* Main Stats */}
            <div className="flex-1 flex justify-between gap-4">
              {[
                { label: "TOTAL XP", value: xp.toLocaleString(), color: "#00e9ff" },
                { label: "CASES CLOSED", value: `${solvedCount}`, color: "#00ff6a" },
                { label: "AVG SCORE", value: avgScore !== null ? `${avgScore}%` : "—", color: "#ffd966" },
                { label: "AVG GRADE", value: avgGrade ?? "—", color: "#ffd966" },
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
              <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#c9a227", letterSpacing: "0.15em" }}>
                {nextRankXp !== null ? `${(nextRankXp - xp).toLocaleString()} XP TO NEXT RANK` : "TOP RANK ACHIEVED"}
              </span>
            </div>
            <div style={{ width: "100%", height: "6px", backgroundColor: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.2)" }}>
              <div style={{ width: `${progressPct}%`, height: "100%", background: "linear-gradient(to right, #c9a227, #ffd966)" }} />
            </div>
          </div>

          {/* Achievement badges — not implemented yet. Placeholder kept honest until there's real data to show. */}
          <div style={{ border: "1px dashed rgba(201,162,39,0.15)", padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#6b5f42", letterSpacing: "0.2em" }}>
              SERVICE AWARDS — COMING SOON
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}