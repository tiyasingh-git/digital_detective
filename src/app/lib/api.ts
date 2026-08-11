// Backend API client.
//
// Base URL comes from VITE_API_BASE_URL (set it in a .env file, e.g.
// VITE_API_BASE_URL=http://localhost:4000/api). Falls back to
// http://localhost:4000/api for local dev if unset.
//
// NOTE for backend: case.controller.ts's routes are all behind
// authenticateJWT, but auth.routes.ts (login/register) is currently empty —
// there's no way to obtain a token yet. Until that exists, every call here
// will 401 and callers fall back to local data (see CaseContentContext.tsx).
// Once login exists, wire getToken() below to read the stored access token.

/// <reference types="vite/client" />

// Backend API client.
// ...

const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:4000/api";

function getToken(): string | null {
  try {
    return localStorage.getItem("dd_access_token");
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = body?.error ?? `Request to ${path} failed with status ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return (body?.data ?? body) as T;
}

// --- Case content -----------------------------------------------------
// EXPECTED (not yet implemented on backend): GET /cases/:id/content
// should return a CaseContent object (see data/caseContent.types.ts).
// Today the backend only has GET /cases/:id (case.routes.ts), returning
// the generic CaseResponseDTO — not the rich investigation content this
// game needs. Relay this to the backend team as the next endpoint to add.
import type { CaseContent } from "../data/caseContent.types";

export function fetchCaseContent(caseId: string): Promise<CaseContent> {
  return request<CaseContent>(`/cases/${caseId}/content`);
}

// --- Case list (already implemented on backend: GET /cases) -----------
export interface RemoteCaseSummary {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  points: number;
}

export function fetchCases(): Promise<RemoteCaseSummary[]> {
  return request<RemoteCaseSummary[]>("/cases");
}

// --- Investigation actions (matches ActionType enum in Prisma schema) --
export type ActionType =
  | "EVIDENCE_EXAMINED"
  | "SOURCE_CHECKED"
  | "EVIDENCE_COMPARED"
  | "JUSTIFICATION_SUBMITTED"
  | "HINT_VIEWED"
  | "NOTE_TAKEN";

export interface SubmitAnswerPayload {
  answers: { targetField: string; submittedValue: string }[];
}

export interface EvaluationResult {
  success: boolean;
  scoreReceived: number;
  passed: boolean;
  feedback: string[];
}

export function submitCaseAnswers(
  caseId: string,
  payload: SubmitAnswerPayload,
): Promise<EvaluationResult> {
  return request<EvaluationResult>(`/cases/${caseId}/submit`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}