import type { CaseRecord, PlayerProfile, SettingsState } from "../types";
import { INITIAL_CASES } from "../data/casesData";

export function loadCases(): CaseRecord[] {
  try { const s = localStorage.getItem("dd_cases"); return s ? JSON.parse(s) : INITIAL_CASES; }
  catch { return INITIAL_CASES; }
}


export function saveCases(cs: CaseRecord[]) {
  try { localStorage.setItem("dd_cases", JSON.stringify(cs)); } catch {}
}


export function loadProfile(): PlayerProfile | null {
  try { const s = localStorage.getItem("dd_profile"); return s ? JSON.parse(s) : null; }
  catch { return null; }
}


export function saveProfile(p: PlayerProfile) {
  try { localStorage.setItem("dd_profile", JSON.stringify(p)); } catch {}
}


export const DEFAULT_SETTINGS: SettingsState = {
  ambientSound: true,
  typewriterSfx: true,
  scanlines: true,
  highContrast: false,
  compactInterface: false,
  autoSave: true,
  showTimestamps: true,
  keyboardNav: false,
  hintAssistance: false,
  caseDifficulty: "detective",
  evidenceAutoLog: true,
  redactedWarning: true,
  reduceMotion: false,
  colorblindMode: false,
};


export function loadSettings(): SettingsState {
  try { const s = localStorage.getItem("dd_settings"); return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS; }
  catch { return DEFAULT_SETTINGS; }
}


export function saveSettings(s: SettingsState) {
  try { localStorage.setItem("dd_settings", JSON.stringify(s)); } catch {}
}
