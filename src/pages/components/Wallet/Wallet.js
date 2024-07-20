import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import logoImage from '../../../Styles/Images/guest.jpg';
import '../../../Styles/GlobalComponents.css';

const Wallet = ({ receiveAccount, receiveUserInfo }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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
        const connectedAccount = accounts[0];
        
        setAccount(connectedAccount);
        setIsConnected(true);

        if (connectedAccount) {
          let userInfo = await fetchUserInfo(connectedAccount);
          if (Object.keys(userInfo).length === 0) {
            // Usuário conectando pela primeira vez
            userInfo = {
              account: connectedAccount,
              userName: 'Novo Usuário',
              userDescription: '',
              profileImage: logoImage,  // Alterado para profileImage
              date1: new Date().toISOString()
            };
            await saveUserInfo(userInfo);
          }
          receiveAccount(connectedAccount);
          receiveUserInfo(userInfo);
        }
      } catch (error) {
        console.error('Erro ao conectar à carteira:', error);
      }
    }
  };

  const fetchUserInfo = async (connectedAccount) => {
    try {
      const response = await axios.get(`http://localhost:5000/userInfo/${connectedAccount}`);
      const userProfile = response.data;
      if (Object.keys(userProfile).length > 0) {
        setUserInfo(userProfile);
        return userProfile;
      } else {
        setUserInfo(null);
        return {};
      }
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
      setUserInfo(null);
      return {};
    }
  };

  const saveUserInfo = async (userInfo) => {
    try {
      await axios.post('http://localhost:5000/uploadProfile', userInfo);
    } catch (error) {
      console.error('Erro ao salvar informações do usuário:', error);
    }
  };

  const getLogo = () => {
    return userInfo && userInfo.profileImage ? userInfo.profileImage : logoImage;  // Alterado para profileImage
  };

  return (
    <div className="wallet-container">
      {isConnected ? (
        <div className='WalletInfo'>
          <div className='logoWallet'>
            <img src={getLogo()} alt="logo" />
          </div>
          <div className='walletName'>
            <p><strong>Conta:</strong> {account.slice(0, 7)}...</p>
            {userInfo ? (
              <p>{userInfo.userName}</p>
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