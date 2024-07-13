import React from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css"
import logoImage from '../../../Styles/Images/2.png';

const Profile = () => {
    const date1 = new Date('2024-07-13T10:31:00');

    return (
        <main className="mainApp">
                <HeaderApp />
            <div className="mainAppPage">
                <div className="profile-container">
                    <section className="aboutUser">
                        <section>
                            <div className="meta-user">
                                <img src={logoImage} alt="logo"></img>
                                <h2 className="user-name">Zero Eleven Team</h2>
                            </div>
                            <p className="user-description">description</p>
                            <p>entrou em : {date1.toLocaleString()}</p>
                        </section>
                        <section>

                        </section>
                    </section>
                    <section className="userJobs"></section>
                </div>
            </div>
        </main>
    )
}
export default Profile;