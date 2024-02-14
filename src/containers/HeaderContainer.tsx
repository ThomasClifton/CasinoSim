import '../styles/_home.css';

const Header = ({ title = "Casino Sim", playerBalance = 1000}) => {
    return (
        <header className="app-header">
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                <h1>Player's Balance: ${playerBalance}</h1>
            </div>
        </header>
    );
};

export default Header;
