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

import {
  CASES_CATALOG,
  INITIAL_CASES,
} from "./data/casesData";

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

import Case1Screen from "./pages/Case1Screen";
import Case2Screen from "./pages/Case2Screen";
import Case3Screen from "./pages/Case3Screen";
import Case4Screen from "./pages/Case4Screen";
import Case5Screen from "./pages/Case5Screen";
import { Case6Screen } from "./pages/Case6Screen";
import Case7Screen from "./pages/Case7Screen";
import Case8Screen from "./pages/Case8Screen";
import FinalMissionScreen from "./pages/FinalMissionScreen";

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
  | "case-resolution"
  | "final-mission";


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

export const PRE_GAME: AppScreen[] = [
  "boot",
  "splash",
  "recruitment-letter",
  "profile-creation",
  "mira-onboarding",
  "main-menu",
  "case-select",
  "mission-briefing",
  "records",
  "skill-cards",
  "settings",
  "profile",
];


/* =========================================================
   CASE SCREEN MAP
========================================================= */

const CASE_SCREEN_MAP: Record<
  string,
  ComponentType<any>
> = {
  "2024-1147": Case1Screen,
  "2024-0891": Case2Screen,
  "2023-1204": Case3Screen,
  "2024-1389": Case4Screen,
  "2024-1501": Case5Screen,
  "2024-1502": Case6Screen,
  "2024-1607": Case7Screen,
  "2024-1708": Case8Screen,
};


/* =========================================================
   VERDICT NORMALIZER
========================================================= */

function normalizeVerdict(
  raw: unknown
): NonNullable<Verdict> {

  /*
   * Case 4 may return:
   * {
   *   decision: string;
   *   correct: boolean;
   * }
   */
  if (
    raw !== null &&
    typeof raw === "object" &&
    "correct" in
      (raw as Record<string, unknown>)
  ) {
    const correct =
      (raw as { correct: boolean })
        .correct;

    return correct
      ? "VERIFY"
      : "REJECT";
  }


  if (
    typeof raw === "string"
  ) {
    const upper =
      raw.toUpperCase();

    if (
      upper === "TRUST" ||
      upper === "VERIFY" ||
      upper === "REJECT" ||
      upper === "REPORT"
    ) {
      return upper as NonNullable<Verdict>;
    }

    /*
     * Case 5 previously used "verified".
     */
    if (
      upper === "VERIFIED"
    ) {
      return "VERIFY";
    }

    /*
     * Defensive support for boolean-like
     * verdict strings.
     */
    if (
      upper === "TRUE"
    ) {
      return "VERIFY";
    }

    if (
      upper === "FALSE"
    ) {
      return "REJECT";
    }
  }


  console.warn(
    "[App] Unrecognized verdict value. Defaulting to REJECT:",
    raw
  );

  return "REJECT";
}


/* =========================================================
   MERGE STORED CASES WITH CURRENT CASE DATA
========================================================= */

function getMergedCases(): CaseRecord[] {

  const storedCases =
    loadCases();

  const storedMap =
    new Map<string, CaseRecord>();


  storedCases.forEach(
    (record) => {
      storedMap.set(
        record.caseId,
        record
      );
    }
  );


  /*
   * Start with INITIAL_CASES so newly added
   * cases are always available even when the
   * browser has an older localStorage copy.
   */
  const mergedCases =
    INITIAL_CASES.map(
      (initialCase) =>
        storedMap.get(
          initialCase.caseId
        ) ?? initialCase
    );


  /*
   * Preserve any additional saved cases
   * that may exist outside INITIAL_CASES.
   */
  storedCases.forEach(
    (storedCase) => {

      const exists =
        mergedCases.some(
          (record) =>
            record.caseId ===
            storedCase.caseId
        );

      if (!exists) {
        mergedCases.push(
          storedCase
        );
      }
    }
  );


  return mergedCases;
}


/* =========================================================
   APP
========================================================= */

export default function App() {

  /* =======================================================
     SCREEN
  ======================================================= */

  const [screen, setScreen] =
    useState<AppScreen>(
      "boot"
    );


  /* =======================================================
     PENDING CASE
  ======================================================= */

  const [pendingCaseId, setPendingCaseId] =
    useState<string | null>(
      null
    );


  /* =======================================================
     PROFILE
  ======================================================= */

  const [profile, setProfile] =
    useState<PlayerProfile | null>(
      () => loadProfile()
    );


  /* =======================================================
     CASES
  ======================================================= */

  const [cases, setCases] =
    useState<CaseRecord[]>(
      () => {

        const merged =
          getMergedCases();

        /*
         * Persist the merged cases so newly
         * added cases become available in
         * existing browser sessions.
         */
        saveCases(
          merged
        );

        return merged;
      }
    );


  /* =======================================================
     ACTIVE CASE
  ======================================================= */

  const [activeCaseId, setActiveCaseId] =
    useState<string | null>(
      () => {

        const merged =
          getMergedCases();

        return (
          merged.find(
            (record) =>
              record.status ===
              "in-progress"
          )?.caseId ?? null
        );
      }
    );


  /* =======================================================
     FINAL VERDICT
  ======================================================= */

  const [finalVerdict, setFinalVerdict] =
    useState<
      NonNullable<Verdict> | null
    >(null);


  /* =======================================================
     RESOLUTION EVIDENCE
  ======================================================= */

  const [
    resolutionInvestigated,
    setResolutionInvestigated,
  ] = useState<string[]>([]);


  /* =======================================================
     SETTINGS
  ======================================================= */

  const [settings, setSettings] =
    useState<SettingsState>(
      () => loadSettings()
    );


  /* =======================================================
     ACTIVE CASE
  ======================================================= */

  const activeCase =
    activeCaseId !== null
      ? (
          cases.find(
            (record) =>
              record.caseId ===
              activeCaseId
          ) ?? null
        )
      : null;


  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigateTo =
    useCallback(
      (
        nextScreen: Screen
      ) => {
        setScreen(
          nextScreen
        );
      },
      []
    );


  /* =======================================================
     UPDATE CASE
  ======================================================= */

  const updateCase =
    useCallback(
      (
        caseId: string,
        updater: (
          record: CaseRecord
        ) => CaseRecord
      ) => {

        setCases(
          (previous) => {

            const exists =
              previous.some(
                (record) =>
                  record.caseId ===
                  caseId
              );


            /*
             * Recover a missing case from
             * INITIAL_CASES if necessary.
             */
            if (!exists) {

              const initialCase =
                INITIAL_CASES.find(
                  (record) =>
                    record.caseId ===
                    caseId
                );

              if (
                initialCase
              ) {

                const updated =
                  updater(
                    initialCase
                  );

                const next = [
                  ...previous,
                  updated,
                ];

                saveCases(
                  next
                );

                return next;
              }

              return previous;
            }


            const next =
              previous.map(
                (record) =>
                  record.caseId ===
                  caseId
                    ? updater(
                        record
                      )
                    : record
              );

            saveCases(
              next
            );

            return next;
          }
        );
      },
      []
    );


  /* =======================================================
     SAVE CURRENT INVESTIGATION SCREEN
  ======================================================= */

  useEffect(() => {

    if (
      activeCaseId === null
    ) {
      return;
    }

    if (
      screen ===
      "investigation"
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


  /* =======================================================
     TIMER
  ======================================================= */

  useEffect(() => {

    if (
      screen !==
      "investigation"
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
      activeCase.timeRemainingSec <=
      0
    ) {
      return;
    }


    const timer =
      window.setInterval(
        () => {

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

        },
        1000
      );


    return () => {
      window.clearInterval(
        timer
      );
    };

  }, [
    screen,
    activeCase,
    updateCase,
  ]);


  /* =======================================================
     SPLASH
  ======================================================= */

  const handleSplashDone =
    useCallback(
      () => {

        const existingProfile =
          loadProfile();

        setScreen(
          existingProfile
            ? "main-menu"
            : "recruitment-letter"
        );

      },
      []
    );


  /* =======================================================
     PROFILE
  ======================================================= */

  const handleProfileSave =
    useCallback(
      (
        player: PlayerProfile
      ) => {

        setProfile(
          player
        );

        setScreen(
          "mira-onboarding"
        );

      },
      []
    );


  /* =======================================================
     CASE SELECT
  ======================================================= */

  const handleCaseSelect =
    useCallback(
      (
        caseId: string,
        _resume: boolean
      ) => {

        setActiveCaseId(
          caseId
        );


        updateCase(
          caseId,
          (record) => ({
            ...record,

            status:
              "in-progress",

            verdictsGiven:
              [],

            wallSelection:
              null,

            timeRemainingSec:
              847,

            lastScreen:
              "investigation",

            finalVerdict:
              null,

            finalScore:
              undefined,

            completedAt:
              undefined,

            discoveredFindings:
              [],
          })
        );


        setFinalVerdict(
          null
        );

        setResolutionInvestigated(
          []
        );

        setScreen(
          "investigation"
        );

      },
      [
        updateCase,
      ]
    );


  /* =======================================================
     FINAL VERDICT
  ======================================================= */

  const handleVerdictFinal =
    useCallback(
      (
        verdict: NonNullable<Verdict>,
        investigated: string[]
      ) => {

        if (
          activeCaseId ===
          null
        ) {
          return;
        }


        const currentCase =
          cases.find(
            (record) =>
              record.caseId ===
              activeCaseId
          );


        const notes =
          currentCase
            ?.notebookNotes ??
          "";


        const score =
          computeOverallScore(
            investigated,
            notes
          );


        /*
         * Case 8 is the final training case.
         * It goes directly into Operation Blackout
         * instead of the normal CaseResolutionScreen.
         */
        if (
          activeCaseId ===
          "2024-1708"
        ) {

          updateCase(
            activeCaseId,
            (record) => ({
              ...record,

              status:
                "closed-solved",

              finalVerdict:
                verdict,

              finalScore:
                score,

              completedAt:
                new Date().toISOString(),

              lastScreen:
                "investigation",
            })
          );


          setFinalVerdict(
            null
          );

          setResolutionInvestigated(
            []
          );

          setScreen(
            "final-mission"
          );

          return;
        }


        /*
         * Normal cases go through the
         * regular resolution screen.
         */
        updateCase(
          activeCaseId,
          (record) => ({
            ...record,

            status:
              "closed-solved",

            finalVerdict:
              verdict,

            finalScore:
              score,

            completedAt:
              new Date().toISOString(),

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


  /* =======================================================
     BACK TO BUREAU
  ======================================================= */

  const handleBackToBureau =
    useCallback(
      () => {

        const currentCaseId =
          activeCaseId;


        setFinalVerdict(
          null
        );

        setResolutionInvestigated(
          []
        );


        setScreen(
          "main-menu"
        );


        if (
          currentCaseId !==
          null
        ) {

          setCases(
            (previous) => {

              const next =
                previous.map(
                  (record) =>
                    record.caseId ===
                      currentCaseId &&
                    record.status ===
                      "closed-solved"
                      ? record
                      : record
                );

              saveCases(
                next
              );

              return next;
            }
          );


          setActiveCaseId(
            null
          );
        }

      },
      [
        activeCaseId,
      ]
    );


  /* =======================================================
     FINAL MISSION COMPLETE
  ======================================================= */

  const handleFinalMissionComplete =
    useCallback(
      () => {

        setFinalVerdict(
          null
        );

        setResolutionInvestigated(
          []
        );

        setActiveCaseId(
          null
        );

        setScreen(
          "main-menu"
        );

      },
      []
    );


  /* =======================================================
     BACK TO MENU
  ======================================================= */

  const handleBackToMenu =
    useCallback(
      () => {

        setScreen(
          "main-menu"
        );

      },
      []
    );


  /* =======================================================
     NOTEBOOK
  ======================================================= */

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
      [
        updateCase,
      ]
    );


  /* =======================================================
     DISCOVER FINDING
  ======================================================= */

  const handleDiscoverFinding =
    useCallback(
      (
        finding: DiscoveredFinding
      ) => {

        if (
          activeCaseId ===
          null
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


  /* =======================================================
     UI FLAGS
  ======================================================= */

  const isPreGame =
    PRE_GAME.includes(
      screen
    );


  /* =======================================================
     RENDER
  ======================================================= */

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


        {/* =====================================================
            HEADER
        ===================================================== */}

        {!isPreGame &&
          screen !==
            "case-resolution" &&
          screen !==
            "notebook" &&
          screen !==
            "evidence-wall" &&
          screen !==
            "final-mission" && (

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

            {/* LEFT */}

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
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    fontSize:
                      "22px",

                    letterSpacing:
                      "0.15em",

                    color:
                      "#c9a227",

                    border:
                      "1px solid rgba(201,162,39,0.4)",

                    background:
                      "transparent",

                    padding:
                      "4px 12px",

                    cursor:
                      "pointer",
                  }}
                >
                  ← BUREAU
                </button>
              )}


              {/* CASE TITLE */}

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


            {/* NAVIGATION */}

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
                    key={
                      item.id
                    }
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
                    {
                      item.label
                    }
                  </button>

                )
              )}

            </nav>


            {/* STATUS */}

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


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main
          className="
            flex-1
            overflow-hidden
            relative
          "
          style={{
            zIndex:
              120,
          }}
        >

          <AnimatePresence
            mode="wait"
          >

            <motion.div
              key={
                screen
              }

              className="
                absolute
                inset-0
              "

              initial={{
                opacity:
                  0,
              }}

              animate={{
                opacity:
                  1,
              }}

              exit={{
                opacity:
                  0,
              }}

              transition={{
                duration:
                  0.28,
              }}
            >

              {/* =================================================
                  BOOT
              ================================================= */}

              {screen ===
                "boot" && (

                <BootScreen
                  onDone={() =>
                    setScreen(
                      "splash"
                    )
                  }
                />

              )}


              {/* =================================================
                  SPLASH
              ================================================= */}

              {screen ===
                "splash" && (

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

              {screen ===
                "main-menu" && (

                <MainMenuScreen
                  onNavigate={
                    navigateTo
                  }

                  cases={
                    cases
                  }

                  reduceMotion={
                    settings.reduceMotion
                  }

                  settings={
                    settings
                  }

                  profile={
                    profile
                  }
                />

              )}


              {/* =================================================
                  CASE SELECT
              ================================================= */}

              {screen ===
                "case-select" && (

                <CaseSelectScreen
                  cases={
                    cases
                  }

                  onSelect={
                    handleCaseSelect
                  }

                  onBrief={(
                    caseId
                  ) => {

                    setPendingCaseId(
                      caseId
                    );

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
                pendingCaseId !==
                  null && (

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

              {screen ===
                "records" && (

                <RecordsScreen
                  onBack={
                    handleBackToMenu
                  }

                  cases={
                    cases
                  }
                />

              )}


              {/* =================================================
                  SKILL CARDS
              ================================================= */}

              {screen ===
                "skill-cards" && (

                <SkillCardsScreen
                  onBack={
                    handleBackToMenu
                  }

                  cases={
                    cases
                  }
                />

              )}


              {/* =================================================
                  SETTINGS
              ================================================= */}

              {screen ===
                "settings" && (

                <SettingsScreen
                  onBack={
                    handleBackToMenu
                  }

                  profile={
                    profile
                  }

                  settings={
                    settings
                  }

                  onSettingsChange={
                    setSettings
                  }
                />

              )}


              {/* =================================================
                  CASE INVESTIGATION
              ================================================= */}

              {screen ===
                "investigation" && (() => {

                  const CaseScreen =
                    activeCaseId !==
                    null
                      ? CASE_SCREEN_MAP[
                          activeCaseId
                        ]
                      : undefined;


                  if (
                    CaseScreen
                  ) {

                    return (
                      <CaseScreen
                        onVerdictFinal={(
                          rawVerdict: unknown,
                          investigated: string[]
                        ) =>
                          handleVerdictFinal(
                            normalizeVerdict(
                              rawVerdict
                            ),
                            investigated
                          )
                        }
                      />
                    );
                  }


                  /*
                   * Fallback for any older or
                   * uncatalogued case.
                   */
                  return (
                    <InvestigationScreen
                      onVerdictFinal={
                        handleVerdictFinal
                      }

                      onDiscoverFinding={
                        handleDiscoverFinding
                      }
                    />
                  );

                })()}


              {/* =================================================
                  NOTEBOOK
              ================================================= */}

              {screen ===
                "notebook" && (

                <NotebookScreen
                  cases={
                    cases
                  }

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

              {screen ===
                "profile" && (

                <ProfileScreen
                  profile={
                    profile
                  }

                  cases={
                    cases
                  }

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
                  cases={
                    cases
                  }
                />

              )}


              {/* =================================================
                  CASE RESOLUTION
              ================================================= */}

              {screen ===
                "case-resolution" &&
                finalVerdict !==
                  null &&
                activeCase !==
                  null && (

                <CaseResolutionScreen
                  verdict={
                    finalVerdict
                  }

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


              {/* =================================================
                  FINAL MISSION
              ================================================= */}

              {screen ===
                "final-mission" && (

                <FinalMissionScreen
                  onComplete={
                    handleFinalMissionComplete
                  }
                />

              )}

            </motion.div>

          </AnimatePresence>

        </main>

      </div>

    </CaseContentProvider>
  );
}