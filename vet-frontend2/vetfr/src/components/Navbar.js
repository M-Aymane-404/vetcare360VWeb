import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">VetCare360</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">Accueil</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/veterinaires">Vétérinaires</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/proprietaires/recherche">Propriétaires</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}