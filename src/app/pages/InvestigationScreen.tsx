import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";

import type { Tool, Verdict, DiscoveredFinding } from "../types";
import { TOOL_FINDINGS } from "../data/investigationData";
import { LeftPanel } from "../components/investigation/LeftPanel";
import { CenterPanel } from "../components/investigation/CenterPanel";
import { StampBar } from "../components/investigation/StampBar";
import { GadgetBelt } from "../components/shared/GadgetBelt";
import { StampOverlay } from "../components/shared/StampOverlay";

export function InvestigationScreen({ onVerdictFinal, onDiscoverFinding }: {
  onVerdictFinal: (v: NonNullable<Verdict>, investigated: string[]) => void;
  onDiscoverFinding: (f: DiscoveredFinding) => void;
}) {
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [investigated, setInvestigated] = useState<Set<string>>(new Set());
  const [stampVerdict, setStampVerdict] = useState<Verdict>(null);
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    if (!activeTool || !selectedElement) return;
    const text = TOOL_FINDINGS[activeTool]?.[selectedElement];
    if (!text) return;
    onDiscoverFinding({ elementId: selectedElement, toolId: activeTool, text });
  }, [activeTool, selectedElement]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMarkInvestigated = useCallback((elementId: string) => {
    setInvestigated(prev => { const s = new Set(prev); s.add(elementId); return s; });
  }, []);

  const handleStamp = useCallback((v: Verdict) => {
    setStampVerdict(v);
    setShowStamp(true);
  }, []);

  const handleDone = useCallback(() => {
    setShowStamp(false);
    if (stampVerdict) onVerdictFinal(stampVerdict, Array.from(investigated));
  }, [stampVerdict, investigated, onVerdictFinal]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1 overflow-hidden">
        <div style={{ width: "220px", flexShrink: 0 }}>
          <LeftPanel investigated={Array.from(investigated)} />
        </div>
        <div className="flex-1 overflow-hidden">
          <CenterPanel
            activeTool={activeTool}
            selectedElement={selectedElement}
            investigated={investigated}
            onSelectElement={setSelectedElement}
            onMarkInvestigated={handleMarkInvestigated}
          />
        </div>
        <div style={{ width: "200px", flexShrink: 0 }}>
          <GadgetBelt activeTool={activeTool} onSelect={setActiveTool} selectedElement={selectedElement} />
        </div>
      </div>
      <StampBar onStamp={handleStamp} />
      <AnimatePresence>
        {showStamp && <StampOverlay verdict={stampVerdict} onDone={handleDone} />}
      </AnimatePresence>
    </div>
  );
}
