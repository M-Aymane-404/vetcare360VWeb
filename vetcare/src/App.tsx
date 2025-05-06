import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VetsList from './pages/VetsList';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import OwnersList from './pages/OwnersList';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vetlist" element={<VetsList />} />
          <Route path="/owners" element={<OwnersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



