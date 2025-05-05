import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import VetList from './components/VetList';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src="/logo.png"
                className="d-inline-block align-top"
                alt="VetCare 360 logo"
              />
              VetCare 360
            </Navbar.Brand>
            <div className="nav-buttons">
              <Link to="/veterinaires" className="btn btn-primary me-2">Vétérinaires</Link>
              <Link to="/proprietaires" className="btn btn-light">Propriétaires</Link>
            </div>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/veterinaires" element={<VetList />} />
        </Routes>

        <footer className="footer">
          <Container>
            <div className="footer-content">
              <div className="footer-section">
                <h4>À propos</h4>
                <ul>
                  <li><a href="#about">Notre histoire</a></li>
                  <li><a href="#team">Notre équipe</a></li>
                  <li><a href="#careers">Carrières</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Consultations</a></li>
                  <li><a href="#emergency">Urgences</a></li>
                  <li><a href="#vaccination">Vaccination</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Contact</h4>
                <ul>
                  <li><a href="#contact">Nous contacter</a></li>
                  <li><a href="#location">Localisation</a></li>
                  <li><a href="#hours">Heures d'ouverture</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 VetCare 360. Tous droits réservés.</p>
            </div>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

<footer className="footer">
  <Container>
    <div className="footer-content">
      <div className="footer-section">
        <h4>À propos</h4>
        <ul>
          <li><a href="#about">Notre histoire</a></li>
          <li><a href="#team">Notre équipe</a></li>
          <li><a href="#careers">Carrières</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Services</h4>
        <ul>
          <li><a href="#services">Consultations</a></li>
          <li><a href="#emergency">Urgences</a></li>
          <li><a href="#vaccination">Vaccination</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <ul>
          <li><a href="#contact">Nous contacter</a></li>
          <li><a href="#location">Localisation</a></li>
          <li><a href="#hours">Heures d'ouverture</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 VetCare 360. Tous droits réservés.</p>
    </div>
  </Container>
</footer>