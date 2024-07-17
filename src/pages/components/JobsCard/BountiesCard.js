import React from "react";
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';
import "../../../Styles/GlobalComponents.css";

const BountiesCard = ({ content }) => {
    // Definir o conteúdo do objeto S3 como um objeto JSON
    let obj;
    try {
        obj = JSON.parse(content);
    } catch (error) {
        console.error('Failed to parse object content:', error);
        return null; // Retornar null ou algum fallback em caso de falha ao analisar o JSON
    }

    // Definindo as propriedades a serem exibidas
    const { title, description, price, account } = obj;

    // Exemplo de cálculo de diferença de data, mantido para referência
    const date1 = new Date('2024-07-10T10:00:00');
    const date2 = new Date();
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

    // Exemplo de descrição truncada, mantido para referência
    const truncatedDescription = description.substring(0, 500);

    return (
        <div className="jobsCard">
            <h2>{title}</h2>
            <p>{truncatedDescription}... <strong>ler mais</strong></p>
            <div className="Creator">
                <p>Criado por : {account}</p> {/* Exemplo de exibição de conta do criador */}
                <div className="moneyName">
                    <p className="reward-job-card"><strong>Recompensa :</strong></p>
                    <p>💲{price}</p> {/* Exemplo de exibição de preço */}
                    <p>/ ou /</p>
                    <button>Dar lance</button>
                </div>
            </div>
            <div className="data">
                <p>Criado em : {date1.toLocaleString()}</p>
                <p>há {diffText}</p>
            </div>
        </div>
    );
};

export default BountiesCard;
