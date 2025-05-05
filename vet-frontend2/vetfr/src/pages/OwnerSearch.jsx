import React, { useState } from 'react';
import { searchOwners } from '../api';
import { Link } from 'react-router-dom';

export default function OwnerSearch() {
  const [nom, setNom] = useState(''); const [results, setResults] = useState([]);
  const handleSearch = () => { searchOwners(nom).then(data => setResults(data)); };
  return (
    <div>
      <h2>Recherche propriétaire</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Nom de famille" value={nom} onChange={e=>setNom(e.target.value)} />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>Rechercher</button>
      </div>
      <Link to="/proprietaires/nouveau" className="btn btn-success mb-3">Ajouter un nouveau propriétaire</Link>
      {results.length > 0 && <Link to="/proprietaires/liste" state={{ list: results }} className="btn btn-primary">Voir les résultats</Link>}
    </div>
  );
}