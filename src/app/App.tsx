import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

import type { Screen, Tool, Verdict, CaseStatus, DiscoveredFinding, CaseRecord, PlayerProfile, SettingsState } from "./types";
import { CASES_CATALOG } from "./data/casesData";
import { loadCases, saveCases, loadProfile, saveProfile, loadSettings } from "./lib/storage";

import { StyleInjector } from "./components/StyleInjector";
import { Grain, ScanLines, Vignette } from "./components/Atmosphere";

import { BootScreen } from "./pages/BootScreen";
import { SplashScreen } from "./pages/SplashScreen";
import { MiraOnboardingScreen } from "./pages/MiraOnboardingScreen";
import { RecruitmentLetterScreen } from "./pages/RecruitmentLetterScreen";
import { ProfileCreationScreen } from "./pages/ProfileCreationScreen";
import { ProfileScreen } from "./pages/ProfileScreen";
import { MainMenuScreen } from "./pages/MainMenuScreen";
import { CaseSelectScreen } from "./pages/CaseSelectScreen";
import { MissionBriefingScreen } from "./pages/MissionBriefingScreen";
import { InvestigationScreen } from "./pages/InvestigationScreen";
import { Case2Screen } from "./pages/Case2Screen";
import { NotebookScreen } from "./pages/NotebookScreen";
import { EvidenceWallScreen } from "./pages/EvidenceWallScreen";
import { CaseResolutionScreen } from "./pages/CaseResolutionScreen";
import { RecordsScreen } from "./pages/RecordsScreen";
import { SettingsScreen } from "./pages/SettingsScreen";

export const SCREENS: { id: Screen; label: string }[] = [
  { id: "investigation", label: "CASE FILE" },
];


export const PRE_GAME: Screen[] = ["boot", "splash", "recruitment-letter", "profile-creation", "mira-onboarding", "main-menu", "case-select", "mission-briefing", "records", "settings", "profile"];


export default function App() {
  const [screen, setScreen]     = useState<Screen>("boot");
  const [pendingCaseId, setPendingCaseId] = useState<string | null>(null);
  const [profile, setProfile] = useState<PlayerProfile | null>(() => loadProfile());
  const [cases, setCases]     = useState<CaseRecord[]>(loadCases);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(() => {
    const stored = loadCases();
    return stored.find(c => c.status === "in-progress")?.caseId ?? null;
  });
  const [finalVerdict, setFinalVerdict] = useState<NonNullable<Verdict> | null>(null);
  const [resolutionInvestigated, setResolutionInvestigated] = useState<string[]>([]);
  const [settings, setSettings] = useState<SettingsState>(loadSettings);

  const activeCase = activeCaseId ? cases.find(c => c.caseId === activeCaseId) ?? null : null;

  const updateCase = useCallback((caseId: string, updater: (r: CaseRecord) => CaseRecord) => {
    setCases(prev => {
      const next = prev.map(c => c.caseId === caseId ? updater(c) : c);
      saveCases(next);
      return next;
    });
  }, []);

  // Persist lastScreen whenever we switch game screens
  useEffect(() => {
    if (!PRE_GAME.includes(screen) && screen !== "case-resolution" && activeCaseId) {
      updateCase(activeCaseId, r => ({ ...r, lastScreen: screen }));
    }
  }, [screen, activeCaseId, updateCase]);

  // Timer — ambient pressure display only; cases now close only via verdict buttons
  useEffect(() => {
    if (screen !== "investigation") return;
    if (!activeCase || activeCase.status !== "in-progress") return;
    if (activeCase.timeRemainingSec <= 0) return;
    const t = setInterval(() => {
      updateCase(activeCase.caseId, r => ({
        ...r, timeRemainingSec: Math.max(0, r.timeRemainingSec - 1),
      }));
    }, 1000);
    return () => clearInterval(t);
  }, [screen, activeCaseId]);

  // New players → recruitment letter; returning players → main menu
  const handleSplashDone = useCallback(() => {
    setScreen(loadProfile() ? "main-menu" : "recruitment-letter");
  }, []);

  const handleProfileSave = useCallback((p: PlayerProfile) => {
    setProfile(p);
    setScreen("mira-onboarding");
  }, []);

  const handleCaseSelect = useCallback((caseId: string, resume: boolean) => {
    setActiveCaseId(caseId);
    if (!resume) {
      // Fresh start — reset case state; land directly in investigation
      updateCase(caseId, r => ({ ...r, status: "in-progress", verdictsGiven: [], wallSelection: null, timeRemainingSec: 847, lastScreen: "investigation" }));
    }
    const storedScreen = cases.find(c => c.caseId === caseId)?.lastScreen;
    const validResumeScreens = new Set<Screen>(["investigation"]);
    const resumeTarget: Screen = (storedScreen && validResumeScreens.has(storedScreen)) ? storedScreen : "investigation";
    setScreen(resume ? resumeTarget : "investigation");
  }, [cases, updateCase]);

  const handleVerdictFinal = useCallback((v: NonNullable<Verdict>, investigated: string[]) => {
    if (!activeCaseId) return;
    updateCase(activeCaseId, r => ({ ...r, status: "closed-solved", finalVerdict: v, lastScreen: "case-resolution" }));
    setFinalVerdict(v);
    setResolutionInvestigated(investigated);
    setScreen("case-resolution");
  }, [activeCaseId, updateCase]);

  const handleBackToBureau = useCallback(() => {
    setFinalVerdict(null);
    setScreen("main-menu");
    // If case is now closed, clear activeCaseId
    setCases(prev => {
      const closed = prev.find(c => c.caseId === activeCaseId && c.status === "closed-solved");
      if (closed) setActiveCaseId(null);
      return prev;
    });
  }, [activeCaseId]);

  const handleBackToMenu = useCallback(() => setScreen("main-menu"), []);

  const handleUpdateNotebookNotes = useCallback((caseId: string, notes: string) => {
    updateCase(caseId, r => ({ ...r, notebookNotes: notes }));
  }, [updateCase]);

  const handleDiscoverFinding = useCallback((finding: DiscoveredFinding) => {
    if (!activeCaseId) return;
    updateCase(activeCaseId, r => {
      const already = (r.discoveredFindings ?? []).some(f => f.elementId === finding.elementId && f.toolId === finding.toolId);
      if (already) return r;
      return { ...r, discoveredFindings: [...(r.discoveredFindings ?? []), finding] };
    });
  }, [activeCaseId, updateCase]);

  const isPreGame = PRE_GAME.includes(screen);
  const isCritical = false; // Cases no longer end via evidence wall — TRUST/VERIFY/REJECT/REPORT closes cases

  return (
    <div
      className="w-screen h-screen overflow-hidden flex flex-col select-none"
      style={{ backgroundColor: "#07090f", color: "#c9b882", fontFamily: "Courier Prime, monospace" }}
    >
      <StyleInjector />
      <Grain />
      <ScanLines />
      <Vignette />

      {/* In-game header — hidden on splash / menu / stub / resolution / notebook (has its own header) */}
      {!isPreGame && screen !== "case-resolution" && screen !== "notebook" && (
        <header
          className="flex items-center justify-between px-4 py-2 relative flex-shrink-0"
          style={{ backgroundColor: "rgba(3,5,12,0.97)", borderBottom: "1px solid rgba(201,162,39,0.25)", zIndex: 150 }}
        >
          {/* Left: back button + case stamp */}
          <div className="flex items-center gap-4">
            {activeCase?.status === "in-progress" ? (
              <div style={{
                fontFamily: "Courier Prime, monospace", fontSize: "10px", letterSpacing: "0.18em",
                color: "rgba(201,162,39,0.28)", border: "1px solid rgba(201,162,39,0.12)",
                padding: "4px 12px", userSelect: "none",
              }} title="COMPLETE THE INVESTIGATION TO EXIT">
                CASE ACTIVE
              </div>
            ) : (
              <button
                onClick={handleBackToMenu}
                title={isCritical ? "FINISH OR ABANDON THEORY" : undefined}
                style={{
                  fontFamily: "Special Elite, serif", fontSize: "22px", letterSpacing: "0.15em",
                  color: isCritical ? "#3a3428" : "#c9a227",
                  border: `1px solid ${isCritical ? "rgba(201,162,39,0.15)" : "rgba(201,162,39,0.4)"}`,
                  backgroundColor: "transparent", padding: "4px 12px",
                  cursor: isCritical ? "not-allowed" : "pointer",
                  transition: "text-shadow 0.2s",
                }}
                onMouseEnter={(e) => { if (!isCritical) (e.currentTarget as HTMLElement).style.textShadow = "0 0 12px rgba(201,162,39,0.7)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
              >
                ← BUREAU
              </button>
            )}
            <div style={{ transform: "rotate(-3.5deg)", lineHeight: 1 }}>
              <div className="amber-glow" style={{ fontFamily: "Special Elite, serif", fontSize: "20px", color: "#ffd966", letterSpacing: "0.1em" }}>
                {activeCaseId ?? "CASE 2024-1147"}
              </div>
              <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.22em" }}>
                {CASES_CATALOG.find(c => c.caseId === activeCaseId)?.title ?? "THE MIRACLE CURE"} · ACTIVE
              </div>
            </div>
          </div>

          {/* Screen tabs */}
          <nav className="flex gap-0.5">
            {SCREENS.map((s) => (
              <button key={s.id} onClick={() => setScreen(s.id)} style={{
                fontFamily: "Courier Prime, monospace", fontSize: "9px", letterSpacing: "0.16em", padding: "5px 13px",
                color: screen === s.id ? "#07090f" : "#c9b882",
                backgroundColor: screen === s.id ? "#c9a227" : "transparent",
                border: `1px solid ${screen === s.id ? "#c9a227" : "rgba(201,162,39,0.22)"}`,
                cursor: "pointer", transition: "all 0.18s",
              }}
                onMouseEnter={(e) => { if (screen !== s.id) (e.currentTarget as HTMLElement).style.color = "#ffd966"; }}
                onMouseLeave={(e) => { if (screen !== s.id) (e.currentTarget as HTMLElement).style.color = "#c9b882"; }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Status right */}
          <div style={{ textAlign: "right" }}>
            <div className="cyan-flicker" style={{ fontFamily: "Courier Prime, monospace", fontSize: "9px", color: "#00e9ff", letterSpacing: "0.15em" }}>
              ● ACTIVE INVESTIGATION
            </div>
            <div style={{ fontFamily: "Courier Prime, monospace", fontSize: "9.5px", color: "#b8a878", letterSpacing: "0.12em", marginTop: "2px" }}>
              {activeCase ? `${Math.floor(activeCase.timeRemainingSec / 60).toString().padStart(2,"0")}:${(activeCase.timeRemainingSec % 60).toString().padStart(2,"0")} · PRECINCT 14` : "02:47:33 · PRECINCT 14"}
            </div>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden relative" style={{ zIndex: 120 }}>
        <AnimatePresence mode="wait">
          <motion.div key={screen} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {screen === "boot"               && <BootScreen onDone={() => setScreen("splash")} />}
            {screen === "splash"              && <SplashScreen onDone={handleSplashDone} />}
            {screen === "recruitment-letter" && <RecruitmentLetterScreen onAccept={() => setScreen("profile-creation")} />}
            {screen === "profile-creation"   && <ProfileCreationScreen onSave={handleProfileSave} />}
            {screen === "mira-onboarding"    && <MiraOnboardingScreen onDone={() => setScreen("main-menu")} />}
            {screen === "main-menu"          && <MainMenuScreen onNavigate={setScreen} cases={cases} reduceMotion={settings.reduceMotion} settings={settings} profile={profile} />}
            {screen === "case-select"     && <CaseSelectScreen cases={cases} onSelect={handleCaseSelect} onBrief={(id) => { setPendingCaseId(id); setScreen("mission-briefing"); }} onBack={handleBackToMenu} />}
            {screen === "mission-briefing" && pendingCaseId && (
              <MissionBriefingScreen
                caseId={pendingCaseId}
                onAccept={() => { handleCaseSelect(pendingCaseId, false); setPendingCaseId(null); }}
                onBack={() => { setPendingCaseId(null); setScreen("case-select"); }}
              />
            )}
            {screen === "records"         && <RecordsScreen onBack={handleBackToMenu} />}
            {screen === "settings"        && <SettingsScreen onBack={handleBackToMenu} profile={profile} settings={settings} onSettingsChange={setSettings} />}
            {screen === "investigation" &&
  (activeCaseId === "2024-0891" ? (
    <Case2Screen
      onVerdictFinal={handleVerdictFinal}
    />
  ) : (
    <InvestigationScreen
      onVerdictFinal={handleVerdictFinal}
      onDiscoverFinding={handleDiscoverFinding}
    />
  ))}
            {screen === "notebook"        && <NotebookScreen cases={cases} onUpdateNotes={handleUpdateNotebookNotes} onBack={handleBackToMenu} />}
            {screen === "profile"         && <ProfileScreen profile={profile} onBack={handleBackToMenu} />}
            {screen === "evidence-wall"   && <EvidenceWallScreen cases={cases} />}
            {screen === "case-resolution" && finalVerdict && activeCase && (
              <CaseResolutionScreen
                verdict={finalVerdict}
                caseRecord={activeCase}
                investigated={resolutionInvestigated}
                onReturn={handleBackToBureau}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
