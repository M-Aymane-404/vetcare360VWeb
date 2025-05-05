import { Container, Card, Row, Col } from 'react-bootstrap';

function VetList() {
  const veterinarians = [
    {
      id: 1,
      name: "Dr. Marie Decle",
      specialties: ["Dermatologie", "Cardiologie"],
      image: "/vet1.jpg"
    },
    {
      id: 2,
      name: "Dr. Thomas Letenre",
      specialties: ["Chirurgie", "Dermatologie"],
      image: "/vet2.jpg"
    }
  ];

  return (
    <div className="vet-list-section">
      <Container>
        <h1 className="mb-4">Liste des vétérinaires</h1>
        <Row>
          {veterinarians.map(vet => (
            <Col md={6} key={vet.id} className="mb-4">
              <Card className="vet-card">
                <div className="d-flex align-items-center p-3">
                  <div className="vet-image-container me-3">
                    <img src={vet.image} alt={vet.name} className="vet-image" />
                  </div>
                  <div className="vet-info">
                    <h3>{vet.name}</h3>
                    <div className="specialties">
                      {vet.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default VetList;