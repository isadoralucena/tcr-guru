import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';
import { motion } from 'framer-motion';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="relative bg-primary-dark text-white shadow-md px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img src={logo} alt="Logo" className="h-10 sm:h-10 md:h-16 lg:h-16" />
                <span className="font-secondary text-2xl sm:text-2xl md:text-4xl lg:text-4xl">TCR GURU</span>
            </div>

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden focus:outline-none"
                aria-label="Abrir menu"
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className="hidden sm:block">
                <ul className="flex space-x-8 text-base">
                    <li>
                        <Link to="/" className="hover:text-neutral-400 transition">Página inicial</Link>
                    </li>
                    <li>
                        <Link to="/calculadora" className="hover:text-neutral-400 transition">Calculadora</Link>
                    </li>
                    <li>
                        <Link to="/materiais" className="hover:text-neutral-400 transition">Materiais</Link>
                    </li>
                </ul>
            </nav>

            {/* Menu lateral animado com Framer Motion */}
            {menuOpen && (
                <motion.div
                    className="absolute top-full left-0 w-full bg-primary-dark shadow-md sm:hidden z-50"
                    initial={{ opacity: 0, y: -300 }}  // Começa acima da tela
                    animate={{ opacity: 1, y: 0 }}    // Desce para a posição final abaixo do header
                    exit={{ opacity: 0, y: -300 }}    // Sobe para fora da tela ao fechar
                    transition={{ duration: 0.3 }}     // Duração da animação
                >
                    <ul className="flex flex-col items-start p-4 space-y-4 text-base">
                        <li>
                            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-neutral-400 transition">Página inicial</Link>
                        </li>
                        <li>
                            <Link to="/calculadora" onClick={() => setMenuOpen(false)} className="hover:text-neutral-400 transition">Calculadora</Link>
                        </li>
                        <li>
                            <Link to="/materiais" onClick={() => setMenuOpen(false)} className="hover:text-neutral-400 transition">Materiais</Link>
                        </li>
                    </ul>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
