import React, { useEffect, useState } from 'react';
import { getOwner } from '../api';
import { Link, useParams } from 'react-router-dom';

export default function OwnerAdded() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  useEffect(() => { getOwner(id).then(data=>setOwner(data)); }, [id]);
  if (!owner) return <p>Chargement...</p>;
  return (
    <div>
      <h2>Propriétaire ajouté</h2>
      <p>{owner.nom} {owner.prenom}</p>
      <Link to={`/proprietaires/modifier/${id}`} className="btn btn-warning me-2">Modifier</Link>
      <Link to={`/proprietaires/${id}/animaux/ajouter`} className="btn btn-success">Ajouter un animal</Link>
    </div>
  );
}