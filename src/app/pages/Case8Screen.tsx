import { useState } from "react";


interface Case8ScreenProps {
  onVerdictFinal: (
    verdict: any,
    investigated: string[]
  ) => void;
}


type ToolId =
  | "feed"
  | "watch"
  | "search"
  | "algorithm"
  | "missing"
  | "bias";


type Finding = {
  id: string;
  text: string;
};


type Decision = {
  id: string;
  text: string;
  correct: boolean;
};


type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
};


const TOOLS: {
  id: ToolId;
  label: string;
}[] = [
  {
    id: "feed",
    label: "RECOMMENDATION TIMELINE",
  },
  {
    id: "watch",
    label: "WATCH HISTORY",
  },
  {
    id: "search",
    label: "SEARCH HISTORY",
  },
  {
    id: "algorithm",
    label: "PLATFORM ALGORITHM VIEWER",
  },
  {
    id: "missing",
    label: "FACT COMPARISON TOOL",
  },
  {
    id: "bias",
    label: "CONFIRMATION BIAS TEST",
  },
];


const FINDINGS: Finding[] = [
  {
    id: "recommendations",
    text:
      "Recommendation algorithms personalize content.",
  },
  {
    id: "watch-history",
    text:
      "Previous behavior influences recommendations.",
  },
  {
    id: "search-history",
    text:
      "Search behavior reinforces existing interests.",
  },
  {
    id: "algorithm-engagement",
    text:
      "Recommendations prioritize engagement rather than accuracy.",
  },
  {
    id: "missing-perspectives",
    text:
      "Balanced viewpoints can become less visible.",
  },
  {
    id: "confirmation-bias",
    text:
      "Confirmation bias reinforces existing beliefs.",
  },
];


const DECISIONS: Decision[] = [
  {
    id: "fake-news",
    text:
      "The platform is intentionally creating fake news.",
    correct: false,
  },
  {
    id: "one-opinion",
    text:
      "The internet should only show one opinion.",
    correct: false,
  },
  {
    id: "echo-chamber",
    text:
      "Algorithms and our own choices can create echo chambers where we mostly see information we already agree with.",
    correct: true,
  },
  {
    id: "every-recommendation",
    text:
      "Every recommendation online is false.",
    correct: false,
  },
];


const QUIZ: QuizQuestion[] = [
  {
    question:
      "What is an echo chamber?",
    options: [
      "A room with loud sounds.",
      "An online environment where people mostly encounter information that reinforces their existing beliefs.",
      "A fake news website.",
      "A messaging app.",
    ],
    answer: 1,
  },
  {
    question:
      "Why do algorithms often recommend similar content?",
    options: [
      "Because they predict what users are most likely to engage with.",
      "Because all information is identical.",
      "Because they know the truth.",
      "To confuse users.",
    ],
    answer: 0,
  },
  {
    question:
      "Which habit helps reduce confirmation bias?",
    options: [
      "Reading only sources you agree with.",
      "Exploring multiple credible perspectives before reaching a conclusion.",
      "Ignoring expert opinions.",
      "Sharing every trending post.",
    ],
    answer: 1,
  },
];


export default function Case8Screen({
  onVerdictFinal,
}: Case8ScreenProps) {

  const [activeTool, setActiveTool] =
    useState<ToolId | null>(null);

  const [discovered, setDiscovered] =
    useState<string[]>([]);

  const [selectedDecision, setSelectedDecision] =
    useState<string | null>(null);

  const [completed, setCompleted] =
    useState(false);

  const [quizIndex, setQuizIndex] =
    useState(0);

  const [quizAnswer, setQuizAnswer] =
    useState<number | null>(null);

  const [quizFinished, setQuizFinished] =
    useState(false);


  const currentQuiz =
    QUIZ[quizIndex];


  const addFinding = (
    findingId: string
  ) => {

    setDiscovered(
      (previous) => {

        if (
          previous.includes(
            findingId
          )
        ) {
          return previous;
        }

        return [
          ...previous,
          findingId,
        ];
      }
    );
  };


  const submitDecision = () => {

    if (
      selectedDecision ===
      null
    ) {
      return;
    }

    const selected =
      DECISIONS.find(
        (item) =>
          item.id ===
          selectedDecision
      );

    if (
      !selected ||
      !selected.correct
    ) {
      return;
    }

    setCompleted(true);

    onVerdictFinal(
      "REJECT",
      discovered
    );
  };


  const answerQuiz = (
    index: number
  ) => {
    setQuizAnswer(index);
  };


  const nextQuiz = () => {

    if (
      quizIndex <
      QUIZ.length - 1
    ) {

      setQuizIndex(
        (previous) =>
          previous + 1
      );

      setQuizAnswer(
        null
      );

      return;
    }

    setQuizFinished(
      true
    );
  };


  return (
    <div
      className="
        w-full
        h-full
        overflow-y-auto
        px-6
        py-8
      "
      style={{
        background:
          "radial-gradient(circle at top, #111827 0%, #07090f 55%)",
        color:
          "#c9b882",
      }}
    >

      <div
        className="
          max-w-6xl
          mx-auto
          space-y-8
          pb-12
        "
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section
          className="
            border
            p-6
          "
          style={{
            borderColor:
              "rgba(201,162,39,0.35)",
            backgroundColor:
              "rgba(3,5,12,0.8)",
          }}
        >

          <div
            style={{
              color:
                "#00e9ff",
              fontSize:
                "10px",
              letterSpacing:
                "0.25em",
            }}
          >
            CASE FILE 008
          </div>


          <h1
            style={{
              fontFamily:
                "Special Elite, serif",
              color:
                "#ffd966",
              fontSize:
                "42px",
              marginTop:
                "8px",
            }}
          >
            THE INVISIBLE BUBBLE
          </h1>


          <div
            className="
              flex
              flex-wrap
              gap-3
              mt-4
            "
          >

            <span className="border px-3 py-1">
              ⭐⭐⭐⭐⭐⭐ EXPERT
            </span>

            <span className="border px-3 py-1">
              +450 XP
            </span>

            <span className="border px-3 py-1">
              🫧 PERSPECTIVE SEEKER
            </span>

          </div>


          <p className="mt-5 max-w-3xl">
            How algorithms, confirmation
            bias, and echo chambers shape what
            we believe online.
          </p>

        </section>


        {/* =====================================================
            TRANSITION
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            TRANSITION FROM CASE 7
          </SectionTitle>


          <div className="mt-5 space-y-4">

            <p>
              For the first time...
            </p>

            <p>
              The room is completely silent.
            </p>

            <p>
              No alarms. No breaking news.
              No emergency alerts.
            </p>

            <p>
              Just hundreds of social media
              posts floating across giant
              holographic screens.
            </p>

            <Dialogue
              speaker="COMMANDER MIRA"
              text="Detective... Tell me what you see."
            />

            <p>
              You examine the feed.
            </p>

            <p>
              Every post agrees with each
              other.
            </p>

            <p>
              Every comment supports the same
              opinion.
            </p>

            <p>
              Every recommended video repeats
              the same message.
            </p>

            <p>
              Everything feels... strangely
              identical.
            </p>

            <Dialogue
              speaker="LEO"
              text="Nothing changes. The same opinions, headlines, and videos keep appearing."
            />

            <p>
              Another investigator logs into
              a different account.
            </p>

            <p>
              Their feed is completely
              different.
            </p>

            <p>
              Same topic. Opposite opinions.
              Completely different recommendations.
            </p>

            <Dialogue
              speaker="COMMANDER MIRA"
              text="Neither person searched for misinformation. Yet both believe they're seeing the complete truth."
            />

            <Dialogue
              speaker="COMMANDER MIRA"
              text="Today's enemy isn't a fake post. It's a world where you stop seeing anything different."
            />

            <div
              className="
                border
                p-4
                mt-5
              "
              style={{
                borderColor:
                  "#c9a227",
                color:
                  "#ffd966",
              }}
            >
              🔔 CASE FILE 008 RECEIVED
            </div>

          </div>

        </section>


        {/* =====================================================
            MISSION BRIEFING
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            MISSION BRIEFING
          </SectionTitle>


          <h2
            className="mt-3"
            style={{
              fontFamily:
                "Special Elite, serif",
              color:
                "#ffd966",
              fontSize:
                "27px",
            }}
          >
            THE INVISIBLE BUBBLE
          </h2>


          <div
            className="
              grid
              md:grid-cols-3
              gap-4
              mt-5
            "
          >

            <InfoBox
              label="PRIORITY"
              value="🟠 HIGH"
            />

            <InfoBox
              label="THREAT LEVEL"
              value="GROWING"
            />

            <InfoBox
              label="ESTIMATED REACH"
              value="ENTIRE PLATFORM"
            />

          </div>


          <div
            className="
              mt-6
              space-y-3
            "
          >

            <p>
              Citizens are becoming increasingly
              divided over a proposed city project.
            </p>

            <p>
              Nobody is checking facts anymore.
            </p>

            <p>
              Everyone believes they're completely
              right.
            </p>

            <p>
              Each group is only seeing information
              that supports its own beliefs.
            </p>

          </div>

        </section>


        {/* =====================================================
            USER FEEDS
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            EVIDENCE 01 — USER FEED COMPARISON
          </SectionTitle>


          <div
            className="
              grid
              md:grid-cols-2
              gap-5
              mt-5
            "
          >

            <FeedCard
              title="USER A"
              posts={[
                "Project Will Save Thousands of Jobs",
                "Experts Strongly Support Development",
                "Five Reasons Critics Are Wrong",
                "Citizens Celebrate New Project",
              ]}
            />

            <FeedCard
              title="USER B"
              posts={[
                "Project Will Destroy Wildlife",
                "Experts Warn of Environmental Disaster",
                "Citizens Protest New Project",
                "Development Must Be Stopped",
              ]}
            />

          </div>


          <div
            className="
              mt-5
              border-l-2
              pl-4
            "
            style={{
              borderColor:
                "#ffd966",
            }}
          >
            Both users believe they're seeing
            the full picture.
          </div>

        </section>


        {/* =====================================================
            COMMUNITY COMMENTS
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            COMMUNITY COMMENTS
          </SectionTitle>


          <div
            className="
              grid
              md:grid-cols-2
              gap-4
              mt-5
            "
          >

            <CommentCard
              user="USER A"
              text="Everyone knows this project is amazing."
            />

            <CommentCard
              user="USER B"
              text="Anyone supporting this clearly hasn't done research."
            />

            <CommentCard
              user="USER A"
              text="People who disagree are just spreading fear."
            />

            <CommentCard
              user="USER B"
              text="They're all brainwashed."
            />

          </div>


          <Dialogue
            speaker="LEO"
            text="Interesting... Neither side thinks they're trapped."
          />

        </section>


        {/* =====================================================
            OBJECTIVE
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            MISSION OBJECTIVE
          </SectionTitle>


          <h2
            className="mt-4"
            style={{
              fontFamily:
                "Special Elite, serif",
              color:
                "#ffd966",
              fontSize:
                "25px",
            }}
          >
            Determine why the two users see
            completely different versions of reality.
          </h2>

        </section>


        {/* =====================================================
            TOOLS
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            INVESTIGATION TOOLS
          </SectionTitle>


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              gap-3
              mt-5
            "
          >

            {TOOLS.map(
              (tool) => (

                <button
                  key={
                    tool.id
                  }
                  type="button"
                  onClick={() =>
                    setActiveTool(
                      tool.id
                    )
                  }
                  className="
                    border
                    p-4
                    text-left
                  "
                  style={{
                    borderColor:
                      activeTool ===
                      tool.id
                        ? "#c9a227"
                        : "rgba(201,162,39,0.2)",

                    background:
                      activeTool ===
                      tool.id
                        ? "rgba(201,162,39,0.08)"
                        : "transparent",

                    color:
                      "#c9b882",

                    cursor:
                      "pointer",
                  }}
                >
                  {tool.label}
                </button>

              )
            )}

          </div>

        </section>


        {/* =====================================================
            FEED TOOL
        ===================================================== */}

        {activeTool ===
          "feed" && (

          <EvidencePanel
            title="RECOMMENDATION TIMELINE"
          >

            <p>
              User A repeatedly receives
              project-supporting content.
            </p>

            <p>
              User B repeatedly receives
              project-critical content.
            </p>

            <FindingButton
              text={
                FINDINGS[0].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[0].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            WATCH TOOL
        ===================================================== */}

        {activeTool ===
          "watch" && (

          <EvidencePanel
            title="WATCH HISTORY"
          >

            <div
              className="
                grid
                md:grid-cols-2
                gap-4
              "
            >

              <HistoryCard
                title="USER A"
                items={[
                  "Watched 10 videos supporting the project.",
                  "Ignored opposing viewpoints.",
                ]}
              />

              <HistoryCard
                title="USER B"
                items={[
                  "Watched 12 videos criticizing the project.",
                  "Skipped supporting arguments.",
                ]}
              />

            </div>


            <Dialogue
              speaker="COMMANDER MIRA"
              text="Algorithms learn from what we watch."
            />


            <FindingButton
              text={
                FINDINGS[1].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[1].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            SEARCH TOOL
        ===================================================== */}

        {activeTool ===
          "search" && (

          <EvidencePanel
            title="SEARCH HISTORY"
          >

            <div
              className="
                grid
                md:grid-cols-2
                gap-4
              "
            >

              <HistoryCard
                title="USER A"
                items={[
                  "Benefits of Development",
                ]}
              />

              <HistoryCard
                title="USER B"
                items={[
                  "Dangers of Development",
                ]}
              />

            </div>


            <FindingButton
              text={
                FINDINGS[2].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[2].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            ALGORITHM TOOL
        ===================================================== */}

        {activeTool ===
          "algorithm" && (

          <EvidencePanel
            title="PLATFORM ALGORITHM VIEWER"
          >

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-5
                gap-3
              "
            >

              {[
                "SIMILARITY",
                "WATCH TIME",
                "ENGAGEMENT",
                "PREVIOUS LIKES",
                "PREVIOUS SHARES",
              ].map(
                (factor) => (

                  <div
                    key={
                      factor
                    }
                    className="
                      border
                      p-3
                      text-center
                    "
                  >
                    {factor}
                  </div>

                )
              )}

            </div>


            <Dialogue
              speaker="LEO"
              text="The algorithm isn't deciding what's true. It's deciding what you'll probably click."
            />


            <FindingButton
              text={
                FINDINGS[3].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[3].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            MISSING INFORMATION TOOL
        ===================================================== */}

        {activeTool ===
          "missing" && (

          <EvidencePanel
            title="FACT COMPARISON TOOL"
          >

            <p>
              Several balanced reports never
              appeared for either user.
            </p>

            <p>
              The two feeds showed mostly
              opposing extremes.
            </p>


            <Dialogue
              speaker="COMMANDER MIRA"
              text="The truth often lives between two extremes."
            />


            <FindingButton
              text={
                FINDINGS[4].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[4].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            BIAS TOOL
        ===================================================== */}

        {activeTool ===
          "bias" && (

          <EvidencePanel
            title="CONFIRMATION BIAS TEST"
          >

            <p>
              Four headlines appear on screen.
            </p>

            <p>
              The player naturally chooses the
              headline matching previous choices.
            </p>


            <div
              className="
                grid
                md:grid-cols-2
                gap-3
                mt-5
              "
            >

              {[
                "Project Will Create Thousands of Jobs",
                "Project Will Destroy Wildlife",
                "Experts Debate Project Impact",
                "Citizens Demand More Information",
              ].map(
                (headline) => (

                  <button
                    key={
                      headline
                    }
                    type="button"
                    className="
                      border
                      p-4
                      text-left
                    "
                    onClick={() =>
                      addFinding(
                        FINDINGS[5].id
                      )
                    }
                  >
                    {headline}
                  </button>

                )
              )}

            </div>


            <div
              className="
                mt-5
                border
                p-4
              "
              style={{
                color:
                  "#ffd966",
              }}
            >
              "Caught you."
            </div>


            <FindingButton
              text={
                FINDINGS[5].text
              }
              onClick={() =>
                addFinding(
                  FINDINGS[5].id
                )
              }
            />

          </EvidencePanel>

        )}


        {/* =====================================================
            NOTEBOOK
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            DETECTIVE NOTEBOOK
          </SectionTitle>


          <div
            className="
              mt-5
              space-y-3
            "
          >

            {FINDINGS.map(
              (finding) => {

                const found =
                  discovered.includes(
                    finding.id
                  );

                return (
                  <div
                    key={
                      finding.id
                    }
                    className="
                      flex
                      gap-3
                    "
                    style={{
                      opacity:
                        found
                          ? 1
                          : 0.4,
                    }}
                  >

                    <span>
                      {found
                        ? "✔"
                        : "○"}
                    </span>

                    <span>
                      {finding.text}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* =====================================================
            FINAL DECISION
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            FINAL DECISION
          </SectionTitle>


          <h2
            className="mt-5"
            style={{
              fontFamily:
                "Special Elite, serif",
              color:
                "#ffd966",
              fontSize:
                "25px",
            }}
          >
            What is the biggest problem?
          </h2>


          <div
            className="
              mt-5
              space-y-3
            "
          >

            {DECISIONS.map(
              (option) => {

                const selected =
                  selectedDecision ===
                  option.id;

                return (
                  <button
                    key={
                      option.id
                    }
                    type="button"
                    onClick={() =>
                      setSelectedDecision(
                        option.id
                      )
                    }
                    className="
                      w-full
                      border
                      p-4
                      text-left
                    "
                    style={{
                      borderColor:
                        selected
                          ? "#c9a227"
                          : "rgba(201,162,39,0.2)",

                      background:
                        selected
                          ? "rgba(201,162,39,0.1)"
                          : "transparent",

                      color:
                        "#c9b882",

                      cursor:
                        "pointer",
                    }}
                  >
                    {option.text}
                  </button>
                );
              }
            )}

          </div>


          <button
            type="button"
            disabled={
              selectedDecision ===
              null
            }
            onClick={
              submitDecision
            }
            className="
              mt-6
              border
              px-8
              py-3
            "
            style={{
              borderColor:
                "#c9a227",

              color:
                "#ffd966",

              background:
                "rgba(201,162,39,0.08)",

              cursor:
                selectedDecision ===
                null
                  ? "not-allowed"
                  : "pointer",

              opacity:
                selectedDecision ===
                null
                  ? 0.4
                  : 1,
            }}
          >
            SUBMIT FINAL DECISION
          </button>


          {completed && (

            <div
              className="
                mt-5
                border
                p-5
              "
              style={{
                borderColor:
                  "#00e9ff",
              }}
            >

              <strong>
                INVESTIGATION COMPLETE
              </strong>

              <p className="mt-3">
                Algorithms and our own choices
                can create echo chambers where
                we mostly see information we
                already agree with.
              </p>

            </div>

          )}

        </section>


        {/* =====================================================
            WHAT YOU LEARNED
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            WHAT YOU LEARNED
          </SectionTitle>


          <div
            className="
              mt-5
              space-y-3
            "
          >

            {[
              "Read information from multiple trustworthy sources.",
              "Don't rely on one platform alone.",
              "Challenge your own assumptions.",
              "Understand that recommendation algorithms prioritize engagement.",
              "Be willing to explore viewpoints different from your own before forming conclusions.",
            ].map(
              (learning) => (

                <div
                  key={
                    learning
                  }
                  className="
                    flex
                    gap-3
                  "
                >

                  <span>
                    ✓
                  </span>

                  <span>
                    {learning}
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* =====================================================
            QUICK QUIZ
        ===================================================== */}

        <section className="border p-6">

          <SectionTitle>
            QUICK QUIZ
          </SectionTitle>


          {!quizFinished && (

            <div className="mt-5">

              <div
                style={{
                  color:
                    "#00e9ff",
                  fontSize:
                    "10px",
                  letterSpacing:
                    "0.15em",
                }}
              >
                QUESTION{" "}
                {quizIndex + 1}
                {" / "}
                {QUIZ.length}
              </div>


              <h3
                className="mt-4"
                style={{
                  fontFamily:
                    "Special Elite, serif",
                  fontSize:
                    "22px",
                  color:
                    "#ffd966",
                }}
              >
                {currentQuiz.question}
              </h3>


              <div
                className="
                  mt-5
                  space-y-3
                "
              >

                {currentQuiz.options.map(
                  (
                    option,
                    index
                  ) => (

                    <button
                      key={
                        option
                      }
                      type="button"
                      onClick={() =>
                        answerQuiz(
                          index
                        )
                      }
                      className="
                        w-full
                        border
                        p-3
                        text-left
                      "
                      style={{
                        borderColor:
                          quizAnswer ===
                          index
                            ? "#c9a227"
                            : "rgba(201,162,39,0.2)",

                        color:
                          "#c9b882",

                        cursor:
                          "pointer",
                      }}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                      .{" "}
                      {option}
                    </button>

                  )
                )}

              </div>


              {quizAnswer !==
                null && (

                <div className="mt-5">

                  <div
                    style={{
                      color:
                        quizAnswer ===
                        currentQuiz.answer
                          ? "#00e9ff"
                          : "#ff7777",
                    }}
                  >
                    {quizAnswer ===
                    currentQuiz.answer
                      ? "✓ CORRECT"
                      : "✕ NOT QUITE — REVIEW THE EVIDENCE"}
                  </div>


                  <button
                    type="button"
                    className="
                      mt-4
                      border
                      px-6
                      py-3
                    "
                    onClick={
                      nextQuiz
                    }
                  >
                    {quizIndex <
                    QUIZ.length - 1
                      ? "NEXT QUESTION"
                      : "FINISH QUIZ"}
                  </button>

                </div>

              )}

            </div>

          )}


          {quizFinished && (

            <div
              className="
                mt-5
                border
                p-5
              "
            >

              <h3
                style={{
                  color:
                    "#ffd966",
                }}
              >
                QUIZ COMPLETE
              </h3>

              <p className="mt-3">
                Perspective matters.
                Always verify beyond the
                information your feed gives you.
              </p>

            </div>

          )}

        </section>


        {/* =====================================================
            REWARD
        ===================================================== */}

        {completed && (

          <section
            className="
              border
              p-6
            "
            style={{
              borderColor:
                "#c9a227",
            }}
          >

            <div
              style={{
                color:
                  "#00e9ff",
                letterSpacing:
                  "0.2em",
              }}
            >
              MISSION COMPLETE
            </div>


            <h2
              className="mt-3"
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize:
                  "30px",
                color:
                  "#ffd966",
              }}
            >
              +450 XP
            </h2>


            <p className="mt-3">
              🫧 Badge Unlocked:
              {" "}
              <strong>
                Perspective Seeker
              </strong>
            </p>

          </section>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   SUPPORT COMPONENTS
========================================================= */

function SectionTitle({
  children,
}: {
  children: string;
}) {
  return (
    <div
      style={{
        color:
          "#00e9ff",
        fontSize:
          "10px",
        letterSpacing:
          "0.2em",
      }}
    >
      {children}
    </div>
  );
}


function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border p-4">

      <div
        style={{
          fontSize:
            "9px",
          color:
            "#00e9ff",
          letterSpacing:
            "0.15em",
        }}
      >
        {label}
      </div>


      <div
        className="mt-2"
        style={{
          color:
            "#ffd966",
        }}
      >
        {value}
      </div>

    </div>
  );
}


function FeedCard({
  title,
  posts,
}: {
  title: string;
  posts: string[];
}) {
  return (
    <div
      className="
        border
        p-5
      "
      style={{
        borderColor:
          "rgba(201,162,39,0.2)",
      }}
    >

      <h3
        style={{
          color:
            "#ffd966",
          fontFamily:
            "Special Elite, serif",
        }}
      >
        {title}
      </h3>


      <div
        className="
          mt-4
          space-y-3
        "
      >

        {posts.map(
          (post) => (

            <div
              key={
                post
              }
              className="
                border
                p-3
              "
            >
              {post}
            </div>

          )
        )}

      </div>

    </div>
  );
}


function CommentCard({
  user,
  text,
}: {
  user: string;
  text: string;
}) {
  return (
    <div className="border p-4">

      <strong
        style={{
          color:
            "#00e9ff",
        }}
      >
        {user}
      </strong>


      <p className="mt-2">
        {text}
      </p>

    </div>
  );
}


function HistoryCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border p-4">

      <strong
        style={{
          color:
            "#ffd966",
        }}
      >
        {title}
      </strong>


      <div
        className="
          mt-3
          space-y-2
        "
      >

        {items.map(
          (item) => (

            <div
              key={
                item
              }
            >
              • {item}
            </div>

          )
        )}

      </div>

    </div>
  );
}


function EvidencePanel({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <section
      className="
        border
        p-6
      "
      style={{
        borderColor:
          "rgba(0,233,255,0.25)",
      }}
    >

      <SectionTitle>
        {title}
      </SectionTitle>


      <div
        className="
          mt-5
          space-y-3
        "
      >
        {children}
      </div>

    </section>
  );
}


function FindingButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="
        mt-5
        border
        p-4
        text-left
        w-full
      "
      style={{
        borderColor:
          "rgba(0,233,255,0.3)",
        color:
          "#00e9ff",
        cursor:
          "pointer",
      }}
    >

      ✔ ADD TO NOTEBOOK

      <span
        className="
          block
          mt-1
        "
        style={{
          color:
            "#c9b882",
        }}
      >
        {text}
      </span>

    </button>
  );
}


function Dialogue({
  speaker,
  text,
}: {
  speaker: string;
  text: string;
}) {
  return (
    <div
      className="
        border-l-2
        pl-4
        mt-5
      "
      style={{
        borderColor:
          "#c9a227",
      }}
    >

      <div
        style={{
          color:
            "#00e9ff",
          fontSize:
            "9px",
          letterSpacing:
            "0.14em",
          marginBottom:
            "5px",
        }}
      >
        {speaker}
      </div>


      <p
        style={{
          lineHeight:
            1.7,
        }}
      >
        "{text}"
      </p>

    </div>
  );
}