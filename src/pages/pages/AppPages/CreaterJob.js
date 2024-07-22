import React, { useState, useEffect, useRef } from 'react';
import "../../../Styles/GlobalPages.css";
import HeaderApp from "../../libs/Header/HeaderApp";
import axios from 'axios';

const CreaterJobs = () => {
  const [title, setTitle] = useState("digite aqui o titulo");
  const [description, setDescription] = useState("digite aqui a descrição");
  const [price, setPrice] = useState("");
  const [jobTitle, setJobTitle] = useState("bounties");
  const [isButtonOn, setIsButtonOn] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
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

  const toggleJobTitle = () => {
    setJobTitle(prevTitle => prevTitle === "bounties" ? "Job Name" : "bounties");
    setIsButtonOn(!isButtonOn);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [description]);

  const handleSubmit = async () => {
    const jobData = { 
      title, 
      description, 
      price, 
      date: new Date().toISOString(),
      creator: userName // Usando userName para o campo creator
    };
    
    try {
      await axios.post('http://localhost:5000/upload', jobData);
      alert('Job created and uploaded successfully!');
    } catch (error) {
      console.error('Error uploading job data:', error);
      alert('Failed to upload job data');
    }
  };

  const date = new Date();

  const receiveUserInfo = (userInfo) => {
    if (userInfo && userInfo.userName) {
      setUserName(userInfo.userName); // Atualiza userName com o valor recebido
    }
  };

  return (
    <main>
      <HeaderApp receiveAccount={() => {}} receiveUserInfo={receiveUserInfo} />
      <div className="jobsCard">
        <div className="jobsCard_create">
          <h2>
            <input type="text" value={title} onChange={handleTitleChange} />
          </h2>
        </div>
        <textarea
          ref={descriptionRef}
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="Creator">
          <p>criador por : {userName}</p> {/* Mostra o nome do usuário */}
          <div className="moneyName">
            <p className="reward-job-card"><strong>Recompensa :</strong></p>
            <p>💲<input type="text" value={price} onChange={handlePriceChange} /> ETH</p>
          </div>
        </div>
        <div className="data">
          <p>Sera criado as : {date.toLocaleString()}</p>
        </div>
      </div>
      <button className="savebutton" onClick={handleSubmit}>Create job</button>
    </main>
  );
};

export default CreaterJobs;
