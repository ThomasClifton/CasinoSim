import { useState } from "react";
import "/src/styles/_slots.css";
import Header from "../components/header.tsx";
import { Slider, Space } from '@mantine/core';
import { useBalanceStore } from '../store/store';
import winSound from '../assets/Music/playful-casino-slot-machine-bonus.mp3';
import coin from '../assets/Music/coin-donation-2-180438.mp3';
import { useModalStore } from '../store/modalStore.ts';
import ModalComponent from '../components/ModalComponent.tsx';

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
    const { toggleModal } = useModalStore();
    
    const checkWallet = () => {
        if(balance < 0){
            toggleModal();
        }
    }

    const [value, setValue] = useState(40);

    var winSoundPlayer = new Audio(winSound);
    var coinSoundPlayer = new Audio(coin);
    
    const addMoney = useBalanceStore((state) => state.addMoney);
    const loseMoney = useBalanceStore((state) => state.loseMoney);

    const handleSpinClick = () => {
        const randomItems = slotsItems.map(() => {
            const randomIndex = Math.floor(Math.random() * slotsItems.length);
            return slotsItems[randomIndex];
        }).slice(0, 3);
        setSelectedItems(randomItems);

        checkWallet();

        const handle = document.getElementById("slots-handle");
        handle.style.transform = "rotate(180deg)";
        setTimeout(() => {
            handle.style.transform = "rotate(360deg)";
        }, 1000);

        coinSoundPlayer.play();
        coinSoundPlayer.currentTime = 0;
        
        if(randomItems[0] == randomItems[1] && randomItems[1] == randomItems[2] && randomItems[0] != null){
            // have multiplier change based on which symbol it is
            let multiplier = 1;
            switch (randomItems[0]) {
                case 'melon':
                    multiplier = 200;
                    break;
                case 'heart':
                    multiplier = 100;
                    break;
                case 'cherry':
                    multiplier = 150;
                    break;
                case 'clover':
                    multiplier = 75;
                    break;
                case 'bell':
                    multiplier = 50;
                    break;
                case 'bar':
                    multiplier = 125;
                    break;
                case 'seven':
                    multiplier = 500;
                    break;
                default:
                    multiplier = 1;
            }
            winSoundPlayer.play();
            addMoney(value * multiplier);
            winSoundPlayer.currentTime = 0;
        }
        else{
            loseMoney(value);
        }
    };
    
    return (
        <div>
            <Header balance={balance}/>
            <ModalComponent />
            <div>
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
                <Space h="150"/>
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
        </div>
        
        
    );
    
};

export default Slots;