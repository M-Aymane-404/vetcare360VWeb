import React, { useEffect, useState } from 'react';
import { getOwner, getPetsByOwner, getVisitsByPet } from '../api';
import { useParams } from 'react-router-dom';

export default function VisitAdded() {
  const { petId } = useParams();
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // fetch owner via pet
    fetch(`${API_BASE}/animaux/${petId}`).then(r=>r.json()).then(p=>{
      getOwner(p.ownerId).then(setOwner);
      getPetsByOwner(p.ownerId).then(async list=>{
        const withVisits = await Promise.all(list.map(async pet=>{
          const visits = await getVisitsByPet(pet._id);
          return {...pet, visits};
        }));
        setPets(withVisits);
      });
    });
  }, [petId]);

  if (!owner) return <p>Chargement synthèse...</p>;
  return (
    <div>
      <h2>Visite ajoutée</h2>
      <h3>{owner.nom} {owner.prenom}</h3>
      {pets.map(pet=>(
        <div key={pet._id} className="card mb-3">
          <div className="card-body">
            <h5>{pet.nom}</h5>
            <ul>
              {pet.visits.map(v=><li key={v._id}>{new Date(v.date).toLocaleString()} - {v.notes}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}