export type Congruence = {
    coefficient: number;
    remainder: number;
    modulus: number;
};
    
export type CanonicalStep = {
    originalCongruence: Congruence;
    modulusInverse: number;
    simplifiedRemainder: number;
};

export type ContributionStep = {
    remainder: number;
    modulus: number;
    partialModulusProduct: number;
    modulusInverse: number;
    contributionTerm: number;
};

export type CRTReturn = {
    canonicalCongruences : CanonicalStep[];
    totalModulus: number;
    calculationSteps: ContributionStep[];
    weightedSum: number;
    solution: number;
};