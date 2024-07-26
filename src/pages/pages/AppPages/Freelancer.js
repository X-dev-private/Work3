import React, { useState, useEffect } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import Sidebar from "../../libs/SideBar/SideBar";
import UserCard from "../../components/SocialCards/UserCard";
import axios from 'axios';

const Freelancer = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/getAllUserInfo'); // Ajuste a URL conforme necessário
                console.log('User profiles fetched:', response.data); // Log para verificar dados recebidos
                setUserProfiles(response.data);
            } catch (error) {
                console.error('Error fetching user profiles:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfiles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <main className="mainApp">
            <HeaderApp />
            <div className="mainAppPage">
                <Sidebar />
                <div className="jobs-card-container">
                    {userProfiles.map((profile) => (
                        <UserCard key={profile.account} profile={profile} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Freelancer;
