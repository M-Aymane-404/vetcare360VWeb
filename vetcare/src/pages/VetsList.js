import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';

// Styled Components
const VetsPage = styled.div`
  min-height: 100vh;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const VetsTitle = styled.h1`
  color: #1a2942;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const VetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VetCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const VetImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.5rem;
`;

const VetInfo = styled.div`
  h2 {
    color: #1a2942;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1rem;
    margin: 0;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const VetsList = () => {
  const veterinarians = [
    {
      id: 1,
      name: "Dr. Emma Lefevre",
      specialty: "Médecine interne",
      image: "/images/emma.jpg"
    },
    {
      id: 2,
      name: "Dr. Martin Dubois",
      specialty: "Chirurgie",
      image: "/images/martin.jpg"
    },
    {
      id: 3,
      name: "Dr. Sophie Bernard",
      specialty: "Dermatologie",
      image: "/images/sophie.jpg"
    },
    {
      id: 4,
      name: "Dr. Julien Lambert",
      specialty: "Dentisterie",
      image: "/images/julien.jpg"
    }
  ];

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Container>
          <VetsTitle>Liste des vétérinaires</VetsTitle>
          <VetsGrid>
            {veterinarians.map((vet) => (
              <VetCard key={vet.id}>
                <VetImage src={vet.image} alt={vet.name} />
                <VetInfo>
                  <h2>{vet.name}</h2>
                  <p>{vet.specialty}</p>
                </VetInfo>
              </VetCard>
            ))}
          </VetsGrid>
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

export default VetsList;