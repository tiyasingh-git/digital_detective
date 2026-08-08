import { useState, useEffect } from "react";

export function MenuAnimatedBg({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [drawStrings, setDrawStrings] = useState(false);
  const [brightString, setBrightString] = useState(-1);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setDrawStrings(true), 500);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    let idx = 0;
    const cycle = () => {
      setBrightString(idx % 5);
      idx++;
      timer = setTimeout(() => {
        setBrightString(-1);
        timer = setTimeout(cycle, 15000 + Math.random() * 5000);
      }, 1000);
    };
    timer = setTimeout(cycle, 4000);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const folders = [
    { left: "71%", top: "10%", rot: -8,  delay: "0s",   scale: 0.95 },
    { left: "80%", top: "55%", rot:  5,  delay: "3.5s", scale: 1.05 },
    { left: "3%",  top: "62%", rot: -4,  delay: "7s",   scale: 0.74 },
    { left: "57%", top: "73%", rot: 11,  delay: "1.8s", scale: 0.62 },
  ];

  const nearX = reduceMotion ? 0 : (mousePos.x - 0.5) * -12;
  const nearY = reduceMotion ? 0 : (mousePos.y - 0.5) * -8;
  const midX  = reduceMotion ? 0 : (mousePos.x - 0.5) * -5;
  const midY  = reduceMotion ? 0 : (mousePos.y - 0.5) * -3;

  const STRINGS = [
    { x1: "13%", y1: "22%", x2: "63%", y2: "42%", w: "1.4", len: 340 },
    { x1: "63%", y1: "42%", x2: "84%", y2: "15%", w: "1.0", len: 240 },
    { x1: "13%", y1: "22%", x2: "37%", y2: "72%", w: "0.8", len: 300 },
    { x1: "37%", y1: "72%", x2: "60%", y2: "60%", w: "1.2", len: 210 },
    { x1: "60%", y1: "60%", x2: "88%", y2: "28%", w: "0.7", len: 280 },
  ];

  const PIN_ENDPOINTS = [
    { x: "11%", y: "19%", rot: -5 },
    { x: "61%", y: "39%", rot:  4 },
    { x: "35%", y: "69%", rot: -3 },
    { x: "82%", y: "12%", rot:  6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* FAR LAYER — grid pan */}
      <div className={`absolute inset-0 ${reduceMotion ? "" : "mbg-grid-pan"}`} style={{
        backgroundImage: "radial-gradient(circle 1px at 20px 20px, rgba(201,162,39,0.055) 0, transparent 0)",
        backgroundSize: "20px 20px",
      }} />

      {/* Far: city window-light silhouette in back corner */}
      <div className="absolute" style={{ right: "0", top: "0", opacity: 0.038, transform: `translate(${midX * 0.3}px, ${midY * 0.3}px)` }}>
        <svg width="260" height="200" viewBox="0 0 260 200" fill="none" stroke="rgba(201,162,39,1)" strokeWidth="1.5">
          <rect x="8" y="8" width="110" height="84" /><line x1="63" y1="8" x2="63" y2="92" /><line x1="8" y1="50" x2="118" y2="50" />
          <rect x="138" y="8" width="110" height="84" /><line x1="193" y1="8" x2="193" y2="92" /><line x1="138" y1="50" x2="248" y2="50" />
          <rect x="8" y="112" width="110" height="80" /><line x1="63" y1="112" x2="63" y2="192" /><line x1="8" y1="152" x2="118" y2="152" />
        </svg>
      </div>

      {/* MID LAYER — ambient lamp glow */}
      <div className={`absolute ${reduceMotion ? "" : "mbg-glass-drift"}`} style={{
        left: "-20%", top: "-10%", width: "140%", height: "140%",
        background: "radial-gradient(ellipse at 52% 28%, rgba(201,162,39,0.1) 0%, transparent 55%)",
        animationDuration: "25s",
        transform: `translate(${midX}px, ${midY}px)`,
      }} />
      {/* Lamp hot-spot — irregular flicker, repositioned above NEW CASE tile */}
      <div className={reduceMotion ? "absolute" : "absolute lamp-hot"} style={{
        left: "25%", top: "0%", width: "52%", height: "55%",
        background: "radial-gradient(ellipse at 50% 35%, rgba(201,162,39,0.13) 0%, transparent 52%)",
        transform: `translate(${midX}px, ${midY}px)`,
      }} />

      {/* Magnifying glass — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-glass-drift"}`} style={{ left: "3%", top: "18%", opacity: 0.11 }}>
          <svg width="148" height="168" viewBox="0 0 148 168" fill="none">
            <circle cx="60" cy="60" r="46" stroke="#c9a227" strokeWidth="9"/>
            <circle cx="60" cy="60" r="46" fill="rgba(201,162,39,0.04)"/>
            <circle cx="44" cy="40" r="10" fill="rgba(255,217,102,0.07)"/>
            <line x1="95" y1="95" x2="140" y2="140" stroke="#c9a227" strokeWidth="11" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Typewriter — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-glass-drift"}`} style={{ left: "60%", top: "60%", opacity: 0.08, animationDelay: "-10s" }}>
          <svg width="180" height="140" viewBox="0 0 180 140" fill="none" stroke="#c9a227" strokeWidth="3">
            <rect x="20" y="50" width="140" height="70" rx="10" />
            <path d="M40 50 L50 20 L130 20 L140 50" />
            <line x1="40" y1="80" x2="140" y2="80" />
            <line x1="50" y1="95" x2="130" y2="95" />
            <line x1="60" y1="110" x2="120" y2="110" />
            <rect x="55" y="5" width="70" height="30" fill="rgba(201,162,39,0.05)" />
          </svg>
        </div>
      </div>

      {/* Rotary Phone — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-glass-drift"}`} style={{ left: "15%", top: "75%", opacity: 0.06, animationDelay: "-5s" }}>
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="#c9a227" strokeWidth="3">
            <path d="M20 50 C20 30, 100 30, 100 50 L110 90 L10 90 Z" />
            <circle cx="60" cy="65" r="20" /><circle cx="60" cy="53" r="3" /><circle cx="70" cy="60" r="3" />
            <circle cx="72" cy="70" r="3" />
            <path d="M10 40 C10 10, 110 10, 110 40 L115 50 L105 50 C105 25, 15 25, 15 50 Z" />
          </svg>
        </div>
      </div>

      {/* NEW: Police radio/scanner — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ right: "5%", top: "42%", opacity: 0.07, "--f-rot": "4deg", animationDelay: "-11s" } as React.CSSProperties}>
          <svg width="110" height="80" viewBox="0 0 110 80" fill="none" stroke="#c9a227" strokeWidth="2">
            <rect x="5" y="20" width="100" height="55" rx="4" />
            <rect x="15" y="30" width="40" height="25" rx="2" />
            <circle cx="80" cy="42" r="10" /><circle cx="80" cy="42" r="5" />
            <line x1="65" y1="60" x2="95" y2="60" />
            <line x1="5" y1="20" x2="35" y2="5" /><line x1="35" y1="5" x2="50" y2="20" />
          </svg>
        </div>
      </div>

      {/* NEW: Open manila folder + clipped photo — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ left: "42%", top: "68%", opacity: 0.08, "--f-rot": "-7deg", animationDelay: "-6s" } as React.CSSProperties}>
          <svg width="96" height="74" viewBox="0 0 96 74" fill="none" stroke="#c9a227" strokeWidth="2">
            <rect x="2" y="18" width="92" height="54" />
            <path d="M2 18 L2 8 L32 8 L38 18Z" />
            <rect x="14" y="26" width="42" height="32" />
            <line x1="14" y1="34" x2="56" y2="34" /><line x1="14" y1="42" x2="56" y2="42" />
            <path d="M62 24 C62 20, 68 20, 68 24 L68 50 C68 56, 58 56, 58 50 L58 28 C58 24, 72 22, 72 28 L72 52" />
          </svg>
        </div>
      </div>

      {/* NEW: Stacked case files + magnifying glass on top — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ right: "4%", top: "58%", opacity: 0.07, "--f-rot": "3deg", animationDelay: "-17s" } as React.CSSProperties}>
          <svg width="100" height="120" viewBox="0 0 100 120" fill="none" stroke="#c9a227" strokeWidth="2">
            <rect x="8" y="42" width="84" height="70" /><rect x="4" y="37" width="84" height="70" /><rect x="0" y="32" width="84" height="70" />
            <line x1="10" y1="48" x2="74" y2="48" /><line x1="10" y1="56" x2="60" y2="56" /><line x1="10" y1="64" x2="70" y2="64" />
            <circle cx="68" cy="22" r="16" />
            <line x1="79" y1="33" x2="90" y2="44" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* NEW: Corkboard pushpin cluster — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ left: "26%", top: "8%", opacity: 0.08, "--f-rot": "0deg", animationDelay: "-20s" } as React.CSSProperties}>
          <svg width="70" height="60" viewBox="0 0 70 60" fill="none" stroke="#c9a227" strokeWidth="2">
            <circle cx="15" cy="15" r="5" /><line x1="15" y1="20" x2="15" y2="35" />
            <circle cx="40" cy="10" r="5" /><line x1="40" y1="15" x2="40" y2="30" />
            <circle cx="58" cy="22" r="5" /><line x1="58" y1="27" x2="58" y2="42" />
            <circle cx="28" cy="40" r="5" /><line x1="28" y1="45" x2="28" y2="58" />
            <line x1="15" y1="15" x2="40" y2="10" strokeDasharray="3,2" opacity="0.5" />
            <line x1="40" y1="10" x2="58" y2="22" strokeDasharray="3,2" opacity="0.5" />
            <line x1="15" y1="15" x2="28" y2="40" strokeDasharray="3,2" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Coffee ring stain — mid */}
      <div style={{ transform: `translate(${midX * 0.6}px, ${midY * 0.6}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ left: "45%", top: "35%", opacity: 0.15, "--f-rot": "15deg" } as React.CSSProperties}>
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", border: "4px solid rgba(80,50,18,0.4)", borderRightColor: "transparent", transform: "rotate(45deg)", filter: "blur(1px)" }} />
          <div style={{ position: "absolute", top: "10%", left: "10%", width: "80px", height: "80px", borderRadius: "50%", border: "2px solid rgba(80,50,18,0.2)", borderBottomColor: "transparent" }} />
        </div>
      </div>

      {/* Folder silhouettes — mid */}
      {folders.map((f, i) => (
        <div key={i} style={{ transform: `translate(${midX}px, ${midY}px)` }}>
          <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{
            left: f.left, top: f.top, opacity: 0.09,
            transform: `rotate(${f.rot}deg) scale(${f.scale})`,
            "--f-rot": `${f.rot}deg`,
            animationDelay: f.delay,
          } as React.CSSProperties}>
            <svg width="88" height="76" viewBox="0 0 88 76" fill="none">
              <rect x="0" y="17" width="88" height="59" fill="#c9a227"/>
              <rect x="0" y="6" width="38" height="17" fill="#c9a227"/>
              <rect x="8" y="28" width="72" height="2" fill="rgba(0,0,0,0.15)"/>
              <rect x="8" y="36" width="54" height="2" fill="rgba(0,0,0,0.1)"/>
              <rect x="8" y="44" width="66" height="2" fill="rgba(0,0,0,0.1)"/>
            </svg>
          </div>
        </div>
      ))}

      {/* Fingerprint card — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ right: "8%", top: "28%", opacity: 0.07, "--f-rot": "-6deg", animationDelay: "-9s", transform: "rotate(-6deg)" } as React.CSSProperties}>
          <svg width="100" height="70" viewBox="0 0 100 70" fill="none" stroke="#c9a227" strokeWidth="2">
            <rect x="2" y="2" width="96" height="66" rx="2"/>
            <line x1="10" y1="14" x2="90" y2="14"/>
            <ellipse cx="50" cy="42" rx="22" ry="18"/><ellipse cx="50" cy="42" rx="14" ry="11"/><ellipse cx="50" cy="42" rx="7" ry="5"/>
            <line x1="10" y1="60" x2="38" y2="60"/><line x1="62" y1="60" x2="90" y2="60"/>
          </svg>
        </div>
      </div>

      {/* Evidence tag — mid */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ left: "38%", top: "12%", opacity: 0.10, "--f-rot": "8deg", animationDelay: "-14s", transform: "rotate(8deg)" } as React.CSSProperties}>
          <svg width="70" height="44" viewBox="0 0 70 44" fill="none" stroke="#c9a227" strokeWidth="2">
            <path d="M10 4 L60 4 L66 22 L60 40 L10 40 L4 22 Z"/>
            <circle cx="14" cy="22" r="4"/>
            <line x1="22" y1="14" x2="56" y2="14"/><line x1="22" y1="22" x2="56" y2="22"/><line x1="22" y1="30" x2="44" y2="30"/>
          </svg>
        </div>
      </div>

      {/* NEAR LAYER — large open folder, higher opacity, slower, near parallax */}
      <div style={{ transform: `translate(${nearX}px, ${nearY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{
          left: "-3%", top: "28%", opacity: 0.16, "--f-rot": "-5deg",
          animationDuration: "22s", animationDelay: "-8s",
          transform: "rotate(-5deg) scale(1.7)",
        } as React.CSSProperties}>
          <svg width="88" height="76" viewBox="0 0 88 76" fill="none">
            <rect x="0" y="17" width="88" height="59" fill="#c9a227"/>
            <rect x="0" y="6" width="38" height="17" fill="#c9a227"/>
            <rect x="8" y="28" width="72" height="2" fill="rgba(0,0,0,0.15)"/>
            <rect x="8" y="36" width="54" height="2" fill="rgba(0,0,0,0.1)"/>
            <rect x="8" y="44" width="66" height="2" fill="rgba(0,0,0,0.1)"/>
          </svg>
        </div>
      </div>

      {/* Additional far-right folder — kept, mid parallax */}
      <div style={{ transform: `translate(${midX}px, ${midY}px)` }}>
        <div className={`absolute ${reduceMotion ? "" : "mbg-folder-float"}`} style={{ right: "22%", bottom: "5%", opacity: 0.06, "--f-rot": "-12deg", animationDelay: "-4s", transform: "rotate(-12deg) scale(1.4)" } as React.CSSProperties}>
          <svg width="88" height="76" viewBox="0 0 88 76" fill="none">
            <rect x="0" y="17" width="88" height="59" fill="#c9a227"/>
            <rect x="0" y="6" width="38" height="17" fill="#c9a227"/>
            <rect x="8" y="28" width="72" height="2" fill="rgba(0,0,0,0.15)"/>
            <rect x="8" y="36" width="48" height="2" fill="rgba(0,0,0,0.1)"/>
            <rect x="8" y="44" width="60" height="2" fill="rgba(0,0,0,0.1)"/>
          </svg>
        </div>
      </div>

      {/* String photo-endpoint chips */}
      {PIN_ENDPOINTS.map((p, i) => (
        <div key={i} className="absolute" style={{
          left: p.x, top: p.y,
          transform: `rotate(${p.rot}deg) translate(${midX * 0.6}px, ${midY * 0.6}px)`,
          opacity: 0.13,
        }}>
          <div style={{ width: "28px", height: "20px", backgroundColor: "#e2cfae", border: "1px solid rgba(201,162,39,0.4)", position: "relative" }}>
            <div style={{ position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)", width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#c9a227" }} />
          </div>
        </div>
      ))}

      {/* Red strings — staggered draw-in + per-string brightness pulse */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        {STRINGS.map((s, i) => (
          <line
            key={i}
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke="rgba(210,20,20,1)"
            strokeWidth={s.w}
            strokeDasharray={s.len}
            strokeDashoffset={drawStrings ? 0 : s.len}
            opacity={brightString === i ? 0.50 : 0.055}
            style={{
              transition: drawStrings
                ? `stroke-dashoffset 0.85s ease-out ${i * 0.3}s, opacity 0.35s ease`
                : "none",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
