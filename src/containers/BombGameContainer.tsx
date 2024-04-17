import { useState } from "react";
import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store';
import { SimpleGrid } from "@mantine/core";
import '../styles/_bomb.css';


const Bomb = () => {
    const balance = useBalanceStore((state) => state.balance);

    // const [board, setBoard] = useState<boolean[][]>(Array(5).fill(Array(5).fill(false)));

    const [board, setBoard] = useState<boolean[]>(Array(25).fill(false));

    const handleCellClick = (row: number, column: number) => {
        console.log("Clicked on (${row}, ${column})");
    }
    
    return (
        <><Header balance={balance}/>
            <div className="bombContainer">
                <h2>Bomb Game Page</h2>
                <SimpleGrid cols={5} spacing={"xs"} verticalSpacing={"xs"}>
                    {board.map ((row, rowIndex) => (
                        <div key={rowIndex} className="cell"></div>
                    ))}
                </SimpleGrid>
            </div>
        </>
    );
};

export default Bomb;