import { CongruenceEquation } from "./CongruenceEquation";

export class CongruenceSystem {
    private equations: Array<CongruenceEquation>;

    constructor(equations: Array<CongruenceEquation>) {
        if (!equations || equations.some((equation) => !equation)) {
            throw new Error("The equations of a modular system must not be empty.");
        }

        this.equations = equations;
    }

    public getModuli(): number[] {
        return this.equations.map((equation) => equation.getCoefficient("m"));
    }

    public getEquations(): Array<CongruenceEquation> {
        return this.equations;
    }

    public isCanonical(): boolean {
        return this.equations.every((equation) => equation.isCanonical());
    }

    public isCoprime(): boolean {
        return this.equations.every((equation) => equation.isCoprime())
    }
}
