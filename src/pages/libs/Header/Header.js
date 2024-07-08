import React from 'react';
import './Header.css';
import logoImage from './2.png';
import SwitchBotton from '../../components/swichBotton/SwitchButton';

const Header = () => {

  return (
    <header className="header">
      <div class="logo"> 
        <img src={logoImage} alt="logo" />
      </div>
      <div class="container">
        <nav>
          <ul>
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/our-plan">Our Plan</a></li>
            <li><a href="/join-me">Join Me</a></li>
            <li><a href="/more">More</a></li>
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
