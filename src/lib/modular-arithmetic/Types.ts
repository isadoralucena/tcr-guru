export type Congruence = {
    coefficient: number;
    remainder: number;
    modulus: number;
    id: number;
};

export type ReduceStep = {
    originalCongruence: Congruence;
    reducedCongruence: Congruence;
    wasReduced: boolean;
    divider: number;
};

export type CanonicalStep = {
    originalCongruence: Congruence;
    wasInverted: boolean;
    finalCongruence: Congruence;
    modularInverse?: number;
};

export type CRTStep = {
    equation: Congruence;
    partialModulusProduct: number;
    modulusInverse: number;
    CRTTerm: number;
};

export type CRTReturn = {
    reduceSteps: ReduceStep[],
    canonicalSteps : CanonicalStep[];
    totalModulus: number;
    CRTSteps: CRTStep[];
    weightedSum: number;
    solution: number;
};

export type Mode = 'CRT' | 'INVERSE';