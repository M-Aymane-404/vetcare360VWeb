import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VetsList from './pages/VetsList';
import OwnerSearch from './pages/OwnerSearch';
import OwnerList from './pages/OwnerList';
import NewOwner from './pages/NewOwner';
import OwnerAdded from './pages/OwnerAdded';
import EditOwner from './pages/EditOwner';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';
import OwnerDetails from './pages/OwnerDetails';
import AddVisit from './pages/AddVisit';
import VisitAdded from './pages/VisitAdded';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veterinaires" element={<VetsList />} />
          <Route path="/proprietaires/recherche" element={<OwnerSearch />} />
          <Route path="/proprietaires/liste" element={<OwnerList />} />
          <Route path="/proprietaires/nouveau" element={<NewOwner />} />
          <Route path="/proprietaires/ajoute/:id" element={<OwnerAdded />} />
          <Route path="/proprietaires/modifier/:id" element={<EditOwner />} />
          <Route path="/proprietaires/:ownerId/animaux/ajouter" element={<AddPet />} />
          <Route path="/animaux/modifier/:id" element={<EditPet />} />
          <Route path="/proprietaires/:id" element={<OwnerDetails />} />
          <Route path="/animaux/:petId/visites/ajouter" element={<AddVisit />} />
          <Route path="/animaux/:petId/visites/ajoute" element={<VisitAdded />} />
        </Routes>
      </div>
    </Router>
  );
}