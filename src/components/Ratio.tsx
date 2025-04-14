import { CRTStep as CRTType } from './lib/modular-arithmetic/Types';
import { MathJaxContext, MathJax } from "better-react-mathjax";

interface RatioProps {
    crtStep: CRTType
    index: number
    totalModulus: number
}
export function Ratio({
    crtStep, index, totalModulus
}: RatioProps) {
    return (
        <MathJaxContext>
            {/* <div className="flex mx-auto items-center space-x-4 mt-3"> */}
                <MathJax>
                    {`\\(N_{${index}} = \\frac{${totalModulus}}{${crtStep.modulus}} = ${crtStep.partialModulusProduct}\\)`}
                </MathJax>
            {/* </div> */}
        </MathJaxContext>
    );
}