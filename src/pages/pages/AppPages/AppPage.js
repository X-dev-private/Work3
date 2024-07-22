import React, { useEffect, useState } from "react";
import Sidebar from "../../libs/SideBar/SideBar";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import axios from 'axios';
import BountiesCard from "../../components/JobsCard/BountiesCard";

const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return { year, month };
};

const AppPage = () => {
    const [jobs, setJobs] = useState([]);
    const [userName, setUserName] = useState("");

    const { year, month } = getCurrentYearMonth();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, [year, month]);

    const receiveUserInfo = (userInfo) => {
        if (userInfo && userInfo.userName) {
            setUserName(userInfo.userName);
        }
    };

    const handleAssign = async (jobId) => {
        try {
            await axios.post(`http://localhost:5000/jobs/${jobId}/assign`, { userName });
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
                                userName={userName}
                                onUpdate={() => handleAssign(job.id)}
                                creator={job.creator} // Pass the creator of the job
                            />
                        ))
                    ) : (
                        <p>Nenhum trabalho encontrado.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AppPage;
