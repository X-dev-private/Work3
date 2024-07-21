import React from "react";
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInYears } from 'date-fns';
import "../../../Styles/GlobalComponents.css";

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

    const description = "A natureza sempre foi uma fonte inesgotável de inspiração para a humanidade. Desde tempos imemoriais, os seres humanos observaram as maravilhas naturais, buscando entender os mistérios que a cercam. Montanhas majestosas, florestas densas e oceanos vastos compõem um cenário deslumbrante que nos lembra da grandiosidade do planeta em que vivemos. As estações do ano, com suas mudanças sutis e radicais, também são um testemunho da beleza cíclica da natureza. Na primavera, vemos a renovação da vida, com flores desabrochando e árvores ganhando novas folhas. O verão traz consigo o calor e a abundância, onde os dias longos permitem explorar e aproveitar ao máximo o ambiente ao nosso redor. O outono, com suas folhas douradas e vermelhas, é um lembrete da transição e da preparação para o inverno que se aproxima. E o inverno, com seu frio e quietude, oferece um tempo de reflexão e repouso. Além da beleza estética, a natureza também desempenha um papel crucial na manutenção da vida na Terra. Os ecossistemas complexos garantem o equilíbrio e a sobrevivência de inúmeras espécies, incluindo a nossa. A interdependência entre plantas, animais, e microrganismos cria uma teia de vida que sustenta o planeta. No entanto, a relação entre a humanidade e a natureza nem sempre foi harmoniosa. A exploração desenfreada dos recursos naturais e a poluição têm causado danos significativos aos ecossistemas. As mudanças climáticas, a perda de biodiversidade e a degradação ambiental são desafios urgentes que precisamos enfrentar. A conscientização ambiental tem crescido, e muitas iniciativas visam proteger e restaurar o meio ambiente. A sustentabilidade, a conservação e a adoção de práticas mais ecológicas são passos importantes para garantir que as gerações futuras possam desfrutar das mesmas maravilhas naturais que nós. Portanto, é essencial cultivarmos um respeito profundo pela natureza e agirmos de maneira responsável para preservar o equilíbrio delicado que sustenta a vida na Terra.";
    const truncatedDescription = description.substring(0, 500);

    return (
        <div className="jobsCard">
            <div className="jobsCard_title">
                <h2>titulo</h2>
                <h2>Dao Name</h2>
            </div>
            <p>{truncatedDescription}... <strong>ler mais</strong></p>
            <div className="Creator">
                <p>criador por :</p>
                <div className="moneyName">
                    <p className="reward-job-card"><strong>Recompensa :</strong></p>
                    <p>💲3 ETH</p>
                </div>
            </div>
            <div className="data">
                <p>Criado em : {date1.toLocaleString()}</p>
                <p>há {diffText}</p>
            </div>
            <div className="Creator"></div>
        </div>
    );
};

export default JobsCard;