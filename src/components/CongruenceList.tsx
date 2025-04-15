import { useState } from 'react';
import { Congruence as CongruenceType } from '../lib/modular-arithmetic/Types';

export function useCongruenceList(initial?: CongruenceType[]) {
	const [congruences, setCongruences] = useState<CongruenceType[]>(
		initial?.length ? initial : [{ coefficient: "", remainder: "", modulus: "" }]
	);

	const updateCongruence = (index: number, field: keyof CongruenceType, value: number) => {
		setCongruences(prev =>
			prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
		);
	};

	const addCongruence = () => {
		setCongruences(prev => [...prev, { coefficient: "", remainder:"", modulus: ""}]);
	};

	const removeCongruence = (index: number) => {
		setCongruences(prev => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
	};

	return { congruences, addCongruence, removeCongruence, updateCongruence };
}
