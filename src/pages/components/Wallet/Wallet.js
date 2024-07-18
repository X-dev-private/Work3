import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import '../../../Styles/GlobalComponents.css';
import logoImage from '../../../Styles/Images/2.png'; // Supondo que logoImage esteja definido corretamente

const Wallet = ({ receiveAccount }) => {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

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

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (account) {
                try {
                    const response = await axios.get(`http://localhost:5000/userInfo/${account}`);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error('Erro ao buscar informações do usuário:', error);
                }
            }
        };

        fetchUserInfo();
    }, [account]);

    const connectWallet = async () => {
        if (web3) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                const connectedAccount = accounts[0];
                
                setAccount(connectedAccount);
                setIsConnected(true);
                receiveAccount(connectedAccount); // Envia a conta conectada para o componente pai

                // Envia a conta e a data para o S3
                const currentDate = new Date().toISOString(); // Obtemos a data atual no formato ISO
                const userProfile = {
                    account: connectedAccount,
                    userName: '',
                    userDescription: '',
                    logo: logoImage,
                    date1: currentDate
                };

                try {
                    const response = await axios.post('http://localhost:5000/uploadProfile', userProfile);
                    console.log('Profile uploaded successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading profile:', error);
                }
            } catch (error) {
                console.error('Erro ao conectar à carteira:', error);
            }
        }
    };

    return (
        <div className="wallet-container">
            {isConnected ? (
                <div className='WalletInfo'>
                    <div className='logoWallet'>
                        <img src={logoImage} alt="logo" />
                    </div>
                    <div className='walletName'>
                        <p><strong>Conta:</strong> {account.slice(0, 7)}...</p>
                        {userInfo ? (
                            <>
                                <p>Nome de usuário: {userInfo.userName}</p>
                            </>
                        ) : (
                            <p>Carregando informações do usuário...</p>
                        )}
                    </div>
                </div>
            ) : (
                <button onClick={connectWallet}>Conectar Wallet</button>
            )}
        </div>
    );
};

export default Wallet;

