export type Formula = "pmdc" | "federal";
export type Score = { obtained: number; total: number };

export const WEIGHTS = {
  pmdc: { matric: 0.1, fsc: 0.4, mdcat: 0.5 },
  federal: { matric: 0, fsc: 0.5, mdcat: 0.5 },
};

export const PASS_PERCENT = { mbbs: 55, bds: 50 };

export function percent(s: Score) {
  return (s.obtained / s.total) * 100;
}

export function isValidScore(s: Score) {
  return (
    Number.isFinite(s.obtained) &&
    Number.isFinite(s.total) &&
    s.total > 0 &&
    s.obtained >= 0 &&
    s.obtained <= s.total
  );
}

export function computeAggregate(
  formula: Formula,
  matric: Score,
  fsc: Score,
  mdcat: Score
) {
  const w = WEIGHTS[formula];
  const percents = {
    matric: percent(matric),
    fsc: percent(fsc),
    mdcat: percent(mdcat),
  };
  const parts = {
    matric: percents.matric * w.matric,
    fsc: percents.fsc * w.fsc,
    mdcat: percents.mdcat * w.mdcat,
  };
  return { percents, parts, aggregate: parts.matric + parts.fsc + parts.mdcat };
}

export function requiredMdcat(
  formula: Formula,
  target: number,
  matric: Score,
  fsc: Score,
  mdcatTotal: number
) {
  const w = WEIGHTS[formula];
  const base = percent(matric) * w.matric + percent(fsc) * w.fsc;
  const needPercent = (target - base) / w.mdcat;
  const marks = Math.ceil((needPercent / 100) * mdcatTotal - 1e-9);
  const bestPossible = base + w.mdcat * 100;
  return { needPercent, marks, bestPossible };
}

export function passMarks(total: number, passPercent: number) {
  return Math.ceil((passPercent / 100) * total - 1e-9);
}
