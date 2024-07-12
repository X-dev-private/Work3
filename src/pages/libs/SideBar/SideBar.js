import React from 'react';
import '../../../Styles/GlobalLibs.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href='/app'>🏠 Home</a></li>
      </ul>
        <h2>Menu</h2>
        <ul>
          <li><a href="/app">👤 Perfil</a></li>
          <li><a href="/app">⭐ DAOs Favoritas</a></li>
          <li><a href="/app">👥 Minha Equipe</a></li>
        </ul>
      <ul>
        <li><h2> </h2></li>
        <li><a href='/'>ℹ️ About Us</a></li>
      </ul>
    </div>
  );
}


export default Sidebar;
