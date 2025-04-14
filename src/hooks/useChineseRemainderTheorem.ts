import { useState } from 'react';
import { Congruence, ReduceStep, CanonicalStep, CRTStep, CRTReturn } from './Types';

export function useChineseRemainderTheorem(system: Congruence[]) {
    const [steps, setSteps] = useState<any[]>([]);
    const [solution, setSolution] = useState<number | null>(null);

    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return Math.abs(a);
    };

    const modInverse = (a: number, m: number): number => {
        // Implementação do inverso modular
        const extendedGCD = (a: number, b: number): [number, number, number] => {
            if (b === 0) {
                return [a, 1, 0];
            }
            const [g, x1, y1] = extendedGCD(b, a % b);
            return [g, y1, x1 - Math.floor(a / b) * y1];
        };
        const [g, x] = extendedGCD(a, m);
        if (g !== 1) {
            throw new Error(`Não existe inverso de ${a} módulo ${m}`);
        }
        return ((x % m) + m) % m;
    };

    const calculateSolution = (steps: CRTStep[], totalModulus: number): [number, number] => {
        const weightedSum = steps.reduce((acc, { CRTTerm }) => acc + CRTTerm, 0);
        const solution = ((weightedSum % totalModulus) + totalModulus) % totalModulus;
        return [weightedSum, solution];
    };

    const solve = () => {
        const reduceSteps = system.map((eq) => {
            const normalized = {
                coefficient: ((eq.coefficient % eq.modulus) + eq.modulus) % eq.modulus,
                remainder: ((eq.remainder % eq.modulus) + eq.modulus) % eq.modulus,
                modulus: eq.modulus,
            };
            const divider = gcd(normalized.coefficient, normalized.modulus);
            const canDivide = normalized.coefficient !== 1 && divider > 1 && normalized.remainder % divider === 0;
            const reduced = canDivide
                ? {
                      coefficient: normalized.coefficient / divider,
                      remainder: normalized.remainder / divider,
                      modulus: normalized.modulus / divider,
                  }
                : normalized;

            return {
                originalCongruence: eq,
                reducedCongruence: reduced,
                wasDivided: canDivide,
                divider: divider,
            };
        });

        setSteps((prevSteps) => [...prevSteps, { step: 'Redução das Congruências', reduceSteps }]);

        const canonicalSteps = reduceSteps.map(({ reducedCongruence }) => {
            const { coefficient: a, remainder: b, modulus: m } = reducedCongruence;
            const wasInverted = a !== 1;
            const modularInverse = wasInverted ? modInverse(a, m) : undefined;
            const finalCongruence = wasInverted
                ? {
                      coefficient: 1,
                      remainder: ((b * modularInverse!) % m + m) % m,
                      modulus: m,
                  }
                : reducedCongruence;

            return {
                originalCongruence: reducedCongruence,
                wasInverted,
                finalCongruence,
                modularInverse,
            };
        });
        

        setSteps((prevSteps) => [...prevSteps, { step: 'Canonização das Congruências', canonicalSteps }]);

        const moduli = canonicalSteps.map((congruence) => congruence.finalCongruence.modulus);
        const totalModulus = moduli.reduce((acc, m) => acc * m, 1);
        const moduliLatex = `\\(${moduli.join(' \\times ')} = ${totalModulus}\\)`;

        setSteps((prevSteps) => [...prevSteps, { step: 'Multiplicando os módulos para achar o módulo total', totalModulus, equation: moduliLatex }]);

        const crtSteps = canonicalSteps.map(({ finalCongruence }) => {
            const { remainder, modulus } = finalCongruence;
            const partialModulusProduct = totalModulus / modulus;
            const modulusInverse = modInverse(partialModulusProduct, modulus);
            const CRTTerm = remainder * partialModulusProduct * modulusInverse;

            return {
                remainder,
                modulus,
                partialModulusProduct,
                modulusInverse,
                CRTTerm,
            };
        });

        setSteps((prevSteps) => [...prevSteps, { step: 'Etapas do Teorema Chinês do Resto', crtSteps }]);

        const [weightedSum, solution] = calculateSolution(crtSteps, totalModulus);
        setSolution(solution);

        setSteps((prevSteps) => [...prevSteps, { step: 'Cálculo da Solução Final', solution }]);
    };

    return {
        steps,
        solution,
        solve,
        setSteps,
        setSolution
    };
}
