import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './pages/libs/Footer/Footer';
import './Styles/App.css';

import LandPage from './pages/pages/HomePages/LandPage';
import AppPage from './pages/pages/AppPages/AppPage';
import About from "./pages/pages/HomePages/About"
import DevTeam from './pages/pages/HomePages/DevTeam';
import NFT from './pages/pages/HomePages/NFT';
import RoadMap from './pages/pages/HomePages/RoadMap';
import Profile from './pages/pages/AppPages/Profile';
import Jobs from './pages/pages/AppPages/Jobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/devteam" element={<DevTeam />} />
        <Route path="/nft" element={<NFT />} />
        <Route path="/roadmap" element={<RoadMap />} />
        <Route path="/app/profile" element={<Profile />} />
        <Route path="/app/jobs" element={<Jobs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
