import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../Styles/GlobalComponents.css";

const BountiesCard = ({ content, userName, onUpdate, creator }) => {
    const { title, description, price, assigned = [], maybeAssigned = [] } = content || {};

    const [isSigned, setIsSigned] = useState(false);
    const [assignedUsers, setAssignedUsers] = useState(assigned);
    const [maybeAssignedUsers, setMaybeAssignedUsers] = useState(maybeAssigned);

    useEffect(() => {
        if (content) {
            setIsSigned(maybeAssigned.includes(userName));
            setAssignedUsers(assigned);
            setMaybeAssignedUsers(maybeAssigned);
        }
    }, [assigned, maybeAssigned, userName, content]);

    const handleSign = async () => {
        if (isSigned) return;

        try {
            // Add user to maybeAssigned list
            const newMaybeAssigned = [...maybeAssignedUsers, userName];
            setMaybeAssignedUsers(newMaybeAssigned);

            await axios.post(`http://localhost:5000/updateMaybeAssigned/${title}`, {
                maybeAssigned: newMaybeAssigned,
            });

            setIsSigned(true);

            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error signing job:', error);
        }
    };

    const handleAssignUser = async (user) => {
        if (userName !== creator) {
            console.error('Only the creator can assign users.');
            return;
        }

        const newAssigned = [...assignedUsers, user];
        const newMaybeAssigned = maybeAssignedUsers.filter(item => item !== user);

        setAssignedUsers(newAssigned);
        setMaybeAssignedUsers(newMaybeAssigned);

        try {
            await axios.post(`http://localhost:5000/updateAssigned/${title}`, {
                assigned: newAssigned,
            });

            await axios.post(`http://localhost:5000/updateMaybeAssigned/${title}`, {
                maybeAssigned: newMaybeAssigned,
            });

            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error assigning user:', error);
        }
    };

    const truncatedDescription = description ? description.substring(0, 500) : 'Descrição não disponível';

    if (!content || typeof content !== 'object') {
        console.error('Invalid content:', content);
        return <p>Conteúdo inválido</p>;
    }

    return (
        <div className="jobsCard">
            <h2>{title || 'Título não disponível'}</h2>
            <p>
                {truncatedDescription}... <strong>ler mais</strong>
            </p>
            <div className="Creator">
                <p>Criado por: {creator || 'Conta não disponível'}</p>
                <div className="moneyName">
                    <p className="reward-job-card"><strong>Recompensa:</strong></p>
                    <p>💲{price || 'Preço não disponível'} ETH</p>
                    <button onClick={handleSign} disabled={isSigned}>
                        {isSigned ? 'Assinado' : 'Assinar'}
                    </button>
                </div>
                <div>
                    <h4>Maybe Assigned</h4>
                    <ul>
                        {maybeAssignedUsers.map((user, index) => (
                            <li key={index}>
                                {user}
                                {userName && userName !== creator && (
                                    <button onClick={() => handleSign()}>Add to Maybe Assigned</button>
                                )}
                                {userName === creator && (
                                    <button onClick={() => handleAssignUser(user)}>Assign</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Assigned</h4>
                    <ul>
                        {assignedUsers.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BountiesCard;
