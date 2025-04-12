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

export type CrtStep = {
    remainder: number;
    modulus: number;
    partialModulusProduct: number;
    modulusInverse: number;
    crtTerm: number;
};

export type CrtReturn = {
    reduceSteps: ReduceStep[],
    canonicalSteps : CanonicalStep[];
    totalModulus: number;
    crtSteps: CrtStep[];
    weightedSum: number;
    solution: number;
};