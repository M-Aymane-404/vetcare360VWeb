import React, { useState, useEffect } from 'react';
import { getOwner, updateOwner } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditOwner() {
  const { id } = useParams(); const navigate = useNavigate();
  const [form, setForm] = useState(null);
  useEffect(()=>{ getOwner(id).then(o=>setForm(o)); },[id]);
  if(!form) return <p>Chargement...</p>;
  const onChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const onSubmit=async e=>{e.preventDefault();await updateOwner(id,form);navigate(`/proprietaires/${id}`);};
  return (
    <div>
      <h2>Modifier propriétaire</h2>
      <form onSubmit={onSubmit}>
        {['nom','prenom','adresse','telephone'].map(field=>(
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input name={field} className="form-control" value={form[field]} onChange={onChange} />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Valider</button>
      </form>
    </div>
  );
}