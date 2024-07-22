import React from "react";
import "../../../Styles/GlobalComponents.css";

const BxjButton = ({ isOn, toggleButton }) => {
  return (
    <div className="toggle-switch" onClick={toggleButton}>
      <div className={`toggle-knob ${isOn ? "on" : "off"}`} />
    </div>
  );
}

export default BxjButton;
