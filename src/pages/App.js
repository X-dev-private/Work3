import '../logo.svg';
import './App.css';
import Header from './libs/Header/Header';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <main>
          <section id="home">
            <h2>Home</h2>
            <p>Conteúdo da Home</p>
          </section>
          <section id="about">
            <h2>Sobre</h2>
            <p>Conteúdo Sobre</p>
          </section>
          <section id="contact">
            <h2>Contato</h2>
            <p>Conteúdo de Contato</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
