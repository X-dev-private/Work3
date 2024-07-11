import React from 'react';
import '../../../Styles/GlobalLibs.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className='UpSideBar'>
        <li><a href='/app'>🏠 Home</a></li>
      </ul>
      <div className="filler">
        <h2>Menu</h2>
      </div>
      <div className='BottomSideBar'>
        <ul>
          <li><a href="/app">👤 Perfil</a></li>
          <li><a href="/app">⭐ DAOs Favoritas</a></li>
          <li><a href="/app">👥 Minha Equipe</a></li>
        </ul>
      </div>
      <ul>
        <li><a href='/'>ℹ️ About Us</a></li>
      </ul>
    </div>
  );
}


export default Sidebar;
