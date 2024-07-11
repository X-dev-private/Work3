import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/GlobalComponents.css"

const SwitchButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/App');
  };

  return (
    <button className="switch-button" onClick={handleClick}>
      Open Work3
    </button>
  );
};

export default SwitchButton;