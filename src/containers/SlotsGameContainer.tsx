import React, { useState } from "react";
import "/src/styles/_slots.css";

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

    const [selectedItems, setSelectedItems] = useState<Array<string | null>>([null, null, null]);
  
    
    const handleSpinClick = () => {
        const randomItems = slotsItems.map(() => {
            const randomIndex = Math.floor(Math.random() * slotsItems.length);
            return slotsItems[randomIndex];
        }).slice(0, 3);
        setSelectedItems(randomItems);
    };
    
    return (
        <>
            <div className="slotsContainer">
                {selectedItems.map((selectedItem, index) => (
                    <div className="column" key={index}>
                        {selectedItem && <img src={slotsImages[selectedItem]} alt={selectedItem} />}
                    </div>
                ))}
            </div>
            <button onClick={handleSpinClick}>Spin</button>
        </>
        
    );
    
};

export default Slots;