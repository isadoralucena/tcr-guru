import { Congruence, ReduceStep, CanonicalStep, CRTStep, CRTReturn } from './Types';

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
function calculateSolution(steps: CRTStep[], totalModulus: number): [number, number] {
    const weightedSum = steps.reduce((acc, { CRTTerm }) => acc + CRTTerm, 0);
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
 * Validates a single congruence.
 */
export function validateCongruence(congruence: Congruence): void {
    const { coefficient, remainder, modulus } = congruence;

    const isNumber = Number.isInteger(coefficient) && Number.isInteger(remainder) && Number.isInteger(modulus);
    if (!isNumber) {
        throw new TypeError("O coeficiente, resto e módulo das congruências devem ser inteiros.");
    }
    
    if(modulus < 1){
        throw new TypeError("Os módulos das congruências devem ser maior que 1.");
    }
    
    if (((coefficient % modulus) + modulus) % modulus === 0) {
        throw new TypeError(
            "Congruências inválidsa: os coeficientes não podem ser múltiplos dos módulos."
        );
    }
}

/**
 * Validates if the provided congruences are valid.
 */
export function validateCongruences(congruences: Congruence[]): void {
    if (congruences.length === 0) {
        throw new TypeError("O sistema de congruências está vazio. Forneça pelo menos uma congruência para resolver o sistema.");
    }

    congruences.forEach(validateCongruence);
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
        id: eq.id,
    }
    const wasSimplified = (normalized.coefficient !== eq.coefficient) || (normalized.remainder !== eq.remainder);

    const divider = gcd(normalized.coefficient, normalized.modulus);
    const canDivide = normalized.coefficient !== 1 && divider > 1 && normalized.remainder % divider === 0;
    const finalCongruence: Congruence = canDivide
        ? {
            coefficient: normalized.coefficient / divider,
            remainder: normalized.remainder / divider,
            modulus: normalized.modulus / divider,
            id: eq.id,
        }
        : normalized;

    return {
        originalCongruence: eq,
        reducedCongruence: finalCongruence,
        wasReduced: canDivide || wasSimplified,
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
            id: eq.id,
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
function calculateCRTSteps(
    canonicalCongruences: Congruence[],
    totalModulus: number
): CRTStep[] {
    return canonicalCongruences.map((congruence) => {
        const partialModulusProduct = totalModulus / congruence.modulus;
        const modulusInverse = modInverse(partialModulusProduct, congruence.modulus);
        const CRTTerm = congruence.remainder * partialModulusProduct * modulusInverse;

        return {
            equation: congruence,
            partialModulusProduct,
            modulusInverse,
            CRTTerm
        };
    });
}

/**
 * Solves the Chinese Remainder Theorem (CRT) for a system of congruences.
 */
export function solveCRT(system: Congruence[]): CRTReturn {
    validateCongruences(system);

    const reduceSteps = system.map(eq => reduceCongruence(eq));
    const canonicalSteps = reduceSteps.map(({reducedCongruence}) => canonizeCongruence(reducedCongruence));
    const finalCongruences = extractUniqueCongruences(canonicalSteps);

    if (finalCongruences.length <= 1) {
        throw new Error("Não há equações o suficiente para aplicar o TCR de forma não trivial. Provavelmente há congruências equivalentes na entrada.");
    }

    const moduli = finalCongruences.map((congruence) => congruence.modulus);
    if (!areModuliCoprime(moduli)) {
        throw new Error("Os módulos não são coprimos entre si, portanto, não é possível aplicar o Teorema Chinês do Resto.");
    }
    const totalModulus = calculateTotalModulus(moduli);

    const CRTSteps = calculateCRTSteps(finalCongruences, totalModulus);
    const [weightedSum, solution] = calculateSolution(CRTSteps, totalModulus);

    return {
        reduceSteps,
        canonicalSteps,
        totalModulus,
        CRTSteps,
        weightedSum,
        solution
    };
}

/**
 * Solves a single modular inverse problem by processing a single congruence.
 */
export function solveModularInverse(congruence: Congruence): {
    inverse: number;
    congruence: Congruence;
} {
    validateCongruence(congruence);

    const inverse = modInverse(congruence.coefficient, congruence.modulus);
    return {
        inverse,
        congruence
    };
}