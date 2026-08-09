import type { CaseRecord } from "../types";

export const CASES_CATALOG = [
  {
    caseId: "2024-1147",
    title: "THE MIRACLE CURE",
    teaser:
      "A viral health claim. No source. An anonymous account. Someone wants this shared — but why?",
  },
  {
    caseId: "2024-0891",
    title: "HARBOR PHANTOM",
    teaser:
      "Ships vanishing from the manifest. Someone is very good at math.",
  },
  {
    caseId: "2023-1204",
    title: "THE HEADLINE TRAP",
    teaser:
      "A viral headline claims every school has been banned indefinitely. The truth is buried beyond the first sentence.",
  },
  {
    caseId: "2024-1389",
    title: "CLASSIFIED",
    teaser: null,
  },
  {
    caseId: "2024-1501",
    title: "CLASSIFIED",
    teaser: null,
  },
];

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
    status: "locked",
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
    status: "locked",
    lastScreen: "main-menu",
    verdictsGiven: [],
    wallSelection: null,
    timeRemainingSec: 847,
    finalVerdict: null,
    notebookNotes: "",
    discoveredFindings: [],
  },
];