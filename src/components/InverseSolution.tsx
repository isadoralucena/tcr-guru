import { MathJaxContext, MathJax } from "better-react-mathjax";
import { CanonicalStep, ReduceStep } from './../lib/modular-arithmetic/Types';
import { CongruenceView } from "./CongruenceView";


interface SolutionProps {
    error: string|null
    reduceStep: ReduceStep | null;
    canonicalStep: CanonicalStep | null;
}

export default function InverseSolution({ reduceStep, canonicalStep }: SolutionProps) {
    console.log(reduceStep, canonicalStep)
    return (
        <div className="mt-6 p-6  space-y-4">
            <h2 className="text-2xl font-primary font-bold text-primary">Solução final:</h2>

            <MathJaxContext>
                <MathJax>
                    <div className="text-4sm font-primary text-black rounded-lg shadow-md bg-bg px-3 py-3 inline-block">
                        <p>{`A solução é: ${canonicalStep?.modularInverse}`}</p>
                    </div>
                </MathJax>
            </MathJaxContext>

            <div className="mt-4">
                <h3 className="text-2xl font-primary font-bold text-primary">Etapas do cálculo:</h3>
                <ul className="space-y-2">
                    <li className="bg-bg p-4 rounded-lg shadow-md">
                        <p className="text-4sm font-primary text-black px-3 py-2">Redução das congruências</p>
                        <CongruenceView congruence={reduceStep?.reducedCongruence}/>
                    </li>
                    <li className="bg-bg p-4 rounded-lg shadow-md">
                        <p className="text-4sm font-primary text-black px-3 py-2">Canonização das congruências</p>
                        <CongruenceView congruence={canonicalStep?.finalCongruence}/>
                    </li>
                    <li className="bg-bg p-4 rounded-lg shadow-md">
                        <p className="text-4sm font-primary text-black px-3 py-2">Solução</p>
                        <MathJaxContext>
                            <div>
                                <p>
                                    <MathJax>
                                        {`\\(${canonicalStep?.finalCongruence.coefficient}x \\equiv ${canonicalStep?.finalCongruence.remainder} \\pmod{${canonicalStep?.finalCongruence.modulus}}\\)`}
                                    </MathJax>
                                </p>
                                {canonicalStep?.modularInverse !== null && (
                                    <>
                                        <p>
                                        <MathJax>
                                            {`\\(x \\equiv ${canonicalStep?.modularInverse} \\pmod{${canonicalStep?.finalCongruence.modulus}}\\)`}
                                        </MathJax>
                                        </p>
                                        <p>
                                        <MathJax>
                                            {`\\(${canonicalStep?.originalCongruence.coefficient}^{-1} \\equiv ${canonicalStep?.modularInverse} \\pmod{${canonicalStep?.finalCongruence.modulus}}\\)`}
                                        </MathJax>
                                        </p>
                                    </>
                                )}
                            </div>
                        </MathJaxContext>
                    </li>

                </ul>
            </div>
        </div>
    )
}