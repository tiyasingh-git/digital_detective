// Shared type definitions used across the app.

export type Screen = "boot" | "splash" | "recruitment-letter" | "profile-creation" | "mira-onboarding" | "main-menu" | "case-select" | "mission-briefing" | "investigation" | "notebook" | "evidence-wall" | "case-resolution" | "records" | "skill-cards" | "settings" | "profile";


export type Tool = "scanner" | "timeline" | "camera" | "emotion" | "bias" | "metadata" | "verify" | null;


export type Verdict = "TRUST" | "VERIFY" | "REJECT" | "REPORT" | null;


export type CaseStatus = "available" | "in-progress" | "closed-solved" | "closed-cold" | "locked";


export interface DiscoveredFinding { elementId: string; toolId: string; text: string; }


export interface CaseRecord {
  caseId: string; status: CaseStatus; lastScreen: Screen;
  verdictsGiven: Verdict[]; wallSelection: number | null; timeRemainingSec: number;
  finalVerdict: Verdict; notebookNotes: string;
  discoveredFindings: DiscoveredFinding[];
  finalScore?: number; completedAt?: string;
}


export interface PlayerProfile {
  name: string; avatarId: number; badgeId: string; rank: string;
}


export interface SettingsState {
  ambientSound: boolean;
  typewriterSfx: boolean;
  scanlines: boolean;
  highContrast: boolean;
  compactInterface: boolean;
  autoSave: boolean;
  showTimestamps: boolean;
  keyboardNav: boolean;
  hintAssistance: boolean;
  caseDifficulty: "rookie" | "detective" | "veteran";
  evidenceAutoLog: boolean;
  redactedWarning: boolean;
  reduceMotion: boolean;
  colorblindMode: boolean;
}