import { useState, useMemo } from "react";
import { motion } from "motion/react";

import type { PlayerProfile } from "../types";
import { AvatarTile } from "../components/profile/AvatarTile";

export function ProfileCreationScreen({ onSave }: { onSave: (p: PlayerProfile) => void }) {
  const [name, setName]       = useState("");
  const [avatarId, setAvatar] = useState(0);

  const badgeId = useMemo(() => {
    const n = name.trim();
    if (!n) return "??0000-DDI";
    const prefix = n.slice(0, 2).toUpperCase().padEnd(2, "X");
    const num = ((n.charCodeAt(0) * 31 + (n.charCodeAt(1) || 7)) % 9000) + 1000;
    return `${prefix}${num}-DDI`;
  }, [name]);

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const p: PlayerProfile = { name: name.trim(), avatarId, badgeId, rank: "RECRUIT DETECTIVE" };
    saveProfile(p);
    onSave(p);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-auto py-8"
      style={{ background:"radial-gradient(ellipse at center,#0f0c08 0%,#07090f 100%)" }}
    >
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        style={{ width:"min(520px,94vw)", flexShrink:0 }}
      >
        {/* Header stamp */}
        <div style={{ transform:"rotate(-2.5deg)", textAlign:"center", marginBottom:"28px" }}>
          <div style={{ fontFamily:"Special Elite,serif", fontSize:"22px", color:"#c9a227", letterSpacing:"0.1em" }}>
            DETECTIVE PROFILE
          </div>
          <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"8px", color:"#b8a878",
            letterSpacing:"0.22em", marginTop:"5px" }}>
            PRECINCT 14 · DIVISION OF DIGITAL INVESTIGATIONS
          </div>
        </div>

        <div style={{ border:"1px solid rgba(201,162,39,0.30)", backgroundColor:"rgba(13,18,32,0.97)",
          padding:"28px 28px 32px" }}>

          {/* Name input */}
          <div style={{ marginBottom:"22px" }}>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"8px", letterSpacing:"0.22em",
              color:"#b8a878", marginBottom:"8px" }}>
              DETECTIVE NAME
            </div>
            <input
              value={name} onChange={(e) => setName(e.target.value)} maxLength={28}
              placeholder="ENTER YOUR NAME"
              style={{
                width:"100%", boxSizing:"border-box",
                fontFamily:"Courier Prime,monospace", fontSize:"14px",
                color:"#ffd966", backgroundColor:"rgba(7,9,15,0.85)",
                border:"1px solid rgba(201,162,39,0.35)", padding:"10px 14px",
                letterSpacing:"0.08em", outline:"none",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#c9a227"; }}
              onBlur={(e)  => { e.target.style.borderColor = "rgba(201,162,39,0.35)"; }}
            />
          </div>

          {/* Avatar row */}
          <div style={{ marginBottom:"22px" }}>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"8px", letterSpacing:"0.22em",
              color:"#b8a878", marginBottom:"10px" }}>
              SELECT AVATAR
            </div>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {[0,1,2,3,4,5,6,7].map(i => (
                <AvatarTile key={i} idx={i} selected={avatarId === i} onSelect={() => setAvatar(i)} />
              ))}
            </div>
          </div>

          {/* Auto-generated fields */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"26px" }}>
            {[
              { label:"DETECTIVE ID", value:badgeId,             color:"#00e9ff" },
              { label:"RANK",         value:"RECRUIT DETECTIVE", color:"#c9b882" },
            ].map(f => (
              <div key={f.label} style={{ border:"1px solid rgba(201,162,39,0.18)", padding:"10px 12px",
                backgroundColor:"rgba(7,9,15,0.5)" }}>
                <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", color:"#6b5f42",
                  letterSpacing:"0.18em", marginBottom:"5px" }}>{f.label}</div>
                <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"11px", color:f.color,
                  letterSpacing:"0.06em" }}>{f.value}</div>
              </div>
            ))}
          </div>

          {/* Save button */}
          <button onClick={handleSave} disabled={!canSave} style={{
            width:"100%",
            fontFamily:"Special Elite,serif", fontSize:"14px", letterSpacing:"0.22em",
            color:       canSave ? "#07090f" : "#3a3428",
            backgroundColor: canSave ? "#c9a227" : "rgba(201,162,39,0.10)",
            border: `1px solid ${canSave ? "#c9a227" : "rgba(201,162,39,0.18)"}`,
            padding:"13px", cursor: canSave ? "pointer" : "not-allowed", transition:"all 0.2s",
          }}
            onMouseEnter={(e) => { if (canSave) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 22px rgba(201,162,39,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            SAVE PROFILE &amp; ENTER HEADQUARTERS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
