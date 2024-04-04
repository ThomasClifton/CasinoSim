import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css'
import Slots from './containers/SlotsGameContainer';
import Blackjack from './containers/BlackjackGameContainer';
import Home from './containers/HomeContainer';
import Casino from './containers/CasinoContainer';
import '@mantine/core/styles.css'
import Bomb from "./containers/BombGameContainer.tsx";
//import './App.css';

function App() {
  return (
    <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/casino" element={<Casino />} />
                    <Route path="/slots" element={<Slots />} />
                    <Route path="/blackjack" element={<Blackjack />} />
                    <Route path="/bomb" element={<Bomb />} />
                </Routes>
            </div>
        </Router>
  )
}

export default App
