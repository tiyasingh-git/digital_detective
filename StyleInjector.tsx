export const STYLES = `
  @keyframes needle-tremble {
    0%   { transform: rotate(-1.1deg); }
    30%  { transform: rotate(0.7deg);  }
    60%  { transform: rotate(-0.4deg); }
    85%  { transform: rotate(1.0deg);  }
    100% { transform: rotate(-0.8deg); }
  }
  @keyframes rain-fall {
    from { transform: translateY(-24px); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    to   { transform: translateY(110vh); opacity: 0; }
  }
  @keyframes amber-glow {
    0%, 100% { text-shadow: 0 0 4px rgba(201,162,39,0.5); }
    50%       { text-shadow: 0 0 14px rgba(201,162,39,0.9), 0 0 28px rgba(201,162,39,0.3); }
  }
  @keyframes clock-blink {
    0%,49%  { opacity: 1; }
    50%,100%{ opacity: 0.2; }
  }
  @keyframes dot-pulse {
    0%,100%{ box-shadow: 0 0 0 0 rgba(231,76,60,0.6); }
    50%    { box-shadow: 0 0 0 6px rgba(231,76,60,0); }
  }
  @keyframes cyan-flicker {
    0%,100%{ opacity:1; }
    91%{ opacity:1; }
    92%{ opacity:0.65; }
    94%{ opacity:1; }
    96%{ opacity:0.8; }
    98%{ opacity:1; }
  }
  @keyframes card-shake {
    0%,100% { transform: rotate(var(--rot,0deg)); }
    20% { transform: rotate(var(--rot,0deg)) translateX(-6px); }
    40% { transform: rotate(var(--rot,0deg)) translateX(6px); }
    60% { transform: rotate(var(--rot,0deg)) translateX(-4px); }
    80% { transform: rotate(var(--rot,0deg)) translateX(4px); }
  }
  @keyframes typewriter-cursor {
    0%,100%{ opacity:1; } 50%{ opacity:0; }
  }
  .needle-tremble  { animation: needle-tremble 0.45s ease-in-out infinite; }
  .rain-drop       { position:absolute; width:1px; animation: rain-fall linear infinite; }
  .amber-glow      { animation: amber-glow 2.4s ease-in-out infinite; }
  .clock-colon     { animation: clock-blink 1s step-end infinite; }
  .dot-pulse       { animation: dot-pulse 2s ease-in-out infinite; }
  .cyan-flicker    { animation: cyan-flicker 5s ease-in-out infinite; }
  .card-shake      { animation: card-shake 0.38s ease; }
  .tw-cursor       { animation: typewriter-cursor 0.7s step-end infinite; }
  /* ── Animated menu background ── */
  @keyframes mbg-glass-drift {
    0%,100% { transform: translateX(-60px); }
    50%     { transform: translateX(60px);  }
  }
  @keyframes mbg-folder-float {
    0%,100% { transform: rotate(var(--f-rot,0deg)) translateY(0px);    }
    50%     { transform: rotate(var(--f-rot,0deg)) translateY(-18px); }
  }
  @keyframes mbg-grid-pan {
    0%   { background-position: 0 0; }
    100% { background-position: 40px 40px; }
  }
  @keyframes mbg-string-pulse {
    0%,100% { opacity: 0.045; }
    50%     { opacity: 0.10;  }
  }
  .mbg-glass-drift   { animation: mbg-glass-drift 22s ease-in-out infinite; }
  .mbg-folder-float  { animation: mbg-folder-float 15s ease-in-out infinite; }
  .mbg-grid-pan      { animation: mbg-grid-pan 28s linear infinite; }
  .mbg-string-pulse  { animation: mbg-string-pulse 12s ease-in-out infinite; }
  /* ── Foreground menu panel ── */
  @keyframes title-breathe {
    0%,100% { opacity: 0.88; }
    50%     { opacity: 1; }
  }
  @keyframes tile-border-flicker {
    0%,100% { opacity: 1; }
    18%     { opacity: 0.28; }
    34%     { opacity: 1; }
    52%     { opacity: 0.62; }
    66%     { opacity: 1; }
  }
  @keyframes tile-scan-pass {
    from { transform: translateY(-100%); }
    to   { transform: translateY(250%); }
  }
  .tile-border-flicker { animation: tile-border-flicker 0.34s ease; }
  .tile-scan-active    { animation: tile-scan-pass 0.62s linear; }
  /* ── Scene / tile depth ── */
  @keyframes scene-drift {
    0%,100% { transform: translateY(0px);  }
    50%     { transform: translateY(-3px); }
  }
  @keyframes tile-amber-box-glow {
    0%,100% { box-shadow: 0 4px 16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,217,102,0.06); }
    50%     { box-shadow: 0 4px 16px rgba(0,0,0,0.55), 0 0 20px rgba(201,162,39,0.22), inset 0 1px 0 rgba(255,217,102,0.06); }
  }
  @keyframes op-cursor-blink {
    0%,49%  { opacity: 1; }
    50%,100%{ opacity: 0; }
  }
  @keyframes lamp-hot {
    0%   { opacity: 0.065; }
    14%  { opacity: 0.10;  }
    29%  { opacity: 0.05;  }
    47%  { opacity: 0.11;  }
    63%  { opacity: 0.07;  }
    81%  { opacity: 0.12;  }
    100% { opacity: 0.065; }
  }
  .scene-drift         { animation: scene-drift 21s ease-in-out infinite; }
  .tile-amber-box-glow { animation: tile-amber-box-glow 3s ease-in-out infinite; }
  .op-cursor-blink     { animation: op-cursor-blink 1.1s step-end infinite; }
  .lamp-hot            { animation: lamp-hot 4.2s ease-in-out infinite; }
  @keyframes mbg-pin-sway {
    0%,100% { transform: rotate(var(--f-rot,0deg)) translateY(0px); }
    33%     { transform: rotate(calc(var(--f-rot,0deg) + 1.8deg)) translateY(-6px); }
    66%     { transform: rotate(calc(var(--f-rot,0deg) - 1.2deg)) translateY(-3px); }
  }
  @keyframes scanline-sweep {
    0%   { background-position: 0 0; }
    100% { background-position: 0 100vh; }
  }
  .mbg-pin-sway { animation: mbg-pin-sway 18s ease-in-out infinite; }
  .scanline-sweep { animation: scanline-sweep 8s linear infinite; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(201,162,39,0.25); }
  ::-webkit-scrollbar-track { background: transparent; }
`;


export function StyleInjector() {
  return <style dangerouslySetInnerHTML={{ __html: STYLES }} />;
}
