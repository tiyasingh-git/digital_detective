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

import Case1Screen from "./pages/Case1Screen";
import Case2Screen from "./pages/Case2Screen";
import Case3Screen from "./pages/Case3Screen";
import Case4Screen from "./pages/Case4Screen";
import Case5Screen from "./pages/Case5Screen";

import { NotebookScreen } from "./pages/NotebookScreen";
import { EvidenceWallScreen } from "./pages/EvidenceWallScreen";
import { CaseResolutionScreen } from "./pages/CaseResolutionScreen";
import { RecordsScreen } from "./pages/RecordsScreen";
import { SettingsScreen } from "./pages/SettingsScreen";

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

export const PRE_GAME: Screen[] = [
  "boot",
  "splash",
  "recruitment-letter",
  "profile-creation",
  "mira-onboarding",
  "main-menu",
  "case-select",
  "mission-briefing",
  "records",
  "settings",
  "profile",
];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [screen, setScreen] =
    useState<Screen>("boot");

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
            record.status ===
            "in-progress"
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
      ? cases.find(
          (record) =>
            record.caseId ===
            activeCaseId
        ) ?? null
      : null;

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
          const next = previous.map(
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
     SAVE LAST SCREEN
  ========================================================= */

  useEffect(() => {
    if (
      activeCaseId === null ||
      PRE_GAME.includes(screen) ||
      screen === "case-resolution" ||
      screen === "notebook"
    ) {
      return;
    }

    updateCase(
      activeCaseId,
      (record) => ({
        ...record,
        lastScreen:
          screen as CaseRecord["lastScreen"],
      })
    );
  }, [
    screen,
    activeCaseId,
    updateCase,
  ]);

  /* =========================================================
     CASE TIMER
  ========================================================= */

  useEffect(() => {
    if (
      screen !== "investigation" ||
      activeCase === null ||
      activeCase.status !==
        "in-progress" ||
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
      (player: PlayerProfile) => {
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
        setActiveCaseId(caseId);

        if (!resume) {
          updateCase(
            caseId,
            (record) => ({
              ...record,
              status:
                "in-progress",
              verdictsGiven: [],
              wallSelection: null,
              timeRemainingSec: 847,
              lastScreen:
                "investigation",
              finalVerdict: null,
              discoveredFindings: [],
            })
          );

          setScreen(
            "investigation"
          );

          return;
        }

        const storedCase =
          cases.find(
            (record) =>
              record.caseId === caseId
          );

        const storedScreen =
          storedCase?.lastScreen;

        setScreen(
          storedScreen ===
            "investigation"
            ? "investigation"
            : "investigation"
        );
      },
      [cases, updateCase]
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
        if (activeCaseId === null) {
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
            lastScreen:
              "case-resolution",
          })
        );

        setFinalVerdict(verdict);
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

      if (currentCaseId === null) {
        return;
      }

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
          setActiveCaseId(null);
        }

        return previous;
      });
    }, [activeCaseId]);

  /* =========================================================
     BACK TO MENU
  ========================================================= */

  const handleBackToMenu =
    useCallback(() => {
      setScreen("main-menu");
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
            notebookNotes: notes,
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
        if (activeCaseId === null) {
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
     UI
  ========================================================= */

  const isPreGame =
    PRE_GAME.includes(screen);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
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
        backgroundColor: "#07090f",
        color: "#c9b882",
        fontFamily:
          "Courier Prime, monospace",
      }}
    >
      <StyleInjector />

      <Grain />
      <ScanLines />
      <Vignette />

      {/* =====================================================
          HEADER
      ===================================================== */}

      {!isPreGame &&
        screen !==
          "case-resolution" &&
        screen !== "notebook" && (
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
                    fontSize: "10px",
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
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                    fontSize: "22px",
                    letterSpacing:
                      "0.15em",
                    color: "#c9a227",
                    border:
                      "1px solid rgba(201,162,39,0.4)",
                    backgroundColor:
                      "transparent",
                    padding:
                      "4px 12px",
                    cursor: "pointer",
                  }}
                >
                  ← BUREAU
                </button>
              )}

              <div
                style={{
                  transform:
                    "rotate(-3.5deg)",
                  lineHeight: 1,
                }}
              >
                <div
                  className="amber-glow"
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                    fontSize: "20px",
                    color: "#ffd966",
                    letterSpacing:
                      "0.1em",
                  }}
                >
                  {activeCaseId ??
                    "CASE 2024-1147"}
                </div>

                <div
                  style={{
                    fontSize: "9.5px",
                    color: "#b8a878",
                    letterSpacing:
                      "0.22em",
                  }}
                >
                  {CASES_CATALOG.find(
                    (record) =>
                      record.caseId ===
                      activeCaseId
                  )?.title ??
                    "THE MIRACLE CURE"}
                  {" · ACTIVE"}
                </div>
              </div>
            </div>

            <nav className="flex gap-0.5">
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
                      fontSize: "9px",
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
                textAlign: "right",
              }}
            >
              <div
                className="cyan-flicker"
                style={{
                  fontSize: "9px",
                  color: "#00e9ff",
                  letterSpacing:
                    "0.15em",
                }}
              >
                ● ACTIVE INVESTIGATION
              </div>

              <div
                style={{
                  fontSize: "9.5px",
                  color: "#b8a878",
                  letterSpacing:
                    "0.12em",
                  marginTop: "2px",
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
                  : "14:07 · PRECINCT 14"}
              </div>
            </div>
          </header>
        )}

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          flex-1
          overflow-hidden
          relative
        "
        style={{
          zIndex: 120,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            className="
              absolute
              inset-0
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.28,
            }}
          >
            {/* =================================================
                BOOT
            ================================================= */}

            {screen === "boot" && (
              <BootScreen
                onDone={() =>
                  setScreen("splash")
                }
              />
            )}

            {/* =================================================
                SPLASH
            ================================================= */}

            {screen === "splash" && (
              <SplashScreen
                onDone={
                  handleSplashDone
                }
              />
            )}

            {/* =================================================
                RECRUITMENT
            ================================================= */}

            {screen ===
              "recruitment-letter" && (
              <RecruitmentLetterScreen
                onAccept={() =>
                  setScreen(
                    "profile-creation"
                  )
                }
              />
            )}

            {/* =================================================
                PROFILE CREATION
            ================================================= */}

            {screen ===
              "profile-creation" && (
              <ProfileCreationScreen
                onSave={
                  handleProfileSave
                }
              />
            )}

            {/* =================================================
                MIRA ONBOARDING
            ================================================= */}

            {screen ===
              "mira-onboarding" && (
              <MiraOnboardingScreen
                onDone={() =>
                  setScreen(
                    "main-menu"
                  )
                }
              />
            )}

            {/* =================================================
                MAIN MENU
            ================================================= */}

            {screen === "main-menu" && (
              <MainMenuScreen
                onNavigate={setScreen}
                cases={cases}
                reduceMotion={
                  settings.reduceMotion
                }
                settings={settings}
                profile={profile}
              />
            )}

            {/* =================================================
                CASE SELECT
            ================================================= */}

            {screen ===
              "case-select" && (
              <CaseSelectScreen
                cases={cases}
                onSelect={
                  handleCaseSelect
                }
                onBrief={(id) => {
                  setPendingCaseId(id);
                  setScreen(
                    "mission-briefing"
                  );
                }}
                onBack={
                  handleBackToMenu
                }
              />
            )}

            {/* =================================================
                MISSION BRIEFING
            ================================================= */}

            {screen ===
                "mission-briefing" &&
              pendingCaseId !== null && (
                <MissionBriefingScreen
                  caseId={
                    pendingCaseId
                  }
                  onAccept={() => {
                    handleCaseSelect(
                      pendingCaseId,
                      false
                    );
                    setPendingCaseId(
                      null
                    );
                  }}
                  onBack={() => {
                    setPendingCaseId(
                      null
                    );
                    setScreen(
                      "case-select"
                    );
                  }}
                />
              )}

            {/* =================================================
                RECORDS
            ================================================= */}

            {screen === "records" && (
              <RecordsScreen
                onBack={
                  handleBackToMenu
                }
              />
            )}

            {/* =================================================
                SETTINGS
            ================================================= */}

            {screen === "settings" && (
              <SettingsScreen
                onBack={
                  handleBackToMenu
                }
                profile={profile}
                settings={settings}
                onSettingsChange={
                  setSettings
                }
              />
            )}

            {/* =================================================
                CASE 1
            ================================================= */}

            {screen ===
                "investigation" &&
              activeCaseId ===
                "2024-1147" && (
                <Case1Screen
                  onVerdictFinal={
                    handleVerdictFinal
                  }
                />
              )}

            {/* =================================================
                CASE 2
            ================================================= */}

            {screen ===
                "investigation" &&
              activeCaseId ===
                "2024-1502" && (
                <Case2Screen
                  onVerdictFinal={
                    handleVerdictFinal
                  }
                />
              )}

            {/* =================================================
                CASE 3
            ================================================= */}

            {screen ===
                "investigation" &&
              activeCaseId ===
                "2023-1204" && (
                <Case3Screen />
              )}

            {/* =================================================
                CASE 4
            ================================================= */}

            {screen ===
                "investigation" &&
              activeCaseId ===
                "2024-1389" && (
                <Case4Screen
                  onVerdictFinal={
                    handleVerdictFinal
                  }
                />
              )}

            {/* =================================================
                CASE 5
            ================================================= */}

            {screen ===
                "investigation" &&
              activeCaseId ===
                "2024-1501" && (
                <Case5Screen
                  onVerdictFinal={
                    handleVerdictFinal
                  }
                />
              )}

            {/* =================================================
                NOTEBOOK
            ================================================= */}

            {screen === "notebook" && (
              <NotebookScreen
                cases={cases}
                onUpdateNotes={
                  handleUpdateNotebookNotes
                }
                onBack={
                  handleBackToMenu
                }
              />
            )}

            {/* =================================================
                PROFILE
            ================================================= */}

            {screen === "profile" && (
              <ProfileScreen
                profile={profile}
                onBack={
                  handleBackToMenu
                }
              />
            )}

            {/* =================================================
                EVIDENCE WALL
            ================================================= */}

            {screen ===
              "evidence-wall" && (
              <EvidenceWallScreen
                cases={cases}
              />
            )}

            {/* =================================================
                CASE RESOLUTION
            ================================================= */}

            {screen ===
                "case-resolution" &&
              finalVerdict !== null &&
              activeCase !== null && (
                <CaseResolutionScreen
                  verdict={finalVerdict}
                  caseRecord={
                    activeCase
                  }
                  investigated={
                    resolutionInvestigated
                  }
                  onReturn={
                    handleBackToBureau
                  }
                />
              )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}