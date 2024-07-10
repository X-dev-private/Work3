import React from "react";
import Sidebar from "./libs/SideBar/SideBar";
import JobsCard from "./components/JobsCard/JobsCard";
import "./AppPage.css";

const AppPage = () => {
    return (
        <main>
            <div className="mainAppPage">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                <div className="jobs-card-container">
                    {[...Array(7)].map((_, index) => (
                        <JobsCard key={index} />
                    ))}
                </div>
            </div>
        </main>
    )
}
export default AppPage;