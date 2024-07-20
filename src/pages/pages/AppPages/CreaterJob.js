import React, { useState, useEffect, useRef } from 'react';
import "../../../Styles/GlobalPages.css";
import HeaderApp from "../../libs/Header/HeaderApp";
import axios from 'axios';

const CreaterJobs = () => {
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

  const handleSubmit = async () => {
    const jobData = { title, description, price, date };
    try {
      await axios.post('http://localhost:5000/upload', jobData);
      alert('Job created and uploaded successfully!');
    } catch (error) {
      console.error('Error uploading job data:', error);
      alert('Failed to upload job data');
    }
  };

  const date = new Date();

  return (
    <main>
      <HeaderApp />
      
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
          <p>criador por : </p>
          <div className="moneyName">
            <p className="reward-job-card"><strong>Recompensa :</strong></p>
            <p>💲<input type="text" value={price} onChange={handlePriceChange} /> ETH</p>
            <p>/ ou /</p>
            <button>Dar lance</button>
          </div>
        </div>
        <div className="data">
          <p>Sera criado as : {date.toLocaleString()}</p>
        </div>
      </div>
      <button onClick={handleSubmit}>Enviar para o Server e S3</button>
    </main>
  );
};

export default CreaterJobs;


