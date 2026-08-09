import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  CASE2_INFO,
  CASE2_POST,
  CASE2_ELEMENTS,
  CASE2_TOOLS,
  getCase2Finding,
  type Case2Tool,
} from "../data/case2Data";

type Verdict = "TRUST" | "VERIFY" | "REJECT" | "REPORT";

export function Case2Screen({
  onVerdictFinal,
}: {
  onVerdictFinal: (
    verdict: Verdict,
    investigated: string[]
  ) => void;
}) {
  const [activeTool, setActiveTool] =
    useState<Case2Tool | null>(null);

  const [selectedElement, setSelectedElement] =
    useState<string | null>(null);

  const [investigated, setInvestigated] = useState<string[]>([]);

  const [showStamp, setShowStamp] =
    useState<Verdict | null>(null);

  const selectedPost = CASE2_ELEMENTS.find(
    (element) => element.id === selectedElement
  );

  const markInvestigated = (id: string) => {
    setInvestigated((previous) =>
      previous.includes(id)
        ? previous
        : [...previous, id]
    );

    setSelectedElement(null);
  };

  const selectElement = (id: string) => {
    setSelectedElement(
      selectedElement === id ? null : id
    );
  };

  const handleVerdict = (verdict: Verdict) => {
    setShowStamp(verdict);
  };

  const finishVerdict = () => {
    if (!showStamp) return;

    onVerdictFinal(
      showStamp,
      investigated
    );
  };

  const renderElement = (
    element: (typeof CASE2_ELEMENTS)[number]
  ) => {
    const selected =
      selectedElement === element.id;

    const done =
      investigated.includes(element.id);

    return (
      <span
        key={element.id}
        onClick={(event) => {
          event.stopPropagation();
          selectElement(element.id);
        }}
        style={{
          cursor: "pointer",
          padding: "0 3px",
          color: selected
            ? "#ffd966"
            : done
            ? "#c9a227"
            : "#c2baa0",

          backgroundColor: selected
            ? "rgba(201,162,39,0.16)"
            : done
            ? "rgba(201,162,39,0.06)"
            : "transparent",

          border: selected
            ? "1px solid rgba(201,162,39,0.45)"
            : "1px solid transparent",

          transition:
            "background-color 0.15s, color 0.15s",
        }}
      >
        {element.content}

        {done && (
          <span
            style={{
              fontSize: "7px",
              color: "#c9a227",
              verticalAlign: "super",
              marginLeft: "3px",
            }}
          >
            ✓
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: "#07090f",
        color: "#c9b882",
        fontFamily: "Courier Prime, monospace",
      }}
    >
      {/* MAIN INVESTIGATION AREA */}

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}

        <div
          style={{
            width: "220px",
            flexShrink: 0,
            borderRight:
              "1px solid rgba(201,162,39,0.2)",
          }}
          className="flex flex-col"
        >
          <div
            style={{
              padding: "9px 12px 8px",
              borderBottom:
                "1px solid rgba(201,162,39,0.14)",
            }}
          >
            <div
              style={{
                fontSize: "8px",
                color:
                  "rgba(201,162,39,0.45)",
                letterSpacing: "0.22em",
              }}
            >
              CASE FILE
            </div>

            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "12px",
                color: "#ffd966",
                letterSpacing: "0.1em",
              }}
            >
              OBSERVATIONS
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto"
            style={{
              padding: "8px",
            }}
          >
            {investigated.length === 0 ? (
              <div
                style={{
                  padding: "16px 8px",
                  textAlign: "center",
                  fontSize: "8px",
                  color:
                    "rgba(201,162,39,0.28)",
                  letterSpacing: "0.12em",
                  lineHeight: 1.9,
                }}
              >
                SELECT AN ELEMENT
                <br />
                IN THE POST TO BEGIN
                <br />
                INVESTIGATION
              </div>
            ) : (
              <div
                className="flex flex-col"
                style={{ gap: "5px" }}
              >
                {investigated.map((id) => {
                  const element =
                    CASE2_ELEMENTS.find(
                      (item) => item.id === id
                    );

                  if (!element) return null;

                  const importanceColor =
                    element.importance === "HIGH"
                      ? "#e74c3c"
                      : element.importance ===
                        "MED"
                      ? "#c9a227"
                      : "#6b5f42";

                  return (
                    <div
                      key={id}
                      style={{
                        border:
                          "1px solid rgba(201,162,39,0.14)",
                        padding:
                          "7px 8px",
                        backgroundColor:
                          "rgba(201,162,39,0.03)",
                      }}
                    >
                      <div
                        className="flex items-center justify-between"
                        style={{
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "7.5px",
                            color:
                              "rgba(201,162,39,0.45)",
                            letterSpacing:
                              "0.14em",
                          }}
                        >
                          {element.tag}
                        </span>

                        <span
                          style={{
                            fontSize: "7px",
                            color:
                              importanceColor,
                          }}
                        >
                          {element.importance}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "8.5px",
                          color: "#c9b882",
                          lineHeight: 1.5,
                        }}
                      >
                        {element.content.length >
                        42
                          ? element.content.slice(
                              0,
                              42
                            ) + "…"
                          : element.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            style={{
              padding:
                "8px 12px 10px",
              borderTop:
                "1px solid rgba(201,162,39,0.14)",
            }}
          >
            <div
              className="flex justify-between"
              style={{
                marginBottom: "5px",
                fontSize: "7.5px",
                color:
                  "rgba(201,162,39,0.4)",
                letterSpacing: "0.14em",
              }}
            >
              <span>
                ELEMENTS CHECKED
              </span>

              <span>
                {investigated.length}/
                {CASE2_ELEMENTS.length}
              </span>
            </div>

            <div
              style={{
                height: "3px",
                backgroundColor:
                  "rgba(201,162,39,0.12)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${
                    (investigated.length /
                      CASE2_ELEMENTS.length) *
                    100
                  }%`,
                  backgroundColor:
                    "#c9a227",
                  transition:
                    "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* CENTER */}

        <div className="flex-1 flex flex-col overflow-hidden">

          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              borderBottom:
                "1px solid rgba(201,162,39,0.2)",
            }}
          >
            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "22px",
                color: "#ffd966",
                letterSpacing: "0.09em",
              }}
            >
              {CASE2_INFO.exhibit}
            </div>

            <div
              style={{
                fontSize: "9.5px",
                color: "#c9b882",
                letterSpacing: "0.15em",
              }}
            >
              CASE {CASE2_INFO.caseId} ·{" "}
              {CASE2_INFO.category}
            </div>
          </div>

          <div
            className="flex-1 relative overflow-hidden"
            onClick={() =>
              setSelectedElement(null)
            }
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,#06080e 0%,#090a18 50%,#06080e 100%)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                backgroundColor:
                  "rgba(5,8,18,0.35)",
              }}
            />

            {/* EXHIBIT LABEL */}

            <div
              className="absolute top-3 left-3"
              style={{
                fontSize: "10px",
                color: "#ffd966",
                letterSpacing: "0.12em",
              }}
            >
              [EXHIBIT-02 ·{" "}
              {CASE2_INFO.account} ·{" "}
              {CASE2_INFO.time} · PORT WATCH]
            </div>

            {/* SOCIAL POST */}

            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                padding: "20px",
              }}
            >
              <div
                onClick={(event) =>
                  event.stopPropagation()
                }
                style={{
                  backgroundColor:
                    "rgba(11,13,22,0.94)",
                  border:
                    "1px solid rgba(201,162,39,0.14)",
                  padding:
                    "18px 20px",
                  maxWidth: "400px",
                  width: "100%",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.65)",
                }}
              >
                {/* ACCOUNT */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    marginBottom: "13px",
                    paddingBottom: "10px",
                    borderBottom:
                      "1px solid rgba(201,162,39,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      border:
                        "1px solid rgba(201,162,39,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      backgroundColor:
                        "rgba(201,162,39,0.07)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          "Special Elite, serif",
                        color: "#c9a227",
                      }}
                    >
                      H
                    </span>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "10.5px",
                        color: "#d0c8a8",
                      }}
                    >
                      {renderElement(
                        CASE2_ELEMENTS.find(
                          (item) =>
                            item.id ===
                            "source"
                        )!
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: "7.5px",
                        color:
                          "rgba(201,162,39,0.3)",
                        marginTop: "2px",
                      }}
                    >
                      PORT WATCH ·
                      INDEPENDENT FEED
                    </div>
                  </div>
                </div>

                {/* HEADLINE */}

                <div
                  style={{
                    fontFamily:
                      "Special Elite, serif",
                    fontSize: "17px",
                    color: "#ece4cc",
                    lineHeight: 1.3,
                    marginBottom: "14px",
                  }}
                >
                  {renderElement(
                    CASE2_ELEMENTS.find(
                      (item) =>
                        item.id ===
                        "headline"
                    )!
                  )}
                </div>

                {/* CLAIMS */}

                <div
                  style={{
                    fontSize: "10px",
                    color: "#c2baa0",
                    lineHeight: 2,
                    marginBottom: "12px",
                  }}
                >
                  {[
                    "claim-1",
                    "claim-2",
                    "claim-3",
                    "claim-4",
                  ].map((id) => {
                    const element =
                      CASE2_ELEMENTS.find(
                        (item) =>
                          item.id === id
                      );

                    if (!element)
                      return null;

                    return (
                      <div
                        key={id}
                        style={{
                          display: "flex",
                          gap: "7px",
                        }}
                      >
                        <span
                          style={{
                            color:
                              "rgba(201,162,39,0.35)",
                          }}
                        >
                          ◆
                        </span>

                        {renderElement(
                          element
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}

                <div
                  style={{
                    fontSize: "10.5px",
                    color: "#cfc8a8",
                    fontStyle: "italic",
                    marginBottom: "13px",
                  }}
                >
                  {renderElement(
                    CASE2_ELEMENTS.find(
                      (item) =>
                        item.id === "cta"
                    )!
                  )}
                </div>

                {/* ENGAGEMENT */}

                <div
                  style={{
                    borderTop:
                      "1px solid rgba(201,162,39,0.08)",
                    paddingTop: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "9px",
                      color:
                        "rgba(201,162,39,0.45)",
                      marginBottom: "8px",
                    }}
                  >
                    ♥{" "}
                    {renderElement(
                      CASE2_ELEMENTS.find(
                        (item) =>
                          item.id ===
                          "engagement"
                      )!
                    )}
                  </div>

                  {/* COMMENT */}

                  <div
                    style={{
                      fontSize: "9px",
                      color:
                        "rgba(196,188,165,0.6)",
                      borderLeft:
                        "2px solid rgba(201,162,39,0.16)",
                      paddingLeft: "8px",
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      style={{
                        color:
                          "rgba(201,162,39,0.3)",
                      }}
                    >
                      user_comment:{" "}
                    </span>

                    “
                    {renderElement(
                      CASE2_ELEMENTS.find(
                        (item) =>
                          item.id ===
                          "comment"
                      )!
                    )}
                    ”
                  </div>
                </div>
              </div>
            </div>

            {/* TOOL OVERLAY */}

            {activeTool && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border:
                    "1px solid rgba(201,162,39,0.12)",
                }}
              >
                <div
                  className="absolute top-4 right-4"
                  style={{
                    fontSize: "9px",
                    color:
                      CASE2_TOOLS.find(
                        (tool) =>
                          tool.id ===
                          activeTool
                      )?.color,
                    border:
                      "1px solid rgba(201,162,39,0.25)",
                    padding:
                      "7px 10px",
                    backgroundColor:
                      "rgba(7,9,15,0.85)",
                    lineHeight: 1.8,
                  }}
                >
                  {getCase2Finding(
                    activeTool,
                    selectedElement
                  )}
                </div>
              </div>
            )}

            <div
              className="absolute bottom-3 right-3"
              style={{
                fontSize: "9.5px",
                color: "#a89968",
              }}
            >
              MAGNIFICATION ACTIVE ·
              MOVE TO INSPECT
            </div>
          </div>

          {/* SELECTED ELEMENT ACTIONS */}

          <AnimatePresence mode="wait">
            {selectedPost ? (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                style={{
                  borderTop:
                    "1px solid rgba(201,162,39,0.35)",
                  backgroundColor:
                    "rgba(201,162,39,0.07)",
                  overflow: "hidden",
                }}
              >
                <div
                  className="px-4 py-2"
                >
                  <div
                    style={{
                      fontSize: "7.5px",
                      color:
                        "rgba(201,162,39,0.45)",
                      letterSpacing:
                        "0.22em",
                      marginBottom: "5px",
                    }}
                  >
                    SELECTED:{" "}
                    {selectedPost.content
                      .toUpperCase()
                      .slice(0, 55)}
                  </div>

                  <div className="flex flex-col">
                    {selectedPost.directions.map(
                      (direction, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            markInvestigated(
                              selectedPost.id
                            )
                          }
                          style={{
                            fontFamily:
                              "Courier Prime, monospace",
                            fontSize: "9px",
                            color: "#c9b882",
                            background:
                              "none",
                            border: "none",
                            cursor:
                              "pointer",
                            textAlign:
                              "left",
                            padding:
                              "2px 0",
                          }}
                        >
                          <span
                            style={{
                              color:
                                "rgba(201,162,39,0.4)",
                              marginRight:
                                "7px",
                            }}
                          >
                            {index + 1}.
                          </span>

                          {direction}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ) : activeTool ? (
              <div
                style={{
                  borderTop:
                    "1px solid rgba(201,162,39,0.2)",
                  backgroundColor:
                    "rgba(201,162,39,0.04)",
                  padding:
                    "10px 16px",
                  fontSize: "9px",
                  color:
                    CASE2_TOOLS.find(
                      (tool) =>
                        tool.id ===
                        activeTool
                    )?.color,
                }}
              >
                {getCase2Finding(
                  activeTool,
                  null
                )}
              </div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* RIGHT TOOL PANEL */}

        <div
          style={{
            width: "220px",
            flexShrink: 0,
            borderLeft:
              "1px solid rgba(201,162,39,0.2)",
          }}
          className="flex flex-col"
        >
          <div
            className="px-3 py-2"
            style={{
              borderBottom:
                "1px solid rgba(201,162,39,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                letterSpacing:
                  "0.25em",
                color: "#e6d9ac",
              }}
            >
              INVESTIGATOR&apos;S KIT
            </div>
          </div>

          <div
            className="flex flex-col gap-2 p-2 flex-1"
          >
            {CASE2_TOOLS.map(
              (tool) => {
                const active =
                  activeTool ===
                  tool.id;

                return (
                  <button
                    key={tool.id}
                    onClick={() =>
                      setActiveTool(
                        active
                          ? null
                          : tool.id
                      )
                    }
                    className="text-left"
                    style={{
                      border: `1px solid ${
                        active
                          ? tool.color
                          : "rgba(201,162,39,0.22)"
                      }`,
                      backgroundColor:
                        active
                          ? `${tool.color}10`
                          : "rgba(8,10,18,0.8)",
                      padding:
                        "9px 10px",
                      cursor:
                        "pointer",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          fontSize: "9px",
                          color:
                            tool.color,
                        }}
                      >
                        {tool.symbol}
                      </span>

                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing:
                            "0.12em",
                          color: active
                            ? tool.color
                            : "#d8c88a",
                        }}
                      >
                        {tool.label}
                      </span>
                    </div>

                    {active && (
                      <div
                        style={{
                          fontSize: "9px",
                          color:
                            tool.color,
                          lineHeight: 1.7,
                          marginTop:
                            "6px",
                        }}
                      >
                        {getCase2Finding(
                          tool.id,
                          selectedElement
                        )}
                      </div>
                    )}
                  </button>
                );
              }
            )}
          </div>

          <div
            className="p-3"
            style={{
              borderTop:
                "1px solid rgba(201,162,39,0.18)",
            }}
          >
            <div
              style={{
                fontSize: "9.5px",
                color: "#a89968",
                lineHeight: 1.8,
                letterSpacing:
                  "0.12em",
              }}
            >
              CASE NO.{" "}
              {CASE2_INFO.caseId}
              <br />
              DETECTIVE: R. CHEN
              <br />
              STATUS: ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* VERDICT BAR */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          height: "90px",
          flexShrink: 0,
          borderTop:
            "1px solid rgba(201,162,39,0.25)",
        }}
      >
        {(
          [
            ["TRUST", "#00ff6a"],
            ["VERIFY", "#f59e0b"],
            ["REJECT", "#ef4444"],
            ["REPORT", "#00e9ff"],
          ] as const
        ).map(
          ([label, color]) => (
            <button
              key={label}
              onClick={() =>
                handleVerdict(label)
              }
              style={{
                backgroundColor:
                  "#07090f",
                border: "none",
                borderRight:
                  "1px solid rgba(201,162,39,0.14)",
                cursor: "pointer",
                color,
                fontFamily:
                  "Special Elite, serif",
                fontSize: "25px",
                letterSpacing:
                  "0.12em",
              }}
            >
              <div>{label}</div>

              <div
                style={{
                  fontFamily:
                    "Courier Prime, monospace",
                  fontSize: "8px",
                  color: "#b8a878",
                  marginTop:
                    "8px",
                  letterSpacing:
                    "0.18em",
                }}
              >
                STAMP TO RECORD
              </div>
            </button>
          )
        )}
      </div>

      {/* VERDICT CONFIRMATION */}

      <AnimatePresence>
        {showStamp && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              zIndex: 500,
              backgroundColor:
                "rgba(3,5,12,0.88)",
            }}
          >
            <motion.div
              initial={{
                scale: 0.85,
                rotate: -4,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              style={{
                border: `2px solid ${
                  showStamp ===
                  "TRUST"
                    ? "#00ff6a"
                    : showStamp ===
                      "VERIFY"
                    ? "#f59e0b"
                    : showStamp ===
                      "REJECT"
                    ? "#ef4444"
                    : "#00e9ff"
                }`,
                padding:
                  "35px 55px",
                textAlign:
                  "center",
                backgroundColor:
                  "#07090f",
                boxShadow:
                  "0 0 40px rgba(201,162,39,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily:
                    "Special Elite, serif",
                  fontSize: "48px",
                  color:
                    showStamp ===
                    "TRUST"
                      ? "#00ff6a"
                      : showStamp ===
                        "VERIFY"
                      ? "#f59e0b"
                      : showStamp ===
                        "REJECT"
                      ? "#ef4444"
                      : "#00e9ff",
                  letterSpacing:
                    "0.12em",
                }}
              >
                {showStamp}
              </div>

              <div
                style={{
                  marginTop:
                    "10px",
                  fontSize:
                    "10px",
                  color:
                    "#b8a878",
                  letterSpacing:
                    "0.16em",
                }}
              >
                RECORD THIS VERDICT?
              </div>

              <div
                className="flex gap-3 justify-center"
                style={{
                  marginTop:
                    "25px",
                }}
              >
                <button
                  onClick={
                    finishVerdict
                  }
                  style={{
                    border:
                      "1px solid #c9a227",
                    background:
                      "transparent",
                    color:
                      "#ffd966",
                    padding:
                      "8px 18px",
                    cursor:
                      "pointer",
                    fontFamily:
                      "Courier Prime, monospace",
                  }}
                >
                  CONFIRM
                </button>

                <button
                  onClick={() =>
                    setShowStamp(
                      null
                    )
                  }
                  style={{
                    border:
                      "1px solid rgba(201,162,39,0.3)",
                    background:
                      "transparent",
                    color:
                      "#8c805d",
                    padding:
                      "8px 18px",
                    cursor:
                      "pointer",
                    fontFamily:
                      "Courier Prime, monospace",
                  }}
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}