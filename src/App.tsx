import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Materials from './pages/Materials'

function App() {
    return (
        <Router basename="/tcr-guru">
            <div className="min-h-screen flex flex-col">
                <Header/>
                <main className="flex-grow flex justify-center items-center">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/calculadora" element={<Calculator/>} />
                        <Route path="/materiais" element={<Materials/>} />
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    )
}

export default App