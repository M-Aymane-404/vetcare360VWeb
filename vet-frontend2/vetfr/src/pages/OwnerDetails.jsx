import React, { useEffect, useState } from 'react';
import { getOwner, getPetsByOwner, getVisitsByPet } from '../api';
import { Link, useParams } from 'react-router-dom';

export default function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getOwner(id).then(setOwner);
    getPetsByOwner(id).then(async petsData => {
      const withVisits = await Promise.all(
        petsData.map(async pet => {
          const visits = await getVisitsByPet(pet._id);
          return {...pet, visits};
        })
      );
      setPets(withVisits);
    });
  }, [id]);

  if (!owner) return <p>Chargement...</p>;
  return (
    <div>
      <h2>{owner.nom} {owner.prenom}</h2>
      <Link to={`/proprietaires/modifier/${id}`} className="btn btn-warning me-2">Modifier</Link>
      <Link to={`/proprietaires/${id}/animaux/ajouter`} className="btn btn-success">Ajouter un animal</Link>
      <hr />
      <h3>Animaux</h3>
      {pets.map(pet => (
        <div key={pet._id} className="card mb-3">
          <div className="card-body">
            <h5>{pet.nom}</h5>
            <p>Race: {pet.race} | Age: {pet.age}</p>
            <Link to={`/animaux/modifier/${pet._id}`} className="btn btn-sm btn-warning me-2">Modifier</Link>
            <Link to={`/animaux/${pet._id}/visites/ajouter`} className="btn btn-sm btn-primary">Ajouter visite</Link>
            <ul className="mt-2">
              {pet.visits.map(v => <li key={v._id}>{new Date(v.date).toLocaleDateString()} - {v.notes}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}