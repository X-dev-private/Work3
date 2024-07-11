import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './pages/libs/Footer/Footer';
import './Styles/App.css';

import LandPage from './pages/LandPage';
import AppPage from './pages/AppPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandPage />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
