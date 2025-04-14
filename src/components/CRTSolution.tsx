import { MathJaxContext, MathJax } from "better-react-mathjax";
import { CongruenceView } from "./CongruenceView";
import { Congruence as CongruenceType } from "../lib/modular-arithmetic/Types";
import { Ratio } from "./Ratio";

interface SolutionProps {
    steps: any[]
    solution: number | null
}

export default function CRTSolution({ steps, solution }: SolutionProps) {
    return (
        <div className="mt-6 p-6  space-y-4">
            <h2 className="text-2xl font-primary font-bold text-primary">Solução final:</h2>

            <MathJaxContext>
                <MathJax>
                    <div className="text-4sm font-primary text-black rounded-lg shadow-md bg-bg px-3 py-3 inline-block">
                        <p>{`A solução do sistema é: ${solution}`}</p>
                    </div>
                </MathJax>
            </MathJaxContext>

            <div className="mt-4">
                <h3 className="text-2xl font-primary font-bold text-primary">Etapas do cálculo:</h3>
                <ul className="space-y-2">
                    {steps.map((step, index) => {
                        let result = []
                        switch (step.step) {
                            case 'Redução das Congruências':
                                result = step.reduceSteps
                                    .filter((reduceStep: any) => reduceStep.wasDivided)
                                    .map((reduceStep: any, i: number) => <CongruenceView key={i} congruence={reduceStep.reducedCongruence} />)

                                break;
                            case 'Canonização das Congruências':
                                result = step.canonicalSteps
                                    .filter((canonical: any) => canonical.wasInverted)
                                    .map((canonical: any, i: number) => <CongruenceView key={i} congruence={canonical.finalCongruence} />)

                                break;
                            case 'Multiplicando os módulos para achar o módulo total':
                                result = [
                                    <MathJaxContext key={0}>
                                        <MathJax>
                                            <span>{step.equation}</span>
                                        </MathJax>
                                    </MathJaxContext>
                                ]

                                break;
                            case 'Etapas do Teorema Chinês do Resto':
                                const canonical = steps[1].canonicalSteps
                                    .map((canonical: any, i: number) => <CongruenceView key={i} congruence={canonical.finalCongruence} />)

                                const ratios = step.crtSteps.map((crtStep: any, i: number) =>
                                    <div key={i} className="mb-5">
                                        <Ratio crtStep={crtStep} index={i + 1} key={i} totalModulus={steps[2].totalModulus} /></div>)

                                const inverts = step.crtSteps.map((crtStep: any, i: number) => {
                                    const congruence: CongruenceType = { coefficient: crtStep.partialModulusProduct, modulus: crtStep.modulus, remainder: 1 }

                                    return (
                                        <div key={i}>
                                            <CongruenceView key={i} congruence={congruence} invertIndex={i + 1} />
                                            <div className='flex items-center justify-center my-2'>
                                                <MathJaxContext>
                                                    <MathJax>
                                                        {`\\( M_${i + 1} = ${crtStep.modulusInverse} \\)`}
                                                    </MathJax>
                                                </MathJaxContext>
                                            </div>
                                        </div>
                                    )
                                })

                                const interProductExpression = step.crtSteps.map(
                                    (crtStep: any) => `${crtStep.remainder} \\cdot ${crtStep.partialModulusProduct} \\cdot ${crtStep.modulusInverse}`
                                ).join(' + ')

                                const weigthedSum = step.crtSteps.reduce(
                                    (acc: any, crtStep: any) => acc + (crtStep.remainder * crtStep.partialModulusProduct * crtStep.modulusInverse)
                                    , 0)

                                const crtTerms = step.crtSteps.map((crtStep: any) => `${crtStep.CRTTerm}`).join(' + ')


                                const interProductLatex = (
                                    <MathJaxContext>
                                        <MathJax>
                                            {`\\[ ${interProductExpression} =\\]`}
                                            {`\\[${crtTerms} =\\]`}
                                            {`\\[${weigthedSum}\\]`}
                                        </MathJax>
                                    </MathJaxContext>
                                )

                                const finalCongruence: CongruenceType = {
                                    coefficient: 1,
                                    modulus: steps[2].totalModulus,
                                    remainder: weigthedSum
                                }

                                const finalReducedCongruence: CongruenceType = {
                                    coefficient: 1,
                                    modulus: steps[2].totalModulus,
                                    remainder: solution || 0
                                }

                                result = [
                                    <div key={0}>
                                        <h2 className='text-4sm font-primary text-black px-3 py-3'>1. Equações canonizadas</h2>
                                        {canonical}
                                    </div>,
                                    <div key={1}>
                                        <h2 className='text-4sm font-primary text-black px-3 py-3'>2. Razões</h2>
                                        {ratios}
                                    </div>,
                                    <div key={2}>
                                        <h2 className='text-4sm font-primary text-black px-3 py-3'>3. Inversos</h2>
                                        {inverts}
                                    </div>,
                                    <div key={3}>
                                        <h2 className='text-4sm font-primary text-black px-3 py-3'>4. Produto Intermediário</h2>
                                        {interProductLatex}
                                    </div>,
                                    <div key={4}>
                                        <h2 className='text-4sm font-primary text-black px-3 py-3'>5. Solução</h2>
                                        <CongruenceView congruence={finalCongruence} />
                                        <CongruenceView congruence={finalReducedCongruence} />
                                    </div>
                                ]
                                break;
                        }

                        return (
                            <div key={index}>
                                {result.length === 0
                                    ? <></>
                                    : (
                                        <li className="bg-bg p-4 rounded-lg shadow-md ">
                                            <p className="text-6sm font-semibold text-black font-primary">{step.step}</p>

                                            {result}

                                        </li>
                                    )
                                }
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}