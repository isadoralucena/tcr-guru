import { gcd } from "mathjs";

export class CongruenceEquation {
    private coefficients: Map<string, number>;

    constructor(a: number, b: number, m: number) {
        if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(m)) {
            throw new Error("The modular equation's coefficients must be integers.");
        }

        this.coefficients = new Map();
        this.coefficients.set("a", a);
        this.coefficients.set("b", b);
        this.coefficients.set("m", m);
    }

    public getCoefficient(type: string): number {
        if (!this.coefficients.has(type)) {
            throw new Error("The equation doesn't have the specified coefficient.");
        }
        
        const returnValue = this.coefficients.get(type);
        if (!Number.isInteger(returnValue)) {
            throw new Error("The equation's coefficients are not integers.");
        }

        return returnValue!;
    }

    public isCoprime(): boolean {
        const a: number = this.getCoefficient("a");
        const m: number = this.getCoefficient("m");
        return gcd(a, m) === 1;
    }

    public isCanonical(): boolean {
        return this.getCoefficient("a") === 1;
    }
}
