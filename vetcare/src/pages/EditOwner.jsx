import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './OwnersList.css';

const EditOwner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/owners/${id}`);
        if (response.data.success) {
          setOwner(response.data.data);
        }
      } catch (err) {
        setError("Erreur lors du chargement des données du propriétaire");
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await axios.put(`http://localhost:5000/api/owners/${id}`, owner);
      if (response.data.success) {
        navigate('/owners');
      }
    } catch (err) {
      setError("Erreur lors de la modification du propriétaire");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner(prev => ({
      ...prev,
      [name]: value
    }));
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

  return (
    <div className="owners-page">
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="w-100 text-center position-relative">
            <h1 className="text-white mb-0">Modifier le Propriétaire</h1>
            <Button 
              variant="outline-light" 
              onClick={() => navigate('/owners')}
              className="back-button position-absolute"
              style={{ right: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Retour
            </Button>
          </div>
        </div>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg">
              <Card.Body className="p-4">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-user me-2"></i>
                      Prénom
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={owner.firstName}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-user me-2"></i>
                      Nom
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={owner.lastName}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Adresse
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={owner.address}
                      onChange={handleChange}
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-city me-2"></i>
                      Ville
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={owner.city}
                      onChange={handleChange}
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <i className="fas fa-phone me-2"></i>
                      Téléphone
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="telephone"
                      value={owner.telephone}
                      onChange={handleChange}
                      required
                      className="form-control-lg"
                    />
                  </Form.Group>

                  <div className="d-flex gap-2 justify-content-end">
                    <Button 
                      variant="secondary" 
                      onClick={() => navigate('/owners')}
                      className="px-4"
                      size="lg"
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="px-4"
                      size="lg"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Enregistrer
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

export default EditOwner;