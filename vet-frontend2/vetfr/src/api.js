const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export async function getVets() {
  const res = await fetch(`${API_BASE}/veterinaires`);
  return res.json();
}
export async function searchOwners(lastName) {
  const res = await fetch(`${API_BASE}/proprietaires?nom=${lastName}`);
  return res.json();
}
export async function getOwner(id) {
  const res = await fetch(`${API_BASE}/proprietaires/${id}`);
  return res.json();
}
export async function createOwner(data) {
  const res = await fetch(`${API_BASE}/proprietaires`, {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)
  });return res.json();
}
export async function updateOwner(id,data){const res=await fetch(`${API_BASE}/proprietaires/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});return res.json();}
export async function createPet(ownerId,data){const res=await fetch(`${API_BASE}/proprietaires/${ownerId}/animaux`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});return res.json();}
export async function updatePet(id,data){const res=await fetch(`${API_BASE}/animaux/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});return res.json();}
export async function getPetsByOwner(ownerId){const res=await fetch(`${API_BASE}/proprietaires/${ownerId}/animaux`);return res.json();}
export async function getVisitsByPet(petId){const res=await fetch(`${API_BASE}/animaux/${petId}/visites`);return res.json();}
export async function addVisit(petId,data){const res=await fetch(`${API_BASE}/animaux/${petId}/visites`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});return res.json();}
