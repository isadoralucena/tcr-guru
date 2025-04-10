export type Congruence = {
  a: number;
  b: number;
  m: number;
};
  
export type CanonicalStep = {
  original: Congruence;
  aInverse: number;
  simplifiedRemainder: number;
};

export type ContributionStep = {
  remainder: number;
  modulus: number;
  partialProduct: number;
  inverse: number;
  term: number;
};

export type CRTReturn = {
  canonical: CanonicalStep[];
  totalModulus: number;
  steps: ContributionStep[];
  weightedSum: number;
  solution: number;
};
  
export function gcd (a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}
  
export function extendedGCD(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGCD(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}
  
export function modInverse(a: number, m: number): number {
  const [g, x] = extendedGCD(a, m);
  if (g !== 1) throw new Error(`Não existe inverso de ${a} módulo ${m}`);
  return ((x % m) + m) % m;
}
  
export function simplify(eq: Congruence): CanonicalStep {
  const inv = modInverse(eq.a, eq.m);
  const simplified = ((eq.b * inv) % eq.m + eq.m) % eq.m;
  return {
    original: eq,
    aInverse: inv,
    simplifiedRemainder: simplified,
  };
}

export function verifyPairwiseCoprime(moduli: number[]): boolean {
  for (let i = 0; i < moduli.length; i++) {
    for (let j = i + 1; j < moduli.length; j++) {
      if (gcd(moduli[i], moduli[j]) !== 1) return false;
    }
  }
  return true;
}
    
export function solveCRT(system: Congruence[]): CRTReturn {
  const canonical = system.map(eq => simplify(eq));
  const moduli = canonical.map(c => c.original.m);
  if (!verifyPairwiseCoprime(moduli)) {
    throw new Error("Os módulos não são coprimos entre si.");
  }
    
  const M = moduli.reduce((acc, m) => acc * m, 1);
  const steps = canonical.map(({ simplifiedRemainder: r, original: { m } }) => {
    const M_i = M / m;
    const inv = modInverse(M_i, m);
    const term = r * M_i * inv;
    return { remainder: r, modulus: m, partialProduct: M_i, inverse: inv, term };
  });
    
  const weightedSum = steps.reduce((acc, { term }) => acc + term, 0);
  const solution = ((weightedSum % M) + M) % M;

  return {
    canonical,
    totalModulus: M,
    steps,
    weightedSum,
    solution,
  };
}