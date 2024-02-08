import React from 'react';
import './Header.css';

const Header = ({ title, playerBalance }) => {
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
