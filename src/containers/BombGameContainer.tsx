import { useState, MouseEventHandler } from "react";
import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store';
import { SimpleGrid } from "@mantine/core";
import { Slider } from '@mantine/core';
import '../styles/_bomb.css';


const Bomb = () => {
    const balance = useBalanceStore((state) => state.balance);
    const [value, setValue] = useState(40);
    const [bombCount, setBombCount] = useState(1)

    // array of 25 bools set to false, represents the 25 tiles and if its a mine or not
    const [board, setBoard] = useState<boolean[]>(Array(25).fill(false));

    // array of 25 bools same as above but to see if they have been clicked or not
    const [clicked, setClicked] = useState<boolean[]>(Array(25).fill(false));

    const generateBombs = (bombCount: number): boolean[] => {
        const newBoard: boolean[] = Array(25).fill(false);
        const bombIndexes: number[] = [];
        while (bombIndexes.length < bombCount) {
            const randomNum = Math.floor(Math.random() * 25);
            if (!bombIndexes.includes(randomNum)) bombIndexes.push(randomNum);
        }
        bombIndexes.forEach(index => {
            newBoard[index] = true;
        });
        return newBoard;
    };


    const handleStartGame = () => {
        const newBoard = generateBombs(bombCount);
        setBoard(newBoard);
        setClicked(Array(25).fill(false));
    };

    const handleCellClick = (index: number) => {
        if (clicked[index])
            {
                return;
            }
        setClicked(prevClicked => {
            const newClickedCells = [...prevClicked];
            newClickedCells[index] = true; // Mark cell as clicked
            return newClickedCells;
        })

        if (board[index]) {
            setClicked(Array(25).fill(true));
            console.log("You clicked on a bomb!");
        } else {
            console.log("You clicked on a gem!");
        }
    };
    
    

    return (
        <><Header balance={balance}/>

            
            <div>Bet Amount</div>
            <div className="sliderContainer">
            <Slider min={10}
                color="rgba(60, 76, 83, 1"
                id="betSlider"
                value={value}
                onChange={setValue}
                marks={[
                    { value: 10, label: '10' },
                    { value: 100, label: '100' },
                ]}
            />
            </div>
            
            <div>Bomb Count</div>
            <div className="sliderContainer">
            <Slider min={1} max={24}
                color="rgba(60, 76, 83, 1"
                id="betSlider"
                value={bombCount}
                onChange={setBombCount}
                marks={[
                    { value: 1, label: '1' },
                    { value: 24, label: '24' },
                ]}
            />
            </div>
            <button onClick={handleStartGame}>Start Game</button>
            <div className="bombContainer">
                <h2>Bomb Game Page</h2>
                <SimpleGrid cols={5} spacing={0} verticalSpacing={0}>
                    {board.map((cell, index) => (
                        <div key={index} className="cell" onClick={() => handleCellClick(index)} style={{ pointerEvents: clicked[index] ? 'none' : 'auto' }}>
                            {clicked[index] && (cell ? "💣" : "💎")}
                        </div>
                    ))}
                </SimpleGrid>
            </div>
        </>
    );
};

export default Bomb;