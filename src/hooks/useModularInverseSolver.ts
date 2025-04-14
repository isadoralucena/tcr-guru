import { useState, useEffect, useCallback } from 'react';
import { Congruence, CanonicalStep, ReduceStep } from './../lib/modular-arithmetic/Types';
import { solveModularInverse } from './../lib/modular-arithmetic/ModularArithmetic';

type HookResult = {
  reduceStep: ReduceStep | null;
  canonicalStep: CanonicalStep | null;
  error: string | null;
  solution: number | null;
  solve: (congruence: Congruence) => void;
  clear: () => void;
};

export function useModularInverseSolver(): HookResult {
  const [reduceStep, setReduceStep] = useState<ReduceStep | null>(null);
  const [canonicalStep, setCanonicalStep] = useState<CanonicalStep | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState<number | null>(null);

  const solve = useCallback((congruence: Congruence) => {
    try {
      const { reduceStep, canonicalStep, solution } = solveModularInverse(congruence);

      setReduceStep(reduceStep);
      setCanonicalStep(canonicalStep);
      setSolution(solution);

      setError(null);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      setReduceStep(null);
      setCanonicalStep(null);
      setSolution(null);
      console.error(message);
    }
  }, []);

  const clear = () => {
    setReduceStep(null);
    setCanonicalStep(null);
    setError(null);
    setSolution(null);
  };

  return {
    reduceStep,
    canonicalStep,
    error,
    solution,
    solve,
    clear
  };
}

