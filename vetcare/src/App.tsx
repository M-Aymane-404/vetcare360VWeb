import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VetsList from './pages/VetsList';
import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import OwnersList from './pages/OwnersList';
import AddOwner from './pages/AddOwner';
import EditOwner from './pages/EditOwner';
import OwnerDetails from './pages/OwnerDetails';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vetlist" element={<VetsList />} />
          <Route path="/owners" element={<OwnersList />} />
          <Route path="/owners/add" element={<AddOwner />} />
          <Route path="/owners/edit/:id" element={<EditOwner />} />
          <Route path="/owners/:id" element={<OwnerDetails />} />
          <Route path="/owners/:ownerId/pets/add" element={<AddPet />} />
          <Route path="/pets/:id/edit" element={<EditPet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;