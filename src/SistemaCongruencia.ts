import { EquacaoCongruencia } from "./EquacaoCongruencia";

export class SistemaCongruencia {
    private equacoes: Array<EquacaoCongruencia>;

    constructor(equacoes: Array<EquacaoCongruencia>) {
        if (!equacoes || equacoes.some((equacao) => !equacao)) {
            throw new Error("As equações de um sistema de congruência não podem ser nulas");
        }

        this.equacoes = equacoes;
    }

    public getModulos(): number[] {
        return this.equacoes.map((equacao) => equacao.getCoeficiente("m"));
    }

    public getEquacoes(): Array<EquacaoCongruencia> {
        return this.equacoes;
    }

    public ehCanonico(): boolean {
        return this.equacoes.every((elemento) => elemento.ehCanonico());
    }

    public ehCoprimo(): boolean {
        return this.equacoes.every((elemento) => elemento.ehCoprimo())
    }

    public toString(): string {
        return this.equacoes.map((equacao) => equacao.toString()).join("\n");
    }
}