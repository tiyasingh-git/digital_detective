// Resolves the active case's content from the backend on mount. If the
// backend call fails (endpoint not implemented, no auth token yet, offline),
// silently falls back to the local hardcoded data in caseContentFallback.ts
// so the game plays identically either way. Swap happens automatically —
// no other file needs to change when the backend catches up.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchCaseContent } from "../lib/api";
import { CASE_CONTENT_FALLBACK } from "../data/caseContentFallback";
import { getToolResultFrom, type CaseContent } from "../data/caseContent.types";

interface CaseContentState {
  content: CaseContent;
  loading: boolean;
  source: "api" | "fallback";
  getToolResult: (toolId: string, elementId: string | null) => string;
}

const CaseContentCtx = createContext<CaseContentState | null>(null);

export function CaseContentProvider({ caseId, children }: { caseId: string; children: ReactNode }) {
  const fallback = CASE_CONTENT_FALLBACK[caseId];
  const [content, setContent] = useState<CaseContent>(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "fallback">("fallback");

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchCaseContent(caseId)
      .then((remote) => {
        if (cancelled) return;
        setContent(remote);
        setSource("api");
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn(
          `[CaseContentContext] Falling back to local data for case ${caseId}: ${err.message}`,
        );
        setContent(CASE_CONTENT_FALLBACK[caseId]);
        setSource("fallback");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [caseId]);

  return (
    <CaseContentCtx.Provider
      value={{
        content,
        loading,
        source,
        getToolResult: (toolId, elementId) => getToolResultFrom(content, toolId, elementId),
      }}
    >
      {children}
    </CaseContentCtx.Provider>
  );
}

export function useCaseContent(): CaseContentState {
  const ctx = useContext(CaseContentCtx);
  if (!ctx) {
    throw new Error("useCaseContent must be used inside a CaseContentProvider");
  }
  return ctx;
}