// Shape of a case's investigation content — post, tools, evidence, witnesses,
// verdicts, Mira's dialogue. This is the CONTRACT the backend's
// GET /api/cases/:id/content endpoint should return.
//
// Today the backend doesn't expose this shape yet (Case model is generic —
// see case.dto.ts's CaseResponseDTO). Until it does, CaseContentContext
// falls back to CASE_CONTENT_FALLBACK (data/investigationData.tsx), so the
// game keeps working unchanged. Once the backend adds a matching endpoint,
// the fallback is dropped automatically — no frontend changes needed.

import type { ReactNode } from "react";
import type { Verdict } from "../types";

export interface ToolDef {
  id: "scanner" | "timeline" | "camera" | "emotion" | "bias" | "metadata" | "verify";
  sym: string;
  label: string;
  color: string;
  result: string;
}

export interface PostElement {
  id: string;
  content: string;
  directions: string[];
}

export interface PostElementMeta {
  tag: string;
  importance: "HIGH" | "MED" | "LOW";
}

export interface WitnessEntry {
  id: number;
  name: string;
  time: string;
  role: string;
  statement: string;
}

export interface EvidenceEntry {
  id: number;
  label: string;
  tag: string;
  auth: number;
  flagged: boolean;
}

export interface SuspectEntry {
  id: number;
  name: string;
  role: string;
  suspicion: number;
}

export interface TimelineEntry {
  time: string;
  event: string;
  active: boolean;
}

export interface EvidenceExhibit {
  type: string;
  title: string;
  body: ReactNode;
  marginNote?: string;
  mentorNote?: string;
}

export interface CaseContent {
  caseId: string;
  toolsData: ToolDef[];
  toolFindings: Record<string, Record<string, string>>;
  postElements: PostElement[];
  postElementMeta: Record<string, PostElementMeta>;
  witnessData: WitnessEntry[];
  evidenceData: EvidenceEntry[];
  suspectData: SuspectEntry[];
  timelineData: TimelineEntry[];
  suspectNodeIds: number[];
  correctSuspectId: number;
  evidenceExhibits: Record<number, EvidenceExhibit>;
  miraMissionIntro: string;
  miraDebriefs: Record<NonNullable<Verdict>, string>;
}

export function getToolResultFrom(content: CaseContent, toolId: string, elementId: string | null): string {
  if (!elementId) {
    return content.toolsData.find((t) => t.id === toolId)?.result.replace(/\n/g, " · ") ?? "";
  }
  return (
    content.toolFindings[toolId]?.[elementId] ??
    content.toolFindings[toolId]?.["_default"] ??
    "No relevant data for this selection."
  );
}