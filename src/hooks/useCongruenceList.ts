import { useState, useEffect } from 'react';
import { Congruence } from '../lib/modular-arithmetic/Types';

export function useCongruenceList(mode: 'CRT' | 'INVERSE', initial?: Congruence[]) {
  const [congruences, setCongruences] = useState<Congruence[]>(
    initial?.length
      ? initial
      : mode === 'CRT'
        ? [
            { coefficient: 1, remainder: 1, modulus: 1 },
            { coefficient: 1, remainder: 1, modulus: 1 }
          ]
        : [{ coefficient: 1, remainder: 1, modulus: 1 }]
  );

  // Atualiza automaticamente o número de congruências ao trocar de modo
  useEffect(() => {
    if (mode === 'CRT' && congruences.length < 2) {
      setCongruences([
        { coefficient: 1, remainder: 1, modulus: 1 },
        { coefficient: 1, remainder: 1, modulus: 1 }
      ]);
    } else if (mode === 'INVERSE' && congruences.length !== 1) {
      setCongruences([{ coefficient: 1, remainder: 1, modulus: 1 }]);
    }
  }, [mode]);

  const updateCongruence = (index: number, field: keyof Congruence, value: number) => {
    setCongruences(prev =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addCongruence = () => {
    if (mode === 'CRT') {
      setCongruences(prev => [...prev, { coefficient: 1, remainder: 1, modulus: 1 }]);
    }
  };

  const removeCongruence = (index: number) => {
    if (mode === 'CRT') {
      setCongruences(prev =>
        prev.length > 2 ? prev.filter((_, i) => i !== index) : prev
      );
    }
  };

  return {
    congruences,
    updateCongruence,
    addCongruence,
    removeCongruence,
  };
}
