import React from 'react';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage" style={{ minHeight: '100vh', fontFamily: 'sans-serif', background: 'linear-gradient(135deg,rgb(31, 55, 111) 20%,rgb(76, 123, 195) 50%)' }}>
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom fixed-top">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/vetlist">Vétérinaires</Nav.Link>
              <Nav.Link href="/owners">Propriétaires</Nav.Link>
              <Nav.Link href="#footer">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="hero-section"style={{ background: 'linear-gradient(135deg,rgb(31, 55, 111) 42%,rgba(41, 73, 150, 0.32) 90%)', padding: '6rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}> 
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-content">
                <h1 className="hero-title">Professional Care For Your Beloved Pets</h1>
                <p className="hero-text">
                  Trust us with your pet's health. Our experienced veterinarians provide
                  comprehensive care with compassion and expertise.
                </p>
                <div className="hero-buttons d-flex" style={{marginTop: '2rem'}}>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="d-flex flex-column align-items-center p-4 me-3" 
                    style={{minWidth: '180px', borderRadius: '20px'}}
                    onClick={() => navigate('/vetlist')}
                  >
                    <i className="fas fa-stethoscope fa-2x mb-2"></i>
                    Vétérinaires
                  </Button>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="d-flex flex-column align-items-center p-4" 
                    style={{minWidth: '180px', borderRadius: '20px'}}
                    onClick={() => navigate('/owners')}
                  >
                    <i className="fas fa-user fa-2x mb-2"></i>
                    Propriétaires
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image-container">
                <div className="hero-image-group">
                  <img src="/images/pets.png" alt="Veterinary Care" className="hero-image" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <h2 className="text-center section-title">Nos Services</h2>
          <Row>
            <Col md={4}>
              <Card className="feature-card">
                <div className="icon-wrapper">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <Card.Body>
                  <Card.Title>Soins médicaux</Card.Title>
                  <Card.Text>
                  Examens et traitements médicaux complets pour tous types d'animaux de compagnie.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <div className="icon-wrapper">
                  <i className="fas fa-syringe"></i>
                </div>
                <Card.Body>
                  <Card.Title>Vaccinations</Card.Title>
                  <Card.Text>
                  Gardez vos animaux de compagnie en bonne santé grâce à nos programmes de vaccination complets.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card">
                <div className="icon-wrapper">
                  <i className="fas fa-heart"></i>
                </div>
                <Card.Body>
                  <Card.Title>Soins d'urgence</Card.Title>
                  <Card.Text>
                    24/7 services d'urgence lorsque vos animaux ont besoin de soins immédiats.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="stats-section"  style={{ background: 'linear-gradient(135deg,rgb(31, 55, 111) 51%,rgb(76, 123, 195) 99%)', color: 'white', textAlign: 'center', padding: '2rem 0', marginTop: '0' }}>
        <Container>
          <Row>
            <Col md={3}>
              <div className="stat-item">
                <div className="stat-number">5000+</div>
                <div className="stat-label">Happy Pets</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Expert Vets</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Emergency Care</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer id="footer" style={{ background: 'linear-gradient(135deg,rgb(31, 55, 111) 40%,rgb(76, 123, 195) 99%)', color: 'white', textAlign: 'center', padding: '2rem 0', marginTop: '0' }}>
        <div>© {new Date().getFullYear()} VetCare. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default HomePage; 