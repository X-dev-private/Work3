import React from 'react';
import './Sidebar.css'; // Estilo para a barra lateral

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><a href="#">Página 1</a></li>
        <li><a href="#">Página 2</a></li>
        <li><a href="#">Página 3</a></li>
        {/* Adicione mais itens conforme necessário */}
      </ul>
    </div>
  );
}

export default Sidebar;
