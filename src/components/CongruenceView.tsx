import { Congruence as CongruenceType } from '../lib/modular-arithmetic/Types';
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
    congruence: CongruenceType;
    variable?: string;
}
export function CongruenceView({
    congruence, variable = 'x'
}: CongruenceProps) {
    return (
        <MathJaxContext>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base text-center">
                {congruence.coefficient !== 1 && (
                    <MathJax>
                        <span className="min-w-[2rem]">{`\\( ${congruence.coefficient} \\)`}</span>
                    </MathJax>
                )}

                <MathJax>
                    <span>{`\\( ${variable} \\equiv \\)`}</span>
                </MathJax>

                <MathJax>
                    <span className="min-w-[2rem]">{`\\( ${congruence.remainder} \\)`}</span>
                </MathJax>

                <MathJax>
                    <span>{`\\( \\pmod{${congruence.modulus}} \\)`}</span>
                </MathJax>

                {congruence.id !== undefined && (
                    <MathJax>
                        <span className="text-sm text-gray-600">{`\\((${congruence.id})\\)`}</span>
                    </MathJax>
                )}
            </div>
        </MathJaxContext>
    );
}