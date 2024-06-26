import { Link } from 'react-router-dom';
import Header from "../components/header.tsx";
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
                        <button className='gameButton'>
                            <img src="/src/assets/slots.jpg" className="gameIcon"/>
                        </button>
                    </Link>
                    <Link to="/blackjack">
                        <button className='gameButton'>
                            <img src="/src/assets/blackjack.jpg" className="gameIcon"/>
                        </button>
                    </Link>
                    <Link to="/bomb">
                        <button className='gameButton'>
                            <img src="/src/assets/mine.jpg" className="gameIcon"/>
                        </button>
                    </Link>
                    <Link to="/pachinko">
                        <button className='gameButton'>
                            <img src="/src/assets/pachinko.png" className="gameIcon"/>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Casino;
