import './App.css';
import Footer from './componentes/Footer';
import Gerador from './componentes/Gerador';
import Gerador_lote from './componentes/Gerador_lote'

function App() {
  return (
    <div>
      <header>
        <div className="navbar">
          <img src="/logo.jpg" alt="Logo da Empresa" className="responsive-img" />
          <div>
            <a href="/">Home</a>
          </div>
        </div>
      </header>
      <main>
      <Gerador_lote />     
      </main>   
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
