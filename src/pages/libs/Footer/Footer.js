import React from 'react';
import "../../../Styles/GlobalLibs.css";

const Footer = () => {
  return (
    <footer className="sticky-footer">
      <div className="container">
        <p>
          <a href='/politica-de-privacidade'>&copy; 2024 Copyright ZeroElevenTeam{' '}</a>
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
