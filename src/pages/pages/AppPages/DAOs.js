import React, { useState, useEffect } from "react";
import axios from "axios";
import DaoCard from "../../components/SocialCards/DaoCard";
import HeaderApp from "../../libs/Header/HeaderApp";
import Sidebar from "../../libs/SideBar/SideBar";

const DAOs = () => {
    const [daos, setDaos] = useState([]);

    useEffect(() => {
        const fetchDaos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllDaoInfo'); // Ensure this matches your backend
                setDaos(response.data);
            } catch (error) {
                console.error('Error fetching DAOs:', error);
            }
        };

        fetchDaos();
    }, []);

    return (
        <main className="mainApp">
            <HeaderApp />
            <div className="mainAppPage">
                <Sidebar />
                <div className="jobs-card-container">
                    {daos.length > 0 ? (
                        daos.map((dao, index) => (
                            <DaoCard key={index} dao={dao} />
                        ))
                    ) : (
                        <p>No DAOs available</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default DAOs;
