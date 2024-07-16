import React from 'react';
import '../../../Styles/GlobalLibs.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href='/app/create'>Create</a></li>
      </ul>
      <h2> </h2>
      <ul>
        <li><a href="/app/profile">👤 Perfil</a></li>
        <li><a href="/app">⭐ DAOs Favoritas</a></li>
      </ul>
      <h2> </h2>
      <ul>
        <li><a href='/'>ℹ️ About Us</a></li>
      </ul>
    </div>
  );
}


export default Sidebar;
