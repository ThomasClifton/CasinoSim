import { Link } from 'react-router-dom';
import '../styles/_home.css';
import sound from '../assets/Music/casino-ambiance-19130.mp3'
import { useBalanceStore } from '../store/store';


const Home = () => {
    var isAudioPlayed = false;

    const reset = useBalanceStore((state) => state.reset);

    const playAudio = () => {
        var audioContext = new AudioContext();
        isAudioPlayed = true;
        //var audioElement = new Audio("../assets/Music/casino-ambiance-19130.mp3");
        var audioElement = new Audio(sound);
        var audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(audioContext.destination);
        audioElement.play();
    }

    document.body.onclick = () => {
        if(isAudioPlayed) return ;
        console.log("clicked");
        playAudio();
    }

    const resetStore = () => {
        reset();
    }

    return (
        <div className="home-container">
            <h2>Welcome to Casino Sim!</h2>
            <p>
                Message about game
            </p>

            <div className="home-buttons">
                <Link to="/casino">
                    <button onClick={resetStore}>Play</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
