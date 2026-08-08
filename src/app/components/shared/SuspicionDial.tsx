export function SuspicionDial({ value }: { value: number }) {
  const cx = 70, cy = 80, r = 48, needleLen = 39;

  // Arc: 150° (8-o'clock) → 30° (4-o'clock) clockwise through 270° (12-o'clock)
  const deg2rad = (d: number) => (d * Math.PI) / 180;

  const arcPath = (sd: number, ed: number) => {
    const s = deg2rad(sd), e = deg2rad(ed);
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    const cw = ((ed - sd) + 360) % 360;
    const large = cw > 180 ? 1 : 0;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  // 240° total sweep. Thirds: 150→230→310→30(=390°)
  const needleDeg = 150 + (value / 100) * 240;
  const needleRad = deg2rad(needleDeg);
  const nx = cx + needleLen * Math.cos(needleRad);
  const ny = cy + needleLen * Math.sin(needleRad);

  const needleColor = value > 66 ? "#ff4d4d" : value > 33 ? "#f5b942" : "#00ff6a";

  return (
    <div className="flex flex-col items-center pb-3">
      <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.22em", color: "#ffe6a8", marginBottom: "4px" }}>
        SUSPICION INDEX
      </div>
      <svg width="140" height="105" viewBox="0 0 140 105">
        <defs>
          <linearGradient id="arcGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="arcAmberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97b0a" />
          </linearGradient>
          <linearGradient id="arcRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        <path d={arcPath(150, 230)} fill="none" stroke="url(#arcGreenGrad)" strokeWidth="7" strokeLinecap="round" />
        <path d={arcPath(230, 310)} fill="none" stroke="url(#arcAmberGrad)" strokeWidth="7" strokeLinecap="round" />
        <path d={arcPath(310, 390)} fill="none" stroke="url(#arcRedGrad)" strokeWidth="7" strokeLinecap="round" />
        {[0, 25, 50, 75, 100].map((v) => {
          const d = deg2rad(150 + (v / 100) * 240);
          return (
            <line key={v}
              x1={(cx + (r - 5) * Math.cos(d)).toFixed(1)}
              y1={(cy + (r - 5) * Math.sin(d)).toFixed(1)}
              x2={(cx + (r + 4) * Math.cos(d)).toFixed(1)}
              y2={(cy + (r + 4) * Math.sin(d)).toFixed(1)}
              stroke="#ffffff" strokeWidth="1.5"
            />
          );
        })}
        <g className="needle-tremble" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <line
            x1={cx} y1={cy}
            x2={nx.toFixed(1)} y2={ny.toFixed(1)}
            stroke={needleColor} strokeWidth="2.5" strokeLinecap="round"
          />
          <line
            x1={cx} y1={cy}
            x2={(cx - (nx - cx) * 0.22).toFixed(1)}
            y2={(cy - (ny - cy) * 0.22).toFixed(1)}
            stroke={needleColor} strokeWidth="3" strokeLinecap="round" opacity={0.35}
          />
        </g>
        <circle cx={cx} cy={cy} r="5.5" fill={needleColor} />
        <circle cx={cx} cy={cy} r="3" fill="#07090f" />
        <text x={cx} y="99" textAnchor="middle" fill={needleColor}
          fontSize="11" fontFamily="Courier Prime, monospace" fontWeight="bold">
          {value}
        </text>
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", width: "110px", fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#e8dcc0" }}>
        <span>LOW</span><span>MED</span><span>HIGH</span>
      </div>
    </div>
  );
}
