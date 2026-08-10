// Offline/dev fallback for case content, used by CaseContentContext when the
// backend's content endpoint isn't reachable or isn't implemented yet.
// This is exactly Case 1's current hardcoded data — nothing changed here,
// just re-packaged into the CaseContent shape so it can sit behind the API.

import {
  TOOLS_DATA, TOOL_FINDINGS, POST_ELEMENTS, POST_ELEMENT_META,
  WITNESS_DATA, EVIDENCE_DATA, SUSPECT_DATA, TIMELINE_DATA,
  SUSPECT_NODE_IDS, CORRECT_SUSPECT_ID, EVIDENCE_EXHIBITS,
  MIRA_MISSION_INTRO, MIRA_DEBRIEFS,
} from "./investigationData";
import type { CaseContent } from "./caseContent.types";

export const CASE_CONTENT_FALLBACK: Record<string, CaseContent> = {
  "2024-1147": {
    caseId: "2024-1147",
    toolsData: TOOLS_DATA,
    toolFindings: TOOL_FINDINGS,
    postElements: POST_ELEMENTS,
    postElementMeta: POST_ELEMENT_META,
    witnessData: WITNESS_DATA,
    evidenceData: EVIDENCE_DATA,
    suspectData: SUSPECT_DATA,
    timelineData: TIMELINE_DATA,
    suspectNodeIds: SUSPECT_NODE_IDS,
    correctSuspectId: CORRECT_SUSPECT_ID,
    evidenceExhibits: EVIDENCE_EXHIBITS,
    miraMissionIntro: MIRA_MISSION_INTRO,
    miraDebriefs: MIRA_DEBRIEFS,
  },
};