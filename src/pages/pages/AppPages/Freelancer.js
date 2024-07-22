import React, { useState, useEffect } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import Sidebar from "../../libs/SideBar/SideBar";
import FreelcCard from "../../components/SocialCards/FreelcCard";
import axios from 'axios';

const Freelancer = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllUserInfo'); // Ajuste a URL conforme necessário
                setUserProfiles(response.data);
            } catch (error) {
                console.error('Error fetching user profiles:', error);
            }
        };

        fetchUserProfiles();
    }, []);

    return (
        <main>
            <main className="mainApp">
                <HeaderApp />
                <div className="mainAppPage">
                    <Sidebar />
                    <div className="jobs-card-container">
                        {userProfiles.map((profile) => (
                            <FreelcCard key={profile.account} profile={profile} />
                        ))}
                    </div>
                </div>
            </main>
        </main>
    );
};

export default Freelancer;
