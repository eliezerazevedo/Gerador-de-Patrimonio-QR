import './App.css';
import Footer from './componentes/Footer';
import Gerador from './componentes/Gerador';

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
      <Gerador />      
      </main>   
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
