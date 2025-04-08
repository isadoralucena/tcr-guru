import { gcd } from "mathjs";

export class EquacaoCongruencia {
    private coeficientes: Map<string, number>;

    constructor(a: number, b: number, m: number) {
        if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(m)) {
            throw new Error("Os coeficientes da equação modular devem ser inteiros.");
        }

        this.coeficientes = new Map();
        this.coeficientes.set("a", a);
        this.coeficientes.set("b", b);
        this.coeficientes.set("m", m);
    }

    public getCoeficiente(tipo: string): number {
        if (!this.coeficientes.has(tipo)) {
            throw new Error("A equação não tem o coeficiente solicitado.");
        }
        
        const retorno = this.coeficientes.get(tipo);
        if (!Number.isInteger(retorno)) {
            throw new Error("Os coeficientes da equação estão inválidos.");
        }

        return retorno!;
    }

    public ehCoprimo(): boolean {
        const a: number = this.getCoeficiente("a");
        const m: number = this.getCoeficiente("m");
        return gcd(a, m) === 1;
    }

    public ehCanonico(): boolean {
        return this.getCoeficiente("a") === 1;
    }

    public toString(): string {
        const a: number = this.getCoeficiente("a");
        const b: number = this.getCoeficiente("b");
        const m: number = this.getCoeficiente("m");

        return `${a}x ≡ ${b} mod ${m}`
    }
}