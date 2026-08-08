export function AvatarTile({ idx, selected, onSelect }: { idx: number; selected: boolean; onSelect: () => void }) {
  // Eight passport-photo style faces (4 human, 4 animal), all sharing the same
  // ID-photo corner marks and a common head circle so every option lines up.
  const cornerMarks = (
    <>
      <path d="M5,12 V6 H11" />
      <path d="M41,12 V6 H35" />
      <path d="M5,48 V54 H11" />
      <path d="M41,48 V54 H35" />
    </>
  );
  const avatars = [
    // 0 man — short neat hair
    <svg key={0} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <path d="M9,27 Q9,13 23,13 Q37,13 37,27 L34,22 Q29,17 23,18 Q17,17 12,22 Z" fill="currentColor" fillOpacity="0.28"/>
      <circle cx="17.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <line x1="23" y1="31" x2="23" y2="35"/>
      <path d="M18,38.5 Q23,41.5 28,38.5" />
    </svg>,
    // 1 man — mustache, receding hairline
    <svg key={1} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <path d="M10,23 Q10,14 16,13" fill="none"/>
      <path d="M36,23 Q36,14 30,13" fill="none"/>
      <circle cx="17.5" cy="28" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28.5" cy="28" r="1.3" fill="currentColor" stroke="none"/>
      <line x1="23" y1="30" x2="23" y2="34"/>
      <path d="M17,36.5 Q23,39.5 29,36.5" strokeWidth="2.6" fill="none"/>
    </svg>,
    // 2 woman — long hair
    <svg key={2} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <path d="M8,26 Q6,13 23,12 Q40,13 38,26 L38,47 Q34,34 23,34 Q12,34 8,47 Z" fill="currentColor" fillOpacity="0.22"/>
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <circle cx="17.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <line x1="23" y1="31" x2="23" y2="35"/>
      <path d="M18,38.5 Q23,41.5 28,38.5" />
    </svg>,
    // 3 woman — short bob
    <svg key={3} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <path d="M8,26 Q7,12 23,12 Q39,12 38,26 L37,41 L9,41 Z" fill="currentColor" fillOpacity="0.24"/>
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <circle cx="17.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <line x1="23" y1="31" x2="23" y2="35"/>
      <path d="M18,38.5 Q23,41.5 28,38.5" />
    </svg>,
    // 4 fox
    <svg key={4} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <path d="M11,20 L6,7 L18,17 Z" fill="currentColor" fillOpacity="0.22"/>
      <path d="M35,20 L40,7 L28,17 Z" fill="currentColor" fillOpacity="0.22"/>
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <path d="M17,37 L23,46 L29,37 Z" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="23" cy="44" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M14,27 L19,29" /><path d="M32,27 L27,29" />
    </svg>,
    // 5 owl
    <svg key={5} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <path d="M13,17 L9,9 L17,15 Z" fill="currentColor" fillOpacity="0.22"/>
      <path d="M33,17 L37,9 L29,15 Z" fill="currentColor" fillOpacity="0.22"/>
      <circle cx="23" cy="31" r="14" fill="currentColor" fillOpacity="0.10"/>
      <circle cx="17" cy="30" r="5" fill="currentColor" fillOpacity="0.14"/>
      <circle cx="29" cy="30" r="5" fill="currentColor" fillOpacity="0.14"/>
      <circle cx="17" cy="30" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="29" cy="30" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M21,36 L23,40 L25,36 Z" fill="currentColor" fillOpacity="0.3"/>
    </svg>,
    // 6 cat
    <svg key={6} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <path d="M12,20 L9,8 L20,16 Z" fill="currentColor" fillOpacity="0.22"/>
      <path d="M34,20 L37,8 L26,16 Z" fill="currentColor" fillOpacity="0.22"/>
      <circle cx="23" cy="30" r="14" fill="currentColor" fillOpacity="0.10"/>
      <path d="M20,29 L18,27 M26,29 L28,27" />
      <path d="M22,35 L23,37 L24,35 Z" fill="currentColor" fillOpacity="0.3"/>
      <path d="M23,37 Q20,40 17,39 M23,37 Q26,40 29,39" strokeWidth="1.2"/>
      <line x1="6" y1="32" x2="15" y2="32"/><line x1="6" y1="36" x2="15" y2="35"/>
      <line x1="40" y1="32" x2="31" y2="32"/><line x1="40" y1="36" x2="31" y2="35"/>
    </svg>,
    // 7 bear
    <svg key={7} width="46" height="60" viewBox="0 0 46 60" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {cornerMarks}
      <circle cx="11" cy="14" r="5.5" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="35" cy="14" r="5.5" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="23" cy="31" r="14" fill="currentColor" fillOpacity="0.10"/>
      <circle cx="17.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28.5" cy="29" r="1.3" fill="currentColor" stroke="none"/>
      <ellipse cx="23" cy="38" rx="6.5" ry="5" fill="currentColor" fillOpacity="0.16"/>
      <circle cx="23" cy="36" r="1.4" fill="currentColor" stroke="none"/>
    </svg>,
  ];

  return (
    <button onClick={onSelect} style={{
      width:"76px", height:"90px", display:"flex", alignItems:"center", justifyContent:"center",
      border:`1px solid ${selected ? "#c9a227" : "rgba(201,162,39,0.22)"}`,
      backgroundColor: selected ? "rgba(201,162,39,0.10)" : "rgba(7,9,15,0.55)",
      cursor:"pointer", transition:"all 0.15s",
      color: selected ? "#c9a227" : "#6b5f42",
      boxShadow: selected ? "0 0 14px rgba(201,162,39,0.28)" : "none",
    }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.45)"; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,162,39,0.22)"; }}
    >
      {avatars[idx]}
    </button>
  );
}
