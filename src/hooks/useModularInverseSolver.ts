import { useState, useCallback } from 'react';
import { Congruence } from './../lib/modular-arithmetic/Types';
import { solveModularInverse } from './../lib/modular-arithmetic/ModularArithmetic';

type HookResult = {
	congruence: Congruence;
	inverse: number;
	solve: (congruence: Congruence) => void;
	clear: () => void;
};

export function useModularInverseSolver(): HookResult {
	const [congruence, setCongruence] = useState<Congruence>({ coefficient: 0, modulus: 0, remainder: 1 });
	const [inverse, setInverse] = useState<number>(0);

	const solve = useCallback((cong: Congruence) => {
		const { inverse, congruence } = solveModularInverse(cong);
		setCongruence(congruence);
		setInverse(inverse);
	}, []);

	const clear = useCallback(() => {
		setCongruence({ coefficient: 0, modulus: 0, remainder: 1 });
		setInverse(0);
	}, []);

	return {
		congruence,
		inverse,
		solve,
		clear
	};
}