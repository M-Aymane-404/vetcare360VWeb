import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Table, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OwnersList.css';

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        // Vérifier que l'ID est une chaîne valide
        if (!id || typeof id !== 'string') {
          setError("ID du propriétaire invalide");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/owners/${id}`);
        if (response.data.success) {
          setOwner(response.data.data);
        } else {
          setError("Propriétaire non trouvé");
        }
      } catch (err) {
        console.error("Erreur détaillée:", err);
        setError("Erreur lors du chargement des détails du propriétaire");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="owners-page">
        <Container className="py-5 text-center">
          <Spinner animation="border" variant="light" />
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="owners-page">
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="owners-page">
      <Container className="py-5">
        <Card className="bg-white shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h2 className="mb-0">Informations du Propriétaire</h2>
          </Card.Header>
          <Card.Body>
            <div className="mb-4">
              <h3>{owner?.firstName} {owner?.lastName}</h3>
              <p>Adresse: {owner?.address}</p>
              <p>Ville: {owner?.city}</p>
              <p>Téléphone: {owner?.telephone}</p>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Animaux de Compagnie</h4>
                <Button 
                  variant="success" 
                  onClick={() => navigate(`/owners/${id}/pets/add`)}
                >
                  Ajouter un Animal
                </Button>
              </div>

              {owner?.pets && owner.pets.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Date de Naissance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owner.pets.map((pet) => (
                      <tr key={pet._id}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
                        <td>
                          <Button 
                            variant="warning" 
                            size="sm" 
                            onClick={() => navigate(`/pets/${pet._id}/edit`)}
                            className="me-2"
                          >
                            Modifier
                          </Button>
                          <Button 
                            variant="info" 
                            size="sm" 
                            onClick={() => navigate(`/pets/${pet._id}/visits/add`)}
                            className="me-2"
                          >
                            Ajouter une Visite
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">Aucun animal enregistré</Alert>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OwnerDetails;