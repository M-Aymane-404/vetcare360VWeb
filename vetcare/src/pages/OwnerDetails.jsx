import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Table, Alert, Spinner, Row, Col, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OwnersList.css';

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
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

  const handleDeleteClick = (pet) => {
    setPetToDelete(pet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!petToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/pets/${petToDelete._id}`);
      if (response.data.success) {
        // Update the owner state by removing the deleted pet
        setOwner(prevOwner => ({
          ...prevOwner,
          pets: prevOwner.pets.filter(pet => pet._id !== petToDelete._id)
        }));
        setShowDeleteModal(false);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      setError("Erreur lors de la suppression de l'animal");
    } finally {
      setDeleteLoading(false);
      setPetToDelete(null);
    }
  };

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-white mb-0">Détails du Propriétaire</h1>
          <Button 
            variant="outline-light" 
            onClick={() => navigate('/owners')}
            className="back-button"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour à la liste
          </Button>
        </div>

        <Row>
          <Col md={4}>
            <Card className="owner-info-card mb-4">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Informations Personnelles</h3>
              </Card.Header>
              <Card.Body>
                <div className="owner-details">
                  <div className="detail-item">
                    <i className="fas fa-user me-2"></i>
                    <span className="detail-label">Nom:</span>
                    <span className="detail-value">{owner?.lastName}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-user me-2"></i>
                    <span className="detail-label">Prénom:</span>
                    <span className="detail-value">{owner?.firstName}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <span className="detail-label">Adresse:</span>
                    <span className="detail-value">{owner?.address || 'Non spécifiée'}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-city me-2"></i>
                    <span className="detail-label">Ville:</span>
                    <span className="detail-value">{owner?.city || 'Non spécifiée'}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-phone me-2"></i>
                    <span className="detail-label">Téléphone:</span>
                    <span className="detail-value">{owner?.telephone}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="pets-card">
              <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Animaux de Compagnie</h3>
                <Button 
                  variant="light" 
                  onClick={() => navigate(`/owners/${id}/pets/add`)}
                  className="add-pet-btn"
                >
                  <i className="fas fa-plus me-2"></i>
                  Ajouter un Animal
                </Button>
              </Card.Header>
              <Card.Body>
                {owner?.pets && owner.pets.length > 0 ? (
                  <div className="table-responsive">
                    <Table hover className="pets-table">
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
                            <td>
                              <span className={`pet-type ${pet.type}`}>
                                {pet.type === 'dog' && '🐕 Chien'}
                                {pet.type === 'cat' && '🐱 Chat'}
                                {pet.type === 'bird' && '🦜 Oiseau'}
                                {pet.type === 'hamster' && '🐹 Hamster'}
                                {pet.type === 'lizard' && '🦎 Lézard'}
                              </span>
                            </td>
                            <td>{new Date(pet.birthDate).toLocaleDateString()}</td>
                            <td>
                              <Button 
                                variant="outline-primary" 
                                size="sm" 
                                onClick={() => navigate(`/pets/${pet._id}/edit`)}
                                className="me-2"
                              >
                                <i className="fas fa-edit me-1"></i>
                                Modifier
                              </Button>
                              <Button 
                                variant="outline-info" 
                                size="sm" 
                                onClick={() => navigate(`/pets/${pet._id}/visits/add`)}
                                className="me-2"
                              >
                                <i className="fas fa-plus me-1"></i>
                                Visite
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm" 
                                onClick={() => handleDeleteClick(pet)}
                              >
                                <i className="fas fa-trash me-1"></i>
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <Alert variant="info" className="text-center">
                    <i className="fas fa-paw me-2"></i>
                    Aucun animal enregistré
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer {petToDelete?.name} ? Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Suppression...
              </>
            ) : (
              'Supprimer'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OwnerDetails;