import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
import './OwnersList.css'; // Réutiliser les styles communs

const AddVisit = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [vets, setVets] = useState([]);
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Récupérer l'animal et les vétérinaires
  useEffect(() => {
    const fetchData = async () => {
      try {
        const petRes = await axios.get(`http://localhost:5000/api/pets/${petId}`);
        setPet(petRes.data.data);
        const vetsRes = await axios.get('http://localhost:5000/api/veterinarians');
        setVets(vetsRes.data.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      }
    };
    fetchData();
  }, [petId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/visits', {
        pet: petId,
        date,
        description,
        veterinarian
      });
      // Récupérer l'ownerId pour la redirection
      const petRes = await axios.get(`http://localhost:5000/api/pets/${petId}`);
      const ownerId = petRes.data.data.owner._id;
      navigate(`/owners/${ownerId}`);
    } catch (err) {
      setError("Erreur lors de l'ajout de la visite");
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return (
      <div className="owners-page d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div className="owners-page">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="text-white mb-0">Ajouter une Visite</h1>
          <Button 
            variant="outline-light" 
            onClick={() => window.history.back()}
            className="back-button"
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour
          </Button>
        </div>
        
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">
                  <i className="fas fa-calendar-plus me-2"></i>
                  Nouvelle visite pour <b>{pet.name}</b>
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-calendar me-2"></i>
                      Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-file-medical me-2"></i>
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                      className="form-control-lg"
                      placeholder="Détails de la visite..."
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-user-md me-2"></i>
                      Vétérinaire
                    </Form.Label>
                    <Form.Select
                      value={veterinarian}
                      onChange={e => setVeterinarian(e.target.value)}
                      required
                      className="form-control-lg"
                    >
                      <option value="">Sélectionner un vétérinaire</option>
                      {vets.map(vet => (
                        <option key={vet._id} value={vet._id}>{vet.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <div className="d-flex gap-2 justify-content-end">
                    <Button 
                      variant="secondary" 
                      onClick={() => window.history.back()}
                      size="lg"
                      className="px-4"
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit" 
                      size="lg"
                      variant="primary" 
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Ajout en cours...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus me-2"></i>
                          Ajouter la visite
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddVisit; 