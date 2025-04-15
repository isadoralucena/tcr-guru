import { useState, useEffect, useCallback } from 'react';
import { Congruence, CanonicalStep, ReduceStep } from './../lib/modular-arithmetic/Types';
import { solveModularInverse } from './../lib/modular-arithmetic/ModularArithmetic';

type HookResult = {
  reduceStep: ReduceStep | null;
  canonicalStep: CanonicalStep | null;
  solution: number | null;
  solve: (congruence: Congruence) => void;
  clear: () => void;
};

export function useModularInverseSolver(): HookResult {
  const [reduceStep, setReduceStep] = useState<ReduceStep | null>(null);
  const [canonicalStep, setCanonicalStep] = useState<CanonicalStep | null>(null);
  const [solution, setSolution] = useState<number | null>(null);

  const solve = useCallback((congruence: Congruence) => {
    const { reduceStep, canonicalStep, solution } = solveModularInverse(congruence);

    setReduceStep(reduceStep);
    setCanonicalStep(canonicalStep);
    setSolution(solution);
  }, []);

  const clear = () => {
    setReduceStep(null);
    setCanonicalStep(null);
    setSolution(null);
  };

  return {
    reduceStep,
    canonicalStep,
    solution,
    solve,
    clear
  };
}