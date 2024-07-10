import React from "react";
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';
import './JobsCard.css' ;

const JobsCard = () => {
    // Defining two example dates
    const date1 = new Date('2024-07-10T10:00:00');
    const date2 = new Date();

    // Calculating the differences
    const diffMinutes = differenceInMinutes(date2, date1);
    const diffHours = differenceInHours(date2, date1);
    const diffDays = differenceInDays(date2, date1);
    const diffYears = differenceInYears(date2, date1);

    let diffText;
    if (diffYears > 0) {
        diffText = `${diffYears} ano(s) atras`;
    } else if (diffDays > 0) {
        diffText = `${diffDays} dia(s) atras`;
    } else if (diffHours > 0) {
        diffText = `${diffHours} hora(s) atras`;
    } else {
        diffText = `${diffMinutes} minuto(s) atras`;
    }

    return (
        <div className="jobsCard">
            <h2>titulo</h2>
            <p>descrição</p>
            <div className="data">
                <p>Criado em : {date1.toLocaleString()}</p>
                <p>Diferença: {diffText}</p>
            </div>
            <div className="Creator"></div>
        </div>
    );
};

export default JobsCard;