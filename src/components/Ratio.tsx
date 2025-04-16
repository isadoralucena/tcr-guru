import { CRTStep as CRTType } from './lib/modular-arithmetic/Types';
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface RatioProps {
    crtStep: CRTType
    totalModulus: number
}
export function Ratio({
    crtStep, totalModulus
}: RatioProps) {
    return (
        <MathJaxContext>
            {/* <div className="flex mx-auto items-center space-x-4 mt-3"> */}
                <MathJax>
                    {`\\(N_{${crtStep.equation.id}} = \\frac{${totalModulus}}{${crtStep.equation.modulus}} = ${crtStep.partialModulusProduct}\\)`}
                </MathJax>
            {/* </div> */}
        </MathJaxContext>
    );
}