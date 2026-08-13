import type { CaseRecord } from "../types";


/* =========================================================
   CASE CATALOG
========================================================= */

export const CASES_CATALOG = [
  {
    caseId: "2024-1147",
    title: "THE MIRACLE CURE",
    teaser:
      "A viral health claim promises to cure diabetes in seven days. The post is popular — but where is the evidence?",
  },

  {
    caseId: "2024-0891",
    title: "YESTERDAY'S DISASTER",
    teaser:
      "A real photograph is spreading as today's disaster. The image is genuine — but the context may be wrong.",
  },

  {
    caseId: "2023-1204",
    title: "THE HEADLINE TRAP",
    teaser:
      "A viral headline claims every school has been banned indefinitely. The truth is buried beyond the first sentence.",
  },

  {
    caseId: "2024-1389",
    title: "THE PERFECT FAKE",
    teaser:
      "A shocking image of a famous scientist spreads across the internet. It looks real — but did the event ever happen?",
  },

  {
    caseId: "2024-1501",
    title: "THE VOICE THAT NEVER SPOKE",
    teaser:
      "A viral video appears to show a mayor announcing dangerous water contamination. The footage looks real — but the voice never belonged to him.",
  },

  {
    caseId: "2024-1502",
    title: "THE TWISTED NUMBERS",
    teaser:
      "A viral crime graph claims that crime has doubled. The numbers are real — but the way they are presented may be misleading.",
  },

  {
    caseId: "2024-1607",
    title: "THE PERFECT TRAP",
    teaser:
      "A convincing government relief message leads users to a suspicious website. The page looks official — but is it?",
  },

  {
    caseId: "2024-1708",
    title: "THE INVISIBLE BUBBLE",
    teaser:
      "Two people see completely different versions of the same story. Investigate how algorithms and confirmation bias shape their feeds.",
  },
];


/* =========================================================
   INITIAL CASE STATE
========================================================= */

export const INITIAL_CASES: CaseRecord[] = [
  {
    caseId: "2024-1147",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-0891",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2023-1204",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-1389",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-1501",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-1502",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-1607",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },

  {
    caseId: "2024-1708",
    status: "available",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },
];