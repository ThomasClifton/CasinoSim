import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css'
import Slots from './containers/SlotsGameContainer';
import Blackjack from './containers/BlackjackGameContainer';
import Header from './components/header';
import Home from './containers/HomeContainer';
import Casino from './containers/CasinoContainer';
import '@mantine/core/styles.css'
//import './App.css';

function App() {
  const [playerBalance, setPlayerBalance] = useState(1000)

  return (
    <Router>
            <div>
                <Header balance={playerBalance} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/casino" element={<Casino />} />
                    <Route path="/slots" element={<Slots />} />
                    <Route path="/blackjack" element={<Blackjack />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App
