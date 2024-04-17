import { useState } from "react";
import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store';
import '../styles/_bomb.css';


const Bomb = () => {
    const balance = useBalanceStore((state) => state.balance);

    const [board, setBoard] = useState<boolean[][]>(Array(5).fill(Array(5).fill(false)));

    const handleCellClick = (row: number, column: number) => {
        console.log(`Clicked on (${row}, ${column})`);
    }
    
    return (
        <><Header balance={balance}/>
            <div>
                <h2>Bomb Game Page</h2>
                <div className="bombContainer">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="row">
                          {row.map((cell, colIndex) => (
                            <div key={colIndex} className={`cell${cell ? 'revealed' : ''}`} onClick={() => handleCellClick(rowIndex, colIndex)} />
                          ))}
                        </div>
                      ))}
                </div>
            </div>
        </>
    );
};

export default Bomb;