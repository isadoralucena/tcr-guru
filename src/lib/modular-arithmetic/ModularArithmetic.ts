import { Congruence, CanonicalStep, ContributionStep, CRTReturn } from './Types';

/**
 * Validates if the provided value is an integer.
 * @param {any} value - The value to be validated.
 * @throws {TypeError} If the value is not an integer.
 */
function validateInteger(value: any): void {
  if (!Number.isInteger(value)) {
    throw new TypeError("Todos os valores devem ser inteiros.");
  }
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param {number} a - First number.
 * @param {number} b - Second number.
 * @returns {number} The greatest common divisor of a and b.
 */
export function gcd(a: number, b: number): number {
  validateInteger(a);
  validateInteger(b);
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
  validateInteger(a);
  validateInteger(b);
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
  validateInteger(a);
  validateInteger(m);
  const [g, x] = extendedGCD(a, m);
  if (g !== 1) throw new Error(`Não existe inverso de ${a} módulo ${m}, pois o cálculo do MDC entre ${a} e ${m} foi diferente de 1.`);
  return ((x % m) + m) % m;
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
 * Simplifies a congruence of the form ax ≡ b (mod m) to x ≡ newRemainder (mod m),
 * where newRemainder is the result of multiplying the remainder 'b' by the modular inverse of 'a' modulo 'm'.
 * It also changes the 'isCanonical' attribute of the equation to whether the transformation was needed or not.
 * @param {Congruence} eq - The original congruence.
 * @returns {CanonicalStep} The simplified congruence along with inverse and new remainder.
 */
export function simplifyCongruence(eq: Congruence): CanonicalStep {
  const inv = modInverse(eq.coefficient, eq.modulus);
  const simplifiedRemainder = ((eq.remainder * inv) % eq.modulus + eq.modulus) % eq.modulus;

  let updatedEq: Congruence;

  if (inv === 1 && simplifiedRemainder === eq.remainder) {
    updatedEq = eq;
  } else {
    updatedEq = { ...eq, isCanonical: true };
  }

  return {
    originalCongruence: updatedEq,
    modulusInverse: inv,
    simplifiedRemainder,
  };
}


/**
 * Calculates the product of all moduli in a system of congruences.
 * @param {number[]} moduli - List of moduli.
 * @returns {number} The total product of the moduli.
 */
function calculateTotalModulus(moduli: number[]): number {
  return moduli.reduce((acc, m) => acc * m, 1);
}

/**
 * Calculates the contribution steps for solving the system of congruences.
 * @param {CanonicalStep[]} canonicalCongruences - List of simplified congruences.
 * @param {number} totalModulus - Total product of moduli.
 * @returns {ContributionStep[]} List of contribution steps.
 */
function calculateContributionSteps(canonicalCongruences: CanonicalStep[], totalModulus: number): ContributionStep[] {
  return canonicalCongruences.map(({ simplifiedRemainder, originalCongruence: { modulus } }) => {
    const partialModulusProduct = totalModulus / modulus;
    const modulusInverse = modInverse(partialModulusProduct, modulus);
    const contributionTerm = simplifiedRemainder * partialModulusProduct * modulusInverse;
    return { remainder: simplifiedRemainder, modulus, partialModulusProduct, modulusInverse, contributionTerm };
  });
}

/**
 * Calculates the final solution of the system of congruences.
 * @param {ContributionStep[]} calculationSteps - List of contribution steps.
 * @param {number} totalModulus - Total product of moduli.
 * @returns {number} The final solution of the system of congruences.
 */
function calculateSolution(calculationSteps: ContributionStep[], totalModulus: number): number {
  const weightedSum = calculationSteps.reduce((acc, { contributionTerm }) => acc + contributionTerm, 0);
  return ((weightedSum % totalModulus) + totalModulus) % totalModulus;
}

/**
 * Solves the Chinese Remainder Theorem (CRT) for a system of congruences.
 * @param {Congruence[]} system - List of congruences.
 * @returns {CRTReturn} The solution of the system of congruences, including steps and the final solution.
 * @throws {Error} If the moduli are not coprime with each other.
 * 
 */
export function solveChineseRemainderTheorem(system: Congruence[]): CRTReturn {
  const canonicalCongruences = system.map(eq => simplifyCongruence(eq));


  const moduli = canonicalCongruences.map(c => c.originalCongruence.modulus);

  if (!areModuliCoprime(moduli)) {
    throw new Error("Os módulos não são coprimos, portanto, não é possível aplicar o Teorema Chinês dos Restos.");
  }

  const totalModulus = calculateTotalModulus(moduli);
  const calculationSteps = calculateContributionSteps(canonicalCongruences, totalModulus);
  const solution = calculateSolution(calculationSteps, totalModulus);
  const weightedSum = calculationSteps.reduce((acc, { contributionTerm }) => acc + contributionTerm, 0);

  return {
    canonicalCongruences,
    totalModulus,
    calculationSteps,
    weightedSum,
    solution
  };
}