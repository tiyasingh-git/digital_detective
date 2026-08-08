import { useMemo } from "react";

export function Rain() {
  const drops = useMemo(() => Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    duration: 0.45 + Math.random() * 0.55,
    opacity: 0.15 + Math.random() * 0.35,
    height: 8 + Math.floor(Math.random() * 18),
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((d) => (
        <div
          key={d.id}
          className="rain-drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            background: `rgba(110,180,220,${d.opacity})`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
