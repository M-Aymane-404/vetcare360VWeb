import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';

function SearchOwner() {
  return (
    <Container fluid className="py-5 text-center">
      <h1>Recherche d'un propriétaire</h1>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control placeholder="Nom de famille" />
            <Button variant="dark">Rechercher</Button>
          </InputGroup>
          <Button variant="primary" className="mt-3">Ajouter un propriétaire</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SearchOwner;
