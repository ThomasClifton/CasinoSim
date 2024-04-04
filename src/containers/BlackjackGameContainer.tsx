import Header from "../components/header.tsx";
import {useBalanceStore} from "../store/store.ts";

const Blackjack = () => {
    const balance = useBalanceStore((state) => state.balance);

    return (
        <><Header balance={balance}/>
            <div>
                <h2>Blackjack Game Page</h2>
                {/* Add Blackjack game content */}
            </div>
        </>
    );
};

export default Blackjack;