import { useState, useEffect } from "react";

import type { PlayerProfile, SettingsState } from "../types";
import { ToggleSwitch, SegmentedControl, SettingsSection, SettingsRow } from "../components/shared/SettingsControls";
import { saveSettings } from "../lib/storage";

export function SettingsScreen({ onBack, profile, settings, onSettingsChange }: {
  onBack: () => void;
  profile: PlayerProfile | null;
  settings: SettingsState;
  onSettingsChange: (s: SettingsState) => void;
}) {
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
  });

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setClock(`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const set = <K extends keyof SettingsState>(key: K, val: SettingsState[K]) => {
    const next = { ...settings, [key]: val };
    saveSettings(next);
    onSettingsChange(next);
  };

  const toggle = (key: keyof SettingsState) => set(key, !settings[key] as SettingsState[typeof key]);

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "radial-gradient(ellipse at center,#0d0c09 0%,#07090f 100%)" }}>
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle 1px at 18px 18px, rgba(201,162,39,0.04) 0, transparent 0)",
        backgroundSize: "18px 18px",
      }} />

      {/* Header */}
      <div className="relative flex items-center justify-between px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(201,162,39,0.22)", backgroundColor: "rgba(7,9,15,0.82)" }}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} style={{
            fontFamily: "Special Elite, serif", fontSize: "20px", letterSpacing: "0.15em",
            color: "#c9a227", border: "1px solid rgba(201,162,39,0.4)", backgroundColor: "transparent",
            padding: "5px 14px", cursor: "pointer",
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.textShadow = "none"}
          >← BUREAU</button>
          <div>
            <div style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.09em" }}>TERMINAL SETTINGS</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.2em", marginTop: "2px" }}>PRECINCT 14 · SYSTEM CONFIGURATION</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="dot-pulse flex-shrink-0" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#00e9ff" }} />
          <div style={{ textAlign: "right" }}>
            <div className="cyan-flicker" style={{ fontFamily: "Courier Prime, monospace", fontSize: "10px", color: "#00e9ff", letterSpacing: "0.15em" }}>SYSTEM ONLINE</div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#b8a878", letterSpacing: "0.12em", marginTop: "2px" }}>{clock} · PRECINCT 14</div>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="relative flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin" }}>
        <div className="max-w-2xl mx-auto flex flex-col gap-6">

          <SettingsSection label="AUDIO">
            <SettingsRow
              title="Ambient Soundscape"
              desc="Background atmosphere audio — rain, static, city ambience."
              control={<ToggleSwitch on={settings.ambientSound} onChange={(v) => set("ambientSound", v)} />}
            />
            <SettingsRow
              title="Typewriter Sound Effects"
              desc="Keystroke audio feedback on evidence stamps and input fields."
              control={<ToggleSwitch on={settings.typewriterSfx} onChange={(v) => set("typewriterSfx", v)} />}
            />
          </SettingsSection>

          <SettingsSection label="DISPLAY">
            <SettingsRow
              title="CRT Scanlines"
              desc="Retro terminal scanline overlay effect across all screens."
              control={<ToggleSwitch on={settings.scanlines} onChange={(v) => set("scanlines", v)} />}
            />
            <SettingsRow
              title="High Contrast Mode"
              desc="Enhanced text visibility — boosts foreground brightness."
              control={<ToggleSwitch on={settings.highContrast} onChange={(v) => set("highContrast", v)} />}
            />
            <SettingsRow
              title="Compact Interface"
              desc="Reduced padding and spacing for smaller display sizes."
              control={<ToggleSwitch on={settings.compactInterface} onChange={(v) => set("compactInterface", v)} />}
            />
          </SettingsSection>

          <SettingsSection label="CONTROLS">
            <SettingsRow
              title="Auto-Save Progress"
              desc="Automatically saves case state after each major action."
              control={<ToggleSwitch on={settings.autoSave} onChange={(v) => set("autoSave", v)} />}
            />
            <SettingsRow
              title="Show Timestamps"
              desc="Display time metadata on all case records and evidence entries."
              control={<ToggleSwitch on={settings.showTimestamps} onChange={(v) => set("showTimestamps", v)} />}
            />
            <SettingsRow
              title="Keyboard Navigation"
              desc="Full keyboard shortcut support for stamp actions and tab switching."
              control={<ToggleSwitch on={settings.keyboardNav} onChange={(v) => set("keyboardNav", v)} />}
            />
          </SettingsSection>

          <SettingsSection label="GAMEPLAY">
            <SettingsRow
              title="Hint Assistance"
              desc="Receive a nudge after repeated incorrect guesses or prolonged inactivity."
              control={<ToggleSwitch on={settings.hintAssistance} onChange={(v) => set("hintAssistance", v)} />}
            />
            <SettingsRow
              title="Case Difficulty"
              desc="Adjusts suspect pool size and evidence ambiguity across all cases."
              control={
                <SegmentedControl
                  options={[
                    { id: "rookie", label: "ROOKIE" },
                    { id: "detective", label: "DETECTIVE" },
                    { id: "veteran", label: "VETERAN" },
                  ]}
                  value={settings.caseDifficulty}
                  onChange={(v) => set("caseDifficulty", v as SettingsState["caseDifficulty"])}
                />
              }
            />
            <SettingsRow
              title="Evidence Auto-Log"
              desc="Automatically pins newly found clues to the Evidence Wall as you investigate."
              control={<ToggleSwitch on={settings.evidenceAutoLog} onChange={(v) => set("evidenceAutoLog", v)} />}
            />
            <SettingsRow
              title="Redacted Content Warning"
              desc="Warn before displaying sensitive or graphically disturbing case material."
              control={<ToggleSwitch on={settings.redactedWarning} onChange={(v) => set("redactedWarning", v)} />}
            />
            <SettingsRow
              title="Reduce Motion"
              desc="Disables background parallax drift, menu animations, and prop sway."
              control={<ToggleSwitch on={settings.reduceMotion} onChange={(v) => set("reduceMotion", v)} />}
            />
            <SettingsRow
              title="Colorblind-Safe Mode"
              desc="Remaps red/green status indicators to amber/cyan using existing palette tokens."
              control={<ToggleSwitch on={settings.colorblindMode} onChange={(v) => set("colorblindMode", v)} />}
            />
          </SettingsSection>

        </div>
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between px-5 py-2 flex-shrink-0" style={{ borderTop: "1px solid rgba(201,162,39,0.12)", backgroundColor: "rgba(7,9,15,0.75)" }}>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.14em" }}>
          TERMINAL CONFIGURATION · {profile?.badgeId ?? "DDI-UNKNOWN"}
        </div>
        <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#3a3428", letterSpacing: "0.14em" }}>
          CASE ENGINE REV 14 · BUILD 2024-07-12 · VER 1.0.0
        </div>
      </div>
    </div>
  );
}