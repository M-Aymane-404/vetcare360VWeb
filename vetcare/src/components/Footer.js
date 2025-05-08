import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(to right, rgb(31, 55, 111), rgb(76, 123, 195));
  color: white;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>VetCare 360</h3>
          <ul>
            <li>À propos de nous</li>
            <li>Notre équipe</li>
            <li>Nos services</li>
            <li>Contact</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li>Médecine interne</li>
            <li>Chirurgie</li>
            <li>Dermatologie</li>
            <li>Dentisterie</li>
          </ul>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <ul>
            <li>123 Rue Example</li>
            <li>Ville, Code Postal</li>
            <li>Tél: (123) 456-7890</li>
            <li>Email: contact@vetcare360.com</li>
          </ul>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;