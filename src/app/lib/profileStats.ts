import type { CaseRecord } from "../types";
import { scoreToGrade } from "./scoring";

export interface ProfileStats {
  solvedCount: number;
  coldCount: number;
  xp: number;
  rank: string;
  nextRankXp: number | null;
  progressPct: number;
  avgScore: number | null;
  avgGrade: string | null;
}

const RANKS = [
  { name: "TRAINEE",       minSolved: 0 },
  { name: "JUNIOR DET.",   minSolved: 1 },
  { name: "SENIOR DET.",   minSolved: 3 },
  { name: "LEAD DETECTIVE",minSolved: 5 },
];

function xpFor(solvedCount: number, coldCount: number): number {
  return solvedCount * 1200 + coldCount * 200;
}

export function computeProfileStats(cases: CaseRecord[]): ProfileStats {
  const solved = cases.filter(c => c.status === "closed-solved");
  const cold = cases.filter(c => c.status === "closed-cold");
  const solvedCount = solved.length;
  const coldCount = cold.length;
  const xp = xpFor(solvedCount, coldCount);

  let rank = RANKS[0].name;
  let nextRankXp: number | null = null;
  for (let i = 0; i < RANKS.length; i++) {
    if (solvedCount >= RANKS[i].minSolved) rank = RANKS[i].name;
    else { nextRankXp = xpFor(RANKS[i].minSolved, 0); break; }
  }

  const prevThreshold = xpFor(
    [...RANKS].reverse().find(r => solvedCount >= r.minSolved)?.minSolved ?? 0, 0,
  );
  const progressPct = nextRankXp
    ? Math.min(100, Math.round(((xp - prevThreshold) / (nextRankXp - prevThreshold)) * 100))
    : 100;

  const scored = solved.filter(c => typeof c.finalScore === "number");
  const avgScore = scored.length
    ? Math.round(scored.reduce((a, c) => a + (c.finalScore ?? 0), 0) / scored.length)
    : null;
  const avgGrade = avgScore !== null ? scoreToGrade(avgScore) : null;

  return { solvedCount, coldCount, xp, rank, nextRankXp, progressPct, avgScore, avgGrade };
}

// How many Field Manual (skill card) entries are unlocked, in flattened catalog
// order — one is always unlocked, plus two more per case closed.
export function computeUnlockedSkillCount(cases: CaseRecord[]): number {
  const solvedCount = cases.filter(c => c.status === "closed-solved").length;
  return 1 + solvedCount * 2;
}