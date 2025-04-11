import { Congruence, CanonicalStep, ContributionStep, CRTReturn } from './Types';

/**
 * Validates if the provided value is an integer.
 */
function validateInteger(value: any): void {
    if (!Number.isInteger(value)) {
        throw new TypeError("Todos os valores devem ser inteiros.");
    }
}

/**
 * Calculates the Greatest Common Divisor (GCD) of two numbers using the Euclidean algorithm.
 */
export function gcd(a: number, b: number): number {
    validateInteger(a);
    validateInteger(b);
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

/**
 * Performs the Extended Euclidean Algorithm.
 */
export function extendedGCD(a: number, b: number): [number, number, number] {
    validateInteger(a);
    validateInteger(b);

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
    validateInteger(a);
    validateInteger(m);

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
 * Simplifies a congruence of the form ax ≡ b (mod m) to x ≡ newRemainder (mod m).
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
        simplifiedRemainder
    };
}

/**
 * Calculates the product of all moduli in a system of congruences.
 */
function calculateTotalModulus(moduli: number[]): number {
    return moduli.reduce((acc, m) => acc * m, 1);
}

/**
 * Calculates the contribution steps for solving the system of congruences.
 */
function calculateContributionSteps(
    canonicalCongruences: CanonicalStep[],
    totalModulus: number
): ContributionStep[] {
    return canonicalCongruences.map(({ simplifiedRemainder, originalCongruence: { modulus } }) => {
        const partialModulusProduct = totalModulus / modulus;
        const modulusInverse = modInverse(partialModulusProduct, modulus);
        const contributionTerm = simplifiedRemainder * partialModulusProduct * modulusInverse;

        return {
            remainder: simplifiedRemainder,
            modulus,
            partialModulusProduct,
            modulusInverse,
            contributionTerm
        };
    });
}

/**
 * Calculates the final solution of the system of congruences.
 */
function calculateSolution(
    calculationSteps: ContributionStep[],
    totalModulus: number
): number {
    const weightedSum = calculationSteps.reduce(
        (acc, { contributionTerm }) => acc + contributionTerm,
        0
    );
    return ((weightedSum % totalModulus) + totalModulus) % totalModulus;
}

/**
 * Solves the Chinese Remainder Theorem (CRT) for a system of congruences.
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
    const weightedSum = calculationSteps.reduce(
        (acc, { contributionTerm }) => acc + contributionTerm,
        0
    );

    return {
        canonicalCongruences,
        totalModulus,
        calculationSteps,
        weightedSum,
        solution
    };
}
 