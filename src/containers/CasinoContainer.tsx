import { Link } from 'react-router-dom';
import Header from "../components/header.tsx";
import { useState } from 'react'
import { useBalanceStore } from '../store/store';
import '../styles/_casino.css';

const Casino = () => {
    const balance = useBalanceStore((state) => state.balance);

    return (
        <>
        <div><Header balance={balance}/></div>
            <div className="casino-container">
                <div className="casino-buttons">
                    <Link to="/slots">
                        <button>Play Slots</button>
                    </Link>
                    <Link to="/blackjack">
                        <button>Play Blackjack</button>
                    </Link>
                </div>
            </div>
        
        </>
    );
};

export default Casino;
