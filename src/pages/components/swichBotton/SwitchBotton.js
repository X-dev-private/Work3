import React, { useState, useEffect } from "react";
import './SwitchBotton.css';

const SwitchBotton = () => {
  const [switched, setSwitched] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => {
    setSwitched(!switched);
  };

  const handleScroll = () => {
    if (window.scrollY > 5) { 
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
    <button className={`switch-button ${switched ? 'switched' : ''} ${scrolled ? 'scrolled' : ''}`} onClick={handleClick}>
      {switched ? 'Switched On' : 'Switched Off'}
    </button>
  );
};

export default SwitchBotton;