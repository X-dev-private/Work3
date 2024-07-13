// src/Wallet.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import logoImage from '../../../Styles/Images/2.png';
import '../../../Styles/GlobalComponents.css';

const Wallet = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
        } else if (window.web3) {
            const web3Instance = new Web3(window.web3.currentProvider);
            setWeb3(web3Instance);
        } else {
            console.log('MetaMask não detectado');
        }
    }, []);

    const connectWallet = async () => {
        if (web3) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                setIsConnected(true); // Set isConnected to true when connected
            } catch (error) {
                console.error('Erro ao conectar à carteira:', error);
            }
        }
    };

    return (
        <div className="wallet-container">
            {isConnected? (
                <div className='WalletInfo'>
                    <div className='logoWallet'>
                        <img src={logoImage} alt="logo"/>
                        </div>
                    <div className='walletName'>
                        <p><strong>Conta:</strong> {account.slice(0, 7)}...</p>
                        <p>nome de usuario</p>
                    </div>
                </div>
            ) : (
                <button onClick={connectWallet}>Conectar Wallet</button>
            )}
        </div>
    );
};

export default Wallet;