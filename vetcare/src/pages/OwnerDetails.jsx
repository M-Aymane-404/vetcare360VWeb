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
  const [showDeleteVisitModal, setShowDeleteVisitModal] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [deleteVisitLoading, setDeleteVisitLoading] = useState(false);

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

  const handleDeleteVisitClick = (visit, pet) => {
    setVisitToDelete({ visit, pet });
    setShowDeleteVisitModal(true);
  };

  const handleDeleteVisitConfirm = async () => {
    if (!visitToDelete) return;
    
    setDeleteVisitLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/visits/${visitToDelete.visit._id}`);
      // Mettre à jour l'état local pour retirer la visite supprimée
      setOwner(prevOwner => ({
        ...prevOwner,
        pets: prevOwner.pets.map(p =>
          p._id === visitToDelete.pet._id
            ? { ...p, visits: p.visits.filter(v => v._id !== visitToDelete.visit._id) }
            : p
        )
      }));
      setShowDeleteVisitModal(false);
    } catch (err) {
      setError("Erreur lors de la suppression de la visite");
    } finally {
      setDeleteVisitLoading(false);
      setVisitToDelete(null);
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
                  <div className="pets-list">
                    {owner.pets.map((pet) => (
                      <Card key={pet._id} className="mb-4 pet-card">
                        <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <h5 className="mb-0">
                              <span className={`pet-icon me-2`}>
                                {pet.type === 'dog' && '🐕'}
                                {pet.type === 'cat' && '🐱'}
                                {pet.type === 'bird' && '🦜'}
                                {pet.type === 'hamster' && '🐹'}
                                {pet.type === 'lizard' && '🦎'}
                              </span>
                              {pet.name}
                            </h5>
                            <span className="text-muted ms-3">
                              {new Date(pet.birthDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
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
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <h6 className="mb-3">
                            <i className="fas fa-calendar-alt me-2"></i>
                            Historique des Visites
                          </h6>
                          {pet.visits && pet.visits.length > 0 ? (
                            <Table hover bordered size="sm" className="visits-table">
                              <thead className="bg-light">
                                <tr>
                                  <th style={{width: "30%"}}>Date</th>
                                  <th style={{width: "55%"}}>Description</th>
                                  <th style={{width: "15%"}}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[...(pet.visits || [])]
                                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                                  .map((visit) => (
                                    <tr key={visit._id}>
                                      <td>{visit.date ? new Date(visit.date).toLocaleDateString() : ''}</td>
                                      <td>{visit.description}</td>
                                      <td>
                                        <Button 
                                          size="sm" 
                                          variant="danger" 
                                          onClick={() => handleDeleteVisitClick(visit, pet)}
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </Table>
                          ) : (
                            <Alert variant="info" className="mb-0">
                              <i className="fas fa-info-circle me-2"></i>
                              Aucune visite enregistrée
                            </Alert>
                          )}
                          <div className="mt-3">
                            <Button 
                              size="sm" 
                              variant="success" 
                              onClick={() => navigate(`/pets/${pet._id}/visits/add`)}
                            >
                              <i className="fas fa-plus me-2"></i>
                              Ajouter une visite
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
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

      {/* Delete Visit Confirmation Modal */}
      <Modal show={showDeleteVisitModal} onHide={() => setShowDeleteVisitModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer cette visite ? Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteVisitModal(false)}>
            Annuler
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteVisitConfirm}
            disabled={deleteVisitLoading}
          >
            {deleteVisitLoading ? (
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