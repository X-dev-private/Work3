import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          &copy; 2024 Copyright ElevenTeam{' '}
          <a href="/">Work3</a>
        </p>
        <ul>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-and-conditions">Terms & Conditions</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
