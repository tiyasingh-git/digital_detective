import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

import type { Screen, CaseRecord, PlayerProfile, SettingsState, CaseStatus } from "../types";
import { MenuAnimatedBg } from "../components/mainmenu/MenuAnimatedBg";
import { VERDICTS } from "../data/investigationData";
import { CASES_CATALOG } from "../data/casesData";

// Cork BG decoration items (behind menu, non-interactive)
export const BG_PINS = [
  { label: "DOCK 7 — PHOTO", x: 6,  y: 18, rot: -4 },
  { label: "CLIPPING — HERALD", x: 72, y: 12, rot: 3 },
  { label: "FINGERPRINT CARD", x: 18, y: 60, rot: 2 },
  { label: "CODED MESSAGE",    x: 78, y: 62, rot: -3 },
  { label: "CASE FILE 2024",   x: 48, y: 78, rot: 5 },
];


export const BG_STRINGS = [[0,1],[1,3],[0,2],[2,4]];


export function MainMenuScreen({ onNavigate, cases, reduceMotion, settings, profile }: {
  onNavigate: (s: Screen) => void;
  cases: CaseRecord[];
  reduceMotion?: boolean;
  settings?: SettingsState;
  profile?: PlayerProfile | null;
}) {
  const [hovered, setHovered]         = useState<number | null>(null);
  const [clock, setClock]             = useState("02:47:33");
  const [hovScan, setHovScan]         = useState<number | null>(null);
  const [showFlicker, setShowFlicker] = useState(false);
  const [stringVisible, setStringVisible] = useState(false);
  const [pressedIdx, setPressedIdx]   = useState<number | null>(null);

  // Audio refs
  const audioCtxRef   = useRef<AudioContext | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const ambientSrcRef  = useRef<AudioBufferSourceNode | null>(null);
  const sfxLockRef     = useRef(false);
  const ambientStarted = useRef(false);

  const getCtx = useCallback((): AudioContext | null => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch { return null; }
  }, []);

  const startAmbient = useCallback(() => {
    if (!settings?.ambientSound || ambientStarted.current) return;
    ambientStarted.current = true;
    try {
      const ctx = getCtx();
      if (!ctx) return;
      const sr = ctx.sampleRate;
      const bufLen = sr * 3;
      const buf = ctx.createBuffer(1, bufLen, sr);
      const data = buf.getChannelData(0);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i = 0; i < bufLen; i++) {
        const w = Math.random() * 2 - 1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
        b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
        b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        data[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.004;
        b6=w*0.115926;
      }
      const src = ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(gain); gain.connect(ctx.destination);
      src.start();
      gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 1.5);
      ambientSrcRef.current = src;
      ambientGainRef.current = gain;
    } catch {}
  }, [settings?.ambientSound, getCtx]);

  const stopAmbient = useCallback(() => {
    if (!ambientGainRef.current || !audioCtxRef.current) return;
    try {
      ambientGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.7);
      const src = ambientSrcRef.current;
      setTimeout(() => { try { src?.stop(); } catch {} ambientSrcRef.current = null; ambientGainRef.current = null; ambientStarted.current = false; }, 800);
    } catch {}
  }, []);

  const playClack = useCallback(() => {
    if (!settings?.typewriterSfx || sfxLockRef.current) return;
    sfxLockRef.current = true;
    setTimeout(() => { sfxLockRef.current = false; }, 80);
    try {
      const ctx = getCtx(); if (!ctx) return;
      const sr = ctx.sampleRate; const dur = 0.042;
      const buf = ctx.createBuffer(1, sr * dur, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) { const t = i/sr; data[i]=(Math.random()*2-1)*Math.exp(-t*95)*0.5; }
      const bpf = ctx.createBiquadFilter(); bpf.type="bandpass"; bpf.frequency.value=2100; bpf.Q.value=1.2;
      const gain = ctx.createGain(); gain.gain.value = 0.17;
      const src = ctx.createBufferSource(); src.buffer=buf;
      src.connect(bpf); bpf.connect(gain); gain.connect(ctx.destination); src.start();
    } catch {}
  }, [settings?.typewriterSfx, getCtx]);

  const playThunk = useCallback(() => {
    if (!settings?.typewriterSfx) return;
    try {
      const ctx = getCtx(); if (!ctx) return;
      const sr = ctx.sampleRate; const dur = 0.078;
      const buf = ctx.createBuffer(1, sr * dur, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) { const t = i/sr; data[i]=(Math.random()*2-1)*Math.exp(-t*38)*0.68; }
      const lpf = ctx.createBiquadFilter(); lpf.type="lowpass"; lpf.frequency.value=680;
      const gain = ctx.createGain(); gain.gain.value = 0.21;
      const src = ctx.createBufferSource(); src.buffer=buf;
      src.connect(lpf); lpf.connect(gain); gain.connect(ctx.destination); src.start();
    } catch {}
  }, [settings?.typewriterSfx, getCtx]);

  const playRustle = useCallback(() => {
    if (!settings?.typewriterSfx) return;
    try {
      const ctx = getCtx(); if (!ctx) return;
      const sr = ctx.sampleRate; const dur = 0.14;
      const buf = ctx.createBuffer(1, sr * dur, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) { const t = i/sr; data[i]=(Math.random()*2-1)*Math.sin(Math.PI*t/dur)*0.32; }
      const bpf = ctx.createBiquadFilter(); bpf.type="bandpass"; bpf.frequency.value=3800; bpf.Q.value=0.6;
      const gain = ctx.createGain(); gain.gain.value = 0.14;
      const src = ctx.createBufferSource(); src.buffer=buf;
      src.connect(bpf); bpf.connect(gain); gain.connect(ctx.destination); src.start();
    } catch {}
  }, [settings?.typewriterSfx, getCtx]);

  useEffect(() => {
    return () => stopAmbient();
  }, [stopAmbient]);

  useEffect(() => {
    let secs = 2 * 3600 + 47 * 60 + 33;
    const t = setInterval(() => {
      secs++;
      const h = String(Math.floor(secs / 3600)).padStart(2, "0");
      const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      setClock(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => {
      setStringVisible(true);
      playRustle();
    }, 900);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 20000 + Math.random() * 10000;
      timer = setTimeout(() => {
        setShowFlicker(true);
        setTimeout(() => { setShowFlicker(false); schedule(); }, 80);
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const handleTileEnter = (i: number, disabled: boolean) => {
    if (disabled) return;
    setHovered(i);
    startAmbient();
    playClack();
    if (reduceMotion) return;
    setHovScan(i);
    setTimeout(() => setHovScan(prev => prev === i ? null : prev), 640);
  };

  const activeCase = cases.find(c => c.status === "in-progress") ?? null;
  const statusColor = (s: CaseStatus) =>
    s === "in-progress" ? "#00e9ff" : s === "closed-solved" ? "#00ff6a" : s === "closed-cold" ? "#e74c3c" : "rgba(201,162,39,0.3)";
  const statusLabel = (s: CaseStatus) =>
    s === "available" ? "AVAILABLE" : s === "in-progress" ? "ACTIVE" : s === "closed-solved" ? "SOLVED" : s === "closed-cold" ? "COLD" : "LOCKED";

  const solvedCount = cases.filter(c => c.status === "closed-solved").length;
  const xp = solvedCount * 1200 + cases.filter(c => c.status === "closed-cold").length * 200;
  const rank = solvedCount >= 5 ? "LEAD DETECTIVE" : solvedCount >= 3 ? "SENIOR DET." : solvedCount >= 1 ? "JUNIOR DET." : "TRAINEE";

  const hubItems = [
    { label: "MISSION BOARD",     color: "#ffd966", isPrimary: true,
      sub: activeCase
        ? `ACTIVE · ${CASES_CATALOG.find(c => c.caseId === activeCase.caseId)?.title ?? activeCase.caseId}`
        : "SELECT FROM OPEN CASE FILES",
      onClick: () => onNavigate("case-select"),  disabled: false, showDot: !!activeCase },
    { label: "NOTEBOOK",          color: "#b8a878", isPrimary: false, sub: "CASE ARCHIVE · YOUR NOTES",
      onClick: () => onNavigate("notebook"),     disabled: false, showDot: false },
    { label: "DETECTIVE RECORDS", color: "#b8a878", isPrimary: false, sub: "COMPLETED CASES · ACHIEVEMENTS",
      onClick: () => onNavigate("records"),      disabled: false, showDot: false },
    { label: "EVIDENCE WALL",     color: "#b8a878", isPrimary: false, sub: "CASE CONNECTIONS · THEORY BOARD",
      onClick: () => onNavigate("evidence-wall"), disabled: false, showDot: false },
    { label: "PROFILE",           color: "#b8a878", isPrimary: false, sub: "DETECTIVE RECORD · ACHIEVEMENTS",
      onClick: () => onNavigate("profile"),      disabled: false, showDot: false },
    { label: "SETTINGS",          color: "#b8a878", isPrimary: false, sub: "AUDIO · DISPLAY · CONTROLS",
      onClick: () => onNavigate("settings"),     disabled: false, showDot: false },
  ];

  return (
    <div className={`absolute inset-0 flex flex-col ${reduceMotion ? "" : "scene-drift"}`} style={{ background: "linear-gradient(135deg,#191008 0%,#140e06 100%)" }}>
      <MenuAnimatedBg reduceMotion={reduceMotion} />

      {/* Cork grain */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle 1px at 17px 17px, rgba(201,162,39,0.05) 0, transparent 0)",
        backgroundSize: "17px 17px",
      }} />

      {/* BG strings SVG — foreground decorative (separate from MenuAnimatedBg strings) */}
      <svg className={`absolute inset-0 w-full h-full pointer-events-none ${reduceMotion ? "" : "mbg-string-pulse"}`} style={{ opacity: 0.13 }}>
        {BG_STRINGS.map(([a, b], i) => (
          <line key={i}
            x1={`${BG_PINS[a].x + 4}%`} y1={`${BG_PINS[a].y + 2}%`}
            x2={`${BG_PINS[b].x + 4}%`} y2={`${BG_PINS[b].y + 2}%`}
            stroke="rgba(200,20,20,1)" strokeWidth="1.2"
          />
        ))}
      </svg>

      {/* BG pinned cards */}
      {BG_PINS.map((p, i) => (
        <div key={i} className={`absolute pointer-events-none ${reduceMotion ? "" : "mbg-pin-sway"}`} style={{
          left: `${p.x}%`, top: `${p.y}%`,
          opacity: i < 2 ? 0.17 : 0.10,
          filter: "blur(0.8px)",
          "--f-rot": `${p.rot}deg`,
          animationDelay: `${i * 2.5}s`,
        } as React.CSSProperties}>
          <div style={{ position: "relative", backgroundColor: "#e2cfae", padding: "5px 9px", width: "80px", boxShadow: "2px 3px 8px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%)", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#c9a227" }} />
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#1a1005" }}>{p.label}</div>
          </div>
        </div>
      ))}

      {/* Content scrim — glow re-centered above NEW CASE tile area */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 70% at 50% 52%, rgba(7,9,15,0.38) 0%, rgba(7,9,15,0.65) 100%)" }} />

      {/* Rare fluorescent flicker */}
      {showFlicker && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6, backgroundColor: "rgba(7,9,15,0.03)" }} />
      )}

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-6 py-3" style={{ borderBottom: "1px solid rgba(201,162,39,0.15)", backgroundColor: "rgba(7,9,15,0.55)" }}>
        {/* Title + stamp chip */}
        <div className="flex items-start gap-3">
          <div style={{ transform: "rotate(-3deg)" }}>
            <div style={{
              fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966",
              letterSpacing: "0.1em", lineHeight: 1,
              animation: reduceMotion
                ? "amber-glow 2.4s ease-in-out infinite"
                : "amber-glow 2.4s ease-in-out infinite, title-breathe 4s ease-in-out infinite",
            }}>DIGITAL DETECTIVE</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.22em" }}>
              PRECINCT 14 · DIVISION OF DIGITAL INVESTIGATIONS
            </div>
          </div>
        </div>
        {/* Status right */}
        <div style={{ textAlign: "right" }}>
          <div className="cyan-flicker" style={{
            fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#00e9ff",
            letterSpacing: "0.15em", animationDuration: reduceMotion ? "0s" : "10s",
          }}>● SYSTEM ONLINE</div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.12em", marginTop: "2px" }}>{clock} · PRECINCT 14</div>
        </div>
      </div>

      {/* Stat row — rank / XP / coins */}
      <div className="relative flex items-center gap-8 px-6 py-2" style={{ borderBottom: "1px solid rgba(201,162,39,0.1)", backgroundColor: "rgba(7,9,15,0.5)", flexShrink: 0 }}>
        {profile && (
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#c9a227", letterSpacing: "0.14em" }}>
            {profile.name} · {profile.badgeId}
          </div>
        )}
        <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201,162,39,0.08)" }} />
        {[
          { label: "RANK", value: rank },
          { label: "XP", value: xp.toLocaleString() },
          { label: "CASES CLOSED", value: `${solvedCount}` },
        ].map(({ label, value }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(201,162,39,0.35)", letterSpacing: "0.18em", marginBottom: "2px" }}>{label}</div>
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#c9b882", letterSpacing: "0.08em" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Center layout */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Left column */}
        <div className="flex-shrink-0 flex flex-col justify-between py-6 px-5" style={{ width: "200px", borderRight: "1px solid rgba(201,162,39,0.1)", backgroundColor: "rgba(7,9,15,0.55)" }}>
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.2em", color: "rgba(201,162,39,0.4)", marginBottom: "10px" }}>ACTIVE DOSSIER</div>
            {activeCase ? (
              <div style={{ border: "1px solid rgba(201,162,39,0.25)", padding: "12px" }}>
                <div style={{ fontFamily: "Special Elite, serif", fontSize: "22px", color: "#ffd966", letterSpacing: "0.07em" }}>{activeCase.caseId}</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#b8a878", marginTop: "3px" }}>
                  {CASES_CATALOG.find(c => c.caseId === activeCase.caseId)?.title}
                </div>
                <div style={{ height: "1px", backgroundColor: "rgba(201,162,39,0.15)", margin: "8px 0" }} />
                {[
                  { k: "STATUS", v: "ACTIVE" },
                  { k: "TIME LEFT", v: `${Math.floor(activeCase.timeRemainingSec / 60)}m ${activeCase.timeRemainingSec % 60}s` },
                  { k: "VERDICTS", v: `${activeCase.verdictsGiven.length}` },
                ].map((r) => (
                  <div key={r.k} className="flex justify-between" style={{ marginBottom: "4px" }}>
                    <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.45)", letterSpacing: "0.1em" }}>{r.k}</span>
                    <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#c9b882" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ border: "1px solid rgba(201,162,39,0.12)", padding: "12px" }}>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "rgba(201,162,39,0.3)", letterSpacing: "0.1em" }}>NO ACTIVE CASE</div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "rgba(201,162,39,0.2)", marginTop: "4px" }}>SELECT NEW CASE TO BEGIN</div>
              </div>
            )}
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(201,162,39,0.25)", lineHeight: 1.8 }}>
            DETECTIVE: R. CHEN<br />BADGE: 7741-DDI<br />CLEARANCE: LEVEL 4
          </div>
        </div>

        {/* Menu column */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3" style={{ position: "relative" }}>
          {/* One-time red string draw */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: "visible" }}>
            {!reduceMotion && (
              <line x1="52%" y1="36%" x2="26%" y2="46%"
                stroke="rgba(200,20,20,0.5)" strokeWidth="1.1" strokeLinecap="round"
                strokeDasharray="220" strokeDashoffset={stringVisible ? 0 : 220}
                style={{ transition: stringVisible ? "stroke-dashoffset 0.95s ease-out" : "none" }}
              />
            )}
          </svg>

          {/* SELECT OPERATION divider with flanking lines + cursor */}
          <div className="flex items-center gap-3" style={{ marginBottom: "4px", position: "relative", zIndex: 1, width: "380px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201,162,39,0.2)" }} />
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.28em", color: "rgba(201,162,39,0.3)" }}>
              SELECT OPERATION
            </div>
            <span className={reduceMotion ? "" : "op-cursor-blink"} style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(0,233,255,0.45)" }}>_</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(201,162,39,0.2)" }} />
          </div>

          {hubItems.map((item, i) => {
            const isHov  = hovered === i && !item.disabled;
            const hasScan = hovScan === i;
            const isNewCase = item.label === "MISSION BOARD";
            const isPressed = pressedIdx === i;
            return (
              <motion.button
                key={item.label}
                onClick={() => { if (!item.disabled) { playThunk(); item.onClick(); } }}
                onMouseEnter={() => handleTileEnter(i, item.disabled)}
                onMouseLeave={() => { setHovered(null); setPressedIdx(null); }}
                onMouseDown={() => { if (!item.disabled) setPressedIdx(i); }}
                onMouseUp={() => setPressedIdx(null)}
                disabled={item.disabled}
                initial={reduceMotion ? false : { opacity: 0, y: 12, rotate: i % 2 === 0 ? 1.8 : -1.8 }}
                animate={{
                  opacity: item.disabled ? 0.45 : 1, y: 0, rotate: 0,
                  scale: isPressed && !item.disabled ? 0.97 : 1,
                  filter: isPressed && !item.disabled ? "brightness(1.18)" : "brightness(1)",
                }}
                transition={{ duration: isPressed ? 0.06 : 0.45, delay: isPressed ? 0 : i * 0.12, ease: "easeOut" }}
                className={isNewCase && !reduceMotion ? "tile-amber-box-glow" : ""}
                style={{
                  width: "380px",
                  border: `1px solid ${isHov ? item.color : item.isPrimary && !item.disabled ? "rgba(201,162,39,0.35)" : "rgba(201,162,39,0.14)"}`,
                  backgroundColor: isHov ? "rgba(201,162,39,0.07)" : "rgba(7,9,15,0.6)",
                  padding: "14px 22px",
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  textAlign: "left",
                  transition: "border-color 0.16s, background-color 0.16s",
                  boxShadow: isNewCase
                    ? undefined
                    : `0 4px 12px rgba(0,0,0,0.5)${isHov ? ", 0 0 14px rgba(201,162,39,0.10)" : ""}, inset 0 1px 0 rgba(255,217,102,0.06)`,
                  position: "relative", overflow: "hidden", zIndex: 1,
                }}
              >
                {/* Left accent flicker on hover */}
                <div className={isHov && !reduceMotion ? "tile-border-flicker" : ""}
                  style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", backgroundColor: item.color, opacity: isHov ? 1 : 0, transition: "opacity 0.16s" }}
                />
                {/* Scanline sweep */}
                {hasScan && (
                  <div className="tile-scan-active" style={{
                    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
                    background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.14) 3px, rgba(0,0,0,0.14) 4px)",
                  }} />
                )}
                <div style={{
                  fontFamily: "Special Elite, serif", fontSize: item.isPrimary ? "20px" : "16px",
                  letterSpacing: "0.18em", color: item.color, lineHeight: 1,
                  textShadow: isHov ? `0 0 14px ${item.color}70` : "none",
                  transition: "text-shadow 0.16s",
                  display: "flex", alignItems: "center", gap: "9px",
                }}>
                  {item.showDot && (
                    <div className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e74c3c", flexShrink: 0 }} />
                  )}
                  {item.label}
                </div>
                <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", letterSpacing: "0.14em", color: isHov ? "#b8a878" : "rgba(184,168,120,0.4)", marginTop: "5px", transition: "color 0.16s" }}>
                  {item.sub}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex-shrink-0 flex flex-col justify-between py-6 px-5" style={{ width: "200px", borderLeft: "1px solid rgba(201,162,39,0.1)", backgroundColor: "rgba(7,9,15,0.55)" }}>
          <div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(201,162,39,0.4)", marginBottom: "10px" }}>CASE FILES</div>
            {cases.slice(0, 3).map((c) => {
              const meta = CASES_CATALOG.find(m => m.caseId === c.caseId)!;
              return (
                <div key={c.caseId} style={{ borderBottom: "1px solid rgba(201,162,39,0.08)", paddingBottom: "8px", marginBottom: "8px" }}>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: statusColor(c.status), letterSpacing: "0.08em" }}>{c.caseId}</div>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", marginTop: "1px" }}>
                    {c.status === "locked" ? "CLASSIFIED" : meta.title}
                  </div>
                  <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.15em", color: statusColor(c.status), opacity: 0.8, marginTop: "2px" }}>
                    {statusLabel(c.status)}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "0.12em", color: "rgba(201,162,39,0.22)", lineHeight: 1.8 }}>
            CASE ENGINE REV 14<br />BUILD 2024-07-12<br />© PRECINCT 14 DDI
          </div>
        </div>
      </div>

      {/* Bottom bar — dot-pulse only when active */}
      <div className="relative flex items-center gap-6 px-6 py-2" style={{ borderTop: "1px solid rgba(201,162,39,0.12)", backgroundColor: "rgba(7,9,15,0.55)" }}>
        <div className="flex items-center gap-2">
          <div className={activeCase ? "dot-pulse" : ""} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: activeCase ? "#e74c3c" : "#3a3428" }} />
          <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.14em" }}>
            {activeCase ? "1 ACTIVE INVESTIGATION" : "NO ACTIVE INVESTIGATION"}
          </span>
        </div>
        <span style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "rgba(184,168,120,0.35)", letterSpacing: "0.12em" }}>SECURE CHANNEL · AES-256</span>
      </div>
    </div>
  );
}