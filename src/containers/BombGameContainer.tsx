import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store';


const Bomb = () => {
    const balance = useBalanceStore((state) => state.balance);

    return (
        <><Header balance={balance}/>
            <div>
                <h2>Bomb Game Page</h2>
                {/* Add Blackjack game content */}
            </div>
        </>
    );
};

export default Bomb;