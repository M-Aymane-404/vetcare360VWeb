// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import hero from './pets.png'; 
 // 🚀 CHEMIN RELATIF

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
        background: 'linear-gradient(90deg, #EAF5FD 0%, #FFFFFF 100%)',
        minHeight: '100vh'
      }}
    >
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center">
          <Col md={6} className="px-5">
            <h1 className="display-4 fw-bold">
              Gestion de la clinique vétérinaire
            </h1>
            <p className="lead mb-4">
              Administrez les dossiers des animaux, les rendez-vous, et plus
            </p>
            <Button
              variant="outline-dark"
              size="lg"
              className="me-3"
              onClick={() => navigate('/veterinarians')}
            >
              Vétérinaires
            </Button>
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate('/owners')}
            >
              Propriétaires
            </Button>
          </Col>
          <Col md={6} className="text-center">
            <img
              src={hero}
              alt="Animaux"
              className="img-fluid"
              style={{ maxHeight: '80vh' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
