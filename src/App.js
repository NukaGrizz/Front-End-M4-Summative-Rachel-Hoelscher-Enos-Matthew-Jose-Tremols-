import Games from './Games.js';
import TShirts from './Tshirts.js';
import Consoles from './Consoles.js';
import Nav from './Nav';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <main className="container">
        <Games />
        <Consoles />
        <TShirts />
      </main>
      <Footer/>
    </div>
  );
}

export default App;