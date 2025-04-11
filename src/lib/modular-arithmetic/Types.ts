export type Congruence = {
    coefficient: number;
    remainder: number;
    modulus: number;
};
    
export type CanonicalStep = {
    originalCongruence: Congruence;
    canonized: boolean;
    modulusInverse: number;
    simplifiedRemainder: number;
};

export type CRTStep = {
    remainder: number;
    modulus: number;
    partialModulusProduct: number;
    modulusInverse: number;
    CRTTerm: number;
};

export type CRTReturn = {
    canonicalSteps : CanonicalStep[];
    totalModulus: number;
    CRTSteps: CRTStep[];
    weightedSum: number;
    solution: number;
};