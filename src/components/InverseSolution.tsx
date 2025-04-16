import { MathJaxContext, MathJax } from "better-react-mathjax";
import { CongruenceView } from "./CongruenceView";
import type { Congruence } from './../lib/modular-arithmetic/Types';

interface SolutionProps {
    inverse: number;
    congruence: Congruence;
}
export default function InverseSolution({ inverse, congruence }: SolutionProps) {
    return (
        <div className="mt-3 p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-primary font-bold text-primary">Solução:</h2>
            <div className="text-2sm font-primary text-black rounded-lg shadow-md bg-bg px-3 py-3 inline-block">
            <CongruenceView congruence={congruence} variable={`I_{1}`} />
                <MathJaxContext>
                    <MathJax>
                        {`\\(I_{1} = ${inverse}\\)`}
                    </MathJax>
                </MathJaxContext>
            </div>
        </div>
    );
}
