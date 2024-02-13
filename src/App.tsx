import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css'
import Slots from './containers/SlotsGameContainer';
import Blackjack from './containers/BlackjackGameContainer';
import Header from './containers/HeaderContainer';
import Home from './containers/HomeContainer';
//import './App.css';

function App() {
  const [playerBalance, setPlayerBalance] = useState(1000)

  return (
    <Router>
            <div>
                <Header title="Casino Sim" playerBalance={playerBalance} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/slots" element={<Slots />} />
                    <Route path="/blackjack" element={<Blackjack />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App
