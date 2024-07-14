import React from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css"
import logoImage from '../../../Styles/Images/2.png';
import BountiesCard from '../../components/JobsCard/BountiesCard';

const Profile = () => {
    const date1 = new Date('2024-07-13T10:31:00');

    return (
        <main className="mainApp">
                <HeaderApp />
            <div className="mainAppProfile">
                <div className="profile-container">
                    <section className="aboutUser">
                        <section className="user-data">
                            <div className="meta-user">
                                <img src={logoImage} alt="logo"></img>
                                <h2 className="user-name">Zero Eleven Team</h2>
                            </div>
                            <p className="user-description">About me</p>
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
            </div>
        </main>
    )
}
export default Profile;