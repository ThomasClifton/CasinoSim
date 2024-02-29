import React, { useState } from "react";
import "/src/styles/_slots.css";
import { NumberInput, Slider } from '@mantine/core';

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
    const [value, setValue] = useState<number | string>(1000);
  
    
    const handleSpinClick = () => {
        const randomItems = slotsItems.map(() => {
            const randomIndex = Math.floor(Math.random() * slotsItems.length);
            return slotsItems[randomIndex];
        }).slice(0, 3);
        setSelectedItems(randomItems);
        const handle = document.getElementById("slotsHandle");
        handle.style.transform = "rotate(180deg)";
        setTimeout(() => {
            handle.style.transform = "rotate(360deg)";
        }, 2000);
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
            <button id="slotsHandle" onClick={handleSpinClick}>
                <img src="./src/assets/Slots/slotshandle.png" height="150px"/>
            </button>
                        
            {
            // https://mantine.dev/core/slider/
            }
            <Slider
            color="blue"
            marks={[
                { value: 0, label: '0%' },
                { value: 1000, label: '100%' },
            ]}
            />
        </>
        
        
    );
    
};

export default Slots;