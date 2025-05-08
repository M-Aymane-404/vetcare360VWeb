import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './OwnersList.css';

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    type: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${id}`);
        if (response.data.success) {
          const pet = response.data.data;
          setFormData({
            name: pet.name,
            birthDate: new Date(pet.birthDate).toISOString().split('T')[0],
            type: pet.type
          });
          // Store the owner ID from the pet data
          if (pet.owner && pet.owner._id) {
            setOwnerId(pet.owner._id);
          } else if (pet.owner) {
            setOwnerId(pet.owner);
          }
        }
      } catch (err) {
        setError('Erreur lors du chargement des informations de l\'animal');
      }
    };
    fetchPet();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`http://localhost:5000/api/pets/${id}`, formData);
      if (response.data.success) {
        setShowSuccess(true);
        // Use the stored ownerId for navigation
        if (ownerId) {
          setTimeout(() => {
            navigate(`/owners/${ownerId}`);
          }, 1000);
        } else {
          setError('ID du propriétaire manquant');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la modification de l\'animal');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (ownerId) {
      navigate(`/owners/${ownerId}`);
    } else {
      setError('ID du propriétaire manquant');
    }
  };

  return (
    <div className="owners-page">
      <Container className="py-5">
        <div className="form-container bg-white p-4 rounded shadow">
          <h2 className="text-center mb-4">Modifier l'Animal</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {showSuccess && (
            <Alert variant="success">
              Animal modifié avec succès !
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date de Naissance</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="dog">Chien</option>
                <option value="cat">Chat</option>
                <option value="bird">Oiseau</option>
                <option value="hamster">Hamster</option>
                <option value="lizard">Lézard</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={handleCancel}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EditPet;