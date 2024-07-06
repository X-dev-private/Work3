import './App.css';
import Header from './pages/libs/Header/Header';
import Footer from './pages/libs/Footer/Footer';
import LandPage from './pages/LandPage';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
          <main>
            <LandPage />
          </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
