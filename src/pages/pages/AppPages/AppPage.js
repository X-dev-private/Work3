import React, { useEffect, useState } from "react";
import Sidebar from "../../libs/SideBar/SideBar";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import axios from 'axios';
import BountiesCard from "../../components/JobsCard/BountiesCard";

// Função para obter o ano e o mês atuais
const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexados
    return { year, month };
};

const AppPage = () => {
    const [jobs, setJobs] = useState([]);
    const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário

    const { year, month } = getCurrentYearMonth(); // Obtendo ano e mês atuais

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs'); // Ajuste o endpoint para corresponder ao backend
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [year, month]);

    // Função para receber informações do usuário e atualizar o estado
    const receiveUserInfo = (userInfo) => {
        if (userInfo && userInfo.userName) {
            setUserName(userInfo.userName); // Atualiza userName com o valor recebido
        }
    };

    // Função para atualizar a lista maybeAssigned de um job
    const handleAssign = async (jobId) => {
        try {
            await axios.post(`http://localhost:5000/jobs/${jobId}/assign`, {
                userName
            });
            // Atualiza a lista de jobs após a atribuição
            const response = await axios.get('http://localhost:5000/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error assigning job:', error);
        }
    };

    return (
        <main className="mainApp">
            <HeaderApp receiveAccount={() => {}} receiveUserInfo={receiveUserInfo} />
            <div className="mainAppPage">
                <Sidebar />
                <div className="jobs-card-container">
                    {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                            <BountiesCard 
                                key={index} 
                                content={job}
                                onAssign={() => handleAssign(job.id)} // Adiciona a função de atribuição
                            />
                        ))
                    ) : (
                        <p>Nenhum trabalho encontrado.</p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default AppPage;
