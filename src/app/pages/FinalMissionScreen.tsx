import { useMemo, useState, type ReactNode } from "react";

interface FinalMissionScreenProps {
  playerName?: string;
  onComplete: () => void;
}

type MissionPage =
  | "opening"
  | "mission"
  | "evidence-wall"
  | "connections"
  | "trust-reveal"
  | "final-question"
  | "graduation"
  | "certificate"
  | "post-credits"
  | "complete";

interface EvidenceCard {
  id: string;
  title: string;
  description: string;
  category: string;
  correctCategory: string;
  icon: string;
}

interface ConnectionCard {
  id: string;
  title: string;
  description: string;
  correctCases: string[];
  selectedCases: string[];
}

const EVIDENCE_CARDS: EvidenceCard[] = [
  {
    id: "ai-image",
    title: "AI-GENERATED IMAGE",
    description:
      "A realistic disaster photograph that cannot be traced to a genuine event.",
    category: "AI Content",
    correctCategory: "AI Content",
    icon: "🖼",
  },
  {
    id: "fake-charity",
    title: "FAKE CHARITY WEBSITE",
    description:
      "A donation campaign using a convincing identity and urgent emotional language.",
    category: "Phishing",
    correctCategory: "Phishing",
    icon: "🎣",
  },
  {
    id: "manipulated-graph",
    title: "MANIPULATED STATISTICS",
    description:
      "A graph claims crime increased by 400% while hiding the underlying numbers.",
    category: "Statistics",
    correctCategory: "Statistics",
    icon: "📊",
  },
  {
    id: "deepfake-politician",
    title: "DEEPFAKE POLITICIAN",
    description:
      "A synthetic video shows a public official promoting a suspicious charity campaign.",
    category: "Deepfake",
    correctCategory: "Deepfake",
    icon: "🎥",
  },
  {
    id: "old-flood-image",
    title: "OLD FLOOD IMAGE",
    description:
      "An authentic photograph is presented as evidence of a completely different event.",
    category: "Images",
    correctCategory: "Images",
    icon: "🌊",
  },
  {
    id: "clickbait-headline",
    title: "CLICKBAIT HEADLINE",
    description:
      "A dramatic headline is designed to trigger immediate clicks rather than inform.",
    category: "Clickbait",
    correctCategory: "Clickbait",
    icon: "📰",
  },
  {
    id: "fake-doctor",
    title: "AI DOCTOR",
    description:
      "A synthetic medical personality promotes an unsupported health claim.",
    category: "Health",
    correctCategory: "Health",
    icon: "🩺",
  },
  {
    id: "echo-feed",
    title: "PERSONALIZED FEED",
    description:
      "A recommendation feed repeatedly shows information matching an existing belief.",
    category: "Echo Chambers",
    correctCategory: "Echo Chambers",
    icon: "🫧",
  },
  {
    id: "fake-government",
    title: "GOVERNMENT IMPERSONATION",
    description:
      "A message imitates an official institution and asks users to follow an urgent link.",
    category: "Phishing",
    correctCategory: "Phishing",
    icon: "🏛",
  },
  {
    id: "viral-rumor",
    title: "VIRAL RUMOR",
    description:
      "A rapidly shared claim has no reliable source attached to it.",
    category: "Rumor",
    correctCategory: "Rumor",
    icon: "📢",
  },
  {
    id: "fake-disaster",
    title: "AI DISASTER REPORT",
    description:
      "An AI-generated video appears to show a disaster that never occurred.",
    category: "AI Content",
    correctCategory: "AI Content",
    icon: "⚠",
  },
];

const CONNECTIONS: ConnectionCard[] = [
  {
    id: "charity-deepfake",
    title: "DEEPFAKE POLITICIAN + FAKE CHARITY",
    description:
      "A synthetic politician appears to promote a suspicious donation campaign.",
    correctCases: ["Case 5", "Case 7"],
    selectedCases: [],
  },
  {
    id: "old-image-clickbait",
    title: "OLD FLOOD IMAGE + CLICKBAIT",
    description:
      "An authentic old image is paired with a misleading headline to create urgency.",
    correctCases: ["Case 2", "Case 3"],
    selectedCases: [],
  },
  {
    id: "ai-doctor",
    title: "AI DOCTOR + HEALTH CLAIM",
    description:
      "A synthetic medical personality promotes a questionable health claim.",
    correctCases: ["Case 1", "Case 4", "Case 5"],
    selectedCases: [],
  },
  {
    id: "statistics-headline",
    title: "MANIPULATED GRAPH + VIRAL HEADLINE",
    description:
      "A distorted statistic is amplified through a dramatic headline.",
    correctCases: ["Case 3", "Case 6"],
    selectedCases: [],
  },
  {
    id: "echo-rumor",
    title: "ECHO CHAMBER + VIRAL RUMOR",
    description:
      "A repeated rumor becomes stronger as users encounter fewer opposing perspectives.",
    correctCases: ["Case 8"],
    selectedCases: [],
  },
];

const CASE_OPTIONS = [
  "Case 1",
  "Case 2",
  "Case 3",
  "Case 4",
  "Case 5",
  "Case 6",
  "Case 7",
  "Case 8",
];

const CATEGORIES = [
  "Health",
  "AI Content",
  "Statistics",
  "Phishing",
  "Deepfake",
  "Images",
  "Clickbait",
  "Echo Chambers",
  "Rumor",
];

export default function FinalMissionScreen({
  playerName = "DIGITAL GUARDIAN",
  onComplete,
}: FinalMissionScreenProps) {
  const [page, setPage] =
    useState<MissionPage>("opening");

  const [placedCards, setPlacedCards] =
    useState<Record<string, string>>({});

  const [selectedConnections, setSelectedConnections] =
    useState<Record<string, string[]>>({});

  const [finalAnswer, setFinalAnswer] =
    useState<string | null>(null);

  const [showCertificate, setShowCertificate] =
    useState(false);

  const correctlyPlaced =
    useMemo(() => {
      return EVIDENCE_CARDS.filter(
        (card) =>
          placedCards[card.id] ===
          card.correctCategory
      ).length;
    }, [placedCards]);

  const correctConnectionCount =
    useMemo(() => {
      return CONNECTIONS.filter((connection) => {
        const selected =
          selectedConnections[connection.id] ?? [];

        return (
          selected.length ===
            connection.correctCases.length &&
          selected.every((item) =>
            connection.correctCases.includes(item)
          )
        );
      }).length;
    }, [selectedConnections]);

  const wallComplete =
    correctlyPlaced === EVIDENCE_CARDS.length;

  const connectionsComplete =
    correctConnectionCount === CONNECTIONS.length;

  const goNext = (nextPage: MissionPage) => {
    setPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleConnectionCase = (
    connectionId: string,
    caseName: string
  ) => {
    setSelectedConnections((previous) => {
      const current =
        previous[connectionId] ?? [];

      if (current.includes(caseName)) {
        return {
          ...previous,
          [connectionId]: current.filter(
            (item) => item !== caseName
          ),
        };
      }

      return {
        ...previous,
        [connectionId]: [
          ...current,
          caseName,
        ],
      };
    });
  };

  const finishMission = () => {
    setShowCertificate(true);
    setPage("certificate");
  };

  const completeGame = () => {
    if (onComplete) {
      onComplete();
    } else {
      setPage("complete");
    }
  };

  return (
    <div
      className="
        h-full
        w-full
        overflow-y-auto
        px-4
        py-8
      "
      style={{
        background:
          "radial-gradient(circle at top, #151b2b 0%, #07090f 55%, #03050a 100%)",
        color: "#c9b882",
        fontFamily:
          "Courier Prime, monospace",
      }}
    >
      <div
        className="
          max-w-6xl
          mx-auto
          space-y-8
          pb-16
        "
      >
        {page === "opening" && (
          <OpeningPage
            onContinue={() =>
              goNext("mission")
            }
          />
        )}

        {page === "mission" && (
          <MissionPageView
            onContinue={() =>
              goNext("evidence-wall")
            }
          />
        )}

        {page === "evidence-wall" && (
          <EvidenceWallPage
            placedCards={placedCards}
            setPlacedCards={setPlacedCards}
            correctlyPlaced={correctlyPlaced}
            onContinue={() =>
              goNext("connections")
            }
            wallComplete={wallComplete}
          />
        )}

        {page === "connections" && (
          <ConnectionsPage
            selectedConnections={
              selectedConnections
            }
            onToggle={
              toggleConnectionCase
            }
            correctCount={
              correctConnectionCount
            }
            complete={
              connectionsComplete
            }
            onContinue={() =>
              goNext("trust-reveal")
            }
          />
        )}

        {page === "trust-reveal" && (
          <TrustRevealPage
            onContinue={() =>
              goNext("final-question")
            }
          />
        )}

        {page === "final-question" && (
          <FinalQuestionPage
            answer={finalAnswer}
            setAnswer={setFinalAnswer}
            onContinue={() =>
              goNext("graduation")
            }
          />
        )}

        {page === "graduation" && (
          <GraduationPage
            playerName={playerName}
            onContinue={() =>
              goNext("certificate")
            }
          />
        )}

        {page === "certificate" && (
          <CertificatePage
            playerName={playerName}
            showCertificate={
              showCertificate
            }
            onContinue={() =>
              goNext("post-credits")
            }
          />
        )}

        {page === "post-credits" && (
          <PostCreditsPage
            onContinue={completeGame}
          />
        )}

        {page === "complete" && (
          <CompletionPage
            onComplete={completeGame}
          />
        )}
      </div>
    </div>
  );
}


/* =========================================================
   SHARED COMPONENTS
========================================================= */

function PageShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      className="border p-6 md:p-10"
      style={{
        borderColor:
          "rgba(201,162,39,0.35)",
        backgroundColor:
          "rgba(3,5,12,0.88)",
        boxShadow:
          "0 0 40px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          color: "#00e9ff",
          fontSize: "10px",
          letterSpacing: "0.25em",
        }}
      >
        {eyebrow}
      </div>

      <h1
        className="mt-4"
        style={{
          fontFamily:
            "Special Elite, serif",
          fontSize:
            "clamp(30px, 5vw, 58px)",
          lineHeight: 1.1,
          color: "#ffd966",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h1>

      <div className="mt-8">
        {children}
      </div>
    </section>
  );
}

function ActionButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="border px-6 py-3 mt-6"
      style={{
        borderColor:
          disabled
            ? "rgba(201,162,39,0.15)"
            : "#c9a227",
        color:
          disabled
            ? "#5d543c"
            : "#ffd966",
        background:
          disabled
            ? "transparent"
            : "rgba(201,162,39,0.08)",
        cursor:
          disabled
            ? "not-allowed"
            : "pointer",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </button>
  );
}

function Quote({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="border-l-2 pl-5 my-5"
      style={{
        borderColor: "#ffd966",
        color: "#ddd0a5",
        lineHeight: 1.8,
      }}
    >
      {children}
    </div>
  );
}


/* =========================================================
   PAGE 1 — OPENING
========================================================= */

function OpeningPage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="DIGITAL GUARDIANS HEADQUARTERS · 8:42 PM"
      title="OPERATION BLACKOUT"
    >
      <div
        className="border p-5"
        style={{
          borderColor:
            "rgba(255,70,70,0.45)",
          background:
            "rgba(100,0,0,0.12)",
        }}
      >
        <div
          style={{
            color: "#ff6666",
            letterSpacing: "0.18em",
            fontSize: "12px",
          }}
        >
          ⚠ DIGITAL EMERGENCY PROTOCOL
          ACTIVATED ⚠
        </div>

        <div
          className="mt-3"
          style={{
            fontSize: "20px",
            color: "#ff9999",
          }}
        >
          LEVEL OMEGA
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <p>
          The headquarters is unusually
          peaceful.
        </p>

        <p>
          For the first time since joining
          the academy, no alarms are ringing.
        </p>

        <p>
          No investigations are pending.
          No emergency reports are waiting.
        </p>

        <p>
          Commander Mira walks toward you
          with a small velvet box.
        </p>

        <p>
          Inside lies your eighth badge:
        </p>

        <div
          className="text-center border p-6"
          style={{
            borderColor:
              "rgba(201,162,39,0.35)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
            }}
          >
            🫧
          </div>

          <div
            style={{
              fontFamily:
                "Special Elite, serif",
              fontSize: "24px",
              color: "#ffd966",
            }}
          >
            PERSPECTIVE SEEKER
          </div>
        </div>

        <Quote>
          <p>
            "Congratulations, Detective."
          </p>

          <p className="mt-3">
            "You've completed every training
            investigation."
          </p>
        </Quote>

        <p>
          Leo remembers your first day.
        </p>

        <Quote>
          <p>
            "I still remember your first day."
          </p>

          <p className="mt-3">
            "You believed almost everything on
            the internet."
          </p>
        </Quote>

        <p>
          Then every light switches off.
        </p>

        <p
          style={{
            color: "#ff7777",
            fontWeight: "bold",
          }}
        >
          Darkness. Complete silence.
        </p>

        <p>
          Emergency lights begin flashing
          crimson red.
        </p>

        <div
          className="border p-6 text-center"
          style={{
            borderColor:
              "rgba(255,60,60,0.5)",
            background:
              "rgba(255,0,0,0.06)",
          }}
        >
          <div
            style={{
              color: "#ff6666",
              fontSize: "14px",
              letterSpacing: "0.15em",
            }}
          >
            ⚠ DIGITAL EMERGENCY PROTOCOL
            ACTIVATED ⚠
          </div>

          <div
            className="mt-3"
            style={{
              color: "#ffd966",
              fontFamily:
                "Special Elite, serif",
              fontSize: "32px",
            }}
          >
            LEVEL OMEGA
          </div>
        </div>

        <p>
          Social media posts begin flooding
          every monitor.
        </p>

        <p>
          News alerts. Videos. Images. Voice
          recordings. Emails. Forwarded
          messages. Live streams. Donation
          campaigns. Government announcements.
        </p>

        <p>
          Everything. At once.
        </p>

        <Quote>
          <p>
            "Multiple coordinated
            misinformation campaigns
            detected!"
          </p>

          <p className="mt-3">
            "Everything is happening
            simultaneously!"
          </p>
        </Quote>

        <p>
          Commander Mira places every badge
          you've earned onto the Operations
          Table.
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5"
        >
          {[
            "🩺 Health Guardian",
            "🖼 Image Investigator",
            "📰 Headline Hunter",
            "🎨 AI Spotter",
            "🎥 Deepfake Detective",
            "📊 Data Detective",
            "🎣 Scam Shield",
            "🫧 Perspective Seeker",
          ].map((badge) => (
            <div
              key={badge}
              className="border p-3 text-center"
              style={{
                borderColor:
                  "rgba(201,162,39,0.2)",
                fontSize: "12px",
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        <Quote>
          <p>
            "Your training ends here."
          </p>

          <p className="mt-3">
            "From this point onward..."
          </p>

          <p className="mt-3">
            "There will be no hints."
          </p>

          <p className="mt-3">
            "Today..."
          </p>

          <p className="mt-3">
            "...you investigate alone."
          </p>
        </Quote>
      </div>

      <ActionButton onClick={onContinue}>
        ACCEPT FINAL MISSION
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 2 — MISSION
========================================================= */

function MissionPageView({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="FINAL MISSION · MASTER DETECTIVE"
      title="THE TRUTH UNDER PRESSURE"
    >
      <div
        className="grid md:grid-cols-3 gap-4"
      >
        <InfoCard
          label="MISSION"
          value="OPERATION BLACKOUT"
        />

        <InfoCard
          label="DIFFICULTY"
          value="MASTER DETECTIVE"
        />

        <InfoCard
          label="XP REWARD"
          value="+1000 XP"
        />
      </div>

      <div className="mt-8 space-y-5">
        <p>
          Emergency alarms ring throughout
          Headquarters.
        </p>

        <Quote>
          <p>
            "Something's wrong!"
          </p>
        </Quote>

        <p>
          Commander Mira walks toward the
          Evidence Wall.
        </p>

        <p>
          For the first time, she doesn't look
          at the screens.
        </p>

        <p>
          She looks at <strong>your Evidence
          Wall</strong>.
        </p>

        <p>
          Every clue you've pinned since Case
          1 is still there.
        </p>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            "Health misinformation",
            "Edited images",
            "Clickbait headlines",
            "Deepfake videos",
            "Manipulated statistics",
            "Phishing emails",
            "Echo chambers",
            "AI-generated content",
          ].map((item) => (
            <div
              key={item}
              className="border p-3"
              style={{
                borderColor:
                  "rgba(201,162,39,0.2)",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <Quote>
          <p>
            "Good."
          </p>

          <p className="mt-3">
            "Because today..."
          </p>

          <p className="mt-3">
            "...that wall becomes your greatest
            weapon."
          </p>
        </Quote>

        <h2
          style={{
            fontFamily:
              "Special Elite, serif",
            color: "#ffd966",
            fontSize: "26px",
          }}
        >
          THE TWIST
        </h2>

        <p>
          Every previous case was never
          separate.
        </p>

        <p>
          They were pieces of one enormous
          misinformation network.
        </p>

        <p>
          Until now, you were learning
          individual techniques.
        </p>

        <p>
          Today, you investigate how they
          work together.
        </p>

        <div
          className="border p-6 text-center"
          style={{
            borderColor:
              "rgba(201,162,39,0.35)",
          }}
        >
          <div
            style={{
              color: "#00e9ff",
              letterSpacing: "0.18em",
            }}
          >
            MISSION OBJECTIVE
          </div>

          <div
            className="mt-3"
            style={{
              fontFamily:
                "Special Elite, serif",
              fontSize: "28px",
              color: "#ffd966",
            }}
          >
            CONNECT THE TRUTH BEFORE
            THE WORLD DISCONNECTS.
          </div>
        </div>
      </div>

      <ActionButton onClick={onContinue}>
        ENTER EVIDENCE WALL
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 3 — EVIDENCE WALL
========================================================= */

function EvidenceWallPage({
  placedCards,
  setPlacedCards,
  correctlyPlaced,
  wallComplete,
  onContinue,
}: {
  placedCards: Record<string, string>;
  setPlacedCards: React.Dispatch<
    React.SetStateAction<
      Record<string, string>
    >
  >;
  correctlyPlaced: number;
  wallComplete: boolean;
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="FINAL INVESTIGATION · EVIDENCE WALL"
      title="REBUILD THE WALL"
    >
      <p
        style={{
          lineHeight: 1.8,
        }}
      >
        The wall has been scrambled. Every
        evidence card is a fragment of the
        larger misinformation ecosystem.
      </p>

      <Quote>
        <p>
          Place every clue into the category
          where it belongs.
        </p>

        <p className="mt-3">
          Correct placement reveals the
          network.
        </p>
      </Quote>

      <div
        className="border p-5 mt-8"
        style={{
          borderColor:
            wallComplete
              ? "#00e9ff"
              : "rgba(201,162,39,0.25)",
        }}
      >
        <div
          className="flex justify-between"
          style={{
            fontSize: "12px",
            letterSpacing: "0.12em",
          }}
        >
          <span>
            WALL PROGRESS
          </span>

          <span
            style={{
              color: "#ffd966",
            }}
          >
            {correctlyPlaced}/
            {EVIDENCE_CARDS.length}
          </span>
        </div>

        <div
          className="mt-3"
          style={{
            height: "8px",
            background:
              "rgba(201,162,39,0.12)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${
                (correctlyPlaced /
                  EVIDENCE_CARDS.length) *
                100
              }%`,
              background:
                "#c9a227",
              transition:
                "width 0.3s ease",
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {EVIDENCE_CARDS.map((card) => {
          const selected =
            placedCards[card.id] ?? "";

          const correct =
            selected ===
            card.correctCategory;

          return (
            <div
              key={card.id}
              className="border p-5"
              style={{
                borderColor:
                  correct
                    ? "#00e9ff"
                    : "rgba(201,162,39,0.2)",
              }}
            >
              <div
                className="flex gap-3 items-start"
              >
                <span
                  style={{
                    fontSize: "30px",
                  }}
                >
                  {card.icon}
                </span>

                <div>
                  <div
                    style={{
                      color: "#ffd966",
                      fontFamily:
                        "Special Elite, serif",
                      fontSize: "19px",
                    }}
                  >
                    {card.title}
                  </div>

                  <p
                    className="mt-2"
                    style={{
                      lineHeight: 1.6,
                      fontSize: "13px",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>

              <select
                value={selected}
                onChange={(event) => {
                  setPlacedCards(
                    (previous) => ({
                      ...previous,
                      [card.id]:
                        event.target.value,
                    })
                  );
                }}
                className="mt-4 w-full border p-3"
                style={{
                  background:
                    "#07090f",
                  color: "#c9b882",
                  borderColor:
                    "rgba(201,162,39,0.3)",
                }}
              >
                <option value="">
                  SELECT CATEGORY
                </option>

                {CATEGORIES.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>

              {selected !== "" && (
                <div
                  className="mt-3"
                  style={{
                    color: correct
                      ? "#00e9ff"
                      : "#ff9999",
                    fontSize: "12px",
                  }}
                >
                  {correct
                    ? "✓ CONNECTION VERIFIED"
                    : "✕ INCORRECT PLACEMENT"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {wallComplete && (
        <div
          className="border p-6 mt-8 text-center"
          style={{
            borderColor: "#00e9ff",
            background:
              "rgba(0,233,255,0.05)",
          }}
        >
          <div
            style={{
              color: "#00e9ff",
              fontSize: "12px",
              letterSpacing: "0.2em",
            }}
          >
            EVIDENCE WALL RESTORED
          </div>

          <div
            className="mt-3"
            style={{
              fontFamily:
                "Special Elite, serif",
              color: "#ffd966",
              fontSize: "26px",
            }}
          >
            THE NETWORK IS VISIBLE.
          </div>
        </div>
      )}

      <ActionButton
        onClick={onContinue}
        disabled={!wallComplete}
      >
        CONTINUE TO CONNECTION ANALYSIS
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 4 — CONNECTIONS
========================================================= */

function ConnectionsPage({
  selectedConnections,
  onToggle,
  correctCount,
  complete,
  onContinue,
}: {
  selectedConnections: Record<
    string,
    string[]
  >;
  onToggle: (
    connectionId: string,
    caseName: string
  ) => void;
  correctCount: number;
  complete: boolean;
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="NETWORK ANALYSIS"
      title="CONNECT THE CASES"
    >
      <p
        style={{
          lineHeight: 1.8,
        }}
      >
        The fragments are no longer isolated.
        Connect each new event to the
        previous investigations that help
        explain it.
      </p>

      <div
        className="border p-5 mt-6"
        style={{
          borderColor:
            "rgba(201,162,39,0.25)",
        }}
      >
        <div>
          CONNECTIONS VERIFIED
        </div>

        <div
          className="mt-2"
          style={{
            color: "#ffd966",
            fontSize: "24px",
          }}
        >
          {correctCount}/
          {CONNECTIONS.length}
        </div>
      </div>

      <div className="space-y-6 mt-8">
        {CONNECTIONS.map(
          (connection) => {
            const selected =
              selectedConnections[
                connection.id
              ] ?? [];

            const correct =
              selected.length ===
                connection.correctCases
                  .length &&
              selected.every((item) =>
                connection.correctCases.includes(
                  item
                )
              );

            return (
              <div
                key={connection.id}
                className="border p-5"
                style={{
                  borderColor:
                    correct
                      ? "#00e9ff"
                      : "rgba(201,162,39,0.2)",
                }}
              >
                <div
                  style={{
                    color: "#ffd966",
                    fontFamily:
                      "Special Elite, serif",
                    fontSize: "20px",
                  }}
                >
                  {connection.title}
                </div>

                <p
                  className="mt-2"
                  style={{
                    lineHeight: 1.6,
                  }}
                >
                  {connection.description}
                </p>

                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4"
                >
                  {CASE_OPTIONS.map(
                    (caseName) => {
                      const active =
                        selected.includes(
                          caseName
                        );

                      return (
                        <button
                          key={caseName}
                          type="button"
                          onClick={() =>
                            onToggle(
                              connection.id,
                              caseName
                            )
                          }
                          className="border p-3"
                          style={{
                            borderColor:
                              active
                                ? "#c9a227"
                                : "rgba(201,162,39,0.15)",
                            background:
                              active
                                ? "rgba(201,162,39,0.1)"
                                : "transparent",
                            color:
                              active
                                ? "#ffd966"
                                : "#c9b882",
                            cursor:
                              "pointer",
                          }}
                        >
                          {caseName}
                        </button>
                      );
                    }
                  )}
                </div>

                {selected.length > 0 && (
                  <div
                    className="mt-3"
                    style={{
                      color: correct
                        ? "#00e9ff"
                        : "#ff9999",
                      fontSize: "12px",
                    }}
                  >
                    {correct
                      ? "✓ CONNECTION VERIFIED"
                      : "CHECK THE CONNECTION"}
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>

      <ActionButton
        onClick={onContinue}
        disabled={!complete}
      >
        REVEAL THE CENTRAL NODE
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 5 — TRUST
========================================================= */

function TrustRevealPage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="NETWORK CORE IDENTIFIED"
      title="TRUST"
    >
      <div
        className="border p-8 text-center"
        style={{
          borderColor: "#ffd966",
          background:
            "radial-gradient(circle, rgba(201,162,39,0.12), transparent)",
        }}
      >
        <div
          style={{
            fontSize: "64px",
          }}
        >
          ◉
        </div>

        <div
          className="mt-4"
          style={{
            fontFamily:
              "Special Elite, serif",
            color: "#ffd966",
            fontSize: "42px",
            letterSpacing: "0.15em",
          }}
        >
          TRUST
        </div>
      </div>

      <div className="mt-8 space-y-5">
        <Quote>
          <p>
            "Every misinformation campaign..."
          </p>

          <p className="mt-3">
            "...tries to manipulate one thing."
          </p>
        </Quote>

        <p>
          Sometimes they want your attention.
        </p>

        <div
          className="border p-4"
          style={{
            borderColor:
              "rgba(201,162,39,0.2)",
          }}
        >
          → CLICKBAIT
        </div>

        <p>
          Sometimes they want your money.
        </p>

        <div
          className="border p-4"
          style={{
            borderColor:
              "rgba(201,162,39,0.2)",
          }}
        >
          → PHISHING
        </div>

        <p>
          Sometimes they want your emotions.
        </p>

        <div
          className="border p-4"
          style={{
            borderColor:
              "rgba(201,162,39,0.2)",
          }}
        >
          → HEALTH MISINFORMATION
        </div>

        <p>
          Sometimes they want your beliefs.
        </p>

        <div
          className="border p-4"
          style={{
            borderColor:
              "rgba(201,162,39,0.2)",
          }}
        >
          → ECHO CHAMBERS
        </div>

        <p>
          Sometimes they want your identity.
        </p>

        <div
          className="border p-4"
          style={{
            borderColor:
              "rgba(201,162,39,0.2)",
          }}
        >
          → AI IMPERSONATION
        </div>

        <Quote>
          <p>
            Every thread points to the same
            center:
          </p>

          <p
            className="mt-3"
            style={{
              color: "#ffd966",
              fontFamily:
                "Special Elite, serif",
              fontSize: "24px",
            }}
          >
            TRUST.
          </p>
        </Quote>
      </div>

      <ActionButton onClick={onContinue}>
        BEGIN FINAL QUESTION
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 6 — FINAL QUESTION
========================================================= */

function FinalQuestionPage({
  answer,
  setAnswer,
  onContinue,
}: {
  answer: string | null;
  setAnswer: (
    value: string
  ) => void;
  onContinue: () => void;
}) {
  const options = [
    "Facts",
    "Technology",
    "Algorithms",
    "People's trust, emotions, and decision-making.",
  ];

  const correct =
    answer ===
    "People's trust, emotions, and decision-making.";

  return (
    <PageShell
      eyebrow="FINAL DECISION"
      title="WHAT IS MISINFORMATION REALLY TRYING TO MANIPULATE?"
    >
      <div className="space-y-3">
        {options.map((option) => {
          const selected =
            answer === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                setAnswer(option)
              }
              className="w-full border p-4 text-left"
              style={{
                borderColor:
                  selected
                    ? "#c9a227"
                    : "rgba(201,162,39,0.2)",
                background:
                  selected
                    ? "rgba(201,162,39,0.08)"
                    : "transparent",
                color:
                  selected
                    ? "#ffd966"
                    : "#c9b882",
                cursor: "pointer",
              }}
            >
              ○ {option}
            </button>
          );
        })}
      </div>

      {answer !== null && (
        <div
          className="border p-5 mt-6"
          style={{
            borderColor:
              correct
                ? "#00e9ff"
                : "#ff7777",
          }}
        >
          <div
            style={{
              color:
                correct
                  ? "#00e9ff"
                  : "#ff9999",
              letterSpacing:
                "0.12em",
            }}
          >
            {correct
              ? "✓ CORRECT"
              : "✕ NOT QUITE"}
          </div>

          <p className="mt-3">
            {correct
              ? "The final thread glows gold. The entire Evidence Wall transforms."
              : "Look again at the center of the misinformation network."}
          </p>
        </div>
      )}

      <ActionButton
        onClick={onContinue}
        disabled={!correct}
      >
        VERIFY FINAL ANSWER
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 7 — GRADUATION
========================================================= */

function GraduationPage({
  playerName,
  onContinue,
}: {
  playerName: string;
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="DIGITAL GUARDIANS ACADEMY"
      title="GRADUATION"
    >
      <div className="space-y-5">
        <p>
          Commander Mira walks toward the
          completed Evidence Wall.
        </p>

        <Quote>
          <p>
            "When you arrived..."
          </p>

          <p className="mt-3">
            "You saw every case as a separate
            mystery."
          </p>

          <p className="mt-3">
            "Today..."
          </p>

          <p className="mt-3">
            "...you discovered they were
            chapters of the same story."
          </p>
        </Quote>

        <p>
          She removes your trainee badge.
        </p>

        <div
          className="border p-8 text-center"
          style={{
            borderColor: "#ffd966",
            background:
              "rgba(201,162,39,0.06)",
          }}
        >
          <div
            style={{
              fontSize: "60px",
            }}
          >
            🏆
          </div>

          <div
            className="mt-4"
            style={{
              fontFamily:
                "Special Elite, serif",
              color: "#ffd966",
              fontSize: "32px",
            }}
          >
            MASTER DIGITAL GUARDIAN
          </div>

          <div
            className="mt-3"
            style={{
              color: "#00e9ff",
            }}
          >
            {playerName}
          </div>
        </div>

        <Quote>
          <p>
            "A Digital Guardian doesn't just
            solve misinformation."
          </p>

          <p className="mt-3">
            "A Digital Guardian understands how
            misinformation works."
          </p>
        </Quote>

        <div
          className="border p-5 text-center"
          style={{
            borderColor:
              "rgba(0,233,255,0.3)",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              color: "#00e9ff",
            }}
          >
            TRUTH VERIFIED
          </div>
        </div>
      </div>

      <ActionButton onClick={onContinue}>
        VIEW CERTIFICATE
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 8 — CERTIFICATE
========================================================= */

function CertificatePage({
  playerName,
  showCertificate,
  onContinue,
}: {
  playerName: string;
  showCertificate: boolean;
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="CERTIFICATE OF COMPLETION"
      title="DIGITAL GUARDIANS ACADEMY"
    >
      {showCertificate && (
        <div
          className="border-2 p-8 md:p-12 text-center"
          style={{
            borderColor: "#ffd966",
            background:
              "linear-gradient(145deg, rgba(201,162,39,0.08), rgba(3,5,12,0.95))",
          }}
        >
          <div
            style={{
              letterSpacing:
                "0.2em",
              color: "#00e9ff",
              fontSize: "11px",
            }}
          >
            CERTIFICATE OF COMPLETION
          </div>

          <div
            className="mt-8"
            style={{
              fontFamily:
                "Special Elite, serif",
              color: "#ffd966",
              fontSize: "34px",
            }}
          >
            {playerName}
          </div>

          <p
            className="mt-8"
            style={{
              lineHeight: 1.8,
            }}
          >
            has successfully completed the
            Digital Guardians Training
            Programme and demonstrated
            outstanding ability in identifying
            misinformation, verifying digital
            content, evaluating sources
            critically, protecting personal
            information, and promoting
            responsible digital citizenship.
          </p>

          <div
            className="mt-8"
            style={{
              color: "#b8a878",
              letterSpacing:
                "0.12em",
            }}
          >
            AWARDED THE RANK OF
          </div>

          <div
            className="mt-3"
            style={{
              fontFamily:
                "Special Elite, serif",
              color: "#ffd966",
              fontSize: "30px",
            }}
          >
            🏆 MASTER DIGITAL GUARDIAN
          </div>

          <div
            className="mt-10 border-t pt-6"
            style={{
              borderColor:
                "rgba(201,162,39,0.2)",
            }}
          >
            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "20px",
                color: "#ffd966",
              }}
            >
              "VERIFY BEFORE YOU AMPLIFY."
            </div>

            <div
              className="mt-5"
              style={{
                color: "#b8a878",
              }}
            >
              Signed,
            </div>

            <div
              className="mt-2"
              style={{
                color: "#00e9ff",
              }}
            >
              Commander Mira
            </div>

            <div
              className="mt-1"
              style={{
                fontSize: "12px",
              }}
            >
              Director, Digital Guardians
              Academy
            </div>
          </div>
        </div>
      )}

      <ActionButton onClick={onContinue}>
        CONTINUE
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 9 — POST CREDITS
========================================================= */

function PostCreditsPage({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <PageShell
      eyebrow="POST-CREDITS"
      title="THE END?"
    >
      <div className="space-y-6">
        <p>
          The headquarters is empty.
        </p>

        <p>
          The lights are off.
        </p>

        <p>
          Leo switches off the final monitor.
        </p>

        <div
          className="border p-6"
          style={{
            borderColor:
              "rgba(201,162,39,0.25)",
            background:
              "rgba(3,5,12,0.7)",
          }}
        >
          <div
            style={{
              color: "#00e9ff",
              fontSize: "11px",
              letterSpacing:
                "0.15em",
            }}
          >
            NEW UPLOAD DETECTED...
          </div>

          <div
            className="mt-5"
            style={{
              color: "#ffd966",
              fontFamily:
                "Special Elite, serif",
              fontSize: "23px",
            }}
          >
            "BREAKING: Scientists Confirm
            the Moon Has Disappeared."
          </div>
        </div>

        <Quote>
          <p>
            "Looks like we'll always need
            Digital Guardians."
          </p>
        </Quote>

        <div
          className="text-center mt-10"
          style={{
            color: "#00e9ff",
            letterSpacing:
              "0.2em",
          }}
        >
          SCREEN FADING...
        </div>
      </div>

      <ActionButton onClick={onContinue}>
        FINISH
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   PAGE 10 — FINAL MESSAGE
========================================================= */

function CompletionPage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  return (
    <PageShell
      eyebrow="DIGITAL GUARDIANS"
      title="YOUR MISSION CONTINUES"
    >
      <div className="space-y-6">
        <p
          style={{
            lineHeight: 1.9,
            fontSize: "16px",
          }}
        >
          The cases may be over, but your role
          as a Digital Guardian is just
          beginning.
        </p>

        <p
          style={{
            lineHeight: 1.9,
          }}
        >
          Every day, you'll scroll through
          social media, receive forwarded
          messages, watch videos, and read
          headlines.
        </p>

        <p
          style={{
            lineHeight: 1.9,
          }}
        >
          Some will be true. Some will be
          misleading. Some will be entirely
          false.
        </p>

        <Quote>
          <p>
            The goal of this game was never to
            teach you to distrust everything.
          </p>

          <p className="mt-4">
            It was to teach you{" "}
            <strong>
              how to think before you trust.
            </strong>
          </p>
        </Quote>

        <div
          className="border p-8 text-center"
          style={{
            borderColor: "#ffd966",
          }}
        >
          <div
            style={{
              fontFamily:
                "Special Elite, serif",
              color: "#ffd966",
              fontSize: "27px",
            }}
          >
            A DIGITAL GUARDIAN
          </div>

          <div
            className="mt-3"
            style={{
              color: "#00e9ff",
              fontSize: "18px",
            }}
          >
            DOESN'T SHARE FIRST.
          </div>

          <div
            className="mt-3"
            style={{
              color: "#ffd966",
              fontSize: "22px",
            }}
          >
            VERIFIES FIRST.
          </div>
        </div>

        <div
          className="text-center"
          style={{
            fontFamily:
              "Special Elite, serif",
            color: "#ffd966",
            fontSize: "30px",
          }}
        >
          🏆 MASTER DIGITAL GUARDIAN 🏆
        </div>
      </div>

      <ActionButton onClick={onComplete}>
        RETURN TO HEADQUARTERS
      </ActionButton>
    </PageShell>
  );
}


/* =========================================================
   SMALL INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="border p-4"
      style={{
        borderColor:
          "rgba(201,162,39,0.2)",
      }}
    >
      <div
        style={{
          color: "#00e9ff",
          fontSize: "9px",
          letterSpacing:
            "0.15em",
        }}
      >
        {label}
      </div>

      <div
        className="mt-2"
        style={{
          color: "#ffd966",
          fontSize: "15px",
        }}
      >
        {value}
      </div>
    </div>
  );
}