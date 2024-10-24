import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2d2d2d;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const FooterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterSection>
          <FooterTitle>GAZON NORDIC LINKS</FooterTitle>
          <FooterLink href="/">HOME</FooterLink>
          <FooterLink href="/services">SERVICES</FooterLink>
          <FooterLink href="/projects">PORTFOLIO</FooterLink>
          <FooterLink href="/contact">get in touch </FooterLink>
          <FooterLink href="#">FREE ESTIMATE</FooterLink>
          <FooterLink href="#">TERMS OF SERVICE</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterTitle>OUR SERVICE LOCATIONS</FooterTitle>
          <FooterLink href="#">Rive-Nord, AB</FooterLink>
          <FooterLink href="#">Lanaudiere, AB</FooterLink>
          <FooterLink href="#">Laval, AB</FooterLink>
          <FooterLink href="#">Montreal, AB</FooterLink>
          <FooterLink href="#">Rive-Sud, AB</FooterLink>
          
        </FooterSection>
        <FooterSection>
          <FooterTitle>GET IN TOUCH:</FooterTitle>
          <p>T: (438) 000 0000</p>
          <p>Email: EMAIL@email.com</p>
          <p>#20 Bureau location hna</p>
        </FooterSection>
      </FooterTop>
      <FooterBottom>
        &copy; 2024. All rights reserved. Developed by Reda Benloulid.
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
