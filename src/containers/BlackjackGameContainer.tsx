import Header from "../components/header.tsx";
import React from "react";

const Blackjack = () => {
    return (
        <><Header balance={1000}/>
            <div>
                <h2>Blackjack Game Page</h2>
                {/* Add Blackjack game content */}
            </div>
        </>
    );
};

export default Blackjack;