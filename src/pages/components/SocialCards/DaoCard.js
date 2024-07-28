import React from "react";
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';
import "../../../Styles/GlobalComponents.css";

const DaoCard = ({ dao }) => {
    const { daoName, daoDescription, logo, date1 } = dao;

    const dateObj = new Date(date1);
    const date2 = new Date();

    const diffMinutes = differenceInMinutes(date2, dateObj);
    const diffHours = differenceInHours(date2, dateObj);
    const diffDays = differenceInDays(date2, dateObj);
    const diffYears = differenceInYears(date2, dateObj);

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

    const truncatedDescription = daoDescription.substring(0, 300);

    const imageUrl = logo?.startsWith("data:image") ? logo : "fallback-image-url.png";

    return (
        <div className="daoCard">
                <div className="daoCard_title">
                    <h2>{daoName}</h2>
                </div>
                <div className="daoCard_image">
                    <img src={imageUrl} alt={daoName} />
                </div>
                <p>{truncatedDescription}... <strong>ler mais</strong></p>
                <div className="data">
                    <p>Criado em: {dateObj.toLocaleString()}</p>
                    <p>há {diffText}</p>
                </div>
        </div>
    );
};

export default DaoCard;
