import { Link } from 'react-router-dom';
import '../styles/_home.css';
import Header from "../components/header.tsx";
import { useState } from 'react'
//import '../styles/_casino.css';

const Casino = () => {
    const [playerBalance, setPlayerBalance] = useState(1000)

    return (
        <><Header balance={playerBalance}/>
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
