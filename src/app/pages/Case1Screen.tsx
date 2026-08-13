import { useState } from "react";
const [showComments, setShowComments] = useState(false);
import type { Verdict } from "../types";

type Case1ScreenProps = {
  onVerdictFinal: (
    verdict: NonNullable<Verdict>,
    investigated: string[]
  ) => void;
};

type EvidenceItem = {
  id: number;
  title: string;
  tool: string;
  finding: string;
};

const EVIDENCE: EvidenceItem[] = [
  {
    id: 1,
    title: "SOURCE CHECKER",
    tool: "SOURCE VERIFICATION",
    finding:
      "The account @NaturalHealthSecrets has no listed medical credentials and provides no reliable scientific source for the seven-day cure claim.",
  },
  {
    id: 2,
    title: "SCIENTIFIC EVIDENCE",
    tool: "RESEARCH AUDIT",
    finding:
      "No credible clinical study or published research supports the claim that diabetes can be completely cured in seven days using the method described in the post.",
  },
  {
    id: 3,
    title: "MEDICAL ORGANIZATION REPORTS",
    tool: "MEDICAL SOURCE CHECK",
    finding:
      "Trusted medical information does not support the viral claim that diabetes can simply be completely cured in seven days using the promoted method.",
  },
  {
    id: 4,
    title: "FACT-CHECK ARCHIVE",
    tool: "FACT-CHECK REVIEW",
    finding:
      "Similar viral health claims repeatedly use dramatic phrases such as doctors are hiding the truth, companies are hiding information, and guaranteed results without providing reliable evidence.",
  },
  {
    id: 5,
    title: "COMMENT ANALYSIS",
    tool: "TESTIMONIAL REVIEW",
    finding:
      "The comments contain personal stories and reactions, but none provide reliable medical evidence. Personal testimonials cannot establish that a treatment works for everyone.",
  },
];

const VERDICTS: {
  id: NonNullable<Verdict>;
  label: string;
  description: string;
}[] = [
  {
    id: "TRUST",
    label: "TRUST",
    description:
      "Accept the claim as reliable medical information.",
  },
  {
    id: "VERIFY",
    label: "VERIFY",
    description:
      "Continue verification before deciding whether the claim is reliable.",
  },
  {
    id: "REJECT",
    label: "REJECT",
    description:
      "Reject the claim as unsupported by reliable evidence.",
  },
  {
    id: "REPORT",
    label: "REPORT",
    description:
      "Report the post because of the potential harm caused by the unsupported health claim.",
  },
];

export default function Case1Screen({
  onVerdictFinal,
}: Case1ScreenProps) {
  const [selectedEvidence, setSelectedEvidence] =
    useState<number | null>(null);

  const [investigated, setInvestigated] =
    useState<string[]>([]);

  const [showDecision, setShowDecision] =
    useState(false);

  const [selectedVerdict, setSelectedVerdict] =
    useState<NonNullable<Verdict> | null>(null);

  const [showDebrief, setShowDebrief] =
    useState(false);

  const investigate = (item: EvidenceItem) => {
    setSelectedEvidence(item.id);

    setInvestigated((previous) =>
      previous.includes(item.title)
        ? previous
        : [...previous, item.title]
    );
  };

  const submitVerdict = () => {
    if (!selectedVerdict) {
      return;
    }

    setShowDebrief(true);
  };

  const finishCase = () => {
    if (!selectedVerdict) {
      return;
    }

    onVerdictFinal(
      selectedVerdict,
      investigated
    );
  };

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{
        backgroundColor: "#07090f",
        color: "#c9b882",
        fontFamily: "Courier Prime, monospace",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "28px 24px 80px",
        }}
      >
        {/* =================================================
            CASE HEADER
        ================================================= */}

        <section
          style={{
            borderBottom:
              "1px solid rgba(201,162,39,0.25)",
            paddingBottom: "24px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color:
                "rgba(201,162,39,0.5)",
              marginBottom: "8px",
            }}
          >
            CASE FILE 001 · HIGH PRIORITY
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily:
                "Special Elite, serif",
              fontSize: "clamp(30px, 5vw, 52px)",
              color: "#ffd966",
              letterSpacing: "0.08em",
              lineHeight: 1.1,
            }}
          >
            THE MIRACLE CURE
          </h1>

          <div
            style={{
              marginTop: "10px",
              fontSize: "11px",
              letterSpacing: "0.14em",
              color: "#00e9ff",
            }}
          >
            SOURCE VERIFICATION · HEALTH
            MISINFORMATION
          </div>
        </section>

        {/* =================================================
            MISSION BRIEF
        ================================================= */}

        <section
          style={{
            border:
              "1px solid rgba(201,162,39,0.22)",
            backgroundColor:
              "rgba(201,162,39,0.035)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color:
                "rgba(201,162,39,0.5)",
              marginBottom: "10px",
            }}
          >
            MISSION BRIEFING
          </div>

          <p style={paragraphStyle}>
            A viral Instagram account is claiming
            that diabetes can be completely cured
            in just seven days using a special
            natural method.
          </p>

          <p style={paragraphStyle}>
            The post has received hundreds of
            thousands of likes, and some users are
            saying they plan to change their health
            decisions because of it.
          </p>

          <p style={paragraphStyle}>
            Your mission:
          </p>

          <div
            style={{
              borderLeft:
                "2px solid #c9a227",
              paddingLeft: "14px",
              color: "#ffd966",
              fontFamily:
                "Special Elite, serif",
              fontSize: "20px",
              lineHeight: 1.5,
            }}
          >
            Find the source. Check the evidence.
            Verify the claim.
          </div>
        </section>

        {/* =================================================
            VIRAL POST
        ================================================= */}

        <section
          style={{
            border:
              "1px solid rgba(201,162,39,0.22)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <SectionLabel>
            EVIDENCE 01 · VIRAL INSTAGRAM POST
          </SectionLabel>

          <div
            style={{
              border:
                "1px solid rgba(201,162,39,0.16)",
              backgroundColor:
                "rgba(7,9,15,0.8)",
              padding: "18px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#e74c3c",
                letterSpacing: "0.08em",
                marginBottom: "12px",
              }}
            >
              🚨 DOCTORS DON'T WANT YOU TO
              KNOW THIS!
            </div>

            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "clamp(24px, 4vw, 38px)",
                color: "#ffd966",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              DIABETES CAN BE CURED IN JUST
              7 DAYS!
            </div>

            <p style={paragraphStyle}>
              A new natural method can supposedly
              restore your body's ability to control
              blood sugar.
            </p>

            <p style={paragraphStyle}>
              No medication. No injections. No
              expensive treatment.
            </p>

            <p style={paragraphStyle}>
              Just follow this simple 7-day routine!
            </p>

            <p
              style={{
                ...paragraphStyle,
                color: "#e74c3c",
              }}
            >
              "Doctors are hiding the truth!"
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "8px",
                marginTop: "18px",
              }}
            >
              {[
                ["LIKES", "387K"],
                ["SHARES", "742K"],
                ["COMMENTS", "96K"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    border:
                      "1px solid rgba(201,162,39,0.14)",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.15em",
                      color:
                        "rgba(201,162,39,0.45)",
                    }}
                  >
                    {label}
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      color: "#c9b882",
                      marginTop: "4px",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            COMMENTS
        ================================================= */}

        <section
          style={{
            border:
              "1px solid rgba(201,162,39,0.18)",
            padding: "18px",
            marginBottom: "24px",
          }}
        >
          <SectionLabel>
            COMMUNITY COMMENTS
          </SectionLabel>

          {[
            [
              "Riya",
              "My uncle has diabetes. I'm sending this to him right now!",
            ],
            [
              "Arjun",
              "Finally! A natural solution.",
            ],
            [
              "Meera",
              "Has anyone actually tried this?",
            ],
            [
              "HealthWarrior99",
              "Big pharmaceutical companies don't want people to know about this.",
            ],
          ].map(([name, comment]) => (
            <div
              key={name}
              style={{
                padding: "12px 0",
                borderBottom:
                  "1px solid rgba(201,162,39,0.1)",
              }}
            >
              <div
                style={{
                  color: "#ffd966",
                  fontSize: "10px",
                  marginBottom: "5px",
                }}
              >
                {name}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  lineHeight: 1.6,
                  color: "#c9b882",
                }}
              >
                "{comment}"
              </div>
            </div>
          ))}
        </section>

        {/* =================================================
            INVESTIGATION
        ================================================= */}

        <section style={{ marginBottom: "24px" }}>
          <SectionLabel>
            INVESTIGATION TOOLS
          </SectionLabel>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "12px",
            }}
          >
            {EVIDENCE.map((item) => {
              const selected =
                selectedEvidence === item.id;

              const completed =
                investigated.includes(
                  item.title
                );

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    investigate(item)
                  }
                  style={{
                    textAlign: "left",
                    border: `1px solid ${
                      selected
                        ? "#c9a227"
                        : "rgba(201,162,39,0.18)"
                    }`,
                    backgroundColor: selected
                      ? "rgba(201,162,39,0.08)"
                      : "rgba(7,9,15,0.7)",
                    padding: "16px",
                    cursor: "pointer",
                    color: "#c9b882",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#ffd966",
                        letterSpacing:
                          "0.12em",
                      }}
                    >
                      {String(item.id).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {completed && (
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#00ff6a",
                        }}
                      >
                        ✓ INVESTIGATED
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      fontFamily:
                        "Special Elite, serif",
                      fontSize: "18px",
                      color: "#c9b882",
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      marginTop: "7px",
                      fontSize: "8px",
                      letterSpacing:
                        "0.13em",
                      color:
                        "rgba(201,162,39,0.5)",
                    }}
                  >
                    {item.tool}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =================================================
            SELECTED FINDING
        ================================================= */}

        {selectedEvidence !== null && (
          <section
            style={{
              border:
                "1px solid rgba(0,233,255,0.2)",
              backgroundColor:
                "rgba(0,233,255,0.025)",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            {(() => {
              const item =
                EVIDENCE.find(
                  (entry) =>
                    entry.id ===
                    selectedEvidence
                );

              if (!item) {
                return null;
              }

              return (
                <>
                  <div
                    style={{
                      color: "#00e9ff",
                      fontSize: "9px",
                      letterSpacing:
                        "0.16em",
                      marginBottom: "10px",
                    }}
                  >
                    INVESTIGATION RESULT ·{" "}
                    {item.tool}
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "Special Elite, serif",
                      fontSize: "23px",
                      color: "#ffd966",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      lineHeight: 1.8,
                      color: "#c9b882",
                    }}
                  >
                    {item.finding}
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* =================================================
            NOTEBOOK
        ================================================= */}

        <section
          style={{
            border:
              "1px solid rgba(201,162,39,0.18)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <SectionLabel>
            DETECTIVE NOTEBOOK
          </SectionLabel>

          <div
            style={{
              display: "grid",
              gap: "8px",
            }}
          >
            {[
              "Account has no medical credentials.",
              "No credible scientific studies support the claim.",
              "Trusted medical information does not support the seven-day cure.",
              "The post uses emotional and secretive language.",
              "Testimonials do not prove the medical claim.",
            ].map((finding) => (
              <div
                key={finding}
                style={{
                  fontSize: "11px",
                  lineHeight: 1.6,
                  color: "#c9b882",
                }}
              >
                <span
                  style={{
                    color: "#00ff6a",
                    marginRight: "8px",
                  }}
                >
                  ✓
                </span>
                {finding}
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            DECISION
        ================================================= */}

        {!showDecision && (
          <button
            type="button"
            onClick={() =>
              setShowDecision(true)
            }
            disabled={
              investigated.length === 0
            }
            style={{
              width: "100%",
              padding: "15px",
              border:
                "1px solid #c9a227",
              backgroundColor:
                investigated.length > 0
                  ? "rgba(201,162,39,0.08)"
                  : "rgba(201,162,39,0.02)",
              color:
                investigated.length > 0
                  ? "#ffd966"
                  : "rgba(201,162,39,0.3)",
              fontFamily:
                "Courier Prime, monospace",
              fontSize: "10px",
              letterSpacing: "0.16em",
              cursor:
                investigated.length > 0
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            {investigated.length > 0
              ? "PROCEED TO FINAL DECISION"
              : "INVESTIGATE EVIDENCE FIRST"}
          </button>
        )}

        {showDecision && !showDebrief && (
          <section
            style={{
              border:
                "1px solid rgba(201,162,39,0.3)",
              padding: "22px",
              marginTop: "20px",
            }}
          >
            <SectionLabel>
              FINAL DECISION
            </SectionLabel>

            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "24px",
                color: "#ffd966",
                marginBottom: "18px",
              }}
            >
              What should you conclude?
            </div>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {VERDICTS.map((verdict) => (
                <button
                  key={verdict.id}
                  type="button"
                  onClick={() =>
                    setSelectedVerdict(
                      verdict.id
                    )
                  }
                  style={{
                    textAlign: "left",
                    padding: "14px",
                    border: `1px solid ${
                      selectedVerdict ===
                      verdict.id
                        ? "#c9a227"
                        : "rgba(201,162,39,0.18)"
                    }`,
                    backgroundColor:
                      selectedVerdict ===
                      verdict.id
                        ? "rgba(201,162,39,0.1)"
                        : "transparent",
                    color: "#c9b882",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      color: "#ffd966",
                      fontSize: "11px",
                      letterSpacing:
                        "0.12em",
                    }}
                  >
                    {verdict.label}
                  </div>

                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "10px",
                      lineHeight: 1.5,
                    }}
                  >
                    {verdict.description}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={submitVerdict}
              disabled={
                selectedVerdict === null
              }
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "14px",
                border:
                  "1px solid #c9a227",
                backgroundColor:
                  selectedVerdict
                    ? "#c9a227"
                    : "transparent",
                color:
                  selectedVerdict
                    ? "#07090f"
                    : "rgba(201,162,39,0.3)",
                fontFamily:
                  "Courier Prime, monospace",
                fontSize: "10px",
                letterSpacing:
                  "0.15em",
                cursor:
                  selectedVerdict
                    ? "pointer"
                    : "not-allowed",
              }}
            >
              SUBMIT FINAL VERDICT
            </button>
          </section>
        )}

        {/* =================================================
            DEBRIEF
        ================================================= */}

        {showDebrief && (
          <section
            style={{
              border:
                "1px solid rgba(0,255,106,0.25)",
              backgroundColor:
                "rgba(0,255,106,0.025)",
              padding: "22px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                color: "#00ff6a",
                fontSize: "10px",
                letterSpacing:
                  "0.18em",
                marginBottom: "12px",
              }}
            >
              MISSION DEBRIEF
            </div>

            <div
              style={{
                fontFamily:
                  "Special Elite, serif",
                fontSize: "25px",
                color: "#ffd966",
                marginBottom: "14px",
              }}
            >
              {selectedVerdict ===
              "REJECT"
                ? "Excellent work, Detective."
                : "Investigation Complete."}
            </div>

            <p style={paragraphStyle}>
              The post looked convincing because
              it used confidence, popularity, and
              emotional language.
            </p>

            <p style={paragraphStyle}>
              But when we investigated the source,
              there was no reliable evidence behind
              the claim.
            </p>

            <div
              style={{
                borderLeft:
                  "2px solid #c9a227",
                paddingLeft: "14px",
                margin: "18px 0",
                color: "#ffd966",
                fontFamily:
                  "Special Elite, serif",
                fontSize: "19px",
                lineHeight: 1.5,
              }}
            >
              "A viral claim is still just a claim
              until reliable evidence supports it."
            </div>

            <div
              style={{
                borderTop:
                  "1px solid rgba(201,162,39,0.15)",
                paddingTop: "18px",
                marginTop: "18px",
              }}
            >
              <div
                style={{
                  color: "#00ff6a",
                  fontSize: "11px",
                  marginBottom: "10px",
                }}
              >
                +100 XP
              </div>

              <div
                style={{
                  color: "#ffd966",
                  fontFamily:
                    "Special Elite, serif",
                  fontSize: "21px",
                }}
              >
                🏅 HEALTH FACT CHECKER
              </div>
            </div>

            <button
              type="button"
              onClick={finishCase}
              style={{
                width: "100%",
                marginTop: "22px",
                padding: "15px",
                border:
                  "1px solid #c9a227",
                backgroundColor:
                  "#c9a227",
                color: "#07090f",
                fontFamily:
                  "Courier Prime, monospace",
                fontSize: "10px",
                letterSpacing:
                  "0.16em",
                cursor: "pointer",
              }}
            >
              COMPLETE CASE 001
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontSize: "9px",
        letterSpacing: "0.18em",
        color: "rgba(201,162,39,0.5)",
        marginBottom: "12px",
      }}
    >
      {children}
    </div>
  );
}

const paragraphStyle: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: 1.8,
  color: "#c9b882",
  margin: "0 0 12px",
};