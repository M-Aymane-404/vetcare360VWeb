import React, { useEffect, useState } from 'react';
import { getVets } from '../api';

export default function VetsList() {
  const [vets, setVets] = useState([]);
  useEffect(() => { getVets().then(data => setVets(data)); }, []);
  return (
    <div>
      <h2>Liste des vétérinaires</h2>
      <ul className="list-group">
        {vets.map(vet => <li key={vet._id} className="list-group-item">{vet.nom} {vet.prenom}</li>)}
      </ul>
    </div>
  );
}