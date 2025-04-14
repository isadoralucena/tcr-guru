export type Congruence = {
    coefficient: number;
    remainder: number;
    modulus: number;
};

export type ReduceStep = {
    originalCongruence: Congruence;
    reducedCongruence: Congruence;
    wasDivided: boolean;
    divider: number;
};

export type CanonicalStep = {
    originalCongruence: Congruence;
    wasInverted: boolean;
    finalCongruence: Congruence;
    modularInverse?: number;
};

export type CRTStep = {
    remainder: number;
    modulus: number;
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