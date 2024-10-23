import React from 'react';
import styled from 'styled-components';


const ConclusionSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;
  background-color: #f8f9fa; // Light background for contrast

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 0 20px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #343a40; // Darker text color
  }

  p {
    font-size: 1.1rem;
    color: #6c757d; // Grey text color
    line-height: 1.5;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  padding: 0 20px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px; // Add some border-radius for a rounded look
  }
`;

const Conclusion = () => {
  return (
    <ConclusionSection>
      <TextContainer>
        <h2>Why Choose Our Services?</h2>
        <p>
          We are dedicated to providing the best quality construction and landscaping services.
          Our team of experts will work with you every step of the way to bring your vision to life,
          ensuring your outdoor or indoor spaces are both functional and beautiful.
        </p>
        <p>
          With years of experience and a commitment to excellence, we are your trusted partner for all
          your construction needs.
        </p>
      </TextContainer>
      <ImageContainer>
        <img src={'img/conclusion.png'} alt="Team working on a project" />
      </ImageContainer>
    </ConclusionSection>
  );
};

export default Conclusion;
