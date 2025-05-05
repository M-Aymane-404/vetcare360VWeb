import React, { useState } from 'react';
import { createOwner } from '../api';
import { useNavigate } from 'react-router-dom';

export default function NewOwner() {
  const [form, setForm] = useState({nom:'',prenom:'',adresse:'',telephone:''});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); const owner = await createOwner(form);
    navigate(`/proprietaires/ajoute/${owner._id}`);
  };
  const onChange = e => setForm({...form,[e.target.name]:e.target.value});
  return (
    <div>
      <h2>Ajouter un nouveau propriétaire</h2>
      <form onSubmit={handleSubmit}>
        {['nom','prenom','adresse','telephone'].map(field=>(
          <div className="mb-3" key={field}>
            <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input name={field} className="form-control" value={form[field]} onChange={onChange} />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  );
}