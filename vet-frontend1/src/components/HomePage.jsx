import { Container } from 'react-bootstrap';

function HomePage() {
  return (
    <>
      <div className="hero-section">
        <Container>
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4">Gestion de la clinique vétérinaire</h1>
              <p className="lead mb-4">
                Administrez les dossiers des animaux, les rendez-vous, et plus
              </p>
            </div>
            <div className="col-md-6">
              <img src="/pets.png" alt="Pets" className="img-fluid" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="features-section">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-stethoscope"></i>
              <h3>Vétérinaires</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">
              <i className="fas fa-user"></i>
              <h3>Propriétaires</h3>
            </div>
          </div>
          
        </div>
      </Container>
    </>
  );
}

export default HomePage;