import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './VetsList.css';

const VetsList = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchVeterinarians = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/veterinarians', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });
      
      if (!response.data) {
        throw new Error('Aucune donnée reçue du serveur');
      }

      let data = response.data;
      if (Array.isArray(data)) {
        setVeterinarians(data);
      } else if (data.data && Array.isArray(data.data)) {
        setVeterinarians(data.data);
      } else if (data.success && Array.isArray(data.data)) {
        setVeterinarians(data.data);
      } else {
        throw new Error('Format de données inattendu du serveur');
      }
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchVeterinarians(), 2000);
      } else {
        setError(`Erreur lors du chargement des vétérinaires: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchVeterinarians();
    return () => {
      setVeterinarians([]);
      setLoading(true);
      setError(null);
    };
  }, [fetchVeterinarians]);

  const handleImageError = useCallback((e) => {
    e.target.src = '/images/default-vet.jpg';
    e.target.onerror = null;
  }, []);

  if (loading && veterinarians.length === 0) {
    return (
      <div className="vets-page">
        <Container className="py-5">
          <div className="text-center text-white">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h2>Chargement des vétérinaires...</h2>
            {retryCount > 0 && (
              <p className="text-white-50">Tentative {retryCount} sur {MAX_RETRIES}</p>
            )}
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vets-page">
        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <h2>Erreur</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                setRetryCount(0);
                fetchVeterinarians();
              }}
            >
              Réessayer
            </button>
          </Alert>
        </Container>
      </div>
    );
  }

  if (veterinarians.length === 0) {
    return (
      <div className="vets-page">
        <Container className="py-5">
          <Alert variant="info" className="text-center">
            <h2>Aucun vétérinaire trouvé</h2>
            <p>Veuillez vérifier que le serveur backend est en cours d'exécution.</p>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="vets-page">
      <section className="hero-section">
        <Container>
          <div className="text-center">
            <h1 className="text-white mb-4">Nos Vétérinaires</h1>
          </div>
        </Container>
      </section>

      <section className="vets-section">
        <Container>
          <div className="table-container">
            <Table className="vets-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Nom</th>
                  <th style={{ width: '60%' }}>Spécialités</th>
                </tr>
              </thead>
              <tbody>
                {veterinarians.map((vet) => (
                  <tr key={vet._id}>
                    <td className="vet-name">{vet.name}</td>
                    <td className="vet-specialties">
                      {vet.specialties?.join(', ') || 'Généraliste'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default React.memo(VetsList);