import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { RecruitmentIntro } from "../components/RecruitmentIntro";

export function RecruitmentLetterScreen({ onAccept }: { onAccept: () => void }) {
  const [stamped, setStamped] = useState(false);

  const handleAccept = () => {
    if (stamped) return;
    setStamped(true);
    setTimeout(onAccept, 1800);
  };

  return (
    <>
    <RecruitmentIntro>
      <div className="flex items-start justify-center min-h-full py-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "min(540px, 96vw)", flexShrink: 0,
          background: "linear-gradient(170deg,#ead7b4 0%,#d9c49c 100%)",
          padding: "20px 28px",
          position: "relative",
          boxShadow: "0 32px 100px rgba(0,0,0,0.92), 0 0 0 1px rgba(201,162,39,0.26)",
        }}
      >
        {/* Aged paper edges */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"5px",
          background:"linear-gradient(to right,#a87c48,#c9af7e,#9e6f38,#c9af7e,#a87c48)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"4px",
          background:"linear-gradient(to right,#a87c48,#c0a86c,#9e6f38,#c0a86c,#a87c48)" }} />

        {/* Classification header */}
        <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", letterSpacing:"0.3em",
          color:"#5a3a1a", textAlign:"center", marginBottom:"12px", opacity:0.6 }}>
          BUREAU OF DIGITAL INVESTIGATIONS · PRECINCT 14 · CONFIDENTIAL
        </div>

        {/* Title stamp */}
        <div style={{ display:"inline-block", transform:"rotate(-2.5deg)", marginBottom:"14px",
          borderBottom:"2px solid rgba(90,58,26,0.28)", paddingBottom:"8px" }}>
          <div style={{ fontFamily:"Special Elite,serif", fontSize:"20px", color:"#1a1005", letterSpacing:"0.08em", lineHeight:1.2 }}>
            RECRUITMENT NOTICE
          </div>
          <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", color:"#5a3a1a",
            letterSpacing:"0.18em", marginTop:"3px", opacity:0.65 }}>
            REF: 2024-DDI-RECRUIT-001
          </div>
        </div>

        {/* Date */}
        <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"8.5px", color:"#3a2510",
          opacity:0.58, marginBottom:"10px" }}>
          {new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}).toUpperCase()}
          {" "}· EYES ONLY
        </div>

        {/* Salutation */}
        <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"10px", color:"#2a1a0a", lineHeight:1.8, marginBottom:"10px" }}>
          To Whom It May Concern,
        </div>

        {/* Body */}
        <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"10px", color:"#2a1a0a", lineHeight:1.85 }}>
          <p style={{ marginBottom:"10px" }}>
            Fabricated stories, manipulated images, and coordinated disinformation campaigns
            spread faster than any correction can follow. Trust in public institutions is
            eroding — not because truth is hard to find, but because falsehood is engineered
            to look indistinguishable from it.
          </p>
          <p style={{ marginBottom:"10px" }}>
            You have been identified as a candidate of exceptional observational acuity and
            critical reasoning capability. The Division of Digital Investigations trains
            Detectives to identify fabricated evidence, trace disinformation networks, and
            protect public discourse from coordinated deception. Your assignment: expose
            the Shadow Network before its influence becomes irreversible.
          </p>

          {/* Mission activities — left-ruled list */}
          <div style={{ borderLeft:"2px solid rgba(90,58,26,0.3)", paddingLeft:"12px", marginBottom:"10px" }}>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7.5px", letterSpacing:"0.2em", color:"#5a3a1a", marginBottom:"6px", opacity:0.7 }}>
              WHAT YOUR MISSIONS WILL REQUIRE:
            </div>
            {[
              "Examine evidence — separate verified fact from fabrication",
              "Verify sources — trace provenance chains and flag anomalies",
              "Spot manipulation — recognise altered images and planted data",
              "Question assumptions — every witness, timestamp, and motive",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"4px" }}>
                <span style={{ color:"#c9a227", flexShrink:0 }}>·</span>
                <span style={{ fontSize:"9.5px", color:"#3a2510" }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ marginBottom:"14px" }}>
            Should you choose to accept, you will be assigned to Precinct 14 under the
            direct supervision of Chief Morgan. Your first case awaits briefing.
            This offer expires at 0600 hours.
          </p>
        </div>

        {/* Academy motto — stamped quote block */}
        <div style={{ borderTop:"1px solid rgba(90,58,26,0.22)", borderBottom:"1px solid rgba(90,58,26,0.22)", padding:"10px 0", marginBottom:"14px", textAlign:"center" }}>
          <div style={{ fontFamily:"Special Elite,serif", fontSize:"13px", color:"#3a2510", letterSpacing:"0.08em", transform:"rotate(-1.5deg)", lineHeight:1.5, opacity:0.82 }}>
            "Don't believe everything you see.<br />Verify before you trust."
          </div>
          <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", letterSpacing:"0.22em", color:"#5a3a1a", marginTop:"5px", opacity:0.55 }}>
            — PRECINCT 14 ACADEMY MOTTO
          </div>
        </div>

        {/* Signature */}
        <div style={{ fontFamily:"Caveat,cursive", fontSize:"18px", color:"#3a2510", paddingBottom:"10px", marginBottom:"14px" }}>
          Chief D. Morgan
          <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"7px", color:"#5a3a1a", letterSpacing:"0.14em", marginTop:"3px", opacity:0.6 }}>
            DIV. OF DIGITAL INVESTIGATIONS · PRECINCT 14
          </div>
        </div>

        {/* Begin Training button */}
        <div style={{ textAlign:"center" }}>
          <button onClick={handleAccept} disabled={stamped} style={{
            fontFamily:"Special Elite,serif", fontSize:"14px", letterSpacing:"0.24em",
            color: stamped ? "rgba(90,58,26,0.32)" : "#1a1005",
            border: `2px solid ${stamped ? "rgba(90,58,26,0.22)" : "rgba(90,58,26,0.62)"}`,
            backgroundColor: stamped ? "rgba(90,58,26,0.04)" : "rgba(201,162,39,0.18)",
            padding:"12px 36px", cursor: stamped ? "default" : "pointer", transition:"all 0.18s",
          }}
            onMouseEnter={(e) => { if (!stamped) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,162,39,0.34)"; }}
            onMouseLeave={(e) => { if (!stamped) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(201,162,39,0.18)"; }}
          >
            BEGIN TRAINING
          </button>
        </div>
      </motion.div>
      </div>
    </RecruitmentIntro>

      {/* Stamp overlay — reuses same spring pattern as StampOverlay */}
      <AnimatePresence>
        {stamped && (
          <motion.div className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex:300, backgroundColor:"rgba(0,0,0,0.80)" }}
            initial={{ opacity:0 }} animate={{ opacity:1 }}
          >
            <motion.div
              initial={{ scale:4, rotate:-13, opacity:0 }}
              animate={{ scale:1, rotate:-7, opacity:1 }}
              transition={{ type:"spring", stiffness:520, damping:22 }}
              style={{
                fontFamily:"Special Elite,serif",
                fontSize:"clamp(3rem,8vw,5.5rem)",
                color:"#c9a227", border:"8px solid #c9a227",
                padding:"0.22em 0.65em", letterSpacing:"0.12em", lineHeight:1,
                boxShadow:"0 0 70px rgba(201,162,39,0.55)",
                backgroundColor:"rgba(7,9,15,0.94)",
                marginBottom:"24px",
              }}
            >
              ACCEPTED
            </motion.div>
            <div style={{ fontFamily:"Courier Prime,monospace", fontSize:"8.5px",
              letterSpacing:"0.26em", color:"#6b5f42" }}>
              TRAINING ACCEPTED — PROCEEDING TO PROFILE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
