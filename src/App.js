import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './pages/libs/Footer/Footer';
import './Styles/App.css';

import LandPage from './pages/LandPage';
import AppPage from './pages/AppPage';
import About from './pages/About';
import DevTeam from './pages/DevTeam';
import NFT from './pages/NFT';
import RoadMap from "./pages/RoadMap";

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
