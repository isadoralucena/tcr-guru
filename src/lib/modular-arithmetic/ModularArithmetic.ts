import { Congruence, ReduceStep, CanonicalStep, CrtStep, CrtReturn } from './Types';

/**
 * Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
 */
export function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

/**
 * Performs the Extended Euclidean Algorithm.
 */
export function extendedGCD(a: number, b: number): [number, number, number] {
    if (b === 0) {
        return [a, 1, 0];
    }

    const [g, x1, y1] = extendedGCD(b, a % b);
    return [g, y1, x1 - Math.floor(a / b) * y1];
}

/**
 * Computes the modular inverse of a modulo m.
 */
export function modInverse(a: number, m: number): number {
    const [g, x] = extendedGCD(a, m);

    if (g !== 1) {
        throw new Error(`Não existe inverso de ${a} módulo ${m}, pois o cálculo do MDC entre ${a} e ${m} foi diferente de 1.`);
    }

    return ((x % m) + m) % m;
}

/**
 * Checks whether all moduli in the list are pairwise coprime.
 */
export function areModuliCoprime(moduli: number[]): boolean {
    for (let i = 0; i < moduli.length; i++) {
        for (let j = i + 1; j < moduli.length; j++) {
            if (gcd(moduli[i], moduli[j]) !== 1) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Calculates the final solution of the system of congruences.
 */
function calculateSolution(steps: CrtStep[], totalModulus: number): [number, number] {
    const weightedSum = steps.reduce((acc, { crtTerm }) => acc + crtTerm, 0);
    const solution = ((weightedSum % totalModulus) + totalModulus) % totalModulus;
    return [weightedSum, solution];
}

/**
 * Calculates the product of all moduli in a system of congruences.
 */
function calculateTotalModulus(moduli: number[]): number {
    return moduli.reduce((acc, m) => acc * m, 1);
}

/**
 * Validates if the provided congruences are valid.
 */
function validateCongruences(congruences: Congruence[]): void {
    if (congruences.length === 0) {
        throw new Error("O sistema de congruências está vazio. Forneça pelo menos uma congruência para resolver o sistema.");
    }

    const allIntegers = congruences.every(({coefficient, remainder, modulus}) =>
        Number.isInteger(coefficient) &&
        Number.isInteger(remainder) &&
        Number.isInteger(modulus) &&
        modulus > 0 &&
        ((coefficient % modulus) + modulus) % modulus !== 0
    );

    if (!allIntegers) {
        throw new Error("As equações de congruência são inválidas. Coeficiente, resto e módulo devem ser inteiros, o módulo deve ser positivo e a congruência deve ser não-trivial.");
    }
}

/**
 * Reduces a congruence of the form ax ≡ b (mod m) by:
 * 1. Normalizing all values to lie within the range [0, m).
 * 2. Checking if the equation can be simplified by dividing all terms by the GCD of a and m.
 *    This is valid only if the remainder b is divisible by that GCD.
 */
export function reduceCongruence(eq: Congruence): ReduceStep {
    const normalized: Congruence = {
        coefficient: ((eq.coefficient % eq.modulus) + eq.modulus) % eq.modulus,
        remainder: ((eq.remainder % eq.modulus) + eq.modulus) % eq.modulus,
        modulus: eq.modulus,
    }

    const divider = gcd(normalized.coefficient, normalized.modulus);
    const canDivide = normalized.coefficient !== 1 && divider > 1 && normalized.remainder % divider === 0;
    
    const reduced: Congruence = canDivide
        ? {
            coefficient: normalized.coefficient / divider,
            remainder: normalized.remainder / divider,
            modulus: normalized.modulus / divider,
        }
        : normalized;

    return {
        originalCongruence: eq,
        reducedCongruence: reduced,
        wasDivided: canDivide,
        divider: divider,
    };
}

/**
 * Canonizes a congruence by isolating x (i.e., making the coefficient 1) if possible.
 * Throws an error if the coefficient and modulus are not coprime.
 */
export function canonizeCongruence(eq: Congruence): CanonicalStep {
    const { coefficient: a, remainder: b, modulus: m } = eq;

    const wasInverted = a !== 1;
    const modularInverse = wasInverted ? modInverse(a, m) : undefined;
    const finalCongruence = wasInverted
        ? {
            coefficient: 1,
            remainder: ((b * modularInverse!) % m + m) % m,
            modulus: m,
        }
        : eq;

    return {
        originalCongruence: eq,
        wasInverted,
        finalCongruence,
        modularInverse,
    };
}

/**
 * Extract unique congruences from the canonized equations.
 */
function extractUniqueCongruences(canonicalSteps: CanonicalStep[]): Congruence[] {
    const uniqueCongruences: Congruence[] = [];
  
    canonicalSteps.forEach(step => {
      const congruence = step.finalCongruence;
      const exists = uniqueCongruences.some(c =>
        c.modulus === congruence.modulus &&
        c.remainder === congruence.remainder
      );
      if (!exists) {
        uniqueCongruences.push(congruence);
      }
    });
  
    return uniqueCongruences;
  }


/**
 * Calculates CRT steps for solving the system of congruences.
 */
function calculateCrtSteps(
    canonicalCongruences: Congruence[],
    totalModulus: number
): CrtStep[] {
    return canonicalCongruences.map(({ remainder, modulus }) => {
        const partialModulusProduct = totalModulus / modulus;
        const modulusInverse = modInverse(partialModulusProduct, modulus);
        const crtTerm = remainder * partialModulusProduct * modulusInverse;

        return {
            remainder: remainder,
            modulus,
            partialModulusProduct,
            modulusInverse,
            crtTerm
        };
    });
}

/**
 * Solves the Chinese Remainder Theorem (CRT) for a system of congruences.
 */
export function solveChineseRemainderTheorem(system: Congruence[]): CrtReturn {
    validateCongruences(system);

    const reduceSteps = system.map(eq => reduceCongruence(eq));
    const canonicalSteps = reduceSteps.map(({reducedCongruence}) => canonizeCongruence(reducedCongruence));
    const finalCongruences = extractUniqueCongruences(canonicalSteps);

    const moduli = finalCongruences.map((congruence) => congruence.modulus);
    if (!areModuliCoprime(moduli)) {
        throw new Error("Os módulos não são coprimos entre si, portanto, não é possível aplicar o Teorema Chinês do Resto.");
    }
    const totalModulus = calculateTotalModulus(moduli);

    const crtSteps = calculateCrtSteps(finalCongruences, totalModulus);
    const [weightedSum, solution] = calculateSolution(crtSteps, totalModulus);

    return {
        reduceSteps,
        canonicalSteps,
        totalModulus,
        crtSteps,
        weightedSum,
        solution
    };
}
 