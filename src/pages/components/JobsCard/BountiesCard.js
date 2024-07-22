import React, { useState } from 'react';
import axios from 'axios';
import "../../../Styles/GlobalComponents.css";

const BountiesCard = ({ content, userName, onUpdate }) => {
    // Verifica se o conteúdo existe e é um objeto válido
    if (!content || typeof content !== 'object') {
        console.error('Invalid content:', content);
        return <p>Conteúdo inválido</p>; // Ou outro fallback adequado
    }

    // Definindo as propriedades a serem exibidas
    const { title, description, price, creator, maybeAssigned } = content;

    // Estado para verificar se o usuário já assinou
    const [isSigned, setIsSigned] = useState(false);
    // Estado para manter a lista de usuários que se inscreveram
    const [assignedUsers, setAssignedUsers] = useState(maybeAssigned || []);

    // Função para lidar com o clique no botão de assinatura
    const handleSign = async () => {
        if (isSigned) return;

        try {
            // Atualize o estado local
            setIsSigned(true);

            // Atualize a lista no backend
            await axios.post(`http://localhost:5000/updateMaybeAssigned/${title}`, {
                maybeAssigned: [...assignedUsers, userName], // Usa userName passado como prop
            });

            // Atualize o estado local para refletir a mudança
            setAssignedUsers([...assignedUsers, userName]);

            // Notifique o componente pai sobre a atualização
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error signing job:', error);
            // Lógica para lidar com o erro
        }
    };

    // Exemplo de descrição truncada
    const truncatedDescription = description ? description.substring(0, 500) : 'Descrição não disponível';

    return (
        <div className="jobsCard">
            <h2>{title || 'Título não disponível'}</h2>
            <p>{truncatedDescription}... <strong>ler mais</strong></p>
            <div className="Creator">
                <p>Criado por : {creator || 'Conta não disponível'}</p>
                <div className="moneyName">
                    <p className="reward-job-card"><strong>Recompensa :</strong></p>
                    <p>💲{price || 'Preço não disponível'} ETH</p>
                    <button onClick={handleSign} disabled={isSigned}>
                        {isSigned ? 'Assinado' : 'Assinar'}
                    </button>
                </div>
                <div>Usuários inscritos: {assignedUsers.join(', ')}</div>
            </div>
        </div>
    );
};

export default BountiesCard;
