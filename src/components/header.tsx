import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/_header.css'

const walletStates: {[key:string]: string} = {
    empty: '/src/assets/Wallet/empty.png',
    default: '/src/assets/Wallet/default.png',
    full: '/src/assets/Wallet/full.png',
    stuffed: '/src/assets/Wallet/stuffed.png'
}

class Header extends React.Component<{ balance: any }> {

    getImgFromWalletState = () => {

        let {balance} = this.props;if(balance <= 100){
            return walletStates['empty'];
        }
        else if(balance <= 3000){
            return walletStates['default'];
        }
        else if(balance <= 10000){
            return walletStates['full'];
        }
        else{
            return walletStates['stuffed'];
        }
    };

    render() {
        let {balance} = this.props;
        let stateUrl = this.getImgFromWalletState();
        
        return (
            <div className="app-header">
                <div>
                    <Link to="/casino">
                        <button className="header-button">Back to games</button>
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <button className="header-button">Reset</button>
                    </Link>
                </div>
                <div className="header-balance">
                    Player Balance: ${balance}
                    <img src={stateUrl} height="50px"/>
                </div>
            </div>
        );
    }
}

export default Header;
