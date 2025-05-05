import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OwnerList() {
  const { state } = useLocation();
  const list = state?.list || [];
  return (
    <div>
      <h2>Résultats de la recherche</h2><ul className="list-group">
        {list.map(o=>(
          <li key={o._id} className="list-group-item">
            <Link to={`/proprietaires/${o._id}`}>{o.nom} {o.prenom}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}