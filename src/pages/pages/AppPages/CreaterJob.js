import React, { useState, useEffect, useRef } from 'react';
import "../../../Styles/GlobalPages.css";
import HeaderApp from "../../libs/Header/HeaderApp";

const CreaterJobs = ({ account }) => {
  const [title, setTitle] = useState("digite aqui o titulo");
  const [description, setDescription] = useState("digite aqui a descrição");
  const [price, setPrice] = useState("");
  const descriptionRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9.,]/g, '');
    const formattedValue = newValue.replace(/,/g, '.');
    setPrice(formattedValue);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  const date2 = new Date();

  return (
    <main>
      <HeaderApp account={account} />
      <h1>Creater Jobs</h1>

      <div className="jobsCard">
        <div className="jobsCard_create">
          <h2>
            <input type="text" value={title} onChange={handleTitleChange} />
          </h2>
        </div>
        <h3>Dao Name</h3>
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="Creator">
          <p>criador por : {account}</p>
          <div className="moneyName">
            <p className="reward-job-card"><strong>Recompensa :</strong></p>
            <p>💲<input type="text" value={price} onChange={handlePriceChange} /> ETH</p>
            <p>/ ou /</p>
            <button>Dar lance</button>
          </div>
        </div>
        <div className="data">
          <p>Sera criado as : {date2.toLocaleString()}</p>
        </div>
      </div>
    </main>
  );
};

export default CreaterJobs;

