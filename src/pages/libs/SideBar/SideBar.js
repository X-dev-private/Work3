import React from 'react';
import '../../../Styles/GlobalLibs.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><a href="/">Perfil</a></li>
        <li><a href="/">DAOs Favoritas</a></li>
        <li><a href="/">Minha Equipe</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
