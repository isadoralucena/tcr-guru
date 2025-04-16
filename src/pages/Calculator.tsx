import illustration from '../assets/calculator-illustration.svg';
import { useCalculatorMode } from '../hooks/useCalculatorMode';
import { useCongruenceList } from '../hooks/useCongruenceList';
import { ButtonLink } from '../components/ButtonLink';
import { Congruence } from '../components/Congruence';
import { motion, AnimatePresence } from 'framer-motion';
import { useChineseRemainderTheorem } from '../hooks/useChineseRemainderTheorem';
import { useState, useEffect } from 'react';
import CRTSolution from '../components/CRTSolution';
import { useModularInverseSolver } from '../hooks/useModularInverseSolver';
import InverseSolution from '../components/InverseSolution';
import Error from '../components/Error';

const fadeInOut = {
    initial: { opacity: 0, y: -5, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -5, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeInOut' }
};

const Calculator = () => {
    const [renderKey, setRenderKey] = useState(0);
    const { mode, changeMode } = useCalculatorMode();
    const { congruences, addCongruence, removeCongruence, updateCongruence } = useCongruenceList(mode);
    const { steps, solution, solve, setSteps, setSolution } = useChineseRemainderTheorem();
    const inverseSolver = useModularInverseSolver()

    const [solutionVisible, setSolutionVisible] = useState(false);
    const [invSolutionVisible, setInvSolutionVisible] = useState(false);
    const [error, setError] = useState<{ type: string; message: string } | null>(null);

    const handleCalculate = () => {
        setError(null);
        setSolution(null);
        setSteps([]);
        inverseSolver.clear();
        setSolutionVisible(false);
        setInvSolutionVisible(false);
        try {
            switch (mode) {
                case 'CRT':
                    solve(congruences);
                    setRenderKey(prev => prev + 1);
                    setSolutionVisible(true);
                    break;
                case 'INVERSE':
                    inverseSolver.solve(congruences[0]);
                    setInvSolutionVisible(true);
                    break;
            }
        } catch (err: any) {
            const errorType = err instanceof TypeError ? 'type-error' : 'general-error';
            setError({
                type: errorType,
                message: err.message || 'Erro desconhecido durante o cálculo.'
            });
            setSolutionVisible(false);
            setInvSolutionVisible(false);
        }
    };

    useEffect(() => {
        setError(null);
        setSolutionVisible(false);
        setInvSolutionVisible(false);

        updateCongruence(1, 'coefficient', 1);
        updateCongruence(1, 'modulus', 1);
        updateCongruence(1, 'remainder', 1);
        for (let i = 1; i <= congruences.length; i++) removeCongruence(i);

        setSteps([]);
        setSolution(null);

        inverseSolver.clear();
    }, [mode]);


    return (
        <section className="flex flex-col my-10 items-center justify-center h-full w-full text-center">
            <img
                className="h-30 mb-3"
                src={illustration}
                alt="Imagem de um homem pensativo segurando uma bola de cristal"
            />

            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[700px] mx-auto px-4 shadow-md bg-primary-light p-5 rounded-2xl">
                <div className="flex flex-row justify-evenly">
                    <div className="flex flex-col items-center rounded-xl">
                        <p className="text-2sm font-primary text-white mb-2">Teorema Chinês do Resto</p>
                        <input
                            type="radio"
                            onChange={() => changeMode('CRT')}
                            defaultChecked
                            name="mode"
                            className="w-4 h-4 shadow-xl cursor-pointer appearance-none bg-white border-4 border-white rounded-full checked:bg-primary checked:scale-120 transition-all duration-500 ease-in-out"
                        />
                    </div>
                    <div className="flex flex-col items-center rounded-xl">
                        <p className="text-2sm font-primary text-white mb-2">Inverso</p>
                        <input
                            type="radio"
                            onChange={() => changeMode('INVERSE')}
                            name="mode"
                            className="w-4 h-4 shadow-xl cursor-pointer appearance-none bg-white border-4 border-white rounded-full checked:bg-primary checked:scale-120 transition-all duration-500 ease-in-out"
                        />
                    </div>
                </div>

                <div className="mt-3 p-5 bg-white h-auto flex-1 rounded-2xl shadow-md w-full overflow-auto">
                    <div className="flex flex-row space-x-4 justify-center items-center">
                        <div className="flex flex-row space-x-4 justify-center items-center">
                            <AnimatePresence mode="wait">
                                {mode === 'CRT' && (
                                    <motion.div key="add-button" {...fadeInOut}>
                                        <ButtonLink onClick={addCongruence}>Adicionar Equação</ButtonLink>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <ButtonLink onClick={handleCalculate}>Calcular</ButtonLink>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col space-y-4 ml-6">
                        {congruences.map((congruence, i) => (
                            <div key={i}>
                                <Congruence
                                    id={congruence.id}
                                    congruence={congruence}
                                    onChange={updateCongruence}
                                    onRemove={removeCongruence}
                                    disableRemove={mode === 'INVERSE' || congruences.length <= 2}
                                    mode={mode}
                                />
                            </div>
                        ))}
                    </div>

                    {(solutionVisible && mode === 'CRT' && solution !== null) && (
                        <CRTSolution key={renderKey} solution={solution} steps={steps} />
                    )}

                    {
                        invSolutionVisible && mode === 'INVERSE' &&(
                            <InverseSolution
                                inverse={inverseSolver.inverse}
                                congruence={inverseSolver.congruence}
                            />
                        )
                    }

                    {error && (
                        <motion.div {...fadeInOut}>
                            <Error type={error.type} message={error.message} />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
export default Calculator;