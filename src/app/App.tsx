import {
  useCallback,
  useEffect,
  useState,
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
import { Case6Screen } from "./pages/Case6Screen";
import Case7Screen from "./pages/Case7Screen";
import Case8Screen from "./pages/Case8Screen";

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
    const storedScreen = cases.find(c => c.caseId === caseId)?.lastScreen;
    const validResumeScreens = new Set<Screen>(["investigation"]);
    const resumeTarget: Screen = (storedScreen && validResumeScreens.has(storedScreen)) ? storedScreen : "investigation";
    setScreen(resume ? resumeTarget : "investigation");
  }, [cases, updateCase]);

  const handleVerdictFinal = useCallback((v: NonNullable<Verdict>, investigated: string[]) => {
    if (!activeCaseId) return;
    const notes = cases.find(c => c.caseId === activeCaseId)?.notebookNotes ?? "";
    const score = computeOverallScore(investigated, notes);
    updateCase(activeCaseId, r => ({
      ...r, status: "closed-solved", finalVerdict: v, lastScreen: "case-resolution",
      finalScore: score, completedAt: new Date().toISOString(),
    }));
    setFinalVerdict(v);
    setResolutionInvestigated(investigated);
    setScreen("case-resolution");
  }, [activeCaseId, cases, updateCase]);

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

        updateCase(
          activeCaseId,
          (record) => ({
            ...record,

            status:
              "closed-solved",

            finalVerdict:
              verdict,

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
            {screen === "investigation"   && <InvestigationScreen onVerdictFinal={handleVerdictFinal} onDiscoverFinding={handleDiscoverFinding} />}
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