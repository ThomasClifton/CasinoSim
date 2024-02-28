import React, { useState } from "react";
import "/src/styles/_slots.css";
import { NumberInput, Slider } from '@mantine/core';
import classes from './SliderInput.module.css';

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
            <div className={classes.wrapper}>
                <NumberInput
                    value={value}
                    onChange={setValue}
                    label="Your bet amount"
                    step={50}
                    min={0}
                    max={1000}
                    hideControls
                    classNames={{ input: classes.input, label: classes.label }}
                />
                <Slider
                    max={1000}
                    step={50}
                    min={0}
                    label={null}
                    value={typeof value === 'string' ? 0 : value}
                    onChange={setValue}
                    size={2}
                    className={classes.slider}
                    classNames={classes}
                />
            </div>
        </>
        
        
    );
    
};

export default Slots;