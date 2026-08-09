import React, { useState } from "react";
import {
  CASE3_INFO,
  CASE3_INTRO,
  CASE3_MISSION,
  CASE3_POST,
  CASE3_COMMENTS,
  CASE3_MISSION_OBJECTIVE,
  CASE3_TOOLS,
  CASE3_CLUES,
  CASE3_EVIDENCE,
  CASE3_FINAL_OPTIONS,
  CASE3_DEBRIEF,
  CASE3_LEARNED,
  CASE3_QUIZ,
  CASE3_REWARD,
  CASE3_HEADQUARTERS,
} from "../data/case3Data";

type Stage =
  | "briefing"
  | "investigation"
  | "decision"
  | "debrief"
  | "learn"
  | "quiz"
  | "reward"
  | "headquarters";

interface Case3ScreenProps {
  onVerdictFinal?: (
    verdict: "verify" | "trust" | "reject" | "report",
    investigated: string[],
  ) => void;
}

export default function Case3Screen({
  onVerdictFinal,
}: Case3ScreenProps) {
  const [stage, setStage] = useState<Stage>("briefing");

  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const [checkedTools, setCheckedTools] = useState<string[]>([]);

  const [selectedDecision, setSelectedDecision] = useState<string | null>(
    null,
  );

  const [quizIndex, setQuizIndex] = useState(0);

  const [quizScore, setQuizScore] = useState(0);

  const currentClue = selectedTool
    ? CASE3_CLUES[selectedTool as keyof typeof CASE3_CLUES]
    : null;

  const investigate = (toolId: string) => {
    setSelectedTool(toolId);

    if (!checkedTools.includes(toolId)) {
      setCheckedTools((previous) => [...previous, toolId]);
    }
  };

  const finishInvestigation = () => {
    setStage("decision");
    setSelectedTool(null);
  };

  const makeDecision = (decisionId: string) => {
    setSelectedDecision(decisionId);

    /*
     * VERIFY is the correct final decision for Case 3.
     *
     * We don't immediately close the case here because
     * the player still has to go through:
     *
     * Decision → Debrief → Learn → Quiz → Reward → Headquarters
     */

    setStage("debrief");
  };

  const answerQuiz = (answerIndex: number) => {
    const currentQuestion = CASE3_QUIZ[quizIndex];

    if (answerIndex === currentQuestion.answer) {
      setQuizScore((previous) => previous + 1);
    }

    if (quizIndex < CASE3_QUIZ.length - 1) {
      setQuizIndex((previous) => previous + 1);
    } else {
      setStage("reward");
    }
  };

  /*
   * Finish Case 3 after the reward screen.
   *
   * This sends the result back to App.tsx so App can:
   * - mark the case as closed-solved
   * - save the verdict
   * - open CaseResolutionScreen
   */
  const completeCase = () => {
    if (onVerdictFinal) {
      onVerdictFinal(
        selectedDecision === "verify"
          ? "verify"
          : "reject",
        checkedTools,
      );
    } else {
      setStage("headquarters");
    }
  };

  return (
    <div className="case3-page">
      <style>{`
        .case3-page {
          min-height: 100%;
          height: 100%;
          overflow-y: auto;
          background:
            radial-gradient(circle at 50% 20%, rgba(201,162,39,.08), transparent 35%),
            #07090f;
          color: #c9b882;
          font-family: "Courier Prime", "Courier New", monospace;
          letter-spacing: .04em;
        }

        .case3-header {
          height: 76px;
          border-bottom: 1px solid rgba(201,162,39,.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          background: rgba(3,5,10,.94);
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .case3-case-number {
          color: #ffd966;
          font-size: 13px;
          letter-spacing: .18em;
        }

        .case3-header-title {
          color: #ffd966;
          font-family: Georgia, serif;
          font-size: 24px;
          letter-spacing: .08em;
        }

        .case3-header-status {
          color: #00e9ff;
          font-size: 11px;
          letter-spacing: .15em;
        }

        .case3-content {
          width: min(1180px, calc(100% - 50px));
          margin: 0 auto;
          padding: 42px 0 80px;
        }

        .case3-screen-title {
          color: #ffd966;
          font-family: Georgia, serif;
          font-size: clamp(28px, 4vw, 48px);
          margin: 0 0 10px;
          letter-spacing: .08em;
        }

        .case3-subtitle {
          color: rgba(201,162,39,.65);
          font-size: 12px;
          letter-spacing: .18em;
          margin-bottom: 34px;
        }

        .case3-card {
          border: 1px solid rgba(201,162,39,.25);
          background: rgba(9,12,20,.9);
          padding: 28px;
          box-shadow: 0 0 35px rgba(0,0,0,.3);
          margin-bottom: 22px;
        }

        .case3-card h2 {
          margin-top: 0;
          color: #ffd966;
          font-family: Georgia, serif;
          letter-spacing: .07em;
        }

        .case3-card h3 {
          color: #ffd966;
          font-family: Georgia, serif;
        }

        .case3-text {
          color: #ddd4b9;
          line-height: 1.9;
          font-size: 14px;
        }

        .case3-mira {
          border-left: 3px solid #00e9ff;
          padding: 18px 22px;
          background: rgba(0,233,255,.025);
          margin: 20px 0;
          color: #ddd4b9;
          line-height: 1.9;
        }

        .case3-mira-label {
          color: #00e9ff;
          font-size: 11px;
          letter-spacing: .2em;
          margin-bottom: 8px;
        }

        .case3-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 25px 0;
        }

        .case3-stat {
          border: 1px solid rgba(201,162,39,.2);
          padding: 18px;
          background: rgba(201,162,39,.025);
        }

        .case3-stat-label {
          display: block;
          color: rgba(201,162,39,.55);
          font-size: 10px;
          margin-bottom: 8px;
        }

        .case3-stat-value {
          color: #ffd966;
          font-size: 14px;
        }

        .case3-post {
          width: min(600px, 100%);
          margin: 25px auto;
          border: 1px solid rgba(201,162,39,.28);
          padding: 24px;
          background: #0a0d15;
        }

        .case3-post-label {
          color: rgba(201,162,39,.5);
          font-size: 10px;
          letter-spacing: .15em;
          margin-bottom: 18px;
        }

        .case3-post-headline {
          color: #f4ead1;
          font-family: Georgia, serif;
          font-size: 24px;
          line-height: 1.3;
          margin: 15px 0;
        }

        .case3-post-body {
          color: #c9b882;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .case3-engagement {
          border-top: 1px solid rgba(201,162,39,.15);
          padding-top: 15px;
          color: rgba(201,162,39,.7);
          font-size: 11px;
          line-height: 2;
        }

        .case3-comments {
          width: min(600px, 100%);
          margin: 20px auto;
        }

        .case3-comment {
          border-bottom: 1px solid rgba(201,162,39,.12);
          padding: 13px 0;
        }

        .case3-comment-name {
          color: #ffd966;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .case3-comment-text {
          color: #aaa38f;
          font-size: 12px;
          line-height: 1.6;
        }

        .case3-tools {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin: 25px 0;
        }

        .case3-tool {
          min-height: 100px;
          border: 1px solid rgba(201,162,39,.25);
          background: #090c13;
          color: #c9b882;
          cursor: pointer;
          padding: 15px;
          font-family: inherit;
          text-align: left;
          transition: .2s ease;
        }

        .case3-tool:hover {
          border-color: #ffd966;
          transform: translateY(-2px);
        }

        .case3-tool.selected {
          border-color: #ffd966;
          background: rgba(201,162,39,.09);
        }

        .case3-tool.checked {
          box-shadow: inset 0 -3px #00ff6a;
        }

        .case3-tool-symbol {
          display: block;
          font-size: 20px;
          margin-bottom: 13px;
        }

        .case3-tool-title {
          font-size: 10px;
          line-height: 1.5;
        }

        .case3-investigation {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 20px;
        }

        .case3-clue-panel {
          min-height: 380px;
        }

        .case3-label {
          color: rgba(201,162,39,.55);
          font-size: 10px;
          letter-spacing: .18em;
          margin-bottom: 10px;
        }

        .case3-warning {
          border: 1px solid rgba(231,76,60,.3);
          background: rgba(231,76,60,.05);
          color: #e88c82;
          padding: 15px;
          margin-top: 20px;
          line-height: 1.7;
          font-size: 12px;
        }

        .case3-success {
          border: 1px solid rgba(0,255,106,.25);
          background: rgba(0,255,106,.04);
          color: #63e59a;
          padding: 15px;
          margin-top: 20px;
          font-size: 12px;
          line-height: 1.7;
        }

        .case3-evidence {
          margin-top: 20px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .case3-evidence-item {
          border: 1px solid rgba(201,162,39,.15);
          padding: 13px;
          font-size: 11px;
          color: #c9b882;
        }

        .case3-button {
          border: 1px solid #c9a227;
          background: rgba(201,162,39,.08);
          color: #ffd966;
          padding: 14px 25px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: .12em;
          font-size: 11px;
          margin-top: 20px;
        }

        .case3-button:hover {
          background: rgba(201,162,39,.16);
        }

        .case3-decision {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 25px;
        }

        .case3-decision-button {
          border: 1px solid rgba(201,162,39,.25);
          background: #090c13;
          color: #d9d2bd;
          padding: 22px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.6;
        }

        .case3-decision-button:hover {
          border-color: #ffd966;
        }

        .case3-quiz-option {
          display: block;
          width: 100%;
          border: 1px solid rgba(201,162,39,.2);
          background: #090c13;
          color: #d9d2bd;
          padding: 18px;
          margin: 10px 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }

        .case3-quiz-option:hover {
          border-color: #ffd966;
        }

        .case3-reward {
          text-align: center;
          padding: 60px 20px;
        }

        .case3-xp {
          font-size: 42px;
          color: #ffd966;
          font-family: Georgia, serif;
          margin: 25px 0;
        }

        .case3-badge {
          font-size: 24px;
          color: #00e9ff;
          margin: 25px 0;
        }

        .case3-back {
          border: 1px solid rgba(201,162,39,.25);
          background: transparent;
          color: #c9b882;
          padding: 10px 18px;
          cursor: pointer;
          font-family: inherit;
          margin-bottom: 25px;
        }

        @media (max-width: 850px) {
          .case3-tools {
            grid-template-columns: repeat(2, 1fr);
          }

          .case3-investigation {
            grid-template-columns: 1fr;
          }

          .case3-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .case3-content {
            width: calc(100% - 25px);
          }

          .case3-header {
            padding: 0 15px;
          }

          .case3-decision,
          .case3-evidence {
            grid-template-columns: 1fr;
          }

          .case3-tools {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="case3-header">
        <div>
          <div className="case3-case-number">
            CASE FILE 003
          </div>

          <div className="case3-header-title">
            THE HEADLINE TRAP
          </div>
        </div>

        <div className="case3-header-status">
          ● ACTIVE INVESTIGATION
        </div>
      </header>

      <main className="case3-content">

        {/* BACK BUTTON */}
        {stage !== "briefing" &&
          stage !== "reward" &&
          stage !== "headquarters" && (
            <button
              type="button"
              className="case3-back"
              onClick={() => {
                if (stage === "investigation") {
                  setStage("briefing");
                } else if (stage === "decision") {
                  setStage("investigation");
                } else if (stage === "debrief") {
                  setStage("decision");
                } else if (stage === "learn") {
                  setStage("debrief");
                } else if (stage === "quiz") {
                  setStage("learn");
                }
              }}
            >
              ← BACK
            </button>
          )}

        {/* ========================================================= */}
        {/* BRIEFING */}
        {/* ========================================================= */}

        {stage === "briefing" && (
          <>
            <h1 className="case3-screen-title">
              {CASE3_INFO.title}
            </h1>

            <div className="case3-subtitle">
              CASE FILE 003 · {CASE3_INFO.difficulty}
            </div>

            <div className="case3-card">

              <h2>
                BACK AT DIGITAL GUARDIANS HEADQUARTERS
              </h2>

              <div className="case3-mira">

                <div className="case3-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE3_INTRO.text.map((line, index) => (
                  <div key={`${line}-${index}`}>
                    {line}
                  </div>
                ))}

              </div>

              <div className="case3-card">

                <h2>
                  🔔 URGENT CASE RECEIVED
                </h2>

                <div className="case3-stats">

                  <div className="case3-stat">
                    <span className="case3-stat-label">
                      PRIORITY
                    </span>

                    <span className="case3-stat-value">
                      {CASE3_MISSION.priority}
                    </span>
                  </div>

                  <div className="case3-stat">
                    <span className="case3-stat-label">
                      THREAT LEVEL
                    </span>

                    <span className="case3-stat-value">
                      {CASE3_MISSION.threatLevel}
                    </span>
                  </div>

                  <div className="case3-stat">
                    <span className="case3-stat-label">
                      POTENTIAL REACH
                    </span>

                    <span className="case3-stat-value">
                      {CASE3_MISSION.reach}
                    </span>
                  </div>

                </div>

                <p className="case3-text">
                  {CASE3_MISSION.description}
                </p>

                {CASE3_MISSION.details.map(
                  (detail, index) => (
                    <p
                      className="case3-text"
                      key={`${detail}-${index}`}
                    >
                      {detail}
                    </p>
                  ),
                )}

                <div className="case3-mira">

                  <div className="case3-mira-label">
                    MISSION OBJECTIVE
                  </div>

                  <strong>
                    {CASE3_MISSION.objective}
                  </strong>

                </div>

              </div>

              <button
                type="button"
                className="case3-button"
                onClick={() => setStage("investigation")}
              >
                BEGIN INVESTIGATION →
              </button>

            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* INVESTIGATION */}
        {/* ========================================================= */}

        {stage === "investigation" && (
          <>
            <h1 className="case3-screen-title">
              INVESTIGATION
            </h1>

            <div className="case3-subtitle">
              {CASE3_MISSION_OBJECTIVE}
            </div>

            <div className="case3-card">

              <div className="case3-label">
                EXHIBIT 01 · VIRAL SOCIAL MEDIA POST
              </div>

              <div className="case3-post">

                <div className="case3-post-label">
                  🚨 BREAKING NEWS
                </div>

                <div className="case3-post-headline">
                  {CASE3_POST.headline}
                </div>

                <div className="case3-post-body">
                  {CASE3_POST.body.map(
                    (line, index) => (
                      <div key={`${line}-${index}`}>
                        {line}
                      </div>
                    ),
                  )}
                </div>

                <div className="case3-engagement">
                  {CASE3_POST.engagement.likes}
                  <br />

                  {CASE3_POST.engagement.shares}
                  <br />

                  {CASE3_POST.engagement.comments}
                </div>

              </div>

              <div className="case3-comments">

                <div className="case3-label">
                  COMMENTS
                </div>

                {CASE3_COMMENTS.map(
                  (comment, index) => (
                    <div
                      className="case3-comment"
                      key={`${comment.name}-${index}`}
                    >

                      <div className="case3-comment-name">
                        {comment.name}
                      </div>

                      <div className="case3-comment-text">
                        {comment.text}
                      </div>

                    </div>
                  ),
                )}

              </div>

              <div className="case3-mira">

                <div className="case3-mira-label">
                  COMMANDER MIRA
                </div>

                <div>
                  "Notice something?"
                </div>

                <div>
                  "Almost everyone reacted..."
                </div>

                <strong>
                  "without opening the article."
                </strong>

              </div>

            </div>

            <div className="case3-card">

              <h2>
                INVESTIGATION TOOLS
              </h2>

              <div className="case3-tools">

                {CASE3_TOOLS.map((tool) => (

                  <button
                    type="button"
                    key={tool.id}
                    className={`case3-tool ${
                      selectedTool === tool.id
                        ? "selected"
                        : ""
                    } ${
                      checkedTools.includes(tool.id)
                        ? "checked"
                        : ""
                    }`}
                    onClick={() =>
                      investigate(tool.id)
                    }
                  >

                    <span
                      className="case3-tool-symbol"
                      style={{
                        color: tool.color,
                      }}
                    >
                      {tool.symbol}
                    </span>

                    <span className="case3-tool-title">
                      {tool.title}
                    </span>

                  </button>

                ))}

              </div>

            </div>

            {currentClue && (
              <div className="case3-investigation">

                <div className="case3-card case3-clue-panel">

                  <div className="case3-label">
                    INVESTIGATION RESULT
                  </div>

                  <h2>
                    {currentClue.title}
                  </h2>

                  <div className="case3-text">
                    {currentClue.content}
                  </div>

                  <div className="case3-mira">

                    <div className="case3-mira-label">
                      COMMANDER MIRA
                    </div>

                    <div>
                      {currentClue.mentor}
                    </div>

                  </div>

                  <div className="case3-success">

                    ✓ NOTEBOOK UPDATED

                    <br />

                    {currentClue.notebook}

                  </div>

                </div>

                <div className="case3-card">

                  <div className="case3-label">
                    EVIDENCE COLLECTED
                  </div>

                  <div className="case3-evidence">

                    {CASE3_EVIDENCE.map(
                      (item, index) => (
                        <div
                          className="case3-evidence-item"
                          key={`${item}-${index}`}
                        >
                          ✓ {item}
                        </div>
                      ),
                    )}

                  </div>

                </div>

              </div>
            )}

            {checkedTools.length ===
              CASE3_TOOLS.length && (

              <button
                type="button"
                className="case3-button"
                onClick={finishInvestigation}
              >
                COMPLETE INVESTIGATION →
              </button>

            )}

          </>
        )}

        {/* ========================================================= */}
        {/* DECISION */}
        {/* ========================================================= */}

        {stage === "decision" && (
          <>
            <h1 className="case3-screen-title">
              FINAL DECISION
            </h1>

            <div className="case3-subtitle">
              WHAT SHOULD YOU DO?
            </div>

            <div className="case3-card">

              <div className="case3-mira">

                <div className="case3-mira-label">
                  COMMANDER MIRA
                </div>

                "You've investigated the headline, the article,
                the official statement, other news sources, and
                the publication itself."

                <br />
                <br />

                "Now make your decision."

              </div>

              <div className="case3-decision">

                {CASE3_FINAL_OPTIONS.map(
                  (option) => (

                    <button
                      type="button"
                      key={option.id}
                      className="case3-decision-button"
                      onClick={() =>
                        makeDecision(option.id)
                      }
                    >
                      {option.text}
                    </button>

                  ),
                )}

              </div>

            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* DEBRIEF */}
        {/* ========================================================= */}

        {stage === "debrief" && (
          <>
            <h1 className="case3-screen-title">
              MISSION DEBRIEF
            </h1>

            <div className="case3-card">

              {selectedDecision === "verify" ? (

                <div className="case3-success">

                  ✓ CORRECT DECISION

                  <br />

                  Read the full article and verify the
                  information before sharing.

                </div>

              ) : (

                <div className="case3-warning">

                  ⚠ NOT THE BEST DECISION

                  <br />

                  The evidence showed that the headline
                  exaggerated the actual event.

                </div>

              )}

              <div className="case3-mira">

                <div className="case3-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE3_DEBRIEF.map(
                  (line, index) => (
                    <div
                      key={`${line}-${index}`}
                    >
                      {line}
                    </div>
                  ),
                )}

              </div>

              <button
                type="button"
                className="case3-button"
                onClick={() => setStage("learn")}
              >
                CONTINUE →
              </button>

            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* LEARN */}
        {/* ========================================================= */}

        {stage === "learn" && (
          <>
            <h1 className="case3-screen-title">
              WHAT YOU LEARNED
            </h1>

            <div className="case3-subtitle">
              HEADLINE HUNTER · MIL SKILL
            </div>

            <div className="case3-card">

              {CASE3_LEARNED.map(
                (item, index) => (
                  <div
                    className="case3-evidence-item"
                    key={`${item}-${index}`}
                  >
                    ✓ {item}
                  </div>
                ),
              )}

              <div className="case3-mira">

                <div className="case3-mira-label">
                  REMEMBER
                </div>

                Sensational words are designed to grab
                attention — not necessarily to inform.

              </div>

              <button
                type="button"
                className="case3-button"
                onClick={() => setStage("quiz")}
              >
                TAKE QUICK QUIZ →
              </button>

            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* QUIZ */}
        {/* ========================================================= */}

        {stage === "quiz" && (
          <>
            <h1 className="case3-screen-title">
              QUICK QUIZ
            </h1>

            <div className="case3-subtitle">
              QUESTION {quizIndex + 1} OF{" "}
              {CASE3_QUIZ.length}
            </div>

            <div className="case3-card">

              <h2>
                {CASE3_QUIZ[quizIndex].question}
              </h2>

              {CASE3_QUIZ[quizIndex].options.map(
                (option, index) => (

                  <button
                    type="button"
                    className="case3-quiz-option"
                    key={option}
                    onClick={() =>
                      answerQuiz(index)
                    }
                  >
                    {String.fromCharCode(65 + index)}.{" "}
                    {option}
                  </button>

                ),
              )}

            </div>
          </>
        )}

        {/* ========================================================= */}
        {/* REWARD */}
        {/* ========================================================= */}

        {stage === "reward" && (
          <>

            <div className="case3-card case3-reward">

              <h1 className="case3-screen-title">
                🎉 MISSION COMPLETE
              </h1>

              <div className="case3-xp">
                +{CASE3_REWARD.xp} XP
              </div>

              <div className="case3-badge">

                🏅 BADGE UNLOCKED

                <br />

                {CASE3_REWARD.badge}

              </div>

              <div className="case3-success">

                QUIZ SCORE:{" "}
                {quizScore}/{CASE3_QUIZ.length}

                <br />

                LEVEL PROGRESS:{" "}
                {CASE3_REWARD.progress}

              </div>

              <button
                type="button"
                className="case3-button"
                onClick={completeCase}
              >
                COMPLETE CASE →
              </button>

            </div>

          </>
        )}

        {/* ========================================================= */}
        {/* HEADQUARTERS */}
        {/* ========================================================= */}

        {stage === "headquarters" && (
          <>

            <h1 className="case3-screen-title">
              BACK AT HEADQUARTERS
            </h1>

            <div className="case3-card">

              <div className="case3-mira">

                <div className="case3-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE3_HEADQUARTERS.map(
                  (line, index) => (
                    <div
                      key={`${line}-${index}`}
                    >
                      {line}
                    </div>
                  ),
                )}

              </div>

              <div className="case3-card">

                <div className="case3-label">
                  NEW CASE DETECTED
                </div>

                <h2>
                  A WORLD-FAMOUS ACTOR
                </h2>

                <p className="case3-text">
                  A perfectly realistic image of a
                  world-famous actor being arrested is
                  spreading online.
                </p>

                <div className="case3-warning">

                  "It never actually happened."

                  <br />
                  <br />

                  Yet millions of people believe it did.

                </div>

                <div className="case3-mira">

                  <div className="case3-mira-label">
                    COMMANDER MIRA
                  </div>

                  "This one worries me."

                  <br />
                  <br />

                  "Because..."

                  <br />
                  <br />

                  <strong>
                    "It never actually happened."
                  </strong>

                </div>

              </div>

            </div>

          </>
        )}

      </main>
    </div>
  );
}