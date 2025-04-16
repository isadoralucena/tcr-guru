import { useState, useEffect } from 'react';
import { Congruence } from '../lib/modular-arithmetic/Types';

export function useCongruenceList(mode: 'CRT' | 'INVERSE', initial?: Congruence[]) {
  const [congruences, setCongruences] = useState<Congruence[]>(
    initial?.length
      ? initial
      : mode === 'CRT'
        ? [
            { coefficient: 1, remainder: 1, modulus: 1, id: 1 },
            { coefficient: 1, remainder: 1, modulus: 1, id: 2 }
          ]
        : [{ coefficient: 1, remainder: 1, modulus: 1, id: 1 }]
  );

  useEffect(() => {
    if (mode === 'CRT' && congruences.length < 2) {
      setCongruences([
        { coefficient: 1, remainder: 1, modulus: 1, id: 1 },
        { coefficient: 1, remainder: 1, modulus: 1, id: 2 }
      ]);
    } else if (mode === 'INVERSE' && congruences.length !== 1) {
      setCongruences([{ coefficient: 1, remainder: 1, modulus: 1, id: 1 }]);
    }
  }, [mode]);

  const updateCongruence = (id: number, field: keyof Congruence, value: number) => {
    setCongruences(prev =>
      prev.map(c => c.id === id ? { ...c, [field]: value } : c)
    );
  };


  const addCongruence = () => {
    if (mode === 'CRT') {
      setCongruences(prev =>
        reindexCongruences([...prev, { coefficient: 1, remainder: 1, modulus: 1, id: 1 }])
      );
    }
  };
  

  const removeCongruence = (id: number) => {
    if (mode === 'CRT') {
      setCongruences(prev => {
        if (prev.length <= 2) return prev;
        return reindexCongruences(prev.filter(c => c.id !== id));
      });
    }
  };
  
  function reindexCongruences(congruences: Congruence[]): Congruence[] {
    return congruences.map((c, i) => ({
      ...c,
      id: i + 1,
    }));
  }

  return {
    congruences,
    updateCongruence,
    addCongruence,
    removeCongruence,
  };
}
