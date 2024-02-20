import { Link } from 'react-router-dom';
import '../styles/_home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to Casino Sim!</h2>
            <p>
                Message about game
            </p>

            <div className="home-buttons">
                <Link to="/casino">
                    <button>Play</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
