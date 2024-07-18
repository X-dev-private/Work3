import React, { useState } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import logoImage from '../../../Styles/Images/2.png';
import BountiesCard from '../../components/JobsCard/BountiesCard';
import axios from 'axios';
import MDropzone from "../../components/DropZone/DropZone";

const Profile = () => {
    const [account, setAccount] = useState(""); // Estado para armazenar a conta
    const [userName, setUserName] = useState("qual seu nick de usuario ?");
    const [userDescription, setUserDescription] = useState("conte - nos sobre voce");
    const [logo, setLogo] = useState(logoImage);
    const date1 = new Date();

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleUserDescriptionChange = (event) => {
        setUserDescription(event.target.value);
    };

    const handleLogoChange = (event) => {
        setLogo(event.target.files[0]);
    };

    const handleSaveProfile = async () => {
        const userProfile = {
            account,
            userName,
            userDescription,
            logo,
            date1
        };

        try {
            const response = await axios.post('http://localhost:5000/uploadProfile', userProfile);
            console.log('Profile uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading profile:', error);
        }
    };

    // Função para receber a conta da Wallet
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
                                <MDropzone />
                                <h2 className="user-name"><input 
                                    type="text" 
                                    value={userName} 
                                    onChange={handleUserNameChange} 
                                /></h2>
                            </div>
                            <textarea 
                                className="user-description" 
                                value={userDescription} 
                                onChange={handleUserDescriptionChange} 
                            />
                            <input 
                                type="file" 
                                onChange={handleLogoChange} 
                            />
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