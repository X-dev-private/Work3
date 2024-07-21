import React, { useState, useEffect } from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css";
import logoImage from '../../../Styles/Images/guest.jpg';
import BountiesCard from '../../components/JobsCard/BountiesCard';
import axios from 'axios';
import MDropzone from "../../components/DropZone/DropZone";
import moment from 'moment';

const MyDao = () => {
    const [daoName, setDaoName] = useState("Dao Name");
    const [daoDescription, setDaoDescription] = useState("About Dao");
    const [logo, setLogo] = useState(logoImage);
    const [date1, setDate1] = useState("");
    const [accountModerator, setAccountModerator] = useState([]);
    const [accountUser, setAccountUser] = useState([]);
    const [isModeratorSet, setIsModeratorSet] = useState(false); // Novo estado para verificar se o moderador foi definido

    const handleDaoNameChange = (event) => {
        setDaoName(event.target.value);
    };

    const handleDaoDescriptionChange = (event) => {
        setDaoDescription(event.target.value);
    };

    const handleDropImage = (imageUrl) => {
        setLogo(imageUrl);
    };

    const handleSaveProfile = async () => {
        const daoProfile = {
            daoName,
            daoDescription,
            daoLogo: logo, // Ajustado para daoLogo
            date1: moment(date1, 'DD/MM/YYYY, HH:mm:ss').toISOString(), // Certifica-se de que a data esteja no formato ISO
            accountModerator,
            accountUser
        };

        try {
            const response = await axios.post('http://localhost:5000/uploadDao', daoProfile, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('DAO profile uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading DAO profile:', error);
        }
    };

    const receiveAccount = (acc) => {
        if (!isModeratorSet) {
            setAccountModerator([acc]); // Define o primeiro account como moderador
            setIsModeratorSet(true); // Marca que o moderador foi definido
        } else {
            setAccountModerator(prevMods => [...prevMods, acc]); // Adiciona os seguintes accounts
        }
    };

    const fetchDaoInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getDaoInfo/${daoName}`);
            const daoInfo = response.data;
            setDaoName(daoInfo.daoName);
            setDaoDescription(daoInfo.daoDescription);
            setLogo(daoInfo.logo || logoImage);
            setDate1(moment(daoInfo.date1).format('DD/MM/YYYY, HH:mm:ss'));
            setAccountModerator(daoInfo.accountModerator || []);
            setAccountUser(daoInfo.accountUser || []);
        } catch (error) {
            console.error('Error fetching DAO info:', error);
        }
    };

    useEffect(() => {
        if (daoName) {
            fetchDaoInfo();
        }
    }, [daoName]);

    return (
        <main className="mainApp">
            <HeaderApp receiveAccount={receiveAccount} />
            <div className="mainAppProfile">
                <div className="profile-container">
                    <section className="aboutUser">
                        <section className="user-data">
                            <div className="meta-user">
                                <img src={logo} alt="logo" />
                                <MDropzone onDropImage={handleDropImage} />
                                <h2 className="user-name">
                                    <input 
                                        type="text" 
                                        value={daoName} 
                                        onChange={handleDaoNameChange} 
                                    />
                                </h2>
                            </div>
                            <textarea 
                                className="user-description" 
                                value={daoDescription} 
                                onChange={handleDaoDescriptionChange} 
                            />
                            <p>entrou em : {date1}</p>
                            <button className="savebutton" onClick={handleSaveProfile}><strong>Save Dao Profile</strong></button>
                        </section>
                    </section>
                    <div className="user-bounties">
                        <section className="userJobs">
                            <h2>user list</h2>
                            <h3>Moderadores</h3>
                            <ul>
                                {accountModerator.map((mod, index) => (
                                    <li key={index}>{mod}</li>
                                ))}
                            </ul>
                            <h3>Users</h3>
                            <ul>
                                {accountUser.map((user, index) => (
                                    <li key={index}>{user}</li>
                                ))}
                            </ul>
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

export default MyDao;