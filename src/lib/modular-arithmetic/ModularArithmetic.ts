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
  
/**
 * Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} The greatest common divisor of a and b.
 */
export function gcd(a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

/**
 * Performs the Extended Euclidean Algorithm.
 * Returns a tuple [g, x, y] such that ax + by = g = gcd(a, b).
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {[number, number, number]} A tuple with the GCD and Bézout coefficients.
 */
export function extendedGCD(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGCD(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

/**
 * Computes the modular inverse of a modulo m.
 * @param {number} a - The number to invert.
 * @param {number} m - The modulus.
 * @returns {number} The modular inverse of a modulo m.
 * @throws {Error} If the modular inverse does not exist (a and m are not coprime).
 */
export function modInverse(a: number, m: number): number {
  const [g, x] = extendedGCD(a, m);
  if (g !== 1) throw new Error(`Não existe inverso de ${a} módulo ${m}, pois o cálculo do MDC entre ${a} e ${m} foi diferente de 1.`);
  return ((x % m) + m) % m;
}

/**
 * Simplifies a congruence of the form ax ≡ b (mod m) to x ≡ newRemainder (mod m),
 * where newRemainder is the result of multiplying the remainder 'b' by the modular inverse of 'a' modulo 'm'.
 * @param {Congruence} eq - The original congruence.
 * @returns {CanonicalStep} The simplified congruence along with inverse and new remainder.
 */
export function simplifyCongruence(eq: Congruence): CanonicalStep {
  const inv = modInverse(eq.coefficient, eq.modulus);
  const simplifiedRemainder = ((eq.remainder * inv) % eq.modulus + eq.modulus) % eq.modulus;
  return {
    originalCongruence: eq,
    modulusInverse: inv,
    simplifiedRemainder,
  };
}

/**
 * Checks whether all moduli in the list are pairwise coprime.
 * @param {number[]} moduli - List of moduli.
 * @returns {boolean} True if all are pairwise coprime, false otherwise.
 */
export function areModuliCoprime(moduli: number[]): boolean {
  for (let i = 0; i < moduli.length; i++) {
    for (let j = i + 1; j < moduli.length; j++) {
      if (gcd(moduli[i], moduli[j]) !== 1) return false;
    }
  }
  return true;
}

/**
 * Solves a system of congruences using the Chinese Remainder Theorem (CRT).
 * @param {Congruence[]} system - List of congruences in the form ax ≡ b (mod m).
 * @returns {CRTReturn} Object containing simplification steps, intermediate values, and final solution.
 * @throws {Error} If the moduli are not pairwise coprime.
 */
export function solveChineseRemainderTheorem(system: Congruence[]): CRTReturn {
  const canonicalCongruences = system.map(eq => simplifyCongruence(eq));
  const moduli = canonicalCongruences.map(c => c.originalCongruence.modulus);
  if (!areModuliCoprime(moduli)) {
    throw new Error("Os módulos não são coprimos entre si.");
  }

  const totalModulus = moduli.reduce((acc, m) => acc * m, 1);
  const calculationSteps = canonicalCongruences.map(({ simplifiedRemainder, originalCongruence: { modulus } }) => {
    const partialModulusProduct = totalModulus / modulus;
    const modulusInverse = modInverse(partialModulusProduct, modulus);
    const contributionTerm = simplifiedRemainder * partialModulusProduct * modulusInverse;
    return { remainder: simplifiedRemainder, modulus, partialModulusProduct, modulusInverse, contributionTerm };
  });

  const weightedSum = calculationSteps.reduce((acc, { contributionTerm }) => acc + contributionTerm, 0);
  const solution = ((weightedSum % totalModulus) + totalModulus) % totalModulus;

  return {
    canonicalCongruences,
    totalModulus,
    calculationSteps,
    weightedSum,
    solution,
  };
}