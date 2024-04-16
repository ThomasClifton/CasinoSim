import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store';


const Bomb = () => {
    const balance = useBalanceStore((state) => state.balance);

    return (
        <><Header balance={balance}/>
            <div>
                <h2>Bomb Game Page</h2>
                
            </div>
        </>
    );
};

export default Bomb;