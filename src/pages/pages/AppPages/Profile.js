import React, { useState } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import logoImage from '../../../Styles/Images/2.png';
import BountiesCard from '../../components/JobsCard/BountiesCard';
import axios from 'axios';

const Profile = () => {
    const [account, setAccount] = useState("");
    const date1 = new Date();
    const userName = "Zero Eleven Team";
    const userDescription = "About me";
    const logo = logoImage;

    const handleSaveProfile = async () => {
        const userProfile = {
            userName,
            userDescription,
            logo,
            date1,
            account  // Adicione a account ao objeto de perfil do usuário
        };

        try {
            const response = await axios.post('http://localhost:5000/uploadProfile', userProfile);
            console.log('Profile uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading profile:', error);
        }
    };

    const receiveAccount = (acc) => {
        setAccount(acc);
    };

    return (
        <main className="mainApp">
            <HeaderApp receiveAccount={receiveAccount} />
            <div className="mainAppProfile">
                <div className="profile-container">
                    <section className="aboutUser">
                        <section className="user-data">
                            <div className="meta-user">
                                <img src={logoImage} alt="logo" />
                                <h2 className="user-name">{userName}</h2>
                            </div>
                            <p>{account}</p>
                            <p className="user-description">{userDescription}</p>
                            <p>entrou em : {date1.toLocaleString()}</p>
                        </section>
                        <section className="exp">
                            <p>experiencias profissionais</p>
                        </section>
                    </section>
                    <section className="userJobs">
                        <h2>bounties trabalhadas</h2>
                        <BountiesCard />
                    </section>
                </div>
                <button onClick={handleSaveProfile}>Save Profile</button>
            </div>
        </main>
    );
};

export default Profile;


