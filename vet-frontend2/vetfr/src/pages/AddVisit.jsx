import React, { useState, useEffect } from 'react';
import { getVisitsByPet, addVisit } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddVisit() {
  const { petId } = useParams(); const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => { getVisitsByPet(petId).then(setVisits); }, [petId]);
  const onSubmit=async e=>{ e.preventDefault(); await addVisit(petId,{date:new Date(),notes}); navigate(`/animaux/${petId}/visites/ajoute`); };

  return (
    <div>
      <h2>Ajouter une visite</h2>
      <ul className="list-group mb-3">
        {visits.map(v => (
          <li key={v._id} className="list-group-item">{new Date(v.date).toLocaleString()} - {v.notes}</li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea className="form-control" value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Ajouter visite</button>
      </form>
    </div>
  );
}