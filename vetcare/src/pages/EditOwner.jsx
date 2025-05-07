import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './OwnersList.css';

const EditOwner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/owners/${id}`);
        if (response.data.success) {
          const owner = response.data.data;
          setFormData({
            firstName: owner.firstName,
            lastName: owner.lastName,
            address: owner.address || '',
            city: owner.city || '',
            telephone: owner.telephone
          });
        }
      } catch (err) {
        setError('Failed to fetch owner details');
      }
    };
    fetchOwner();
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
      const response = await axios.put(`http://localhost:5000/api/owners/${id}`, formData);
      if (response.data.success) {
        navigate('/owners');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owners-page">
      <Container className="py-5">
        <div className="form-container bg-white p-4 rounded shadow">
          <h2 className="text-center mb-4">Edit Owner</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telephone</Form.Label>
              <Form.Control
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate('/owners')}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EditOwner;