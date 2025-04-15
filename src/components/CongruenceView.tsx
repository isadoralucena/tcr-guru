import { Congruence as CongruenceType } from '../lib/modular-arithmetic/Types';
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface CongruenceProps {
    congruence: CongruenceType
    invertIndex?: number
}
export function CongruenceView({
    congruence, invertIndex
}: CongruenceProps) {
    return (
        <MathJaxContext>
            <div className="flex items-center justify-center mt-3 space-x-1">
                {invertIndex && (
                    <MathJax>
                        <span className="max-w-[4rem] text-center">{`\\( I_{${invertIndex}}\\)`}</span>
                    </MathJax>
                )}

				{congruence.coefficient !== 1 && (
				  <MathJax>
					<span className="max-w-[4rem] text-center">{`\\( ${congruence.coefficient} \\)`}</span>
				  </MathJax>
				)}

                <MathJax>
                    <span>{`\\( x \\equiv \\)`}</span>
                </MathJax>

                <MathJax>
                    <span className="max-w-[4rem] text-center">{`\\( ${congruence.remainder} \\)`}</span>
                </MathJax>

                <MathJax>
                    <span>{`\\( \\pmod{${congruence.modulus}} \\)`}</span>
                </MathJax>
            </div>
        </MathJaxContext>
    );
}