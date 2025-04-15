import { useState } from 'react';
import { Congruence, CRTReturn }from '../lib/modular-arithmetic/Types';
import { solveCRT } from '../lib/modular-arithmetic/ModularArithmetic';

export function useChineseRemainderTheorem(system: Congruence[]) {
    const [steps, setSteps] = useState<any[]>([]);
    const [solution, setSolution] = useState<number | null>(null);

    const solve = () => {
        const result: CRTReturn = solveCRT(system);

        setSteps([
            { step: 'Redução das Congruências', reduceSteps: result.reduceSteps },
            { step: 'Canonização das Congruências', canonicalSteps: result.canonicalSteps },
            {
                step: 'Multiplicando os módulos para achar o módulo total',
                totalModulus: result.totalModulus,
                equation: `\\(${result.canonicalSteps.map(cs => cs.finalCongruence.modulus).join(' \\times ')} = ${result.totalModulus}\\)`
            },
            { step: 'Etapas do Teorema Chinês do Resto', crtSteps: result.CRTSteps },
            { step: 'Cálculo da Solução Final', solution: result.solution },
        ]);

        setSolution(result.solution);
    };

    return {
        steps,
        solution,
        solve,
        setSteps,
        setSolution
    };
}
