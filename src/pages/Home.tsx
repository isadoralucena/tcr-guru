import { Link } from 'react-router-dom';
import illustration from '../assets/home-illustration.svg';
import { ButtonLink } from '../components/ButtonLink';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <section className="flex flex-col items-center justify-center h-full text-center">
            <img className="h-50" src={illustration} alt="Imagem de um homem sorridente segurando uma bola de cristal" />
            <div className="flex flex-col items-center text-center justify-center mx-75">
                <h1 className="text-4xl font-secondary text-primary">
                    Boas vindas ao Guru do TCR!
                </h1>
                <p className="m-3 text-sm font-primary text-primary">
                    O Teorema Chinês do Resto é uma ferramenta matemática eficiente para resolver sistemas de congruências, sendo essencial na criptografia moderna, como no algoritmo RSA.
                </p>

                <p className="m-1 text-sm font-primary text-primary">
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