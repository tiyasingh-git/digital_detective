export function Grain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[110] select-none"
      style={{
        opacity: 0.045,
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/></filter><rect width='256' height='256' filter='url(%23n)'/></svg>")`,
        mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
      }}
    />
  );
}


export function ScanLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[109] select-none"
      style={{
        background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.16) 3px, rgba(0,0,0,0.16) 4px)",
      }}
    />
  );
}


export function Vignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[108] select-none"
      style={{
        background: "radial-gradient(ellipse 78% 78% at 50% 44%, transparent 22%, rgba(2,4,14,0.96) 100%)",
      }}
    />
  );
}
