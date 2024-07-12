// src/Wallet.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
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

    const sendTransaction = async () => {
        if (web3 && account) {
            try {
                const value = web3.utils.toWei(amount, 'ether');
                await web3.eth.sendTransaction({
                    from: account,
                    to: toAddress,
                    value: value
                });
                alert('Transação enviada!');
            } catch (error) {
                console.error('Erro ao enviar transação:', error);
            }
        }
    };

    return (
        <div className="wallet-container">
            <h1>React Wallet</h1>
            <button onClick={connectWallet}>Conectar Wallet</button>
        <div>
            {!isConnected && ( // Conditionally render the button
                <button onClick={connectWallet}>Conectar Wallet</button>
            )}
            {account && (
                <div>
                    <p><strong>Conta:</strong> {account}</p>
                    <p><strong>Saldo:</strong> {balance} ETH</p>
                    <div>
                        <h2>Enviar Transação</h2>
                        <input
                            type="text"
                            placeholder="Endereço do Destinatário"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Valor em ETH"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button onClick={sendTransaction}>Enviar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;