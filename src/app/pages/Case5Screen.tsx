import { useState, type ReactNode } from "react";

import {
  CASE5_ID,
  CASE5_INFO,
  CASE5_INTRO,
  CASE5_MISSION,
  CASE5_POST,
  CASE5_COMMENTS,
  CASE5_MISSION_OBJECTIVE,
  CASE5_TOOLS,
  CASE5_CLUES,
  CASE5_FINAL_OPTIONS,
  CASE5_DEBRIEF,
  CASE5_LEARNED,
  CASE5_QUIZ,
  CASE5_REWARD,
} from "../data/case5Data";

import type { Verdict } from "../types";

/* =========================================================
   TYPES
========================================================= */

type Case5ScreenProps = {
  onVerdictFinal: (
    verdict: NonNullable<Verdict>,
    investigated: string[]
  ) => void;
};

type ToolId =
  | "official"
  | "speech"
  | "audio"
  | "lipsync"
  | "reverse"
  | "ai";

type Phase =
  | "intro"
  | "mission"
  | "investigate"
  | "decision"
  | "debrief"
  | "quiz"
  | "reward";

type ClueData = {
  title: string;
  mentor: string;
  notebook: string;
  content: ReactNode;
};

/* =========================================================
   SAFE DATA HELPERS
========================================================= */

const clueData =
  CASE5_CLUES as unknown as Record<string, ClueData>;

/* =========================================================
   COMPONENT
========================================================= */

export default function Case5Screen({
  onVerdictFinal,
}: Case5ScreenProps) {
  const [phase, setPhase] = useState<Phase>("intro");

  const [selectedTool, setSelectedTool] =
    useState<ToolId | null>(null);

  const [investigated, setInvestigated] =
    useState<string[]>([]);

  const [selectedDecision, setSelectedDecision] =
    useState<string | null>(null);

  const [quizIndex, setQuizIndex] =
    useState(0);

  const [quizScore, setQuizScore] =
    useState(0);

  const [answeredQuiz, setAnsweredQuiz] =
    useState(false);

  const [showComments, setShowComments] =
    useState(false);

  /* =======================================================
     CURRENT CLUE
  ======================================================= */

  const selectedClue =
    selectedTool !== null
      ? clueData[selectedTool]
      : null;

  /* =======================================================
     PROGRESS
  ======================================================= */

  const progress =
    CASE5_TOOLS.length === 0
      ? 0
      : Math.round(
          (investigated.length /
            CASE5_TOOLS.length) *
            100
        );

  /* =======================================================
     INVESTIGATION
  ======================================================= */

  const investigateTool = (
    toolId: ToolId
  ) => {
    setSelectedTool(toolId);

    setInvestigated((previous) => {
      if (previous.includes(toolId)) {
        return previous;
      }

      return [...previous, toolId];
    });
  };

  /* =======================================================
     FINAL DECISION
  ======================================================= */

  const handleDecision = (
    optionId: string
  ) => {
    setSelectedDecision(optionId);

    const option = CASE5_FINAL_OPTIONS.find(
      (item) => item.id === optionId
    );

    if (option?.correct === true) {
      setPhase("debrief");
    }
  };

  /* =======================================================
     COMPLETE CASE
  ======================================================= */

  const finishMission = () => {
    onVerdictFinal(
      "verified" as NonNullable<Verdict>,
      investigated
    );
  };

  /* =======================================================
     QUIZ
  ======================================================= */

  const currentQuiz =
    CASE5_QUIZ[quizIndex];

  const answerQuiz = (
    optionIndex: number
  ) => {
    if (
      answeredQuiz ||
      !currentQuiz
    ) {
      return;
    }

    setAnsweredQuiz(true);

    if (
      optionIndex ===
      currentQuiz.answer
    ) {
      setQuizScore(
        (previous) =>
          previous + 1
      );
    }
  };

  const nextQuizQuestion = () => {
    if (
      quizIndex <
      CASE5_QUIZ.length - 1
    ) {
      setQuizIndex(
        (previous) =>
          previous + 1
      );

      setAnsweredQuiz(false);
    } else {
      setPhase("reward");
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full h-full overflow-y-auto bg-[#07090f] text-[#c9b882]">
      <div
        className="max-w-6xl mx-auto px-6 py-8"
        style={{
          fontFamily:
            "Courier Prime, monospace",
        }}
      >

        {/* =================================================
            INTRO
        ================================================= */}

        {phase === "intro" && (
          <section className="min-h-full flex flex-col justify-center">

            <div className="text-[#c9a227] text-xs tracking-[0.3em] mb-4">
              DIGITAL GUARDIANS // SITUATION ROOM
            </div>

            <div className="text-[#00e9ff] text-xs tracking-[0.25em] mb-3">
              🔔 CASE FILE 005 RECEIVED
            </div>

            <h1
              className="text-4xl md:text-6xl text-[#ffd966] mb-8"
              style={{
                fontFamily:
                  "Special Elite, serif",
              }}
            >
              {CASE5_INTRO.title}
            </h1>

            <div className="space-y-5 max-w-3xl text-lg leading-relaxed">
              {CASE5_INTRO.text.map(
                (line, index) => (
                  <p key={index}>
                    {line}
                  </p>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setPhase("mission")
              }
              className="mt-10 self-start px-6 py-3 border border-[#c9a227] text-[#ffd966] hover:bg-[#c9a227] hover:text-[#07090f] transition-colors"
            >
              OPEN CASE FILE 005 →
            </button>

          </section>
        )}

        {/* =================================================
            MISSION
        ================================================= */}

        {phase === "mission" && (
          <section className="space-y-8">

            <div className="border-b border-[#c9a227]/30 pb-6">

              <div className="text-xs tracking-[0.25em] text-[#00e9ff]">
                CASE FILE {CASE5_ID}
              </div>

              <h1
                className="text-4xl text-[#ffd966] mt-3"
                style={{
                  fontFamily:
                    "Special Elite, serif",
                }}
              >
                {CASE5_INFO.title}
              </h1>

            </div>

            <div className="grid md:grid-cols-4 gap-4">

              <InfoBox
                label="DIFFICULTY"
                value={CASE5_INFO.difficulty}
              />

              <InfoBox
                label="PRIORITY"
                value={CASE5_MISSION.priority}
              />

              <InfoBox
                label="THREAT"
                value={CASE5_INFO.threatLevel}
              />

              <InfoBox
                label="REACH"
                value={CASE5_INFO.reach}
              />

            </div>

            <div className="border border-[#c9a227]/30 p-6">

              <div className="text-[#00e9ff] text-xs tracking-[0.2em] mb-4">
                MISSION BRIEFING
              </div>

              <p className="text-xl leading-relaxed">
                {CASE5_MISSION.description}
              </p>

              <div className="mt-6 space-y-2">
                {CASE5_MISSION.details.map(
                  (detail, index) => (
                    <p key={index}>
                      • {detail}
                    </p>
                  )
                )}
              </div>

            </div>

            <div className="border border-red-500/40 p-6">

              <div className="text-red-400 text-xs tracking-[0.2em] mb-3">
                MISSION OBJECTIVE
              </div>

              <p className="text-xl">
                {CASE5_MISSION_OBJECTIVE}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setPhase("investigate")
              }
              className="px-6 py-3 border border-[#c9a227] text-[#ffd966] hover:bg-[#c9a227] hover:text-[#07090f] transition-colors"
            >
              BEGIN INVESTIGATION →
            </button>

          </section>
        )}

        {/* =================================================
            INVESTIGATION
        ================================================= */}

        {phase === "investigate" && (
          <section className="space-y-8">

            <div className="flex justify-between items-end border-b border-[#c9a227]/30 pb-5">

              <div>

                <div className="text-xs text-[#00e9ff] tracking-[0.2em]">
                  CASE 005 // ACTIVE INVESTIGATION
                </div>

                <h1
                  className="text-3xl text-[#ffd966] mt-2"
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                  }}
                >
                  THE VOICE THAT NEVER SPOKE
                </h1>

              </div>

              <div className="text-right">

                <div className="text-xs">
                  EVIDENCE COLLECTED
                </div>

                <div className="text-2xl text-[#00e9ff]">
                  {investigated.length}/
                  {CASE5_TOOLS.length}
                </div>

                <div className="text-xs">
                  {progress}%
                </div>

              </div>

            </div>

            {/* VIRAL VIDEO */}

            <div className="border border-red-500/40 bg-red-950/10 p-6">

              <div className="text-red-400 text-xs tracking-[0.2em] mb-3">
                {CASE5_POST.label}
              </div>

              <h2 className="text-2xl text-white mb-5">
                {CASE5_POST.headline}
              </h2>

              <div className="border border-white/10 p-5">

                <div className="text-sm text-[#b8a878] mb-4">
                  VIDEO LENGTH:{" "}
                  {CASE5_POST.videoLength}
                </div>

                <div className="space-y-3">
                  {CASE5_POST.body.map(
                    (line, index) => (
                      <p
                        key={index}
                        className="text-lg"
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">

                <div>
                  <span className="text-xs">
                    VIEWS
                  </span>

                  <div className="text-[#ffd966]">
                    {CASE5_POST.engagement.views}
                  </div>
                </div>

                <div>
                  <span className="text-xs">
                    SHARES
                  </span>

                  <div className="text-[#ffd966]">
                    {CASE5_POST.engagement.shares}
                  </div>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowComments(
                    (previous) =>
                      !previous
                  )
                }
                className="mt-5 text-xs border border-white/20 px-4 py-2"
              >
                {showComments
                  ? "HIDE COMMENTS"
                  : "VIEW COMMENTS"}
              </button>

              {showComments && (
                <div className="mt-5 space-y-3">

                  {CASE5_COMMENTS.map(
                    (comment) => (
                      <div
                        key={comment.name}
                        className="border-l border-[#c9a227]/40 pl-4"
                      >

                        <div className="text-[#ffd966] text-sm">
                          {comment.name}
                        </div>

                        <div className="text-sm">
                          {comment.text}
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

            {/* INVESTIGATION TOOLS */}

            <div>

              <div className="text-xs tracking-[0.2em] text-[#00e9ff] mb-4">
                INVESTIGATION TOOLS
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

                {CASE5_TOOLS.map(
                  (tool) => {

                    const toolId =
                      String(tool.id) as ToolId;

                    const active =
                      selectedTool ===
                      toolId;

                    const done =
                      investigated.includes(
                        toolId
                      );

                    return (
                      <button
                        type="button"
                        key={String(tool.id)}
                        onClick={() =>
                          investigateTool(
                            toolId
                          )
                        }
                        className="text-left p-4 border transition-all"
                        style={{
                          borderColor:
                            active
                              ? tool.color
                              : "rgba(201,162,39,0.25)",

                          backgroundColor:
                            active
                              ? "rgba(201,162,39,0.08)"
                              : "transparent",
                        }}
                      >

                        <div
                          className="text-xl mb-2"
                          style={{
                            color:
                              tool.color,
                          }}
                        >
                          {tool.symbol}
                        </div>

                        <div className="text-sm">
                          {tool.title}
                        </div>

                        {done && (
                          <div className="text-xs text-[#00e9ff] mt-2">
                            ✓ INVESTIGATED
                          </div>
                        )}

                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* SELECTED CLUE */}

            {selectedClue && (
              <div className="border border-[#c9a227]/40 p-6">

                <div className="text-xs text-[#00e9ff] tracking-[0.2em] mb-3">
                  EVIDENCE FOUND
                </div>

                <h2 className="text-2xl text-[#ffd966] mb-5">
                  {selectedClue.title}
                </h2>

                <div className="border-l-2 border-[#c9a227] pl-5 mb-6">

                  <p className="italic">
                    Commander Mira:
                  </p>

                  <p className="mt-2">
                    "{selectedClue.mentor}"
                  </p>

                </div>

                <div>
                  {selectedClue.content}
                </div>

                <div className="mt-6 p-4 border border-[#00e9ff]/30">

                  <div className="text-xs text-[#00e9ff] mb-2">
                    NOTEBOOK UPDATED
                  </div>

                  <p>
                    ✓ {selectedClue.notebook}
                  </p>

                </div>

              </div>
            )}

            {/* NOTEBOOK */}

            {investigated.length > 0 && (
              <div className="border border-[#c9a227]/20 p-6">

                <div className="text-xs tracking-[0.2em] mb-4">
                  DETECTIVE NOTEBOOK
                </div>

                <div className="space-y-2">

                  {investigated.map(
                    (toolId) => {

                      const clue =
                        clueData[toolId];

                      if (!clue) {
                        return null;
                      }

                      return (
                        <div
                          key={toolId}
                          className="text-sm"
                        >
                          ✓ {clue.notebook}
                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

            {/* REVIEW */}

            <button
              type="button"
              disabled={
                investigated.length <
                CASE5_TOOLS.length
              }
              onClick={() =>
                setPhase("decision")
              }
              className="px-6 py-3 border border-[#c9a227] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              REVIEW EVIDENCE & MAKE DECISION →
            </button>

          </section>
        )}

        {/* =================================================
            FINAL DECISION
        ================================================= */}

        {phase === "decision" && (
          <section className="max-w-4xl mx-auto space-y-8">

            <div className="text-center">

              <div className="text-xs text-red-400 tracking-[0.25em]">
                FINAL DECISION
              </div>

              <h1
                className="text-4xl text-[#ffd966] mt-3"
                style={{
                  fontFamily:
                    "Special Elite, serif",
                }}
              >
                WHAT SHOULD YOU DO?
              </h1>

            </div>

            <div className="space-y-3">

              {CASE5_FINAL_OPTIONS.map(
                (option) => {

                  const selected =
                    selectedDecision ===
                    option.id;

                  return (
                    <button
                      type="button"
                      key={String(option.id)}
                      onClick={() =>
                        handleDecision(
                          String(option.id)
                        )
                      }
                      className="w-full text-left p-5 border"
                      style={{
                        borderColor:
                          selected
                            ? option.correct
                              ? "#22c55e"
                              : "#ef4444"
                            : "rgba(201,162,39,0.3)",
                      }}
                    >

                      <span className="mr-3">
                        ○
                      </span>

                      {option.text}

                      {selected &&
                        option.correct && (
                          <div className="text-[#22c55e] text-xs mt-2">
                            ✓ CORRECT
                          </div>
                        )}

                      {selected &&
                        !option.correct && (
                          <div className="text-red-400 text-xs mt-2">
                            ✗ NOT SUPPORTED BY THE EVIDENCE
                          </div>
                        )}

                    </button>
                  );
                }
              )}

            </div>

            {selectedDecision === "verify" && (
              <button
                type="button"
                onClick={() =>
                  setPhase("debrief")
                }
                className="px-6 py-3 border border-[#22c55e] text-[#22c55e]"
              >
                CONTINUE →
              </button>
            )}

          </section>
        )}

        {/* =================================================
            DEBRIEF
        ================================================= */}

        {phase === "debrief" && (
          <section className="max-w-4xl mx-auto space-y-8">

            <div>

              <div className="text-xs text-[#00e9ff] tracking-[0.25em]">
                MISSION DEBRIEF
              </div>

              <h1
                className="text-4xl text-[#ffd966] mt-3"
                style={{
                  fontFamily:
                    "Special Elite, serif",
                }}
              >
                THE VOICE THAT NEVER SPOKE
              </h1>

            </div>

            <div className="space-y-5 text-lg leading-relaxed">

              {CASE5_DEBRIEF.map(
                (line, index) => (
                  <p key={index}>
                    {line}
                  </p>
                )
              )}

            </div>

            <div className="border border-[#c9a227]/30 p-6">

              <div className="text-xs text-[#00e9ff] tracking-[0.2em] mb-5">
                WHAT YOU LEARNED
              </div>

              <div className="space-y-3">

                {CASE5_LEARNED.map(
                  (item, index) => (
                    <div key={index}>
                      ✓ {item}
                    </div>
                  )
                )}

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                setPhase("quiz")
              }
              className="px-6 py-3 border border-[#c9a227]"
            >
              TAKE QUICK QUIZ →
            </button>

          </section>
        )}

        {/* =================================================
            QUIZ
        ================================================= */}

        {phase === "quiz" && (
          <section className="max-w-4xl mx-auto space-y-8">

            <div>

              <div className="text-xs text-[#00e9ff] tracking-[0.25em]">
                QUICK QUIZ
              </div>

              <h1
                className="text-4xl text-[#ffd966] mt-3"
                style={{
                  fontFamily:
                    "Special Elite, serif",
                }}
              >
                QUESTION{" "}
                {quizIndex + 1}/
                {CASE5_QUIZ.length}
              </h1>

            </div>

            {currentQuiz && (
              <div className="border border-[#c9a227]/30 p-6">

                <h2 className="text-xl mb-6">
                  {currentQuiz.question}
                </h2>

                <div className="space-y-3">

                  {currentQuiz.options.map(
                    (option, index) => (
                      <button
                        type="button"
                        key={index}
                        disabled={
                          answeredQuiz
                        }
                        onClick={() =>
                          answerQuiz(
                            index
                          )
                        }
                        className="w-full text-left p-4 border border-[#c9a227]/25 disabled:opacity-100"
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                        . {option}
                      </button>
                    )
                  )}

                </div>

                {answeredQuiz && (
                  <div className="mt-6">

                    <div className="text-[#00e9ff] mb-2">
                      Correct answer:{" "}
                      {String.fromCharCode(
                        65 +
                          currentQuiz.answer
                      )}
                    </div>

                    <div className="text-xs text-[#b8a878] mb-4">
                      SCORE:{" "}
                      {quizScore}/
                      {CASE5_QUIZ.length}
                    </div>

                    <button
                      type="button"
                      onClick={
                        nextQuizQuestion
                      }
                      className="px-5 py-3 border border-[#c9a227]"
                    >
                      {quizIndex <
                      CASE5_QUIZ.length - 1
                        ? "NEXT QUESTION →"
                        : "VIEW REWARD →"}
                    </button>

                  </div>
                )}

              </div>
            )}

          </section>
        )}

        {/* =================================================
            REWARD
        ================================================= */}

        {phase === "reward" && (
          <section className="min-h-full flex flex-col justify-center items-center text-center space-y-7">

            <div className="text-[#22c55e] text-sm tracking-[0.3em]">
              🎉 MISSION COMPLETE
            </div>

            <h1
              className="text-5xl text-[#ffd966]"
              style={{
                fontFamily:
                  "Special Elite, serif",
              }}
            >
              DEEPFAKE DETECTIVE
            </h1>

            <div className="text-6xl">
              🎥
            </div>

            <div className="text-2xl text-[#00e9ff]">
              +{CASE5_REWARD.xp} XP
            </div>

            <div className="border border-[#c9a227]/40 p-6">

              <div className="text-xs tracking-[0.2em]">
                BADGE UNLOCKED
              </div>

              <div className="text-2xl mt-3">
                {CASE5_REWARD.badge}
              </div>

            </div>

            <div className="text-sm">
              LEVEL PROGRESS:{" "}
              {CASE5_REWARD.progress}
            </div>

            <button
              type="button"
              onClick={finishMission}
              className="px-8 py-4 border border-[#c9a227] text-[#ffd966] hover:bg-[#c9a227] hover:text-[#07090f]"
            >
              COMPLETE CASE FILE →
            </button>

          </section>
        )}

      </div>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border border-[#c9a227]/25 p-4">

      <div className="text-[10px] tracking-[0.2em] text-[#b8a878] mb-2">
        {label}
      </div>

      <div className="text-sm text-[#ffd966]">
        {value}
      </div>

    </div>
  );
}