import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Verdict } from "../types";

interface Case2ScreenProps {
  onBack?: () => void;
  onVerdictFinal: (
    verdict: NonNullable<Verdict>,
    investigated: string[]
  ) => void;
}

type Phase =
  | "transition"
  | "briefing"
  | "evidence"
  | "decision"
  | "debrief"
  | "quiz"
  | "rewards";

interface Clue {
  id: string;
  title: string;
  category: string;
  description: string;
  finding: string;
}

const CLUES: Clue[] = [
  {
    id: "reverse-image",
    title: "REVERSE IMAGE SEARCH",
    category: "IMAGE VERIFICATION",
    description:
      "The exact same photograph appears in an article published five years earlier.",
    finding: "Image existed five years earlier.",
  },
  {
    id: "image-details",
    title: "IMAGE DETAILS",
    category: "VISUAL INSPECTION",
    description:
      "The photograph contains old emergency vehicles, outdated logos, a damaged bridge that no longer exists, and festival advertisements from years ago.",
    finding: "Image contains outdated landmarks and visual details.",
  },
  {
    id: "weather",
    title: "WEATHER REPORT",
    category: "OFFICIAL DATA",
    description:
      "Today's official forecast is sunny. There is no rainfall or flood warning matching the viral claim.",
    finding: "Weather does not match the claim.",
  },
  {
    id: "local-news",
    title: "LOCAL NEWS",
    category: "CROSS-CHECK",
    description:
      "No trusted news organizations are reporting the claimed flooding. Only one blog repeats the viral image.",
    finding: "No credible independent confirmation.",
  },
  {
    id: "donation",
    title: "DONATION WEBSITE",
    category: "SOURCE CHECK",
    description:
      "The website was created only yesterday. It provides no registered charity information or contact details, and payments go to an anonymous personal wallet.",
    finding: "Suspicious donation request.",
  },
];

const QUIZ_ANSWERS = [
  {
    question: "Why was the viral post misleading?",
    options: [
      "The image was AI-generated.",
      "The image was edited.",
      "The image was real but taken from an old event and presented as current.",
      "The flood never happened anywhere.",
    ],
    correct: 2,
  },
  {
    question: "Which investigation tool helped reveal the truth first?",
    options: [
      "Comments",
      "Reverse Image Search",
      "Likes",
      "Shares",
    ],
    correct: 1,
  },
  {
    question: "Before donating online, you should...",
    options: [
      "Donate immediately if many people have shared the post.",
      "Verify both the event and the legitimacy of the charity.",
    ],
    correct: 1,
  },
];

export default function Case2Screen({
  onVerdictFinal,
  onBack,
}: Case2ScreenProps) {
  const [phase, setPhase] = useState<Phase>("transition");
  const [selectedClue, setSelectedClue] = useState<string | null>(null);
  const [investigated, setInvestigated] = useState<string[]>([]);
  const [selectedVerdict, setSelectedVerdict] = useState<number | null>(
    null
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const discoverClue = (clue: Clue) => {
    setSelectedClue(clue.id);

    setInvestigated((previous) =>
      previous.includes(clue.id)
        ? previous
        : [...previous, clue.id]
    );
  };

  const submitVerdict = () => {
    if (selectedVerdict !== 2) {
      return;
    }

    /*
     * "verify" is the existing MIL action used by the application.
     * The cast keeps this screen compatible with the Verdict union
     * already defined in the project.
     */
    onVerdictFinal(
      "verify" as NonNullable<Verdict>,
      investigated
    );

    setPhase("debrief");
  };

  const answerQuiz = (index: number) => {
    setQuizAnswer(index);
  };

  const nextQuizQuestion = () => {
    if (quizAnswer === null) {
      return;
    }

    if (quizIndex < QUIZ_ANSWERS.length - 1) {
      setQuizIndex((previous) => previous + 1);
      setQuizAnswer(null);
    } else {
      setPhase("rewards");
    }
  };

  const pageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    padding: "36px 48px",
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at top, rgba(201,162,39,0.08), transparent 42%), #07090f",
    color: "#c9b882",
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "Special Elite, serif",
    color: "#ffd966",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  };

  const panelStyle: React.CSSProperties = {
    border: "1px solid rgba(201,162,39,0.28)",
    background: "rgba(8,11,18,0.88)",
    padding: "24px",
    marginBottom: "18px",
    boxShadow: "0 0 30px rgba(0,0,0,0.2)",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    marginTop: "10px",
    border: "1px solid rgba(201,162,39,0.35)",
    background: "rgba(201,162,39,0.05)",
    color: "#c9b882",
    fontFamily: "Courier Prime, monospace",
    letterSpacing: "0.08em",
    textAlign: "left",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            position: "fixed",
            top: "14px",
            left: "14px",
            zIndex: 500,
            fontFamily: "Courier Prime, monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "#c9a227",
            border: "1px solid rgba(201,162,39,0.4)",
            backgroundColor: "rgba(7,9,15,0.85)",
            padding: "6px 14px",
            cursor: "pointer",
          }}
        >
          ← BUREAU
        </button>
      )}
      <AnimatePresence mode="wait">
        {/* =====================================================
            TRANSITION
        ===================================================== */}
        {phase === "transition" && (
          <motion.section
            key="transition"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  fontFamily: "Courier Prime, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "#00e9ff",
                  marginBottom: "20px",
                }}
              >
                🔔 NEW CASE RECEIVED
              </div>

              <h1 style={{ ...titleStyle, fontSize: "38px" }}>
                YESTERDAY'S DISASTER
              </h1>

              <p style={{ lineHeight: 1.9 }}>
                Excellent work on your first mission, Detective.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                You stopped misinformation before it could spread
                further.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                But not every false story is created from fake words.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                Sometimes...
                <br />
                <strong style={{ color: "#ffd966" }}>
                  The truth is hidden behind a real photograph.
                </strong>
              </p>

              <button
                type="button"
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background: "#c9a227",
                  color: "#07090f",
                }}
                onClick={() => setPhase("briefing")}
              >
                OPEN CASE FILE 002
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================================
            BRIEFING
        ===================================================== */}
        {phase === "briefing" && (
          <motion.section
            key="briefing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 950, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  color: "#00e9ff",
                }}
              >
                CASE FILE 002
              </div>

              <h1 style={{ ...titleStyle, fontSize: "42px" }}>
                YESTERDAY'S DISASTER
              </h1>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  marginTop: "24px",
                }}
              >
                <InfoBox label="DIFFICULTY" value="⭐⭐ BEGINNER" />
                <InfoBox
                  label="MIL SKILL"
                  value="CONTEXT VERIFICATION"
                />
                <InfoBox label="XP REWARD" value="+150 XP" />
                <InfoBox
                  label="BADGE"
                  value="🖼️ CONTEXT DETECTIVE"
                />
              </div>

              <p style={{ lineHeight: 1.9, marginTop: "28px" }}>
                Early this morning, social media exploded with
                heartbreaking images of a flooded city.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                Thousands of people have already started donating
                money and warning others to stay indoors.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                At first glance, everything looks genuine.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                The problem is...
                <br />
                <strong style={{ color: "#ffd966" }}>
                  Something doesn't add up.
                </strong>
              </p>

              <p style={{ lineHeight: 1.9 }}>
                Your mission is simple.
                <br />
                Find out whether this image really shows today's
                disaster.
              </p>

              <button
                type="button"
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background: "#c9a227",
                  color: "#07090f",
                }}
                onClick={() => setPhase("evidence")}
              >
                ▶ ACCEPT MISSION
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================================
            EVIDENCE
        ===================================================== */}
        {phase === "evidence" && (
          <motion.section
            key="evidence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 1100, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#00e9ff",
                }}
              >
                EVIDENCE 01 · VIRAL SOCIAL MEDIA POST
              </div>

              <h1 style={{ ...titleStyle, fontSize: "32px" }}>
                🚨 BREAKING NEWS
              </h1>

              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "22px",
                  marginTop: "20px",
                  lineHeight: 1.8,
                }}
              >
                <strong style={{ color: "#fff" }}>
                  Massive floods have completely submerged Mumbai
                  overnight.
                </strong>

                <p>Thousands are trapped.</p>

                <p>
                  Emergency services have reportedly stopped
                  responding.
                </p>

                <p>
                  Pray for everyone affected. 🙏
                </p>

                <p>
                  Please donate using the link below.
                </p>

                <div
                  style={{
                    color: "#888",
                    fontSize: "11px",
                    marginTop: "18px",
                  }}
                >
                  💙 124K Likes · 🔁 289K Shares · 💬 41K Comments
                </div>
              </div>
            </div>

            <div style={panelStyle}>
              <h2 style={titleStyle}>COMMUNITY COMMENTS</h2>

              <Comment
                name="Sarah J."
                text="This is heartbreaking..."
              />

              <Comment
                name="Aman_07"
                text="I just donated ₹1000."
              />

              <Comment
                name="NewsAlert247"
                text="Why isn't TV covering this?"
              />

              <Comment
                name="Lily"
                text="My family lives nearby. Can someone confirm if they're safe?"
              />
            </div>

            <div style={panelStyle}>
              <h2 style={titleStyle}>MISSION OBJECTIVE</h2>

              <p style={{ lineHeight: 1.8 }}>
                Don't investigate the caption.
              </p>

              <p style={{ lineHeight: 1.8 }}>
                Investigate the{" "}
                <strong style={{ color: "#ffd966" }}>
                  photograph.
                </strong>
              </p>
            </div>

            <div style={panelStyle}>
              <h2 style={titleStyle}>
                INVESTIGATION TOOLS
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(230px, 1fr))",
                  gap: "10px",
                  marginTop: "18px",
                }}
              >
                {CLUES.map((clue) => (
                  <button
                    type="button"
                    key={clue.id}
                    onClick={() => discoverClue(clue)}
                    style={{
                      ...buttonStyle,
                      border:
                        selectedClue === clue.id
                          ? "1px solid #c9a227"
                          : "1px solid rgba(201,162,39,0.25)",
                      background:
                        selectedClue === clue.id
                          ? "rgba(201,162,39,0.12)"
                          : "rgba(201,162,39,0.03)",
                    }}
                  >
                    {investigated.includes(clue.id) ? "✓ " : ""}
                    {clue.title}
                  </button>
                ))}
              </div>
            </div>

            {selectedClue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={panelStyle}
              >
                {(() => {
                  const clue = CLUES.find(
                    (item) => item.id === selectedClue
                  );

                  if (!clue) {
                    return null;
                  }

                  return (
                    <>
                      <div
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.2em",
                          color: "#00e9ff",
                        }}
                      >
                        {clue.category}
                      </div>

                      <h2 style={titleStyle}>
                        {clue.title}
                      </h2>

                      <p style={{ lineHeight: 1.9 }}>
                        {clue.description}
                      </p>

                      <div
                        style={{
                          borderLeft:
                            "3px solid #c9a227",
                          paddingLeft: "14px",
                          color: "#ffd966",
                          marginTop: "18px",
                        }}
                      >
                        NOTEBOOK UPDATED
                        <br />
                        ✓ {clue.finding}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}

            {investigated.length === CLUES.length && (
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background: "#c9a227",
                  color: "#07090f",
                }}
                onClick={() => setPhase("decision")}
              >
                CONTINUE TO FINAL DECISION
              </button>
            )}
          </motion.section>
        )}

        {/* =====================================================
            DECISION
        ===================================================== */}
        {phase === "decision" && (
          <motion.section
            key="decision"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#00e9ff",
                }}
              >
                FINAL DECISION
              </div>

              <h1 style={{ ...titleStyle, fontSize: "34px" }}>
                WHAT SHOULD YOU DO?
              </h1>

              <DecisionOption
                selected={selectedVerdict === 0}
                onClick={() => setSelectedVerdict(0)}
                text="Share the post to warn everyone."
              />

              <DecisionOption
                selected={selectedVerdict === 1}
                onClick={() => setSelectedVerdict(1)}
                text="Donate immediately."
              />

              <DecisionOption
                selected={selectedVerdict === 2}
                onClick={() => setSelectedVerdict(2)}
                text="Verify the disaster through trusted news and official emergency agencies before sharing or donating."
              />

              <DecisionOption
                selected={selectedVerdict === 3}
                onClick={() => setSelectedVerdict(3)}
                text="Ignore every disaster photo online."
              />

              <button
                type="button"
                disabled={selectedVerdict === null}
                onClick={submitVerdict}
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background:
                    selectedVerdict === 2
                      ? "#c9a227"
                      : "rgba(201,162,39,0.08)",
                  color:
                    selectedVerdict === 2
                      ? "#07090f"
                      : "#777",
                  cursor:
                    selectedVerdict === null
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                SUBMIT FINAL DECISION
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================================
            DEBRIEF
        ===================================================== */}
        {phase === "debrief" && (
          <motion.section
            key="debrief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  color: "#00e9ff",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                }}
              >
                MISSION DEBRIEF
              </div>

              <h1 style={{ ...titleStyle, fontSize: "36px" }}>
                CASE SOLVED
              </h1>

              <p style={{ lineHeight: 1.9 }}>
                Excellent work, Detective.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                This mission teaches one of the most common
                misinformation techniques:
              </p>

              <h2 style={{ ...titleStyle, fontSize: "24px" }}>
                USING A REAL IMAGE IN THE WRONG CONTEXT
              </h2>

              <p style={{ lineHeight: 1.9 }}>
                The photograph itself wasn't fake.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                The story attached to it was.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                Old images are often reshared during new disasters
                because they trigger strong emotions and encourage
                people to react quickly.
              </p>

              <p style={{ lineHeight: 1.9 }}>
                Before sharing disaster photos...
              </p>

              <p
                style={{
                  color: "#ffd966",
                  fontFamily: "Special Elite, serif",
                  fontSize: "22px",
                }}
              >
                "When was this image actually taken?"
              </p>

              <button
                type="button"
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background: "#c9a227",
                  color: "#07090f",
                }}
                onClick={() => setPhase("quiz")}
              >
                CONTINUE TO QUIZ
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================================
            QUIZ
        ===================================================== */}
        {phase === "quiz" && (
          <motion.section
            key={`quiz-${quizIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div style={panelStyle}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "#00e9ff",
                }}
              >
                QUICK QUIZ · {quizIndex + 1}/
                {QUIZ_ANSWERS.length}
              </div>

              <h1 style={{ ...titleStyle, fontSize: "30px" }}>
                {QUIZ_ANSWERS[quizIndex].question}
              </h1>

              {QUIZ_ANSWERS[quizIndex].options.map(
                (option, index) => (
                  <DecisionOption
                    key={option}
                    selected={quizAnswer === index}
                    onClick={() => answerQuiz(index)}
                    text={option}
                  />
                )
              )}

              {quizAnswer !== null && (
                <div
                  style={{
                    marginTop: "18px",
                    padding: "14px",
                    border:
                      quizAnswer ===
                      QUIZ_ANSWERS[quizIndex].correct
                        ? "1px solid rgba(0,233,255,0.4)"
                        : "1px solid rgba(255,100,70,0.4)",
                    color:
                      quizAnswer ===
                      QUIZ_ANSWERS[quizIndex].correct
                        ? "#00e9ff"
                        : "#ff9b7a",
                  }}
                >
                  {quizAnswer ===
                  QUIZ_ANSWERS[quizIndex].correct
                    ? "✓ CORRECT"
                    : "✕ NOT QUITE — REVIEW THE EVIDENCE."}
                </div>
              )}

              <button
                type="button"
                disabled={quizAnswer === null}
                onClick={nextQuizQuestion}
                style={{
                  ...buttonStyle,
                  textAlign: "center",
                  background:
                    quizAnswer === null
                      ? "rgba(201,162,39,0.05)"
                      : "#c9a227",
                  color:
                    quizAnswer === null
                      ? "#666"
                      : "#07090f",
                }}
              >
                {quizIndex === QUIZ_ANSWERS.length - 1
                  ? "FINISH QUIZ"
                  : "NEXT QUESTION"}
              </button>
            </div>
          </motion.section>
        )}

        {/* =====================================================
            REWARDS
        ===================================================== */}
        {phase === "rewards" && (
          <motion.section
            key="rewards"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ maxWidth: 900, margin: "0 auto" }}
          >
            <div
              style={{
                ...panelStyle,
                textAlign: "center",
                padding: "50px 30px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  color: "#00e9ff",
                }}
              >
                🎉 MISSION COMPLETE
              </div>

              <h1
                style={{
                  ...titleStyle,
                  fontSize: "46px",
                  marginTop: "18px",
                }}
              >
                YESTERDAY'S DISASTER
              </h1>

              <div
                style={{
                  fontSize: "28px",
                  color: "#ffd966",
                  marginTop: "28px",
                }}
              >
                +150 XP
              </div>

              <div
                style={{
                  fontSize: "20px",
                  marginTop: "18px",
                }}
              >
                🏅 Context Detective
              </div>

              <div
                style={{
                  color: "#888",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  marginTop: "18px",
                }}
              >
                LEVEL PROGRESS · 26%
              </div>

              <button
                type="button"
                style={{
                  ...buttonStyle,
                  width: "auto",
                  minWidth: "250px",
                  textAlign: "center",
                  background: "#c9a227",
                  color: "#07090f",
                  margin: "30px auto 0",
                }}
                onClick={() => setPhase("briefing")}
              >
                RETURN TO CASE FILE
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(201,162,39,0.2)",
        padding: "14px",
      }}
    >
      <div
        style={{
          fontSize: "9px",
          color: "#777",
          letterSpacing: "0.15em",
          marginBottom: "7px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#ffd966",
          fontSize: "11px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Comment({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  return (
    <div
      style={{
        borderBottom:
          "1px solid rgba(201,162,39,0.12)",
        padding: "13px 0",
      }}
    >
      <strong style={{ color: "#ffd966" }}>
        {name}
      </strong>

      <div
        style={{
          marginTop: "5px",
          lineHeight: 1.6,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function DecisionOption({
  selected,
  onClick,
  text,
}: {
  selected: boolean;
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "block",
        textAlign: "left",
        padding: "15px 18px",
        marginTop: "10px",
        border: selected
          ? "1px solid #c9a227"
          : "1px solid rgba(201,162,39,0.2)",
        background: selected
          ? "rgba(201,162,39,0.12)"
          : "rgba(201,162,39,0.03)",
        color: selected
          ? "#ffd966"
          : "#c9b882",
        fontFamily: "Courier Prime, monospace",
        lineHeight: 1.6,
        cursor: "pointer",
      }}
    >
      {selected ? "◉ " : "○ "}
      {text}
    </button>
  );
}