import React from 'react';
import {Link} from "react-router-dom";

const Blackjack = () => {
    return (
        <div>
            <Link to="/">
                <button>Back to home</button>
            </Link>

            <h2>Blackjack Game Page</h2>
            {/* Add Blackjack game content */}
        </div>
    );
};

export default Blackjack;