import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

import type {
  Verdict,
} from "../types";


interface Case6ScreenProps {
  onVerdictFinal: (
    verdict: NonNullable<Verdict>,
    investigated: string[]
  ) => void;
}


type Section =
  | "briefing"
  | "evidence"
  | "clue"
  | "decision"
  | "debrief"
  | "quiz"
  | "rewards";


interface Clue {
  id: string;
  title: string;
  description: string;
  finding: string;
}


const CLUES: Clue[] = [
  {
    id: "government-report",
    title: "ORIGINAL DATASET",
    description:
      "Brookhaven City's official crime report shows 10 reported incidents in 2024 and 20 reported incidents in 2025.",
    finding:
      "Crime increased from 10 to 20 reported incidents.",
  },
  {
    id: "graph-inspection",
    title: "GRAPH INSPECTION",
    description:
      "The viral graph starts its Y-axis at 9 instead of 0, making the visual difference between 10 and 20 appear much larger.",
    finding:
      "The graph uses a truncated Y-axis.",
  },
  {
    id: "population-data",
    title: "POPULATION DATA",
    description:
      "Brookhaven's population increased from 1,200 people in 2024 to 2,600 people in 2025. Crime per 1,000 residents changed from 8.3 to 7.7.",
    finding:
      "The total number increased, but the crime rate per person decreased.",
  },
  {
    id: "fact-check",
    title: "FACT CHECK ARCHIVE",
    description:
      "Independent fact-checkers found that the graph uses real numbers but removes important context and exaggerates the visual difference.",
    finding:
      "The data is technically real but presented in a misleading way.",
  },
  {
    id: "graph-editor",
    title: "GRAPH EDITOR",
    description:
      "When the Y-axis is reset to begin at zero, the dramatic visual difference almost disappears.",
    finding:
      "The same data can create a very different impression depending on presentation.",
  },
];


export function Case6Screen({
  onVerdictFinal,
}: Case6ScreenProps) {

  const [
    section,
    setSection,
  ] = useState<Section>("briefing");

  const [
    selectedClue,
    setSelectedClue,
  ] = useState<Clue | null>(null);

  const [
    investigated,
    setInvestigated,
  ] = useState<string[]>([]);

  const [
    decision,
    setDecision,
  ] = useState<string | null>(null);

  const [
    quizAnswers,
    setQuizAnswers,
  ] = useState<Record<number, string>>({});


  const investigateClue = (
    clue: Clue
  ) => {

    setSelectedClue(
      clue
    );

    setInvestigated(
      (previous) =>
        previous.includes(clue.id)
          ? previous
          : [
              ...previous,
              clue.id,
            ]
    );

    setSection(
      "clue"
    );
  };


  const submitDecision = () => {

    if (
      decision === null
    ) {
      return;
    }

    const verdict =
      "verify" as NonNullable<Verdict>;

    onVerdictFinal(
      verdict,
      investigated
    );
  };


  const quizCorrect =
    quizAnswers[1] === "B" &&
    quizAnswers[2] === "B" &&
    quizAnswers[3] === "A";


  return (
    <div
      className="
        h-full
        w-full
        overflow-y-auto
        px-4
        py-6
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

      <div
        className="
          mx-auto
          w-full
          max-w-6xl
        "
      >

        {/* =================================================
            TOP CASE HEADER
        ================================================= */}

        <div
          className="
            mb-6
            border
            p-5
          "
          style={{
            borderColor:
              "rgba(201,162,39,0.35)",

            background:
              "rgba(10,13,22,0.92)",
          }}
        >

          <div
            style={{
              fontSize:
                "10px",

              letterSpacing:
                "0.25em",

              color:
                "#00e9ff",

              marginBottom:
                "8px",
            }}
          >
            DIGITAL GUARDIANS // CASE FILE 006
          </div>

          <h1
            style={{
              fontFamily:
                "Special Elite, serif",

              fontSize:
                "clamp(28px, 5vw, 48px)",

              color:
                "#ffd966",

              letterSpacing:
                "0.08em",

              margin:
                0,
            }}
          >
            THE TWISTED NUMBERS
          </h1>

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-4
            "
            style={{
              fontSize:
                "10px",

              letterSpacing:
                "0.14em",
            }}
          >
            <span>
              DIFFICULTY: ⭐⭐⭐⭐⭐
            </span>

            <span>
              XP: +350
            </span>

            <span>
              BADGE: DATA DETECTIVE
            </span>
          </div>

        </div>


        {/* =================================================
            SECTION NAVIGATION
        ================================================= */}

        <div
          className="
            mb-6
            flex
            flex-wrap
            gap-2
          "
        >

          {[
            ["briefing", "BRIEFING"],
            ["evidence", "EVIDENCE"],
            ["decision", "DECISION"],
            ["debrief", "DEBRIEF"],
            ["quiz", "QUIZ"],
            ["rewards", "REWARDS"],
          ].map(
            ([id, label]) => (

              <button
                key={id}
                type="button"
                onClick={() =>
                  setSection(
                    id as Section
                  )
                }
                style={{
                  fontFamily:
                    "Courier Prime, monospace",

                  fontSize:
                    "9px",

                  letterSpacing:
                    "0.15em",

                  padding:
                    "8px 13px",

                  border:
                    `1px solid ${
                      section === id
                        ? "#c9a227"
                        : "rgba(201,162,39,0.25)"
                    }`,

                  backgroundColor:
                    section === id
                      ? "#c9a227"
                      : "transparent",

                  color:
                    section === id
                      ? "#07090f"
                      : "#c9b882",

                  cursor:
                    "pointer",
                }}
              >
                {label}
              </button>

            )
          )}

        </div>


        <AnimatePresence
          mode="wait"
        >

          <motion.div
            key={section}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration:
                0.2,
            }}
          >

            {/* =================================================
                BRIEFING
            ================================================= */}

            {section ===
              "briefing" && (

              <section
                className="
                  border
                  p-6
                "
                style={{
                  borderColor:
                    "rgba(201,162,39,0.3)",
                }}
              >

                <div
                  style={{
                    color:
                      "#00e9ff",

                    fontSize:
                      "10px",

                    letterSpacing:
                      "0.2em",

                    marginBottom:
                      "15px",
                  }}
                >
                  MISSION BRIEFING
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    fontSize:
                      "28px",

                    color:
                      "#ffd966",

                    marginBottom:
                      "20px",
                  }}
                >
                  THE NUMBERS LOOK REAL.
                  <br />
                  THE STORY MIGHT NOT.
                </h2>

                <p>
                  A viral post claims that
                  crime has doubled in
                  Brookhaven City.
                </p>

                <p>
                  Citizens are panicking.
                  Parents are keeping their
                  children indoors.
                  Businesses are closing early.
                </p>

                <p>
                  Local elections are only
                  one week away.
                </p>

                <div
                  className="
                    mt-6
                    border-l-2
                    pl-5
                  "
                  style={{
                    borderColor:
                      "#c9a227",
                  }}
                >

                  <p>
                    <strong>
                      Commander Mira:
                    </strong>
                  </p>

                  <p>
                    "Your mission is to
                    determine whether the
                    graph tells the whole story."
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSection(
                      "evidence"
                    )
                  }
                  className="
                    mt-6
                  "
                  style={{
                    padding:
                      "12px 20px",

                    backgroundColor:
                      "#c9a227",

                    color:
                      "#07090f",

                    border:
                      "none",

                    fontFamily:
                      "Courier Prime, monospace",

                    fontWeight:
                      "bold",

                    cursor:
                      "pointer",
                  }}
                >
                  BEGIN INVESTIGATION →
                </button>

              </section>
            )}


            {/* =================================================
                EVIDENCE
            ================================================= */}

            {section ===
              "evidence" && (

              <section>

                <div
                  className="
                    mb-5
                    border
                    p-6
                  "
                  style={{
                    borderColor:
                      "rgba(201,162,39,0.3)",
                  }}
                >

                  <div
                    style={{
                      color:
                        "#ff6b6b",

                      fontSize:
                        "10px",

                      letterSpacing:
                        "0.2em",

                      marginBottom:
                        "10px",
                    }}
                  >
                    VIRAL SOCIAL MEDIA POST
                  </div>

                  <h2
                    style={{
                      fontFamily:
                        "Special Elite, serif",

                      color:
                        "#ffd966",

                      fontSize:
                        "30px",
                    }}
                  >
                    🚨 CRIME HAS DOUBLED!
                  </h2>

                  <p
                    style={{
                      fontSize:
                        "18px",
                    }}
                  >
                    "Brookhaven is no longer safe."
                  </p>

                  <div
                    className="
                      my-6
                      border
                      p-5
                    "
                    style={{
                      borderColor:
                        "rgba(255,107,107,0.3)",
                    }}
                  >

                    <div
                      style={{
                        fontSize:
                          "12px",

                        marginBottom:
                          "12px",
                      }}
                    >
                      CRIME REPORTS
                    </div>

                    <div
                      className="
                        flex
                        items-end
                        gap-10
                        h-48
                      "
                    >

                      <div
                        className="
                          flex
                          h-full
                          flex-col
                          justify-end
                          items-center
                        "
                      >

                        <div
                          style={{
                            height:
                              "12px",

                            width:
                              "55px",

                            backgroundColor:
                              "#c9a227",
                          }}
                        />

                        <span>
                          2024
                        </span>

                        <small>
                          10
                        </small>

                      </div>


                      <div
                        className="
                          flex
                          h-full
                          flex-col
                          justify-end
                          items-center
                        "
                      >

                        <div
                          style={{
                            height:
                              "145px",

                            width:
                              "55px",

                            backgroundColor:
                              "#ff6b6b",
                          }}
                        />

                        <span>
                          2025
                        </span>

                        <small>
                          20
                        </small>

                      </div>

                    </div>

                  </div>

                  <p>
                    ❤️ 483K Likes
                  </p>

                  <p>
                    🔁 1.1 Million Shares
                  </p>

                  <p>
                    💬 210K Comments
                  </p>

                </div>


                <div
                  className="
                    grid
                    gap-4
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
                >

                  {CLUES.map(
                    (clue) => (

                      <button
                        key={
                          clue.id
                        }
                        type="button"
                        onClick={() =>
                          investigateClue(
                            clue
                          )
                        }
                        className="
                          text-left
                          border
                          p-5
                        "
                        style={{
                          borderColor:
                            investigated.includes(
                              clue.id
                            )
                              ? "#c9a227"
                              : "rgba(201,162,39,0.25)",

                          backgroundColor:
                            "rgba(10,13,22,0.9)",

                          color:
                            "#c9b882",

                          cursor:
                            "pointer",
                        }}
                      >

                        <div
                          style={{
                            color:
                              investigated.includes(
                                clue.id
                              )
                                ? "#00e9ff"
                                : "#c9a227",

                            fontSize:
                              "9px",

                            letterSpacing:
                              "0.18em",

                            marginBottom:
                              "12px",
                          }}
                        >
                          {investigated.includes(
                            clue.id
                          )
                            ? "✓ INVESTIGATED"
                            : "INVESTIGATE"}
                        </div>

                        <h3
                          style={{
                            fontFamily:
                              "Special Elite, serif",

                            color:
                              "#ffd966",

                            fontSize:
                              "18px",

                            marginBottom:
                              "10px",
                          }}
                        >
                          {clue.title}
                        </h3>

                        <p
                          style={{
                            fontSize:
                              "12px",

                            lineHeight:
                              1.6,
                          }}
                        >
                          {clue.description}
                        </p>

                      </button>

                    )
                  )}

                </div>


                {investigated.length ===
                  CLUES.length && (

                  <button
                    type="button"
                    onClick={() =>
                      setSection(
                        "decision"
                      )
                    }
                    className="
                      mt-6
                    "
                    style={{
                      padding:
                        "13px 22px",

                      backgroundColor:
                        "#c9a227",

                      color:
                        "#07090f",

                      border:
                        "none",

                      fontFamily:
                        "Courier Prime, monospace",

                      fontWeight:
                        "bold",

                      cursor:
                        "pointer",
                    }}
                  >
                    ALL CLUES COLLECTED →
                  </button>

                )}

              </section>
            )}


            {/* =================================================
                CLUE DETAIL
            ================================================= */}

            {section ===
              "clue" &&
              selectedClue !== null && (

              <section
                className="
                  border
                  p-6
                "
                style={{
                  borderColor:
                    "rgba(201,162,39,0.35)",
                }}
              >

                <div
                  style={{
                    color:
                      "#00e9ff",

                    fontSize:
                      "10px",

                    letterSpacing:
                      "0.2em",

                    marginBottom:
                      "12px",
                  }}
                >
                  EVIDENCE VERIFIED
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    color:
                      "#ffd966",

                    fontSize:
                      "30px",
                  }}
                >
                  {selectedClue.title}
                </h2>

                <p
                  className="
                    mt-5
                  "
                  style={{
                    lineHeight:
                      1.8,
                  }}
                >
                  {selectedClue.description}
                </p>

                <div
                  className="
                    mt-6
                    border-l-2
                    pl-5
                  "
                  style={{
                    borderColor:
                      "#00e9ff",
                  }}
                >

                  <div
                    style={{
                      fontSize:
                        "9px",

                      letterSpacing:
                        "0.2em",

                      color:
                        "#00e9ff",

                      marginBottom:
                        "8px",
                    }}
                  >
                    NOTEBOOK UPDATED
                  </div>

                  <p>
                    ✔ {selectedClue.finding}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSection(
                      "evidence"
                    )
                  }
                  className="
                    mt-6
                  "
                  style={{
                    padding:
                      "11px 18px",

                    background:
                      "transparent",

                    color:
                      "#c9b882",

                    border:
                      "1px solid rgba(201,162,39,0.4)",

                    fontFamily:
                      "Courier Prime, monospace",

                    cursor:
                      "pointer",
                  }}
                >
                  ← BACK TO EVIDENCE
                </button>

              </section>
            )}


            {/* =================================================
                DECISION
            ================================================= */}

            {section ===
              "decision" && (

              <section
                className="
                  border
                  p-6
                "
                style={{
                  borderColor:
                    "rgba(201,162,39,0.35)",
                }}
              >

                <div
                  style={{
                    color:
                      "#ff6b6b",

                    fontSize:
                      "10px",

                    letterSpacing:
                      "0.2em",
                  }}
                >
                  FINAL DECISION
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    color:
                      "#ffd966",

                    fontSize:
                      "30px",

                    marginTop:
                      "12px",
                  }}
                >
                  WHAT SHOULD YOU CONCLUDE?
                </h2>

                <div
                  className="
                    mt-6
                    space-y-3
                  "
                >

                  {[
                    [
                      "crime-doubled",
                      "Crime doubled, so the city is twice as dangerous.",
                    ],
                    [
                      "graph-proves",
                      "The graph proves the city is unsafe.",
                    ],
                    [
                      "misleading",
                      "The graph uses real numbers but presents them in a misleading way by hiding context.",
                    ],
                    [
                      "fake",
                      "All statistics are fake.",
                    ],
                  ].map(
                    ([value, text]) => (

                      <button
                        key={
                          value
                        }
                        type="button"
                        onClick={() =>
                          setDecision(
                            value
                          )
                        }
                        className="
                          w-full
                          text-left
                          border
                          p-4
                        "
                        style={{
                          borderColor:
                            decision ===
                            value
                              ? "#c9a227"
                              : "rgba(201,162,39,0.25)",

                          backgroundColor:
                            decision ===
                            value
                              ? "rgba(201,162,39,0.12)"
                              : "transparent",

                          color:
                            "#c9b882",

                          cursor:
                            "pointer",
                        }}
                      >
                        <span
                          style={{
                            color:
                              decision ===
                              value
                                ? "#ffd966"
                                : "#c9a227",

                            marginRight:
                              "10px",
                          }}
                        >
                          {decision ===
                          value
                            ? "●"
                            : "○"}
                        </span>

                        {text}

                      </button>

                    )
                  )}

                </div>

                <button
                  type="button"
                  disabled={
                    decision === null
                  }
                  onClick={
                    submitDecision
                  }
                  className="
                    mt-6
                  "
                  style={{
                    padding:
                      "13px 22px",

                    backgroundColor:
                      decision ===
                      "misleading"
                        ? "#c9a227"
                        : "rgba(201,162,39,0.2)",

                    color:
                      decision ===
                      "misleading"
                        ? "#07090f"
                        : "#7e765e",

                    border:
                      "none",

                    fontFamily:
                      "Courier Prime, monospace",

                    fontWeight:
                      "bold",

                    cursor:
                      decision === null
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  SUBMIT DECISION
                </button>

              </section>
            )}


            {/* =================================================
                DEBRIEF
            ================================================= */}

            {section ===
              "debrief" && (

              <section
                className="
                  border
                  p-6
                "
                style={{
                  borderColor:
                    "rgba(201,162,39,0.35)",
                }}
              >

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
                  MISSION DEBRIEF
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    color:
                      "#ffd966",

                    fontSize:
                      "30px",

                    marginTop:
                      "12px",
                  }}
                >
                  SAME DATA.
                  <br />
                  DIFFERENT STORY.
                </h2>

                <p
                  className="
                    mt-5
                  "
                >
                  "Neither graph changed
                  the numbers. Only the
                  presentation changed."
                </p>

                <p>
                  Statistics are powerful.
                  They help us understand
                  the world.
                </p>

                <p>
                  But without context,
                  even true numbers can tell
                  a false story.
                </p>

                <div
                  className="
                    mt-6
                    border
                    p-5
                  "
                  style={{
                    borderColor:
                      "rgba(201,162,39,0.25)",
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
                    WHAT YOU LEARNED
                  </h3>

                  <ul
                    className="
                      mt-4
                      space-y-2
                    "
                    style={{
                      lineHeight:
                        1.7,
                    }}
                  >
                    <li>
                      ✓ Check the source
                      of the data.
                    </li>

                    <li>
                      ✓ Examine graph
                      axes and labels.
                    </li>

                    <li>
                      ✓ Look for missing
                      context.
                    </li>

                    <li>
                      ✓ Be careful with
                      percentages.
                    </li>

                    <li>
                      ✓ Compare claims
                      with official reports.
                    </li>
                  </ul>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSection(
                      "quiz"
                    )
                  }
                  className="
                    mt-6
                  "
                  style={{
                    padding:
                      "12px 20px",

                    backgroundColor:
                      "#c9a227",

                    color:
                      "#07090f",

                    border:
                      "none",

                    fontFamily:
                      "Courier Prime, monospace",

                    fontWeight:
                      "bold",

                    cursor:
                      "pointer",
                  }}
                >
                  TAKE THE QUIZ →
                </button>

              </section>
            )}


            {/* =================================================
                QUIZ
            ================================================= */}

            {section ===
              "quiz" && (

              <section
                className="
                  border
                  p-6
                "
                style={{
                  borderColor:
                    "rgba(201,162,39,0.35)",
                }}
              >

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
                  KNOWLEDGE CHECK
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    color:
                      "#ffd966",

                    fontSize:
                      "30px",

                    marginTop:
                      "12px",
                  }}
                >
                  QUICK QUIZ
                </h2>


                <QuizQuestion
                  number={1}
                  question="Why was the graph misleading?"
                  options={{
                    A: "The numbers were completely fake.",
                    B: "The graph started its Y-axis at 9 instead of 0, exaggerating the difference.",
                    C: "The colors were red.",
                    D: "The graph was shared on social media.",
                  }}
                  value={
                    quizAnswers[1]
                  }
                  onChange={(answer) =>
                    setQuizAnswers(
                      (previous) => ({
                        ...previous,
                        1: answer,
                      })
                    )
                  }
                />


                <QuizQuestion
                  number={2}
                  question="What additional information changed the interpretation?"
                  options={{
                    A: "The city's weather.",
                    B: "The population increased significantly, causing the crime rate per person to decrease.",
                    C: "The graph had too many bars.",
                    D: "Nothing.",
                  }}
                  value={
                    quizAnswers[2]
                  }
                  onChange={(answer) =>
                    setQuizAnswers(
                      (previous) => ({
                        ...previous,
                        2: answer,
                      })
                    )
                  }
                />


                <QuizQuestion
                  number={3}
                  question="Can true statistics still be presented in a misleading way?"
                  options={{
                    A: "Yes.",
                    B: "No.",
                  }}
                  value={
                    quizAnswers[3]
                  }
                  onChange={(answer) =>
                    setQuizAnswers(
                      (previous) => ({
                        ...previous,
                        3: answer,
                      })
                    )
                  }
                />


                {Object.keys(
                  quizAnswers
                ).length === 3 && (

                  <div
                    className="
                      mt-6
                      border
                      p-5
                    "
                    style={{
                      borderColor:
                        quizCorrect
                          ? "#00e9ff"
                          : "#ff6b6b",
                    }}
                  >

                    {quizCorrect
                      ? "✓ Excellent. All answers are correct."
                      : "Review the evidence and try again."}

                  </div>

                )}

                {quizCorrect && (

                  <button
                    type="button"
                    onClick={() =>
                      setSection(
                        "rewards"
                      )
                    }
                    className="
                      mt-6
                    "
                    style={{
                      padding:
                        "13px 22px",

                      backgroundColor:
                        "#c9a227",

                      color:
                        "#07090f",

                      border:
                        "none",

                      fontFamily:
                        "Courier Prime, monospace",

                      fontWeight:
                        "bold",

                      cursor:
                        "pointer",
                    }}
                  >
                    VIEW REWARDS →
                  </button>

                )}

              </section>
            )}


            {/* =================================================
                REWARDS
            ================================================= */}

            {section ===
              "rewards" && (

              <section
                className="
                  border
                  p-8
                  text-center
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
                      "10px",

                    letterSpacing:
                      "0.25em",
                  }}
                >
                  MISSION COMPLETE
                </div>

                <h2
                  style={{
                    fontFamily:
                      "Special Elite, serif",

                    color:
                      "#ffd966",

                    fontSize:
                      "40px",

                    marginTop:
                      "18px",
                  }}
                >
                  DATA DETECTIVE
                </h2>

                <p
                  style={{
                    fontSize:
                      "18px",

                    marginTop:
                      "20px",
                  }}
                >
                  +350 XP
                </p>

                <div
                  className="
                    mx-auto
                    mt-6
                    max-w-md
                    border
                    p-5
                  "
                  style={{
                    borderColor:
                      "rgba(201,162,39,0.3)",
                  }}
                >

                  <div
                    style={{
                      fontSize:
                        "36px",
                    }}
                  >
                    📊
                  </div>

                  <div
                    style={{
                      color:
                        "#ffd966",

                      fontFamily:
                        "Special Elite, serif",

                      fontSize:
                        "20px",

                      marginTop:
                        "10px",
                    }}
                  >
                    DATA DETECTIVE
                  </div>

                  <p
                    style={{
                      fontSize:
                        "11px",

                      marginTop:
                        "8px",
                    }}
                  >
                    You learned how statistics,
                    graphs, percentages and
                    presentation can influence
                    interpretation.
                  </p>

                </div>

                <p
                  className="
                    mt-6
                  "
                  style={{
                    color:
                      "#b8a878",

                    fontSize:
                      "11px",
                  }}
                >
                  LEVEL PROGRESS: 84%
                </p>

              </section>
            )}

          </motion.div>

        </AnimatePresence>

      </div>

    </div>
  );
}


/* =========================================================
   QUIZ QUESTION COMPONENT
========================================================= */

interface QuizQuestionProps {
  number: number;
  question: string;
  options: Record<string, string>;
  value?: string;
  onChange: (
    answer: string
  ) => void;
}


function QuizQuestion({
  number,
  question,
  options,
  value,
  onChange,
}: QuizQuestionProps) {

  return (
    <div
      className="
        mt-7
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

          fontSize:
            "14px",

          marginBottom:
            "15px",
        }}
      >
        {number}. {question}
      </h3>

      <div
        className="
          space-y-2
        "
      >

        {Object.entries(
          options
        ).map(
          ([key, text]) => (

            <button
              key={key}
              type="button"
              onClick={() =>
                onChange(
                  key
                )
              }
              className="
                w-full
                text-left
                border
                p-3
              "
              style={{
                borderColor:
                  value === key
                    ? "#c9a227"
                    : "rgba(201,162,39,0.18)",

                backgroundColor:
                  value === key
                    ? "rgba(201,162,39,0.1)"
                    : "transparent",

                color:
                  "#c9b882",

                fontFamily:
                  "Courier Prime, monospace",

                cursor:
                  "pointer",
              }}
            >
              <strong>
                {key}.
              </strong>{" "}
              {text}
            </button>

          )
        )}

      </div>

    </div>
  );
}

export default Case6Screen;