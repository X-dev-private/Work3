import React, { useState, useEffect } from 'react';
import './Header.css';
import logoImage from './2.png';
import SwitchBotton from '../../components/swichBotton/SwitchButton';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY > 5) {
        setIsScrolled(true);
        setIsSwitched(!isSwitched);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
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
        <SwitchBotton switched={isSwitched} scrolled={isScrolled} /> {/* Pass the scrolled state as a prop */}
      </div>
    </header>
  );
};

export default Header;
