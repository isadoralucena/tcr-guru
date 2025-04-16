import { MathJaxContext, MathJax } from "better-react-mathjax";
import { CongruenceView } from "./CongruenceView";
import { Congruence as CongruenceType, CRTStep } from "../lib/modular-arithmetic/Types";
import { Ratio } from "./Ratio";

interface SolutionProps {
    steps: any[]
    solution: number | null
}

export default function CRTSolution({ steps, solution }: SolutionProps) {
    return (
        <div className="mt-3 p-6 space-y-4">
            <h2 className="text-2xl font-primary font-bold text-primary">Solução final:</h2>

            <MathJaxContext>
                <MathJax>
                    <div className="text-4sm font-primary text-black rounded-lg shadow-md bg-bg px-3 py-3 inline-block">
                        <p>{`\\( x = ${solution} \\)`}</p>
                    </div>
                </MathJax>
            </MathJaxContext>

            <div className="mt-4">
                <h3 className="text-2xl font-primary font-bold text-primary">Etapas do Teorema Chinês do Resto:</h3>
                <ul className="space-y-2">
                    {steps.map((step, i) => {
                        let result = []

                        switch (step.step) {
                            case 'Redução das Congruências':
                                result = step.reduceSteps
                                    .map((reduceStep: any, i: any) => 
                                        reduceStep.wasReduced 
                                        ? <CongruenceView key={i} congruence={reduceStep.reducedCongruence}/>
                                        : null
                                    )
                                    .filter((item: any) => item !== null)
                                break;

                            case 'Canonização das Congruências':
                                result = step.canonicalSteps
                                    .map((canonicalStep: any, i: any) =>
                                        canonicalStep.wasInverted
                                        ? <CongruenceView key={i} congruence={canonicalStep.finalCongruence} />
                                        : null
                                    )
                                    .filter((item: any) => item !== null)
                                break;

                            case 'Etapas do Teorema Chinês do Resto':
                                const canonical = steps[1].canonicalSteps
                                    .map((canonical: any, i: any) =>
                                        <CongruenceView key={i} congruence={canonical.finalCongruence} />
                                    )

                                const ratios = step.crtSteps.map((crtStep: CRTStep) => (
                                    <div key={i} className="mb-5">
                                        <Ratio crtStep={crtStep} totalModulus={steps[2].totalModulus} />
                                    </div>
                                ))

                                const inverts = step.crtSteps.map((crtStep: CRTStep, i: number) => {
                                    const congruence: CongruenceType = {
                                        coefficient: crtStep.partialModulusProduct,
                                        modulus: crtStep.equation.modulus,
                                        remainder: 1,
                                        id: crtStep.equation.id,
                                    }

                                    return (
                                        <div key={i}>
                                            <CongruenceView congruence={congruence} variable={`I_{${congruence.id}}`} />
                                            <div className="flex items-center justify-center my-2">
                                                <MathJaxContext>
                                                    <MathJax>
                                                        {`\\(I_${congruence.id} = ${crtStep.modulusInverse} \\)`}
                                                    </MathJax>
                                                </MathJaxContext>
                                            </div>
                                        </div>
                                    )
                                })

                                const interProductLabeled = step.crtSteps.map((crtStep: CRTStep) =>
                                    `R_{${crtStep.equation.id}} \\cdot N_{${crtStep.equation.id}} \\cdot I_{${crtStep.equation.id}}`
                                ).join(' + ')
                                
                                const interProductValues = step.crtSteps.map((crtStep: any) =>
                                    `${crtStep.equation.remainder} \\cdot ${crtStep.partialModulusProduct} \\cdot ${crtStep.modulusInverse}`
                                ).join(' + ')
                                
                                const crtTerms = step.crtSteps.map((crtStep: any) => `${crtStep.CRTTerm}`).join(' + ')
                                
                                const weigthedSum = step.crtSteps.reduce(
                                    (acc: any, crtStep: any) =>
                                        acc + (crtStep.equation.remainder * crtStep.partialModulusProduct * crtStep.modulusInverse),
                                    0
                                )

                                const interProductLatex = (
                                    <MathJaxContext>
                                        <MathJax>
                                            {`\\[ ${interProductLabeled} = \\]`}
                                            {`\\[ ${interProductValues} = \\]`}
                                            {`\\[ ${crtTerms} = \\]`}
                                            {`\\[ ${weigthedSum} \\]`}
                                        </MathJax>
                                    </MathJaxContext>
                                )

                                result = [
                                    <div key="canon" className="mb-6">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-1">
                                            Equações canonizadas
                                        </h2>
                                        {canonical}
                                    </div>,
                                    <div key="equation" className="mb-6">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-1">
                                            Módulo total
                                        </h2>
                                        <MathJaxContext>
                                            <MathJax>
                                                {steps[2].equation}
                                            </MathJax>
                                        </MathJaxContext>
                                    </div>,                                    
                                    <div key="ratios" className="mb-6">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-1">
                                            Razões
                                        </h2>
                                        {ratios}
                                    </div>,
                                    <div key="inverts" className="mb-6">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-1">
                                            Inversos
                                        </h2>
                                        {inverts}
                                    </div>,
                                    <div key="inter" className="mb-6">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-0">
                                            Produto Intermediário
                                        </h2>
                                        {interProductLatex}
                                    </div>,
                                    <div key="solution">
                                        <h2 className="text-4sm underline font-bold font-primary text-black px-3 py-3 pb-0">
                                            Solução
                                        </h2>
                                        <MathJaxContext>
                                            <MathJax>
                                                {`\\[ x = ${weigthedSum} \\text{ mod } ${steps[2].totalModulus} \\]`}
                                                {`\\[ x = ${solution} \\]`}
                                            </MathJax>
                                        </MathJaxContext>
                                    </div>
                                ]
                                break;
                        }

                        return (
                            <div key={i}>
                                {result.length === 0 ? null : (
                                    <li className="bg-bg p-4 rounded-lg shadow-md">
                                        {step.step !== 'Etapas do Teorema Chinês do Resto' && (
                                            <p className={`text-6sm font-semibold text-black font-primary ${(step.step === 'Redução das Congruências' || step.step === 'Canonização das Congruências') ? 'mb-1' : ''}`}>
                                                {step.step}
                                            </p>
                                        )}
                                        {result}
                                    </li>
                                )}
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
