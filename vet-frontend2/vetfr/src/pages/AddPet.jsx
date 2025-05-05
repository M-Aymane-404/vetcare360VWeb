import React, { useState } from 'react';
import { createPet } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddPet() {
  const { ownerId } = useParams(); const navigate = useNavigate();
  const [form, setForm] = useState({nom:'',race:'',age:''});
  const onChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const onSubmit=async e=>{e.preventDefault();await createPet(ownerId,form);navigate(`/proprietaires/${ownerId}`);};
  return (
    <div>
      <h2>Ajouter un animal</h2>
      <form onSubmit={onSubmit}>
        {['nom','race','age'].map(field=>(
          <div className="mb-3" key={field}>
            <label className="form-label">{field}</label>
            <input name={field} className="form-control" value={form[field]} onChange={onChange} />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Ajouter</button>
      </form>
    </div>
  );
}