import { useState } from "react";
import type { Verdict } from "../types";


interface Case7ScreenProps {
  onBack?: () => void;
  onVerdictFinal: (
    verdict: NonNullable<Verdict>,
    investigated: string[]
  ) => void;
}


type ToolId =
  | "url"
  | "website"
  | "whois"
  | "form"
  | "official"
  | "cyber";


const TOOLS: Array<{
  id: ToolId;
  label: string;
}> = [
  {
    id: "url",
    label: "URL INSPECTION",
  },
  {
    id: "website",
    label: "WEBSITE INSPECTION",
  },
  {
    id: "whois",
    label: "WHOIS REGISTRATION",
  },
  {
    id: "form",
    label: "FORM ANALYSIS",
  },
  {
    id: "official",
    label: "OFFICIAL VERIFICATION",
  },
  {
    id: "cyber",
    label: "CYBER CRIME DATABASE",
  },
];


const FINDINGS = [
  {
    id: "suspicious-url",
    text: "Suspicious URL and domain mismatch detected.",
  },
  {
    id: "urgency",
    text: "Artificial urgency is being used to pressure users.",
  },
  {
    id: "new-domain",
    text: "The website was registered only three days ago.",
  },
  {
    id: "sensitive-data",
    text: "The website requests highly sensitive information.",
  },
  {
    id: "official-mismatch",
    text: "No matching government announcement exists.",
  },
  {
    id: "phishing",
    text: "The website is confirmed as a phishing website.",
  },
];


const DECISIONS = [
  {
    id: "submit",
    text:
      "Submit your details quickly before the deadline.",
    correct: false,
  },
  {
    id: "share",
    text:
      "Share the link with family.",
    correct: false,
  },
  {
    id: "avoid",
    text:
      "Avoid entering personal information and verify only through official government websites.",
    correct: true,
  },
  {
    id: "ignore",
    text:
      "Ignore all government websites forever.",
    correct: false,
  },
];


export default function Case7Screen({
  onVerdictFinal,
  onBack,
}: Case7ScreenProps) {
  const [activeTool, setActiveTool] =
    useState<ToolId | null>(null);

  const [discovered, setDiscovered] =
    useState<string[]>([]);

  const [decision, setDecision] =
    useState<string | null>(null);

  const [completed, setCompleted] =
    useState(false);


  const addFinding = (
    findingId: string
  ) => {
    setDiscovered((previous) => {
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
    });
  };


  const submitDecision = () => {
    if (decision === null) {
      return;
    }

    const selected =
      DECISIONS.find(
        (item) =>
          item.id === decision
      );

    if (
      !selected ||
      !selected.correct
    ) {
      return;
    }

    setCompleted(true);

    const verdict =
      "REJECT" as NonNullable<Verdict>;

    onVerdictFinal(
      verdict,
      discovered
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
        color: "#c9b882",
      }}
    >
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
      <div className="max-w-6xl mx-auto space-y-8 pb-12">

        {/* =================================================
            HEADER
        ================================================= */}

        <section
          className="border p-6"
          style={{
            borderColor:
              "rgba(201,162,39,0.35)",
            backgroundColor:
              "rgba(3,5,12,0.8)",
          }}
        >
          <div
            style={{
              color: "#00e9ff",
              fontSize: "10px",
              letterSpacing:
                "0.25em",
            }}
          >
            CASE FILE 007
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
            THE PERFECT TRAP
          </h1>

          <div className="flex flex-wrap gap-3 mt-4">
            <span className="border px-3 py-1">
              ⭐⭐⭐⭐⭐ ADVANCED
            </span>

            <span className="border px-3 py-1">
              +400 XP
            </span>

            <span className="border px-3 py-1">
              🎣 SCAM SHIELD
            </span>
          </div>

          <p className="mt-5 max-w-3xl">
            How to identify phishing scams,
            fake websites, and fraudulent
            messages before clicking on them.
          </p>
        </section>


        {/* =================================================
            TRANSITION
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            TRANSITION FROM CASE 6
          </SectionTitle>

          <div className="mt-5 space-y-4">
            <p>
              A large digital map lights up.
            </p>

            <p>
              Red dots begin appearing across
              the country.
            </p>

            <p>
              One. Ten. Hundreds. Thousands.
            </p>

            <Dialogue
              speaker="LEO"
              text="These aren't misinformation posts."
            />

            <Dialogue
              speaker="COMMANDER MIRA"
              text="No. They're phishing attacks."
            />

            <div
              className="border p-4"
              style={{
                borderColor:
                  "#ff6666",
                color:
                  "#ffd966",
              }}
            >
              ₹18 Crore Lost This Month
              <br />
              12,000 Victims
            </div>

            <Dialogue
              speaker="COMMANDER MIRA"
              text="Sometimes people don't lose because they believe fake news. They lose because they trust the wrong website."
            />

            <div
              className="border p-4"
              style={{
                borderColor:
                  "#c9a227",
                color:
                  "#ffd966",
              }}
            >
              🔔 CASE FILE 007 RECEIVED
            </div>
          </div>
        </section>


        {/* =================================================
            MISSION BRIEFING
        ================================================= */}

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
                "28px",
            }}
          >
            THE PERFECT TRAP
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <InfoBox
              label="PRIORITY"
              value="🔴 CRITICAL"
            />

            <InfoBox
              label="THREAT LEVEL"
              value="SEVERE"
            />

            <InfoBox
              label="ESTIMATED VICTIMS"
              value="120,000 USERS"
            />
          </div>

          <div className="mt-6 space-y-3">
            <p>
              Thousands of citizens have
              received a message claiming they
              are eligible for a ₹50,000 Disaster
              Relief Payment.
            </p>

            <p>
              The website looks official.
            </p>

            <p>
              The logo looks genuine.
            </p>

            <p>
              The language sounds professional.
            </p>

            <p>
              People have already begun entering
              their banking details.
            </p>
          </div>
        </section>


        {/* =================================================
            SMS
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            EVIDENCE 01 — SMS RECEIVED
          </SectionTitle>

          <div
            className="border p-6 mt-5"
            style={{
              borderColor:
                "rgba(255,80,80,0.4)",
              background:
                "rgba(80,0,0,0.08)",
            }}
          >
            <div
              style={{
                color:
                  "#ffd966",
                fontWeight:
                  "bold",
              }}
            >
              From: GOV-RELIEF
            </div>

            <p className="mt-4">
              🎉 Congratulations!
            </p>

            <p className="mt-2">
              You have been selected to receive
              <strong>
                {" "}
                ₹50,000 Emergency Relief
                Assistance
              </strong>.
            </p>

            <p className="mt-2">
              Claim before midnight.
            </p>

            <p className="mt-2">
              Failure to respond will permanently
              cancel your payment.
            </p>

            <div
              className="border p-4 mt-5"
              style={{
                color:
                  "#ff7777",
              }}
            >
              www.relief-gov-india-support.in
            </div>
          </div>

          <Dialogue
            speaker="COMMANDER MIRA"
            text="Looks urgent. Looks official. Exactly how scammers want it."
          />
        </section>


        {/* =================================================
            COMMENTS
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            COMMUNITY COMMENTS
          </SectionTitle>

          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <CommentCard
              user="NEHA"
              text="I already submitted mine."
            />

            <CommentCard
              user="ROHIT"
              text="Got the money yet?"
            />

            <CommentCard
              user="AMIT"
              text="My parents also received this."
            />

            <CommentCard
              user="SANA"
              text="Is this real?"
            />
          </div>
        </section>


        {/* =================================================
            OBJECTIVE
        ================================================= */}

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
            Determine whether the message and
            website are genuine.
          </h2>
        </section>


        {/* =================================================
            TOOLS
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            INVESTIGATION TOOLS
          </SectionTitle>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() =>
                  setActiveTool(
                    tool.id
                  )
                }
                className="border p-4 text-left"
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
                }}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </section>


        {/* =================================================
            URL
        ================================================= */}

        {activeTool ===
          "url" && (
          <EvidencePanel
            title="URL INSPECTION"
          >
            <p>
              Suspicious website:
            </p>

            <div className="border p-4">
              www.relief-gov-india-support.in
            </div>

            <p>
              Official government portal:
            </p>

            <div className="border p-4">
              www.govrelief.gov
            </div>

            <p>
              The domains are different and
              the suspicious site uses extra
              words designed to look official.
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


        {/* =================================================
            WEBSITE
        ================================================= */}

        {activeTool ===
          "website" && (
          <EvidencePanel
            title="WEBSITE INSPECTION"
          >
            <p>
              The website contains:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="border p-3">
                Government logo
              </div>

              <div className="border p-3">
                National colors
              </div>

              <div className="border p-3">
                Professional layout
              </div>

              <div
                className="border p-3"
                style={{
                  color:
                    "#ff7777",
                }}
              >
                Countdown timer
              </div>
            </div>

            <Dialogue
              speaker="LEO"
              text="Pressure is one of a scammer's favorite tools."
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


        {/* =================================================
            WHOIS
        ================================================= */}

        {activeTool ===
          "whois" && (
          <EvidencePanel
            title="WHOIS REGISTRATION"
          >
            <HistoryCard
              title="REGISTRATION DETAILS"
              items={[
                "Website registered: Three days ago.",
                "Owner: Hidden.",
                "Country: Unknown.",
              ]}
            />

            <Dialogue
              speaker="COMMANDER MIRA"
              text="Would an official government portal appear only three days ago?"
            />

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


        {/* =================================================
            FORM
        ================================================= */}

        {activeTool ===
          "form" && (
          <EvidencePanel
            title="FORM ANALYSIS"
          >
            <p>
              The website requests:
            </p>

            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Full Name",
                "Phone Number",
                "Aadhaar Number",
                "Bank Account",
                "ATM PIN",
                "CVV",
                "OTP",
              ].map(
                (field) => (
                  <div
                    key={field}
                    className="border p-3"
                    style={{
                      borderColor:
                        field ===
                          "ATM PIN" ||
                        field ===
                          "CVV" ||
                        field ===
                          "OTP"
                          ? "#ff6666"
                          : "rgba(201,162,39,0.2)",
                    }}
                  >
                    {field}
                  </div>
                )
              )}
            </div>

            <Dialogue
              speaker="LEO"
              text="Stop. No legitimate organization asks for your ATM PIN or OTP."
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


        {/* =================================================
            OFFICIAL
        ================================================= */}

        {activeTool ===
          "official" && (
          <EvidencePanel
            title="OFFICIAL VERIFICATION"
          >
            <p>
              Player checks the official
              government portal.
            </p>

            <p>
              No such relief scheme exists.
            </p>

            <p>
              There is no matching official
              announcement.
            </p>

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


        {/* =================================================
            CYBER DATABASE
        ================================================= */}

        {activeTool ===
          "cyber" && (
          <EvidencePanel
            title="CYBER CRIME DATABASE"
          >
            <p>
              The cyber crime database lists
              the suspicious website as fraudulent.
            </p>

            <div
              className="border p-4"
              style={{
                borderColor:
                  "#ff6666",
                color:
                  "#ff7777",
              }}
            >
              CONFIRMED PHISHING WEBSITE
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


        {/* =================================================
            NOTEBOOK
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            DETECTIVE NOTEBOOK
          </SectionTitle>

          <div className="mt-5 space-y-3">
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
                    className="flex gap-3"
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


        {/* =================================================
            FINAL DECISION
        ================================================= */}

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
            What should you do?
          </h2>

          <div className="mt-5 space-y-3">
            {DECISIONS.map(
              (item) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  onClick={() =>
                    setDecision(
                      item.id
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
                      decision ===
                      item.id
                        ? "#c9a227"
                        : "rgba(201,162,39,0.2)",
                    background:
                      decision ===
                      item.id
                        ? "rgba(201,162,39,0.08)"
                        : "transparent",
                  }}
                >
                  {item.text}
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
            className="mt-6 border px-8 py-3"
            style={{
              borderColor:
                "#c9a227",
              color:
                "#ffd966",
              opacity:
                decision === null
                  ? 0.4
                  : 1,
            }}
          >
            SUBMIT FINAL DECISION
          </button>

          {completed && (
            <div
              className="mt-5 border p-5"
              style={{
                borderColor:
                  "#00e9ff",
              }}
            >
              <strong>
                INVESTIGATION COMPLETE
              </strong>

              <p className="mt-3">
                Avoid entering personal
                information and verify only
                through official government
                websites.
              </p>
            </div>
          )}
        </section>


        {/* =================================================
            WHAT YOU LEARNED
        ================================================= */}

        <section className="border p-6">
          <SectionTitle>
            WHAT YOU LEARNED
          </SectionTitle>

          <div className="mt-5 space-y-3">
            {[
              "Check the website URL carefully.",
              "Verify the scheme through official government or company websites.",
              "Never share OTPs, ATM PINs, CVV numbers, or passwords.",
              "Don't trust countdown timers or limited-time claims without verification.",
              "When unsure, use official contact details to verify the message.",
            ].map(
              (learning) => (
                <div
                  key={
                    learning
                  }
                  className="flex gap-3"
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


        {/* =================================================
            REWARD
        ================================================= */}

        {completed && (
          <section
            className="border p-6"
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
                color:
                  "#ffd966",
                fontSize:
                  "30px",
              }}
            >
              +400 XP
            </h2>

            <p className="mt-3">
              🎣 Badge Unlocked:
              {" "}
              <strong>
                Scam Shield
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
          color:
            "#00e9ff",
          fontSize:
            "9px",
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

      <div className="mt-3 space-y-2">
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
  children: React.ReactNode;
}) {
  return (
    <section
      className="border p-6"
      style={{
        borderColor:
          "rgba(0,233,255,0.25)",
      }}
    >
      <SectionTitle>
        {title}
      </SectionTitle>

      <div className="mt-5 space-y-3">
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
      onClick={onClick}
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
        className="block mt-1"
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