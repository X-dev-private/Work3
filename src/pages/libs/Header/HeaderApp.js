import React from "react";
import Wallet from "../../components/Wallet/Wallet";

const HeaderApp = () => {
    return (
        <header className="headerApp">
            <ul>
                <li><a href="/app">Bounties 💰</a></li>
                <li><a href="/app/jobs">Jobs 🧑‍💼</a></li>
            </ul>
            <ul>
                <li><a href="/app/DAOs">DAOs 🏛️</a></li>
                <li><a href="/app/frelancers">Freelancers 🧑‍💻</a></li>
            </ul>
            <Wallet />
        </header>
    )
}

export default HeaderApp;