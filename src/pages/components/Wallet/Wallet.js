// src/Wallet.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [isConnected, setIsConnected] = useState(false); // Add this state

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
                const balance = await web3.eth.getBalance(accounts[0]);
                setBalance(web3.utils.fromWei(balance, 'ether'));
                setIsConnected(true); // Set isConnected to true when connected
            } catch (error) {
                console.error('Erro ao conectar à carteira:', error);
            }
        }
    };

    return (
        <div>
            {!isConnected && ( // Conditionally render the button
                <button onClick={connectWallet}>Conectar Wallet</button>
            )}
            {account && (
                <div>
                    <p><strong>Conta:</strong> {account}</p>
                    <p><strong>Saldo:</strong> {balance} ETH</p>
                </div>
            )}
        </div>
    );
};

export default Wallet;