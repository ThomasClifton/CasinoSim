import { Link } from 'react-router-dom';
import '../styles/_home.css';
import sound from '../assets/Music/bruit-2-casino-56939.mp3';
import { useBalanceStore } from '../store/store';
import { useMusicStore } from '../store/musicStore';
import { Space } from '@mantine/core';
import casinoBackground from '../assets/Casino Floor.jpg'


const Home = () => {
    const reset = useBalanceStore((state) => state.reset);
    const { isPlaying, toggleMusic } = useMusicStore();

    const playAudio = () => {
        if(!isPlaying){
            var audioElement = new Audio(sound);
            audioElement.play();
            audioElement.loop = true;
            toggleMusic();
        }
    }

    document.body.onclick = () => {
        if(isPlaying) return ;
        playAudio();
    }

    const resetStore = () => {
        reset();
    }

    return (
        <div className="home-container">
            <h2>Welcome to Casino Sim!</h2>
            <Space h="400"/>
            <div className="home-buttons">
                <Link to="/casino">
                    <button onClick={resetStore}>Play</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
