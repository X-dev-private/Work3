import React from "react";
import HeaderApp from "../../libs/Header/HeaderApp";
import Sidebar from "../../libs/SideBar/SideBar";
import FreelcCard from "../../components/SocialCards/FreelcCard";

const Freelancer = () => {
    return (
        <main>       
        <main className="mainApp">
                <HeaderApp />
            <div className="mainAppPage">
                    <Sidebar />
                <div className="jobs-card-container">
                    {[...Array(7)].map((_, index) => (
                        <FreelcCard key={index} />
                    ))}
                </div>
            </div>
        </main>
        </main>
    )
}

export default Freelancer;