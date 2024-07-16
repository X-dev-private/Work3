import React, { useState } from 'react';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';
import "../../../Styles/GlobalPages.css";
import HeaderApp from "../../libs/Header/HeaderApp";

const CreaterJobs = ({ account }) => {
  const [title, setTitle] = useState("titulo");
  const [description, setDescription] = useState("descripcion");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Definindo duas datas de exemplo
  const date1 = new Date('2024-07-10T10:00:00');
  const date2 = new Date();

  // Calculando as diferenças
  const diffMinutes = differenceInMinutes(date2, date1);
  const diffHours = differenceInHours(date2, date1);
  const diffDays = differenceInDays(date2, date1);
  const diffYears = differenceInYears(date2, date1);

  let diffText;
  if (diffYears > 0) {
    diffText = `${diffYears} ano(s) atrás`;
  } else if (diffDays > 0) {
    diffText = `${diffDays} dia(s) atrás`;
  } else if (diffHours > 0) {
    diffText = `${diffHours} hora(s) atrás`;
  } else {
    diffText = `${diffMinutes} minuto(s) atrás`;
  }

  return (
    <main>
      <HeaderApp account={account} />
      <h1>Creater Jobs</h1>

      <div className="jobsCard">
        <div className="jobsCard_create">
          <h2><input type="text" value={title} onChange={handleTitleChange} /></h2>
        </div>
        <h3>Dao Name</h3>
        <input type="text" value={description} onChange={handleDescriptionChange} />
        <div className="Creator">
          <p>criador por : {account}</p>
          <div className="moneyName">
            <p className="reward-job-card"><strong>Recompensa :</strong></p>
            <p>💲3 ETH</p>
            <p>/ ou /</p>
            <button>Dar lance</button>
          </div>
        </div>
        <div className="data">
          <p>Criado em : {date1.toLocaleString()}</p>
          <p>há {diffText}</p>
        </div>
        <div className="Creator"></div>
      </div>
    </main>
  );
};

export default CreaterJobs;
