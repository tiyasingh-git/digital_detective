import React, { useState } from "react";

import {
  CASE4_INFO,
  CASE4_INTRO,
  CASE4_MISSION,
  CASE4_POST,
  CASE4_COMMENTS,
  CASE4_MISSION_OBJECTIVE,
  CASE4_TOOLS,
  CASE4_CLUES,
  CASE4_EVIDENCE,
  CASE4_FINAL_OPTIONS,
  CASE4_DEBRIEF,
  CASE4_LEARNED,
  CASE4_QUIZ,
  CASE4_REWARD,
  CASE4_HEADQUARTERS,
} from "../data/case4Data";

type Stage =
  | "briefing"
  | "investigation"
  | "decision"
  | "debrief"
  | "learn"
  | "quiz"
  | "reward"
  | "headquarters";

type Case4ScreenProps = {
  onBack?: () => void;
  onVerdictFinal?: (
    verdict: any,
    investigated: string[]
  ) => void;
};

export default function Case4Screen({
  onVerdictFinal,
  onBack,
}: Case4ScreenProps) {
  const [stage, setStage] = useState<Stage>("briefing");

  const [selectedTool, setSelectedTool] =
    useState<string | null>(null);

  const [checkedTools, setCheckedTools] =
    useState<string[]>([]);

  const [selectedDecision, setSelectedDecision] =
    useState<string | null>(null);

  const [quizIndex, setQuizIndex] = useState(0);

  const [quizScore, setQuizScore] = useState(0);

  const currentClue = selectedTool
    ? CASE4_CLUES[
        selectedTool as keyof typeof CASE4_CLUES
      ]
    : null;

  const investigate = (toolId: string) => {
    setSelectedTool(toolId);

    if (!checkedTools.includes(toolId)) {
      setCheckedTools((previous) => [
        ...previous,
        toolId,
      ]);
    }
  };

  const finishInvestigation = () => {
    setStage("decision");
    setSelectedTool(null);
  };

  const makeDecision = (decisionId: string) => {
    setSelectedDecision(decisionId);

    setStage("debrief");
  };

  const answerQuiz = (answerIndex: number) => {
    const currentQuestion =
      CASE4_QUIZ[quizIndex];

    const isCorrect =
      answerIndex === currentQuestion.answer;

    if (isCorrect) {
      setQuizScore((previous) => previous + 1);
    }

    if (
      quizIndex <
      CASE4_QUIZ.length - 1
    ) {
      setQuizIndex((previous) => previous + 1);
    } else {
      setStage("reward");
    }
  };

  const finishCase = () => {
    if (onVerdictFinal) {
      onVerdictFinal(
        {
          decision:
            selectedDecision ?? "verify",
          correct:
            selectedDecision === "verify",
        },
        checkedTools
      );
    }

    setStage("headquarters");
  };

  return (
    <div className="case4-page">
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
      <style>{`
        .case4-page {
          min-height: 100%;
          height: 100%;
          overflow-y: auto;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(201,162,39,.08),
              transparent 35%
            ),
            #07090f;
          color: #c9b882;
          font-family:
            "Courier Prime",
            "Courier New",
            monospace;
          letter-spacing: .04em;
          padding-bottom: 60px;
        }

        .case4-header {
          height: 76px;
          border-bottom:
            1px solid rgba(201,162,39,.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 34px;
          background:
            rgba(3,5,10,.94);
        }

        .case4-case-number {
          color: #ffd966;
          font-size: 13px;
          letter-spacing: .18em;
        }

        .case4-header-title {
          color: #ffd966;
          font-family: Georgia, serif;
          font-size: 24px;
          letter-spacing: .08em;
        }

        .case4-header-status {
          color: #00e9ff;
          font-size: 11px;
          letter-spacing: .15em;
        }

        .case4-content {
          width: min(
            1180px,
            calc(100% - 50px)
          );
          margin: 0 auto;
          padding: 42px 0 80px;
        }

        .case4-screen-title {
          color: #ffd966;
          font-family: Georgia, serif;
          font-size:
            clamp(28px, 4vw, 48px);
          margin: 0 0 10px;
          letter-spacing: .08em;
        }

        .case4-subtitle {
          color:
            rgba(201,162,39,.65);
          font-size: 12px;
          letter-spacing: .18em;
          margin-bottom: 34px;
        }

        .case4-card {
          border:
            1px solid rgba(201,162,39,.25);
          background:
            rgba(9,12,20,.9);
          padding: 28px;
          box-shadow:
            0 0 35px rgba(0,0,0,.3);
          margin-bottom: 22px;
        }

        .case4-card h2 {
          margin-top: 0;
          color: #ffd966;
          font-family: Georgia, serif;
          letter-spacing: .07em;
        }

        .case4-card h3 {
          color: #ffd966;
          font-family: Georgia, serif;
        }

        .case4-text {
          color: #ddd4b9;
          line-height: 1.9;
          font-size: 14px;
        }

        .case4-mira {
          border-left:
            3px solid #00e9ff;
          padding: 18px 22px;
          background:
            rgba(0,233,255,.025);
          margin: 20px 0;
          color: #ddd4b9;
          line-height: 1.9;
        }

        .case4-mira-label {
          color: #00e9ff;
          font-size: 11px;
          letter-spacing: .2em;
          margin-bottom: 8px;
        }

        .case4-stats {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 12px;
          margin: 25px 0;
        }

        .case4-stat {
          border:
            1px solid rgba(201,162,39,.2);
          padding: 18px;
          background:
            rgba(201,162,39,.025);
        }

        .case4-stat-label {
          display: block;
          color:
            rgba(201,162,39,.55);
          font-size: 10px;
          margin-bottom: 8px;
        }

        .case4-stat-value {
          color: #ffd966;
          font-size: 14px;
        }

        .case4-post {
          width: min(600px, 100%);
          margin: 25px auto;
          border:
            1px solid rgba(201,162,39,.28);
          padding: 24px;
          background: #0a0d15;
        }

        .case4-post-label {
          color:
            rgba(201,162,39,.5);
          font-size: 10px;
          letter-spacing: .15em;
          margin-bottom: 18px;
        }

        .case4-post-headline {
          color: #f4ead1;
          font-family: Georgia, serif;
          font-size: 24px;
          line-height: 1.3;
          margin: 15px 0;
        }

        .case4-post-body {
          color: #c9b882;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .case4-engagement {
          border-top:
            1px solid rgba(201,162,39,.15);
          padding-top: 15px;
          color:
            rgba(201,162,39,.7);
          font-size: 11px;
          line-height: 2;
        }

        .case4-comments {
          width: min(600px, 100%);
          margin: 20px auto;
        }

        .case4-comment {
          border-bottom:
            1px solid rgba(201,162,39,.12);
          padding: 13px 0;
        }

        .case4-comment-name {
          color: #ffd966;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .case4-comment-text {
          color: #aaa38f;
          font-size: 12px;
          line-height: 1.6;
        }

        .case4-tools {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 12px;
          margin: 25px 0;
        }

        .case4-tool {
          min-height: 100px;
          border:
            1px solid rgba(201,162,39,.25);
          background: #090c13;
          color: #c9b882;
          cursor: pointer;
          padding: 15px;
          font-family: inherit;
          text-align: left;
          transition: .2s ease;
        }

        .case4-tool:hover {
          border-color: #ffd966;
          transform: translateY(-2px);
        }

        .case4-tool.selected {
          border-color: #ffd966;
          background:
            rgba(201,162,39,.09);
        }

        .case4-tool.checked {
          box-shadow:
            inset 0 -3px #00ff6a;
        }

        .case4-tool-symbol {
          display: block;
          font-size: 20px;
          margin-bottom: 13px;
        }

        .case4-tool-title {
          font-size: 10px;
          line-height: 1.5;
        }

        .case4-investigation {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 20px;
        }

        .case4-clue-panel {
          min-height: 380px;
        }

        .case4-label {
          color:
            rgba(201,162,39,.55);
          font-size: 10px;
          letter-spacing: .18em;
          margin-bottom: 10px;
        }

        .case4-warning {
          border:
            1px solid rgba(231,76,60,.3);
          background:
            rgba(231,76,60,.05);
          color: #e88c82;
          padding: 15px;
          margin-top: 20px;
          line-height: 1.7;
          font-size: 12px;
        }

        .case4-success {
          border:
            1px solid rgba(0,255,106,.25);
          background:
            rgba(0,255,106,.04);
          color: #63e59a;
          padding: 15px;
          margin-top: 20px;
          font-size: 12px;
          line-height: 1.7;
        }

        .case4-comparison {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 12px;
          margin-top: 20px;
        }

        .case4-comparison div {
          border:
            1px solid rgba(201,162,39,.2);
          padding: 15px;
        }

        .case4-comparison span {
          display: block;
          color:
            rgba(201,162,39,.5);
          font-size: 9px;
          margin-bottom: 8px;
        }

        .case4-comparison strong {
          color: #ffd966;
          font-size: 12px;
        }

        .case4-stamp {
          color: #00ff6a;
          font-size: 10px;
          letter-spacing: .15em;
          margin-bottom: 15px;
        }

        .case4-official {
          border:
            1px solid rgba(0,255,106,.25);
          padding: 20px;
          background:
            rgba(0,255,106,.025);
          line-height: 1.8;
        }

        .case4-source-list > div {
          display: flex;
          flex-direction: column;
          gap: 7px;
          border-bottom:
            1px solid rgba(201,162,39,.12);
          padding: 14px 0;
        }

        .case4-source-list span {
          color:
            rgba(201,162,39,.5);
          font-size: 9px;
        }

        .case4-source-list strong {
          color: #d9d2bd;
          font-size: 12px;
        }

        .case4-credibility-list {
          line-height: 2.2;
          color: #d9d2bd;
          font-size: 12px;
        }

        .case4-ai-score {
          text-align: center;
          border:
            1px solid rgba(231,76,60,.3);
          padding: 25px;
          margin: 20px 0;
          background:
            rgba(231,76,60,.04);
        }

        .case4-ai-number {
          color: #ff8175;
          font-family: Georgia, serif;
          font-size: 52px;
        }

        .case4-ai-caption {
          color:
            rgba(231,76,60,.8);
          font-size: 11px;
          letter-spacing: .16em;
        }

        .case4-evidence {
          margin-top: 20px;
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 10px;
        }

        .case4-evidence-item {
          border:
            1px solid rgba(201,162,39,.15);
          padding: 13px;
          font-size: 11px;
          color: #c9b882;
        }

        .case4-button {
          border:
            1px solid #c9a227;
          background:
            rgba(201,162,39,.08);
          color: #ffd966;
          padding: 14px 25px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: .12em;
          font-size: 11px;
          margin-top: 20px;
        }

        .case4-button:hover {
          background:
            rgba(201,162,39,.16);
        }

        .case4-decision {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 15px;
          margin-top: 25px;
        }

        .case4-decision-button {
          border:
            1px solid rgba(201,162,39,.25);
          background: #090c13;
          color: #d9d2bd;
          padding: 22px;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          font-size: 12px;
          line-height: 1.6;
        }

        .case4-decision-button:hover {
          border-color: #ffd966;
        }

        .case4-quiz-option {
          display: block;
          width: 100%;
          border:
            1px solid rgba(201,162,39,.2);
          background: #090c13;
          color: #d9d2bd;
          padding: 18px;
          margin: 10px 0;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
        }

        .case4-quiz-option:hover {
          border-color: #ffd966;
        }

        .case4-reward {
          text-align: center;
          padding: 60px 20px;
        }

        .case4-xp {
          font-size: 42px;
          color: #ffd966;
          font-family: Georgia, serif;
          margin: 25px 0;
        }

        .case4-badge {
          font-size: 24px;
          color: #00e9ff;
          margin: 25px 0;
        }

        .case4-back {
          border:
            1px solid rgba(201,162,39,.25);
          background: transparent;
          color: #c9b882;
          padding: 10px 18px;
          cursor: pointer;
          font-family: inherit;
          margin-bottom: 25px;
        }

        @media (max-width: 850px) {
          .case4-tools {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .case4-investigation {
            grid-template-columns: 1fr;
          }

          .case4-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .case4-content {
            width: calc(100% - 25px);
          }

          .case4-header {
            padding: 0 15px;
          }

          .case4-decision,
          .case4-evidence,
          .case4-comparison {
            grid-template-columns: 1fr;
          }

          .case4-tools {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="case4-header">
        <div>
          <div className="case4-case-number">
            CASE FILE 004
          </div>

          <div className="case4-header-title">
            THE PERFECT FAKE
          </div>
        </div>

        <div className="case4-header-status">
          ● ACTIVE INVESTIGATION
        </div>
      </header>

      <main className="case4-content">
        {stage !== "briefing" && (
          <button
            type="button"
            className="case4-back"
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
              } else if (stage === "reward") {
                setStage("quiz");
              } else if (
                stage === "headquarters"
              ) {
                setStage("reward");
              }
            }}
          >
            ← BACK
          </button>
        )}

        {stage === "briefing" && (
          <>
            <h1 className="case4-screen-title">
              {CASE4_INFO.title}
            </h1>

            <div className="case4-subtitle">
              CASE FILE 004 ·{" "}
              {CASE4_INFO.difficulty}
            </div>

            <div className="case4-card">
              <h2>
                BACK AT DIGITAL GUARDIANS
                HEADQUARTERS
              </h2>

              <div className="case4-mira">
                <div className="case4-mira-label">
                  ANALYST LEO
                </div>

                {CASE4_INTRO.leo.map(
                  (line) => (
                    <div key={line}>
                      "{line}"
                    </div>
                  )
                )}
              </div>

              <div className="case4-mira">
                <div className="case4-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE4_INTRO.mira.map(
                  (line) => (
                    <div key={line}>
                      "{line}"
                    </div>
                  )
                )}
              </div>

              <div className="case4-card">
                <h2>
                  🔔 CASE FILE 004 RECEIVED
                </h2>

                <div className="case4-stats">
                  <div className="case4-stat">
                    <span className="case4-stat-label">
                      PRIORITY
                    </span>

                    <span className="case4-stat-value">
                      {CASE4_MISSION.priority}
                    </span>
                  </div>

                  <div className="case4-stat">
                    <span className="case4-stat-label">
                      THREAT LEVEL
                    </span>

                    <span className="case4-stat-value">
                      {CASE4_MISSION.threatLevel}
                    </span>
                  </div>

                  <div className="case4-stat">
                    <span className="case4-stat-label">
                      ESTIMATED REACH
                    </span>

                    <span className="case4-stat-value">
                      {CASE4_MISSION.reach}
                    </span>
                  </div>
                </div>

                <p className="case4-text">
                  {CASE4_MISSION.description}
                </p>

                {CASE4_MISSION.details.map(
                  (detail) => (
                    <p
                      className="case4-text"
                      key={detail}
                    >
                      {detail}
                    </p>
                  )
                )}

                <div className="case4-mira">
                  <div className="case4-mira-label">
                    MISSION OBJECTIVE
                  </div>

                  <strong>
                    {CASE4_MISSION.objective}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="case4-button"
                onClick={() =>
                  setStage("investigation")
                }
              >
                BEGIN INVESTIGATION →
              </button>
            </div>
          </>
        )}

        {stage === "investigation" && (
          <>
            <h1 className="case4-screen-title">
              INVESTIGATION
            </h1>

            <div className="case4-subtitle">
              {CASE4_MISSION_OBJECTIVE}
            </div>

            <div className="case4-card">
              <div className="case4-label">
                EXHIBIT 01 · VIRAL SOCIAL MEDIA
                POST
              </div>

              <div className="case4-post">
                <div className="case4-post-label">
                  🚨 BREAKING
                </div>

                <div className="case4-post-headline">
                  {CASE4_POST.headline}
                </div>

                <div className="case4-post-body">
                  {CASE4_POST.body.map(
                    (line) => (
                      <div key={line}>
                        {line}
                      </div>
                    )
                  )}
                </div>

                <div className="case4-engagement">
                  {CASE4_POST.engagement.likes}
                  <br />
                  {CASE4_POST.engagement.shares}
                  <br />
                  {CASE4_POST.engagement.comments}
                </div>
              </div>

              <div className="case4-comments">
                <div className="case4-label">
                  COMMENTS
                </div>

                {CASE4_COMMENTS.map(
                  (comment) => (
                    <div
                      className="case4-comment"
                      key={comment.name}
                    >
                      <div className="case4-comment-name">
                        {comment.name}
                      </div>

                      <div className="case4-comment-text">
                        {comment.text}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="case4-mira">
                <div className="case4-mira-label">
                  COMMANDER MIRA
                </div>

                "Don't investigate the
                comments."
                <br />
                <br />
                <strong>
                  "Investigate the evidence."
                </strong>
              </div>
            </div>

            <div className="case4-card">
              <h2>
                INVESTIGATION TOOLS
              </h2>

              <div className="case4-tools">
                {CASE4_TOOLS.map(
                  (tool) => (
                    <button
                      type="button"
                      key={tool.id}
                      className={`case4-tool ${
                        selectedTool ===
                        tool.id
                          ? "selected"
                          : ""
                      } ${
                        checkedTools.includes(
                          tool.id
                        )
                          ? "checked"
                          : ""
                      }`}
                      onClick={() =>
                        investigate(
                          tool.id
                        )
                      }
                    >
                      <span
                        className="case4-tool-symbol"
                        style={{
                          color:
                            tool.color,
                        }}
                      >
                        {tool.symbol}
                      </span>

                      <span className="case4-tool-title">
                        {tool.title}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>

            {currentClue && (
              <div className="case4-investigation">
                <div className="case4-card case4-clue-panel">
                  <div className="case4-label">
                    INVESTIGATION RESULT
                  </div>

                  <h2>
                    {currentClue.title}
                  </h2>

                  {currentClue.content}

                  <div className="case4-mira">
                    <div className="case4-mira-label">
                      COMMANDER MIRA
                    </div>

                    {currentClue.mentor}
                  </div>

                  <div className="case4-success">
                    ✓ NOTEBOOK UPDATED
                    <br />
                    {currentClue.notebook}
                  </div>
                </div>

                <div className="case4-card">
                  <div className="case4-label">
                    EVIDENCE COLLECTED
                  </div>

                  <div className="case4-evidence">
                    {CASE4_EVIDENCE.map(
                      (item) => (
                        <div
                          className="case4-evidence-item"
                          key={item}
                        >
                          ✓ {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {checkedTools.length ===
              CASE4_TOOLS.length && (
              <button
                type="button"
                className="case4-button"
                onClick={
                  finishInvestigation
                }
              >
                COMPLETE INVESTIGATION →
              </button>
            )}
          </>
        )}

        {stage === "decision" && (
          <>
            <h1 className="case4-screen-title">
              FINAL DECISION
            </h1>

            <div className="case4-subtitle">
              WHAT SHOULD YOU DO?
            </div>

            <div className="case4-card">
              <div className="case4-mira">
                <div className="case4-mira-label">
                  COMMANDER MIRA
                </div>

                "You've investigated the
                image, the available reporting,
                visual details, metadata, and AI
                detection results."
                <br />
                <br />
                "Now make your decision."
              </div>

              <div className="case4-decision">
                {CASE4_FINAL_OPTIONS.map(
                  (option) => (
                    <button
                      type="button"
                      key={option.id}
                      className="case4-decision-button"
                      onClick={() =>
                        makeDecision(
                          option.id
                        )
                      }
                    >
                      {option.text}
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}

        {stage === "debrief" && (
          <>
            <h1 className="case4-screen-title">
              MISSION DEBRIEF
            </h1>

            <div className="case4-card">
              {selectedDecision ===
              "verify" ? (
                <div className="case4-success">
                  ✓ CORRECT DECISION
                  <br />
                  Verify the image through
                  trusted and independent
                  sources before believing or
                  sharing it.
                </div>
              ) : (
                <div className="case4-warning">
                  ⚠ NOT THE BEST DECISION
                  <br />
                  The evidence showed multiple
                  reasons to question the
                  authenticity of the image.
                </div>
              )}

              <div className="case4-mira">
                <div className="case4-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE4_DEBRIEF.map(
                  (line) => (
                    <div key={line}>
                      {line}
                    </div>
                  )
                )}
              </div>

              <button
                type="button"
                className="case4-button"
                onClick={() =>
                  setStage("learn")
                }
              >
                CONTINUE →
              </button>
            </div>
          </>
        )}

        {stage === "learn" && (
          <>
            <h1 className="case4-screen-title">
              WHAT YOU LEARNED
            </h1>

            <div className="case4-subtitle">
              AI INVESTIGATOR · MIL SKILL
            </div>

            <div className="case4-card">
              {CASE4_LEARNED.map(
                (item) => (
                  <div
                    className="case4-evidence-item"
                    key={item}
                  >
                    ✓ {item}
                  </div>
                )
              )}

              <div className="case4-mira">
                <div className="case4-mira-label">
                  REMEMBER
                </div>

                Always combine multiple pieces
                of evidence before making a
                decision.
              </div>

              <button
                type="button"
                className="case4-button"
                onClick={() =>
                  setStage("quiz")
                }
              >
                TAKE QUICK QUIZ →
              </button>
            </div>
          </>
        )}

        {stage === "quiz" && (
          <>
            <h1 className="case4-screen-title">
              QUICK QUIZ
            </h1>

            <div className="case4-subtitle">
              QUESTION{" "}
              {quizIndex + 1} OF{" "}
              {CASE4_QUIZ.length}
            </div>

            <div className="case4-card">
              <h2>
                {
                  CASE4_QUIZ[
                    quizIndex
                  ].question
                }
              </h2>

              {CASE4_QUIZ[
                quizIndex
              ].options.map(
                (
                  option,
                  index
                ) => (
                  <button
                    type="button"
                    className="case4-quiz-option"
                    key={option}
                    onClick={() =>
                      answerQuiz(
                        index
                      )
                    }
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                    . {option}
                  </button>
                )
              )}
            </div>
          </>
        )}

        {stage === "reward" && (
          <>
            <div className="case4-card case4-reward">
              <h1 className="case4-screen-title">
                🎉 MISSION COMPLETE
              </h1>

              <div className="case4-xp">
                +{CASE4_REWARD.xp} XP
              </div>

              <div className="case4-badge">
                🏅 BADGE UNLOCKED
                <br />
                {CASE4_REWARD.badge}
              </div>

              <div className="case4-success">
                QUIZ SCORE:{" "}
                {quizScore}/
                {CASE4_QUIZ.length}
                <br />
                LEVEL PROGRESS:{" "}
                {CASE4_REWARD.progress}
              </div>

              <button
                type="button"
                className="case4-button"
                onClick={finishCase}
              >
                CONTINUE →
              </button>
            </div>
          </>
        )}

        {stage === "headquarters" && (
          <>
            <h1 className="case4-screen-title">
              BACK AT HEADQUARTERS
            </h1>

            <div className="case4-card">
              <div className="case4-mira">
                <div className="case4-mira-label">
                  COMMANDER MIRA
                </div>

                {CASE4_HEADQUARTERS.map(
                  (line) => (
                    <div key={line}>
                      {line}
                    </div>
                  )
                )}
              </div>

              <div className="case4-card">
                <div className="case4-label">
                  🔔 CASE FILE 005
                  INCOMING
                </div>

                <h2>
                  THE VOICE THAT NEVER SPOKE
                </h2>

                <p className="case4-text">
                  A famous world leader
                  appears to announce a
                  shocking new policy.
                </p>

                <div className="case4-warning">
                  The official office denies
                  that the speech ever
                  happened.
                </div>

                <div className="case4-mira">
                  <div className="case4-mira-label">
                    COMMANDER MIRA
                  </div>

                  "Today's challenge was a
                  fake image."
                  <br />
                  <br />
                  "Tomorrow's challenge..."
                  <br />
                  <br />
                  <strong>
                    "can talk."
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