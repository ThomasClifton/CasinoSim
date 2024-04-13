import { useState } from "react";
import "/src/styles/_slots.css";
import Header from "../components/header.tsx";
import { Slider } from '@mantine/core';
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

    const [value, setValue] = useState(40);
    
    const addMoney = useBalanceStore((state) => state.addMoney);
    const loseMoney = useBalanceStore((state) => state.loseMoney);
    
    const handleSpinClick = () => {
        const randomItems = slotsItems.map(() => {
            const randomIndex = Math.floor(Math.random() * slotsItems.length);
            return slotsItems[randomIndex];
        }).slice(0, 3);
        setSelectedItems(randomItems);
        const handle = document.getElementById("slots-handle");
        handle.style.transform = "rotate(180deg)";
        setTimeout(() => {
            handle.style.transform = "rotate(360deg)";
        }, 1000);
        if(selectedItems[0] == selectedItems[1] && selectedItems[1] == selectedItems[2]){
            // have multiplier change based on which symbol it is
            let multiplier = 1;
            addMoney(value * multiplier);
        }
        else{
            loseMoney(value);
        }
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
                        
            {
            // https://mantine.dev/core/slider/
            }
            <div className="sliderContainer">
            <Slider min={10}
                color="blue"
                id="betSlider"
                value={value}
                onChange={setValue}
                marks={[
                    { value: 10, label: '10' },
                    { value: 100, label: '100' },
                ]}
            />
            </div>
        </div>
        
        
    );
    
};

export default Slots;