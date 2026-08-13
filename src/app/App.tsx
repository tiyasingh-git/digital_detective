import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import type {
  Screen,
  Verdict,
  DiscoveredFinding,
  CaseRecord,
  PlayerProfile,
  SettingsState,
} from "./types";

import { CASES_CATALOG } from "./data/casesData";

import {
  loadCases,
  saveCases,
  loadProfile,
  loadSettings,
} from "./lib/storage";

import { CaseContentProvider } from "./context/CaseContentContext";

import { StyleInjector } from "./components/StyleInjector";

import {
  Grain,
  ScanLines,
  Vignette,
} from "./components/Atmosphere";

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
import Case2Screen from "./pages/Case2Screen";
import Case3Screen from "./pages/Case3Screen";
import Case4Screen from "./pages/Case4Screen";
import Case5Screen from "./pages/Case5Screen";
import { Case6Screen } from "./pages/Case6Screen";
import Case7Screen from "./pages/Case7Screen";
import Case8Screen from "./pages/Case8Screen";

// Case 1 uses the generic tools/evidence investigation system (InvestigationScreen +
// CaseContentContext) — that's the one wired to scoring/Records/Profile. Cases 2-8
// are self-contained bespoke screens Shriya built (their own briefing/evidence/
// decision/debrief/quiz flow). Mapped here by caseId so "investigation" routes to
// the right one. Case 1's ID is intentionally absent — it falls through to InvestigationScreen.
//
// NOTE: each screen's own onVerdictFinal signature disagrees with the app's real
// Verdict type ("TRUST" | "VERIFY" | "REJECT" | "REPORT") — Case2/3/6 send lowercase
// strings, Case5 sends "verified" (not a valid value at all), Case4 sends a
// {decision, correct} object instead of a string. Only Case7/Case8 send it correctly.
// Rather than edit each 1000+ line file's internal logic, normalizeVerdict() below
// adapts whatever comes in to a real Verdict before it reaches handleVerdictFinal.
const CASE_SCREEN_MAP: Record<string, ComponentType<any>> = {
  "2024-0891": Case2Screen,
  "2023-1204": Case3Screen,
  "2024-1389": Case4Screen,
  "2024-1501": Case5Screen,
  "2024-1502": Case6Screen,
  "2024-1607": Case7Screen,
  "2024-1708": Case8Screen,
};

function normalizeVerdict(raw: unknown): NonNullable<Verdict> {
  // Case4Screen shape: { decision: string, correct: boolean }
  if (raw && typeof raw === "object" && "correct" in (raw as Record<string, unknown>)) {
    return (raw as { correct: boolean }).correct ? "VERIFY" : "REJECT";
  }
  if (typeof raw === "string") {
    const upper = raw.toUpperCase();
    if (upper === "TRUST" || upper === "VERIFY" || upper === "REJECT" || upper === "REPORT") {
      return upper as NonNullable<Verdict>;
    }
    if (upper === "VERIFIED") return "VERIFY"; // Case5Screen's typo
  }
  console.warn(`[App] Unrecognized verdict value from a case screen, defaulting to REJECT:`, raw);
  return "REJECT";
}

import { NotebookScreen } from "./pages/NotebookScreen";
import { EvidenceWallScreen } from "./pages/EvidenceWallScreen";
import { CaseResolutionScreen } from "./pages/CaseResolutionScreen";
import { RecordsScreen } from "./pages/RecordsScreen";
import { SkillCardsScreen } from "./pages/SkillCardsScreen";
import { SettingsScreen } from "./pages/SettingsScreen";
import { computeOverallScore } from "./lib/scoring";


/* =========================================================
   APP SCREEN TYPE
========================================================= */

type AppScreen =
  | Screen
  | "notebook"
  | "evidence-wall"
  | "case-resolution";


/* =========================================================
   HEADER NAVIGATION
========================================================= */

export const SCREENS: {
  id: Screen;
  label: string;
}[] = [
  {
    id: "investigation",
    label: "CASE FILE",
  },
];


/* =========================================================
   PRE-GAME SCREENS
========================================================= */

export const PRE_GAME: Screen[] = ["boot", "splash", "recruitment-letter", "profile-creation", "mira-onboarding", "main-menu", "case-select", "mission-briefing", "records", "skill-cards", "settings", "profile"];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [screen, setScreen] =
    useState<AppScreen>("boot");

  const [pendingCaseId, setPendingCaseId] =
    useState<string | null>(null);

  const [profile, setProfile] =
    useState<PlayerProfile | null>(
      () => loadProfile()
    );

  const [cases, setCases] =
    useState<CaseRecord[]>(
      () => loadCases()
    );

  const [activeCaseId, setActiveCaseId] =
    useState<string | null>(() => {
      const storedCases = loadCases();

      return (
        storedCases.find(
          (record) =>
            record.status === "in-progress"
        )?.caseId ?? null
      );
    });

  const [finalVerdict, setFinalVerdict] =
    useState<NonNullable<Verdict> | null>(
      null
    );

  const [
    resolutionInvestigated,
    setResolutionInvestigated,
  ] = useState<string[]>([]);

  const [settings, setSettings] =
    useState<SettingsState>(
      () => loadSettings()
    );


  /* =========================================================
     ACTIVE CASE
  ========================================================= */

  const activeCase =
    activeCaseId !== null
      ? (
          cases.find(
            (record) =>
              record.caseId === activeCaseId
          ) ?? null
        )
      : null;


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigateTo =
    useCallback(
      (nextScreen: Screen) => {
        setScreen(nextScreen);
      },
      []
    );


  /* =========================================================
     UPDATE CASE
  ========================================================= */

  const updateCase =
    useCallback(
      (
        caseId: string,
        updater: (
          record: CaseRecord
        ) => CaseRecord
      ) => {
        setCases((previous) => {
          const next =
            previous.map(
              (record) =>
                record.caseId === caseId
                  ? updater(record)
                  : record
            );

          saveCases(next);

          return next;
        });
      },
      []
    );


  /* =========================================================
     SAVE CURRENT INVESTIGATION SCREEN
  ========================================================= */

  useEffect(() => {
    if (
      activeCaseId === null
    ) {
      return;
    }

    if (
      screen === "investigation"
    ) {
      updateCase(
        activeCaseId,
        (record) => ({
          ...record,
          lastScreen:
            "investigation",
        })
      );
    }
  }, [
    screen,
    activeCaseId,
    updateCase,
  ]);


  /* =========================================================
     TIMER
  ========================================================= */

  useEffect(() => {
    if (
      screen !== "investigation"
    ) {
      return;
    }

    if (
      activeCase === null
    ) {
      return;
    }

    if (
      activeCase.status !==
      "in-progress"
    ) {
      return;
    }

    if (
      activeCase.timeRemainingSec <= 0
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        updateCase(
          activeCase.caseId,
          (record) => ({
            ...record,
            timeRemainingSec:
              Math.max(
                0,
                record.timeRemainingSec -
                  1
              ),
          })
        );
      }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    screen,
    activeCase,
    updateCase,
  ]);


  /* =========================================================
     SPLASH
  ========================================================= */

  const handleSplashDone =
    useCallback(() => {
      const existingProfile =
        loadProfile();

      setScreen(
        existingProfile
          ? "main-menu"
          : "recruitment-letter"
      );
    }, []);


  /* =========================================================
     PROFILE
  ========================================================= */

  const handleProfileSave =
    useCallback(
      (
        player: PlayerProfile
      ) => {
        setProfile(player);

        setScreen(
          "mira-onboarding"
        );
      },
      []
    );


  /* =========================================================
     CASE SELECT
  ========================================================= */

  const handleCaseSelect =
    useCallback(
      (
        caseId: string,
        resume: boolean
      ) => {
        setActiveCaseId(
          caseId
        );

        if (!resume) {
          updateCase(
            caseId,
            (record) => ({
              ...record,

              status:
                "in-progress",

              verdictsGiven: [],

              wallSelection: null,

              timeRemainingSec:
                847,

              lastScreen:
                "investigation",

              finalVerdict:
                null,

              discoveredFindings:
                [],
            })
          );
        }

        setFinalVerdict(null);
        setResolutionInvestigated([]);

        setScreen(
          "investigation"
        );
      },
      [updateCase]
    );


  /* =========================================================
     FINAL VERDICT
  ========================================================= */

  const handleVerdictFinal =
    useCallback(
      (
        verdict: NonNullable<Verdict>,
        investigated: string[]
      ) => {
        if (
          activeCaseId === null
        ) {
          return;
        }

        const notes =
          cases.find((c) => c.caseId === activeCaseId)?.notebookNotes ?? "";
        const score = computeOverallScore(investigated, notes);

        updateCase(
          activeCaseId,
          (record) => ({
            ...record,

            status:
              "closed-solved",

            finalVerdict:
              verdict,

            finalScore: score,
            completedAt: new Date().toISOString(),

            /*
             * Keep a valid CaseRecord screen here.
             * "case-resolution" is managed only by App.
             */
            lastScreen:
              "investigation",
          })
        );

        setFinalVerdict(
          verdict
        );

        setResolutionInvestigated(
          investigated
        );

        setScreen(
          "case-resolution"
        );
      },
      [
        activeCaseId,
        cases,
        updateCase,
      ]
    );


  /* =========================================================
     BACK TO BUREAU
  ========================================================= */

  const handleBackToBureau =
    useCallback(() => {
      const currentCaseId =
        activeCaseId;

      setFinalVerdict(null);
      setResolutionInvestigated([]);
      setScreen("main-menu");

      if (
        currentCaseId !== null
      ) {
        setCases((previous) => {
          const closedCase =
            previous.find(
              (record) =>
                record.caseId ===
                  currentCaseId &&
                record.status ===
                  "closed-solved"
            );

          if (closedCase) {
            setActiveCaseId(
              null
            );
          }

          return previous;
        });
      }
    }, [
      activeCaseId,
    ]);


  /* =========================================================
     BACK TO MENU
  ========================================================= */

  const handleBackToMenu =
    useCallback(() => {
      setScreen(
        "main-menu"
      );
    }, []);


  /* =========================================================
     NOTEBOOK
  ========================================================= */

  const handleUpdateNotebookNotes =
    useCallback(
      (
        caseId: string,
        notes: string
      ) => {
        updateCase(
          caseId,
          (record) => ({
            ...record,
            notebookNotes:
              notes,
          })
        );
      },
      [updateCase]
    );


  /* =========================================================
     DISCOVER FINDING
  ========================================================= */

  const handleDiscoverFinding =
    useCallback(
      (
        finding: DiscoveredFinding
      ) => {
        if (
          activeCaseId === null
        ) {
          return;
        }

        updateCase(
          activeCaseId,
          (record) => {
            const existingFindings =
              record.discoveredFindings ??
              [];

            const alreadyDiscovered =
              existingFindings.some(
                (existing) =>
                  existing.elementId ===
                    finding.elementId &&
                  existing.toolId ===
                    finding.toolId
              );

            if (
              alreadyDiscovered
            ) {
              return record;
            }

            return {
              ...record,

              discoveredFindings: [
                ...existingFindings,
                finding,
              ],
            };
          }
        );
      },
      [
        activeCaseId,
        updateCase,
      ]
    );


  /* =========================================================
     UI FLAGS
  ========================================================= */

  const isPreGame =
    PRE_GAME.includes(screen);

  const isCritical =
    false;


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <CaseContentProvider
      caseId={
        activeCaseId ??
        "2024-1147"
      }
    >
      <div
        className="
          w-screen
          h-screen
          overflow-hidden
          flex
          flex-col
          select-none
        "
        style={{
          backgroundColor:
            "#07090f",
          color:
            "#c9b882",
          fontFamily:
            "Courier Prime, monospace",
        }}
      >
        <StyleInjector />

        <Grain />
        <ScanLines />
        <Vignette />


        {/* =================================================
            HEADER
        ================================================= */}

        {!isPreGame &&
          screen !==
            "case-resolution" &&
          screen !==
            "notebook" &&
          screen !==
            "evidence-wall" && (

          <header
            className="
              flex
              items-center
              justify-between
              px-4
              py-2
              relative
              flex-shrink-0
            "
            style={{
              backgroundColor:
                "rgba(3,5,12,0.97)",
              borderBottom:
                "1px solid rgba(201,162,39,0.25)",
              zIndex: 150,
            }}
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              {activeCase?.status ===
              "in-progress" ? (

                <div
                  style={{
                    fontFamily:
                      "Courier Prime, monospace",
                    fontSize:
                      "10px",
                    letterSpacing:
                      "0.18em",
                    color:
                      "rgba(201,162,39,0.28)",
                    border:
                      "1px solid rgba(201,162,39,0.12)",
                    padding:
                      "4px 12px",
                  }}
                >
                  CASE ACTIVE
                </div>

              ) : (

                <button
                  type="button"
                  onClick={
                    handleBackToMenu
                  }
                  title={
                    isCritical
                      ? "FINISH OR ABANDON CASE"
                      : undefined
                  }
                  disabled={
                    isCritical
                  }
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                    fontSize:
                      "22px",
                    letterSpacing:
                      "0.15em",
                    color:
                      isCritical
                        ? "#3a3428"
                        : "#c9a227",
                    border:
                      `1px solid ${
                        isCritical
                          ? "rgba(201,162,39,0.15)"
                          : "rgba(201,162,39,0.4)"
                      }`,
                    background:
                      "transparent",
                    padding:
                      "4px 12px",
                    cursor:
                      isCritical
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  ← BUREAU
                </button>
              )}

              <div
                style={{
                  transform:
                    "rotate(-3.5deg)",
                  lineHeight:
                    1,
                }}
              >

                <div
                  className="amber-glow"
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                    fontSize:
                      "20px",
                    color:
                      "#ffd966",
                    letterSpacing:
                      "0.1em",
                  }}
                >
                  {activeCaseId ??
                    "CASE 2024-1147"}
                </div>

                <div
                  style={{
                    fontFamily:
                      "Courier Prime, monospace",
                    fontSize:
                      "9.5px",
                    color:
                      "#b8a878",
                    letterSpacing:
                      "0.22em",
                  }}
                >
                  {
                    CASES_CATALOG.find(
                      (record) =>
                        record.caseId ===
                        activeCaseId
                    )?.title ??
                      "THE MIRACLE CURE"
                  }
                  {" · ACTIVE"}
                </div>

              </div>
            </div>


            <nav
              className="
                flex
                gap-0.5
              "
            >
              {SCREENS.map(
                (item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setScreen(
                        item.id
                      )
                    }
                    style={{
                      fontFamily:
                        "Courier Prime, monospace",
                      fontSize:
                        "9px",
                      letterSpacing:
                        "0.16em",
                      padding:
                        "5px 13px",
                      color:
                        screen ===
                        item.id
                          ? "#07090f"
                          : "#c9b882",
                      backgroundColor:
                        screen ===
                        item.id
                          ? "#c9a227"
                          : "transparent",
                      border:
                        `1px solid ${
                          screen ===
                          item.id
                            ? "#c9a227"
                            : "rgba(201,162,39,0.22)"
                        }`,
                      cursor:
                        "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>


            <div
              style={{
                textAlign:
                  "right",
              }}
            >
              <div
                className="cyan-flicker"
                style={{
                  fontFamily:
                    "Courier Prime, monospace",
                  fontSize:
                    "9px",
                  color:
                    "#00e9ff",
                  letterSpacing:
                    "0.15em",
                }}
              >
                ● ACTIVE INVESTIGATION
              </div>

              <div
                style={{
                  fontFamily:
                    "Courier Prime, monospace",
                  fontSize:
                    "9.5px",
                  color:
                    "#b8a878",
                  letterSpacing:
                    "0.12em",
                  marginTop:
                    "2px",
                }}
              >
                {activeCase
                  ? `${Math.floor(
                      activeCase.timeRemainingSec /
                        60
                    )
                      .toString()
                      .padStart(
                        2,
                        "0"
                      )}:${(
                      activeCase.timeRemainingSec %
                        60
                    )
                      .toString()
                      .padStart(
                        2,
                        "0"
                      )} · PRECINCT 14`
                  : "02:47:33 · PRECINCT 14"}
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
            {screen === "records"         && <RecordsScreen onBack={handleBackToMenu} cases={cases} />}
            {screen === "skill-cards"     && <SkillCardsScreen onBack={handleBackToMenu} cases={cases} />}
            {screen === "settings"        && <SettingsScreen onBack={handleBackToMenu} profile={profile} settings={settings} onSettingsChange={setSettings} />}
            {screen === "investigation" && (() => {
              const CaseScreen = activeCaseId ? CASE_SCREEN_MAP[activeCaseId] : undefined;
              return CaseScreen
                ? <CaseScreen onVerdictFinal={(v: unknown, investigated: string[]) => handleVerdictFinal(normalizeVerdict(v), investigated)} />
                : <InvestigationScreen onVerdictFinal={handleVerdictFinal} onDiscoverFinding={handleDiscoverFinding} />;
            })()}
            {screen === "notebook"        && <NotebookScreen cases={cases} onUpdateNotes={handleUpdateNotebookNotes} onBack={handleBackToMenu} />}
            {screen === "profile"         && <ProfileScreen profile={profile} cases={cases} onBack={handleBackToMenu} />}
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
    </CaseContentProvider>
  );
}