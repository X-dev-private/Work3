import React from "react";
import DaoCard from "../../components/SocialCards/DaoCard";
import HeaderApp from "../../libs/Header/HeaderApp";
import Sidebar from "../../libs/SideBar/SideBar";

const DAOs = () => {
    return (
        <main>       
        <main className="mainApp">
                <HeaderApp />
            <div className="mainAppPage">
                    <Sidebar />
                <div className="jobs-card-container">
                    {[...Array(7)].map((_, index) => (
                        <DaoCard key={index} />
                    ))}
                </div>
            </div>
        </main>
        </main>
    )
}

export default DAOs;