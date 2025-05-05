import React, { useState, useEffect } from 'react';
import { getPetsByOwner, updatePet } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPet() {
  const { id } = useParams(); const navigate = useNavigate();
  const [form, setForm] = useState(null);
  useEffect(() => { fetch(`${API_BASE}/animaux/${id}`).then(r=>r.json()).then(p=>setForm(p)); }, [id]);
  if (!form) return <p>Chargement...</p>;
  const onChange = e => setForm({...form,[e.target.name]:e.target.value});
  const onSubmit = async e => { e.preventDefault(); await updatePet(id,form); navigate(`/proprietaires/${form.ownerId}`); };
  return (
    <div>
      <h2>Modifier animal</h2><form onSubmit={onSubmit}>
        {['nom','race','age'].map(field=>(
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input name={field} className="form-control" value={form[field]} onChange={onChange} />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Enregistrer</button>
      </form>
    </div>
  );
}