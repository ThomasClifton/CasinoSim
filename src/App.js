import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Slots from './components/Slots/Slots';
import Blackjack from './components/Blackjack/Blackjack';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import './App.css';

const App = () => {
    const [playerBalance, setPlayerBalance] = useState(1000); // Initial balance

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
    );
};

export default App;
