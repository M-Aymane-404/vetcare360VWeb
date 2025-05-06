import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="navbar-custom fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '0.75rem' }}
          />
          <span className="brand-text">VetCare360</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/vetlist">Vétérinaires</Nav.Link>
            <Nav.Link as={Link} to="/proprietaires">Propriétaires</Nav.Link>
            <Nav.Link as={Link} to="#footer">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;