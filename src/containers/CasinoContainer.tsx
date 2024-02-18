import { Link } from 'react-router-dom';
import '../styles/_home.css';
//import '../styles/_casino.css';

const Casino = () => {
    return (
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
    );
};

export default Casino;
