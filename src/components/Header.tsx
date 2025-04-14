import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Header = () => {
    return (
        <header className="flex py-2 px-15 bg-primary-dark text-white shadow-md items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-15 mr-2" />
                <span className="font-secondary text-4xl mt-1">TCR GURU</span>
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-white font-primary hover:text-neutral-400 transition-all duration-500 ease-in-out">Página inicial</Link>
                    </li>
                    <li>
                        <Link to="/calculadora" className="text-white font-primary hover:text-neutral-400 transition-all duration-500 ease-in-out">Calculadora</Link>
                    </li>
                    <li>
                        <Link to="/materiais" className="text-white font-primary hover:text-neutral-400 transition-all duration-500 ease-in-out">Materiais</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;