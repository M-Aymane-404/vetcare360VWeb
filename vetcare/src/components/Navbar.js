import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/images/logo.svg" alt="VetCare 360 Logo" />
        <Link to="/" className="brand">VetCare 360</Link>
      </div>
      <div className="nav-links">
        
        <Link to="/veterinaires" className="nav-link">Vétérinaires</Link>
        <Link to="/proprietaires" className="nav-link">Propriétaires</Link>
      </div>
    </nav>
  );
};

export default Navbar;