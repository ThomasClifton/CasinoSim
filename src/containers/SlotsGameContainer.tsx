import React, { useState } from "react";
import "/src/styles/_slots.css";
import Header from "../components/header.tsx";
import { NumberInput, Slider } from '@mantine/core';
import { useBalanceStore } from '../store/store';

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
    const balance = useBalanceStore((state) => state.balance);
    
    const addMoney = useBalanceStore((state) => state.addMoney);
    const loseMoney = useBalanceStore((state) => state.loseMoney);
    
    const bet = 100;
    
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
        }, 1000);
    };
    
    return (
        <div>
        <Header balance={balance}/>
        <div className="slotsPage">
            <div className="slots-container">
                {selectedItems.map((selectedItem, index) => (
                    <div className="column" key={index}>
                        {selectedItem && <img src={slotsImages[selectedItem]} alt={selectedItem} />}
                    </div>
                ))}
            </div>
            <button id="slots-handle" onClick={handleSpinClick}>
                <img src="./src/assets/Slots/slotshandle.png" height="150px"/>
            </button>
        </div>
            
            <button id="testWin" onClick={() => addMoney(bet)}>Test a Win</button>
            <button id="testLoss" onClick={() => loseMoney(bet)}>Test a Loss</button>
                        
            {
            // https://mantine.dev/core/slider/
            }
            <div className="sliderContainer">
            <Slider min={1}
            color="blue"
            marks={[
                { value: 0, label: '1' },
                { value: 100, label: '100' },
            ]}
            />
            </div>
        </div>
        
        
    );
    
};

export default Slots;