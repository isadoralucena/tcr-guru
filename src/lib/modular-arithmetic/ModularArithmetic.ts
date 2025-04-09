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
  
  export class ModularArithmetic {
    static gcd(a: number, b: number): number {
      while (b !== 0) [a, b] = [b, a % b];
      return Math.abs(a);
    }
  
    static extendedGCD(a: number, b: number): [number, number, number] {
      if (b === 0) return [a, 1, 0];
      const [g, x1, y1] = this.extendedGCD(b, a % b);
      return [g, y1, x1 - Math.floor(a / b) * y1];
    }
  
    static modInverse(a: number, m: number): number {
      const [g, x] = this.extendedGCD(a, m);
      if (g !== 1) throw new Error(`Não existe inverso de ${a} módulo ${m}`);
      return ((x % m) + m) % m;
    }
  
    static simplify(eq: Congruence): CanonicalStep {
      const inv = this.modInverse(eq.a, eq.m);
      const simplified = ((eq.b * inv) % eq.m + eq.m) % eq.m;
      return {
        original: eq,
        aInverse: inv,
        simplifiedRemainder: simplified,
      };
    }
}