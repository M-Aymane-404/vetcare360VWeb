import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OwnersList.css';

const OwnersList = () => {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const fetchOwners = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:5000/api/owners', {
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
        setOwners(data);
        setFilteredOwners(data);
      } else if (data.data && Array.isArray(data.data)) {
        setOwners(data.data);
        setFilteredOwners(data.data);
      } else if (data.success && Array.isArray(data.data)) {
        setOwners(data.data);
        setFilteredOwners(data.data);
      } else {
        throw new Error('Format de données inattendu du serveur');
      }
    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        setRetryCount(prev => prev + 1);
        setTimeout(() => fetchOwners(), 2000);
      } else {
        setError(`Erreur lors du chargement des propriétaires: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    // Test de la connexion API
    const testApiConnection = async () => {
      try {
        console.log('Test de la connexion API...');
        const response = await axios.get('http://localhost:5000/api/owners/test');
        console.log('Réponse du test:', response.data);
      } catch (err) {
        console.error('Erreur de test API:', err);
        setError(`Erreur de connexion au serveur: ${err.message}`);
      }
    };

    testApiConnection();
    fetchOwners();
    return () => {
      setOwners([]);
      setFilteredOwners([]);
      setLoading(true);
      setError(null);
    };
  }, [fetchOwners]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = owners.filter(owner => 
      owner.lastName.toLowerCase().includes(term)
    );
    setFilteredOwners(filtered);
  };

  const handleEdit = (ownerId) => {
    navigate(`/owners/edit/${ownerId}`);
  };

  const handleDetails = (ownerId) => {
    if (ownerId) {
      navigate(`/owners/${ownerId}`);
    } else {
      console.error("ID du propriétaire manquant");
    }
  };

  const handleDelete = async (ownerId) => {
    if (!ownerId) {
      setError('ID du propriétaire manquant');
      return;
    }

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce propriétaire ? Cette action supprimera également tous ses animaux et leurs visites.')) {
      try {
        setLoading(true);
        console.log('Tentative de suppression du propriétaire avec ID:', ownerId);
        
        // Vérifier d'abord si le propriétaire existe
        const checkResponse = await axios.get(`http://localhost:5000/api/owners/${ownerId}`);
        console.log('Vérification du propriétaire:', checkResponse.data);
        
        if (!checkResponse.data.success) {
          setError('Propriétaire non trouvé');
          return;
        }

        // Effectuer la suppression
        const deleteResponse = await axios.delete(`http://localhost:5000/api/owners/${ownerId}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Réponse de suppression:', deleteResponse.data);
        
        if (deleteResponse.data.success) {
          // Rafraîchir la liste des propriétaires
          fetchOwners();
        } else {
          setError('Erreur lors de la suppression du propriétaire');
        }
      } catch (err) {
        console.error('Erreur complète:', err);
        console.error('Détails de la réponse:', err.response?.data);
        console.error('Status:', err.response?.status);
        console.error('Headers:', err.response?.headers);
        
        if (err.response?.status === 404) {
          setError('Propriétaire non trouvé');
        } else if (err.response?.status === 400) {
          setError('ID invalide');
        } else {
          setError(`Erreur lors de la suppression: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && owners.length === 0) {
    return (
      <div className="owners-page">
        <Container className="py-5">
          <div className="text-center text-white">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h2>Chargement des propriétaires...</h2>
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
      <div className="owners-page">
        <Container className="py-5">
          <Alert variant="danger" className="text-center">
            <h2>Erreur</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => {
                setRetryCount(0);
                fetchOwners();
              }}
            >
              Réessayer
            </button>
          </Alert>
        </Container>
      </div>
    );
  }

  if (owners.length === 0) {
    return (
      <div className="owners-page">
        <Container className="py-5">
          <Alert variant="info" className="text-center">
            <h2>Aucun propriétaire trouvé</h2>
            <p>Veuillez vérifier que le serveur backend est en cours d'exécution.</p>
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="owners-page">
      <section className="hero-section">
        <Container>
          <h1 className="text-center text-white mb-4">Nos Propriétaires</h1>
          <div className="search-actions-wrapper">
            <Form.Control
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <Button 
              variant="success"
              onClick={() => navigate('/owners/add')}
              className="add-owner-btn"
            >
              <i className="fas fa-plus me-2"></i>
              Ajouter un propriétaire
            </Button>
          </div>
        </Container>
      </section>

      <section className="owners-section">
        <Container>
          <div className="table-container">
            <Table className="owners-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Nom</th>
                  <th style={{ width: '20%' }}>Prénom</th>
                  <th style={{ width: '30%' }}>Ville</th>
                  <th style={{ width: '30%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOwners.map((owner) => (
                  <tr key={owner._id}>
                    <td className="owner-name">{owner.lastName}</td>
                    <td className="owner-firstname">{owner.firstName}</td>
                    <td className="owner-city">{owner.city || 'Non spécifiée'}</td>
                    <td className="owner-actions">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(owner._id)}
                      >
                        Modifier
                      </Button>
                      <Button 
                        variant="outline-info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleDetails(owner._id)}
                      >
                        Détails
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(owner._id)}
                      >
                        Supprimer
                      </Button>
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

export default OwnersList;