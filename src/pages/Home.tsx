import illustration from '../assets/home-illustration.svg';
import { ButtonLink } from '../components/ButtonLink';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <section className="flex flex-col items-center justify-center h-full text-center">
            <img className="h-30 sm:h-40 md:h-48 lg:h-40" src={illustration} alt="Imagem de um homem sorridente segurando uma bola de cristal" />

            <div className="flex flex-col items-center text-center justify-center sm:mx-10 md:mx-20 lg:mx-75">
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-secondary text-primary mx-4">
                    Boas vindas ao Guru do TCR!
                </h1>
                <p className="m-3 text-sm sm:text-base mx-4 font-primary text-primary">
                    O Teorema Chinês do Resto é uma ferramenta matemática eficiente para resolver sistemas de congruências, sendo essencial na criptografia moderna, como no algoritmo RSA.
                </p>

                <p className="m-2 text-sm sm:text-base mx-8 font-primary text-primary">
                    Esses cálculos podem ser difíceis, mas o Guru do TCR veio para te ajudar!
                </p>

                <motion.div
                    className="m-5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5 }}
                >
                    <ButtonLink to="/calculadora" textColor="text-white" bgColor="bg-primary" hoverColor="hover:bg-primary-light">
                        Começar a calcular
                    </ButtonLink>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
