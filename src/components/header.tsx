import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/_header.css'

class Header extends React.Component<{ balance: any }> {
    render() {
        let {balance} = this.props;
        return (
            <div className="app-header">
                <div>
                    <Link to="/">
                        <button>Back to home</button>
                    </Link>
                </div>
                <div className="header-balance">
                    Player Balance: ${balance}
                </div>
            </div>
        );
    }
}

export default Header;
