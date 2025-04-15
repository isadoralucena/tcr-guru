import { Congruence as CongruenceType } from '../lib/modular-arithmetic/Types';
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
    congruence: CongruenceType;
    eqIndex?: number;
    variable?: string;
}
export function CongruenceView({
    congruence, eqIndex, variable = 'x'
}: CongruenceProps) {
    return (
        <MathJaxContext>
            <div className="flex items-center justify-center mb-3 space-x-1">
                {congruence.coefficient !== 1 && (
                    <MathJax>
                        <span className="max-w-[4rem] text-center">{`\\( ${congruence.coefficient} \\)`}</span>
                    </MathJax>
                )}

                <MathJax>
                    <span>{`\\( ${variable} \\equiv \\)`}</span>
                </MathJax>

                <MathJax>
                    <span className="max-w-[4rem] text-center">{`\\( ${congruence.remainder} \\)`}</span>
                </MathJax>

                <MathJax>
                    <span>{`\\( \\pmod{${congruence.modulus}} \\)`}</span>
                </MathJax>

                {eqIndex !== undefined && (
                    <MathJax>
                        <span className="ml-2 text-sm text-gray-600">{`\\((${eqIndex})\\)`}</span>
                    </MathJax>
                )}
            </div>
        </MathJaxContext>
    );
}