import React from 'react';
import "../../../Styles/GlobalLibs.css";
import logoImage from '../../../Styles/Images/2.png';
import SwitchBotton from '../../components/swichBotton/SwitchButton';

const Header = () => {
  return (
    <header className="header">
      <div className="logo"> 
        <a href="/"> 
          <img src={logoImage} alt="logo" />
        </a>
      </div>
      <div className="container">
        <nav>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/development-team">Development Team</a></li>
            <li><a href="/nft">NFT</a></li>
          </ul>
        </nav>
      </div>
      <div className="header-button">
        <SwitchBotton />
      </div>
    </header>
  );
};

export default Header;
