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
                            <img src="/src/assets/slots.jpg"/>
                        </button>
                    </Link>
                    <Link to="/blackjack">
                        <button className='gameButton'>
                            <img src="/src/assets/blackjack.jpg"/>
                        </button>
                    </Link>
                    <Link to="/bomb">
                        <button className='gameButton'>
                            <img src="/src/assets/mine.jpg"/>
                        </button>
                    </Link>
                    <Link to="/pachinko">
                        <button className='gameButton'>
                            Pachinko
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Casino;
