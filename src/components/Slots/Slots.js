import React from 'react';
import {Link} from "react-router-dom";

const Slots = () => {
    return (
        <div>
            <Link to="/">
                <button>Back to home</button>
            </Link>

            <h2>Slots Game Page</h2>
            {/* Add Slots game content */}
        </div>
    );
};

export default Slots;
