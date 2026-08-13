import { useState } from "react";

import type {
  CaseRecord,
  CaseStatus,
} from "../types";

import {
  CASES_CATALOG,
  INITIAL_CASES,
} from "../data/casesData";


type CaseSelectScreenProps = {
  cases: CaseRecord[];
  onSelect: (
    caseId: string,
    resume: boolean
  ) => void;
  onBrief: (
    caseId: string
  ) => void;
  onBack: () => void;
};


export function CaseSelectScreen({
  cases,
  onSelect,
  onBrief,
  onBack,
}: CaseSelectScreenProps) {

  const [
    shakingId,
    setShakingId,
  ] = useState<string | null>(null);


  /* =========================================================
     BUILD DISPLAY CASES
     
     This merges the current saved case state with the
     complete CASES_CATALOG.

     Therefore, even if localStorage only contains Cases 1–5,
     Cases 6–8 will still appear here.
  ========================================================= */

  const displayCases: CaseRecord[] =
    CASES_CATALOG.map(
      (catalogCase) => {

        const savedCase =
          cases.find(
            (record) =>
              record.caseId ===
              catalogCase.caseId
          );

        if (savedCase) {
          return savedCase;
        }

        const initialCase =
          INITIAL_CASES.find(
            (record) =>
              record.caseId ===
              catalogCase.caseId
          );

        if (initialCase) {
          return initialCase;
        }

        return {
          caseId:
            catalogCase.caseId,
          status:
            "available",
          lastScreen:
            "main-menu",
          verdictsGiven: [],
          wallSelection:
            null,
          timeRemainingSec:
            847,
          finalVerdict:
            null,
          notebookNotes:
            "",
          discoveredFindings:
            [],
        };
      }
    );


  /* =========================================================
     CARD CLICK
  ========================================================= */

  const handleCardClick = (
    caseRecord: CaseRecord
  ) => {

    if (
      caseRecord.status ===
      "locked"
    ) {
      setShakingId(
        caseRecord.caseId
      );

      window.setTimeout(
        () => {
          setShakingId(null);
        },
        400
      );

      return;
    }


    if (
      caseRecord.status ===
      "in-progress"
    ) {
      onSelect(
        caseRecord.caseId,
        true
      );

      return;
    }


    if (
      caseRecord.status ===
      "available"
    ) {
      onBrief(
        caseRecord.caseId
      );

      return;
    }


    onSelect(
      caseRecord.caseId,
      true
    );
  };


  /* =========================================================
     STATUS COLOR
  ========================================================= */

  const statusColor = (
    status: CaseStatus
  ): string => {

    switch (status) {

      case "in-progress":
        return "#00e9ff";

      case "closed-solved":
        return "#00ff6a";

      case "closed-cold":
        return "#e74c3c";

      case "available":
        return "#c9a227";

      default:
        return "#3a3428";
    }
  };


  /* =========================================================
     STATUS LABEL
  ========================================================= */

  const statusLabel = (
    status: CaseStatus
  ): string => {

    switch (status) {

      case "available":
        return "AVAILABLE";

      case "in-progress":
        return "IN PROGRESS";

      case "closed-solved":
        return "CLOSED · SOLVED";

      case "closed-cold":
        return "CLOSED · COLD";

      default:
        return "LOCKED";
    }
  };


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        absolute
        inset-0
        flex
        flex-col
      "
      style={{
        background:
          "linear-gradient(135deg,#191008 0%,#140e06 100%)",
      }}
    >

      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          pointer-events-none
        "
        style={{
          backgroundImage:
            "radial-gradient(circle 1px at 17px 17px, rgba(201,162,39,0.05) 0, transparent 0)",
          backgroundSize:
            "17px 17px",
        }}
      />


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          relative
          flex
          items-center
          gap-4
          px-5
          py-3
        "
        style={{
          borderBottom:
            "1px solid rgba(201,162,39,0.18)",
          backgroundColor:
            "rgba(7,9,15,0.65)",
        }}
      >

        <button
          type="button"
          onClick={onBack}
          style={{
            fontFamily:
              "Special Elite, serif",
            fontSize:
              "20px",
            letterSpacing:
              "0.15em",
            color:
              "#c9a227",
            border:
              "1px solid rgba(201,162,39,0.4)",
            backgroundColor:
              "transparent",
            padding:
              "5px 14px",
            cursor:
              "pointer",
          }}
          onMouseEnter={(
            event
          ) => {
            event.currentTarget.style.textShadow =
              "0 0 12px rgba(201,162,39,0.7)";
          }}
          onMouseLeave={(
            event
          ) => {
            event.currentTarget.style.textShadow =
              "none";
          }}
        >
          ← BUREAU
        </button>


        <div>
          <div
            style={{
              fontFamily:
                "Special Elite, serif",
              fontSize:
                "20px",
              color:
                "#ffd966",
              letterSpacing:
                "0.08em",
            }}
          >
            SELECT CASE FILE
          </div>

          <div
            style={{
              fontFamily:
                "Courier Prime, monospace",
              fontSize:
                "9.5px",
              color:
                "#b8a878",
              letterSpacing:
                "0.18em",
            }}
          >
            OPEN A NEW INVESTIGATION OR REVIEW
            CLOSED FILES
          </div>
        </div>

      </div>


      {/* =====================================================
          CASE GRID
      ===================================================== */}

      <div
        className="
          relative
          flex-1
          overflow-y-auto
          p-8
          flex
          flex-wrap
          gap-5
          content-start
          justify-center
        "
        style={{
          scrollbarWidth:
            "thin",
        }}
      >

        {displayCases.map(
          (
            caseRecord,
            index
          ) => {

            const meta =
              CASES_CATALOG.find(
                (catalogCase) =>
                  catalogCase.caseId ===
                  caseRecord.caseId
              );

            if (!meta) {
              return null;
            }


            const locked =
              caseRecord.status ===
              "locked";


            const rotation =
              ((index * 5 + 2) % 7) -
              3;


            const currentColor =
              statusColor(
                caseRecord.status
              );


            return (
              <div
                key={
                  caseRecord.caseId
                }
                className={
                  shakingId ===
                  caseRecord.caseId
                    ? "card-shake"
                    : ""
                }
                onClick={() =>
                  handleCardClick(
                    caseRecord
                  )
                }
                style={{
                  cursor:
                    locked
                      ? "not-allowed"
                      : "pointer",
                }}
              >

                {/* =================================================
                    CASE CARD
                ================================================= */}

                <div
                  style={{
                    width:
                      "200px",

                    minHeight:
                      "190px",

                    display:
                      "flex",

                    flexDirection:
                      "column",

                    backgroundColor:
                      locked
                        ? "#0d0e14"
                        : "#e2cfae",

                    padding:
                      "14px 12px 18px",

                    transform:
                      `rotate(${rotation}deg)`,

                    boxShadow:
                      locked
                        ? "2px 4px 14px rgba(0,0,0,0.7)"
                        : "3px 5px 16px rgba(0,0,0,0.65)",

                    position:
                      "relative",

                    border:
                      locked
                        ? "1px solid rgba(201,162,39,0.12)"
                        : "none",

                    transition:
                      "transform 0.15s, box-shadow 0.15s",
                  }}

                  onMouseEnter={(
                    event
                  ) => {

                    if (!locked) {

                      event.currentTarget.style.transform =
                        "rotate(0deg) scale(1.04)";

                      event.currentTarget.style.boxShadow =
                        "4px 6px 22px rgba(0,0,0,0.8)";
                    }
                  }}

                  onMouseLeave={(
                    event
                  ) => {

                    if (!locked) {

                      event.currentTarget.style.transform =
                        `rotate(${rotation}deg) scale(1)`;

                      event.currentTarget.style.boxShadow =
                        "3px 5px 16px rgba(0,0,0,0.65)";
                    }
                  }}
                >

                  {/* =================================================
                      PIN
                  ================================================= */}

                  <div
                    style={{
                      position:
                        "absolute",
                      top:
                        "-7px",
                      left:
                        "50%",
                      transform:
                        "translateX(-50%)",
                      width:
                        "8px",
                      height:
                        "8px",
                      borderRadius:
                        "50%",
                      backgroundColor:
                        currentColor,
                      boxShadow:
                        `0 0 5px ${currentColor}80`,
                    }}
                  />


                  {/* =================================================
                      CLASSIFIED OVERLAY
                  ================================================= */}

                  {locked && (
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <div
                        style={{
                          transform:
                            "rotate(-20deg)",
                          fontFamily:
                            "Special Elite, serif",
                          fontSize:
                            "20px",
                          color:
                            "#e74c3c",
                          border:
                            "2px solid #e74c3c",
                          padding:
                            "4px 10px",
                          opacity:
                            0.55,
                          letterSpacing:
                            "0.2em",
                        }}
                      >
                        CLASSIFIED
                      </div>
                    </div>
                  )}


                  {/* =================================================
                      CASE ID
                  ================================================= */}

                  <div
                    style={{
                      fontFamily:
                        "Courier Prime, monospace",
                      fontSize:
                        "9.5px",
                      color:
                        locked
                          ? "rgba(201,162,39,0.3)"
                          : "#5a3a1a",
                      letterSpacing:
                        "0.1em",
                      marginBottom:
                        "4px",
                    }}
                  >
                    {
                      caseRecord.caseId
                    }
                  </div>


                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <div
                    style={{
                      fontFamily:
                        "Special Elite, serif",
                      fontSize:
                        locked
                          ? "12px"
                          : "13px",
                      color:
                        locked
                          ? "rgba(201,162,39,0.2)"
                          : "#1a1005",
                      letterSpacing:
                        "0.05em",
                      lineHeight:
                        1.3,
                      marginBottom:
                        "6px",
                    }}
                  >
                    {locked
                      ? "CLASSIFIED"
                      : meta.title}
                  </div>


                  {/* =================================================
                      TEASER
                  ================================================= */}

                  {!locked &&
                    meta.teaser && (
                      <div
                        style={{
                          fontFamily:
                            "Caveat, cursive",
                          fontSize:
                            "20px",
                          color:
                            "#5a3a1a",
                          lineHeight:
                            1.5,
                          marginBottom:
                            "8px",
                        }}
                      >
                        {
                          meta.teaser
                        }
                      </div>
                    )}


                  {/* =================================================
                      LOCKED TEXT
                  ================================================= */}

                  {locked && (
                    <div
                      style={{
                        fontFamily:
                          "Courier Prime, monospace",
                        fontSize:
                          "9px",
                        color:
                          "rgba(201,162,39,0.2)",
                        lineHeight:
                          1.5,
                      }}
                    >
                      SOLVE PRIOR CASE
                      <br />
                      TO UNLOCK
                    </div>
                  )}


                  {/* =================================================
                      STATUS
                  ================================================= */}

                  <div
                    style={{
                      marginTop:
                        "auto",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap:
                        "5px",
                    }}
                  >

                    <div
                      style={{
                        width:
                          "6px",
                        height:
                          "6px",
                        borderRadius:
                          "50%",
                        backgroundColor:
                          currentColor,
                        flexShrink:
                          0,
                      }}
                    />

                    <span
                      style={{
                        fontFamily:
                          "Courier Prime, monospace",
                        fontSize:
                          "9px",
                        color:
                          locked
                            ? "rgba(201,162,39,0.25)"
                            : "#5a3a1a",
                        letterSpacing:
                          "0.1em",
                      }}
                    >
                      {statusLabel(
                        caseRecord.status
                      )}
                    </span>

                  </div>

                </div>
              </div>
            );
          }
        )}

      </div>

    </div>
  );
}