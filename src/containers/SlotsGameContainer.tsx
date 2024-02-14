import React, { useState } from "react";
import {Link} from "react-router-dom";

const slotsItems = ['melon', 'heart', 'cherry', 'clover', 'bell', 'bar', 'seven'];
const slotsImages: {[key:string]: string} = {
    melon: '/src/assets/Slots/melon.png',
    heart: '/src/assets/Slots/heart.png',
    cherry: '/src/assets/Slots/cherry.png',
    clover: '/src/assets/Slots/clover.png',
    bell: '/src/assets/Slots/bell.png',
    bar: '/src/assets/Slots/bar.png',
    seven: 'src/assets/Slots/seven.png'
};

const Slots = () => {

    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSpinClick = () => {
        const randomIndex = Math.floor(Math.random() * slotsItems.length);
        const randomItem = slotsItems[randomIndex];
        setSelectedItem(randomItem);
    }
    return (
        <div>
            <Link to="/">
                <button>Back to home</button>
            </Link>

            <h2>Slots Game Page</h2>
            {/* Add Slots game content */}
            <button onClick={handleSpinClick}>Spin</button>
            <div>
                {selectedItem && <img src={slotsImages[selectedItem]}/>}
            </div>
            
        </div>
    );
};

export default Slots;   
