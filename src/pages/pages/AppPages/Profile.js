import React, { useState } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import logoImage from '../../../Styles/Images/guest.jpg';
import BountiesCard from '../../components/JobsCard/BountiesCard';
import axios from 'axios';
import MDropzone from "../../components/DropZone/DropZone";
import moment from 'moment';

const Profile = () => {
    const [account, setAccount] = useState(""); 
    const [userName, setUserName] = useState("qual seu nick de usuario ?");
    const [userDescription, setUserDescription] = useState("conte - nos sobre voce");
    const [profileImage, setProfileImage] = useState(logoImage);
    const [date1, setDate1] = useState("");

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleUserDescriptionChange = (event) => {
        setUserDescription(event.target.value);
    };

    const handleDropImage = (imageUrl) => {
        setProfileImage(imageUrl);
    };

    const handleSaveProfile = async () => {
        const userProfile = {
            account,
            userName,
            userDescription,
            profileImage,  // Ajustado para corresponder ao backend
            date1: moment().toISOString()  // Convertendo a data para o formato ISO
        };

        try {
            const response = await axios.post('http://localhost:5000/uploadProfile', userProfile, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Profile uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading profile:', error);
        }
    };

    const receiveAccount = (acc) => {
        setAccount(acc);
    };

    const receiveUserInfo = (userInfo) => {
        setUserName(userInfo.userName);
        setUserDescription(userInfo.userDescription);
        setProfileImage(userInfo.profileImage || logoImage); // Ajustado para corresponder ao backend
        setDate1(userInfo.date1 ? moment(userInfo.date1).format('DD/MM/YYYY, HH:mm:ss') : '');  // Convertendo a data recebida para o formato desejado
    };

    return (
        <main className="mainApp">
            <HeaderApp receiveAccount={receiveAccount} receiveUserInfo={receiveUserInfo} />
            <div className="mainAppProfile">
                <div className="profile-container">
                    <section className="aboutUser">
                        <section className="user-data">
                            <div className="meta-user">
                                <img src={profileImage} alt="Profile" />  {/* Alterado para profileImage */}
                                <MDropzone onDropImage={handleDropImage} />
                                <h2 className="user-name">
                                    <input 
                                        type="text" 
                                        value={userName} 
                                        onChange={handleUserNameChange} 
                                    />
                                </h2>
                            </div>
                            <textarea 
                                className="user-description" 
                                value={userDescription} 
                                onChange={handleUserDescriptionChange} 
                            />
                            <p>entrou em : {date1}</p>
                            <button onClick={handleSaveProfile}>Save Profile</button>
                        </section>
                    </section>
                    <div className="user-bounties">
                        <section className="userJobs">
                            <h2>bounties trabalhadas</h2>
                            <BountiesCard />
                        </section>
                        <section className="userJobs">
                            <h2>bounties Criadas</h2>
                            <BountiesCard />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
