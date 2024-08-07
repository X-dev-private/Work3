import React from "react";
import Sidebar from "../../libs/SideBar/SideBar";
import JobsCard from "../../components/JobsCard/JobsCard";
import HeaderApp from "../../libs/Header/HeaderApp";
import "../../../Styles/GlobalPages.css"

const Jobs = () => {
    return (
        <main className="mainApp">
                <HeaderApp />
            <div className="mainAppPage">
                    <Sidebar />
                <div className="jobs-card-container">
                    {[...Array(7)].map((_, index) => (
                        <JobsCard key={index} />
                    ))}
                </div>
            </div>
        </main>
    )
}
export default Jobs;