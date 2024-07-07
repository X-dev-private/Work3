import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './SwitchButton.css';

const SwitchButton = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/App');
  };

  const handleScroll = () => {
    if (window.scrollY > 10) { 
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button className={`switch-button ${scrolled ? 'scrolled' : ''}`} onClick={handleClick}>
      {scrolled ? '' : 'Open Work3'}
    </button>
  );
};

export default SwitchButton;