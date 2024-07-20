import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './pages/libs/Footer/Footer';
import './Styles/App.css';

import HomePage from './pages/pages/HomePages/HomePage';
import AppPage from './pages/pages/AppPages/AppPage';
import About from "./pages/pages/HomePages/About"
import DevTeam from './pages/pages/HomePages/DevTeam';
import NFT from './pages/pages/HomePages/NFT';
import RoadMap from './pages/pages/HomePages/RoadMap';
import Profile from './pages/pages/AppPages/Profile';
import Jobs from './pages/pages/AppPages/Jobs';
import CreaterJobs from './pages/pages/AppPages/CreaterJob';
import PoliticaDePrivacidade from './pages/pages/HomePages/PoliticaDePrivacidade';
import ObjectList from './pages/pages/AppPages/ObjectList';
import DAOs from './pages/pages/AppPages/DAOs';
import Freelancer from './pages/pages/AppPages/Freelancer';
import MyDao from './pages/pages/AppPages/MyDao';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/devteam" element={<DevTeam />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/jobs" element={<Jobs />} />
        <Route path="/app/create" element={<CreaterJobs />} />
        <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/app/obj" element={<ObjectList />} />
        <Route path="/app/dao" element={<DAOs />} />
        <Route path="/app/freelancer" element={<Freelancer />} />
        <Route path="/app/mydao" element={<MyDao />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
